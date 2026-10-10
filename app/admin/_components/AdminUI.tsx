'use client';

import { FormEvent, useState, useTransition } from 'react';
import { SocialIcon, type SocialPlatform } from '@/components/SocialIcon';

export type Field = { name: string; label: string; type?: 'text' | 'textarea' | 'date' | 'number' | 'url' | 'email' | 'checkbox' | 'json' | 'file'; required?: boolean; placeholder?: string; accept?: string; social?: SocialPlatform };

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.join(', ');
  if (value && typeof value === 'object') return JSON.stringify(value);
  return value == null ? '' : String(value);
}

export function RecordForm({ fields, record, action, submitLabel = 'Save changes' }: { fields: Field[]; record?: Record<string, unknown>; action: (formData: FormData) => Promise<void>; submitLabel?: string }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      try { await action(formData); setMessage('Saved.'); } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save record.'); }
    });
  };
  return <form onSubmit={onSubmit} className="space-y-5" aria-busy={isPending}>
    <div className="grid gap-5 md:grid-cols-2">
      {fields.map((field) => {
        const value = displayValue(record?.[field.name]);
        if (field.type === 'checkbox') return <label key={field.name} className="flex items-center gap-3 rounded-buttons border border-ash/20 bg-near-black px-4 py-3 text-sm text-soft-white"><input name={field.name} type="checkbox" defaultChecked={Boolean(record?.[field.name])} className="h-4 w-4 accent-signal-violet" />{field.label}</label>;
        return <label key={field.name} className={field.type === 'textarea' || field.type === 'json' || field.type === 'file' ? 'md:col-span-2 block' : 'block'}><span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-steel">{field.social && <SocialIcon platform={field.social} className="h-4 w-4 text-lavender-mist" />}{field.label}</span>{field.type === 'textarea' || field.type === 'json' ? <textarea name={field.name} required={field.required} defaultValue={value} placeholder={field.placeholder} rows={field.type === 'json' ? 3 : 5} className="admin-input" /> : field.type === 'file' ? <input name={field.name} type="file" accept={field.accept} className="admin-input file:mr-3 file:rounded-buttons file:border-0 file:bg-lavender-mist file:px-3 file:py-1.5 file:text-sm file:text-near-black" /> : <input name={field.name} type={field.type || 'text'} required={field.required} defaultValue={value} placeholder={field.placeholder} className="admin-input" />}</label>;
      })}
    </div>
    <div className="flex items-center gap-4"><button type="submit" disabled={isPending} className="admin-primary">{isPending ? 'Saving…' : submitLabel}</button>{message && <p role="status" className={message === 'Saved.' ? 'text-sm text-lavender-mist' : 'text-sm text-red-300'}>{message}</p>}</div>
  </form>;
}

export function DeleteButton({ action }: { action: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition();
  return <button type="button" disabled={isPending} onClick={() => { if (window.confirm('Delete this record? This cannot be undone.')) startTransition(() => action()); }} className="text-xs text-steel underline underline-offset-4 hover:text-red-300">{isPending ? 'Deleting…' : 'Delete'}</button>;
}

export function AdminHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-8 flex flex-col gap-4 border-b border-ash/20 pb-6 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-medium tracking-[-0.04em] text-almost-white">{title}</h1><p className="mt-2 max-w-2xl text-sm text-steel">{description}</p></div>{action}</div>;
}

export function StatusBadge({ active, label }: { active: boolean; label?: string }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${active ? 'bg-lavender-mist/10 text-lavender-mist' : 'bg-ash/20 text-steel'}`}>{label || (active ? 'Published' : 'Draft')}</span>; }
