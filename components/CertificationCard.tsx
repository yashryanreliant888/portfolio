'use client';

import { useState, useEffect, useCallback } from 'react';

interface CertificationCardProps {
  title: string;
  issuer: string;
  category?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
  certificateFilePath?: string | null;
  fileType?: string | null;
  skillsCovered?: string[] | null;
}

export function CertificationCard({
  title,
  issuer,
  category,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  certificateFilePath,
  fileType,
  skillsCovered,
}: CertificationCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const isImage = fileType?.startsWith('image/');
  const isPdf = fileType === 'application/pdf';
  const hasFile = !!certificateFilePath;

  const isExpired = expiryDate ? new Date(expiryDate) < new Date() : false;

  const formatDate = (date: string | null | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const openPreview = useCallback(() => {
    if (hasFile) setPreviewOpen(true);
  }, [hasFile]);

  const closePreview = useCallback(() => setPreviewOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!previewOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closePreview(); };
    document.addEventListener('keydown', handler);
    // Lock scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [previewOpen, closePreview]);

  return (
    <>
      {/* ── CARD ─────────────────────────────────────────────── */}
      <div className="group relative flex flex-col rounded-[19.2px] border border-ash/20 bg-[#090909] overflow-hidden hover:border-ash/40 transition-all duration-300">

        {/* Thumbnail / preview trigger */}
        <button
          onClick={openPreview}
          disabled={!hasFile}
          className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-violet focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
          aria-label={`Preview ${title} certificate`}
        >
          {isImage && certificateFilePath ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={certificateFilePath}
              alt={`${title} certificate`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : isPdf ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              {/* PDF icon */}
              <svg className="w-10 h-10 text-graphite" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-xs text-graphite uppercase tracking-widest font-medium">PDF</span>
            </div>
          ) : (
            /* No file placeholder */
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-10 h-10 text-ash/30" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
              </svg>
            </div>
          )}

          {/* Hover scrim + "Preview" label */}
          {hasFile && (
            <div className="absolute inset-0 bg-[#090909]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
              <svg className="w-7 h-7 text-almost-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803zM10.5 7.5v6m3-3h-6" />
              </svg>
              <span className="text-xs text-almost-white font-medium uppercase tracking-widest">
                Preview
              </span>
            </div>
          )}
        </button>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 gap-4">

          {/* Title + issuer */}
          <div className="flex-1">
            <h3 className="text-[15px] font-medium text-almost-white leading-snug mb-1">
              {title}
            </h3>
            <p className="text-sm text-steel">{issuer}</p>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {issueDate && (
              <span className="text-xs text-graphite">Issued {formatDate(issueDate)}</span>
            )}
            {expiryDate && (
              <span className={`text-xs ${isExpired ? 'text-red-400/80' : 'text-graphite'}`}>
                {isExpired ? '· Expired' : `· Expires ${formatDate(expiryDate)}`}
              </span>
            )}
          </div>

          {/* Skills */}
          {skillsCovered && skillsCovered.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {skillsCovered.slice(0, 3).map((skill) => (
                <span key={skill}
                  className="px-2 py-0.5 text-[11px] rounded-full border border-ash/20 text-graphite">
                  {skill}
                </span>
              ))}
              {skillsCovered.length > 3 && (
                <span className="px-2 py-0.5 text-[11px] rounded-full border border-ash/20 text-graphite">
                  +{skillsCovered.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-ash/10">
            {credentialId ? (
              <span className="text-[11px] font-mono text-ash/60 truncate max-w-[130px]" title={credentialId}>
                {credentialId}
              </span>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-3">
              {hasFile && (
                <button
                  onClick={openPreview}
                  className="text-[11px] text-ash hover:text-almost-white transition-colors duration-200 uppercase tracking-wider"
                >
                  Preview
                </button>
              )}
              {credentialUrl && (
                <a href={credentialUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-signal-violet hover:text-lavender-mist transition-colors duration-200 uppercase tracking-wider">
                  Verify
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX MODAL ────────────────────────────────────── */}
      {previewOpen && certificateFilePath && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} certificate preview`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#090909]/95 backdrop-blur-sm"
            onClick={closePreview}
          />

          {/* Modal panel */}
          <div className="relative z-10 flex flex-col w-full max-w-4xl max-h-[90vh] mx-4 rounded-[19.2px] border border-ash/20 bg-[#0d0d0d] overflow-hidden">

            {/* Header bar */}
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-ash/10 shrink-0">
              <div className="min-w-0">
                <p className="text-xs text-graphite uppercase tracking-widest mb-0.5">{issuer}</p>
                <h2 className="text-[15px] font-medium text-almost-white leading-snug truncate">{title}</h2>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                {/* Open in new tab */}
                <a
                  href={certificateFilePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ash/20 text-xs text-steel hover:text-almost-white hover:border-ash/40 transition-all duration-200"
                  title="Open in new tab"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Open
                </a>
                {/* Close */}
                <button
                  onClick={closePreview}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-ash/20 text-steel hover:text-almost-white hover:border-ash/40 transition-all duration-200"
                  aria-label="Close preview"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Preview area */}
            <div className="relative flex-1 overflow-auto min-h-0">
              {isImage ? (
                <div className="flex items-center justify-center p-4 h-full min-h-[400px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={certificateFilePath}
                    alt={`${title} certificate`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    style={{ maxHeight: 'calc(90vh - 120px)' }}
                  />
                </div>
              ) : isPdf ? (
                <iframe
                  src={`${certificateFilePath}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={`${title} certificate`}
                  className="w-full border-0"
                  style={{ height: 'calc(90vh - 120px)' }}
                />
              ) : null}
            </div>

            {/* Footer: credential + skills */}
            {(credentialId || (skillsCovered && skillsCovered.length > 0) || credentialUrl) && (
              <div className="flex flex-wrap items-center gap-4 px-6 py-3 border-t border-ash/10 bg-[#090909] shrink-0">
                {credentialId && (
                  <span className="text-[11px] font-mono text-ash/60">ID: {credentialId}</span>
                )}
                {skillsCovered && skillsCovered.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {skillsCovered.map((skill) => (
                      <span key={skill}
                        className="px-2 py-0.5 text-[11px] rounded-full border border-ash/20 text-graphite">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {credentialUrl && (
                  <a href={credentialUrl} target="_blank" rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-xs text-signal-violet hover:text-lavender-mist transition-colors duration-200 shrink-0">
                    Verify credential
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
