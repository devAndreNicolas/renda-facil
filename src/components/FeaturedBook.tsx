'use client';

import Link from 'next/link';
import { featuredBook } from '@/config/affiliates';

export default function FeaturedBook() {
  if (!featuredBook) {
    return null;
  }

  return (
    <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        📗 Livro em destaque para iniciantes
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {featuredBook.description}
      </p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 mb-4">
        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
          {featuredBook.title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {featuredBook.author}
        </p>
        {featuredBook.imageUrl && (
          <img
            src={featuredBook.imageUrl}
            alt={featuredBook.title}
            className="w-32 h-48 object-cover rounded mb-3 mx-auto"
          />
        )}
      </div>

      <Link
        href={featuredBook.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center w-full"
      >
        Ver o livro na Amazon →
      </Link>
    </div>
  );
}

