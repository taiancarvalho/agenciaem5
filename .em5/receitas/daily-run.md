---
nome: daily-run
skill: /dia
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 10-15min
qa_gate: false
versao: 1.0
---

# Receita: Daily Run (protetivo)

> Snapshot diário todas contas ativas. Pausa em ALERTA. Não otimiza.

## Quando usar
- Cron seg-sáb 8h (skip feriado/dom)
- Manual via `/dia`

## Inputs
- Lista clientes ativos (`em5-config.yaml`)

## Steps

### 1. @coo lista clientes ativos
Filtra `status != INADIMPLENTE_30d+`.

### 2. @traffic snapshot paralelo (max 5 simultâneos)
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md`
Classifica: NORMAL · ATENCAO (CPL 1.5x) · ALERTA (CPL 2x+ OR freq>4 OR 0 conv 24h+).
ALERTA: **pausa imediato** + escalar.

### 3. @coo consolida painel
**Output:** `operacao/painel-dia-{YYYY-MM-DD}.md`

### 4. @cs alerta operador (se ALERTA > 0)
**Usa bloco:** `.em5/blocos/cs-enviar-whatsapp-template.md` (operador) + Slack.

## Outputs
- N tickets diários por cliente
- `operacao/painel-dia-{data}.md` (consolidado)
- Alertas WhatsApp/Slack operador

## Anti-padrões
- ❌ Otimizar (daily é PROTETIVO)
- ❌ Pausar sem ALERTA real
- ❌ Falhar individual = bloquear run inteiro (degradação graciosa)

## Métricas
- Duração total: <= 15min até N=20 clientes
- Taxa coleta sucesso: > 95%
- Falsos alertas: < 10%

## Composio MCP
- meta_ads · google_ads · whatsapp_business · slack
