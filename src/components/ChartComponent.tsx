'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { CalculationResult } from '@/lib/calculation';
import { useWindowSize } from '@/lib/useWindowSize';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartComponentProps {
  data: CalculationResult;
  viewMode: 'month' | 'semester' | 'year';
  onViewModeChange: (mode: 'month' | 'semester' | 'year') => void;
}

export default function ChartComponent({ data, viewMode, onViewModeChange }: ChartComponentProps) {
  const [chartData, setChartData] = useState<any>(null);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    let filteredData = data.monthlyEvolution;

    if (viewMode === 'semester') {
      filteredData = data.monthlyEvolution.filter((_, index) => index % 6 === 0 || index === data.monthlyEvolution.length - 1);
    } else if (viewMode === 'year') {
      filteredData = data.monthlyEvolution.filter((_, index) => index % 12 === 0 || index === data.monthlyEvolution.length - 1);
    }

    const categories = filteredData.map((item) => {
      if (viewMode === 'month') return `Mês ${item.month}`;
      if (viewMode === 'semester') return `Semestre ${Math.floor(item.month / 6)}`;
      return `Ano ${Math.floor(item.month / 12)}`;
    });

    setChartData({
      series: [
        {
          name: 'Valor Total',
          data: filteredData.map((item) => Number(item.value.toFixed(2))),
        },
        {
          name: 'Total Investido',
          data: filteredData.map((item) => Number(item.invested.toFixed(2))),
        },
        {
          name: 'Lucro',
          data: filteredData.map((item) => Number(item.profit.toFixed(2))),
        },
      ],
      options: {
        chart: {
          type: 'line' as const,
          height: isMobile ? 250 : 350,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
          zoom: {
            enabled: true,
            type: 'x',
          },
        },
        colors: ['#0ea5e9', '#10b981', '#f59e0b'],
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        xaxis: {
          categories,
          labels: {
            rotate: isMobile ? -90 : -45,
            rotateAlways: isMobile,
            style: {
              fontSize: isMobile ? '10px' : '12px',
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          },
        },
        tooltip: {
          y: {
            formatter: (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          },
        },
        legend: {
          position: (isMobile ? 'bottom' : 'top') as 'top' | 'bottom',
          horizontalAlign: 'center' as const,
          itemMargin: {
            horizontal: 10,
            vertical: 5,
          },
        },
        theme: {
          mode: (document.documentElement.classList.contains('dark') ? 'dark' : 'light') as 'dark' | 'light',
        },
      },
    });
  }, [data, viewMode, isMobile]);

  if (!chartData) return <div className="h-96 flex items-center justify-center">Carregando gráfico...</div>;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Evolução do Investimento</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewModeChange('month')}
            className={`px-3 py-1 rounded text-sm ${
              viewMode === 'month'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => onViewModeChange('semester')}
            className={`px-3 py-1 rounded text-sm ${
              viewMode === 'semester'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Semestre
          </button>
          <button
            onClick={() => onViewModeChange('year')}
            className={`px-3 py-1 rounded text-sm ${
              viewMode === 'year'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Ano
          </button>
        </div>
      </div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={isMobile ? 250 : 350}
      />
    </div>
  );
}

