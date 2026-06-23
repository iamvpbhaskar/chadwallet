"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// Particle data for 8 extremely subtle, drifting background circles
const subtleParticles = [
  { id: 1, size: 8, x: "15%", y: "20%", duration: 25, delay: 0 },
  { id: 2, size: 12, x: "75%", y: "15%", duration: 30, delay: 2 },
  { id: 3, size: 6, x: "85%", y: "45%", duration: 22, delay: 5 },
  { id: 4, size: 10, x: "10%", y: "60%", duration: 28, delay: 1 },
  { id: 5, size: 8, x: "25%", y: "75%", duration: 26, delay: 3 },
  { id: 6, size: 12, x: "70%", y: "80%", duration: 32, delay: 4 },
  { id: 7, size: 6, x: "50%", y: "10%", duration: 24, delay: 6 },
  { id: 8, size: 10, x: "40%", y: "85%", duration: 27, delay: 2 },
];

export function HeroSection() {
  const { login, authenticated } = usePrivy();
  const router = useRouter();

  const handleStartTrading = () => {
    if (authenticated) {
      router.push("/trade/WIF");
    } else {
      login();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.02,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 95,
        damping: 20,
      },
    },
  } as const;

  return (
    <section className="relative overflow-hidden pt-16 pb-16 border-b border-white/[0.01]">
      {/* 1. Subtle Drifting Particles (6-10 total, opacity 0.1-0.2, no starfield) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {subtleParticles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: ["0px", "-40px", "0px"],
              x: ["0px", "20px", "0px"],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
            className="absolute rounded-full bg-slate-500/[0.12] blur-[1px]"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}
      </div>

      {/* 2. Soft Blurred Blobs */}
      <div className="absolute top-1/4 left-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-8 flex flex-col items-center">
        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-7 text-center max-w-3xl z-10"
        >
          {/* Simple badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.04] bg-white/[0.01] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 backdrop-blur-md"
          >
            <Sparkles className="h-3 w-3 text-emerald-400" />
            <span>Built for Solana traders</span>
          </motion.div>

          {/* Heading - Outfit typography with deep text shadow for depth */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08] font-heading drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            Trade Solana memecoins <br />
            <span className="text-slate-400 font-bold">with absolute clarity.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-slate-400 sm:text-sm max-w-md leading-relaxed font-sans"
          >
            A high-fidelity trading dashboard integrated with Privy security and BirdEye indexing. Engineered for speed, designed with restraint.
          </motion.p>

          {/* Clean CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full justify-center sm:w-auto"
          >
            <button
              onClick={handleStartTrading}
              className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl bg-white text-[#08090d] hover:bg-slate-200 px-7 py-3 text-xs uppercase tracking-wider shadow-lg select-none cursor-pointer"
            >
              Start Trading
            </button>
            <a
              href="#download"
              className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl border border-white/[0.06] bg-[#0c0d12]/40 hover:bg-[#0c0d12]/80 px-7 py-3 text-xs uppercase tracking-wider text-slate-200 hover:text-white select-none cursor-pointer"
            >
              Download App
            </a>
          </motion.div>
        </motion.div>

        {/* 3. Layered Dashboard Preview Below the Hero (Wallet, Swaps, Allocation) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 20, delay: 0.4 }}
          className="relative w-full max-w-4xl mt-12 md:mt-16 min-h-[300px] flex items-center justify-center px-4 md:px-0 z-10"
        >
          {/* Left Card: Recent Swaps */}
          <motion.div
            initial={{ x: -20, y: 20, rotate: -2, opacity: 0 }}
            animate={{ x: -230, y: 25, rotate: -3, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 w-[230px] rounded-3xl border border-white/[0.04] bg-[#0c0d12]/60 p-5 backdrop-blur-xl shadow-2xl hidden md:flex flex-col gap-4 text-left"
          >
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
              <span>Recent Swaps</span>
              <RefreshCw className="h-3 w-3 text-slate-500 animate-spin-slow" />
            </div>

            <div className="flex flex-col gap-3">
              {[
                { type: "swap", desc: "SOL → WIF", time: "2 min ago", amount: "+69.34 WIF", isGreen: true },
                { type: "swap", desc: "BONK → SOL", time: "12 min ago", amount: "+0.45 SOL", isGreen: true },
                { type: "swap", desc: "SOL → GIGA", time: "1 hr ago", amount: "+10K GIGA", isGreen: true }
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-[10px]">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-200">{log.desc}</span>
                    <span className="text-[8px] text-slate-500">{log.time}</span>
                  </div>
                  <span className={cn("font-mono font-bold", log.isGreen ? "text-emerald-400" : "text-rose-400")}>
                    {log.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Card: Portfolio Allocation */}
          <motion.div
            initial={{ x: 20, y: 20, rotate: 2, opacity: 0 }}
            animate={{ x: 230, y: 35, rotate: 3, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 w-[230px] rounded-3xl border border-white/[0.04] bg-[#0c0d12]/60 p-5 backdrop-blur-xl shadow-2xl hidden md:flex flex-col gap-4 text-left"
          >
            <div className="border-b border-white/[0.03] pb-2 text-[9px] font-bold uppercase tracking-wider text-slate-500">
              Allocation
            </div>

            <div className="flex flex-col gap-3">
              {[
                { coin: "WIF", pct: "53%", color: "bg-purple-500" },
                { coin: "SOL", pct: "39%", color: "bg-emerald-500" },
                { coin: "POPCAT", pct: "8%", color: "bg-blue-500" }
              ].map((alloc, i) => (
                <div key={i} className="flex flex-col gap-1 text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-300">{alloc.coin}</span>
                    <span className="font-mono text-slate-400">{alloc.pct}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", alloc.color)} style={{ width: alloc.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center Card: Wallet Overview */}
          <motion.div
            className="relative w-full max-w-[330px] rounded-3xl border border-white/[0.04] bg-[#0c0e14]/80 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5 text-left"
          >
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-3 text-xs">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Portfolio</span>
                <span className="text-[10px] font-mono font-bold text-slate-300">chad...8W9</span>
              </div>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[8px] font-bold text-emerald-400 border border-emerald-500/15">Connected</span>
            </div>

            <div className="flex flex-col gap-1 py-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Total Balance</span>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">$4,852.19</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <button className="flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 transition-colors cursor-pointer">
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                Send
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] py-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 transition-colors cursor-pointer">
                <ArrowDownLeft className="h-3.5 w-3.5 text-purple-400" />
                Receive
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
