---
nome: inteligencia-semanal
skill: (cron semanal)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: scout
tempo_medio: 1-2h/cliente
qa_gate: false
versao: 1.0
---

# Receita: Inteligência Competitiva Semanal

> Scrape concorrência + SWOT delta + alertas movimentação.

## Trigger
Cron segunda 10h.

## Steps

### 1. @scout scrape concorrentes
**Usa bloco:** `.em5/blocos/scout-scrape-concorrencia.md`

### 2. @scout monitorar Meta Ad Library
Ads novos + retirados + criativos top + mudança copy.

### 3. @scout SWOT delta
Comparar vs snapshot semana anterior.

### 4. @scout alertas
CRÍTICO (notifica @ceo <1h): concorrente lança igual · big-budget novo · reputação cliente em risco.
IMPORTANTE: posicionamento muda · tendência emergente.

### 5. @cs compartilhar cliente (se relevante)
Via weekly-digest OR call.

## Outputs
- `clientes/{nome}/inteligencia/semanal-{YYYY-SS}.md`

## Métricas
- Cadência: segunda 10h
- Alertas acionáveis: >= 1/semana
- Insights aplicados: tracked trimestralmente

## Composio MCP
- firecrawl · brightdata · apify · meta_ads
