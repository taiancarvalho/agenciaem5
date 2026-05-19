---
name: fechar-cliente
agent: vendas
description: Aceite formal → handoff @cs Sol pra onboarding + @fin Caixa pra cobrança
inputs:
  - prospect_slug
  - aceite_formato: whatsapp | email | assinatura_digital
outputs:
  - .em5/prospects/{slug}/aceite.md
  - novo workspace cliente em clientes/{slug}/
  - handoff @cs Sol + @fin Caixa
elicit: true
model_tier: balanced
---

# Task: fechar-cliente

## Objetivo

Aceite formal + transição prospect → cliente ativo. Zero atrito no handoff.

## Passo a passo

1. Confirma aceite (lê WhatsApp/email/assinatura — anexa em aceite.md)
2. Cria workspace cliente: `clientes/{slug}/` via skill `/cliente-novo {nome}`
3. Copia proposta aprovada → `clientes/{slug}/onboarding/proposta-original.md`
4. Cria `mensalidade.yaml`:
   ```yaml
   valor_mensal: {valor da proposta}
   data_inicio: {data}
   billing_type: {PIX | BOLETO | CREDIT_CARD}
   asaas_customer_id: null  # @fin Caixa cria
   inadimplencia_dias: 0
   ```
5. Handoff:
   - **@cs Sol** → `*iniciar-onboarding {slug}`
   - **@fin Caixa** → `*cadastrar-cliente-asaas {slug}` + `*criar-cobranca-asaas {slug}`
6. Move prospect → arquivo histórico: `.em5/prospects/{slug}/status.yaml = ganho`

## Critério de saída

- Workspace cliente criado
- Aceite documentado
- @cs Sol acionado pra onboarding
- @fin Caixa acionado pra cobrança
- Learnings: append em `vendas-ganhos.md` se for nicho novo

## Anti-padrão

- NÃO começa execução sem mensalidade configurada
- NÃO esquece de fechar prospect (vira fantasma no funil)
