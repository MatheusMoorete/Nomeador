import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AdSenseClientWrapper from "@/components/AdSenseClientWrapper";
import AdsenseScript from "@/components/AdsenseScript";
import LanguageDetector from "@/components/LanguageDetector";
import DynamicTitle from "@/components/DynamicTitle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuração do viewport (separada da metadata conforme recomendado)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nomeador.com'),
  title: "Nomeador - Gerador de Nomes",
  description: "Gerador de nomes para pets, jogos, bebês e muito mais! Encontre o nome perfeito para seu pet, personagem de jogo ou bebê de forma rápida e divertida.",
  keywords: "gerador de nomes, nomes para pets, nomes para bebês, nomes para jogos, apelidos para jogos, nomes aleatórios, gerador de nomes online",
  authors: [{ name: "Nomeador" }],
  creator: "Nomeador",
  publisher: "Nomeador",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.nomeador.com/',
    siteName: 'Nomeador',
    title: 'Nomeador - Gerador de Nomes Online',
    description: 'Gerador de nomes para pets, jogos, bebês e muito mais! Encontre o nome perfeito para seu pet, personagem de jogo ou bebê de forma rápida e divertida.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nomeador - Gerador de Nomes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nomeador - Gerador de Nomes Online',
    description: 'Gerador de nomes para pets, jogos, bebês e muito mais! Encontre o nome perfeito para seu pet, personagem de jogo ou bebê de forma rápida e divertida.',
    images: ['/twitter-image.jpg'],
    creator: '@nomeador',
  },
  alternates: {
    canonical: 'https://www.nomeador.com',
    languages: {
      'en': 'https://www.nomeador.com/en',
      'pt-BR': 'https://www.nomeador.com',
    },
  },
  verification: {
    google: 'verificationcode',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png' },
    ],
    other: [
      // Removendo referência ao safari-pinned-tab.svg que não existe
    ],
  },
  category: 'tools',
  appleWebApp: {
    capable: true,
    title: 'Nomeador',
    statusBarStyle: 'black-translucent',
  },
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
        
        {/* Preload principais recursos */}
        <link rel="preload" href="/android-chrome-192x192.png" as="image" />
        <link rel="preload" href="/favicon-32x32.png" as="image" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Nomeador - Gerador de Nomes",
              "description": "Gerador de nomes para pets, jogos, bebês e muito mais! Encontre o nome perfeito para seu pet, personagem de jogo ou bebê de forma rápida e divertida.",
              "url": "https://www.nomeador.com",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Nomeador"
              }
            })
          }}
        />
        
        {/* Marcação estruturada para FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Como funciona o gerador de nomes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nosso gerador de nomes utiliza inteligência artificial para criar nomes únicos. Você pode escolher entre o modo online (usando IA) ou o modo offline (usando nossa base de dados de nomes pré-construída)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "É completamente gratuito?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim, o Nomeador é 100% gratuito para usar. Não há taxas ocultas ou recursos premium que exigem pagamento."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Posso salvar nomes que eu gostar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutamente! Clique no ícone de coração ao lado de qualquer nome que você gostar para adicioná-lo aos seus favoritos. Você pode visualizar e gerenciar seus nomes salvos na seção Favoritos."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Funciona offline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim! Você pode instalar o Nomeador como um Progressive Web App (PWA) em seu dispositivo e usar o modo offline quando não tiver conexão com a internet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Os nomes são únicos?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nosso gerador cria uma mistura de nomes tradicionais e únicos. Ao usar o modo IA, você obterá resultados mais criativos e exclusivos adaptados às suas preferências."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <LanguageDetector>
            <FavoritesProvider>
              <DynamicTitle />
              {children}
            </FavoritesProvider>
          </LanguageDetector>
        </LanguageProvider>
        <AdSenseClientWrapper />
      </body>
    </html>
  );
}
