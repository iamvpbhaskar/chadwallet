import { 
  TokenData, 
  BirdEyeTrendingResponse, 
  BirdEyeMultiPriceResponse 
} from "@/types/token";

/**
 * Beautiful helper to format cryptocurrency price strings cleanly.
 * Handles both high value assets (SOL) and micro-price memecoins (BONK).
 */
export function formatPrice(price: number): string {
  if (!price || price === 0) return "$0.00";
  if (price >= 1.0) {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (price >= 0.01) {
    return `$${price.toFixed(4)}`;
  }
  if (price >= 0.000001) {
    const formatted = price.toFixed(8);
    // Strip unnecessary trailing zeros for tidiness (e.g. 0.00012000 -> 0.00012)
    return `$${formatted.replace(/\.?0+$/, "")}`;
  }
  return `$${price.toFixed(10).replace(/\.?0+$/, "")}`;
}

/**
 * Gets a visual style configuration class based on the token symbol.
 */
export function getTokenStyle(symbol: string): { colorClass: string; char: string } {
  const char = symbol.charAt(0).toUpperCase() || "?";
  const lower = symbol.toLowerCase();
  
  if (lower.includes("wif")) {
    return { colorClass: "bg-amber-500/10 text-amber-400 border-amber-500/10", char };
  }
  if (lower.includes("bonk")) {
    return { colorClass: "bg-orange-500/10 text-orange-400 border-orange-500/10", char };
  }
  if (lower.includes("popcat")) {
    return { colorClass: "bg-purple-500/10 text-purple-400 border-purple-500/10", char };
  }
  if (lower.includes("fart")) {
    return { colorClass: "bg-pink-500/10 text-pink-400 border-pink-500/10", char };
  }
  if (lower.includes("giga")) {
    return { colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/10", char };
  }
  if (lower.includes("sol")) {
    return { colorClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/10", char };
  }
  if (lower.includes("jup")) {
    return { colorClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10", char };
  }
  
  // Statically pick a palette based on token symbol characters
  const colors = [
    "bg-blue-500/10 text-blue-400 border-blue-500/10",
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/10",
    "bg-purple-500/10 text-purple-400 border-purple-500/10",
    "bg-pink-500/10 text-pink-400 border-pink-500/10",
    "bg-amber-500/10 text-amber-400 border-amber-500/10",
    "bg-teal-500/10 text-teal-400 border-teal-500/10",
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/10",
  ];
  
  const code = symbol.charCodeAt(0) || 0;
  const colorClass = colors[code % colors.length];
  
  return { colorClass, char };
}

/**
 * String-seeded LCG (Linear Congruential Generator) PRNG.
 * Ensures the generated sparkline remains identical for the same token, preventing jitters.
 */
function getSeedFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function createSeededRandom(seed: number) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Normalizes an array of numerical prices to scale perfectly into an SVG viewBox height bounds.
 * Maps values to Y coordinates in range [padding, height - padding].
 * Coordinates are inverted (0 is top, height is bottom) to match standard SVG conventions.
 */
export function normalizeSparkline(prices: number[], height: number = 7, padding: number = 1): number[] {
  if (!prices || prices.length === 0) {
    return Array(7).fill(height / 2);
  }
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;
  
  if (range === 0) {
    return Array(prices.length).fill(height / 2);
  }
  
  return prices.map(p => {
    const scaled = padding + ((p - min) / range) * (height - 2 * padding);
    return height - scaled;
  });
}

/**
 * Generates a deterministic mock price movement (7 points) seeded by token symbol.
 * Trends generally upwards if 24h change is positive, and downwards if negative.
 */
export function generateSeededSparkline(symbol: string, change24h: number): number[] {
  const points = 7;
  const seed = getSeedFromString(symbol);
  const rand = createSeededRandom(seed);
  
  const start = 100;
  const end = start * (1 + change24h / 100);
  
  const values: number[] = [];
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    let val = start + t * (end - start);
    
    // Add small volatility fluctuations
    if (i > 0 && i < points - 1) {
      const volatility = 0.02 + rand() * 0.03; // 2% to 5% noise amplitude
      const noise = (rand() - 0.5) * start * volatility;
      val += noise;
    }
    values.push(val);
  }
  
  return normalizeSparkline(values);
}

export const FALLBACK_TOKENS: TokenData[] = [
  {
    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    symbol: "WIF",
    name: "dogwifhat",
    price: "$2.14",
    priceNum: 2.14,
    change24h: 12.45,
    logoURI: "https://dd.dexscreener.com/ds-data/tokens/solana/EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm.png",
    char: "W",
    colorClass: "bg-amber-500/10 text-amber-400 border-amber-500/10",
    sparkline: generateSeededSparkline("WIF", 12.45),
  },
  {
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    symbol: "BONK",
    name: "Bonk",
    price: "$0.00002140",
    priceNum: 0.0000214,
    change24h: -3.12,
    logoURI: "https://dd.dexscreener.com/ds-data/tokens/solana/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263.png",
    char: "B",
    colorClass: "bg-orange-500/10 text-orange-400 border-orange-500/10",
    sparkline: generateSeededSparkline("BONK", -3.12),
  },
  {
    address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    symbol: "POPCAT",
    name: "Popcat",
    price: "$1.35",
    priceNum: 1.35,
    change24h: 8.91,
    logoURI: "https://dd.dexscreener.com/ds-data/tokens/solana/7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr.png",
    char: "P",
    colorClass: "bg-purple-500/10 text-purple-400 border-purple-500/10",
    sparkline: generateSeededSparkline("POPCAT", 8.91),
  },
  {
    address: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
    symbol: "FARTCOIN",
    name: "Fartcoin",
    price: "$0.0840",
    priceNum: 0.084,
    change24h: -5.67,
    logoURI: "https://dd.dexscreener.com/ds-data/tokens/solana/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump.png",
    char: "F",
    colorClass: "bg-pink-500/10 text-pink-400 border-pink-500/10",
    sparkline: generateSeededSparkline("FARTCOIN", -5.67),
  },
  {
    address: "63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9",
    symbol: "GIGA",
    name: "Gigachad",
    price: "$0.0450",
    priceNum: 0.045,
    change24h: 24.50,
    logoURI: "https://dd.dexscreener.com/ds-data/tokens/solana/63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9.png",
    char: "G",
    colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/10",
    sparkline: generateSeededSparkline("GIGA", 24.50),
  },
];

/**
 * Fetches trending Solana tokens from BirdEye and pulls their pricing in a single batch request.
 * Contains request timeout protection (5 seconds), diagnostic logging for failures,
 * and robust catch wrapping to return local FALLBACK_TOKENS rather than throwing exceptions.
 */
export async function fetchTrendingTokens(apiKey: string, limit = 10): Promise<TokenData[]> {
  try {
    const headers = {
      "accept": "application/json",
      "x-chain": "solana",
      "x-api-key": apiKey || "",
    };

    // Helper to perform fetch with a 5-second timeout and detailed error diagnostics
    const fetchWithTimeout = async (url: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch(url, {
          headers,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          const bodyText = await response.text().catch(() => "Unable to read body");
          console.warn("BirdEye request diagnostics:", {
            status: response.status,
            statusText: response.statusText,
            body: bodyText,
          });
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        return response;
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    };

    // 1. Fetch trending token list
    const trendingUrl = `https://public-api.birdeye.so/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=${limit}`;
    const trendingRes = await fetchWithTimeout(trendingUrl);
    
    const trendingData: BirdEyeTrendingResponse = await trendingRes.json();
    if (!trendingData.success || !trendingData.data || !trendingData.data.tokens) {
      throw new Error("Invalid response format from trending tokens API");
    }

    const tokens = trendingData.data.tokens;
    if (tokens.length === 0) {
      return FALLBACK_TOKENS;
    }

    // Extract addresses for the batch multi-price request
    const addresses = tokens.map(t => t.address);

    // 2. Fetch prices and 24h percentage changes in a single batch request
    const multiPriceUrl = `https://public-api.birdeye.so/defi/multi_price?list_address=${addresses.join(",")}`;
    const multiPriceRes = await fetchWithTimeout(multiPriceUrl);
    
    const multiPriceData: BirdEyeMultiPriceResponse = await multiPriceRes.json();
    if (!multiPriceData.success || !multiPriceData.data) {
      throw new Error("Invalid response format from multi-price API");
    }

    const priceMap = multiPriceData.data;

    // 3. Merge trending tokens metadata with the price and change data
    const result: TokenData[] = tokens.map(t => {
      const priceInfo = priceMap[t.address];
      const priceNum = priceInfo?.value || 0;
      const change24h = priceInfo?.priceChange24h || 0;
      
      const { colorClass, char } = getTokenStyle(t.symbol);
      const sparkline = generateSeededSparkline(t.symbol, change24h);

      return {
        address: t.address,
        symbol: t.symbol,
        name: t.name,
        price: formatPrice(priceNum),
        priceNum,
        change24h,
        logoURI: t.logoURI,
        char,
        colorClass,
        sparkline,
      };
    });

    return result;
  } catch (error) {
    console.warn("BirdEye failed:", error);
    return FALLBACK_TOKENS;
  }
}
