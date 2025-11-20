import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'RendaFácil - Simulador de Rendimentos de Investimentos',
  titleTemplate: '%s | RendaFácil',
  description:
    'Simule rendimentos de FII, LCI, LCA, Tesouro IPCA+, CDB e mais. Calcule quanto seu dinheiro pode render com juros compostos.',
  canonical: 'https://rendafacil.br',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rendafacil.br',
    siteName: 'RendaFácil',
    title: 'RendaFácil - Simulador de Rendimentos de Investimentos',
    description:
      'Simule rendimentos de investimentos de forma simples e clara. Calcule FII, LCI, LCA, CDB e mais.',
    images: [
      {
        url: 'https://rendafacil.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RendaFácil - Simulador de Rendimentos',
      },
    ],
  },
  twitter: {
    handle: '@rendafacil',
    site: '@rendafacil',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'simulador de investimentos, calculadora de juros compostos, FII, LCI, LCA, CDB, Tesouro IPCA+, rendimento de investimentos',
    },
    {
      name: 'author',
      content: 'RendaFácil',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};

export default config;

