# 📢 Guia de Configuração de Afiliados e Banners

Este documento explica como configurar e gerenciar links de afiliados, banners e Google AdSense de forma centralizada.

## 📍 Localização

Todas as configurações estão centralizadas em: **`src/config/affiliates.ts`**

## 🔧 Como Configurar Links de Afiliados

### 1. Adicionar um Novo Link de Afiliado

Edite o arquivo `src/config/affiliates.ts` e adicione um novo objeto no array `affiliateLinks`:

```typescript
{
  id: 'identificador-unico',
  type: 'course' | 'broker' | 'product',
  title: 'Título do Banner',
  description: 'Descrição do que o usuário vai encontrar',
  url: 'https://seu-link-de-afiliado.com?ref=rendafacil',
  buttonText: 'Texto do Botão', // Opcional
  positions: ['after-form', 'sidebar'], // Onde deve aparecer
  pages: ['simulador'], // Páginas específicas (vazio = todas)
  investmentTypes: ['FII', 'CDB'], // Tipos de investimento (vazio = todos)
  priority: 1, // Menor número = maior prioridade
  openInNewTab: true, // Se deve abrir em nova aba
}
```

### 2. Posições Disponíveis

- `header`: Topo da página
- `sidebar`: Barra lateral
- `after-form`: Após o formulário de simulação
- `after-results`: Após os resultados da simulação
- `footer`: Rodapé
- `in-content`: Dentro do conteúdo

### 3. Exemplos Práticos

#### Exemplo 1: Curso de Investimentos
```typescript
{
  id: 'curso-investimentos',
  type: 'course',
  title: '📚 Curso Completo de Investimentos',
  description: 'Aprenda a investir de forma inteligente',
  url: 'https://exemplo.com/curso?ref=rendafacil',
  buttonText: 'Conhecer o Curso',
  positions: ['after-form', 'sidebar'],
  priority: 1,
  openInNewTab: true,
}
```

#### Exemplo 2: Corretora (apenas para FII e CDB)
```typescript
{
  id: 'corretora-xp',
  type: 'broker',
  title: '💰 Abra sua conta na XP',
  description: 'Invista com taxas competitivas',
  url: 'https://exemplo.com/xp?ref=rendafacil',
  buttonText: 'Abrir Conta Grátis',
  positions: ['sidebar', 'after-results'],
  investmentTypes: ['FII', 'CDB'], // Apenas para estes tipos
  priority: 2,
  openInNewTab: true,
}
```

## 🎯 Configuração do Google AdSense

### 1. Atualizar ID do Cliente

No arquivo `src/config/affiliates.ts`, atualize o `clientId`:

```typescript
export const adSenseConfig: AdSenseConfig = {
  clientId: 'ca-pub-SEU-ID-AQUI', // Substitua pelo seu ID
  enabled: true,
  positions: {
    banner: true,
    sidebar: true,
    inArticle: true,
    afterResults: true,
  },
};
```

### 2. Habilitar/Desabilitar Posições

Você pode controlar onde os anúncios aparecem:

```typescript
positions: {
  banner: true,        // Banner no topo
  sidebar: true,      // Barra lateral
  inArticle: true,    // Dentro do conteúdo
  afterResults: true, // Após resultados
}
```

### 3. Desabilitar AdSense Completamente

```typescript
enabled: false,
```

## 📍 Onde os Banners Aparecem

### Página Hub (`/simulador`)
- **Header**: Banners configurados para posição `header`
- **Banner AdSense**: Se `banner: true`

### Páginas Específicas (`/simulador/fii`, `/simulador/cdb`, etc.)
- **After Form**: Após o formulário de simulação
- **Sidebar**: Barra lateral direita
- **After Results**: Após os resultados da simulação
- **In Article**: Dentro do conteúdo (AdSense)
- **After Results AdSense**: Após resultados (se configurado)

## 🎨 Personalização Visual

Os banners usam o componente `AffiliateBanner` que pode ser personalizado em:
- `src/components/AffiliateBanner.tsx`

Variantes disponíveis:
- `default`: Banner padrão
- `compact`: Versão compacta (usada na sidebar)
- `large`: Versão grande

## 🔍 Filtros Inteligentes

O sistema filtra automaticamente os banners baseado em:

1. **Posição**: Apenas banners configurados para aquela posição
2. **Página**: Se `pages` estiver definido, apenas nas páginas listadas
3. **Tipo de Investimento**: Se `investmentTypes` estiver definido, apenas para aqueles tipos
4. **Prioridade**: Ordena por prioridade (menor número = aparece primeiro)

## 📝 Exemplo Completo

```typescript
export const affiliateLinks: AffiliateLink[] = [
  {
    id: 'curso-investimentos',
    type: 'course',
    title: '📚 Curso Completo de Investimentos',
    description: 'Aprenda a investir de forma inteligente',
    url: 'https://exemplo.com/curso?ref=rendafacil',
    buttonText: 'Conhecer o Curso',
    positions: ['after-form', 'sidebar'],
    priority: 1,
    openInNewTab: true,
  },
  {
    id: 'corretora-xp',
    type: 'broker',
    title: '💰 Abra sua conta na XP',
    description: 'Invista em FIIs, CDBs e mais',
    url: 'https://exemplo.com/xp?ref=rendafacil',
    buttonText: 'Abrir Conta Grátis',
    positions: ['sidebar', 'after-results'],
    investmentTypes: ['FII', 'CDB', 'LCI', 'LCA'],
    priority: 2,
    openInNewTab: true,
  },
];
```

## ✅ Checklist de Configuração

- [ ] Atualizar `clientId` do AdSense
- [ ] Adicionar links de afiliados no array `affiliateLinks`
- [ ] Configurar posições estratégicas para cada banner
- [ ] Definir filtros por tipo de investimento (se necessário)
- [ ] Testar em diferentes páginas
- [ ] Verificar se os links abrem corretamente
- [ ] Validar que os banners aparecem nas posições corretas

## 🚀 Próximos Passos

1. Substitua os links de exemplo pelos seus links reais
2. Configure o ID do AdSense
3. Ajuste as posições conforme sua estratégia
4. Teste em diferentes dispositivos

---

**Dica**: Mantenha este arquivo atualizado sempre que adicionar novos parceiros de afiliados!

