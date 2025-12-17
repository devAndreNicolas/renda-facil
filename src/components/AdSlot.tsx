'use client';

import { useEffect } from 'react';
import { adSenseConfig } from '@/config/affiliates';

interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'inArticle' | 'afterResults';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const slotId = adSenseConfig.slots[position];

  useEffect(() => {
    if (!adSenseConfig.enabled || !slotId) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [slotId]);

  // Renderiza apenas se AdSense estiver habilitado e slot existir
  if (!adSenseConfig.enabled || !slotId) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adSenseConfig.clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
