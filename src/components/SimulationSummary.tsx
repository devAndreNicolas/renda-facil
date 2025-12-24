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

  // monthlyRate está em decimal (ex: 0.018 para 1.8%)
  // calculateDoublingTime espera porcentagem (ex: 1.8 para 1.8%)
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
      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
        Resumo da Simulação
      </h3>

      {/* -------- PRIMEIRA PESSOA: PERGUNTAS CHAVE DO INVESTIDOR -------- */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2 md:mb-3 font-medium">
          Aqui está o que você realmente quer saber:
        </p>

        {/* 1. Rendimento futuro / Proventos (FII) */}
        <div className="mb-2 md:mb-3">
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
            {isFII
              ? '📌 1. Quanto devo receber de proventos por mês (estimativa)?'
              : '📌 1. Se eu parar de aportar, quanto esse valor rende por mês?'}
          </p>
          <p className="font-bold text-gray-900 dark:text-gray-100 text-base md:text-lg">
            {formatCurrency(rendimentoMensalFuturo)}
          </p>
          {isFII && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              💡 Proventos de FIIs variam mensalmente. Este é um valor médio estimado.
            </p>
          )}
        </div>

        {/* 2. Lucro líquido */}
        <div className="mb-2 md:mb-3">
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
            📌 2. Qual foi meu lucro líquido total (já descontado o IR)?
          </p>
          <p className="font-bold text-gray-900 dark:text-gray-100 text-base md:text-lg">
            {formatCurrency(result.profitLiquid)}
          </p>
        </div>

        {/* 3. Rentabilidade total */}
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
            📌 3. Qual foi minha rentabilidade percentual total?
          </p>
          <p className="font-bold text-gray-900 dark:text-gray-100 text-base md:text-lg">
            {((result.profitLiquid / result.totalInvested) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* -------- DISCLAIMER VISÍVEL -------- */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
        <p className="text-xs md:text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ <strong>Importante:</strong> Estes valores são estimativas baseadas em cálculos matemáticos. Rentabilidades reais podem variar devido a taxas, impostos adicionais e condições de mercado. Não garantimos resultados futuros. Consulte um profissional antes de investir.
        </p>
      </div>

      {/* -------- BLOCO PRINCIPAL -------- */}
      <div className="mb-4 md:mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-3 md:p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
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

          <p className="text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            {formatCurrency(rendimentoMensalFuturo)}
          </p>
        </div>
      </div>

      {/* -------- MÉTRICAS FINANCEIRAS -------- */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 p-2 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-0.5 md:mb-1">
            Valor Final Total
          </p>
          <p className="text-lg md:text-2xl font-bold text-primary-600 dark:text-primary-400">
            {formatCurrency(result.total)}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-2 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-0.5 md:mb-1">
            Lucro Líquido
          </p>
          <p className="text-lg md:text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(result.profitLiquid)}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-0.5 md:mb-1">
            Total Investido
          </p>
          <p className="text-base md:text-xl font-semibold text-gray-900 dark:text-gray-100">
            {formatCurrency(result.totalInvested)}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-4 rounded-lg">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-0.5 md:mb-1">
            Rentabilidade Total
          </p>
          <p className="text-base md:text-xl font-semibold text-blue-600 dark:text-blue-400">
            {((result.profitLiquid / result.totalInvested) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* -------- RENDIMENTO MÉDIO -------- */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 md:pt-4">
        {type && type.irType === 'regressivo' && (
          <div className="flex items-center justify-between text-xs md:text-sm mb-1.5 md:mb-2">
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
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs md:text-sm">
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

      {/* {doublingTime > 0 && doublingTime < 50 && isFinite(doublingTime) && ( }
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            💡 <strong>Dica:</strong> Com essa taxa, o investimento dobra em aproximadamente{' '}
            <strong>{doublingTime.toFixed(1)} anos</strong>.
          </p>
        </div>
      )}*/}
    </motion.div>
  );
}
