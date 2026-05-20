---
nome: traffic-composio-ga4-eventos
agente: traffic
tempo_medio: 2-3min
composio_mcp: [google_analytics]
versao: 1.0
usado_em: [relatorio-cliente, check-cliente, pixel-event-validation, setup-pixel-tracking]
---

# Bloco: Coletar GA4 Eventos

## O que faz
Busca eventos GA4 + conversões via Composio Google Analytics.

## Inputs
- GA4 property_id
- janela
- eventos específicos (lead, purchase, etc) OR todos

## Execução
1. Composio googleanalytics tools
2. Run report (eventos + conversões + canais)
3. Validar disparos custom + sessões
4. Comparar com Meta (deduplicação)

## Output
- Dados GA4 estruturados
- Match com outras fontes

## Composio
- `GOOGLEANALYTICS_RUN_REPORT` · `GOOGLEANALYTICS_LIST_EVENTS`
