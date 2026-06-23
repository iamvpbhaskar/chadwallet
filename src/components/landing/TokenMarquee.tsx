"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTrendingTokens } from "@/hooks/useTrendingTokens";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";

interface TokenMarqueeProps {
  reverse?: boolean;
}

const SkeletonCard = () => (
  <div className="flex items-center gap-4 rounded-2xl border border-white/[0.02] bg-[#0c0d12]/30 px-5 py-2.5">
    {/* Avatar placeholder */}
    <SkeletonLoader variant="circular" className="h-7.5 w-7.5 !rounded-lg" />
    
    {/* Symbol & Price placeholders */}
    <div className="flex flex-col gap-1.5">
      <SkeletonLoader variant="text" className="h-3.5 w-10 rounded" />
      <SkeletonLoader variant="text" className="h-2.5 w-14 rounded" />
    </div>
    
    {/* Trend & Sparkline placeholders */}
    <div className="flex items-center gap-3 ml-1.5">
      <SkeletonLoader variant="text" className="h-2.5 w-8 rounded" />
      <SkeletonLoader variant="rectangular" className="w-9 h-3.5 rounded" />
    </div>
  </div>
);

export function TokenMarquee({ reverse = false }: TokenMarqueeProps) {
  const { data: tokens, isLoading } = useTrendingTokens();

  // Duplicate items to achieve a seamless loop in marquee scrolling
  const listItems = tokens ? [...tokens, ...tokens, ...tokens] : [];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.02] bg-[#08090d]/60 py-4.5 backdrop-blur-sm">
      {/* Side gradients to mask visual edges */}
      <div className="absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#08090d] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#08090d] to-transparent pointer-events-none" />

      {/* Marquee Runner */}
      <div className="flex w-max">
        <div
          className={cn(
            "flex gap-5 px-3",
            reverse 
              ? "animate-marquee-reverse hover:[animation-play-state:paused]" 
              : "animate-marquee hover:[animation-play-state:paused]"
          )}
        >
          {isLoading ? (
            // Render beautiful custom skeleton card loop when fetching
            Array(10)
              .fill(0)
              .map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
          ) : (
            listItems.map((token, index) => {
              const isPositive = token.change24h >= 0;
              const sparklinePath = token.sparkline
                .map((val, i) => `${i === 0 ? "M" : "L"} ${i} ${val.toFixed(2)}`)
                .join(" ");

              return (
                <Link
                  key={`${token.symbol}-${index}`}
                  href={`/trade/${token.symbol}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.02] bg-[#0c0d12]/30 hover:bg-[#0c0d12]/60 hover:border-white/[0.05] px-5 py-2.5 transition-all duration-300 pointer-events-auto cursor-pointer"
                >
                  {/* Avatar wrapper supporting broken image fallbacks */}
                  <div className="relative h-7.5 w-7.5 flex items-center justify-center">
                    {token.logoURI ? (
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="h-7.5 w-7.5 rounded-lg object-cover select-none pointer-events-none"
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
                        "flex h-7.5 w-7.5 items-center justify-center rounded-lg border text-[10px] font-bold font-mono select-none",
                        token.colorClass
                      )}
                      style={token.logoURI ? { display: "none" } : undefined}
                    >
                      {token.char}
                    </div>
                  </div>

                  {/* Coin Info */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-300">{token.symbol}</span>
                    </div>
                    <span className="font-mono text-[9.5px] text-slate-500 font-medium">{token.price}</span>
                  </div>

                  {/* Trend Stats */}
                  <div className="flex items-center gap-3 ml-1.5">
                    <div
                      className={cn(
                        "flex items-center gap-0.5 text-[9.5px] font-bold",
                        isPositive ? "text-emerald-500/80" : "text-rose-500/80"
                      )}
                    >
                      {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                      <span>{isPositive ? "+" : ""}{token.change24h.toFixed(2)}%</span>
                    </div>

                    {/* SVG Sparkline - Normalized dynamic path */}
                    <svg className="w-9 h-3.5 overflow-visible opacity-50" viewBox="0 0 7 7">
                      <path
                        d={sparklinePath}
                        fill="none"
                        stroke={isPositive ? "#10b981" : "#f43f5e"}
                        strokeWidth="0.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
