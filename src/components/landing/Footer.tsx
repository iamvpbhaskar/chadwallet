"use client";

import React from "react";
import Link from "next/link";
import { Wallet, Send, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#07080c] py-14 px-8 md:px-12">
      {/* Extremely faint bottom glow */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-[150px] w-[300px] -translate-x-1/2 rounded-full bg-purple-600/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-8">
          {/* Logo & Pitch & Socials */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500/80 to-purple-600/80 p-px shadow-md overflow-hidden">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#07080c] p-1.2">
                  <img 
                    src="/light.png" 
                    alt="ChadWallet" 
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                  <Wallet className="h-3.5 w-3.5 text-emerald-400 hidden" />
                </div>
              </div>
              <span className="text-sm font-bold tracking-tight text-white font-heading">
                Chad<span className="text-emerald-400">Wallet</span>
              </span>
            </Link>
            
            <p className="text-[12px] leading-relaxed text-slate-400 font-sans max-w-sm font-medium">
              The premium trading interface for Solana memecoins. Designed for speed, styled for chads, and secured by Privy.
            </p>

            {/* Social Icons row - minimalist & premium */}
            <div className="flex items-center gap-4 mt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="text-slate-500 hover:text-white hover:scale-110 transition-all duration-200"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="text-slate-500 hover:text-white hover:scale-110 transition-all duration-200"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 7.99-3.43 3.8-1.56 4.59-1.83 5.1-.11z"/>
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="text-slate-500 hover:text-white hover:scale-110 transition-all duration-200"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 1-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
                </svg>
              </a>
            </div>

            {/* Small download badges */}
            <div className="flex gap-2.5 mt-2">
              <a
                href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                target="_blank"
                rel="noreferrer"
                className="h-9 inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0c0d12]/95 hover:bg-[#16171e] hover:border-white/[0.15] px-3.5 py-1 text-left transition-all duration-200 cursor-pointer select-none shadow-sm"
              >
                <svg className="h-3.5 w-3.5 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C15.85 1.04 14.51 1.73 13.73 2.64C13.07 3.41 12.49 4.52 12.64 5.78C13.87 5.87 15.12 5.17 15.97 4.17Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[6.5px] font-extrabold text-slate-400 uppercase tracking-tight leading-none">Download on the</span>
                  <span className="text-[10px] font-bold text-white tracking-wide leading-none mt-0.5 font-sans">App Store</span>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                target="_blank"
                rel="noreferrer"
                className="h-9 inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0c0d12]/95 hover:bg-[#16171e] hover:border-white/[0.15] px-3.5 py-1 text-left transition-all duration-200 cursor-pointer select-none shadow-sm"
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.78 1.15c-.45.45-.71 1.16-.71 2.05v33.6c0 .89.26 1.6.71 2.05l.13.13L21.32 20.6v-.3L2.91 1.02l-.13.13z" fill="#EA4335"/>
                  <path d="M27.42 26.7l-6.1-6.1v-.3l6.1-6.1.15.08 7.22 4.1c2.06 1.17 2.06 3.09 0 4.26l-7.22 4.1-.15-.14z" fill="#FBBC05"/>
                  <path d="M21.47 20.3L2.91 1.74c.64-.64 1.7-.54 2.87.13L27.42 12.3c2.06 1.17 2.06 3.09 0 4.26L21.47 20.3z" fill="#4285F4"/>
                  <path d="M21.47 20.3l5.95-5.95 7.22 4.1c2.06 1.17 2.06 3.09 0 4.26l-7.22 4.1-5.95-6.51z" fill="#34A853"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[6.5px] font-extrabold text-slate-400 uppercase tracking-tight leading-none">GET IT ON</span>
                  <span className="text-[10px] font-bold text-white tracking-wide leading-none mt-0.5 font-sans">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4 lg:col-span-2 md:pl-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-heading">Features</span>
            <ul className="flex flex-col gap-3 text-[13px] text-slate-500 font-sans font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Direct Swaps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Whale Alert Monitor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  AI Trend Signals
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Resources Column */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-heading">Resources</span>
            <ul className="flex flex-col gap-3 text-[13px] text-slate-500 font-sans font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Security Sandbox
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-heading">Stay Updated</span>
            <p className="text-[12px] text-slate-500 leading-relaxed font-sans max-w-sm font-medium">
              Subscribe to get notified about whale activities and listed memecoins.
            </p>
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.04] bg-white/[0.01] p-1.2 max-w-sm focus-within:border-emerald-500/20 transition-all duration-300">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none w-full px-3 py-1.5 font-sans font-medium"
              />
              <button className="rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] p-2 text-slate-300 transition-all cursor-pointer flex items-center justify-center">
                <Send className="h-3 w-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Base Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-slate-600 leading-relaxed text-center sm:text-left font-sans font-medium border-t border-white/[0.03] pt-8 mt-8">
          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} ChadWallet. All rights reserved. Memecoin trading is highly volatile; invest responsibly.</p>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Powered by Solana, Privy and BirdEye
            </div>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-emerald-500/90 border border-emerald-500/10 bg-emerald-500/5 px-2.5 py-1 rounded-md">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Verified Sandbox</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
