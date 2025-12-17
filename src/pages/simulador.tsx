import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { investmentTypes } from '@/lib/investments';
import InvestmentCard from '@/components/InvestmentCard';
import AdSlot from '@/components/AdSlot';
import TaxasIndicator from '@/components/TaxasIndicator';
import AffiliateBanner from '@/components/AffiliateBanner';
import { getAffiliateLinksForPosition, adSenseConfig } from '@/config/affiliates';

// Mapeamento de IDs para slugs
const investmentSlugMap: Record<string, string> = {
  'FII': 'fii',
  'LCI': 'lci',
  'LCA': 'lca',
  'CDB': 'cdb',
  'TESOURO_IPCA': 'tesouro-ipca',
  'POUPANCA': 'poupanca',
};

export default function Simulador() {
  // Banners estratégicos para a página hub
  const headerBanners = getAffiliateLinksForPosition('header', 'simulador');

  return (
    <>
      <NextSeo
        title="Simulador de Rendimentos - Escolha seu Investimento | RendeCerto"
        description="Escolha o tipo de investimento e simule seus rendimentos. FII, LCI, LCA, CDB, Tesouro IPCA+ e Poupança. Calcule juros compostos de forma precisa."
        canonical="https://rendecerto.com.br/simulador"
        openGraph={{
          title: 'Simulador de Rendimentos - RendeCerto',
          description: 'Simule rendimentos de investimentos com juros compostos. Escolha seu tipo de investimento.',
          url: 'https://rendecerto.com.br/simulador',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Simulador de Rendimentos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Escolha o tipo de investimento e descubra quanto seu dinheiro pode render com juros compostos
          </p>
        </div>

        <TaxasIndicator />

        {/* Banners no topo (se configurados) */}
        {headerBanners.length > 0 && (
          <div className="mb-8 space-y-4">
            {headerBanners.map((affiliate) => (
              <AffiliateBanner key={affiliate.id} affiliate={affiliate} />
            ))}
          </div>
        )}

        {/* AdSense Banner */}
        {adSenseConfig.enabled && adSenseConfig.slots.banner && (
          <AdSlot position="banner" className="my-8" />
        )}

        {/* Grid de Tipos de Investimento */}
        <section className="py-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Escolha o Tipo de Investimento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentTypes.map((investment) => {
              const slug = investmentSlugMap[investment.id];
              return (
                <Link
                  key={investment.id}
                  href={`/simulador/${slug}`}
                  className="block transform transition-all duration-300 hover:scale-105"
                >
                  <div className="card h-full hover:shadow-xl cursor-pointer">
                    <div className="text-5xl mb-4 text-center">{investment.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                      {investment.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                      {investment.description}
                    </p>
                    <div className="mt-4 text-center">
                      <span className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                        Simular {investment.name} →
                      </span>
                    </div>
                    <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Risco: {investment.riskLevel}</span>
                      <span>•</span>
                      <span>{investment.indexador}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Informações Adicionais */}
        <section className="py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
            Como usar o Simulador
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Escolha o Investimento
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Selecione o tipo de investimento que deseja simular
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Preencha os Dados
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Informe valor inicial, aportes mensais e período
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Veja os Resultados
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Analise gráficos e projeções de rendimento
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}