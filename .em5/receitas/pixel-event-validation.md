---
nome: pixel-event-validation
skill: (cron mensal)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: traffic
tempo_medio: 15-20min/cliente
qa_gate: false
versao: 1.0
---

# Receita: Validação Eventos Pixel (manutenção mensal)

> Confirma eventos críticos disparando + match rate ok + sem duplicação.

## Trigger
Cron mensal dia 10.

## Steps

### 1. @traffic checar Meta Events Manager
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md`
Indicadores: ok · atenção (match rate 50-70% OR queda 20%+) · alerta (sumiu OR < 50%).

### 2. @traffic checar GA4 DebugView
**Usa bloco:** `.em5/blocos/traffic-composio-ga4-eventos.md`

### 3. @traffic comparar fontes
Meta vs GA4 vs backend (+/- 15% saudável).

### 4. @traffic gerar relatório validação
**Output:** `clientes/{nome}/setup-tecnico/pixel-validation-{YYYY-MM}.md`

### 5. @coo trigger pixel-quebrado se alerta
Escalation automática.

## Outputs
- `pixel-validation-{mes}.md` por cliente

## Métricas
- Cadência: mensal dia 10
- Match rate alvo: >= 70%
- Divergência fontes max: +/- 15%

## Composio MCP
- meta_ads · google_analytics
