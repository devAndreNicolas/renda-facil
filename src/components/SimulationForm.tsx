'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { investmentTypes, getInvestmentType, InvestmentType } from '@/lib/investments';
import { monthlyToAnnual, TaxRegime } from '@/lib/calculation';
import { getTaxasComCache } from '@/lib/taxas';

import HelpFindingRates from './HelpFindingRates';
import GlossaryTooltip from './GlossaryTooltip';

interface SimulationFormData {
  type: string;
  initial: number;
  monthly: number;
  rate: number;
  rateType: 'monthly' | 'annual';
  period: number;
  periodType: 'months' | 'years';
  taxRegime: TaxRegime;
}

interface SimulationFormProps {
  onSubmit: (data: SimulationFormData) => void;
  defaultValues?: Partial<SimulationFormData>;
}

export default function SimulationForm({ onSubmit, defaultValues }: SimulationFormProps) {
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [taxRegime, setTaxRegime] = useState<TaxRegime>('current');
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  // Manual Input States
  // FIIs
  const [sharePrice, setSharePrice] = useState(100);
  const [currentShares, setCurrentShares] = useState(10);
  const [monthlyShares, setMonthlyShares] = useState(5);
  const [dividendYield, setDividendYield] = useState(0.8); // % a.m.
  const [appreciationRate, setAppreciationRate] = useState(5.0); // % a.a.

  // Fixed Income
  const [cdiRate, setCdiRate] = useState(10.65); // % a.a.
  const [cdiPercent, setCdiPercent] = useState(100); // % do CDI

  // Tesouro IPCA
  const [ipcaRate, setIpcaRate] = useState(4.5); // % a.a.
  const [realRate, setRealRate] = useState(6.0); // % a.a.

  // Fetch Real-time Rates
  useEffect(() => {
    const fetchRates = async () => {
      const taxas = await getTaxasComCache();
      if (taxas.cdi > 0) setCdiRate(taxas.cdi);
      if (taxas.ipca > 0) {
        // IPCA from API is monthly, convert to annual for display/calc
        const ipcaAnnual = monthlyToAnnual(taxas.ipca);
        setIpcaRate(Number(ipcaAnnual.toFixed(2)));
      }
    };
    fetchRates();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SimulationFormData>({
    defaultValues: {
      type: defaultValues?.type || 'FII',
      initial: defaultValues?.initial || 1000,
      monthly: defaultValues?.monthly || 500,
      rate: defaultValues?.rate || 10.0,
      rateType: 'annual', // Sempre anual
      period: defaultValues?.period || 12,
      periodType: defaultValues?.periodType || 'months',
    },
  });

  const selectedType = watch('type');
  const investmentType = getInvestmentType(selectedType);

  // Update scenarios when type changes
  useEffect(() => {
    if (investmentType) {
      // Reset custom rate flag when type changes
      setUseCustomRate(false);

      // Set default rate from investment type
      // If not FII (which uses calculated rate) and not Fixed Income (which uses CDI calc), set rate directly
      if (!investmentType.hasShareInputs && investmentType.id !== 'CDB' && investmentType.id !== 'LCI' && investmentType.id !== 'LCA' && investmentType.id !== 'TESOURO_IPCA') {
        setValue('rate', investmentType.defaultRate);
      }

      // Set defaults for specific types
      if (investmentType.id === 'LCI' || investmentType.id === 'LCA') {
        setCdiPercent(85);
      } else if (investmentType.id === 'CDB') {
        setCdiPercent(100);
      } else if (investmentType.id === 'POUPANCA') {
        // Poupança: 0.5% a.m. -> ~6.17% a.a. + TR (assuming 0 for simplicity or small value)
        const poupancaRate = monthlyToAnnual(0.5);
        setValue('rate', Math.round(poupancaRate * 100) / 100);
      }
    }
  }, [selectedType, investmentType, setValue]);

  // FII Logic: Update standard fields based on share inputs
  useEffect(() => {
    if (investmentType?.hasShareInputs) {
      const calculatedInitial = currentShares * sharePrice;
      const calculatedMonthly = monthlyShares * sharePrice;

      // Rate approximation: Annualized Yield + Appreciation
      const annualizedYield = monthlyToAnnual(dividendYield);
      const totalRate = annualizedYield + appreciationRate;

      setValue('initial', calculatedInitial);
      setValue('monthly', calculatedMonthly);
      setValue('rate', Math.round(totalRate * 100) / 100);
    }
  }, [investmentType, sharePrice, currentShares, monthlyShares, dividendYield, appreciationRate, setValue]);

  // Fixed Income Logic: Update rate based on CDI inputs
  useEffect(() => {
    if (investmentType && (investmentType.id === 'CDB' || investmentType.id === 'LCI' || investmentType.id === 'LCA')) {
      const calculatedRate = cdiRate * (cdiPercent / 100);
      setValue('rate', Math.round(calculatedRate * 100) / 100);
    }
  }, [investmentType, cdiRate, cdiPercent, setValue]);

  // Tesouro IPCA Logic
  useEffect(() => {
    if (investmentType?.id === 'TESOURO_IPCA') {
      const totalRate = ipcaRate + realRate;
      setValue('rate', Math.round(totalRate * 100) / 100);
    }
  }, [investmentType, ipcaRate, realRate, setValue]);

  const onFormSubmit = (data: SimulationFormData) => {
    onSubmit({ ...data, taxRegime });
  };



  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Settings Toggles */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modo:</span>
          <button
            type="button"
            onClick={() => setIsSimpleMode(!isSimpleMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSimpleMode ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
          >
            <span
              className={`${isSimpleMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
          <span className="text-xs text-gray-500">{isSimpleMode ? 'Simples' : 'Avançado'}</span>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Regra IR:</span>
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setTaxRegime('current')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${taxRegime === 'current'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              Atual (2025)
            </button>
            <button
              type="button"
              onClick={() => setTaxRegime('mp1303')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${taxRegime === 'mp1303'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              MP 1.303 (2026+)
            </button>
          </div>
        </div>
      </div>

      {taxRegime === 'mp1303' && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs text-blue-800 dark:text-blue-200">
          ℹ️ <strong>Cenário MP 1.303:</strong> LCI/LCA com 5% de IR e Renda Fixa (CDB/Tesouro) com alíquota única de 17,5%.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipo de Investimento
        </label>
        <select {...register('type', { required: true })} className="input-field">
          {investmentTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.icon} {type.name}
            </option>
          ))}
        </select>
        {investmentType && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{investmentType.description}</p>
        )}
      </div>

      {/* FII Specific Inputs */}
      {investmentType?.hasShareInputs ? (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            📊 Dados do Fundo (Manual)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preço da Cota (R$)
              </label>
              <input
                type="number"
                value={sharePrice}
                onChange={(e) => setSharePrice(Number(e.target.value))}
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <GlossaryTooltip term="Dividend Yield" definition="Rendimento mensal pago por cota em %">
                  Dividend Yield (% a.m.)
                </GlossaryTooltip>
              </label>
              <input
                type="number"
                value={dividendYield}
                onChange={(e) => setDividendYield(Number(e.target.value))}
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cotas Atuais (Qtd)
              </label>
              <input
                type="number"
                value={currentShares}
                onChange={(e) => setCurrentShares(Number(e.target.value))}
                className="input-field"
                min="0"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total: R$ {(currentShares * sharePrice).toLocaleString('pt-BR')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cotas por Mês (Qtd)
              </label>
              <input
                type="number"
                value={monthlyShares}
                onChange={(e) => setMonthlyShares(Number(e.target.value))}
                className="input-field"
                min="0"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Aporte: R$ {(monthlyShares * sharePrice).toLocaleString('pt-BR')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <GlossaryTooltip term="Valorização" definition="Quanto você espera que a cota valorize ao ano">
                  Valorização Esperada (% a.a.)
                </GlossaryTooltip>
              </label>
              <input
                type="number"
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="input-field"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Standard Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <GlossaryTooltip term="Valor Inicial" definition="Quanto você já tem para investir agora">
                Valor Inicial (R$)
              </GlossaryTooltip>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                {...register('initial', { required: true, min: 0, valueAsNumber: true })}
                className="flex-1"
                onChange={(e) => setValue('initial', Number(e.target.value))}
              />
              <input
                type="number"
                {...register('initial', { required: true, min: 0, valueAsNumber: true })}
                className="input-field w-32"
                min="0"
                step="100"
              />
            </div>
            {errors.initial && (
              <p className="mt-1 text-sm text-red-600">Valor deve ser maior ou igual a zero</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <GlossaryTooltip term="Aporte Mensal" definition="Quanto você pretende investir todo mês">
                Aporte Mensal (R$)
              </GlossaryTooltip>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="10000"
                step="50"
                {...register('monthly', { required: true, min: 0, valueAsNumber: true })}
                className="flex-1"
                onChange={(e) => setValue('monthly', Number(e.target.value))}
              />
              <input
                type="number"
                {...register('monthly', { required: true, min: 0, valueAsNumber: true })}
                className="input-field w-32"
                min="0"
                step="50"
              />
            </div>
            {errors.monthly && (
              <p className="mt-1 text-sm text-red-600">Valor deve ser maior ou igual a zero</p>
            )}
          </div>
        </>
      )}


      {/* Rate Input Section - Hidden in Simple Mode if not FII */}
      {
        (!isSimpleMode || investmentType?.hasShareInputs) && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            {investmentType?.id === 'CDB' || investmentType?.id === 'LCI' || investmentType?.id === 'LCA' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <GlossaryTooltip term="Taxa CDI" definition="Taxa básica de juros da economia (semelhante à Selic)">
                      Taxa CDI Atual (% a.a.)
                    </GlossaryTooltip>
                  </label>
                  <input
                    type="number"
                    value={cdiRate}
                    onChange={(e) => setCdiRate(Number(e.target.value))}
                    className="input-field"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <GlossaryTooltip term="% do CDI" definition="Quanto o investimento rende em relação ao CDI">
                      Rentabilidade (% do CDI)
                    </GlossaryTooltip>
                  </label>
                  <input
                    type="number"
                    value={cdiPercent}
                    onChange={(e) => setCdiPercent(Number(e.target.value))}
                    className="input-field"
                    min="0"
                    step="1"
                  />
                </div>
                <div className="col-span-full">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Taxa Efetiva: <strong className="text-primary-600">{(cdiRate * cdiPercent / 100).toFixed(2)}% a.a.</strong>
                  </p>
                  {investmentType.id === 'CDB' && (
                    <p className="text-xs text-yellow-600 mt-1">⚠️ IR Regressivo sobre o lucro (22,5% a 15%).</p>
                  )}
                  {(investmentType.id === 'LCI' || investmentType.id === 'LCA') && (
                    <p className="text-xs text-green-600 mt-1">✅ Isento de Imposto de Renda.</p>
                  )}
                </div>
              </div>
            ) : investmentType?.id === 'TESOURO_IPCA' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <GlossaryTooltip term="IPCA" definition="Índice oficial de inflação no Brasil">
                      IPCA Projetado (% a.a.)
                    </GlossaryTooltip>
                  </label>
                  <input
                    type="number"
                    value={ipcaRate}
                    onChange={(e) => setIpcaRate(Number(e.target.value))}
                    className="input-field"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <GlossaryTooltip term="Taxa Real" definition="Juro fixo pago acima da inflação">
                      Taxa Real (Prefixada % a.a.)
                    </GlossaryTooltip>
                  </label>
                  <input
                    type="number"
                    value={realRate}
                    onChange={(e) => setRealRate(Number(e.target.value))}
                    className="input-field"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="col-span-full">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Taxa Total Estimada: <strong className="text-primary-600">{(ipcaRate + realRate).toFixed(2)}% a.a.</strong>
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">⚠️ Título sujeito a marcação a mercado. Resgate antecipado pode gerar perdas.</p>
                </div>
              </div>
            ) : investmentType?.id === 'POUPANCA' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Taxa de Rendimento (Fixa)
                </label>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                  0,5% a.m. + TR (Referencial) ≈ {watch('rate').toFixed(2)}% a.a.
                </div>
                <p className="text-xs text-green-600 mt-1">✅ Isento de IR e Liquidez Diária.</p>
              </div>
            ) : investmentType?.hasShareInputs ? (
              <div className="col-span-full">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Taxa Efetiva Estimada (Yield + Valorização): <strong className="text-primary-600">{watch('rate').toFixed(2)}% a.a.</strong>
                </p>
                <p className="text-xs text-orange-600 mt-1">⚠️ Renda Variável: O valor das cotas pode oscilar.</p>
              </div>
            ) : (
              /* Standard Rate Input */
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <GlossaryTooltip term="Taxa de Juros" definition="Taxa de rendimento esperada ao ano. Ex: 10,5 = 10,5% ao ano">
                      Taxa de Juros (% a.a.)
                    </GlossaryTooltip>
                  </label>
                </div>

                <div className="flex items-center space-x-4 mb-2">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.1"
                    {...register('rate', { required: true, min: 0, valueAsNumber: true })}
                    className="flex-1"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setValue('rate', Math.round(value * 10) / 10);
                      setUseCustomRate(true);
                    }}
                  />
                  <input
                    type="number"
                    {...register('rate', {
                      required: true,
                      min: 0,
                      valueAsNumber: true,
                      validate: (value) => {
                        if (value < 0) return 'A taxa deve ser maior ou igual a zero';
                        if (isNaN(value)) return 'Valor inválido';
                        return true;
                      }
                    })}
                    className="input-field w-32"
                    step="0.1"
                    onChange={() => setUseCustomRate(true)}
                  />
                </div>
              </div>
            )}
          </div>
        )
      }

      {
        investmentType && (
          <HelpFindingRates investmentType={investmentType} />
        )
      }

      {
        errors.rate && (
          <p className="mt-1 text-sm text-red-600">{errors.rate.message as string}</p>
        )
      }

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Período de Investimento
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="1"
            max="360"
            step="1"
            {...register('period', { required: true, min: 1, valueAsNumber: true })}
            className="flex-1"
            onChange={(e) => setValue('period', Number(e.target.value))}
          />
          <input
            type="number"
            {...register('period', { required: true, min: 1, valueAsNumber: true })}
            className="input-field w-32"
            min="1"
            step="1"
          />
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              {...register('periodType')}
              value="months"
              className="mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Meses</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              {...register('periodType')}
              value="years"
              className="mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Anos</span>
          </label>
        </div>
        {investmentType && investmentType.liquidityMonthsMin > 0 && (
          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Atenção:</strong> Este investimento tem carência mínima de{' '}
              {investmentType.liquidityMonthsMin} meses. Certifique-se de que o período escolhido seja maior que a carência.
            </p>
          </div>
        )}
      </div>

      <button type="submit" className="btn-primary w-full">
        Calcular Rendimento
      </button>
    </form >
  );
}

