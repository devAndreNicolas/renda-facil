'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  position: 'banner' | 'in-article' | 'sidebar';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  useEffect(() => {
    // Carregar script do AdSense quando o componente montar
    if (typeof window !== 'undefined' && (window as any).adsbygoogle === undefined) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('Erro ao carregar anúncio:', e);
    }
  }, []);

  const getAdStyle = () => {
    switch (position) {
      case 'banner':
        return 'w-full h-32 md:h-24';
      case 'in-article':
        return 'w-full h-32 md:h-24 my-8';
      case 'sidebar':
        return 'w-full h-96';
      default:
        return 'w-full h-32';
    }
  };

  return (
    <div className={`${getAdStyle()} ${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={`${position}-slot`}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

