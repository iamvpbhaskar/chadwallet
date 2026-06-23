"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { TokenData } from "@/types/token";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";

interface TrendingSidebarProps {
  tokens: TokenData[];
  activeSymbol: string;
  isLoading: boolean;
}

const SidebarSkeleton = () => (
  <div className="flex flex-col gap-3">
    {Array(8)
      .fill(0)
      .map((_, i) => (
        <div 
          key={`sidebar-sk-${i}`}
          className="flex items-center gap-3 rounded-2xl border border-white/[0.02] bg-[#0c0d12]/20 p-3.5"
        >
          <SkeletonLoader variant="circular" className="h-8 w-8 !rounded-lg" />
          <div className="flex-1 flex flex-col gap-1.5">
            <SkeletonLoader variant="text" className="h-3 w-12 rounded" />
            <SkeletonLoader variant="text" className="h-2.5 w-16 rounded" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <SkeletonLoader variant="text" className="h-3 w-10 rounded" />
            <SkeletonLoader variant="rectangular" className="w-8 h-3 rounded" />
          </div>
        </div>
      ))}
  </div>
);

export function TrendingSidebar({ tokens, activeSymbol, isLoading }: TrendingSidebarProps) {
  return (
    <div className="rounded-3xl border border-white/[0.04] bg-[#0b0c10]/40 p-5 backdrop-blur-xl flex flex-col gap-4.5">
      <div>
        <h2 className="font-outfit text-sm font-semibold tracking-wide text-slate-300 uppercase">
          Trending Assets
        </h2>
        <p className="text-[10.5px] text-slate-500 font-medium font-inter mt-0.5">
          Real-time hot Solana movers
        </p>
      </div>

      {isLoading ? (
        <SidebarSkeleton />
      ) : (
        <div className="flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-1 select-none">
          {tokens.map((token) => {
            const isActive = token.symbol.toUpperCase() === activeSymbol.toUpperCase();
            const isPositive = token.change24h >= 0;
            const sparklinePath = token.sparkline
              .map((val, i) => `${i === 0 ? "M" : "L"} ${i} ${val.toFixed(2)}`)
              .join(" ");

            return (
              <Link
                key={token.address}
                href={`/trade/${token.symbol}`}
                className={cn(
                  "flex items-center gap-3.5 rounded-2xl border p-4 transition-all duration-300",
                  isActive
                    ? "bg-white/[0.03] border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                    : "bg-[#0b0c10]/20 border-white/[0.02] hover:bg-[#0c0d12]/50 hover:border-white/[0.04] cursor-pointer"
                )}
              >
                {/* Logo / Initials Badge */}
                <div className="relative h-8 w-8 shrink-0 flex items-center justify-center">
                  {token.logoURI ? (
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      className="h-8 w-8 rounded-lg object-cover select-none pointer-events-none"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = "none";
                        const fallback = img.nextElementSibling;
                        if (fallback) {
                          fallback.removeAttribute("style");
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg border text-[10px] font-bold font-mono",
                      token.colorClass
                    )}
                    style={token.logoURI ? { display: "none" } : undefined}
                  >
                    {token.char}
                  </div>
                </div>

                {/* Symbols & Prices */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-slate-200 truncate">
                      {token.symbol}
                    </span>
                  </div>
                  <span className="font-mono text-[9.5px] text-slate-500 font-medium">
                    {token.price}
                  </span>
                </div>

                {/* Change & Sparkline */}
                <div className="flex flex-col items-end shrink-0 gap-1.5">
                  <div
                    className={cn(
                      "flex items-center gap-0.5 text-[9.5px] font-bold",
                      isPositive ? "text-emerald-500/80" : "text-rose-500/80"
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-2.5 w-2.5" />
                    ) : (
                      <TrendingDown className="h-2.5 w-2.5" />
                    )}
                    <span>{isPositive ? "+" : ""}{token.change24h.toFixed(2)}%</span>
                  </div>

                  {/* Sparkline */}
                  <svg className="w-8 h-2.5 overflow-visible opacity-40" viewBox="0 0 7 7">
                    <path
                      d={sparklinePath}
                      fill="none"
                      stroke={isPositive ? "#10b981" : "#f43f5e"}
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
