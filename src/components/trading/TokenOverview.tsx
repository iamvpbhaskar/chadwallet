"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Layers, Landmark, BarChart3 } from "lucide-react";
import { TokenData } from "@/types/token";

interface TokenOverviewProps {
  token: TokenData;
}

function formatCompactNumber(num: number): string {
  if (num === 0) return "$0";
  const absNum = Math.abs(num);
  let formatted = "";
  if (absNum >= 1e9) {
    formatted = (num / 1e9).toFixed(2);
    formatted = formatted.replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
    return `$${formatted}B`;
  }
  if (absNum >= 1e6) {
    formatted = (num / 1e6).toFixed(2);
    formatted = formatted.replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
    return `$${formatted}M`;
  }
  if (absNum >= 1e3) {
    formatted = (num / 1e3).toFixed(2);
    formatted = formatted.replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
    return `$${formatted}K`;
  }
  return `$${num.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

/**
 * Derives stable mock metrics based on a token's symbol seed.
 * Ensures data is unique and consistent on re-renders.
 */
function getSeededStats(symbol: string) {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  const seed = Math.abs(hash);
  
  // Market Cap: $5M - $1.2B
  const mcap = 5000000 + (seed % 1195) * 1000000;
  // Volume: 5% to 25% of Market Cap
  const volume = mcap * (0.05 + (seed % 20) / 100);
  // Liquidity: 2% to 10% of Market Cap
  const liquidity = mcap * (0.02 + (seed % 8) / 100);
  
  return {
    mcap: formatCompactNumber(mcap),
    volume: formatCompactNumber(volume),
    liquidity: formatCompactNumber(liquidity),
  };
}

export function TokenOverview({ token }: TokenOverviewProps) {
  const isPositive = token.change24h >= 0;
  const stats = getSeededStats(token.symbol);

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0c0d12]/65 p-7 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 select-none">
      {/* Token Name, Logo, Price Banner */}
      <div className="flex items-center gap-5">
        {/* Token Logo */}
        <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
          {token.logoURI ? (
            <img
              src={token.logoURI}
              alt={token.symbol}
              className="h-14 w-14 rounded-2xl object-cover select-none pointer-events-none"
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
              "flex h-14 w-14 items-center justify-center rounded-2xl border text-base font-bold font-mono",
              token.colorClass
            )}
            style={token.logoURI ? { display: "none" } : undefined}
          >
            {token.char}
          </div>
        </div>

        {/* Headings */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline gap-2.5">
            <h1 className="font-outfit text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none">
              {token.name}
            </h1>
            <span className="font-mono text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              {token.symbol} • Solana
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl md:text-2xl font-bold text-white leading-none tracking-tight">
              {token.price}
            </span>
            <div
              className={cn(
                "flex items-center gap-1 text-xs md:text-sm font-extrabold px-2.5 py-1 rounded-full border leading-none shrink-0",
                isPositive 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" 
                  : "bg-rose-500/10 text-rose-400 border-rose-500/10"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{isPositive ? "+" : ""}{token.change24h.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Indicators Grid */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-white/[0.04] pt-6 md:pt-0 md:pl-8 min-w-0">
        {/* Market Cap */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Landmark className="h-3 w-3" />
            <span className="text-[10px] font-semibold uppercase tracking-wider font-inter">
              Market Cap
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-slate-300">
            {stats.mcap}
          </span>
        </div>

        {/* 24h Volume */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <BarChart3 className="h-3 w-3" />
            <span className="text-[10px] font-semibold uppercase tracking-wider font-inter">
              24h Volume
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-slate-300">
            {stats.volume}
          </span>
        </div>

        {/* Liquidity */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Layers className="h-3 w-3" />
            <span className="text-[10px] font-semibold uppercase tracking-wider font-inter">
              Liquidity
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-slate-300">
            {stats.liquidity}
          </span>
        </div>
      </div>
    </div>
  );
}
