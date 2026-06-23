"use client";

import React, { useEffect, useRef } from "react";

interface TradingChartProps {
  symbol: string;
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (options: Record<string, unknown>) => unknown;
    };
  }
}

export function TradingChart({ symbol }: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preserve scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Save original methods to restore them on unmount
    const originalFocus = HTMLElement.prototype.focus;
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    // Monkey-patch focus to prevent scroll
    HTMLElement.prototype.focus = function (options) {
      const safeOptions = options || {};
      safeOptions.preventScroll = true;
      originalFocus.call(this, safeOptions);
    };

    // Monkey-patch scrollIntoView to ignore if it is from the TradingView widget container or descendants
    Element.prototype.scrollIntoView = function (options) {
      if (this.id === "tradingview_chart_container" || this.closest?.("#tradingview_chart_container")) {
        return;
      }
      originalScrollIntoView.call(this, options);
    };

    const scriptId = "tradingview-widget-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initWidget = () => {
      if (typeof window !== "undefined" && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BINANCE:SOLUSDT", // Stable benchmark chart (SOL/USDT)
          interval: "60",           // 1H interval
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#08090d",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: false,
          container_id: "tradingview_chart_container",
          backgroundColor: "#08090d",
          gridColor: "rgba(255, 255, 255, 0.01)",
        });

        // Restore scroll position after widget has time to initialize
        setTimeout(() => {
          window.scrollTo(scrollX, scrollY);
        }, 100);
      }
    };

    let timeoutId: NodeJS.Timeout | undefined;
    if (script) {
      // Script is already in the DOM, initialize immediately
      // Delay slightly to ensure script is fully resolved in window object
      timeoutId = setTimeout(initWidget, 100);
    } else {
      // Create and append the TradingView widget script
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = initWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      HTMLElement.prototype.focus = originalFocus;
      Element.prototype.scrollIntoView = originalScrollIntoView;
    };
  }, [symbol]); // Re-initialize widget context cleanly if symbol shifts

  return (
    <div className="rounded-3xl border border-white/[0.04] bg-[#0b0c10]/40 p-2.5 backdrop-blur-xl h-[450px] relative overflow-hidden select-none">
      {/* Target element for widget drawing */}
      <div 
        id="tradingview_chart_container" 
        ref={containerRef} 
        className="w-full h-full rounded-2xl overflow-hidden bg-[#08090d]" 
      />
    </div>
  );
}
