---
name: relatorio-semanal
agent: scout
description: Resumo semanal de inteligência competitiva pro cliente
inputs:
  - cliente_slug
  - semana_ref (default: semana corrente)
outputs:
  - .em5/clientes/{slug}/inteligencia/relatorio-{YYYY-Www}.md
elicit: false
model_tier: balanced
template: .em5/core/templates/scout/relatorio-semanal.template.md
---

# Task: relatorio-semanal

## Objetivo

Consolida intel da semana em 1 documento. Cliente recebe via @cs Sol ou @whats Onda.

## Passo a passo

1. Carrega:
   - Scrapes da semana (`inteligencia/scrapes/*.md` filtrado por data)
   - Ads snapshots da semana
   - Alertas da semana (`alertas-{mes}.md`)
   - SWOT mais recente
2. Aplica `relatorio-semanal.template.md`:
   - Sumário (1 parágrafo)
   - Movimentos detectados (top 3)
   - Ads ativos top concorrentes
   - Oportunidade identificada (se houver)
   - Ameaça identificada (se houver)
   - Recomendação @strategist
3. Salva `clientes/{slug}/inteligencia/relatorio-{YYYY-Www}.md`
4. Notifica `@cs Sol` pra enviar ao cliente (após @qa Crivo se severity > medio)

## Critério de saída

- Relatório ≤ 1 página
- Cliente recebe sexta às 18h (regra de ouro)
- Próxima semana: ciclo repete

## Frequência

Semanal. Rodar sextas via cron futuro (Fase 13+) ou `/dia --semanal`.
