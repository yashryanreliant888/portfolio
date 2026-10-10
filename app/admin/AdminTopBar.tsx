'use client';

import { signOut } from './actions';
import type { User } from '@supabase/supabase-js';

export function AdminTopBar({ user }: { user: User }) {
  return (
    <header className="sticky top-0 z-20 bg-near-black/80 backdrop-blur-lg border-b border-ash/20">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Page title area (can be customized per page) */}
        <div className="flex-1" />

        {/* User menu */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-almost-white">{user.email}</p>
            <p className="text-xs text-steel">Administrator</p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm text-steel hover:text-almost-white border border-ash/20 rounded-buttons transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
