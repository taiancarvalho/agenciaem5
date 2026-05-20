---
name: registrar-perdido
agent: vendas
description: Documenta perda + alimenta learnings pra ajustar pitch futuro
inputs:
  - prospect_slug
  - motivo_perda: preco | tempo | nao_se_encaixa | fit_errado | sumiu | concorrente | outro
outputs:
  - .em5/system/learnings/{mes}/vendas-perdas.md
  - prospect status = perdido
elicit: true
model_tier: balanced
---

# Task: registrar-perdido

## Objetivo

Toda perda é dado. Sem registrar, não aprende — repete erro.

## Passo a passo

1. Captura motivo (1 dos 7 enumerados)
2. Captura aprendizado em 1 linha ("Achei caro" → cliente esperava R$2k, propusemos R$4500)
3. Append em `.em5/system/learnings/{mes-corrente}/vendas-perdas.md`:
   ```markdown
   ## {data} — {prospect_nome}
   - Nicho: {nicho}
   - Valor proposto: R$ {valor}
   - Motivo: {motivo}
   - Aprendizado: {1 linha}
   - Touchpoints até perda: {N}
   - Tags: #nicho-{x} #motivo-{y}
   ```
4. Move prospect: `prospects/{slug}/status.yaml.status = perdido`
5. Se motivo=fit_errado 3x no mesmo nicho → flag pro @ceo: "evitar esse perfil"

## Critério de saída

- Entry em learnings/vendas-perdas.md
- Status prospect atualizado
- Sem follow-up futuro (lista de stop pro @vendas)

## Anti-padrão

- NÃO esconde perda ("foi por preço" quando foi fit)
- NÃO insiste em prospect perdido (queima reputação)
