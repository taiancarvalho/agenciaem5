---
name: extrair-design
agent: designer
description: Extrai DESIGN.md estruturado do cliente via design-extractor (URL/briefing/screenshots)
inputs:
  - cliente_slug
  - fonte: URL | caminho-arquivo | caminho-pasta
outputs:
  - .em5/clientes/{slug}/branding/DESIGN.md
  - .em5/clientes/{slug}/branding/preview.html
  - .em5/clientes/{slug}/branding/tokens.json
  - .em5/clientes/{slug}/branding/theme.css
  - .em5/clientes/{slug}/branding/source/
elicit: true
model_tier: balanced
tool_dependency: .em5/tools/design-extractor/
mcp_toolsets:
  - composio.firecrawl  # se fonte for URL
---

# Task: extrair-design

## Objetivo

Em ≤ 5 min de input humano, transformar fonte caótica (site, briefing, screenshots) em sistema de design estruturado consumível por @copywriter, @qa e painel.

## Pré-requisitos

- Cliente existe em `.em5/clientes/{slug}/`
- `.em5/clientes/{slug}/branding/` existe (criado por `/cliente-novo`)
- Se fonte=URL: Composio `firecrawl` toolset ativo
- `.em5/tools/design-extractor/` disponível (Fase 13.1)

## Passo a passo

### 1. Validação

- `slug` está em `.em5/clientes/`?
- `fonte` é URL válida OU caminho existente?
- `branding/DESIGN.md` já existe? → confirmar overwrite com user

### 2. Coletar fonte

Conforme tipo:
- **URL:** `composio.firecrawl.crawl_url(fonte, max_pages: 8, capture_screenshots: true)`
- **Arquivo local:** read direto
- **Pasta local:** walk + filter (imagens, .html, .css, briefings)
- **Screenshots:** read direto pra `source/screenshots/`

### 3. Salvar source/

`.em5/clientes/{slug}/branding/source/`:
- `source-url.txt` OU `source-path.txt`
- `screenshots/` (se aplicável)
- `analysis-notes.md` (initial — preenche durante análise)

### 4. Aplicar prompt extractor

Carrega `.em5/tools/design-extractor/SKILL-source.md` (89 linhas — fonte da verdade).
Aplica regras:
- Padrão Clay shell (canvas `#fffaf0`, Inter peso 500, tracking negativo)
- Nome ferramenta `_thebrandbook` na sidebar do preview
- Cor da marca = só sotaque, headings neutros
- Templates obrigatórios `.em5/tools/design-extractor/templates/design-board-preview.{html,css,js}`

### 5. Gerar outputs

```
.em5/clientes/{slug}/branding/
├── DESIGN.md         # sistema estruturado
├── preview.html      # visual Clay-style
├── tokens.json       # design tokens
├── theme.css         # CSS variables / Tailwind
└── source/           # inputs originais (read-only)
```

### 6. Honestidade (Art. VI)

Em `source/analysis-notes.md` marca:
- Confidence: High | Medium | Low
- Tokens aproximados (cores estimadas por screenshot sem CSS)
- Iconografia genérica vs específica do cliente
- Motion: indisponível por padrão (URL não captura animação)

### 7. Validação @qa

Notifica `@qa Crivo *validar-design {slug}` antes do cliente ver preview.html.

### 8. Notificações downstream

- `@copywriter Eco`: "DESIGN.md disponível em `clientes/{slug}/branding/` — leia seção 'Tom de Voz' antes de escrever copy"
- Painel: rebuild dispara próximo build (manual ou cron)

## Critério de saída

- 5 arquivos em `branding/` (DESIGN.md, preview.html, tokens.json, theme.css, source/)
- analysis-notes.md com confidence + approximations marcadas
- @qa Crivo notificado
- @copywriter Eco notificado

## Anti-padrão

- NÃO sobrescrever DESIGN.md existente sem `--force` ou confirmação
- NÃO inventar tokens (cores, fontes, spacing)
- NÃO preview shallow (precisa do template Clay completo)
- NÃO operar sem Composio firecrawl se fonte=URL (fallback: pede screenshots manuais)

## Log

| {data} | DESIGN-EXTRACT | Lux | {slug} extraído de {fonte} confidence={conf} | CONCLUÍDO | @qa Crivo validar |
