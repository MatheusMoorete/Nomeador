import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AdSenseClientWrapper from "@/components/AdSenseClientWrapper";
import AdsenseScript from "@/components/AdsenseScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nomeador - Gerador de Nomes",
  description: "Gerador de nomes para pets, jogos, bebês e muito mais!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Script do Google AdSense */}
        <AdsenseScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
        <AdSenseClientWrapper />
      </body>
    </html>
  );
}
