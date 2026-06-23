"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { cn } from "@/lib/utils";
import { LogOut, ChevronDown, ArrowRight } from "lucide-react";

interface AuthButtonProps {
  className?: string;
  size?: "default" | "large";
  mode?: "default" | "nav" | "hero";
}

export function AuthButton({ className, size = "default", mode = "default" }: AuthButtonProps) {
  // Privy hook
  const { ready, authenticated, login, logout, user } = usePrivy();
  const pathname = usePathname();
  const isTradingPage = pathname?.startsWith("/trade");
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when user clicks outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!ready) {
    return null;
  }

  if (!authenticated) {
    return (
      <button
        onClick={() => login()}
        className={cn(
          "h-9 inline-flex items-center justify-center font-bold px-5 text-xs text-white rounded-2xl border border-white/[0.08] bg-[#0c0d12]/95 hover:bg-[#16171e] hover:border-white/[0.15] transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] select-none backdrop-blur-md",
          size === "large" ? "h-11 px-7 uppercase tracking-wider" : "",
          className
        )}
      >
        Login
      </button>
    );
  }

  // Get user details
  const walletAddress = user?.wallet?.address;
  const userEmail = user?.email?.address || user?.google?.email || user?.apple?.email;
  
  // Format address or email for layout display
  const displayName = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : userEmail
      ? userEmail.length > 15
        ? `${userEmail.slice(0, 12)}...`
        : userEmail
      : "Connected";

  const avatarChar = userEmail 
    ? userEmail.charAt(0).toUpperCase() 
    : walletAddress 
      ? walletAddress.charAt(0).toUpperCase() 
      : "C";

  return (
    <div className="flex items-center gap-3">
      {/* Go to Terminal Link Button on Landing Page Nav */}
      {mode === "nav" && !isTradingPage && (
        <Link
          href="/trade/WIF"
          className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 flex items-center gap-1 shrink-0"
        >
          Terminal
          <ArrowRight className="h-3 w-3 text-emerald-400" />
        </Link>
      )}

      <div className="relative inline-block" ref={dropdownRef}>
        {/* Profile Chip */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={cn(
            "h-9 flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#0c0d12]/80 hover:bg-[#16171e] px-4 cursor-pointer transition-all duration-200 font-mono text-xs text-slate-200 select-none",
            size === "large" && "h-11 px-5 text-sm",
            className
          )}
        >
          {/* User Avatar */}
          <div className="h-5 w-5 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-gradient-to-tr from-purple-500/35 to-emerald-500/35 border border-white/10 text-[9px] font-bold text-slate-200 font-sans select-none">
            {avatarChar}
          </div>

          {/* Address / Email */}
          <span className="font-semibold">{displayName}</span>
          
          {/* Caret */}
          <ChevronDown className={cn(
            "h-3.5 w-3.5 text-slate-500 transition-transform duration-300",
            dropdownOpen && "rotate-180"
          )} />
        </button>

        {/* Dropdown Menu (Glassmorphism card) */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-3 z-[100] w-72 rounded-3xl border border-white/[0.04] bg-[#0c0e14]/90 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-3 select-none animate-in fade-in-50 slide-in-from-top-2 duration-200">
            {/* Metadata */}
            <div className="px-2 py-1 flex flex-col gap-1 border-b border-white/[0.03] pb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">
                Connected Account
              </span>
              <span className="text-xs font-semibold text-slate-300 font-mono truncate">
                {userEmail || (walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}` : "Connected")}
              </span>
            </div>

            {/* Go To Terminal */}
            <Link
              href="/trade/WIF"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 rounded-2xl px-2 py-2.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/5 transition-all duration-200 w-full text-left"
            >
              <ArrowRight className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              Go To Terminal
            </Link>

            {/* Disconnect */}
            <button
              onClick={logout}
              className="flex items-center gap-2.5 rounded-2xl px-2 py-2.5 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all duration-200 w-full text-left cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 text-rose-500 shrink-0" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
