export interface TokenData {
  address: string;
  symbol: string;
  name: string;
  price: string;
  priceNum: number;
  change24h: number;
  logoURI?: string;
  char: string;
  colorClass: string;
  sparkline: number[];
}

export interface BirdEyeTrendingToken {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  rank: number;
  liquidity: number;
  volume24hUSD: number;
  logoURI?: string;
}

export interface BirdEyeTrendingResponse {
  success: boolean;
  data: {
    updateUnixTime: number;
    updateTime: string;
    tokens: BirdEyeTrendingToken[];
    total: number;
  };
}

export interface BirdEyePriceData {
  value: number;
  updateUnixTime: number;
  updateHumanTime: string;
  priceChange24h?: number;
}

export interface BirdEyeMultiPriceResponse {
  success: boolean;
  data: Record<string, BirdEyePriceData>;
}
