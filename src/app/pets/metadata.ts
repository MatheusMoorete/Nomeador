import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nomes criativos para pets | Gerador de Nomes para Animais | Nomeador',
  description: 'Encontre nomes fofos, engraçados e criativos para seu pet. Gere nomes únicos para cães, gatos, pássaros e outros animais com um clique! Sugestões perfeitas para seu novo melhor amigo.',
  keywords: 'nomes para pets, nomes de cachorro, nomes de gato, nomes para animais, nomes fofos para pets, nomes engraçados para pets, gerador de nomes para pets, nomes para cães, nomes para gatos, batizar pet',
  alternates: {
    canonical: 'https://www.nomeador.com/pets',
    languages: {
      'en': 'https://www.nomeador.com/en/pets',
      'pt-BR': 'https://www.nomeador.com/pets',
    },
  },
  openGraph: {
    title: 'Nomes criativos para pets | Gerador de Nomes para Animais | Nomeador',
    description: 'Encontre nomes fofos, engraçados e criativos para seu pet. Gere nomes únicos para cães, gatos, pássaros e outros animais com um clique!',
    url: 'https://www.nomeador.com/pets',
    siteName: 'Nomeador',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/pet-social-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gerador de nomes para pets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nomes criativos para pets | Nomeador',
    description: 'Encontre nomes fofos, engraçados e criativos para seu pet. Gere nomes únicos para cães, gatos, pássaros e outros animais!',
    images: ['/pet-twitter-image.jpg'],
  },
}; 