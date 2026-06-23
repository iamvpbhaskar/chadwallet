"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../common/GlassCard";
import { Search, LineChart, Zap } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "green" | "purple";
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Scan the network in real-time. Detect social sentiment surges, sudden volume spikes, and smart wallet positions as they happen.",
    icon: <Search className="h-5 w-5 text-emerald-400" />,
    color: "green",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "Deep dive into contract parameters, developer allocations, and whale holdings to calculate safety scores instantly.",
    icon: <LineChart className="h-5 w-5 text-purple-400" />,
    color: "purple",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Connect your sandbox wallet and execute trades via Jupiter Aggregator with custom slippage controls.",
    icon: <Zap className="h-5 w-5 text-emerald-400" />,
    color: "green",
  },
];

export function WorkflowSection() {
  return (
    <section className="relative px-8 py-20 border-b border-white/[0.01]" id="workflow">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-20">
          
          {/* Header */}
          <div className="text-center max-w-2xl flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-heading">
              Simplifying execution.
            </h2>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md mx-auto">
              A clean workflow optimized to minimize overhead and help you manage risk with confidence.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 w-full max-w-6xl">
            {/* Visual connector line in between steps on tablet/desktop - subtle dotted connectors only */}
            <div className="absolute top-1/2 left-28 right-28 h-0 -translate-y-1/2 border-t-2 border-dashed border-white/[0.06] hidden md:block -z-10" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative h-full"
              >
                <GlassCard
                  glowColor={step.color}
                  className="flex flex-col gap-6 p-12 relative border-white/[0.03] bg-[#0c0e14]/50 h-full"
                >
                  {/* Step Number Badge - large, low opacity, Outfit font */}
                  <div className="absolute top-4 right-8 text-4xl font-extrabold text-white/[0.02] select-none font-heading">
                    {step.number}
                  </div>

                  {/* Icon Wrapper */}
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.01] border border-white/[0.05] p-3">
                    {step.icon}
                  </div>

                  {/* Titles */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-base font-bold text-white font-heading">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-400 font-sans font-medium">{step.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
