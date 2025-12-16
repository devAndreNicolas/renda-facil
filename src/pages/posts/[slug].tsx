import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  keywords: string[];
}

const posts: Post[] = [
  {
    slug: 'quanto-rende-1000-reais-em-fii',
    title: 'Quanto Rende 1000 Reais em FII? Simulação Completa',
    description:
      'Descubra quanto 1000 reais podem render em Fundos Imobiliários (FII) com diferentes taxas e períodos. Simulação detalhada com juros compostos.',
    content: `
      <p>Os Fundos Imobiliários (FII) são uma das modalidades de investimento mais populares no Brasil, especialmente por serem isentos de Imposto de Renda sobre os rendimentos distribuídos.</p>
      
      <p>Neste artigo, vamos simular quanto R$ 1.000 podem render em FII considerando diferentes cenários de taxa de rendimento e períodos de investimento.</p>
      
      <h2>Como Funcionam os FIIs</h2>
      <p>Os Fundos Imobiliários investem em imóveis comerciais, como shoppings, escritórios e galpões logísticos. Os rendimentos são distribuídos mensalmente aos cotistas na forma de dividendos.</p>
      
      <h2>Simulação: R$ 1.000 em FII</h2>
      <p>Vamos considerar uma taxa média de 0,9% ao mês, que é uma expectativa realista para FIIs bem geridos.</p>
      
      <h3>Cenário 1: Investimento Único de R$ 1.000</h3>
      <ul>
        <li><strong>1 ano:</strong> Aproximadamente R$ 1.113 (lucro de R$ 113)</li>
        <li><strong>2 anos:</strong> Aproximadamente R$ 1.238 (lucro de R$ 238)</li>
        <li><strong>5 anos:</strong> Aproximadamente R$ 1.700 (lucro de R$ 700)</li>
      </ul>
      
      <h3>Cenário 2: R$ 1.000 Inicial + Aportes Mensais</h3>
      <p>Se você investir R$ 1.000 inicialmente e continuar aportando R$ 500 por mês:</p>
      <ul>
        <li><strong>1 ano:</strong> Total investido: R$ 7.000 | Valor final: aproximadamente R$ 7.700</li>
        <li><strong>2 anos:</strong> Total investido: R$ 13.000 | Valor final: aproximadamente R$ 15.200</li>
      </ul>
      
      <h2>Vantagens dos FIIs</h2>
      <ul>
        <li>Isenção de IR sobre dividendos</li>
        <li>Rendimentos mensais previsíveis</li>
        <li>Diversificação do portfólio</li>
        <li>Liquidez (negociação na bolsa)</li>
      </ul>
      
      <h2>Conclusão</h2>
      <p>Investir em FII pode ser uma excelente forma de gerar renda passiva. Use nosso <Link href="/simulador">simulador</Link> para calcular cenários personalizados com seus valores e prazos.</p>
    `,
    publishedAt: '2025-01-10',
    keywords: ['FII', 'Fundos Imobiliários', 'rendimento', 'investimento', 'simulador'],
  },
  {
    slug: 'simulador-lci-lca',
    title: 'Simulador de LCI e LCA: Guia Completo',
    description:
      'Aprenda a usar nosso simulador para calcular rendimentos de LCI e LCA. Entenda as diferenças e vantagens de cada modalidade.',
    content: `
      <p>LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são investimentos de renda fixa muito populares no Brasil, principalmente por serem isentos de Imposto de Renda para pessoa física.</p>
      
      <h2>Diferenças entre LCI e LCA</h2>
      <p><strong>LCI:</strong> Lastreada em créditos imobiliários. Os recursos são usados para financiar a compra de imóveis.</p>
      <p><strong>LCA:</strong> Lastreada em créditos do agronegócio. Os recursos financiam atividades agrícolas e pecuárias.</p>
      
      <h2>Vantagens Comuns</h2>
      <ul>
        <li>Isenção de Imposto de Renda</li>
        <li>Rentabilidade pré-fixada ou pós-fixada</li>
        <li>Segurança (garantia do FGC até R$ 250 mil)</li>
        <li>Liquidez variável (depende do prazo escolhido)</li>
      </ul>
      
      <h2>Como Usar o Simulador</h2>
      <p>Nosso simulador permite calcular quanto seu investimento em LCI ou LCA pode render considerando:</p>
      <ul>
        <li>Valor inicial investido</li>
        <li>Aportes mensais</li>
        <li>Taxa de juros (geralmente entre 0,6% e 1,2% ao mês)</li>
        <li>Período de investimento</li>
      </ul>
      
      <p>Como são isentos de IR, o valor líquido é igual ao valor bruto, o que aumenta a rentabilidade real comparado a investimentos tributados.</p>
      
      <h2>Exemplo Prático</h2>
      <p>Investindo R$ 10.000 em uma LCI com taxa de 0,85% ao mês por 2 anos:</p>
      <ul>
        <li>Valor final: aproximadamente R$ 12.250</li>
        <li>Lucro: R$ 2.250 (100% líquido, sem desconto de IR)</li>
      </ul>
      
      <p>Use nosso <Link href="/simulador">simulador</Link> para testar diferentes cenários!</p>
    `,
    publishedAt: '2025-01-11',
    keywords: ['LCI', 'LCA', 'simulador', 'investimento', 'renda fixa'],
  },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = posts.find((p) => p.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default function PostPage({ post }: { post: Post }) {
  return (
    <>
      <NextSeo
        title={`${post.title} - RendeCerto`}
        description={post.description}
        canonical={`https://rendecerto.com.br/posts/${post.slug}`}
        openGraph={{
          title: post.title,
          description: post.description,
          url: `https://rendecerto.com.br/posts/${post.slug}`,
        }}
      />

      <article className="max-w-4xl mx-auto">
        <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline mb-4 inline-block">
          ← Voltar para a página inicial
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">{post.description}</p>
          <time className="text-sm text-gray-500 dark:text-gray-500">
            Publicado em: {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
          </time>
        </header>

        <div
          className="card prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 card bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Quer simular seus próprios valores?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Use nosso simulador gratuito para calcular rendimentos com seus valores e prazos personalizados.
          </p>
          <Link href="/simulador" className="btn-primary inline-block">
            Acessar Simulador
          </Link>
        </div>
      </article>
    </>
  );
}

