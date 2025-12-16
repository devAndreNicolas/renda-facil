'use client';

import { useState } from 'react';
import { NextSeo } from 'next-seo';
import GlossaryTooltip from '@/components/GlossaryTooltip';

const glossaryTerms = [
  {
    term: 'Juros Compostos',
    definition:
      'Juros calculados sobre o valor inicial mais os juros acumulados. É o "juros sobre juros", que faz o dinheiro crescer exponencialmente ao longo do tempo.',
  },
  {
    term: 'FII (Fundos Imobiliários)',
    definition:
      'Fundos que investem em imóveis e distribuem rendimentos mensais aos cotistas. São isentos de Imposto de Renda sobre os rendimentos.',
  },
  {
    term: 'LCI (Letra de Crédito Imobiliário)',
    definition:
      'Título de crédito lastreado em créditos imobiliários, emitido por bancos. É isento de Imposto de Renda para pessoa física.',
  },
  {
    term: 'LCA (Letra de Crédito do Agronegócio)',
    definition:
      'Título de crédito lastreado em créditos do agronegócio, emitido por bancos. É isento de Imposto de Renda para pessoa física.',
  },
  {
    term: 'CDB (Certificado de Depósito Bancário)',
    definition:
      'Título de dívida emitido por bancos. Possui Imposto de Renda regressivo (22,5% até 6 meses, reduzindo até 15% após 24 meses).',
  },
  {
    term: 'Tesouro IPCA+',
    definition:
      'Título público do Tesouro Direto indexado à inflação (IPCA) mais uma taxa de juros. Possui Imposto de Renda regressivo.',
  },
  {
    term: 'IR Regressivo',
    definition:
      'Sistema de Imposto de Renda que diminui conforme o tempo de investimento: 22,5% até 6 meses, 20% até 12 meses, 17,5% até 24 meses e 15% após 24 meses.',
  },
  {
    term: 'Aporte Mensal',
    definition:
      'Valor que você investe mensalmente além do valor inicial. Aportes regulares aumentam significativamente o rendimento devido aos juros compostos.',
  },
  {
    term: 'Rentabilidade',
    definition:
      'Percentual de ganho sobre o valor investido. Calculado como (Lucro / Total Investido) × 100.',
  },
  {
    term: 'Líquido vs Bruto',
    definition:
      'Valor bruto é o rendimento antes dos impostos. Valor líquido é o que você recebe após descontar o Imposto de Renda, quando aplicável.',
  },
  {
    term: 'CDI (Certificado de Depósito Interbancário)',
    definition:
      'Taxa de juros usada em empréstimos entre bancos. É muito próxima da taxa Selic e serve como referência para muitos investimentos de renda fixa.',
  },
  {
    term: 'Selic',
    definition:
      'Taxa básica de juros da economia brasileira, definida pelo Banco Central. É a principal ferramenta de política monetária e influencia todos os investimentos.',
  },
  {
    term: 'IPCA (Índice Nacional de Preços ao Consumidor Amplo)',
    definition:
      'Índice oficial de inflação no Brasil. Investimentos indexados ao IPCA protegem o poder de compra do dinheiro ao longo do tempo.',
  },
  {
    term: 'FGC (Fundo Garantidor de Créditos)',
    definition:
      'Fundo que garante investimentos de até R$ 250 mil por CPF e por instituição financeira. Protege CDB, LCI, LCA e outros investimentos de renda fixa.',
  },
  {
    term: 'Liquidez',
    definition:
      'Facilidade de converter um investimento em dinheiro sem perder valor. Investimentos com alta liquidez podem ser resgatados rapidamente.',
  },
  {
    term: 'Rentabilidade',
    definition:
      'Percentual de ganho sobre o valor investido ao longo de um período. Pode ser expressa em termos mensais ou anuais.',
  },
  {
    term: 'Diversificação',
    definition:
      'Estratégia de distribuir investimentos em diferentes tipos de ativos para reduzir riscos. "Não coloque todos os ovos na mesma cesta".',
  },
  {
    term: 'Renda Fixa',
    definition:
      'Investimentos com rentabilidade conhecida ou previsível, como CDB, LCI, LCA e Tesouro Direto. Geralmente têm menor risco que renda variável.',
  },
  {
    term: 'Renda Variável',
    definition:
      'Investimentos cuja rentabilidade não é garantida e varia conforme o mercado, como ações e fundos imobiliários. Maior risco, maior potencial de retorno.',
  },
  {
    term: 'Tesouro Direto',
    definition:
      'Programa do governo federal para venda de títulos públicos a pessoas físicas. Considerado um dos investimentos mais seguros do Brasil.',
  },
  {
    term: 'Ações',
    definition:
      'Pequenas partes de uma empresa negociadas na bolsa de valores. Ao comprar ações, você se torna sócio da empresa e pode receber dividendos.',
  },
  {
    term: 'Dividendos',
    definition:
      'Parte do lucro de uma empresa distribuída aos acionistas. Em FIIs, são chamados de proventos e geralmente pagos mensalmente.',
  },
  {
    term: 'ETF (Exchange Traded Fund)',
    definition:
      'Fundo de índice negociado na bolsa como uma ação. Permite investir em uma carteira diversificada com baixo custo.',
  },
  {
    term: 'Home Broker',
    definition:
      'Plataforma online oferecida por corretoras para comprar e vender investimentos. Interface para operar na bolsa de valores.',
  },
  {
    term: 'CVM (Comissão de Valores Mobiliários)',
    definition:
      'Órgão regulador do mercado de capitais no Brasil. Fiscaliza e regula investimentos, corretoras e empresas de capital aberto.',
  },
  {
    term: 'Carência',
    definition:
      'Período mínimo que o dinheiro deve permanecer investido antes de poder ser resgatado. Investimentos com carência geralmente oferecem melhores taxas.',
  },
  {
    term: 'Taxa de Administração',
    definition:
      'Taxa cobrada por fundos de investimento para gerenciar o dinheiro. É descontada do rendimento e geralmente expressa em % ao ano.',
  },
  {
    term: 'Marking to Market',
    definition:
      'Ajuste diário do valor de um investimento conforme as condições de mercado. Aplica-se principalmente a títulos de longo prazo como Tesouro IPCA+.',
  },
  {
    term: 'Reserva de Emergência',
    definition:
      'Valor guardado para situações imprevistas, como desemprego ou despesas médicas. Recomenda-se 6 meses de gastos em investimentos de alta liquidez.',
  },
  {
    term: 'Independência Financeira',
    definition:
      'Situação em que os rendimentos dos investimentos cobrem todas as despesas, permitindo viver sem depender de trabalho ativo.',
  },
  {
    term: 'Juros Simples',
    definition:
      'Juros calculados apenas sobre o valor inicial investido. Diferente dos juros compostos, não há "juros sobre juros".',
  },
  {
    term: 'Inflação',
    definition:
      'Aumento geral dos preços ao longo do tempo, reduzindo o poder de compra do dinheiro. Investimentos devem render acima da inflação.',
  },
  {
    term: 'Corretora',
    definition:
      'Instituição autorizada pela CVM para intermediar investimentos. Necessária para investir em ações, FIIs e alguns títulos públicos.',
  },
  {
    term: 'Custódia',
    definition:
      'Serviço de guarda e administração de investimentos. Algumas corretoras cobram taxa de custódia, outras oferecem gratuitamente.',
  },
  {
    term: 'Debêntures',
    definition:
      'Títulos de dívida emitidos por empresas (não bancos). Podem ser isentos de IR e geralmente têm rentabilidade maior que CDBs.',
  },
  {
    term: 'Previdência Privada',
    definition:
      'Plano de aposentadoria complementar oferecido por seguradoras e bancos. Pode ter benefícios fiscais, mas geralmente tem taxas mais altas.',
  },
  {
    term: 'COE (Certificado de Operações Estruturadas)',
    definition:
      'Investimento que combina renda fixa com renda variável. Tem proteção parcial do capital, mas rentabilidade atrelada a índices ou ações.',
  },
  {
    term: 'Criptomoedas',
    definition:
      'Moedas digitais descentralizadas, como Bitcoin e Ethereum. Alto risco e volatilidade, não reguladas no Brasil.',
  },
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NextSeo
        title="Glossário de Investimentos - RendeCerto"
        description="Glossário completo com termos financeiros e de investimentos. Aprenda sobre FII, LCI, LCA, CDB, juros compostos e mais."
        canonical="https://rendecerto.com.br/glossary"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
          Glossário de Investimentos
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
          Entenda os principais termos do mundo dos investimentos
        </p>

        {/* Barra de Busca */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar termos no glossário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {filteredTerms.length} {filteredTerms.length === 1 ? 'termo encontrado' : 'termos encontrados'}
            </p>
          )}
        </div>

        <dl className="space-y-6">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, index) => (
              <div key={index} className="card">
                <dt className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {item.term}
                </dt>
                <dd className="text-gray-700 dark:text-gray-300">{item.definition}</dd>
              </div>
            ))
          ) : (
            <div className="card text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum termo encontrado para "{searchTerm}". Tente outra busca.
              </p>
            </div>
          )}
        </dl>

        <div className="mt-12 card bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Como usar este glossário
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Em todo o site, você encontrará termos destacados com{' '}
            <GlossaryTooltip term="Exemplo" definition="Esta é uma definição de exemplo">
              sublinhado pontilhado
            </GlossaryTooltip>
            . Passe o mouse sobre eles para ver uma explicação rápida.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Este glossário foi criado para ajudar investidores iniciantes e intermediários a entenderem
            melhor os conceitos financeiros.
          </p>
        </div>
      </div>
    </>
  );
}

