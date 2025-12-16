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
  dividendYieldAnnual?: number // Para FII: dividend yield anual em %
): CalculationResult {
  // Converter taxa para mensal se necessário
  const monthlyRate = rateType === 'annual' ? annualToMonthly(rate) * 100 : rate;

  // Calcular juros compostos
  const result = calculateCompoundInterest(initialValue, monthlyContribution, monthlyRate, months);

  // Aplicar IR conforme tipo de investimento (regras atuais 2025)
  let profitLiquid = result.profit;
  let irRate = 0;

  if (investmentType.irType === 'regressivo') {
    irRate = calculateIRRate(months);
  } else {
    // Isento (FII, LCI, LCA, Poupança)
    irRate = 0;
  }

  if (irRate > 0) {
    const irAmount = result.profit * irRate;
    profitLiquid = result.profit - irAmount;
  }

  // Calculate estimated monthly income
  let estimatedMonthlyIncome = 0;
  
  if (investmentType.id === 'FII') {
    if (dividendYieldAnnual !== undefined) {
      // Para FII: calcular proventos mensais baseado no dividend yield anual
      // Usar capital médio durante o período para cálculo mais preciso
      const averageCapital = (initialValue + result.total) / 2;
      // Dividend yield anual dividido por 12 para obter mensal
      estimatedMonthlyIncome = (averageCapital * dividendYieldAnnual) / 100 / 12;
    } else {
      // Se não temos dividend yield separado (simulação salva), usar aproximação
      // Assumir que ~60% da taxa anual é dividend yield (aproximação conservadora)
      const estimatedYieldRate = (rate / 100) * 0.6;
      const averageCapital = (initialValue + result.total) / 2;
      estimatedMonthlyIncome = (averageCapital * estimatedYieldRate) / 12;
    }
  } else {
    // Para outros investimentos: usar valor final e taxa mensal
    estimatedMonthlyIncome = result.total * (monthlyRate / 100);
  }

  return {
    ...result,
    profitLiquid,
    estimatedMonthlyIncome,
  };
}

/**
 * Calcula em quantos anos o investimento dobra (regra dos 72)
 * @param monthlyRate - Taxa mensal em porcentagem (ex: 1.5 para 1.5%)
 */
export function calculateDoublingTime(monthlyRate: number): number {
  // monthlyRate já vem em porcentagem (ex: 1.5 para 1.5%)
  // Converter para decimal e depois para anual
  const monthlyRateDecimal = monthlyRate / 100;
  const annualRate = Math.pow(1 + monthlyRateDecimal, 12) - 1;
  // Regra dos 72: 72 / taxa anual em porcentagem
  // annualRate está em decimal (ex: 0.2182 para 21.82%)
  // Precisamos converter para porcentagem: annualRate * 100
  const annualRatePercent = annualRate * 100;
  // Evitar divisão por zero ou valores muito pequenos
  if (annualRatePercent <= 0 || annualRatePercent < 0.1) {
    return Infinity;
  }
  return 72 / annualRatePercent;
}

