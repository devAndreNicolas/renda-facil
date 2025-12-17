"use client";

import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import SimulationForm from "@/components/SimulationForm";
import SimulationSummary from "@/components/SimulationSummary";
import ChartComponent from "@/components/ChartComponent";
import SavedSimulations from "@/components/SavedSimulations";
import AdSlot from "@/components/AdSlot";
import TaxasIndicator from "@/components/TaxasIndicator";
import AffiliateBanner from "@/components/AffiliateBanner";
import AffiliateSidebar from "@/components/AffiliateSidebar";
import BooksSection from "@/components/BooksSection";
import FeaturedBook from "@/components/FeaturedBook";
import { bookLinks, featuredBook } from "@/config/affiliates";
import { calculateInvestmentReturn } from "@/lib/calculation";
import { getInvestmentType, investmentTypes } from "@/lib/investments";
import { saveSimulation, SavedSimulation } from "@/lib/storage";
import { CalculationResult } from "@/lib/calculation";
import {
  getAffiliateLinksForPosition,
  adSenseConfig,
} from "@/config/affiliates";

// Mapeamento de slugs para IDs de investimento
const investmentSlugMap: Record<string, string> = {
  fii: "FII",
  lci: "LCI",
  lca: "LCA",
  cdb: "CDB",
  "tesouro-ipca": "TESOURO_IPCA",
  tesouro: "TESOURO_IPCA",
  poupanca: "POUPANCA",
};

