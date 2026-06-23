"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "accent" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
}

export function GradientButton({
  variant = "primary",
  className,
  children,
  ...props
}: GradientButtonProps) {
  // Variant styles mapping - focused on premium, matte, non-flashy colors
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-slate-950 font-semibold shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:from-emerald-400 hover:to-teal-400",
    accent:
      "bg-[#8b5cf6] text-white font-semibold shadow-[0_4px_12px_rgba(139,92,246,0.2)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:bg-[#976eff]",
    secondary:
      "border border-white/[0.05] bg-white/[0.02] text-slate-200 backdrop-blur-md hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-white",
    ghost:
      "text-slate-400 hover:text-white hover:bg-white/[0.03]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer overflow-hidden",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Light sweep effect on hover */}
      {(variant === "primary" || variant === "accent") && (
        <span className="absolute inset-0 block -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      )}
      
      {/* Visual content */}
      <span className="relative z-10 flex items-center justify-center gap-1.5">
        {children}
      </span>
    </motion.button>
  );
}
