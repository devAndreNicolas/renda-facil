'use client';

import { useState } from 'react';
import { InvestmentType } from '@/lib/investments';

interface HelpFindingRatesProps {
  investmentType: InvestmentType;
}

export default function HelpFindingRates({ investmentType }: HelpFindingRatesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        <span>❓</span>
        <span>Não sabe qual taxa usar? Clique aqui para ver onde encontrar</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            📍 Onde encontrar a taxa de {investmentType.name}:
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {investmentType.whereToFind}
          </p>

          <div className="space-y-2 text-sm">
            <div>
              <strong className="text-gray-900 dark:text-gray-100">💡 Dicas:</strong>
              <ul className="list-disc list-inside ml-2 mt-1 text-gray-700 dark:text-gray-300 space-y-1">
                {investmentType.indexador === 'CDI' && (
                  <>
                    <li>Procure por &quot;% do CDI&quot; (ex: &quot;100% do CDI&quot;, &quot;110% do CDI&quot;)</li>
                    <li>O CDI atual está mostrado no topo da página</li>
                    <li>LCI/LCA geralmente rendem 85-95% do CDI</li>
                    <li>CDB geralmente rende 100-110% do CDI</li>
                  </>
                )}
                {investmentType.indexador === 'IPCA + X%' && (
                  <>
                    <li>Procure por &quot;IPCA + X%&quot; (ex: &quot;IPCA + 5,5%&quot;)</li>
                    <li>O IPCA atual está mostrado no topo da página</li>
                    <li>Taxa real geralmente varia entre IPCA + 4% a IPCA + 6%</li>
                  </>
                )}
                {investmentType.indexador === 'DividendYield' && (
                  <>
                    <li>Procure pelo &quot;Dividend Yield&quot; ou &quot;DY&quot; do FII</li>
                    <li>Sites como StatusInvest mostram o DY médio</li>
                    <li>FIIs geralmente distribuem 0,8% a 1,2% ao mês</li>
                  </>
                )}
                {investmentType.indexador === 'taxa fixa mensal' && (
                  <>
                    <li>Poupança sempre rende 0,5% ao mês + TR</li>
                    <li>Não precisa procurar, é uma taxa fixa</li>
                  </>
                )}
              </ul>
            </div>

            {investmentType.liquidityMonthsMin > 0 && (
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  ⚠️ <strong>Atenção:</strong> Este investimento tem carência mínima de{' '}
                  {investmentType.liquidityMonthsMin} meses. Você só poderá resgatar após esse período.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

