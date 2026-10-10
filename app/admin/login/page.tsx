import { LoginForm } from './LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Yash Portfolio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-near-black px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading mb-4 text-almost-white">Admin Login</h1>
          <p className="text-sm text-steel">
            Access the portfolio management dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="card border border-ash/20 p-8">
          <LoginForm />
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-steel hover:text-almost-white transition-colors"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
