'use client';

import { useState, useEffect, useMemo } from 'react';
import { getTaxasComCache, TaxasBCB } from '@/lib/taxas';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export default function TaxasIndicator() {
  const [taxas, setTaxas] = useState<TaxasBCB | null>(null);
  const [loading, setLoading] = useState(true);
  const [particlesInit, setParticlesInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  useEffect(() => {
    async function loadTaxas() {
      try {
        const data = await getTaxasComCache();
        setTaxas(data);
      } catch (error) {
        console.error('Erro ao carregar taxas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTaxas();
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 18,
          density: {
            enable: true,
          },
        },
        color: {
          value: ['#3b82f6', '#10b981', '#8b5cf6'],
        },
        links: {
          color: '#3b82f6',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: false,
          straight: false,
          outModes: {
            default: 'bounce',
          },
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.4,
            },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (loading) {
    return (
      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          📊 Carregando taxas atualizadas...
        </p>
      </div>
    );
  }

  if (!taxas) {
    return null;
  }

  const dataFormatada = new Date(taxas.dataAtualizacao).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="relative bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-6 overflow-hidden">
      {particlesInit && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0 pointer-events-none"
        />
      )}
      <div className="relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📊</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Taxas atualizadas em tempo real
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Atualizado em: {dataFormatada}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">CDI</p>
            <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {taxas.cdi.toFixed(2)}% <span className="text-xs">a.a.</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Selic</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {taxas.selic.toFixed(2)}% <span className="text-xs">a.a.</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">IPCA</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {taxas.ipca.toFixed(2)}% <span className="text-xs">a.m.</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
          Fonte: Banco Central do Brasil (BCB)
        </p>
      </div>
    </div>
  );
}

