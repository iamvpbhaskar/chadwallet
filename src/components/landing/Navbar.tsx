"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AuthButton } from "../common/AuthButton";
import { Wallet, Menu, X, ChevronRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  // Monitor scroll state for styling updates
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTradingPage = pathname?.startsWith("/trade");

  const navLinks = isTradingPage
    ? [
        { label: "Market", href: "/trade/WIF" },
        { label: "Portfolio", href: "#" },
        { label: "Docs", href: "#" }
      ]
    : [
        { label: "Features", href: "#features" },
        { label: "Timeline", href: "#workflow" },
        { label: "Mobile App", href: "#download" }
      ];

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "border-b border-white/[0.04] bg-[#08090d]/85 backdrop-blur-md py-2" 
            : "bg-[#08090d]/40 backdrop-blur-sm py-2.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500/80 to-purple-600/80 p-px transition-all duration-300 group-hover:scale-102 overflow-hidden">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#08090d] p-1.5">
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
                  <Wallet className="h-4.5 w-4.5 text-emerald-400 group-hover:text-purple-400 transition-colors duration-300 hidden" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Chad<span className="text-emerald-400">Wallet</span>
              </span>
            </Link>
          </div>
 
          {/* Desktop Navigation Links */}
          <nav 
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                className="relative px-3 py-1 text-xs font-semibold text-slate-400 transition-colors duration-200 hover:text-white"
              >
                <span className="relative z-10">{link.label}</span>
                {hoveredLink === link.label && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 z-0 rounded-lg bg-white/[0.03]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>
 
          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isTradingPage && (
              <div className="flex items-center gap-3">
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
                    <span className="text-[10px] font-bold text-white tracking-wide leading-none mt-0.5">App Store</span>
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
                    <span className="text-[10px] font-bold text-white tracking-wide leading-none mt-0.5">Google Play</span>
                  </div>
                </a>
              </div>
            )}
            <AuthButton mode="nav" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-[69px] z-40 md:hidden border-b border-white/[0.06] bg-[#08090d]/90 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 px-8 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-between py-1"
                >
                  {link.label}
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                </a>
              ))}
              <hr className="border-white/[0.04] my-1" />
              <div className="flex flex-col gap-3">
                {!isTradingPage && (
                  <a
                    href="#download"
                    className="flex h-10 w-full items-center justify-center font-bold rounded-xl border border-white/[0.06] bg-[#0c0d12]/40 text-xs text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Download App
                  </a>
                )}
                <div onClick={() => setMobileMenuOpen(false)} className="w-full flex justify-center">
                  <AuthButton className="w-full justify-center" mode="nav" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
