---
name: follow-up
agent: vendas
description: Sequência de touchpoints até fechamento ou perda
inputs:
  - prospect_slug
  - touchpoint_n (1..5)
outputs:
  - .em5/prospects/{slug}/follow-up-log.md
  - draft WhatsApp via @whats Onda
elicit: false
model_tier: balanced
data_dependency: .em5/core/data/vendas/objecoes-comuns.yaml
---

# Task: follow-up

## Objetivo

Manter conversa viva sem queimar prospect. 5 touchpoints máximo, espaçados.

## Cadência

| Touchpoint | Quando | Canal | Tom |
|------------|--------|-------|-----|
| 1 | +48h após proposta | WhatsApp | "Pôde olhar?" curto |
| 2 | +7d | Email | Case study relevante |
| 3 | +14d | WhatsApp | Pergunta nova (não "ainda interessado?") |
| 4 | +30d | WhatsApp | Novidade do nicho |
| 5 | +60d | Email | "Vou parar de te encher" + porta aberta |

## Passo a passo

1. Identifica touchpoint atual (lê follow-up-log.md)
2. Carrega objeções comuns (`objecoes-comuns.yaml`) pra antecipar
3. Gera draft segundo tom da cadência
4. Envia pro @whats Onda (severity baixo, sem @qa)
5. Loga em `follow-up-log.md`
6. Se touchpoint 5 sem resposta → `*registrar-perdido`

## Critério de saída

- Touchpoint enviado
- Log atualizado
- Próximo touchpoint agendado ou prospect fechado/perdido

## Anti-padrão

- NÃO mais de 5 touchpoints (queima)
- NÃO mesma mensagem 2x (rotaciona ângulo)
- NÃO desconto sem ser pedido (Art. V)
