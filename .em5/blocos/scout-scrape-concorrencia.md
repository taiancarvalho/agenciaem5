---
nome: scout-scrape-concorrencia
agente: scout
tempo_medio: 30-60min
composio_mcp: [firecrawl, brightdata, apify]
versao: 1.0
usado_em: [inteligencia-semanal, auditoria-conta, blog-seo, lancamento]
---

# Bloco: Scrape Concorrência

## O que faz
Coleta dados concorrentes (site + redes + ads + ranking SEO).

## Inputs
- lista concorrentes diretos (3-5)
- tipo dados (site / Meta Ad Library / SEO / redes)

## Execução
1. Site: Composio firecrawl/brightdata (respeitar robots.txt)
2. Meta Ad Library: scrape público
3. SEO: SEMrush/Ahrefs via Composio
4. Redes sociais: snapshot manual
5. Salvar em `clientes/{nome}/inteligencia/{data}/`

## Output
- Snapshot estruturado concorrente
- Comparação delta vs snapshot anterior (SWOT)

## Anti-padrões
- ❌ Scrape sem respeitar robots.txt/ToS
- ❌ 50 concorrentes (focar 3-5)
- ❌ Sem snapshot anterior (sem delta = sem insight)

## Composio
- `FIRECRAWL_*` · `BRIGHTDATA_*` · `APIFY_*` · `SEMRUSH_*` · `AHREFS_*`
