"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GradientButton from "@/components/kokonutui/gradient-button";
import galleryOne from "@/Gallery/hero-gallery/1.jpeg";
import galleryTwo from "@/Gallery/hero-gallery/2.jpeg";
import galleryThree from "@/Gallery/hero-gallery/3.jpeg";
import galleryFour from "@/Gallery/hero-gallery/4.jpeg";
import galleryFive from "@/Gallery/hero-gallery/5.jpeg";
import gallerySix from "@/Gallery/hero-gallery/6.jpeg";

const images = [
  galleryOne.src,
  galleryTwo.src,
  galleryThree.src,
  galleryFour.src,
  galleryFive.src,
  gallerySix.src,
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-black text-[#f7f9fa]">
      <div className="font-geist flex h-[42vh] min-h-[280px] items-center justify-center gap-2">
        <div className="grid content-start justify-items-center gap-5 text-center">
          <h2 className="font-geist text-5xl font-light tracking-[-0.04em] text-[#f7f9fa] sm:text-7xl">
            Gallery
          </h2>
          <p className="max-w-[34ch] text-sm text-[#828384]">
            A moving archive of moments, places, and visual direction.
          </p>
          <GradientButton
            href="/gallery"
            variant="purple"
            size="md"
            className="rounded-full px-7 shadow-[0_0_24px_rgba(175,80,255,0.35)]"
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] whitespace-nowrap">
              <span>Open gallery</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </GradientButton>
        </div>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-black p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[1], images[4], images[0]]} y={y3} />
        <Column images={[images[2], images[5], images[3]]} y={y4} />
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <img
            src={src}
            alt="image"
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };

/**
 * Skiper 30 Parallax_002 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
