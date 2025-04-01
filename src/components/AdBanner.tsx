'use client';

import { useEffect, useRef, useId } from 'react';

interface AdBannerProps {
  adSlot?: string;
  adClient?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdBanner({
  // Substitua 'yyyyyyyyyy' pelos IDs de slot reais fornecidos pelo AdSense
  adSlot = 'yyyyyyyyyy',
  // Substitua 'ca-pub-xxxxxxxxxxxx' pelo seu ID de publicador real
  adClient = 'ca-pub-6450827090404321',
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = ''
}: AdBannerProps) {
  // Usar useId em vez de UUID para garantir IDs iguais no servidor e cliente
  const id = useId();
  const adId = `ad-${id}`;
  const adInitialized = useRef(false);

  useEffect(() => {
    // Só inicializa uma vez
    if (adInitialized.current) return;

    // Pequeno atraso para garantir que o DOM esteja pronto
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && !adInitialized.current) {
        adInitialized.current = true;
        try {
          // Garantir que o array existe antes de chamar push
          if (!window.adsbygoogle) {
            window.adsbygoogle = [];
          }
          window.adsbygoogle.push({});
        } catch (error) {
          // Silencioso em produção
          if (process.env.NODE_ENV !== 'production') {
            console.error('AdSense error (dev only):', error);
          }
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-4">
      <div className={`max-w-2xl w-full mx-auto px-4 ${className}`}>
        <div id={adId}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
          />
        </div>
      </div>
    </div>
  );
} 