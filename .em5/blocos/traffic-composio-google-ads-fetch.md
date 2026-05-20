---
nome: traffic-composio-google-ads-fetch
agente: traffic
tempo_medio: 3-5min
composio_mcp: [google_ads]
versao: 1.0
usado_em: [auditoria-conta, daily-run, relatorio-cliente, conta-suspensa-meta]
---

# Bloco: Coletar Google Ads Data

## O que faz
Busca conta Google Ads (campanhas + keywords + insights) via Composio.

## Inputs
- customer_id Google Ads
- janela (data_inicio + data_fim)
- nivel (account / campaign / ad_group / keyword / ad)

## Execução
1. Composio search tools "google ads insights"
2. Get schemas
3. Listar campanhas + status + gasto
4. Insights nivel solicitado
5. Salva dados + analisa

## Output
- Dados Google Ads estruturados
- Anotação ticket

## Composio
- `GOOGLEADS_LIST_CAMPAIGNS` · `GOOGLEADS_GET_REPORT`
