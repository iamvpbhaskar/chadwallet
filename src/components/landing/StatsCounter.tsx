"use client";

import React from "react";
import { GlassCard } from "../common/GlassCard";
import { AnimatedCounter } from "../common/AnimatedCounter";
import { Coins, Flame, Landmark, Users } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: React.ReactNode;
  color: "green" | "purple";
}

const stats: StatItem[] = [
  {
    id: "volume",
    label: "Total Trading Volume",
    value: 1.2,
    prefix: "$",
    suffix: "B+",
    decimals: 1,
    icon: <Landmark className="h-4.5 w-4.5 text-emerald-400" />,
    color: "green",
  },
  {
    id: "users",
    label: "Active Users",
    value: 250,
    suffix: "K+",
    decimals: 0,
    icon: <Users className="h-4.5 w-4.5 text-purple-400" />,
    color: "purple",
  },
  {
    id: "trades",
    label: "Trades Today",
    value: 120,
    suffix: "K+",
    decimals: 0,
    icon: <Flame className="h-4.5 w-4.5 text-emerald-400" />,
    color: "green",
  },
  {
    id: "tokens",
    label: "Trending Tokens Listed",
    value: 540,
    decimals: 0,
    icon: <Coins className="h-4.5 w-4.5 text-purple-400" />,
    color: "purple",
  },
];

export function StatsCounter() {
  return (
    <section className="relative px-8 py-16 border-b border-white/[0.01]" id="stats">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <GlassCard
              key={stat.id}
              glowColor={stat.color}
              className="p-8 relative group"
            >
              <div className="flex flex-col gap-5 items-start">
                {/* Icon Container - clean & minimal */}
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.05] transition-colors duration-300 group-hover:bg-white/[0.04]">
                  {stat.icon}
                </div>

                {/* Counts and details */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-white flex items-center gap-0.5 font-heading tabular-nums">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">{stat.label}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
