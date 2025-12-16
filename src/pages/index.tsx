import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { investmentTypes } from '@/lib/investments';
import InvestmentCard from '@/components/InvestmentCard';
import AdSlot from '@/components/AdSlot';
import TaxasIndicator from '@/components/TaxasIndicator';

export default function Home() {
  return (
    <>
      <NextSeo
        title="RendeCerto - Simulador de Rendimentos de Investimentos"
        description="Simule rendimentos de FII, LCI, LCA, Tesouro IPCA+, CDB e mais. Calcule quanto seu dinheiro pode render com juros compostos."
        canonical="https://rendecerto.com.br"
        openGraph={{
          url: 'https://rendecerto.com.br',
          title: 'RendeCerto - Simulador de Rendimentos',
          description: 'Simule rendimentos de investimentos de forma simples e clara.',
          siteName: 'RendeCerto',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <TaxasIndicator />

        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Simule seus <span className="text-primary-600 dark:text-primary-400">rendimentos</span> de
            investimentos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Descubra quanto seu dinheiro pode render com FII, LCI, LCA, Tesouro IPCA+, CDB e outros
            investimentos. Simulação clara e precisa com juros compostos.
          </p>
          <Link href="/simulador" className="btn-primary inline-block text-lg px-8 py-4">
            Simule seu rendimento agora →
          </Link>
        </section>

        <AdSlot position="banner" className="my-8" />

        {/* Investment Types */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Tipos de Investimento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentTypes.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Por que usar o RendeCerto?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Cálculos Precisos
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Utilizamos fórmulas de juros compostos e consideramos IR regressivo quando aplicável.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Salve e Compare
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Salve suas simulações e compare diferentes investimentos lado a lado.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Interface Simples
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Design intuitivo e responsivo, perfeito para investidores iniciantes e experientes.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Use nosso simulador gratuito e descubra o potencial dos seus investimentos.
          </p>
          <Link href="/simulador" className="btn-primary inline-block text-lg px-8 py-4">
            Acessar Simulador
          </Link>
        </section>
      </div>
    </>
  );
}

