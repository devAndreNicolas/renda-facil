'use client';

import { SavedSimulation } from '@/lib/storage';
import { getInvestmentType } from '@/lib/investments';
import { useWindowSize } from '@/lib/useWindowSize';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ComparisonTableProps {
  simulations: SavedSimulation[];
}

export default function ComparisonTable({ simulations }: ComparisonTableProps) {
  const { isMobile } = useWindowSize();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const chartData = {
    series: [
      {
        name: 'Valor Final',
        data: simulations.map((sim) => Number(sim.result.total.toFixed(2))),
      },
      {
        name: 'Lucro Líquido',
        data: simulations.map((sim) => Number(sim.result.profitLiquid.toFixed(2))),
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: isMobile ? 250 : 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: true,
          },
        },
      },
      colors: ['#0ea5e9', '#10b981'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (value: number) => formatCurrency(value),
      },
      xaxis: {
        categories: simulations.map((sim) => {
          const type = getInvestmentType(sim.type);
          return isMobile ? type?.name || 'Investimento' : `${type?.icon} ${type?.name}`;
        }),
        labels: {
          style: {
            fontSize: isMobile ? '10px' : '12px',
          },
          rotate: isMobile ? -45 : 0,
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => formatCurrency(value),
        },
      },
      tooltip: {
        y: {
          formatter: (value: number) => formatCurrency(value),
        },
      },
      legend: {
        position: 'top' as const,
      },
      theme: {
        mode: (document.documentElement.classList.contains('dark') ? 'dark' : 'light') as 'dark' | 'light',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="card overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Comparação Detalhada</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Investimento</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Valor Inicial</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Aporte Mensal</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Taxa</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Período</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Total Investido</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Valor Final</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Lucro Líquido</th>
              <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">Rentabilidade</th>
            </tr>
          </thead>
          <tbody>
            {simulations.map((sim, index) => {
              const type = getInvestmentType(sim.type);
              const rentability = (sim.result.profitLiquid / sim.result.totalInvested) * 100;
              return (
                <tr
                  key={sim.id}
                  className={`border-b border-gray-200 dark:border-gray-700 ${
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{type?.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{type?.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {formatCurrency(sim.initial)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {formatCurrency(sim.monthly)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {sim.rate}% {sim.rateType === 'monthly' ? 'a.m.' : 'a.a.'}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {sim.period} {sim.periodType === 'months' ? 'meses' : 'anos'}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700 dark:text-gray-300">
                    {formatCurrency(sim.result.totalInvested)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-primary-600 dark:text-primary-400">
                    {formatCurrency(sim.result.total)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(sim.result.profitLiquid)}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">
                    {rentability.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Gráfico Comparativo</h3>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={isMobile ? 250 : 350}
        />
      </div>
    </div>
  );
}

