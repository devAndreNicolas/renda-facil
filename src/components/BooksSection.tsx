'use client';

import Link from 'next/link';
import { bookLinks } from '@/config/affiliates';

export default function BooksSection() {
  if (bookLinks.length === 0) {
    return null;
  }

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
      <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">
        📘 Bons livros para aprender a investir melhor
      </h3>
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4 md:mb-6">
        Aprender sobre investimentos também passa por entender conceitos, disciplina e visão de longo prazo. Estes livros são boas leituras para quem quer investir com mais segurança e consciência.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
        {bookLinks.slice(0, 4).map((book) => (
          <Link
            key={book.id}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-0.5 md:mb-1">
              {book.title}
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 md:mb-2">
              {book.author}
            </p>
            <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {book.description}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/livros"
        className="inline-block bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-700 transition-colors text-center w-full"
      >
        Ver bons livros de investimentos →
      </Link>
    </div>
  );
}

