'use client';

import { signOut } from './actions';
import type { User } from '@supabase/supabase-js';

export function AdminTopBar({ user }: { user: User }) {
  return (
    <header className="admin-topbar sticky top-0 z-20">
      <div className="flex min-h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Page title area (can be customized per page) */}
        <div className="flex-1" />

        {/* User menu */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-almost-white">{user.email}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ash">Administrator</p>
          </div>
          <button
            onClick={() => signOut()}
            className="admin-signout"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
