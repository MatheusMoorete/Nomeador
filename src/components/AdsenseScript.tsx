'use client';

import Script from 'next/script';

export default function AdsenseScript() {
  return (
    <Script
      id="adsense-script"
      async
      // Substitua 'ca-pub-xxxxxxxxxxxx' pelo seu ID de publicador real do AdSense
      // fornecido quando sua conta for aprovada
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6450827090404321"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
} 