import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { bookLinks, featuredBook } from '@/config/affiliates';

export default function Livros() {
  return (
    <>
      <NextSeo
        title="Livros sobre Investimentos - Recomendações | RendeCerto"
        description="Lista de livros recomendados para aprender sobre investimentos, educação financeira e independência financeira. Livros essenciais para investidores."
        canonical="https://rendecerto.com.br/livros"
      />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
          📚 Bons Livros sobre Investimentos
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
          Aprender sobre investimentos também passa por entender conceitos, disciplina e visão de longo prazo. Estes livros são boas leituras para quem quer investir com mais segurança e consciência.
        </p>

        {/* Livro em Destaque */}
        {featuredBook && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              📗 Livro em Destaque
            </h2>
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
              <div className="flex flex-col md:flex-row gap-6">
                {featuredBook.imageUrl && (
                  <img
                    src={featuredBook.imageUrl}
                    alt={featuredBook.title}
                    className="w-48 h-72 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {featuredBook.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {featuredBook.author}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {featuredBook.description}
                  </p>
                  <Link
                    href={featuredBook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Ver o livro na Amazon →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Livros */}
        {bookLinks.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              📘 Outros Livros Recomendados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookLinks.map((book) => (
                <Link
                  key={book.id}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {book.imageUrl && (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {book.author}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {book.description}
                  </p>
                  <div className="mt-4 text-primary-600 dark:text-primary-400 font-semibold">
                    Ver na Amazon →
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Em breve, adicionaremos recomendações de livros sobre investimentos.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Esta página será atualizada em breve com recomendações de livros sobre investimentos.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

