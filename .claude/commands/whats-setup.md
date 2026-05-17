# /whats-setup — Setup do WhatsApp em5

> Configura @whats Onda pra operar. Dual provider: Composio (API oficial, pago) ou WAHA (selfhosted, free).
> ≤ 5 min de setup inicial. Depois roda sozinho.

## Uso

```
/whats-setup
```

## Wizard

```
📱 Onda — Setup WhatsApp

? Qual provider?
  [1] composio (WhatsApp Business API, pago, oficial)
  [2] waha (selfhosted Docker, free, não-oficial — risco de ban)

→ composio

? COMPOSIO_API_KEY já configurada no .env? [s/N]
→ s

? Número de WhatsApp da agência: +55 11 98765-4321

? Importar templates padrão (briefing, alerta, weekly, objeções)? [S/n]
→ s

? Stop rules — quais ativar?
  [x] cliente_pediu_parar (recomendado)
  [x] horario_silencioso 22h-08h (recomendado)
  [x] max_mensagens_dia: 3 (recomendado)
  [ ] resposta_negativa_3x → handoff_humano
  [x] feriado_local

? Owner pra receber handoff humano?
→ Taian (taian@em5.agency)

✓ .em5/config/whats.yaml gerado
✓ Templates copiados pra .em5/clientes/_template/comunicacao/templates/
✓ Stop rules ativadas
✓ Teste enviado pro owner

@whats Onda ativo. Use:
  - /whats-enviar {cliente} {template}
  - @whats *receber-mensagem (polling manual)
  - @whats *stop-cliente {nome}
```

## Schema do em5-config.yaml

```yaml
channels:
  whatsapp:
    enabled: true
    provider: composio  # ou: waha
    composio:
      toolset: whatsapp_business
      api_key: "${COMPOSIO_API_KEY}"
      phone_number: "+5511987654321"
    waha:
      url: http://localhost:3000
      session: default
      auth: none  # ou: api_key se setou
    templates:
      path: .em5/core/data/whatsapp-templates.yaml
      override_dir: .em5/clientes/{slug}/comunicacao/templates/
    stop_rules:
      config: .em5/core/data/whats-stop-rules.yaml
      active:
        - cliente_pediu_parar
        - horario_silencioso
        - max_mensagens_dia
        - feriado_local
    handoff:
      destino: '@cs Sol'
      notificar_owner: true
      owner_phone: "+5511987654321"
      owner_email: "taian@em5.agency"
```

## Drivers — diferença prática

| Aspecto | Composio | WAHA |
|---------|----------|------|
| Custo | Tier pago (API oficial) | Free (selfhosted) |
| Confiabilidade | Alta | Média (risco ban) |
| Suporte mídia | Completo | Limitado |
| Templates aprovados Meta | Sim | Não |
| Setup | API key | Docker compose |
| Recomendado pra | Produção / B2B | Solo dev / testes |

## Switch entre providers

Mude `provider: composio` → `provider: waha` em `em5-config.yaml`. Agente @whats Onda lê config e adapta automaticamente. Mesma interface, drivers diferentes.

## Crítico

@whats Onda **NUNCA** envia sem aprovação humana ou @qa se severity > medio.

---

*em5 v1.2 — Fase 8 (WhatsApp Stack)*
