"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/flow/portfolio-4.png",
    title: "Portfolio Monitoring",
    description: "Monitor assets and values in real-time."
  },
  {
    image: "/flow/buy-sell-4.png",
    title: "Unified Swaps",
    description: "Execute buy and sell orders instantly."
  },
  {
    image: "/flow/launch-4.png",
    title: "Routing Engine",
    description: "Optimal price paths on Solana blockchain."
  }
];

export function ProductShowcase() {
  const [activeSlide, setActiveSlide] = useState(1); // default to buy/sell page

  // Autoplay carousel on mobile (switches slide every 6s)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative px-8 py-20 border-b border-white/[0.01]" id="showcase">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-purple-500/[0.01] blur-[140px] rounded-full pointer-events-none md:h-[400px] md:w-[600px]" />
      
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-heading">
              A unified trading experience.
            </h2>
            <p className="text-xs text-slate-400 sm:text-sm max-w-md mx-auto leading-relaxed">
              Designed with a focus on details. A streamlined interface that brings swap aggregation and portfolio tracking together in one screen.
            </p>
          </div>

          {/* Layered Dashboard Cards Mockup (Desktop layout) */}
          <div className="hidden md:flex relative w-full max-w-7xl items-center justify-center min-h-[440px] px-4 md:px-0">
            
            {/* Layer 1: Left Background Card - Portfolio Assets */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: 10, rotate: -2 }}
              whileInView={{ opacity: 1, x: -210, y: 10, rotate: -3 }}
              viewport={{ once: true, margin: "-100px" }}
              animate={{
                y: [10, 6, 10]
              }}
              transition={{
                y: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                default: { type: "spring", stiffness: 90, damping: 20 }
              }}
              className="absolute left-1/2 -translate-x-1/2 h-[340px] w-[260px] rounded-3xl border border-white/[0.04] bg-[#0c0d12]/50 overflow-hidden backdrop-blur-xl shadow-2xl"
            >
              <img 
                src="/flow/portfolio-4.png" 
                alt="Portfolio" 
                className="h-full w-full object-cover opacity-90" 
              />
            </motion.div>

            {/* Layer 2: Right Background Card - Routing details */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: 10, rotate: 2 }}
              whileInView={{ opacity: 1, x: 210, y: 25, rotate: 3 }}
              viewport={{ once: true, margin: "-100px" }}
              animate={{
                y: [25, 20, 25]
              }}
              transition={{
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                default: { type: "spring", stiffness: 90, damping: 20 }
              }}
              className="absolute left-1/2 -translate-x-1/2 h-[320px] w-[260px] rounded-3xl border border-white/[0.04] bg-[#0c0d12]/50 overflow-hidden backdrop-blur-xl shadow-2xl"
            >
              <img 
                src="/flow/launch-4.png" 
                alt="Swap Routing Details" 
                className="h-full w-full object-cover opacity-90" 
              />
            </motion.div>

            {/* Layer 3: Main Foreground Card - Swap Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              animate={{
                y: [0, -3, 0]
              }}
              transition={{
                y: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                default: { type: "spring", stiffness: 95, damping: 20 }
              }}
              className="relative z-10 w-full max-w-[350px] h-[450px] rounded-3xl border border-white/[0.05] bg-[#0c0e14]/85 overflow-hidden backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <img 
                src="/flow/buy-sell-4.png" 
                alt="Buy/Sell Panel" 
                className="h-full w-full object-cover opacity-95" 
              />
            </motion.div>

          </div>

          {/* Carousel Layout (Mobile viewport) */}
          <div className="md:hidden flex flex-col items-center gap-6 w-full max-w-xs px-2 select-none">
            
            {/* Carousel Frame */}
            <div className="relative w-full aspect-[4/5] rounded-[32px] border border-white/[0.06] bg-[#0c0e14]/80 overflow-hidden backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full object-cover opacity-95"
                />
              </AnimatePresence>
            </div>
            
            {/* Slide Label and Description */}
            <div className="text-center flex flex-col gap-1">
              <span className="text-[13px] font-bold text-white font-sans tracking-wide">
                {slides[activeSlide].title}
              </span>
              <span className="text-[10px] text-slate-500 font-sans font-medium">
                {slides[activeSlide].description}
              </span>
            </div>

            {/* Navigation Dots and Arrow triggers */}
            <div className="flex items-center justify-between w-full max-w-[200px] mt-1">
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                className="p-2.5 rounded-full bg-white/[0.02] border border-white/[0.04] text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-95"
                aria-label="Previous Slide"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeSlide === i 
                        ? "w-4 bg-emerald-400" 
                        : "w-1.5 bg-white/10"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                className="p-2.5 rounded-full bg-white/[0.02] border border-white/[0.04] text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-95"
                aria-label="Next Slide"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
