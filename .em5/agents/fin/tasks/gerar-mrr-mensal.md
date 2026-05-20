---
name: gerar-mrr-mensal
agent: fin
description: Sum de assinaturas ativas (Asaas) → dashboard MRR
inputs:
  - mes_ref (default: atual)
outputs:
  - .em5/_fin/{ano-mes}/mrr.md
  - .em5/_fin/{ano-mes}/mrr.yaml (machine-readable pro painel)
elicit: false
model_tier: balanced
mcp_dependencies: [asaas]
---

# Task: gerar-mrr-mensal

## Objetivo

MRR (Monthly Recurring Revenue) é métrica de saúde da agência. Solo gestor decide expansão/contenção a partir disso.

## Definições

- **MRR:** soma de mensalidades ativas confirmadas
- **MRR new:** clientes que entraram no mês
- **MRR churn:** clientes que saíram
- **MRR net:** new - churn
- **ARR (Annual):** MRR × 12

## Passo a passo

1. **Asaas MCP**: `list-subscriptions { status: ACTIVE }`
2. Soma `value` de todas subscriptions ativas
3. Cross-ref com `clientes/*/financeiro/mensalidade.yaml`:
   - Cliente em Asaas + ativo em em5 → conta no MRR
   - Cliente em Asaas mas churn em em5 → flag inconsistência
4. Calcula deltas vs mês anterior:
   - `MRR_new`, `MRR_churn`, `MRR_net`
5. Salva `.em5/_fin/{YYYY-MM}/mrr.md`:
   ```markdown
   # MRR — {Mês/Ano}

   ## Total: R$ {MRR}

   - Clientes ativos: {N}
   - Novos no mês: +{X} (R$ {valor})
   - Churn no mês: -{Y} (R$ {valor})
   - Net: {+/-Z} (R$ {valor})

   ## ARR projetado: R$ {MRR*12}

   ## Por nicho
   | Nicho | Clientes | MRR |
   |---|---|---|
   ```
6. Também salva `.em5/_fin/{YYYY-MM}/mrr.yaml` (machine-readable pro painel Astro consumir)

## Critério de saída

- mrr.md + mrr.yaml gerados
- Painel atualizado próximo build
- Se MRR_net negativo > 5% → escala @ceo

## Frequência

Mensal. `/dia` no dia 1 do mês dispara automaticamente.
