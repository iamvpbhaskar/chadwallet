"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTrendingTokens } from "@/hooks/useTrendingTokens";
import { formatPrice, FALLBACK_TOKENS } from "@/lib/api/birdeye";

interface LiveTradesProps {
  symbol: string;
}

interface TradeItem {
  id: string;
  isBuy: boolean;
  price: number;
  amount: number;
  valueUsd: number;
  time: string;
}

/**
 * Deterministically generates high-quality trade history logs for the symbol.
 */
function generateSeededTrades(symbol: string, currentPrice: number): TradeItem[] {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  let seed = Math.abs(hash);
  
  const trades: TradeItem[] = [];
  
  // Create fixed timestamps like 14:02, 14:01, 13:58, 13:54, 13:50, 13:45, 13:40, 13:32
  const baseHour = 14;
  const baseMinute = 2;
  const minuteOffsets = [0, 1, 4, 8, 12, 17, 22, 30];
  
  const times = minuteOffsets.map(offset => {
    let m = baseMinute - offset;
    let h = baseHour;
    while (m < 0) {
      m += 60;
      h -= 1;
    }
    if (h < 0) {
      h += 24;
    }
    const padH = String(h).padStart(2, "0");
    const padM = String(m).padStart(2, "0");
    return `${padH}:${padM}`;
  });
  
  for (let i = 0; i < 8; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const isBuy = (seed % 100) > 42; // ~58% buys, 42% sells
    
    seed = (seed * 9301 + 49297) % 233280;
    // Price variation ±0.6%
    const priceDeviation = 1 + ((seed % 120) - 60) / 10000;
    const price = currentPrice * priceDeviation;
    
    seed = (seed * 9301 + 49297) % 233280;
    // Amount ranges based on token price scale
    let amount = 0;
    if (currentPrice > 100) {
      amount = (seed % 15) + 1; // 1-15 SOL
    } else if (currentPrice > 1) {
      amount = (seed % 500) + 10; // 10-510 WIF/POPCAT
    } else {
      amount = (seed % 50000) + 1000; // 1000-51000 BONK/GIGA
    }
    
    trades.push({
      id: `${symbol}-tr-${i}`,
      isBuy,
      price,
      amount,
      valueUsd: amount * price,
      time: times[i],
    });
  }
  return trades;
}

export function LiveTrades({ symbol }: LiveTradesProps) {
  const { data: tokens } = useTrendingTokens();
  const [liveTrades, setLiveTrades] = useState<TradeItem[]>([]);

  // Retrieve current active token price to scale the trades accurately
  const activeToken = useMemo(() => {
    if (tokens) {
      const found = tokens.find(t => t.symbol.toUpperCase() === symbol.toUpperCase());
      if (found) return found;
    }
    const fallback = FALLBACK_TOKENS.find(t => t.symbol.toUpperCase() === symbol.toUpperCase());
    if (fallback) return fallback;
    
    // Custom dynamic fallback price scale
    let hash = 0;
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
    }
    const priceNum = ((Math.abs(hash) % 999) + 1) / 100;
    return { priceNum };
  }, [tokens, symbol]);

  useEffect(() => {
    // Initialize deterministic list
    const initialTrades = generateSeededTrades(symbol, activeToken.priceNum || 1.0);
    setLiveTrades(initialTrades);

    // Dynamic trade append interval
    const interval = setInterval(() => {
      setLiveTrades((prev) => {
        if (prev.length === 0) return prev;
        const lastPrice = activeToken.priceNum || 1.0;
        const isBuy = Math.random() > 0.45;
        const priceDev = 1 + (Math.random() * 0.003 - 0.0015);
        const price = lastPrice * priceDev;
        
        let amount = 0;
        if (lastPrice > 100) {
          amount = Math.random() * 10 + 0.5;
        } else if (lastPrice > 1) {
          amount = Math.random() * 300 + 5;
        } else {
          amount = Math.random() * 30000 + 500;
        }

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

        const newTrade: TradeItem = {
          id: `${symbol}-tr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          isBuy,
          price,
          amount,
          valueUsd: amount * price,
          time: timeStr,
        };

        return [newTrade, ...prev.slice(0, 7)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [symbol, activeToken]);

  return (
    <div className="rounded-3xl border border-white/[0.04] bg-[#0b0c10]/40 p-5 backdrop-blur-xl flex flex-col gap-4.5">
      <div>
        <h2 className="font-outfit text-sm font-semibold tracking-wide text-slate-300 uppercase">
          Recent Executions
        </h2>
        <p className="text-[10.5px] text-slate-500 font-medium font-inter mt-0.5">
          Simulated order history for {symbol}
        </p>
      </div>

      <div className="flex flex-col select-none">
        {/* Header Row */}
        <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 pb-2.5 border-b border-white/[0.03]">
          <div className="w-1/4">Type</div>
          <div className="w-1/4 text-right">Price</div>
          <div className="w-1/4 text-right">Size</div>
          <div className="w-1/4 text-right">Time</div>
        </div>

        {/* Dynamic Trades Rows */}
        <div className="flex flex-col gap-1 mt-2.5 min-h-[295px]">
          <AnimatePresence initial={false}>
            {liveTrades.map((trade) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 6, height: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="flex items-center text-xs px-2 py-2 rounded-xl transition-colors duration-200 hover:bg-white/[0.01] overflow-hidden"
              >
                {/* Type Badge */}
                <div className="w-1/4 flex items-center">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                      trade.isBuy
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    )}
                  >
                    {trade.isBuy ? "BUY" : "SELL"}
                  </span>
                </div>

                {/* Price */}
                <div className={cn(
                  "w-1/4 text-right font-mono font-medium",
                  trade.isBuy ? "text-emerald-500/80" : "text-rose-500/80"
                )}>
                  {formatPrice(trade.price)}
                </div>

                {/* Amount */}
                <div className="w-1/4 text-right font-mono text-slate-400 font-medium">
                  {trade.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>

                {/* Timestamp */}
                <div className="w-1/4 text-right font-mono text-slate-500 font-medium">
                  {trade.time}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
