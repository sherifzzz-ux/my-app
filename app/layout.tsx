import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import FlawlessFooter from "@/components/flawless/footer";
import { Header } from "@/components/flawless/header";
import MobileFooterNav from "@/components/flawless/mobile-footer-nav";
import { Inter, Playfair_Display } from "next/font/google";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "FlawlessBeauty - Parapharmacie en ligne & Cosmétiques",
  description:
    "Découvrez notre sélection de produits de beauté, cosmétiques et parapharmacie. Livraison gratuite dès 39€.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body id="top" className="antialiased pb-16">
        <Header />
        {children}
        <FlawlessFooter />
        <MobileFooterNav />
        <Toaster />
      </body>
    </html>
  );
}
