'use client';

import { FormEvent, useState } from 'react';

export function ContactOverlay() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const update = (field: keyof typeof formData, value: string) =>
    setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <div className="grid min-h-full gap-16 px-8 py-20 sm:px-14 lg:grid-cols-[.8fr_1fr] lg:gap-24 lg:px-[13vw] lg:py-28">
      <div className="flex flex-col justify-center">
        <p className="mb-8 text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b]">Open channel / 01</p>
        <h2 className="max-w-xl text-5xl font-medium leading-[.92] tracking-[-0.06em] sm:text-7xl">
          Let&apos;s make something move.
        </h2>
        <p className="mt-8 max-w-md text-base leading-relaxed text-[#474747]">
          Tell me what you&apos;re building, where it needs momentum, and what success should look like.
        </p>
        <div className="mt-14 border-t border-black/15 pt-5 text-xs uppercase tracking-[0.12em] text-[#6b6b6b]">
          SEO · Paid media · Content · Analytics
        </div>
      </div>
      <div className="flex items-center">
        {status === 'success' ? (
          <div className="w-full border border-black/15 bg-white/40 p-8 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#6b6b6b]">Transmission received</p>
            <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em]">Thanks — I&apos;ll be in touch.</h3>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-8 text-sm underline underline-offset-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="grid gap-2 text-[10px] uppercase tracking-[0.14em] text-[#474747]">
                Full name *
                <input
                  required
                  value={formData.name}
                  onChange={(event) => update('name', event.target.value)}
                  className="border-b border-black/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-[#090909] outline-none placeholder:text-[#828384] focus:border-[#090909]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-[10px] uppercase tracking-[0.14em] text-[#474747]">
                Email *
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) => update('email', event.target.value)}
                  className="border-b border-black/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-[#090909] outline-none placeholder:text-[#828384] focus:border-[#090909]"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="grid gap-2 text-[10px] uppercase tracking-[0.14em] text-[#474747]">
              What are we working on?
              <input
                value={formData.subject}
                onChange={(event) => update('subject', event.target.value)}
                className="border-b border-black/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-[#090909] outline-none placeholder:text-[#828384] focus:border-[#090909]"
                placeholder="Campaign, SEO, content, or something new"
              />
            </label>
            <label className="grid gap-2 text-[10px] uppercase tracking-[0.14em] text-[#474747]">
              The brief *
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(event) => update('message', event.target.value)}
                className="resize-none border-b border-black/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-[#090909] outline-none placeholder:text-[#828384] focus:border-[#090909]"
                placeholder="A few lines about the goal, timeline, and where you are now"
              />
            </label>
            {status === 'error' && <p role="alert" className="text-sm text-red-700">{errorMessage}</p>}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-[#090909] px-6 py-4 text-sm text-[#f7f9fa] transition-colors hover:bg-[#af50ff] hover:text-[#090909] disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending…' : 'Start a conversation ↗'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
