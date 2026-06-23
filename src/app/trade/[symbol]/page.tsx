import React from "react";
import { TradingPageClient } from "@/components/trading/TradingPageClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export default async function TradePage({ params }: PageProps) {
  const resolvedParams = await params;
  const symbol = (resolvedParams.symbol || "SOL").toUpperCase();

  return <TradingPageClient symbol={symbol} />;
}
