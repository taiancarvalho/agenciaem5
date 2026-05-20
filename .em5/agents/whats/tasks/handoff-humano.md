---
name: handoff-humano
agent: whats
description: Trava conversa + notifica @cs Sol pra contato humano
inputs:
  - cliente_slug
  - motivo (sentiment_negativo | pergunta_fora_template | reclamacao | etc.)
outputs:
  - clientes/{slug}/comunicacao/handoffs.md (append)
  - notificação WhatsApp + email pro owner
elicit: false
model_tier: balanced
---

# Task: handoff-humano

## Objetivo

Reconhecer limite do bot. Cliente irritado/complexo = humano resolve. Bot insiste = piora.

## Passo a passo

1. **Trava automação** pro cliente:
   - Adiciona flag em `clientes/{slug}/comunicacao/auto-paused.yaml`:
     ```yaml
     pausado_em: {data}
     motivo: {motivo}
     auto_resume: false  # só humano pode reativar
     ```
2. **Envia última mensagem padrão** (template `handoff_humano` — severity baixo, sem @qa):
   ```
   {nome_cliente}, deixa eu chamar {persona_cs} aqui pra responder isso direito.
   Retornamos em até 1h. 🙏
   ```
3. **Notifica owner** via canais:
   - WhatsApp pessoal do owner (Composio whatsapp_business)
   - Email (Composio gmail)
   - Append em `learnings/{mes}/whats-handoffs.md`
4. **Não envia mais nada automático** até humano resolver
5. Quando humano resolver → remove `auto-paused.yaml` ou seta `auto_resume: true`

## Critério de saída

- Cliente recebeu mensagem de espera
- Owner notificado em ≤ 5 min
- Automação pausada
- Audit log criado

## Anti-padrão

- NÃO continua bot após handoff (vira spam)
- NÃO promete prazo que não cumpre ("retornamos em 5 min" → cumpra)
- NÃO reativa automação sem confirmação humana
