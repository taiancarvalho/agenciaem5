---
nome: conta-suspensa-meta
skill: (trigger crisis)
tipo: estrategico
classificacao_skill: estrategico
agente_orquestrador: ceo
agente_responsavel_entrega: cs
tempo_medio: <= 24h primeira ação
qa_gate: false
versao: 1.0
---

# Receita: Conta Suspensa Meta (crisis)

> Recovery emergencial < 24h pra abrir appeal + plano-B Google.

## Trigger
Notificação Meta OR daily-run detecta delivery=0 + "Account Disabled".

## Steps

### 1. @traffic confirmar suspensão
Escopo: ad_account? BM? page? perfil pessoal?

### 2. @cs comunicar cliente imediato (<30min)
**Usa bloco:** `.em5/blocos/cs-enviar-whatsapp-template.md` + `.em5/blocos/cs-enviar-email-gmail.md`
Transparência + plano de ação + sem pânico.

### 3. @traffic diagnosticar causa
Policy violation / payment / suspicious / circumvention / pixel.

### 4. @cs preparar appeal
Reconhecimento + diagnóstico próprio + ações corretivas + pedido específico. Sem acusar Meta.

### 5. @cs enviar appeal formal
Meta Business Support. Caso aberto + ticket_id.

### 6. @traffic implementar correções
Criativos/LPs problemáticos pausados + ajustes ANTES de pedir reativação.

### 7. @traffic plano-B Google
**Usa bloco:** `.em5/blocos/traffic-composio-google-ads-fetch.md`
Campanhas provisórias enquanto Meta resolvido.

### 8. @cs monitorar resposta (cron 6h)
SLA Meta típico 3-7d.

### 9. @ceo escalation 72h+
Account rep Meta (Premier) OR pivot canal OR criar nova conta.

### 10. @traffic ramp-up reativação
25% → 50% → 100% em 7d.

### 11. @strategist post-mortem
Input `learnings/conta-suspensa-cases.md` + update compliance checklist.

## Outputs
- `clientes/{nome}/crisis/conta-suspensa-{data}/`
- Conta reativada OR plano-B Google ativo

## Métricas
- Resposta inicial: <= 1h
- Taxa recuperação: >= 80%
- Receita perdida: minimizar via plano-B

## Composio MCP
- meta_ads · google_ads · gmail · whatsapp_business
