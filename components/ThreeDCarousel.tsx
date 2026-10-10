'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export type ThreeDCarouselItem = {
  id: string;
  title: string;
  category?: string | null;
  slug: string;
  imagePath?: string | null;
  description?: string | null;
};

export function ThreeDCarousel({ items }: { items: ThreeDCarouselItem[] }) {
  const [active, setActive] = useState(0);
  const count = items.length;
  const safeActive = count ? active % count : 0;

  const visibleItems = useMemo(() => items.slice(0, 12), [items]);

  useEffect(() => {
    if (safeActive >= visibleItems.length) setActive(0);
  }, [safeActive, visibleItems.length]);

  if (!visibleItems.length) return null;

  const move = (direction: number) => setActive((current) => (current + direction + visibleItems.length) % visibleItems.length);

  return <div className="three-d-carousel" aria-roledescription="carousel" aria-label="Project and poster showcase" onKeyDown={(event) => { if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1); }} tabIndex={0}>
    <div className="three-d-carousel__stage">
      {visibleItems.map((item, index) => {
        const offset = (index - safeActive + visibleItems.length) % visibleItems.length;
        const normalized = offset > visibleItems.length / 2 ? offset - visibleItems.length : offset;
        const isActive = index === safeActive;
        if (Math.abs(normalized) > 2) return null;
        return <article key={item.id} className={`three-d-carousel__slide ${isActive ? 'is-active' : ''}`} style={{ '--carousel-offset': normalized } as React.CSSProperties} aria-hidden={!isActive}>
          <Link href={`/projects/${item.slug}`} tabIndex={isActive ? 0 : -1} className="three-d-carousel__link">
            <div className="three-d-carousel__poster">{item.imagePath ? <img src={item.imagePath} alt={`${item.title} poster`} /> : <span aria-hidden="true">{item.title.slice(0, 2).toUpperCase()}</span>}</div>
            <div className="three-d-carousel__caption"><span>{item.category || 'PROJECT'}</span><h3>{item.title}</h3><p>{item.description || 'Open case study'}</p></div>
          </Link>
        </article>;
      })}
    </div>
    <div className="three-d-carousel__controls"><button type="button" onClick={() => move(-1)} aria-label="Previous project">←</button><div className="three-d-carousel__dots" aria-label="Choose project">{visibleItems.map((item, index) => <button type="button" key={item.id} onClick={() => setActive(index)} aria-label={`Show ${item.title}`} aria-current={index === safeActive}>{index === safeActive ? <span /> : null}</button>)}</div><button type="button" onClick={() => move(1)} aria-label="Next project">→</button></div>
  </div>;
}
