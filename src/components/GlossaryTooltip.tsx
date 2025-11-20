'use client';

import { useState } from 'react';

interface GlossaryTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, definition, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <span className="underline decoration-dotted cursor-help text-primary-600 dark:text-primary-400">
        {children}
      </span>
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-lg">
          <dt className="font-semibold mb-1">{term}</dt>
          <dd className="text-gray-300">{definition}</dd>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
        </div>
      )}
    </span>
  );
}

