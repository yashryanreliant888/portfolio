import { createClient } from '@/lib/supabase/server';
import { AdminHeader, StatusBadge } from '../_components/AdminUI';
import { updateMessageStatus } from '../actions';

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
  const messages = data ?? [];
  return <div><AdminHeader title="Contact messages" description="A focused inbox for conversations started through the portfolio." /><div className="space-y-3">{messages.length === 0 && <div className="admin-empty">No messages yet.</div>}{messages.map((message) => <article key={message.id} className="admin-row block"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-3"><h2 className="text-base font-medium text-almost-white">{message.name}</h2><StatusBadge active={message.status === 'new'} label={message.status} /></div><a href={`mailto:${message.email}`} className="mt-1 block text-sm text-lavender-mist">{message.email}</a>{message.subject && <p className="mt-4 text-sm font-medium text-soft-white">{message.subject}</p>}<p className="mt-2 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-steel">{message.message}</p></div><time className="text-xs text-steel" dateTime={message.created_at}>{new Date(message.created_at).toLocaleDateString()}</time></div><div className="mt-5 flex gap-3 border-t border-ash/20 pt-4">{['new', 'read', 'resolved'].map((status) => <form key={status} action={updateMessageStatus.bind(null, message.id, status)}><button className="text-xs uppercase tracking-[0.1em] text-steel hover:text-almost-white" type="submit">Mark {status}</button></form>)}</div></article>)}</div></div>;
}
