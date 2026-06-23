"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverGlow?: boolean;
  glowColor?: "green" | "purple" | "mixed" | "none";
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({
  hoverGlow = true,
  glowColor = "purple",
  className,
  children,
  ...props
}: GlassCardProps) {
  // Map colors to extremely soft ambient glows to avoid flashy neon effects
  const glowStyles = {
    purple: "from-purple-500/6 to-indigo-500/0",
    green: "from-emerald-500/6 to-teal-500/0",
    mixed: "from-purple-500/4 via-emerald-500/4 to-transparent",
    none: "transparent",
  };

  return (
    <motion.div
      whileHover={hoverGlow ? { y: -2, scale: 1.01, transition: { type: "spring", stiffness: 300, damping: 25 } } : undefined}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.04] bg-[#0b0c10]/40 p-6 backdrop-blur-xl transition-colors duration-300",
        hoverGlow && "hover:border-white/[0.08] hover:bg-[#0b0c10]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
        className
      )}
      {...props}
    >
      {/* Background glow overlay */}
      {hoverGlow && glowColor !== "none" && (
        <div
          className={cn(
            "absolute -inset-px -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-100",
            glowStyles[glowColor]
          )}
        />
      )}

      {/* Extremely soft decorative gradient corner glow */}
      {glowColor !== "none" && (
        <div
          className={cn(
            "absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl opacity-10 transition-opacity duration-700 group-hover:opacity-20",
            glowColor === "purple" && "bg-purple-500",
            glowColor === "green" && "bg-emerald-500",
            glowColor === "mixed" && "bg-purple-500/40 bg-emerald-500/40"
          )}
        />
      )}

      {/* Inner Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
