'use client';

import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function Sobre() {
  return (
    <>
      <NextSeo
        title="Sobre Nós - RendeCerto"
        description="Conheça o RendeCerto, plataforma educacional dedicada a democratizar o conhecimento sobre investimentos no Brasil."
        canonical="https://rendecerto.com.br/sobre"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Sobre o RendeCerto
        </h1>

        <div className="card mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🎯 Nossa Missão
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Somos uma plataforma educacional dedicada a democratizar o conhecimento sobre
              investimentos no Brasil. Acreditamos que todos merecem ter acesso a ferramentas
              simples e claras para entender como seu dinheiro pode crescer ao longo do tempo.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              💡 Por Que Criamos o RendeCerto?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Muitos brasileiros têm dificuldade em entender investimentos devido à linguagem
              técnica e à falta de ferramentas acessíveis. Criamos o RendeCerto para:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
              <li>Simplificar cálculos complexos de juros compostos</li>
              <li>Comparar diferentes tipos de investimentos de forma clara</li>
              <li>Educar sobre conceitos financeiros importantes</li>
              <li>Ajudar você a tomar decisões mais informadas</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🔍 Transparência
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Importante:</strong> O RendeCerto é uma ferramenta educacional e não
                oferece consultoria de investimentos.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Não somos uma instituição financeira</li>
                <li>Não vendemos produtos de investimento</li>
                <li>Não garantimos rentabilidades</li>
                <li>Todas as simulações são estimativas baseadas em cálculos matemáticos</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🛠️ O Que Oferecemos
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-primary-700 dark:text-primary-300 mb-2">
                  📊 Simuladores
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Calcule rendimentos de FII, LCI, LCA, CDB, Tesouro IPCA+ e Poupança
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">
                  📈 Comparativos
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Compare diferentes investimentos lado a lado
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                  📚 Glossário
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Aprenda termos financeiros de forma simples
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                  💾 Salvar Simulações
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Guarde e compare suas simulações
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ⚖️ Responsabilidade
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nossos cálculos são baseados em fórmulas matemáticas precisas e nas regras
              tributárias vigentes no Brasil. No entanto:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
              <li>Rentabilidades passadas não garantem resultados futuros</li>
              <li>Taxas e condições de mercado podem variar</li>
              <li>Impostos e taxas adicionais podem se aplicar</li>
              <li>Recomendamos consultar um profissional antes de investir</li>
            </ul>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Tem dúvidas ou sugestões? Entre em contato conosco!
              </p>
              <Link
                href="/contato"
                className="btn-primary inline-block"
              >
                📧 Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
