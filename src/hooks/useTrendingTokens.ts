"use client";

import { useQuery } from "@tanstack/react-query";
import { TokenData } from "@/types/token";
import { 
  fetchTrendingTokens, 
  FALLBACK_TOKENS,
} from "@/lib/api/birdeye";

export function useTrendingTokens() {
  const apiKey = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY;

  return useQuery<TokenData[]>({
    queryKey: ["trendingTokens"],
    queryFn: async () => {
      if (!apiKey) {
        console.warn("NEXT_PUBLIC_BIRDEYE_API_KEY is missing. Falling back to local mock data.");
        return FALLBACK_TOKENS;
      }
      try {
        const tokens = await fetchTrendingTokens(apiKey, 10);
        return tokens.length > 0 ? tokens : FALLBACK_TOKENS;
      } catch (err) {
        console.warn("Error fetching tokens from BirdEye. Falling back to local mock data:", err);
        return FALLBACK_TOKENS;
      }
    },
    staleTime: 60000, // Keep data fresh for 1 minute
    gcTime: 300000,  // Cache in memory for 5 minutes
    retry: 1,        // Fail quickly to avoid API rate limits
  });
}
