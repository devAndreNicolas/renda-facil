# 💰 RendaFácil

Simulador de rendimentos de investimentos com foco em clareza, experiência do usuário e SEO.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com SSR/SSG
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização utilitária
- **ApexCharts** - Gráficos interativos
- **Framer Motion** - Animações suaves
- **react-hook-form** - Gerenciamento de formulários
- **next-seo** - Otimização SEO

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🏗️ Estrutura do Projeto

```
/src
  /components       # Componentes React reutilizáveis
  /lib             # Utilitários (cálculos, storage, investments)
  /pages           # Páginas Next.js
  /styles          # Estilos globais
  /data            # Dados estáticos (JSON)
```

## 🧮 Funcionalidades

- ✅ Simulação de rendimentos com juros compostos
- ✅ Suporte a múltiplos tipos de investimento (FII, LCI, LCA, CDB, Tesouro IPCA+, Poupança)
- ✅ Cálculo automático de IR regressivo
- ✅ Gráficos interativos de evolução
- ✅ Salvar e comparar simulações
- ✅ Modo escuro/claro
- ✅ Responsivo (mobile-first)
- ✅ SEO otimizado

## 📄 Páginas

- `/` - Página inicial
- `/simulador` - Simulador principal
- `/comparativo` - Comparação de simulações
- `/glossary` - Glossário de termos
- `/posts/[slug]` - Artigos de blog
- `/privacy` - Política de privacidade
- `/terms` - Termos de uso

## 🔧 Configuração

### AdSense

Para ativar os anúncios, edite `src/components/AdSlot.tsx` e substitua `ca-pub-XXXXXXXXXX` pelo seu ID do AdSense.

### Analytics

Adicione seu ID do Google Analytics no `_app.tsx` ou crie um componente dedicado.

## 📝 Licença

Este projeto é privado e proprietário.

## ⚠️ Aviso Legal

Este simulador é apenas para fins educacionais. Os resultados são estimativas e não garantem rentabilidade futura. Consulte um profissional antes de investir.

