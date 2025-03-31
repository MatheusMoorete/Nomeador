'use client';

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AdBannerProps {
  adSlot?: string;
  adClient?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdBanner({
  adSlot = 'yyyyyyyyyy',
  adClient = 'ca-pub-xxxxxxxxxxxx',
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = ''
}: AdBannerProps) {
  const [adId] = useState(`ad-${uuidv4().slice(0, 8)}`);
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
    <div className="w-full flex justify-center my-8">
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