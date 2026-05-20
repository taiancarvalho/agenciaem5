---
nome: traffic-composio-meta-insights
agente: traffic
tempo_medio: 3-5min
composio_mcp: [meta_ads]
versao: 1.0
usado_em: [auditoria-conta, daily-run, relatorio-cliente, iteracao-criativa, qbr-trimestral, pixel-event-validation, lancamento]
---

# Bloco: Coletar Meta Ads Insights

## O que faz
Busca dados conta Meta Ads via Composio. Insights + breakdowns + lista ads/adsets.

## Inputs
- ad_account_id (act_XXX)
- janela (data_inicio + data_fim)
- breakdowns desejados (age, gender, placement, platform_position)
- fields (spend, impressions, clicks, ctr, cpm, frequency, actions)

## Execução
1. COMPOSIO_SEARCH_TOOLS "meta ads insights" (schema discovery)
2. COMPOSIO_GET_TOOL_SCHEMAS
3. METAADS_GET_AD_ACCOUNTS (confirma acesso)
4. METAADS_GET_INSIGHTS (totais janela)
5. METAADS_GET_INSIGHTS (com breakdowns)
6. METAADS_LIST_ADS + LIST_AD_CREATIVES (se preciso)
7. Salva dados crus em memoria + analisa

## Output
- Dados estruturados (markdown ou JSON)
- Anotação ticket com path artefato

## Anti-padrões
- ❌ Skip schema discovery (schemas mudam)
- ❌ Auditoria + ação misturadas (este bloco é read-only)

## Composio
- `COMPOSIO_SEARCH_TOOLS` · `COMPOSIO_GET_TOOL_SCHEMAS`
- `METAADS_GET_AD_ACCOUNTS` · `METAADS_GET_INSIGHTS` · `METAADS_LIST_ADS` · `METAADS_LIST_AD_CREATIVES`
