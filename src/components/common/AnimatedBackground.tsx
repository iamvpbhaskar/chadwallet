"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden bg-[#08090d]">
      {/* Background noise texture or grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Radial overlay to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#08090d_80%)]" />

      {/* Blob 1: Green/Emerald */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/8 blur-[100px] pointer-events-none md:h-[500px] md:w-[500px]"
      />

      {/* Blob 2: Purple/Violet */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 40, -60, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-purple-500/8 blur-[120px] pointer-events-none md:h-[600px] md:w-[600px]"
      />

      {/* Blob 3: Accent center glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/3 blur-[140px] pointer-events-none" />
    </div>
  );
}
