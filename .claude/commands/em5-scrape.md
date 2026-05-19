# /em5-scrape — Scrape concorrência limpo (markdown via Defuddle)

**Argumento:** `/em5-scrape $ARGUMENTS` (ex: `/em5-scrape cna-vila-mariana https://cnaidiomas.com.br/curso-kids`)

## Por que existe

@scout Espia hoje usa Firecrawl/Apify via Composio — bom pra muitas páginas
estruturadas. Pra **leitura focada de 1 página específica** (LP concorrente,
oferta, copy), Defuddle CLI entrega markdown limpo sem nav/clutter — economiza
60% dos tokens vs WebFetch puro.

Adapter de `defuddle`.

## Quando usar

- @scout análise pontual de **1 LP concorrente** (oferta, preço, copy)
- @strategist lendo artigo/blog do nicho pra plano estratégico
- @cs pesquisando produto/serviço novo do cliente
- @copywriter referência de ângulo de concorrente

## Quando NÃO usar

- Scrape em massa (10+ URLs) → use Firecrawl/Apify via Composio
- URL termina em `.md` → use WebFetch direto (já é markdown)
- Site com JS-heavy / SPA → fallback browser MCP (`hyperbrowser`/`browserbase`)

## Argumentos

```
/em5-scrape {cliente|agencia} {url}
```

## Instrução

### Passo 1 — Validar URL

Não permitir scrape de:
- Site do próprio cliente (use `/em5-site-to-video` ou leitura direta)
- Domínios autenticados (login wall)

### Passo 2 — Invocar Defuddle

A skill upstream `defuddle` chama o CLI:

```bash
npx defuddle {url} --markdown
```

Saída: markdown limpo (sem nav, sidebar, footer, ads).

### Passo 3 — Salvar artefato

```
clientes/{cliente}/inteligencia/scrape-{slug-url}-{YYYY-MM-DD}.md
```

Onde `slug-url` é o host + path principal kebab-case.

Cabeçalho do arquivo:
```markdown
# Scrape — {host/path}

**Cliente:** {cliente}
**URL:** {url completa}
**Capturado em:** {ISO timestamp}
**Tool:** defuddle CLI
**Status:** RAW (não validado, não interpretado)

---

{conteúdo markdown limpo}
```

### Passo 4 — Próximo passo

Marcar RAW. Próximo agente (geralmente @scout ou @strategist) interpreta:
- @scout `*gerar-swot` — extrai oferta, posicionamento, preço
- @copywriter `*criar-angulos` — referência de hook do concorrente
- @strategist `*analisar-briefing` — input pra plano

NÃO usar scrape direto pra cliente — sempre passar por agente que interprete + @qa.

## Integração com @scout

```yaml
# em .em5/agents/scout.md commands:
- name: scrape-site-concorrente
  description: 'Scrape rápido de 1 LP via /em5-scrape (Defuddle)'
```

## Anti-padrão

Não scrapear concorrente pra "copiar copy". Use como referência pra entender
posicionamento, depois @copywriter cria copy original do cliente.
