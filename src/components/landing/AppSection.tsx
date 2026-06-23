"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";

const screenshots = [
  "/app-store/portfolio.png",
  "/app-store/discover.png",
  "/app-store/token.png",
  "/app-store/deposit.png",
  "/app-store/search.png"
];

export function AppSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative px-8 py-16 border-b border-white/[0.01]" id="download">
      {/* Background ambient glow blob - extremely quiet */}
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[200px] w-[200px] bg-emerald-500/[0.01] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
          
          {/* Left Column: Promotion and App badges */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 95, damping: 20 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.04] bg-white/[0.01] px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 backdrop-blur-md self-start">
              <Smartphone className="h-3.5 w-3.5 text-slate-500" />
              <span>Mobile Application</span>
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight font-heading">
              Trade On The Go. <br />
              <span className="text-slate-400 font-bold">Never miss a cycle.</span>
            </h2>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-md font-medium">
              Carry the power of ChadWallet in your pocket. Get instant push notifications on whale moves, execute swaps from your widgets, and monitor your portfolio with native performance.
            </p>

            {/* Apple App Store & Google Play Store download buttons - minimal glass */}
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                target="_blank"
                rel="noreferrer"
                className="h-10 inline-flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#0c0d12]/95 hover:bg-[#16171e] hover:border-white/[0.15] px-4.5 py-1 text-left transition-all duration-200 cursor-pointer select-none shadow-sm"
              >
                <svg className="h-4.5 w-4.5 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C15.85 1.04 14.51 1.73 13.73 2.64C13.07 3.41 12.49 4.52 12.64 5.78C13.87 5.87 15.12 5.17 15.97 4.17Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-tight leading-none">Download on the</span>
                  <span className="text-[11px] font-bold text-white tracking-wide leading-none mt-0.5 font-sans">App Store</span>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                target="_blank"
                rel="noreferrer"
                className="h-10 inline-flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#0c0d12]/95 hover:bg-[#16171e] hover:border-white/[0.15] px-4.5 py-1 text-left transition-all duration-200 cursor-pointer select-none shadow-sm"
              >
                <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.78 1.15c-.45.45-.71 1.16-.71 2.05v33.6c0 .89.26 1.6.71 2.05l.13.13L21.32 20.6v-.3L2.91 1.02l-.13.13z" fill="#EA4335"/>
                  <path d="M27.42 26.7l-6.1-6.1v-.3l6.1-6.1.15.08 7.22 4.1c2.06 1.17 2.06 3.09 0 4.26l-7.22 4.1-.15-.14z" fill="#FBBC05"/>
                  <path d="M21.47 20.3L2.91 1.74c.64-.64 1.7-.54 2.87.13L27.42 12.3c2.06 1.17 2.06 3.09 0 4.26L21.47 20.3z" fill="#4285F4"/>
                  <path d="M21.47 20.3l5.95-5.95 7.22 4.1c2.06 1.17 2.06 3.09 0 4.26l-7.22 4.1-5.95-6.51z" fill="#34A853"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-tight leading-none">GET IT ON</span>
                  <span className="text-[11px] font-bold text-white tracking-wide leading-none mt-0.5 font-sans">Google Play</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 95, damping: 20 }}
            className="flex justify-center"
          >
            {/* Phone shell container - highly polished glassmorphism */}
            <div className="relative h-[540px] w-[270px] rounded-[42px] border-4 border-slate-800 bg-[#08090d] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Top Speaker/Notch area */}
              <div className="absolute top-0 left-1/2 z-20 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-slate-800 flex items-center justify-center">
                <span className="h-1 w-5 rounded-full bg-slate-700" />
              </div>

              {/* Screen Content Wrapper */}
              <div className="h-full w-full rounded-[34px] bg-[#0c0d12] overflow-hidden border border-white/[0.04] relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIdx}
                    src={screenshots[currentIdx]}
                    alt="App Screenshot"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
