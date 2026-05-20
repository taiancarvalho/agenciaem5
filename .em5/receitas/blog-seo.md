---
nome: blog-seo
skill: (calendário inbound)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 5-7d
qa_gate: true
versao: 1.0
---

# Receita: Blog SEO

> Keyword research → outline → 1500-2500 palavras → on-page → publica → monitora ranking.

## Steps

### 1. @strategist keyword research
**Usa bloco:** `.em5/blocos/scout-scrape-concorrencia.md` (concorrentes SEO)
Composio: semrush · ahrefs · google_search_console.
Critérios: vol >= 500/mês · dificuldade <= 50 · intent informacional/comercial.

### 2. @copywriter outline SEO
H1 + 5-8 H2 + FAQ + meta-desc + slug otimizado.

### 3. @copywriter escreve
**Usa bloco:** `.em5/blocos/copy-escrever-com-angulo.md`
1500-2500 palavras · densidade keyword 1-2% · paragrafos curtos · links internos 3-5 · links externos autoridade 1-2.

### 4. @designer imagens otimizadas
**Usa bloco:** `.em5/blocos/designer-gerar-imagem.md`
3-5 imagens + alt-text + compressão < 200kb.

### 5. @qa valida SEO
Checklist: H1 único + keyword · meta-desc 150-160 chars · slug · alt-text · links funcionais · densidade 1-2% · FAQ schema.

### 6. @cs publica + Search Console
CMS publish + submit Search Console + share redes.

### 7. @traffic monitora ranking D+30/60/90
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md` (adaptado pra Search Console)

## Outputs
- `clientes/{nome}/blog/{data-slug}/post.md`
- Post publicado CMS
- Ranking tracked

## Métricas
- Ranking d90: top 10
- Tráfego orgânico 6m: >= 500 visits/mês

## Composio MCP
- semrush · ahrefs · google_search_console · wordpress
