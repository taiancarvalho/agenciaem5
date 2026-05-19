---
name: enviar-template
agent: whats
description: Envia template aprovado (briefing, alerta, weekly, objeção)
inputs:
  - cliente_slug
  - template_id (briefing_inicial | alerta_roas_critico | weekly_report | objecao_padrao_preco | etc.)
  - variaveis (dict — preenchem placeholders {nome_cliente}, {roas_atual}, etc.)
outputs:
  - clientes/{slug}/comunicacao/whats-log.md (append)
elicit: false
model_tier: balanced
mcp_dependencies:
  - composio.whatsapp_business  # OU waha (config-driven)
---

# Task: enviar-template

## Objetivo

Disparar template padronizado. Severity define se passa por @qa antes.

## Passo a passo

1. Carrega template de `.em5/core/data/whatsapp-templates.yaml` pelo `template_id`
2. Preenche placeholders com `variaveis`
3. Checa severity do template:
   - `baixo` → envia direto
   - `medio` → @whats decide (auto_fix possível)
   - `alto` ou `critico` → BLOQUEIA, passa por @qa Crivo primeiro
4. Aplica stop rules (de `whats-stop-rules.yaml`):
   - Cliente em lista stop? → ABORTA + log
   - Horário silencioso? → AGENDA pra próximo horário util
   - Max msg dia atingido? → AGENDA pra amanhã
5. Se OK pra enviar:
   - Lê config: `provider: composio | waha`
   - Chama driver correspondente
6. Append em `clientes/{slug}/comunicacao/whats-log.md`:
   ```markdown
   ## {data hh:mm} — Enviado
   - Template: {template_id}
   - Severity: {sev}
   - Provider: {composio | waha}
   - Status: enviado | bloqueado_qa | agendado | abortado_stop
   ```

## Critério de saída

- Mensagem enviada OU bloqueio justificado
- Log completo

## Anti-padrão

- NÃO envia sem checar stop rules
- NÃO envia template severity>medio sem @qa
- NÃO modifica template sem aprovação (usa `*enviar-draft` pra custom)
