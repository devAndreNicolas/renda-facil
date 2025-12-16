'use client';

import Link from 'next/link';
import { featuredBook } from '@/config/affiliates';

export default function FeaturedBook() {
  if (!featuredBook) {
    return null;
  }

  return (
    <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
      <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">
        📗 Livro em destaque para iniciantes
      </h3>
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
        {featuredBook.description}
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-200 dark:border-gray-700 mb-3 md:mb-4">
        <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-gray-100 mb-1 md:mb-2">
          {featuredBook.title}
        </h4>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3">
          {featuredBook.author}
        </p>
        {featuredBook.imageUrl && (
          <img
            src={featuredBook.imageUrl}
            alt={featuredBook.title}
            className="w-24 md:w-32 h-36 md:h-48 object-cover rounded mb-2 md:mb-3 mx-auto"
          />
        )}
      </div>

      <Link
        href={featuredBook.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-green-700 transition-colors text-center w-full"
      >
        Ver o livro na Amazon →
      </Link>
    </div>
  );
}

