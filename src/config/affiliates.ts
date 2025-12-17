/**
 * Configuração Centralizada de Afiliados e Banners
 * 
 * Este arquivo centraliza todos os links de afiliados, banners e configurações de AdSense.
 * Atualize aqui para gerenciar todos os links de forma centralizada.
 */

export interface AffiliateLink {
  id: string;
  type: 'course' | 'broker' | 'product' | 'book' | 'book-featured';
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  buttonText?: string;
  // Posições onde o banner pode aparecer
  positions: ('header' | 'sidebar' | 'after-form' | 'after-results' | 'footer' | 'in-content' | 'books-section' | 'featured-book')[];
  // Páginas onde deve aparecer (vazio = todas)
  pages?: string[];
  // Tipos de investimento relacionados (vazio = todos)
  investmentTypes?: string[];
  // Ordem de prioridade (menor número = maior prioridade)
  priority?: number;
  // Se deve abrir em nova aba
  openInNewTab?: boolean;
}

export interface BookLink {
  id: string;
  title: string;
  author: string;
  description: string;
  url: string; // Link de afiliado da Amazon
  imageUrl?: string;
}

export interface AdSenseConfig {
  clientId: string;
  enabled: boolean;
  positions: {
    banner: boolean;
    sidebar: boolean;
    inArticle: boolean;
    afterResults: boolean;
  };
}

// ============================================
// CONFIGURAÇÃO DE LINKS DE AFILIADOS
// ============================================

export const affiliateLinks: AffiliateLink[] = [
  // Curso de Investimentos - Hotmart
  {
    id: 'curso-investimentos',
    type: 'course',
    title: '📚 Curso recomendado para quem quer aprender a investir com segurança',
    description: 'Se você está começando a investir e quer entender como fazer o dinheiro render de forma consciente e sem apostas arriscadas, este curso é um bom ponto de partida. Ele explica conceitos essenciais de renda fixa, renda variável e organização financeira, de forma simples e acessível para iniciantes.',
    url: 'https://go.hotmart.com/M103437125P',
    buttonText: 'Conhecer o curso recomendado',
    positions: ['after-form', 'after-results'],
    priority: 1,
    openInNewTab: true,
  },
  // Banco Inter - SuperLoop
  {
    id: 'banco-inter',
    type: 'broker',
    title: '🏦 Onde aplicar seu dinheiro depois da simulação',
    description: 'Depois de simular seus rendimentos, o próximo passo é escolher uma instituição segura para aplicar o dinheiro. Bancos confiáveis ajudam a investir com mais tranquilidade e acesso a produtos regulados no Brasil.',
    url: 'https://inter-co.onelink.me/Qyu7/e6tl331z',
    buttonText: 'Conhecer o Banco Inter',
    positions: ['after-results'],
    priority: 2,
    openInNewTab: true,
  },
];

// ============================================
// CONFIGURAÇÃO DE LIVROS (AMAZON)
// ============================================

export const bookLinks: BookLink[] = [
  // Adicione seus livros aqui quando tiver os links
  // Exemplo:
  // {
  //   id: 'livro-exemplo',
  //   title: 'Título do Livro',
  //   author: 'Nome do Autor',
  //   description: 'Descrição do livro sobre investimentos',
  //   url: 'https://amazon.com.br/dp/...?tag=seu-tag',
  // },
];

// Livro em destaque (aparece estrategicamente)
export const featuredBook: BookLink | null = null;
// Exemplo quando tiver:
// {
//   id: 'livro-destaque',
//   title: 'Livro em Destaque',
//   author: 'Autor',
//   description: 'Este é um dos livros mais recomendados para quem está começando a investir',
//   url: 'https://amazon.com.br/dp/...?tag=seu-tag',
// };

// ============================================
// CONFIGURAÇÃO DO GOOGLE ADSENSE
// ============================================

export const adSenseConfig: AdSenseConfig = {
  clientId: 'ca-pub-7500876609185925', // Substitua pelo seu ID do AdSense
  enabled: true,
  positions: {
    banner: true,
    sidebar: true,
    inArticle: true,
    afterResults: true,
  },
};

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Retorna os links de afiliados para uma posição específica
 */
export function getAffiliateLinksForPosition(
  position: AffiliateLink['positions'][number],
  currentPage?: string,
  investmentType?: string
): AffiliateLink[] {
  return affiliateLinks
    .filter((link) => {
      // Verifica se a posição está nas posições permitidas
      if (!link.positions.includes(position)) return false;

      // Verifica se deve aparecer na página atual
      if (link.pages && link.pages.length > 0 && currentPage) {
        if (!link.pages.includes(currentPage)) return false;
      }

      // Verifica se deve aparecer para o tipo de investimento atual
      if (link.investmentTypes && link.investmentTypes.length > 0 && investmentType) {
        if (!link.investmentTypes.includes(investmentType)) return false;
      }

      return true;
    })
    .sort((a, b) => (a.priority || 999) - (b.priority || 999));
}

/**
 * Retorna um link de afiliado específico por ID
 */
export function getAffiliateLinkById(id: string): AffiliateLink | undefined {
  return affiliateLinks.find((link) => link.id === id);
}

