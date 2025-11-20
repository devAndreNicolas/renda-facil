'use client';

import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import SimulationForm from '@/components/SimulationForm';
import SimulationSummary from '@/components/SimulationSummary';
import ChartComponent from '@/components/ChartComponent';
import SavedSimulations from '@/components/SavedSimulations';
import AdSlot from '@/components/AdSlot';
import TaxasIndicator from '@/components/TaxasIndicator';
import { calculateInvestmentReturn } from '@/lib/calculation';
import { getInvestmentType } from '@/lib/investments';
import { saveSimulation, SavedSimulation } from '@/lib/storage';
import { CalculationResult } from '@/lib/calculation';

export default function Simulador() {
  const router = useRouter();
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [currentType, setCurrentType] = useState<string>('FII');
  const [currentRate, setCurrentRate] = useState<number>(0.9);
  const [currentRateType, setCurrentRateType] = useState<'monthly' | 'annual'>('monthly');
  const [viewMode, setViewMode] = useState<'month' | 'semester' | 'year'>('month');
  const [currentFormData, setCurrentFormData] = useState<{
    initial: number;
    monthly: number;
    period: number;
    periodType: 'months' | 'years';
  } | null>(null);

  useEffect(() => {
    const { type } = router.query;
    if (type && typeof type === 'string') {
      setCurrentType(type);
    }
  }, [router.query]);

  const handleSubmit = (data: {
    type: string;
    initial: number;
    monthly: number;
    rate: number;
    rateType: 'monthly' | 'annual';
    period: number;
    periodType: 'months' | 'years';
    taxRegime: 'current' | 'mp1303';
  }) => {
    const investmentType = getInvestmentType(data.type);
    if (!investmentType) return;

    const periodInMonths = data.periodType === 'years' ? data.period * 12 : data.period;

    const calculationResult = calculateInvestmentReturn(
      data.initial,
      data.monthly,
      data.rate,
      data.rateType,
      periodInMonths,
      investmentType,
      data.taxRegime
    )

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
    alert('Simulação salva com sucesso!');
  };

  const handleSelectSimulation = (simulation: SavedSimulation) => {
    const investmentType = getInvestmentType(simulation.type);
    if (!investmentType) return;

    const periodInMonths =
      simulation.periodType === 'years' ? simulation.period * 12 : simulation.period;

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

  return (
    <>
      <NextSeo
        title="Simulador de Rendimentos - RendaFácil"
        description="Simule rendimentos de investimentos com juros compostos. Calcule FII, LCI, LCA, CDB, Tesouro IPCA+ e mais."
        canonical="https://rendafacil.br/simulador"
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Simulador de Rendimentos
        </h1>

        <TaxasIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Parâmetros da Simulação
              </h2>
              <SimulationForm
                onSubmit={handleSubmit}
                defaultValues={{ type: currentType }}
              />
            </div>

            <SavedSimulations onSelectSimulation={handleSelectSimulation} />
          </div>

          <div>
            {result && (
              <>
                <SimulationSummary
                  result={result}
                  investmentType={currentType}
                  rate={currentRate}
                  rateType={currentRateType}
                />
                <button
                  onClick={handleSave}
                  className="btn-secondary w-full mt-4"
                >
                  💾 Salvar Simulação
                </button>
              </>
            )}
          </div>
        </div>

        {result && (
          <>
            <AdSlot position="banner" className="my-8" />
            <ChartComponent
              data={result}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </>
        )}
      </div>
    </>
  );
}