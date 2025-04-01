'use client';

import { useEffect, ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageDetectorProps {
  children: ReactNode;
}

export default function LanguageDetector({ children }: LanguageDetectorProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Ajusta o atributo lang do HTML com base no idioma selecionado
    if (document.documentElement) {
      document.documentElement.lang = language;
    }
  }, [language]);

  return <>{children}</>;
} 