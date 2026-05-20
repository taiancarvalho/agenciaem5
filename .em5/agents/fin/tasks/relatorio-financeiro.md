---
name: relatorio-financeiro
agent: fin
description: Relatório financeiro consolidado mensal (MRR + ROI + inadimplência)
inputs:
  - mes_ref
outputs:
  - .em5/_fin/{ano-mes}/relatorio.md
elicit: false
model_tier: balanced
template: .em5/system/templates/fin/relatorio-financeiro.template.md
---

# Task: relatorio-financeiro

## Objetivo

1 documento consolidado por mês. Solo gestor abre, lê em ≤ 5 min, decide.

## Passo a passo

1. Carrega:
   - `_fin/{ano-mes}/mrr.md`
   - Lista de ROI por cliente (todos `roi-{mes}.md`)
   - Lista inadimplentes
   - Custo agência interno (horas × custo_hora)
2. Aplica `relatorio-financeiro.template.md`
3. Salva `.em5/_fin/{YYYY-MM}/relatorio.md`
4. Envia via Composio gmail pro owner (auto-send)

## Critério de saída

- Relatório ≤ 2 páginas
- Inclui: MRR, ROI por cliente, inadimplência, custo, lucro
- Top 3 ações sugeridas no fim (upsell candidatos, churn-risk, otimização)
