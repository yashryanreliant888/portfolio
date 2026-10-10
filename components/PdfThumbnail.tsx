'use client';

import { useEffect, useRef, useState } from 'react';

interface PdfThumbnailProps {
  src: string;
  alt?: string;
  className?: string;
}

export function PdfThumbnail({ src, alt, className }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        // Lazy-import so pdfjs never ends up in the server bundle
        const pdfjsLib = await import('pdfjs-dist');

        // Point the worker at the copy shipped with the package
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.mjs',
          import.meta.url,
        ).toString();

        const loadingTask = pdfjsLib.getDocument(src);
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Scale so the width fills the canvas element
        const viewport = page.getViewport({ scale: 1 });
        const scale = canvas.offsetWidth / viewport.width || 1;
        const scaled = page.getViewport({ scale });

        canvas.width = scaled.width;
        canvas.height = scaled.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        await page.render({ canvasContext: ctx, viewport: scaled }).promise;
        if (!cancelled) setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    render();
    return () => { cancelled = true; };
  }, [src]);

  return (
    <div className={`relative w-full h-full ${className ?? ''}`}>
      {/* Canvas — hidden until rendered */}
      <canvas
        ref={canvasRef}
        aria-label={alt ?? 'PDF preview'}
        className="w-full h-full object-cover"
        style={{ display: status === 'ready' ? 'block' : 'none' }}
      />

      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
          <svg className="w-10 h-10 text-ash/40" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-[11px] text-ash/50 uppercase tracking-widest">Loading…</span>
        </div>
      )}

      {/* Error fallback */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <svg className="w-10 h-10 text-graphite" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-[11px] text-graphite uppercase tracking-widest">PDF</span>
        </div>
      )}
    </div>
  );
}
