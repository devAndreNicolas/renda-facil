import investmentTypesData from '../data/investmentTypes.json';

export interface InvestmentType {
  id: string;
  name: string;
  description: string;
  irRate: number;
  irType: 'isento' | 'regressivo';
  minRate: number;
  maxRate: number;
  defaultRate: number;
  icon: string;
  indexador: string;
  liquidityMonthsMin: number;
  variability: number;
  riskLevel: 'baixíssimo' | 'baixo' | 'médio' | 'alto';
  whereToFind: string;
  // New fields for manual input configuration
  hasShareInputs?: boolean; // For FIIs (Price, Shares)
  hasRateInput?: boolean; // For Fixed Income (Rate)
  rateLabel?: string; // Label for the rate input (e.g., "% do CDI", "Taxa Anual")
  rateDescription?: string; // Helper text for the rate input
}

export const investmentTypes: InvestmentType[] = Object.entries(investmentTypesData).map(([id, data]: [string, any]) => ({
  id,
  ...data,
  irType: data.irType as 'isento' | 'regressivo',
  riskLevel: data.riskLevel as 'baixíssimo' | 'baixo' | 'médio' | 'alto',
  // Default values for new fields based on type
  hasShareInputs: id === 'FII',
  hasRateInput: id !== 'FII', // FIIs use dividend yield which is calculated from share inputs or separate
  rateLabel: id === 'CDB' || id === 'LCI' || id === 'LCA' ? '% do CDI' : 'Taxa de Juros (a.a.)',
  rateDescription: id === 'CDB' || id === 'LCI' || id === 'LCA' 
    ? 'Porcentagem do CDI (ex: 100% do CDI)' 
    : 'Taxa de rendimento anual esperada',
}));

export function getInvestmentType(id: string): InvestmentType | undefined {
  return investmentTypes.find((type) => type.id === id);
}