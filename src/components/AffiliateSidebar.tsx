'use client';

import { getAffiliateLinksForPosition } from '@/config/affiliates';
import AffiliateBanner from './AffiliateBanner';
import AdSlot from './AdSlot';
import { adSenseConfig } from '@/config/affiliates';

interface AffiliateSidebarProps {
  currentPage?: string;
  investmentType?: string;
  className?: string;
}

export default function AffiliateSidebar({
  currentPage,
  investmentType,
  className = '',
}: AffiliateSidebarProps) {
  const sidebarAffiliates = getAffiliateLinksForPosition('sidebar', currentPage, investmentType);

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Banners de Afiliados */}
      {sidebarAffiliates.map((affiliate) => (
        <AffiliateBanner key={affiliate.id} affiliate={affiliate} variant="compact" />
      ))}

      {/* Google AdSense Sidebar */}
      {adSenseConfig.enabled && adSenseConfig.positions.sidebar && (
        <div className="sticky top-24">
          <AdSlot position="sidebar" />
        </div>
      )}
    </aside>
  );
}

