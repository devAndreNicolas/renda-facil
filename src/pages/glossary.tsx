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
];

export default function Glossary() {
  return (
    <>
      <NextSeo
        title="Glossário de Investimentos - RendaFácil"
        description="Glossário completo com termos financeiros e de investimentos. Aprenda sobre FII, LCI, LCA, CDB, juros compostos e mais."
        canonical="https://rendafacil.br/glossary"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
          Glossário de Investimentos
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
          Entenda os principais termos do mundo dos investimentos
        </p>

        <dl className="space-y-6">
          {glossaryTerms.map((item, index) => (
            <div key={index} className="card">
              <dt className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {item.term}
              </dt>
              <dd className="text-gray-700 dark:text-gray-300">{item.definition}</dd>
            </div>
          ))}
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

