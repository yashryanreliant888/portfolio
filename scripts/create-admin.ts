import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadLocalEnv() {
  const envPath = resolve(process.cwd(), '.env.local');
  try {
    for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // Environment variables may be provided by the shell or CI instead.
  }
}

loadLocalEnv();

const email = process.env.ADMIN_EMAIL || 'yashryanreliant888@gmail.com';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function promptPassword() {
  if (!process.stdin.isTTY || !process.stdin.setRawMode) throw new Error('Set ADMIN_PASSWORD before running this script in a non-interactive terminal.');
  return new Promise<string>((resolve) => {
    let value = '';
    process.stdout.write('Admin password: ');
    process.stdin.setRawMode!(true);
    process.stdin.resume();
    const onData = (chunk: Buffer) => {
      for (const character of chunk.toString()) {
        if (character === '\u0003') process.exit(130);
        if (character === '\r' || character === '\n') {
          process.stdin.setRawMode!(false);
          process.stdin.pause();
          process.stdin.off('data', onData);
          process.stdout.write('\r\n');
          resolve(value);
        } else if (character === '\u007f' || character === '\b') {
          value = value.slice(0, -1);
        } else {
          value += character;
        }
      }
    };
    process.stdin.on('data', onData);
  });
}

async function main() {
  const password = process.env.ADMIN_PASSWORD || await promptPassword();
  if (!password) throw new Error('Set ADMIN_PASSWORD before running this script.');
  if (!supabaseUrl || !serviceRoleKey) throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: existing, error: lookupError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (lookupError) throw new Error(`Unable to inspect Auth users: ${lookupError.message}`);

  let user = existing.users.find((candidate) => candidate.email?.toLowerCase() === email.toLowerCase());
  if (user) {
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, { password, email_confirm: true });
    if (error) throw new Error(`Unable to update Auth user: ${error.message}`);
    user = data.user;
  } else {
    const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) throw new Error(`Unable to create Auth user: ${error.message}`);
    user = data.user;
  }

  if (!user) throw new Error('Supabase did not return a user.');
  const { error: roleError } = await supabase.from('admin_roles').upsert({ user_id: user.id, role: 'admin' });
  if (roleError) throw new Error(`Unable to grant admin role: ${roleError.message}`);

  console.log(`Admin account ready for ${email}. User ID: ${user.id}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
