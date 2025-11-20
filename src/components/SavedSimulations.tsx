'use client';

import { useState, useEffect } from 'react';
import { SavedSimulation, loadSimulations, deleteSimulation } from '@/lib/storage';
import { getInvestmentType } from '@/lib/investments';
import { motion, AnimatePresence } from 'framer-motion';

interface SavedSimulationsProps {
  onSelectSimulation: (simulation: SavedSimulation) => void;
  onDeleteSimulation?: (id: string) => void;
}

export default function SavedSimulations({ onSelectSimulation, onDeleteSimulation }: SavedSimulationsProps) {
  const [simulations, setSimulations] = useState<SavedSimulation[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = loadSimulations();
    setSimulations(saved);
  }, []);

  const handleDelete = (id: string) => {
    deleteSimulation(id);
    setSimulations(loadSimulations());
    if (onDeleteSimulation) {
      onDeleteSimulation(id);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (simulations.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Nenhuma simulação salva ainda. Salve suas simulações para compará-las depois!
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left mb-4"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Minhas Simulações ({simulations.length})
        </h3>
        <span className="text-primary-600 dark:text-primary-400">
          {isOpen ? '▼' : '▶'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-3 overflow-hidden"
          >
            {simulations.map((sim) => {
              const type = getInvestmentType(sim.type);
              return (
                <motion.div
                  key={sim.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl">{type?.icon}</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {type?.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Inicial: {formatCurrency(sim.initial)} | Mensal: {formatCurrency(sim.monthly)} |{' '}
                        {sim.rate}% {sim.rateType === 'monthly' ? 'a.m.' : 'a.a.'} | {sim.period}{' '}
                        {sim.periodType === 'months' ? 'meses' : 'anos'}
                      </p>
                      <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">
                        Resultado: {formatCurrency(sim.result.total)} (Lucro: {formatCurrency(sim.result.profitLiquid)})
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => onSelectSimulation(sim)}
                        className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
                      >
                        Usar
                      </button>
                      <button
                        onClick={() => handleDelete(sim.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        aria-label="Deletar simulação"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Criada em: {new Date(sim.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

