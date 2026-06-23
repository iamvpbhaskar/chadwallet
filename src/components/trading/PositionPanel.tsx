"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Wallet, CheckCircle, Info, Landmark, Globe } from "lucide-react";
import { TokenData } from "@/types/token";
import { GradientButton } from "@/components/common/GradientButton";

interface PositionPanelProps {
  token: TokenData;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export function PositionPanel({ token }: PositionPanelProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("");
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleOrder = () => {
    if (!amount || parseFloat(amount) <= 0) {
      showToast("Please enter a valid amount to trade", "error");
      return;
    }
    
    const formattedAmt = parseFloat(amount).toLocaleString(undefined, { maximumFractionDigits: 4 });
    if (activeTab === "buy") {
      showToast(`Buy order placed! Exchanging ${formattedAmt} SOL for ${token.symbol}`, "success");
    } else {
      showToast(`Sell order placed! Swapping ${formattedAmt} ${token.symbol} for SOL`, "success");
    }
    setAmount("");
  };

  // Mock static portfolio figures
  const solBalance = "14.28 SOL";
  const tokenBalance = `4,500.00 ${token.symbol}`;

  return (
    <div className="rounded-3xl border border-white/[0.04] bg-[#0b0c10]/40 p-6 backdrop-blur-xl flex flex-col gap-6 relative select-none">
      
      {/* Dynamic Animated Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={cn(
              "absolute left-4 right-4 top-4 z-50 rounded-2xl border p-4 shadow-2xl flex items-start gap-3 backdrop-blur-2xl",
              toast.type === "success" 
                ? "bg-emerald-950/80 border-emerald-500/25 text-emerald-300"
                : "bg-rose-950/80 border-rose-500/25 text-rose-300"
            )}
          >
            {toast.type === "success" ? (
              <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-400 mt-0.5" />
            ) : (
              <Info className="h-4.5 w-4.5 shrink-0 text-rose-400 mt-0.5" />
            )}
            <div className="flex flex-col gap-0.5">
              <span className="font-outfit text-xs font-bold uppercase tracking-wide">
                {toast.type === "success" ? "Execution Success" : "Order Alert"}
              </span>
              <p className="text-[10.5px] font-inter text-slate-300 leading-normal">
                {toast.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-white/[0.02] border border-white/[0.03] p-1.2 font-mono">
        <button
          onClick={() => { setActiveTab("buy"); setAmount(""); }}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer",
            activeTab === "buy"
              ? "bg-emerald-500/10 text-emerald-400 shadow-[0_2px_8px_rgba(16,185,129,0.05)] border border-emerald-500/10"
              : "text-slate-500 hover:text-slate-300"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => { setActiveTab("sell"); setAmount(""); }}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer",
            activeTab === "sell"
              ? "bg-rose-500/10 text-rose-400 shadow-[0_2px_8px_rgba(244,63,94,0.05)] border border-rose-500/10"
              : "text-slate-500 hover:text-slate-300"
          )}
        >
          Sell
        </button>
      </div>

      {/* Wallet Balance Display */}
      <div className="flex flex-col gap-3 rounded-2xl bg-white/[0.01] border border-white/[0.02] p-4 font-inter text-xs">
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5" />
            Wallet Balance
          </span>
          <span className="font-mono text-slate-400">
            {activeTab === "buy" ? solBalance : tokenBalance}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-slate-500 font-medium pt-3 border-t border-white/[0.02]">
          <span className="flex items-center gap-1.5">
            <Landmark className="h-3.5 w-3.5" />
            Active Position
          </span>
          <span className="font-mono text-slate-400">0.00 {token.symbol}</span>
        </div>
        
        <div className="flex items-center justify-between text-slate-500 font-medium pt-3 border-t border-white/[0.02]">
          <span className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            Network
          </span>
          <span className="font-mono text-purple-400 font-bold uppercase text-[9.5px] tracking-wider">Solana Mainnet</span>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-inter">
            {activeTab === "buy" ? "Pay (SOL)" : `Sell (${token.symbol})`}
          </label>
          
          <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.03] focus-within:border-white/[0.08] focus-within:bg-[#0c0d12]/40 transition-all duration-300 p-4">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent font-mono text-lg font-bold text-white border-0 outline-none p-0 focus:ring-0 placeholder:text-slate-700"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-500">
              {activeTab === "buy" ? "SOL" : token.symbol}
            </span>
          </div>
        </div>

        {/* Quick Percent Selectors */}
        <div className="grid grid-cols-4 gap-2 font-mono">
          {["25%", "50%", "75%", "MAX"].map((pct) => (
            <button
              key={pct}
              onClick={() => {
                const base = activeTab === "buy" ? 14.28 : 4500;
                let multiplier = 0.25;
                if (pct === "50%") multiplier = 0.5;
                if (pct === "75%") multiplier = 0.75;
                if (pct === "MAX") multiplier = 1.0;
                setAmount((base * multiplier).toFixed(2));
              }}
              className="py-1.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.04] border border-white/[0.03] text-[9.5px] font-bold text-slate-500 hover:text-slate-300 transition-all duration-200 cursor-pointer"
            >
              {pct}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Breakdown Summary */}
      <div className="flex flex-col gap-2.5 text-xs border-t border-white/[0.03] pt-5">
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <span>Exchange Rate</span>
          <span className="font-mono text-slate-400">
            1 {token.symbol} = {token.price}
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <span>Network Fee</span>
          <span className="font-mono text-slate-400">~ $0.0002</span>
        </div>
      </div>

      {/* Trading Button */}
      <GradientButton
        variant={activeTab === "buy" ? "primary" : "accent"}
        className={cn(
          "w-full py-3.5 !rounded-2xl text-xs font-bold tracking-wider",
          activeTab === "sell" && "bg-rose-600 hover:bg-rose-500 shadow-[0_4px_12px_rgba(244,63,94,0.15)] hover:shadow-[0_4px_20px_rgba(244,63,94,0.25)]"
        )}
        onClick={handleOrder}
      >
        {activeTab === "buy" ? `Buy ${token.symbol}` : `Sell ${token.symbol}`}
      </GradientButton>
    </div>
  );
}
