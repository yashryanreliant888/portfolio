'use client';

import { useState, FormEvent } from 'react';
import { Button, LoadingSpinner } from '@/components';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <div>
      {status === 'success' ? (
        <div className="card border border-green-900/30 bg-green-950/10 p-8 text-center">
          <svg
            className="w-16 h-16 text-green-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-green-200 mb-2">Message Sent!</h3>
          <p className="text-sm text-green-300 mb-6">
            Thank you for reaching out. I'll get back to you within 24-48 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-sm text-green-400 hover:text-green-300 underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-soft-white mb-2">
              Name <span className="text-signal-violet">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-iron border border-ash/20 rounded-buttons text-almost-white placeholder-steel focus:outline-none focus:ring-2 focus:ring-signal-violet focus:border-transparent transition-all"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-soft-white mb-2">
              Email <span className="text-signal-violet">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-iron border border-ash/20 rounded-buttons text-almost-white placeholder-steel focus:outline-none focus:ring-2 focus:ring-signal-violet focus:border-transparent transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-soft-white mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-iron border border-ash/20 rounded-buttons text-almost-white placeholder-steel focus:outline-none focus:ring-2 focus:ring-signal-violet focus:border-transparent transition-all"
              placeholder="What's this about?"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-soft-white mb-2">
              Message <span className="text-signal-violet">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-iron border border-ash/20 rounded-buttons text-almost-white placeholder-steel focus:outline-none focus:ring-2 focus:ring-signal-violet focus:border-transparent transition-all resize-none"
              placeholder="Tell me about your project or inquiry..."
            />
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="card border border-red-900/30 bg-red-950/10 p-4" role="alert">
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
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
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
