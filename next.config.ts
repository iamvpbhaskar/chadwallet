import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: process.cwd(),
  experimental: {
    optimizePackageImports: ["@privy-io/react-auth"],
  },
};

export default nextConfig;
