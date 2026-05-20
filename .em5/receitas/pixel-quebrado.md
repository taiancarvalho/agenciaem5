---
nome: pixel-quebrado
skill: (trigger crisis)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: <= 4h restaurar
qa_gate: false
versao: 1.0
---

# Receita: Pixel Quebrado (crisis)

> Daily-run detecta queda 80%+ conversões 24h → diagnose → corrige < 4h.

## Trigger
Daily-run alerta OR cliente reporta queda conversões.

## Steps

### 1. @traffic confirmar queda
Comparar Meta + GA4 + backend cliente (3 fontes).

### 2. @cs testar pixel vivo
Meta Pixel Helper + Test Events + DebugView GA4.

### 3. @cs corrigir imediato
Diagnostico comum: removido / GTM unpublished / consent bloqueando / cookie expired / CAPI down.

### 4. @traffic validar eventos
Test Events disparando + match rate normalizou >= 70%.

### 5. @cs comunicar cliente (post-mortem)
Transparente — agência pegou rápido.

## Outputs
- `clientes/{nome}/crisis/pixel-quebrado-{data}/diagnostico.md` + `correcao.md`

## Métricas
- Tempo detecção: <= 24h (via daily-run)
- Tempo correção: <= 4h
- Recuperação conversões: 100% em 48h

## Composio MCP
- meta_ads · google_analytics
