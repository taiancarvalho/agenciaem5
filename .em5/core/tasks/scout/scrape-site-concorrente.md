---
name: scrape-site-concorrente
agent: scout
description: Composio firecrawl captura site concorrente (homepage, pricing, blog)
inputs:
  - concorrente_url
  - cliente_slug (pra contexto + saída)
outputs:
  - .em5/clientes/{slug}/inteligencia/scrapes/{concorrente}-{data}.md
elicit: false
model_tier: balanced
mcp_toolsets: [composio.firecrawl]
---

# Task: scrape-site-concorrente

## Objetivo

Snapshot semanal do site concorrente. Detecta mudanças (preço, oferta, headline) entre snapshots.

## Passo a passo

1. **Composio firecrawl**: `crawl_url(url, max_pages: 5, focus: [homepage, /precos, /sobre, /blog])`
2. Extrai:
   - Headline da homepage
   - CTA principal
   - Preços visíveis (se houver)
   - Diferenciador declarado
   - Últimos 3 posts blog (título + data)
3. Salva `.em5/clientes/{slug}/inteligencia/scrapes/{concorrente_slug}-{data}.md`:
   ```markdown
   # Scrape — {concorrente} — {data}
   - Headline: "..."
   - CTA: "..."
   - Preço visível: R$ X
   - Diferenciador: "..."
   - Posts blog últimos 3: ...
   ```
4. Compara com scrape anterior (mesmo concorrente, snapshot anterior):
   - Mudou headline? → `alerta-movimentacao`
   - Mudou preço? → `alerta-movimentacao`
   - Lançou novo serviço? → `alerta-movimentacao`

## Critério de saída

- Snapshot salvo
- Diff vs anterior identificado (se houver)
- Mudanças relevantes → próxima task `*alerta-movimentacao`

## Anti-padrão

- NÃO copia conteúdo (Art. VI — honestidade, sem rip-off)
- NÃO scrape em loop (rate limit Composio)
