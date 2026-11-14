import type { Metadata, Viewport } from "next";
import "./globals.css";

import { GlobalSearch } from "@/components/GlobalSearch";
import { FloatingNav } from "@/components/FloatingNav";
import { YouTubeBottomNav } from "@/components/YouTubeBottomNav";
import { Footer } from "@/components/Footer";
import { getBaseSearchItems } from "@/lib/search";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#090a0f",
};

export const metadata: Metadata = {
  title: "Learning Hub - Developer Learning Resources",
  description:
    "A free, open-source curated directory of developer learning resources — roadmaps, YouTube playlists, articles, and community tools. Not affiliated with YouTube or Google.",
  keywords: ["learning", "development", "programming", "tutorials", "courses", "roadmaps", "open source"],
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseSearchItems = await getBaseSearchItems();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-black text-foreground selection:bg-blue-500/30 flex flex-col justify-between">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <FloatingNav />
          <YouTubeBottomNav />
          <GlobalSearch items={baseSearchItems} />
      </body>
    </html>
  );
}
