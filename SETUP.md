# 🚀 Guia de Configuração - RendaFácil

## ✅ O que foi implementado

### Estrutura Completa
- ✅ Next.js 15 com TypeScript
- ✅ TailwindCSS configurado
- ✅ Todas as páginas principais
- ✅ Componentes reutilizáveis
- ✅ Sistema de cálculos de juros compostos
- ✅ Persistência com localStorage
- ✅ SEO configurado (next-seo)
- ✅ Modo escuro/claro
- ✅ Responsividade mobile-first

### Páginas Implementadas
- ✅ `/` - Página inicial com cards de investimentos
- ✅ `/simulador` - Simulador principal com formulário e gráficos
- ✅ `/comparativo` - Comparação de simulações salvas
- ✅ `/glossary` - Glossário de termos financeiros
- ✅ `/posts/[slug]` - Sistema de blog com artigos
- ✅ `/privacy` - Política de privacidade
- ✅ `/terms` - Termos de uso

### Componentes
- ✅ Header com navegação e toggle de tema
- ✅ Footer com links
- ✅ SimulationForm - Formulário de simulação
- ✅ SimulationSummary - Resumo dos resultados
- ✅ ChartComponent - Gráficos interativos (ApexCharts)
- ✅ SavedSimulations - Lista de simulações salvas
- ✅ ComparisonTable - Tabela comparativa
- ✅ InvestmentCard - Cards de tipos de investimento
- ✅ GlossaryTooltip - Tooltips com definições
- ✅ AdSlot - Componente para AdSense

### Funcionalidades
- ✅ Cálculo de juros compostos
- ✅ Suporte a 6 tipos de investimento (FII, LCI, LCA, CDB, Tesouro IPCA+, Poupança)
- ✅ Cálculo automático de IR regressivo
- ✅ Conversão de taxas (anual ↔ mensal)
- ✅ Gráficos de evolução temporal
- ✅ Salvar e carregar simulações
- ✅ Comparação lado a lado
- ✅ Dica de tempo de duplicação do investimento

## 📋 Próximos Passos

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar AdSense
Edite `src/components/AdSlot.tsx` e substitua `ca-pub-XXXXXXXXXX` pelo seu ID do AdSense.

### 3. Configurar Analytics (Opcional)
Adicione o Google Analytics no `_app.tsx` ou crie um componente dedicado.

### 4. Personalizar Conteúdo
- Adicione mais artigos em `src/pages/posts/[slug].tsx`
- Ajuste as taxas padrão em `src/data/investmentTypes.json`
- Personalize cores no `tailwind.config.js`

### 5. Build e Deploy
```bash
npm run build
npm start
```

O sitemap será gerado automaticamente após o build.

## 🔧 Configurações Importantes

### Variáveis de Ambiente
Crie um arquivo `.env.local`:
```
SITE_URL=https://rendafacil.br
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-SEU-ID
NEXT_PUBLIC_GA_ID=G-SEU-ID
```

### Sitemap
O sitemap é gerado automaticamente via `next-sitemap` após o build. Configure a URL do site no `next-sitemap.config.js`.

## 📝 Notas

- Todos os dados são armazenados localmente (localStorage)
- Não há backend necessário
- O projeto está pronto para deploy em Vercel, Netlify ou qualquer plataforma que suporte Next.js
- Os artigos do blog são estáticos e podem ser expandidos facilmente

## 🎨 Personalização

### Cores
Edite `tailwind.config.js` para alterar a paleta de cores.

### Tipos de Investimento
Adicione novos tipos em `src/data/investmentTypes.json`.

### Estilos
Modifique `src/styles/globals.css` e `src/styles/theme.css` para ajustar o visual.

## ⚠️ Avisos

- Lembre-se de atualizar os termos de uso e política de privacidade conforme necessário
- Configure corretamente o AdSense antes de publicar
- Teste todas as funcionalidades antes do deploy
- Os cálculos são estimativas e não garantem rentabilidade futura

