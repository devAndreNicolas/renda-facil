# Regras de Negócio - RendaFácil

Este documento descreve as regras de negócio atuais do sistema RendaFácil, baseadas na implementação vigente.

## 1. Tipos de Investimento e Características

O sistema suporta 6 tipos de investimentos, cada um com suas regras específicas de tributação, liquidez e cálculo de rendimento.

| Tipo | Descrição | IR (Imposto de Renda) | Risco | Liquidez Mínima | Indexador |
|------|-----------|-----------------------|-------|-----------------|-----------|
| **FII** | Fundos Imobiliários | Isento | Médio | Imediata (0 meses) | Dividend Yield |
| **LCI** | Letra de Crédito Imobiliário | Isento | Baixo | 12 meses | % do CDI |
| **LCA** | Letra de Crédito do Agronegócio | Isento | Baixo | 12 meses | % do CDI |
| **CDB** | Certificado de Depósito Bancário | Regressivo | Baixo | 6 meses | % do CDI |
| **Tesouro IPCA+** | Título Público Híbrido | Regressivo | Baixo | 24 meses | IPCA + Taxa Fixa |
| **Poupança** | Caderneta de Poupança | Isento | Baixíssimo | Imediata (0 meses) | Taxa Fixa + TR |

## 2. Regras de Tributação (Imposto de Renda)

### 2.1. Investimentos Isentos
Os seguintes investimentos são isentos de cobrança de Imposto de Renda sobre os rendimentos para pessoas físicas:
*   **FII** (Fundos Imobiliários)
*   **LCI**
*   **LCA**
*   **Poupança**

### 2.2. Tabela Regressiva de IR
Aplicável para **CDB** e **Tesouro IPCA+**. A alíquota diminui conforme o tempo de aplicação:

*   **Até 180 dias (6 meses):** 22,5%
*   **De 181 a 360 dias (1 ano):** 20,0%
*   **De 361 a 720 dias (2 anos):** 17,5%
*   **Acima de 720 dias (2 anos):** 15,0%

*Nota: O imposto incide apenas sobre o lucro (rendimento), não sobre o valor principal investido.*

## 3. Regras de Cálculo de Rendimento

### 3.1. Cálculo Geral (Juros Compostos)
Para todos os investimentos, o cálculo base utiliza a fórmula de juros compostos com aportes mensais:
*   O valor principal rende juros sobre juros.
*   Os aportes mensais também rendem juros compostos a partir do mês em que são realizados.

### 3.2. Especificidades por Tipo

#### **FII (Fundos Imobiliários)**
*   **Entrada:** Preço da Cota, Quantidade de Cotas, Dividend Yield Mensal (% a.m.), Valorização Anual Esperada (% a.a.).
*   **Cálculo da Taxa:** A taxa total considerada para a simulação é a soma do *Dividend Yield* anualizado com a *Valorização* anual.
    *   `Taxa Total = (DY_Mensal_Anualizado) + Valorização_Anual`
*   **Renda Mensal:** É calculada e destacada separadamente como "Proventos", baseada no Dividend Yield.

#### **Renda Fixa (CDB, LCI, LCA)**
*   **Entrada:** Taxa CDI Atual (% a.a.) e Percentual do CDI (ex: 100% do CDI).
*   **Cálculo da Taxa:** A taxa efetiva é o produto da taxa CDI pelo percentual contratado.
    *   `Taxa Efetiva = CDI_Atual * (Percentual_CDI / 100)`
*   **Padrões:**
    *   LCI/LCA: Padrão de 85% do CDI.
    *   CDB: Padrão de 100% do CDI.

#### **Tesouro IPCA+**
*   **Entrada:** IPCA Projetado (% a.a.) e Taxa Real Fixa (% a.a.).
*   **Cálculo da Taxa:** A taxa total é a soma simples das duas taxas (simplificação para simulação).
    *   `Taxa Total = IPCA + Taxa Real`
*   **Alerta:** Exibe aviso sobre "Marcação a Mercado" e risco de perdas em resgates antecipados.

#### **Poupança**
*   **Entrada:** Taxa Fixa (0,5% a.m. + TR).
*   **Cálculo:** Utiliza uma taxa fixa anualizada baseada em 0,5% a.m. (aprox. 6,17% a.a.) mais TR (atualmente considerada zerada ou baixa na simulação padrão).

## 4. Regras de Interface e Validação (UX)

### 4.1. Restrições de Prazo (Liquidez)
O sistema alerta o usuário se o prazo escolhido for menor que a carência mínima do investimento:
*   **LCI/LCA:** Mínimo 12 meses.
*   **CDB:** Mínimo 6 meses.
*   **Tesouro IPCA+:** Mínimo 24 meses.

### 4.2. Renda Mensal Estimada
O sistema calcula e exibe quanto o montante final renderia mensalmente se mantido na mesma taxa.
*   Para **FIIs**, isso representa os proventos (dividendos) mensais.
*   Para Renda Fixa, representa o rendimento mensal bruto/líquido conforme a taxa.

### 4.3. Prévia de IR
Para investimentos com tributação regressiva (**CDB**, **Tesouro IPCA+**), o sistema exibe:
*   O valor monetário descontado do lucro.
*   A alíquota efetiva (%) que será aplicada ao final do período simulado.

---

## 5. Cenários Futuros e Mudanças Legislativas (MP 1.303/2025)

> [!WARNING]
> **Atenção:** As regras abaixo referem-se a propostas legislativas (MP 1.303) que podem entrar em vigor a partir de 2026. O sistema atualmente utiliza as regras vigentes (Seção 2).

### 5.1. Fim da Isenção para LCI/LCA
*   **Proposta:** Rendimentos de LCI e LCA passariam a ser tributados.
*   **Alíquota Prevista:** 5% sobre o lucro (para títulos emitidos a partir de 2026).

### 5.2. Unificação do IR para Renda Fixa
*   **Proposta:** Fim da tabela regressiva para a maioria dos títulos de renda fixa (CDBs, Tesouro).
*   **Alíquota Prevista:** 17,5% (taxa única), independentemente do prazo da aplicação.

### 5.3. Impacto no Sistema
Para manter a precisão das simulações de longo prazo, o sistema poderá implementar um seletor de "Cenário Tributário":
1.  **Regra Atual (2025):** Isenção para LCI/LCA, Tabela Regressiva (22,5% a 15%) para outros.
2.  **Regra MP 1.303 (2026+):** IR de 5% para LCI/LCA, IR fixo de 17,5% para outros.
