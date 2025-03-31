import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meus Favoritos - Nomeador',
  description: 'Visualize e gerencie seus nomes favoritos salvos no Nomeador.',
  alternates: {
    canonical: 'https://nomeador.com/favoritos',
  },
  openGraph: {
    title: 'Meus Favoritos - Nomeador',
    description: 'Gerencie sua coleção pessoal de nomes favoritos do Nomeador',
    url: 'https://nomeador.com/favoritos',
    siteName: 'Nomeador',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meus Favoritos - Nomeador',
    description: 'Gerencie sua coleção pessoal de nomes favoritos do Nomeador',
  },
};