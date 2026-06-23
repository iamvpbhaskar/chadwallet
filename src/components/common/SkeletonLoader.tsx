import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  variant?: "text" | "circular" | "rectangular";
  className?: string;
}

export function SkeletonLoader({
  variant = "rectangular",
  className,
}: SkeletonLoaderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/[0.04] animate-pulse",
        variant === "text" && "h-4 w-full rounded",
        variant === "circular" && "h-12 w-12 rounded-full",
        variant === "rectangular" && "h-24 w-full rounded-2xl",
        className
      )}
    >
      {/* Ambient gradient shine overlay */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_2s_infinite]" />
      
      {/* Inject custom shimmer animation inline helper */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
