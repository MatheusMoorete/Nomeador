'use client';

import { useEffect } from 'react';

export default function AdSenseLoader() {
  useEffect(() => {
    // Inicializar o array adsbygoogle se não existir
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      window.adsbygoogle = [];
    }
  }, []);

  // Este componente não renderiza nada visualmente
  return null;
} 