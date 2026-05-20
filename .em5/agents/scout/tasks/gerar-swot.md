---
name: gerar-swot
agent: scout
description: SWOT comparativo cliente vs top-3 concorrentes
inputs:
  - cliente_slug
outputs:
  - clientes/{slug}/inteligencia/swot-{periodo}.md
elicit: false
model_tier: balanced
template: .em5/system/templates/scout/swot.template.md
---

# Task: gerar-swot

## Objetivo

SWOT honesto baseado em evidência (scrapes + ads + posicionamento). Não é exercício acadêmico — é base pra @strategist Vera ajustar estratégia.

## Passo a passo

1. Carrega:
   - `clientes/{slug}/inteligencia/concorrentes.yaml`
   - Últimos scrapes dos top-3 primários
   - Snapshots de ads dos primários
   - Posicionamento do cliente (`clientes/{slug}/estrategia/posicionamento.md`)
2. Aplica `swot.template.md`:
   - **Forças** (cliente vs concorrentes — onde ganha)
   - **Fraquezas** (onde perde com evidência)
   - **Oportunidades** (gaps no mercado que ninguém preenche)
   - **Ameaças** (movimentação de concorrente que impacta cliente)
3. Salva `clientes/{slug}/inteligencia/swot-{YYYY-MM}.md`
4. Handoff `@strategist Vera` pra revisão e ajuste de estratégia

## Critério de saída

- SWOT com ≥ 3 itens por quadrante
- Cada item tem evidência citada (scrape, ad, etc.)
- @strategist notificado

## Anti-padrão

- NÃO SWOT genérico ("forte time", "fraco em marketing")
- NÃO inventa força/fraqueza sem evidência
