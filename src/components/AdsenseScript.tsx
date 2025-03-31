'use client';

import Script from 'next/script';

export default function AdsenseScript() {
  return (
    <Script
      id="adsense-script"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxx"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
} 