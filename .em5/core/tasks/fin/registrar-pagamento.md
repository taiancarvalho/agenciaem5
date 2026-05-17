---
name: registrar-pagamento
agent: fin
description: Marca cobrança como paga (webhook Asaas OU manual) + atualiza saldo
inputs:
  - cobranca_id_asaas
  - data_pagamento
  - metodo (PIX | BOLETO | CREDIT_CARD | manual)
outputs:
  - .em5/clientes/{slug}/financeiro/cobrancas.yaml (status: PAID)
  - .em5/clientes/{slug}/financeiro/pagamentos.md (append)
elicit: false
model_tier: haiku  # tarefa simples, modelo barato
---

# Task: registrar-pagamento

## Objetivo

Reflete pagamento no filesystem-first (Art. I). Source pode ser webhook Asaas (auto) ou manual.

## Passo a passo

1. Localiza cobrança em `clientes/*/financeiro/cobrancas.yaml` por `id_asaas`
2. Atualiza status: `PENDING` → `PAID`
3. Adiciona campo `pago_em: {data}` + `metodo: {...}`
4. Reseta `inadimplencia_dias: 0` em `mensalidade.yaml`
5. Append em `pagamentos.md`:
   ```markdown
   | {data} | R$ {valor} | {metodo} | id: {asaas_id} | OK |
   ```
6. Notifica `@cs Sol`: "Pagamento {cliente} confirmado — agradecer"

## Critério de saída

- Status local = PAID
- `mensalidade.yaml` atualizado
- @cs notificado pra agradecer (relacionamento)
