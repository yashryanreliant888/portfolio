"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ColorVariant = "purple" | "emerald" | "orange";
export type ButtonSize = "sm" | "md" | "lg";

interface GradientColors {
  dark: {
    border: string;
    overlay: string;
    accent: string;
    text: string;
    glow: string;
    textGlow: string;
    hover: string;
  };
  light: {
    border: string;
    base: string;
    overlay: string;
    accent: string;
    text: string;
    glow: string;
    hover: string;
  };
}

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: ColorVariant;
  size?: ButtonSize;
}

const gradientColors: Record<ColorVariant, GradientColors> = {
  purple: {
    dark: {
      border: "from-[#af50ff] via-[#2a1347] to-[#7916e2]",
      overlay: "from-[#af50ff]/30 via-[#15142b] to-[#7916e2]/30",
      accent: "from-[#e1bdff]/25 via-[#15142b] to-[#af50ff]/30",
      text: "from-[#ffffff] via-[#f1e4ff] to-[#d6bcfa]",
      glow: "rgba(175,80,255,0.35)",
      textGlow: "rgba(225,189,255,0.6)",
      hover: "from-[#af50ff]/35 via-[#e1bdff]/20 to-[#7916e2]/35",
    },
    light: {
      border: "from-purple-400 via-purple-300 to-purple-200",
      base: "from-purple-50 via-purple-50/80 to-purple-50/90",
      overlay: "from-purple-300/30 via-purple-200/20 to-purple-400/20",
      accent: "from-purple-400/20 via-purple-300/10 to-purple-200/30",
      text: "from-purple-700 to-purple-600",
      glow: "rgba(159,122,234,0.2)",
      hover: "from-purple-300/30 via-purple-200/20 to-purple-300/30",
    },
  },
  emerald: {
    dark: {
      border: "from-[#336C4F] via-[#0C1F21] to-[#0D6437]",
      overlay: "from-[#347B52]/40 via-[#0C1F21] to-[#0D6437]/30",
      accent: "from-[#87F6B7]/10 via-[#0C1F21] to-[#17362A]/50",
      text: "from-[#8AEECA] to-[#73F8A8]",
      glow: "rgba(135,246,183,0.2)",
      textGlow: "rgba(135,246,183,0.4)",
      hover: "from-[#17362A]/20 via-[#87F6B7]/10 to-[#17362A]/20",
    },
    light: {
      border: "from-emerald-400 via-emerald-300 to-emerald-200",
      base: "from-emerald-50 via-emerald-50/80 to-emerald-50/90",
      overlay: "from-emerald-300/30 via-emerald-200/20 to-emerald-400/20",
      accent: "from-emerald-400/20 via-emerald-300/10 to-emerald-200/30",
      text: "from-emerald-700 to-emerald-600",
      glow: "rgba(52,211,153,0.2)",
      hover: "from-emerald-300/30 via-emerald-200/20 to-emerald-300/30",
    },
  },
  orange: {
    dark: {
      border: "from-[#C05621] via-[#0C1F21] to-[#9C4221]",
      overlay: "from-[#DD6B20]/40 via-[#0C1F21] to-[#C05621]/30",
      accent: "from-[#FED7AA]/10 via-[#0C1F21] to-[#7B341E]/50",
      text: "from-[#FED7AA] to-[#FBD38D]",
      glow: "rgba(237,137,54,0.2)",
      textGlow: "rgba(237,137,54,0.4)",
      hover: "from-[#7B341E]/20 via-[#ED8936]/10 to-[#7B341E]/20",
    },
    light: {
      border: "from-orange-400 via-orange-300 to-orange-200",
      base: "from-orange-50 via-orange-50/80 to-orange-50/90",
      overlay: "from-orange-300/30 via-orange-200/20 to-orange-400/20",
      accent: "from-orange-400/20 via-orange-300/10 to-orange-200/30",
      text: "from-orange-700 to-orange-600",
      glow: "rgba(237,137,54,0.2)",
      hover: "from-orange-300/30 via-orange-200/20 to-orange-300/30",
    },
  },
};

