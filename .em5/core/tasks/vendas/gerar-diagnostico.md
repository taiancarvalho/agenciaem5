---
name: gerar-diagnostico
agent: vendas
description: Cria diagnóstico comercial estruturado em 1 página
inputs:
  - .em5/prospects/{slug}/pesquisa.md
  - call_transcript (opcional — se houve reunião)
outputs:
  - .em5/prospects/{slug}/diagnostico.md
elicit: true
model_tier: balanced
template: .em5/core/templates/vendas/diagnostico.template.md
---

# Task: gerar-diagnostico

## Objetivo

Diagnóstico = arma de venda. Cliente lê e pensa "esse cara entendeu meu problema". Ponto de inflexão da venda.

## Passo a passo

1. Lê pesquisa.md + transcript (se houver)
2. Aplica template `diagnostico.template.md`:
   - **Onde você está hoje** (estado atual mensurável)
   - **Onde quer chegar** (objetivo declarado)
   - **Gap principal** (o que separa)
   - **3 causas-raiz** do gap (sem culpa, com dado)
   - **Caminho proposto** (em5 ataca como)
   - **ROI esperado** (mensurável, com janela de tempo)
   - **Risco de não agir** (custo da inação)
3. Salva `.em5/prospects/{slug}/diagnostico.md`
4. Se aceito → handoff `*criar-proposta`

## Critério de saída

- Diagnóstico ≤ 1 página
- 3 causas-raiz com evidência
- ROI esperado com número (não "melhora muito")
- Aprovação verbal do prospect antes de proposta

## Anti-padrão

- NÃO pitch de produto. Diagnóstico de DOR.
- NÃO mente o ROI. Range honesto > overpromise.
