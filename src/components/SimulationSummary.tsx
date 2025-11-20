'use client';

import { motion } from 'framer-motion';
import { CalculationResult } from '@/lib/calculation';
import { getInvestmentType } from '@/lib/investments';
import { calculateDoublingTime, calculateIRRate } from '@/lib/calculation';

interface SimulationSummaryProps {
  result: CalculationResult;
  investmentType: string;
  rate: number;
  rateType: 'monthly' | 'annual';
}

export default function SimulationSummary({
  result,
  investmentType,
  rate,
  rateType,
}: SimulationSummaryProps) {
  const type = getInvestmentType(investmentType);
  const months = result.monthlyEvolution.length;

  const monthlyRate =
    rateType === 'annual'
      ? Math.pow(1 + rate / 100, 1 / 12) - 1
      : rate / 100;

  const doublingTime = calculateDoublingTime(monthlyRate * 100);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const lucroMedioMensal = result.profitLiquid / months;
  const rendimentoMensalFuturo = result.estimatedMonthlyIncome;

  const isFII = investmentType === 'FII';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Resumo da Simulação
      </h3>

      {/* -------- PRIMEIRA PESSOA: PERGUNTAS CHAVE DO INVESTIDOR -------- */}
      <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-medium">
          Aqui está o que você realmente quer saber:
        </p>

        {/* 1. Rendimento futuro / Proventos (FII) */}
        <div className="mb-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {isFII
              ? '📌 1. Quanto devo receber por mês de proventos?'
              : '📌 1. Se eu deixar esse dinheiro aplicado depois disso, quanto rende por mês?'}
          </p>
          <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
            {formatCurrency(rendimentoMensalFuturo)}
          </p>
        </div>

        {/* 2. Lucro líquido */}
        <div className="mb-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            📌 2. Quanto eu ganhei neste período simulando aportes?
          </p>
          <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
            {formatCurrency(result.profitLiquid)}
          </p>
        </div>

        {/* 3. Rentabilidade total */}
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            📌 3. Isso deu quanto de rentabilidade?
          </p>
          <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
            {((result.profitLiquid / result.totalInvested) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* -------- BLOCO PRINCIPAL -------- */}
      <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-center justify-between">
          <div>
            {isFII ? (
              <>
                <p className="text-sm text-indigo-800 dark:text-indigo-200 font-medium">
                  💰 Proventos Mensais Estimados
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-300 mt-1">
                  Estimativa de pagamentos mensais do fundo.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-indigo-800 dark:text-indigo-200 font-medium">
                  💰 Rendimento Mensal Futuro (Estimado)
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-300 mt-1">
                  Quanto renderia por mês deixando o valor final aplicado.
                </p>
              </>
            )}
          </div>

          <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            {formatCurrency(rendimentoMensalFuturo)}
          </p>
        </div>
      </div>

      {/* -------- MÉTRICAS FINANCEIRAS -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Valor Final Total
          </p>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {formatCurrency(result.total)}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Lucro Líquido
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(result.profitLiquid)}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Investido
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {formatCurrency(result.totalInvested)}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Rentabilidade Total
          </p>
          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            {((result.profitLiquid / result.totalInvested) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* -------- RENDIMENTO MÉDIO -------- */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">
            Lucro Médio Mensal (na simulação):
          </span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {formatCurrency(lucroMedioMensal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">
            Lucro Médio por Ano:
          </span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {formatCurrency(lucroMedioMensal * 12)}
          </span>
        </div>

        {type && type.irType === 'regressivo' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              IR Descontado:
            </span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {formatCurrency(result.profit - result.profitLiquid)}
            </span>
          </div>
        )}
      </div>

      {type && type.irType === 'regressivo' && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Alíquota IR (estimada):
            </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {(calculateIRRate(months - 1) * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Baseada no prazo total de {months - 1} meses.
          </p>
        </div>
      )}

      {doublingTime > 0 && doublingTime < 100 && (
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            💡 <strong>Dica:</strong> Com essa taxa, o investimento dobra em aproximadamente{' '}
            <strong>{doublingTime.toFixed(1)} anos</strong>.
          </p>
        </div>
      )}
    </motion.div>
  );
}
