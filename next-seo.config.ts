import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'RendeCerto - Simulador de Rendimentos de Investimentos',
  titleTemplate: '%s | RendeCerto',
  description:
    'Simule rendimentos de FII, LCI, LCA, Tesouro IPCA+, CDB e mais. Calcule quanto seu dinheiro pode render com juros compostos.',
  canonical: 'https://rendecerto.com.br',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rendecerto.com.br',
    siteName: 'RendeCerto',
    title: 'RendeCerto - Simulador de Rendimentos de Investimentos',
    description:
      'Simule rendimentos de investimentos de forma simples e clara. Calcule FII, LCI, LCA, CDB e mais.',
    images: [
      {
        url: 'https://rendecerto.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RendeCerto - Simulador de Rendimentos',
      },
    ],
  },
  twitter: {
    handle: '@rendecerto',
    site: '@rendecerto',
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
      content: 'RendeCerto',
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

