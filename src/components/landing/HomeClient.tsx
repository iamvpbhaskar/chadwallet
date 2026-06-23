"use client";

import React from "react";
import { AnimatedBackground } from "@/components/common/AnimatedBackground";
import { Navbar } from "@/components/landing/Navbar";
import { TokenMarquee } from "@/components/landing/TokenMarquee";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { AppSection } from "@/components/landing/AppSection";
import { Footer } from "@/components/landing/Footer";

export function HomeClient() {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col justify-between">
      {/* Drifting gradient blobs in the background layer */}
      <AnimatedBackground />

      {/* Main layouts wrapper */}
      <div className="flex-1 flex flex-col w-full">
        {/* Sticky glassmorphic navbar */}
        <Navbar />

        {/* Top coin marquee */}
        <TokenMarquee />

        {/* Main Content Sections */}
        <main className="flex-1 flex flex-col">
          {/* Hero segment */}
          <HeroSection />

          {/* Stats numeric indicators */}
          <StatsCounter />

          {/* Angled mockup dashboard preview */}
          <ProductShowcase />

          {/* Core features block */}
          <FeaturesGrid />

          {/* Flow steps timeline */}
          <WorkflowSection />

          {/* Download mobile promo */}
          <AppSection />
        </main>

        {/* Bottom coin marquee, scrolling reversed */}
        <TokenMarquee reverse />
      </div>

      {/* Elegant footer */}
      <Footer />
    </div>
  );
}
