'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button, LoadingSpinner } from '@/components';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const supabase = createClient();

      // Sign in
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        throw new Error('Invalid email or password');
      }

      if (!authData.user) {
        throw new Error('Authentication failed');
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .single();

      if (roleError || !roleData) {
        // Sign out if not an admin
        await supabase.auth.signOut();
        throw new Error('Access denied. Admin privileges required.');
      }

      // Redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-soft-white mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-iron border border-ash/20 rounded-buttons text-almost-white placeholder-steel focus:outline-none focus:ring-2 focus:ring-signal-violet focus:border-transparent transition-all"
          placeholder="admin@example.com"
          disabled={status === 'loading'}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-soft-white mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-iron border border-ash/20 rounded-buttons text-almost-white placeholder-steel focus:outline-none focus:ring-2 focus:ring-signal-violet focus:border-transparent transition-all"
          placeholder="••••••••"
          disabled={status === 'loading'}
        />
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="card border border-red-900/30 bg-red-950/10 p-4" role="alert">
          <p className="text-sm text-red-300">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="violet"
        size="lg"
        disabled={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" />
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </Button>

      {/* Help Text */}
      <p className="text-xs text-steel text-center">
        Secure admin access protected by Supabase Auth
      </p>
    </form>
  );
}
