"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { BarChart3, FileText, Mail, Megaphone, Palette, Search, Share2, Target, Users, Wrench } from "lucide-react";
import React, { useRef } from "react";

interface Skiper31Props {
  skills?: Array<{ name: string; logoPath?: string | null }>;
}

interface CharacterProps {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}

interface SkillLogoProps {
  skill: { name: string; logoPath?: string | null };
  index: number;
  progress: MotionValue<number>;
}

function SkillFallback({ name }: { name: string }) {
  const lowerName = name.toLowerCase();
  const Icon = lowerName.includes("seo") ? Search
    : lowerName.includes("analytics") || lowerName.includes("excel") ? BarChart3
    : lowerName.includes("social") || lowerName.includes("meta") ? Share2
    : lowerName.includes("content") || lowerName.includes("copy") ? FileText
    : lowerName.includes("ads") || lowerName.includes("advert") ? Megaphone
    : lowerName.includes("email") ? Mail
    : lowerName.includes("design") || lowerName.includes("canva") || lowerName.includes("photo") ? Palette
    : lowerName.includes("strategy") ? Target
    : lowerName.includes("tool") ? Wrench
    : Users;

  return <Icon aria-hidden="true" className="h-10 w-10 text-[#090909]" strokeWidth={1.6} />;
}

function SkillLogo({ skill, index, progress }: SkillLogoProps) {
  const y = useTransform(progress, [0, 0.45, 1], [70 + (index % 3) * 28, 0, -24]);
  const rotateX = useTransform(progress, [0, 0.45, 1], [18 + (index % 2) * 8, 0, -4]);
  const scale = useTransform(progress, [0, 0.45, 1], [0.72, 1, 0.92]);
  const opacity = useTransform(progress, [0, 0.25, 1], [0.25, 1, 0.8]);

  return (
    <motion.div style={{ y, rotateX, scale, opacity }} className="flex w-20 flex-col items-center gap-2 sm:w-24" title={skill.name}>
      <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-[#f7f9fa] p-3 sm:h-20 sm:w-20">
        {skill.logoPath ? (
          <img src={skill.logoPath} alt={`${skill.name} logo`} className="h-full w-full object-contain" />
        ) : (
          <SkillFallback name={skill.name} />
        )}
      </div>
      <span className="max-w-24 text-center text-[9px] uppercase leading-tight tracking-[0.08em] text-[#828384]">{skill.name}</span>
    </motion.div>
  );
}

function CharacterV1({ char, index, centerIndex, scrollYProgress }: CharacterProps) {
  const distance = Math.abs(index - centerIndex);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [distance * 20 + 50, 0, distance * -12]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [distance * 8 + 18, 0, distance * -4]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.38, 1, 0.72]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.76, 1, 0.92]);

  return (
    <motion.span
      aria-hidden={char === " "}
      style={{ y, rotateX, opacity, scale }}
      className="inline-block origin-center px-[0.02em] font-sans text-[clamp(3.5rem,12vw,10rem)] font-bold uppercase leading-[0.8] tracking-[-0.09em]"
    >
      {char === " " ? "\u00a0" : char}
    </motion.span>
  );
}

const Skiper31 = ({ skills = [] }: Skiper31Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const title = Array.from("SKILL SET");
  const centerIndex = Math.floor(title.length / 2);
  const visibleSkills = skills.filter((skill) => skill.name).slice(0, 9);

  return (
    <section
      ref={targetRef}
      aria-labelledby="skills-title"
      className="relative z-10 -mt-[40vh] box-border flex h-[150vh] w-screen items-center justify-center gap-[2vw] overflow-hidden bg-[#090909] p-[2vw] text-[#f7f9fa]"
    >
      <div
        id="skills-title"
        className="w-full max-w-4xl text-center [perspective:500px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div aria-label="Skill set" className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {title.map((char, index) => (
            <CharacterV1
              key={`${char}-${index}`}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-start justify-center gap-5 sm:gap-8">
          {visibleSkills.map((skill, index) => (
            <SkillLogo key={`${skill.name}-${index}`} skill={skill} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Skiper31 };
