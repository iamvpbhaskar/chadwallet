"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShieldCheck, Award, Star } from "lucide-react";

interface TopHoldersProps {
  symbol: string;
}

interface HolderItem {
  address: string;
  share: number;
  badge: "Whale" | "Large Holder" | "Top Holder";
  badgeColor: string;
}

/**
 * Deterministically generates the top whale distribution data for the symbol.
 */
function generateSeededHolders(symbol: string): HolderItem[] {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  let seed = Math.abs(hash);
  
  const holders: HolderItem[] = [];
  
  // Defined badges & styles (completely emoji-free as requested)
  const badges: ("Top Holder" | "Whale" | "Large Holder")[] = [
    "Top Holder",
    "Whale",
    "Large Holder",
    "Large Holder",
    "Large Holder"
  ];
  
  const badgeColors = {
    "Top Holder": "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    "Whale": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    "Large Holder": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  };
  
  // Starting top holder percentage (e.g. 8.5% to 15.5%)
  const basePercent = 8.5 + (seed % 8);

  for (let i = 0; i < 5; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    
    // Construct mock Solana address
    const hexPart = seed.toString(16).padEnd(4, "f").substring(0, 4);
    const address = `H${symbol.substring(0, 2)}${i}x...${hexPart}`;
    
    // Progressive decay of ownership share
    const share = basePercent * (1 - i * 0.15);
    const badge = badges[i];

    holders.push({
      address,
      share: Math.max(0.2, share),
      badge,
      badgeColor: badgeColors[badge],
    });
  }

  return holders;
}

export function TopHolders({ symbol }: TopHoldersProps) {
  const holders = useMemo(() => {
    return generateSeededHolders(symbol);
  }, [symbol]);

  return (
    <div className="rounded-3xl border border-white/[0.04] bg-[#0b0c10]/40 p-5 backdrop-blur-xl flex flex-col gap-4.5">
      <div>
        <h2 className="font-outfit text-sm font-semibold tracking-wide text-slate-300 uppercase">
          Top Holders
        </h2>
        <p className="text-[10.5px] text-slate-500 font-medium font-inter mt-0.5">
          Whale distribution statistics for {symbol}
        </p>
      </div>

      <div className="flex flex-col select-none">
        {/* Header Row */}
        <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 pb-2.5 border-b border-white/[0.03]">
          <div className="w-[35%]">Address</div>
          <div className="w-[25%] text-right">Ownership</div>
          <div className="w-[40%] text-right">Rank</div>
        </div>

        {/* Dynamic Holders Rows */}
        <div className="flex flex-col gap-1 mt-2.5">
          {holders.map((holder, idx) => (
            <motion.div
              key={holder.address}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-center text-xs px-2 py-2.5 rounded-xl transition-colors duration-200 hover:bg-white/[0.01]"
            >
              {/* Address */}
              <div className="w-[35%] font-mono text-slate-400 font-medium truncate">
                {holder.address}
              </div>

              {/* Ownership % */}
              <div className="w-[25%] text-right font-mono font-semibold text-slate-200">
                {holder.share.toFixed(2)}%
              </div>

              {/* Badge Rank */}
              <div className="w-[40%] flex justify-end">
                <span className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wide uppercase whitespace-nowrap",
                  holder.badgeColor
                )}>
                  {holder.badge === "Top Holder" && <Award className="h-2 w-2" />}
                  {holder.badge === "Whale" && <ShieldCheck className="h-2 w-2" />}
                  {holder.badge === "Large Holder" && <Star className="h-2 w-2" />}
                  <span>{holder.badge}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