export default function SimuladorTipo() {
  const router = useRouter();
  const { tipo } = router.query;
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [currentType, setCurrentType] = useState<string>("FII");
  const [currentRate, setCurrentRate] = useState<number>(0.9);
  const [currentRateType, setCurrentRateType] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [viewMode, setViewMode] = useState<"month" | "semester" | "year">(
    "month"
  );
  const [currentFormData, setCurrentFormData] = useState<{
    initial: number;
    monthly: number;
    period: number;
    periodType: "months" | "years";
  } | null>(null);
  const [investmentType, setInvestmentType] = useState<ReturnType<
    typeof getInvestmentType
  > | null>(null);

  useEffect(() => {
    if (tipo && typeof tipo === "string") {
      const investmentId = investmentSlugMap[tipo.toLowerCase()];
      if (investmentId) {
        const type = getInvestmentType(investmentId);
        if (type) {
          setCurrentType(investmentId);
          setCurrentRate(type.defaultRate);
          setInvestmentType(type);
        } else {
          // Tipo inválido, redirecionar para hub
          router.push("/simulador");
        }
      } else {
        // Slug inválido, redirecionar para hub
        router.push("/simulador");
      }
    }
  }, [tipo, router]);

  const handleSubmit = (
    data: {
      type: string;
      initial: number;
      monthly: number;
      rate: number;
      rateType: "monthly" | "annual";
      period: number;
      periodType: "months" | "years";
    },
    dividendYield?: number
  ) => {
    const investmentType = getInvestmentType(data.type);
    if (!investmentType) return;

    const periodInMonths =
      data.periodType === "years" ? data.period * 12 : data.period;

    const calculationResult = calculateInvestmentReturn(
      data.initial,
      data.monthly,
      data.rate,
      data.rateType,
      periodInMonths,
      investmentType,
      dividendYield
    );

    setResult(calculationResult);
    setCurrentType(data.type);
    setCurrentRate(data.rate);
    setCurrentRateType(data.rateType);
    setCurrentFormData({
      initial: data.initial,
      monthly: data.monthly,
      period: data.period,
      periodType: data.periodType,
    });
  };

  const handleSave = () => {
    if (!result || !currentFormData) return;

    const formData = {
      type: currentType,
      initial: currentFormData.initial,
      monthly: currentFormData.monthly,
      rate: currentRate,
      rateType: currentRateType,
      period: currentFormData.period,
      periodType: currentFormData.periodType,
      result: {
        total: result.total,
        totalInvested: result.totalInvested,
        profit: result.profit,
        profitLiquid: result.profitLiquid,
      },
    };

    saveSimulation(formData);
    alert("Simulação salva com sucesso!");
  };

  const handleSelectSimulation = (simulation: SavedSimulation) => {
    const investmentType = getInvestmentType(simulation.type);
    if (!investmentType) return;

    const periodInMonths =
      simulation.periodType === "years"
        ? simulation.period * 12
        : simulation.period;

    const calculationResult = calculateInvestmentReturn(
      simulation.initial,
      simulation.monthly,
      simulation.rate,
      simulation.rateType,
      periodInMonths,
      investmentType
    );

    setResult(calculationResult);
    setCurrentType(simulation.type);
    setCurrentRate(simulation.rate);
    setCurrentRateType(simulation.rateType);
  };

  if (!investmentType) {
    return <div className="max-w-7xl mx-auto p-8">Carregando...</div>;
  }

  // SEO específico para o tipo de investimento
  const seoTitle = `Simulador de ${investmentType.name} - Calcule Rendimentos | RendeCerto`;
  const seoDescription = `Simule rendimentos de ${investmentType.name.toLowerCase()}. ${
    investmentType.description
  } Calcule quanto seu dinheiro pode render com juros compostos.`;
  const canonicalUrl = `https://rendecerto.com.br/simulador/${tipo}`;

  // Banners estratégicos
  const afterFormBanners = getAffiliateLinksForPosition(
    "after-form",
    "simulador",
    currentType
  );
  const afterResultsBanners = getAffiliateLinksForPosition(
    "after-results",
    "simulador",
    currentType
  );

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          url: canonicalUrl,
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `simulador ${investmentType.name.toLowerCase()}, calculadora ${investmentType.name.toLowerCase()}, ${investmentType.name.toLowerCase()} rendimento, juros compostos ${investmentType.name.toLowerCase()}`,
          },
        ]}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header com título específico - Compacto no mobile */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 md:mb-4">
            Simulador de {investmentType.icon} {investmentType.name}
          </h1>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            {investmentType.description}
          </p>
        </div>

        {/* Taxas Indicator - Compacto no mobile */}
        <div className="mb-4 md:mb-6">
          <TaxasIndicator />
        </div>

        {/* Layout Principal: Formulário à esquerda, Resultados à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-8">
          {/* Coluna Esquerda - Formulário */}
          <div className="lg:col-span-1">
            <div className="card sticky top-20 lg:top-24">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
                Parâmetros da Simulação
              </h2>
              <SimulationForm
                onSubmit={handleSubmit}
                defaultValues={{ type: currentType }}
              />
            </div>

            {/* Simulações Salvas - Oculto no mobile para economizar espaço */}
            <div className="hidden lg:block mt-4 lg:mt-6">
              <SavedSimulations onSelectSimulation={handleSelectSimulation} />
            </div>
          </div>

          {/* Coluna Direita - Resultados e Gráficos */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {result ? (
              <>
                {/* Resultados em Destaque */}
                <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-700">
                  <SimulationSummary
                    result={result}
                    investmentType={currentType}
                    rate={currentRate}
                    rateType={currentRateType}
                  />
                  <button
                    onClick={handleSave}
                    className="btn-secondary w-full mt-3 md:mt-4 text-sm md:text-base py-2 md:py-3"
                  >
                    💾 Salvar Simulação
                  </button>
                </div>

                {/* Gráfico */}
                <div className="card">
                  <ChartComponent
                    data={result}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                </div>

                {/* Banner após resultados - Onde investir */}
                {afterResultsBanners.length > 0 && (
                  <div className="space-y-4">
                    {afterResultsBanners.map((affiliate) => (
                      <AffiliateBanner
                        key={affiliate.id}
                        affiliate={affiliate}
                      />
                    ))}
                  </div>
                )}

                {/* AdSense após resultados */}
                {adSenseConfig.enabled && adSenseConfig.slots.afterResults && (
                  <AdSlot position="banner" />
                )}
              </>
            ) : (
              <div className="card text-center py-6 md:py-12 bg-gray-50 dark:bg-gray-800/50">
                <div className="text-4xl md:text-6xl mb-2 md:mb-4">📊</div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 md:mb-2">
                  Preencha o formulário
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 px-2">
                  Configure os parâmetros e veja os resultados aqui
                </p>
              </div>
            )}

            {/* Banner após formulário (quando não há resultados) */}
            {!result && afterFormBanners.length > 0 && (
              <div className="space-y-3 md:space-y-4">
                {afterFormBanners.map((affiliate) => (
                  <AffiliateBanner key={affiliate.id} affiliate={affiliate} />
                ))}
              </div>
            )}
            {bookLinks && bookLinks.length > 0 && (
              <div className="max-w-4xl mx-auto my-12 px-4">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 md:p-6 flex items-start gap-4 md:gap-6">
                  {/* Ícone */}
                  <div className="text-3xl md:text-4xl flex-shrink-0">📗</div>

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 md:mb-2">
                      Explore nossos livros recomendados
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
                      Dicas de leitura para turbinar seu conhecimento financeiro
                      e de investimentos.
                    </p>

                    {/* Botão */}
                    <a
                      href="/livros"
                      className="inline-block bg-primary-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm hover:bg-primary-700 transition-colors"
                    >
                      Ver todos os livros →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* AdSense após formulário (quando não há resultados) */}
            {!result &&
              adSenseConfig.enabled &&
              adSenseConfig.slots.inArticle && <AdSlot position="inArticle" />}
          </div>
        </div>
        {/* Destaque para o livro do mês / livro recomendado */}
        {featuredBook && (
          <div className="max-w-7xl mx-auto my-8">
            <div className="card flex flex-col md:flex-row items-center gap-4 p-4 md:p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-300 dark:border-yellow-700">
              <img
                src={featuredBook.imageUrl}
                alt={featuredBook.title}
                className="w-32 md:w-40 rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {featuredBook.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-1">
                  {featuredBook.description}
                </p>
                <a
                  href={featuredBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 md:mt-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition"
                >
                  Ver livro recomendado
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar com afiliados (abaixo em mobile, fixo em desktop) */}
        <div className="lg:hidden mt-8">
          <AffiliateSidebar
            currentPage="simulador"
            investmentType={currentType}
          />
        </div>
      </div>
    </>
  );
}
