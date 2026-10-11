"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GradientButton from "@/components/kokonutui/gradient-button";
import { createClient } from "@/lib/supabase/client";

interface RecentExperience {
  id: string;
  organization: string;
  role: string;
  employment_type: string | null;
  duration_label: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  responsibilities?: string[] | null;
}

const FALLBACK_EXPERIENCES: RecentExperience[] = [
  {
    id: "exp-1",
    organization: "Team YNES",
    role: "Digital Marketing Specialist",
    employment_type: "Internship",
    duration_label: "Jan 2024 — Present",
    start_date: "2024-01-01",
    end_date: null,
    description: "Driving full-funnel digital marketing initiatives with concentrated focus on keyword optimization, content architecture, and organic growth.",
    responsibilities: [
      "Audited site architecture and executed high-impact on-page SEO recommendations",
      "Managed search rankings, conversion funnels, and organic traffic reporting",
      "Directed cross-channel content calendar and visual campaign rollouts",
    ],
  },
  {
    id: "exp-2",
    organization: "Freelance",
    role: "Social Media & Performance Strategist",
    employment_type: "Freelance",
    duration_label: "Jun 2023 — Dec 2023",
    start_date: "2023-06-01",
    end_date: "2023-12-31",
    description: "Designed and executed end-to-end social media and paid advertising strategies for regional brands and growing businesses.",
    responsibilities: [
      "Engineered paid campaign funnels and targeted audience segments",
      "Produced engagement-focused visual collateral and promotional copy",
      "Delivered transparent monthly KPI dashboards and attribution analysis",
    ],
  },
];

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const [experiences, setExperiences] = useState<RecentExperience[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const loadExperiences = async () => {
      const { data } = await supabase
        .from("experience")
        .select("id, organization, role, employment_type, duration_label, start_date, end_date, description, responsibilities")
        .eq("is_published", true)
        .order("start_date", { ascending: false, nullsFirst: false })
        .limit(4);

      setExperiences((data || []) as RecentExperience[]);
    };

    loadExperiences();
    const channel = supabase
      .channel("skiper19-recent-experience")
      .on("postgres_changes", { event: "*", schema: "public", table: "experience" }, loadExperiences)
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const displayExperiences = experiences.length > 0 ? experiences : FALLBACK_EXPERIENCES;

  return (
    <section
      ref={ref}
      className="relative z-20 mx-auto flex h-[350vh] w-screen flex-col items-center overflow-hidden bg-[#090909] px-4 text-[#f7f9fa]"
    >
      <div className="mt-32 relative flex w-fit flex-col items-center justify-center gap-6 text-center px-4">
        <h1 className="font-whyte relative z-10 text-6xl sm:text-7xl lg:text-9xl font-normal tracking-[-0.04em] text-almost-white leading-[0.92]">
          Experience <br /> that drives <br />
          growth
        </h1>
        <p className="font-whyte relative z-10 max-w-2xl text-lg sm:text-xl font-normal text-steel leading-relaxed">
          Hands-on digital marketing execution, campaign management, and measurable impact.
        </p>

        <div className="relative z-10 mt-2 flex items-center justify-center">
          <GradientButton
            href="/experience"
            variant="purple"
            size="lg"
            className="rounded-full px-8 shadow-[0_0_35px_rgba(175,80,255,0.45)]"
          >
            <span className="flex items-center gap-2">
              <span>Experience</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </span>
          </GradientButton>
        </div>

        <LinePath
          className="absolute -right-[40%] top-0 z-0 pointer-events-none"
          scrollYProgress={scrollYProgress}
        />
      </div>

      <div className="relative w-full translate-y-[200vh] border-y border-white/10 bg-[#090909] text-almost-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_280px_at_50%_0%,rgba(175,80,255,0.09),transparent_70%)] pointer-events-none" />

        <div className="relative mx-auto max-w-page px-6 lg:px-12 py-20 lg:py-28">
          {/* Masthead */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-whyte font-normal tracking-[-0.04em] text-almost-white leading-[1.04]">
                Work in <span className="font-grandslang italic font-normal text-lavender-mist">motion.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-steel font-whyte font-normal leading-relaxed max-w-[58ch]">
                A moving record of the teams, systems, and campaigns shaping the work across search architecture, performance marketing, and analytics.
              </p>
            </div>

            {/* Tactical Field Notes Status Block */}
            <div className="w-full lg:w-auto rounded-cards border border-white/10 bg-white/[0.02] p-5 sm:p-6 text-xs font-whyte-mono text-steel">
              <div className="flex items-center justify-between gap-6 pb-3 border-b border-white/10 text-soft-white">
                <span className="tracking-[0.12em] uppercase">FIELD NOTES // 2026</span>
                <span className="inline-flex items-center gap-1.5 text-lavender-mist">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-violet animate-pulse" />
                  KERALA & REMOTE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-3">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-ash block">SPECIALIZATION</span>
                  <span className="text-almost-white text-xs mt-0.5 block">SEO · PAID · ANALYTICS</span>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-ash block">FOCUS</span>
                  <span className="text-almost-white text-xs mt-0.5 block">MEASURABLE GROWTH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dossiers Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayExperiences.map((exp, index) => {
              const org = exp.organization === "Your Company Name" ? "Team YNES" : exp.organization;
              const responsibilities = exp.responsibilities && exp.responsibilities.length > 0
                ? exp.responsibilities.slice(0, 3)
                : index === 0
                  ? [
                      "Keyword discovery, site architecture, and on-page optimization",
                      "Performance analytics and KPI dashboards via Google Analytics",
                      "Cross-channel content scheduling and campaign creative direction",
                    ]
                  : [
                      "Managed and executed multi-platform social advertising campaigns",
                      "Produced promotional assets, copy, and client deliverables",
                      "Tracked audience engagement, reach, and monthly return metrics",
                    ];
              const tags = index === 0
                ? ["SEO Strategy", "Google Analytics", "Content Systems"]
                : ["Paid Media", "Meta Ads", "Campaign Management"];

              return (
                <article
                  key={exp.id}
                  className="group relative rounded-cards border border-white/10 bg-[#0e0e12]/80 p-7 sm:p-9 transition-all duration-300 hover:border-white/20 hover:bg-[#121217]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-pills px-3 py-1 text-[11px] font-whyte-mono uppercase tracking-[0.08em] bg-white/[0.04] text-soft-white border border-white/10">
                      {exp.employment_type || "Professional"}
                    </span>
                    <span className="text-xs font-whyte-mono text-steel">
                      {exp.duration_label || `${exp.start_date || ""} — ${exp.end_date || "Present"}`}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl sm:text-3xl font-whyte font-medium tracking-[-0.03em] text-almost-white">
                    {org}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base font-whyte font-normal text-lavender-mist">
                    {exp.role}
                  </p>

                  {exp.description && (
                    <p className="mt-4 text-sm font-whyte leading-relaxed text-steel">
                      {exp.description}
                    </p>
                  )}

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <span className="text-[10px] font-whyte-mono uppercase tracking-[0.14em] text-ash block mb-3">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-2 text-xs font-whyte text-soft-white/90">
                      {responsibilities.map((item, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="text-signal-violet mt-0.5 select-none font-bold">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-buttons px-2.5 py-1 text-[10px] font-whyte-mono text-ash bg-white/[0.02] border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Action Dock */}
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs font-whyte-mono tracking-[0.1em] uppercase text-steel text-center sm:text-left">
              DETAILED CAMPAIGNS, TIMELINES & VERIFIED CREDENTIALS
            </p>
            <GradientButton
              href="/experience"
              variant="purple"
              size="md"
              className="rounded-full px-7 shadow-[0_0_24px_rgba(175,80,255,0.35)]"
            >
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.12em]">
                <span>View All Experience</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </span>
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Skiper19 };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#af50ff"
        strokeWidth="20"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};

/**
 * Skiper 19 — React + framer motion
 * Inspired by and adapted from https://comgio.ai/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the comgio.ai . They’re independent recreations meant to study interaction design
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
