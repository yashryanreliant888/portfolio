"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

interface Skiper28Props {
  about: string;
}

const Skiper28 = ({ about }: Skiper28Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const yMotionValue = useTransform(scrollYProgress, [0, 1], [260, 0]);
  const transform = useMotionTemplate`rotateX(22deg) translateY(${yMotionValue}px) translateZ(10px)`;

  return (
    <ReactLenis root>
      <div
        ref={targetRef}
        className="relative z-0 -mt-[12vh] h-[148vh] w-screen overflow-x-hidden bg-[#090909] text-[#f7f9fa]"
      >
        <div className="absolute left-1/2 top-[5%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-[#f7f9fa]">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f7f9fa] after:to-transparent after:content-['']">
            scroll down to read
          </span>
        </div>
        <div
          className="sticky top-0 mx-auto flex items-center justify-center bg-transparent py-20"
          style={{
            transformStyle: "preserve-3d",
            perspective: "420px",
          }}
        >
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              transform,
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
              textRendering: "geometricPrecision",
              willChange: "transform",
            }}
            className="font-sans w-full max-w-4xl break-words px-6 text-center text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-[#f7f9fa] [text-wrap:balance] sm:text-6xl lg:text-7xl"
          >
            <span className="font-grandslang text-[#e1bdff]">About me. </span>
            {about}
          </motion.div>
        </div>
      </div>
    </ReactLenis>
  );
};

export { Skiper28 };
