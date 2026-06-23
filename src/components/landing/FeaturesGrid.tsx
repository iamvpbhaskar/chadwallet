"use client";

import React from "react";
import { GlassCard } from "../common/GlassCard";
import { Zap, BrainCircuit, Eye, ShieldCheck } from "lucide-react";

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "green" | "purple";
}

const features: FeatureItem[] = [
  {
    id: "speed",
    icon: <Zap className="h-5 w-5 text-emerald-400" />,
    title: "Lightning Fast Swaps",
    description:
      "Execute transactions on Solana in less than 100ms. Powered by direct RPC endpoints and intelligent routing.",
    color: "green",
  },
  {
    id: "ai",
    icon: <BrainCircuit className="h-5 w-5 text-purple-400" />,
    title: "AI Market Insights",
    description:
      "Receive real-time sentiment analysis and trend flags. Spot breakout opportunities before they hit general feeds.",
    color: "purple",
  },
  {
    id: "whales",
    icon: <Eye className="h-5 w-5 text-emerald-400" />,
    title: "Whale Radar Alerts",
    description:
      "Monitor heavy buyers and seller wallets. Understand coin concentration and copy-trade top performers.",
    color: "green",
  },
  {
    id: "security",
    icon: <ShieldCheck className="h-5 w-5 text-purple-400" />,
    title: "Secure Privy Sandbox",
    description:
      "Log in instantly with Google or Apple credentials. Your private keys are securely encrypted inside Privy nodes.",
    color: "purple",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative px-8 py-20 border-b border-white/[0.01]" id="features">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16">
          {/* Header */}
          <div className="text-center max-w-2xl flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
              Trading Elevated to <span className="text-gradient-primary font-black">Next Level</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md mx-auto">
              Packed with powerful features, designed for clarity, and built with professional engineering standards.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
            {features.map((feature) => (
              <GlassCard
                key={feature.id}
                glowColor={feature.color}
                className="p-8 group border-white/[0.04] bg-[#0c0e14]/50"
              >
                <div className="flex flex-col gap-4.5 items-start">
                  {/* Icon wrapper - minimal */}
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.05] transition-colors duration-300 group-hover:bg-white/[0.05]">
                    {feature.icon}
                  </div>

                  {/* Info Text */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 font-heading">
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-400 font-sans">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