const sizeStyles: Record<ButtonSize, { button: string; text: string }> = {
  sm: {
    button: "h-9 px-4 text-xs",
    text: "text-xs font-medium",
  },
  md: {
    button: "h-12 px-6 text-sm",
    text: "text-sm font-medium",
  },
  lg: {
    button: "h-14 px-8 text-base",
    text: "text-base font-semibold",
  },
};

export function GradientButton({
  href,
  target,
  rel,
  label,
  children,
  icon,
  className,
  variant = "purple",
  size = "md",
  disabled,
  type = "button",
  onClick,
  ...props
}: GradientButtonProps) {
  const colors = gradientColors[variant] || gradientColors.purple;
  const currentSize = sizeStyles[size] || sizeStyles.md;

  const content = (
    <>
      {/* Outer border gradient layer */}
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] bg-gradient-to-b p-[1.5px] transition-all duration-300",
          colors.light.border,
          colors.dark.border
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit] opacity-90",
            "bg-white/80 dark:bg-[#0c0d14]"
          )}
        />
      </div>

      {/* Base background layer */}
      <div
        className={cn(
          "absolute inset-[1.5px] rounded-[inherit] opacity-95 transition-all duration-300",
          "bg-white/90 dark:bg-[#0c0d14]"
        )}
      />

      {/* Radiant gradient layers */}
      <div
        className={cn(
          "absolute inset-[1.5px] rounded-[inherit] bg-gradient-to-r opacity-90 transition-opacity duration-300",
          colors.light.base,
          "dark:from-[#17142b] dark:via-[#0c0d14] dark:to-[#17142b]"
        )}
      />
      <div
        className={cn(
          "absolute inset-[1.5px] rounded-[inherit] bg-gradient-to-b opacity-80 transition-opacity duration-300",
          colors.light.overlay,
          colors.dark.overlay
        )}
      />
      <div
        className={cn(
          "absolute inset-[1.5px] rounded-[inherit] bg-gradient-to-br transition-opacity duration-300",
          colors.light.accent,
          colors.dark.accent
        )}
      />

      {/* Inner ambient glow */}
      <div
        className={cn(
          "absolute inset-[1.5px] rounded-[inherit] transition-all duration-300",
          `shadow-[inset_0_0_12px_${colors.light.glow}]`,
          `dark:shadow-[inset_0_0_14px_${colors.dark.glow}]`,
          "group-hover:shadow-[inset_0_0_22px_rgba(175,80,255,0.45)]"
        )}
      />

      {/* Interactive hover overlay */}
      <div
        className={cn(
          "absolute inset-[1.5px] rounded-[inherit] bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          colors.light.hover,
          colors.dark.hover
        )}
      />

      {/* Outer hover bloom */}
      <div
        className={cn(
          "absolute -inset-[1px] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none",
          `shadow-[0_0_30px_${colors.dark.glow}]`
        )}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex items-center justify-center gap-2.5 whitespace-nowrap transition-transform duration-200 group-hover:scale-[1.02]">
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span
          className={cn(
            "bg-gradient-to-b bg-clip-text font-whyte text-transparent tracking-normal transition-all duration-300 whitespace-nowrap inline-flex items-center justify-center",
            currentSize.text,
            colors.light.text,
            colors.dark.text,
            `dark:drop-shadow-[0_0_12px_${colors.dark.textGlow}]`
          )}
        >
          {children ?? label ?? "Click here"}
        </span>
      </div>
    </>
  );

  const buttonClasses = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-whyte transition-all duration-300 cursor-pointer select-none whitespace-nowrap shrink-0",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#af50ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]",
    disabled ? "pointer-events-none opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5 active:translate-y-0",
    currentSize.button,
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        aria-disabled={disabled}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
}

export default GradientButton;
