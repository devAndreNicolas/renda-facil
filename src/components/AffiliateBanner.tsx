'use client';

import Link from 'next/link';
import { AffiliateLink } from '@/config/affiliates';

interface AffiliateBannerProps {
  affiliate: AffiliateLink;
  variant?: 'default' | 'compact' | 'large';
  className?: string;
}

export default function AffiliateBanner({
  affiliate,
  variant = 'default',
  className = '',
}: AffiliateBannerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'p-3 md:p-4';
      case 'large':
        return 'p-4 md:p-6';
      default:
        return 'p-3 md:p-5';
    }
  };

  const getIcon = () => {
    switch (affiliate.type) {
      case 'course':
        return '📚';
      case 'broker':
        return '💰';
      case 'product':
        return '🛍️';
      default:
        return '🔗';
    }
  };

  const linkProps = affiliate.openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <div
      className={`bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${getVariantStyles()} ${className}`}
    >
      <Link href={affiliate.url} {...linkProps} className="block">
        <div className="flex items-start gap-2 md:gap-4">
          <div className="text-3xl md:text-4xl flex-shrink-0">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 md:mb-2">
              {affiliate.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
              {affiliate.description}
            </p>
            <span className="inline-block bg-primary-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm hover:bg-primary-700 transition-colors">
              {affiliate.buttonText || 'Saiba Mais →'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

