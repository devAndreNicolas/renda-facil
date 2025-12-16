import { NextSeo } from 'next-seo';

export default function Terms() {
  return (
    <>
      <NextSeo
        title="Termos de Uso - RendeCerto"
        description="Termos de uso do RendeCerto. Leia antes de usar nosso simulador."
        canonical="https://rendecerto.com.br/terms"
        noindex
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Termos de Uso
        </h1>

        <div className="card space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e usar o RendeCerto, você concorda em cumprir e estar vinculado a estes Termos
              de Uso. Se você não concordar com alguma parte destes termos, não deve usar nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              2. Natureza do Serviço
            </h2>
            <p>
              O RendeCerto é uma ferramenta educacional de simulação de rendimentos de investimentos. Os
              resultados apresentados são <strong>estimativas</strong> baseadas em fórmulas matemáticas e
              não constituem garantia de rentabilidade futura.
            </p>
            <p className="mt-4">
              <strong>IMPORTANTE:</strong> Este simulador não oferece aconselhamento financeiro. Sempre
              consulte um profissional qualificado antes de tomar decisões de investimento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              3. Limitações de Responsabilidade
            </h2>
            <p>
              O RendeCerto não se responsabiliza por:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Perdas financeiras decorrentes de decisões baseadas nas simulações</li>
              <li>Imprecisões nos cálculos devido a mudanças nas taxas de juros ou condições de mercado</li>
              <li>Dados incorretos fornecidos pelo usuário</li>
              <li>Alterações nas regras fiscais ou tributárias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              4. Uso Adequado
            </h2>
            <p>Você concorda em usar o RendeCerto apenas para fins legais e de forma que não:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Viole qualquer lei ou regulamento</li>
              <li>Infrinja direitos de propriedade intelectual</li>
              <li>Interfira no funcionamento do site</li>
              <li>Tente acessar áreas restritas do sistema</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              5. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo do RendeCerto, incluindo textos, gráficos, logos e código, é de propriedade
              do RendeCerto ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              6. Modificações do Serviço
            </h2>
            <p>
              Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto do
              RendeCerto a qualquer momento, com ou sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              7. Isenção de Garantias
            </h2>
            <p>
              O RendeCerto é fornecido &quot;como está&quot;, sem garantias de qualquer tipo, expressas ou
              implícitas. Não garantimos que o serviço será ininterrupto, seguro ou livre de erros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              8. Alterações nos Termos
            </h2>
            <p>
              Podemos revisar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor
              imediatamente após a publicação. O uso continuado do serviço após as alterações constitui
              aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              9. Lei Aplicável
            </h2>
            <p>
              Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa será resolvida nos
              tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              10. Contato
            </h2>
            <p>
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do nosso
              site.
            </p>
          </section>

          <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </>
  );
}

