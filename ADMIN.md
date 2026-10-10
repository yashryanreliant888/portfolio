# Admin workspace

The portfolio admin lives under `/admin`. Supabase Auth handles sign-in, while the `admin_roles` table grants access to the workspace.

## First administrator

1. Create a user in Supabase Authentication with email/password.
2. Copy the user UUID.
3. Run `insert into public.admin_roles (user_id, role) values ('USER_UUID', 'admin');` or sign in with an existing admin and use `/admin/team`.
4. Confirm the SQL files in `supabase/migrations` and `supabase/storage_setup.sql` have been run in the project.

## Areas

- `/admin/profile` edits the single public profile record.
- `/admin/skills`, `/admin/experience`, `/admin/certifications`, `/admin/education`, and `/admin/projects` provide create, edit, publish, and delete controls.
- `/admin/media` lists assets in the `portfolio-media` public bucket.
- `/admin/messages` provides contact inbox status management.
- `/admin/team` grants or revokes dashboard access for Auth users by UUID.

## Security notes

Keep `SUPABASE_SERVICE_ROLE_KEY` out of the browser and repository. The dashboard uses the server-side Supabase client and RLS. Apply `003_admin_hardening.sql` to use the hardened `is_admin()` function and role policies. Do not expose the private `portfolio-documents` bucket publicly.

## Verification checklist

- `npm run type-check`
- `npm run build`
- Sign in as an admin and exercise one create, edit, publish, and delete operation for each collection.
- Submit a public contact form, mark it read/resolved in `/admin/messages`, and verify visitors cannot query messages directly.
- Test keyboard focus, mobile navigation, empty states, and reduced-motion preferences in a browser.
