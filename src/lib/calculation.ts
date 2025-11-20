import { InvestmentType } from './investments';

export interface CalculationResult {
  total: number;
  totalInvested: number;
  profit: number;
  profitLiquid: number;
  monthlyEvolution: Array<{
    month: number;
    value: number;
    invested: number;
    profit: number;
  }>;
  estimatedMonthlyIncome: number;
}

/**
 * Converte taxa anual para mensal
 */
export function annualToMonthly(annualRate: number): number {
  return Math.pow(1 + annualRate / 100, 1 / 12) - 1;
}

/**
 * Converte taxa mensal para anual
 */
export function monthlyToAnnual(monthlyRate: number): number {
  return (Math.pow(1 + monthlyRate / 100, 12) - 1) * 100;
}

/**
 * Calcula o IR regressivo baseado no tempo de investimento
 */
export function calculateIRRate(months: number): number {
  if (months <= 6) return 0.225; // 22,5%
  if (months <= 12) return 0.20; // 20%
  if (months <= 24) return 0.175; // 17,5%
  return 0.15; // 15%
}

/**
 * Calcula o rendimento com juros compostos
 * M = P × (1 + i)^n + A × [(1 + i)^n - 1] / i
 */
export function calculateCompoundInterest(
  initialValue: number,
  monthlyContribution: number,
  monthlyRate: number,
  months: number
): CalculationResult {
  const monthlyRateDecimal = monthlyRate / 100;
  const totalMonths = Math.floor(months);

  // Valor futuro do principal
  const principalFuture = initialValue * Math.pow(1 + monthlyRateDecimal, totalMonths);

  // Valor futuro dos aportes mensais
  let futureAnnuity = 0;
  if (monthlyRateDecimal > 0) {
    futureAnnuity = monthlyContribution * ((Math.pow(1 + monthlyRateDecimal, totalMonths) - 1) / monthlyRateDecimal);
  } else {
    futureAnnuity = monthlyContribution * totalMonths;
  }

  const total = principalFuture + futureAnnuity;
  const totalInvested = initialValue + monthlyContribution * totalMonths;
  const profit = total - totalInvested;

  // Evolução mensal
  const monthlyEvolution: CalculationResult['monthlyEvolution'] = [];
  let currentValue = initialValue;

  for (let month = 0; month <= totalMonths; month++) {
    if (month > 0) {
      currentValue = currentValue * (1 + monthlyRateDecimal) + monthlyContribution;
    }
    const invested = initialValue + monthlyContribution * month;
    const monthProfit = currentValue - invested;

    monthlyEvolution.push({
      month,
      value: currentValue,
      invested,
      profit: monthProfit,
    });
  }

  return {
    total,
    totalInvested,
    profit,
    profitLiquid: profit, // Será ajustado pela função principal
    monthlyEvolution,
    estimatedMonthlyIncome: 0, // Will be updated in the main function
  };
}

export type TaxRegime = 'current' | 'mp1303';

/**
 * Calcula o rendimento considerando IR e regras específicas do investimento
 */
export function calculateInvestmentReturn(
  initialValue: number,
  monthlyContribution: number,
  rate: number,
  rateType: 'monthly' | 'annual',
  months: number,
  investmentType: InvestmentType,
  taxRegime: TaxRegime = 'current'
): CalculationResult {
  // Converter taxa para mensal se necessário
  const monthlyRate = rateType === 'annual' ? annualToMonthly(rate) * 100 : rate;

  // Calcular juros compostos
  const result = calculateCompoundInterest(initialValue, monthlyContribution, monthlyRate, months);

  // Aplicar IR conforme tipo de investimento e regime tributário
  let profitLiquid = result.profit;
  let irRate = 0;

  if (taxRegime === 'mp1303') {
    // Regras da MP 1.303 (Proposta 2026)
    if (investmentType.id === 'LCI' || investmentType.id === 'LCA') {
      irRate = 0.05; // 5% sobre o lucro
    } else if (investmentType.id === 'CDB' || investmentType.id === 'TESOURO_IPCA') {
      irRate = 0.175; // 17,5% fixo
    } else {
      // FII e Poupança continuam isentos (por enquanto, na simulação)
      irRate = 0;
    }
  } else {
    // Regras Atuais (2025)
    if (investmentType.irType === 'regressivo') {
      irRate = calculateIRRate(months);
    } else {
      // Isento
      irRate = 0;
    }
  }

  if (irRate > 0) {
    const irAmount = result.profit * irRate;
    profitLiquid = result.profit - irAmount;
  }

  // Calculate estimated monthly income based on the final value
  const estimatedMonthlyIncome = result.total * (monthlyRate / 100);

  return {
    ...result,
    profitLiquid,
    estimatedMonthlyIncome,
  };
}

/**
 * Calcula em quantos anos o investimento dobra (regra dos 72)
 */
export function calculateDoublingTime(monthlyRate: number): number {
  const annualRate = Math.pow(1 + monthlyRate / 100, 12) - 1;
  return 72 / (annualRate * 100);
}

