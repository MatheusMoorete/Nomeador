'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DynamicTitle() {
  const { t } = useLanguage();
  
  useEffect(() => {
    if (document) {
      document.title = t('site.title');
    }
  }, [t]);
  
  // Componente sem renderização visual
  return null;
} 