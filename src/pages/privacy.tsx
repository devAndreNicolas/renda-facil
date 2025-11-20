import { NextSeo } from 'next-seo';

export default function Privacy() {
  return (
    <>
      <NextSeo
        title="Política de Privacidade - RendaFácil"
        description="Política de privacidade do RendaFácil. Saiba como protegemos seus dados."
        canonical="https://rendafacil.br/privacy"
        noindex
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Política de Privacidade
        </h1>

        <div className="card space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              1. Informações Coletadas
            </h2>
            <p>
              O RendaFácil coleta apenas informações armazenadas localmente no seu navegador através do
              localStorage. Não coletamos dados pessoais identificáveis, como nome, e-mail ou informações
              de pagamento.
            </p>
            <p className="mt-4">
              As simulações salvas são armazenadas exclusivamente no seu dispositivo e não são enviadas
              para nossos servidores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              2. Uso de Cookies e Tecnologias Similares
            </h2>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego
              do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas
              configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              3. Google AdSense
            </h2>
            <p>
              Nosso site utiliza o Google AdSense para exibir anúncios. O Google pode usar cookies para
              personalizar anúncios com base em suas visitas anteriores a este e outros sites. Você pode
              optar por não receber anúncios personalizados visitando as{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Configurações de anúncios do Google
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              4. Google Analytics
            </h2>
            <p>
              Utilizamos o Google Analytics para entender como os visitantes interagem com nosso site. Isso
              nos ajuda a melhorar a experiência do usuário. O Google Analytics pode coletar informações
              como endereço IP, tipo de navegador e páginas visitadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              5. Compartilhamento de Dados
            </h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto
              conforme necessário para operar o site (por exemplo, Google AdSense e Google Analytics) ou
              quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              6. Segurança
            </h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações. No entanto, nenhum método
              de transmissão pela internet é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              7. Alterações nesta Política
            </h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise
              esta página regularmente para estar ciente de quaisquer alterações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              8. Contato
            </h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através
              do nosso site.
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

