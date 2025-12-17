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
  slots: {
    banner: string;
    sidebar: string;
    inArticle: string;
    afterResults: string;
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
  {
    id: 'livro-pai-rico',
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert Kiyosaki',
    description: 'Um dos livros mais famosos sobre educação financeira, que ensina a importância de investir e entender como o dinheiro funciona.',
    url: 'https://amzn.to/4oZ7Et0', 
    imageUrl: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg', // capa do livro
  },
  {
    id: 'livro-investidor-inteligente',
    title: 'O Investidor Inteligente',
    author: 'Benjamin Graham',
    description: 'Considerado a bíblia do investimento em valor, este livro é uma leitura obrigatória para investidores a longo prazo.',
    url: 'https://amzn.to/48HRHCH', 
    imageUrl: 'https://m.media-amazon.com/images/I/61Q2pK79yWL._SY466_.jpg',
  },
  {
    id: 'livro-educacao-financeira',
    title: 'O homem mais rico da Babilônia: com prefácio de Thiago Nigro',
    author: 'Luiz Cavalcanti de M. Guerra (Tradutor), George S. Clason (Autor), Thiago Nigro (Autor, Prefácio)',
    description: 'Um clássico sobre finanças pessoais que traz lições sobre riqueza e como gerenciar o dinheiro de maneira eficaz.',
    url: 'https://amzn.to/3MKDjkn', 
    imageUrl: 'https://m.media-amazon.com/images/I/81V+m3wB2ZL._SY466_.jpg'
  },
  {
    id: 'livro-os-segredos-da-mente-milionaria',
    title: 'Os Segredos da Mente Milionária',
    author: 'T. Harv Eker',
    description: 'Este livro explora como a mentalidade de um milionário pode ser criada e como isso afeta a sua vida financeira.',
    url: 'https://amzn.to/4alPfTx', 
    imageUrl: 'https://m.media-amazon.com/images/I/41hqi4rWufL._SY445_SX342_ControlCacheEqualizer_.jpg'
  },
  {
    id: 'livro-investindo-em-acoes-para-leigos',
    title: 'Investindo em Ações para Leigos',
    author: 'Paul Mladjenovic',
    description: 'Este livro oferece um guia prático sobre o mercado de ações, perfeito para iniciantes que querem entender como investir no mercado de ações.',
    url: 'https://amzn.to/4s61Occ',
    imageUrl: 'https://m.media-amazon.com/images/I/71NTtyEmI0L._SY425_.jpg',
  },
  {
    id: 'barefoot-investor',
    title: 'The Barefoot Investor: The Only Money Guide You\'ll Ever Need',
    author: 'Scott Pape',
    description: 'Guia completo de finanças pessoais que prepara o leitor para investir com confiança.',
    url: 'https://amzn.to/3XVJgxp',
    imageUrl: 'https://m.media-amazon.com/images/I/81MNNaYbJML._SY425_.jpg',

  },
];

// Livro em destaque (aparece estrategicamente)
export const featuredBook: BookLink | null = {
  id: 'livro-destaque',
  title: 'Pai Rico, Pai Pobre',
  author: 'Robert Kiyosaki',
  description: 'Este é um dos livros mais recomendados para quem está começando a investir. Uma leitura essencial para quem quer mudar sua mentalidade sobre finanças.',
  url: 'https://amzn.to/4pRtG23', 
  imageUrl: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
};


// ============================================
// CONFIGURAÇÃO DO GOOGLE ADSENSE
// ============================================

export const adSenseConfig: AdSenseConfig = {
  clientId: 'ca-pub-7500876609185925',
  enabled: true,
  slots: {
    banner: '7255915663',
    sidebar: '8707957503',
    inArticle: '7239797316',
    afterResults: '2434193199',
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

