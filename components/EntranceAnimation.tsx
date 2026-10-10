'use client';

import { useEffect, type ReactNode } from 'react';

interface EntranceAnimationProps {
  children: ReactNode;
}

const FONT_TIMEOUT = 1200;
const ANIMATION_TIMEOUT = 2200;
const FAILSAFE_TIMEOUT = 4500;

export function EntranceAnimation({ children }: EntranceAnimationProps) {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let fontTimer: ReturnType<typeof setTimeout> | undefined;
    let animationTimer: ReturnType<typeof setTimeout> | undefined;
    let failsafeTimer: ReturnType<typeof setTimeout> | undefined;
    let frameId: number | undefined;

    const finish = () => {
      if (fontTimer) clearTimeout(fontTimer);
      if (animationTimer) clearTimeout(animationTimer);
      if (failsafeTimer) clearTimeout(failsafeTimer);
      if (frameId !== undefined) cancelAnimationFrame(frameId);
      root.classList.remove('is-entering', 'is-playing');
    };

    if (reduceMotion.matches) {
      document.querySelectorAll('video').forEach((video) => {
        video.autoplay = false;
        video.pause();
      });
      finish();
      return finish;
    }

    root.classList.add('is-entering');
    failsafeTimer = setTimeout(finish, FAILSAFE_TIMEOUT);

    const fontsReady = new Promise<void>((resolve) => {
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        if (fontTimer) clearTimeout(fontTimer);
        resolve();
      };

      fontTimer = setTimeout(settle, FONT_TIMEOUT);
      if (document.fonts?.ready) document.fonts.ready.then(settle, settle);
      else settle();
    });

    fontsReady.then(() => {
      frameId = requestAnimationFrame(() => {
        root.classList.add('is-playing');
        const animations = Array.from(document.querySelectorAll<HTMLElement>('.au-enter'))
          .flatMap((element) => element.getAnimations())
          .filter((animation): animation is CSSAnimation => {
            const animationName = (animation as unknown as { animationName?: string }).animationName;
            return typeof animationName === 'string' && animationName.startsWith('au-');
          });

        if (animations.length === 0) {
          finish();
          return;
        }

        animationTimer = setTimeout(finish, ANIMATION_TIMEOUT);
        Promise.all(animations.map((animation) => animation.finished.catch(() => undefined))).then(finish);
      });
    }, finish);

    return finish;
  }, []);

  return <>{children}</>;
}
