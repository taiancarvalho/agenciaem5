---
name: setup-webhooks-asaas
agent: fin
description: Configura webhooks Asaas pra eventos de pagamento
inputs:
  - webhook_url (endpoint pra receber eventos)
outputs:
  - .em5/integracoes/asaas-webhooks.yaml
elicit: true
model_tier: balanced
mcp_dependencies: [asaas]
---

# Task: setup-webhooks-asaas

## Objetivo

Webhook Asaas dispara em eventos (pagamento_confirmado, inadimplencia, etc.) → notifica em5 sem precisar polling.

## Eventos relevantes

- `PAYMENT_CONFIRMED` — cobrança paga
- `PAYMENT_OVERDUE` — vencida
- `PAYMENT_DELETED` — cancelada
- `PAYMENT_REFUNDED` — estornada
- `SUBSCRIPTION_INACTIVATED` — assinatura cancelada

## Passo a passo

1. **Asaas MCP**: `create-webhook { url, events: [...], enabled: true }`
2. Salva `.em5/integracoes/asaas-webhooks.yaml`:
   ```yaml
   webhook_id: hook_xxx
   url: {webhook_url}
   events: [PAYMENT_CONFIRMED, PAYMENT_OVERDUE, ...]
   token_auth: "{Asaas gera token}"
   criado_em: {data}
   ```
3. **Importante:** webhook_url precisa ser endpoint público (não localhost) que processa POST → dispara `@fin *registrar-pagamento` ou `@fin *monitorar-inadimplencia`

## Setup recomendado

- **Endpoint:** Cloudflare Worker / Vercel Function / n8n webhook
- **Auth:** token Asaas no header `asaas-access-token` validado pelo endpoint
- **Resposta:** 200 OK rápido, processa async

## Crítico

- NÃO expor endpoint sem validar token Asaas
- Webhook precisa ser **idempotente** (Asaas pode retentar)

## Critério de saída

- Webhook ativo no Asaas
- Configuração salva em `asaas-webhooks.yaml`
- Teste manual: cria cobrança sandbox → webhook dispara → log no Cloudflare/Vercel
