'use client';

import { useEffect, useRef, useState } from 'react';

interface PdfThumbnailProps {
  src: string;
  alt?: string;
  className?: string;
}

export function PdfThumbnail({ src, alt, className }: PdfThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        // Wait one frame so the container has been painted and has real dimensions
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        if (cancelled) return;

        const containerW = container.offsetWidth || 320;
        const containerH = container.offsetHeight || 240;

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.mjs',
          import.meta.url,
        ).toString();

        const pdf = await pdfjsLib.getDocument(src).promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        // Scale to fill container width; crop vertically if needed (cover behaviour)
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerW / viewport.width;
        const scaled = page.getViewport({ scale });

        // Use device pixel ratio for sharp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width  = scaled.width  * dpr;
        canvas.height = scaled.height * dpr;
        canvas.style.width  = `${containerW}px`;
        canvas.style.height = `${containerH}px`;
        canvas.style.objectFit = 'cover';

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.scale(dpr, dpr);

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
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className ?? ''}`}>
      {/* Rendered canvas — shown once ready */}
      <canvas
        ref={canvasRef}
        aria-label={alt ?? 'PDF preview'}
        className="absolute inset-0 w-full h-full"
        style={{
          display: status === 'ready' ? 'block' : 'none',
          objectFit: 'cover',
        }}
      />

      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#1a1a1a]">
          <svg
            className="w-8 h-8 text-ash/40 animate-pulse"
            fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-[10px] text-ash/40 uppercase tracking-widest">Loading</span>
        </div>
      )}

      {/* Error fallback */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#1a1a1a]">
          <svg
            className="w-8 h-8 text-graphite"
            fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-[10px] text-graphite uppercase tracking-widest">PDF</span>
        </div>
      )}
    </div>
  );
}
