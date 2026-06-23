"use client";

import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { AnimatedBackground } from "@/components/common/AnimatedBackground";
import { useTrendingTokens } from "@/hooks/useTrendingTokens";
import { TrendingSidebar } from "./TrendingSidebar";
import { TokenOverview } from "./TokenOverview";
import { TradingChart } from "./TradingChart";
import { LiveTrades } from "./LiveTrades";
import { TopHolders } from "./TopHolders";
import { PositionPanel } from "./PositionPanel";
import { TokenData } from "@/types/token";
import { formatPrice, getTokenStyle, generateSeededSparkline, FALLBACK_TOKENS } from "@/lib/api/birdeye";

interface TradingPageClientProps {
  symbol: string;
}

/**
 * Dynamically resolves or generates token metadata to prevent blank pages
 * when navigating to arbitrary or custom tickers.
 */
function getActiveToken(symbol: string, tokensList: TokenData[] | undefined): TokenData {
  if (tokensList) {
    const found = tokensList.find(t => t.symbol.toUpperCase() === symbol.toUpperCase());
    if (found) return found;
  }
  
  const fallbackFound = FALLBACK_TOKENS.find(t => t.symbol.toUpperCase() === symbol.toUpperCase());
  if (fallbackFound) return fallbackFound;
  
  // Seeded mock generation for dynamic custom symbols
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  const seedVal = Math.abs(hash);
  
  // Seed-based price: ranges from $0.01 to $10.00
  const priceNum = ((seedVal % 999) + 1) / 100;
  // Seed-based 24h change: ranges from -25% to +25%
  const change24h = ((seedVal % 500) - 250) / 10;
  
  const { colorClass, char } = getTokenStyle(symbol);
  const sparkline = generateSeededSparkline(symbol, change24h);

  return {
    address: `SolCustomAddr_${symbol}_${seedVal}`,
    symbol,
    name: `${symbol} Solana Asset`,
    price: formatPrice(priceNum),
    priceNum,
    change24h,
    logoURI: undefined, // triggers initials letter logo badge
    char,
    colorClass,
    sparkline,
  };
}

export function TradingPageClient({ symbol }: TradingPageClientProps) {
  const { data: tokens, isLoading } = useTrendingTokens();
  const currentToken = getActiveToken(symbol, tokens);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [symbol]);

  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col justify-between bg-[#08090d]">
      {/* Background drifting glow elements */}
      <AnimatedBackground />

      {/* Main layouts wrapper */}
      <div className="flex-1 flex flex-col w-full relative z-10">
        <Navbar />

        <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Trending Sidebar */}
          <aside className="hidden lg:block lg:w-76 xl:w-80 shrink-0">
            <TrendingSidebar 
              tokens={tokens || FALLBACK_TOKENS} 
              activeSymbol={symbol} 
              isLoading={isLoading} 
            />
          </aside>

          {/* Middle Panel - Core Chart & Statistics */}
          <main className="flex-1 flex flex-col gap-6 min-w-0">
            <TokenOverview token={currentToken} />
            <TradingChart symbol={symbol} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LiveTrades symbol={symbol} />
              <TopHolders symbol={symbol} />
            </div>
          </main>

          {/* Right Panel - Buy/Sell Position Card */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            <PositionPanel token={currentToken} />
          </aside>
        </div>
      </div>
    </div>
  );
}
