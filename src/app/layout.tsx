import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "@/providers/Providers";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "ChadWallet",
  description: "Discover, analyze and trade Solana memecoins with confidence.",
  openGraph: {
    title: "ChadWallet",
    description: "Discover, analyze and trade Solana memecoins with confidence.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo/light.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} antialiased min-h-screen bg-[#08090d] text-slate-100 flex flex-col`}
      >
        <AppProviders>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  );
}

