'use client';

import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import ComparisonTable from '@/components/ComparisonTable';
import SavedSimulations from '@/components/SavedSimulations';
import { SavedSimulation, loadSimulations } from '@/lib/storage';
import { getInvestmentType } from '@/lib/investments';

export default function Comparativo() {
  const [selectedSimulations, setSelectedSimulations] = useState<SavedSimulation[]>([]);
  const [allSimulations, setAllSimulations] = useState<SavedSimulation[]>([]);

  useEffect(() => {
    setAllSimulations(loadSimulations());
  }, []);

  const handleSelectSimulation = (simulation: SavedSimulation) => {
    if (selectedSimulations.find((s) => s.id === simulation.id)) {
      setSelectedSimulations(selectedSimulations.filter((s) => s.id !== simulation.id));
    } else if (selectedSimulations.length < 3) {
      setSelectedSimulations([...selectedSimulations, simulation]);
    } else {
      alert('Você pode comparar no máximo 3 simulações por vez.');
    }
  };

  return (
    <>
      <NextSeo
        title="Comparativo de Investimentos - RendaFácil"
        description="Compare diferentes simulações de investimentos lado a lado. Veja qual investimento oferece melhor rentabilidade."
        canonical="https://rendafacil.br/comparativo"
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Comparativo de Investimentos
        </h1>

        {allSimulations.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Você ainda não tem simulações salvas.
            </p>
            <Link href="/simulador" className="btn-primary inline-block">
              Criar Primeira Simulação
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Selecione até 3 simulações para comparar. Clique em &quot;Selecionar&quot; para adicionar ou remover.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSimulations.map((sim) => {
                  const isSelected = selectedSimulations.find((s) => s.id === sim.id);
                  return (
                    <div
                      key={sim.id}
                      className={`card cursor-pointer transition-all ${
                        isSelected
                          ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => handleSelectSimulation(sim)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{getInvestmentType(sim.type)?.icon}</span>
                        {isSelected && (
                          <span className="text-primary-600 dark:text-primary-400 font-semibold">
                            ✓ Selecionado
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {getInvestmentType(sim.type)?.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {sim.rate}% {sim.rateType === 'monthly' ? 'a.m.' : 'a.a.'} | {sim.period}{' '}
                        {sim.periodType === 'months' ? 'meses' : 'anos'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedSimulations.length > 0 && (
              <ComparisonTable simulations={selectedSimulations} />
            )}

            {selectedSimulations.length > 0 && (
              <div className="mt-8 text-center">
                <Link href="/simulador" className="btn-primary inline-block">
                  Simular Novamente com Mesmos Parâmetros
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}


