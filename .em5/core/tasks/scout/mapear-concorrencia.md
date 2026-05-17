---
name: mapear-concorrencia
agent: scout
description: Lista 5-10 concorrentes do nicho do cliente (1ª vez ou refresh)
inputs:
  - cliente_slug
outputs:
  - .em5/clientes/{slug}/inteligencia/concorrentes.yaml
elicit: true
model_tier: balanced
data_dependency: .em5/core/data/scout/concorrentes-por-nicho.yaml
---

# Task: mapear-concorrencia

## Objetivo

Lista universo competitivo do cliente. Base pra scrape semanal + alerta de movimentação.

## Passo a passo

1. Carrega `concorrentes-por-nicho.yaml` pra ver se já mapeamos o nicho
2. Se nicho conhecido: usa lista base + adiciona específicos da região do cliente
3. Se nicho novo: busca via Composio (Google Search ou web scrape) + entrevista @cs
4. Critérios pra incluir concorrente:
   - Mesmo público-alvo
   - Mesma faixa de preço
   - Mesmo canal principal (se cliente é Instagram → concorrentes ativos no Instagram)
5. Salva `clientes/{slug}/inteligencia/concorrentes.yaml`:
   ```yaml
   primarios:  # top 3 — scrape semanal
     - nome: "Concorrente A"
       url: https://...
       instagram: "@..."
       diferenciador: "promete X"
       preco_estimado: "R$ Y"
       sinal_forca: "alto"  # alto | medio | baixo
   secundarios:  # 4-7 — scrape mensal
     - ...
   ```
6. Atualiza `concorrentes-por-nicho.yaml` com aprendizados do nicho

## Critério de saída

- 5-10 concorrentes listados
- Top 3 identificados como primários
- Próximo: `*scrape-site-concorrente` pros primários
