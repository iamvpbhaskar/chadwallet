# ChadWallet

A premium, high-fidelity Web3 trading experience and landing page for ChadWallet, visually inspired by fomo.family and designed for fast, secure Solana memecoin trading.

---

## Tech Stack
*   **Next.js 15** (App Router)
*   **TypeScript**
*   **Tailwind CSS**
*   **React Query** (For API state management and data caching)
*   **Privy** (For seamless Google & Apple authentication + automatic embedded Solana wallets)
*   **BirdEye API** (For live Solana token tracking and metadata)
*   **TradingView** (For advanced interactive charting widgets)

---

## Features

### 1. Landing Page
*   **Aesthetics**: Sleek dark mode featuring modern typography (Space Grotesk + Plus Jakarta Sans), neon gradient glows, glassmorphic layout elements, and smooth drifting background micro-animations.
*   **Interactive Showcase**: Collapses into a responsive slideshow carousel on mobile devices and a stacked 3D overlap display on desktop viewports.
*   **Store Integration**: Pre-styled Google Play (with multi-color Google SVG icon) and App Store download triggers.

### 2. Privy Authentication & Solana Integration
*   **Identity Check**: Secure authorization flow using Privy hooks for Google and Apple social logins.
*   **Solana Embedded Wallet**: Automatically provisions a non-custodial Solana wallet for new users on successful login.
*   **Profile Chip**: Responsive header profile chip showing truncated wallet address or Google/Apple email details, featuring a dropdown container with disconnect triggers.

### 3. Real-Time Token Marquee
*   **Smooth Loop**: Infinite scrolling top and bottom tickers presenting live pricing, 24h percentage changes, and colorful normalized SVG sparkline trend metrics.
*   **Smart Routing**: Tapping any scrolling asset routes the viewport directly to `/trade/[symbol]`.

### 4. Advanced Trading Terminal
*   **Trending Sidebar**: Multi-coin tracking sidebar with responsive search filtering (automatically hidden on mobile/tablet to prioritize terminal data).
*   **Token Overview**: Displays currency indicators and statistical metrics using deterministic formatting to avoid server-side hydration mismatches.
*   **TradingView Widget**: High-performance charting canvas resizing dynamically to the viewport width.
*   **Executions Stream**: Real-time live trading history logs.
*   **Whale Tracking**: Ranks top holders with custom whale badge indications.
*   **Buy/Sell Panel**: Interactive transaction panel with input state validation, percentage size shortcuts, and execution success toast alerts.

---

## Environment Variables

To configure and run the application, create a `.env.local` file in the root directory and add the following variables:

```env
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
PRIVY_APP_SECRET=your_privy_app_secret_here

# BirdEye API Client
NEXT_PUBLIC_BIRDEYE_API_KEY=your_birdeye_api_key_here
```

> **Note**: `NEXT_PUBLIC_PRIVY_APP_ID` and `NEXT_PUBLIC_BIRDEYE_API_KEY` are exposed to the client-side. Make sure to keep `PRIVY_APP_SECRET` confidential and never commit `.env` or `.env.local` files to source control.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iamvpbhaskar/chadwallet.git
   cd chadwallet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Run Locally

Start the development server with Next.js Turbopack for ultra-fast compilation:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Deployment

### Deploying to Vercel
1. Install the Vercel CLI or link your repository to the [Vercel Dashboard](https://vercel.com).
2. Configure the following environment variables in your Vercel Project Settings:
   *   `NEXT_PUBLIC_PRIVY_APP_ID`
   *   `PRIVY_APP_SECRET`
   *   `NEXT_PUBLIC_BIRDEYE_API_KEY`
3. Trigger a deployment. Next.js will automatically configure the build output and host the production bundle.
