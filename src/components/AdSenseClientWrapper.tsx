'use client';

import dynamic from 'next/dynamic';

// Carregamento dinâmico do componente AdSenseLoader dentro de um componente cliente
const AdSenseLoader = dynamic(() => import("./AdSenseLoader"), { 
  ssr: false 
});

export default function AdSenseClientWrapper() {
  return <AdSenseLoader />;
} 