# /extrair-design — Extrai DESIGN.md do cliente

> URL/briefing/screenshots → sistema de design estruturado em ≤ 5 min.
> Output em `clientes/{slug}/branding/` com DESIGN.md + preview.html + tokens.json + theme.css.

## Uso

```
/extrair-design {cliente_slug} {fonte}
```

**Fontes suportadas:**
- URL pública: `/extrair-design clinica-x https://www.clinicax.com.br`
- Arquivo de briefing: `/extrair-design saas-b2b ~/briefings/saas-b2b.md`
- Pasta local: `/extrair-design ecom ~/projects/ecom-existente/`
- Screenshots: `/extrair-design startup ~/screenshots/startup/`

## Fluxo

```
/extrair-design {slug} {fonte}
  ↓
@designer Lux invoca .em5/infra/tools/design-extractor/SKILL-source.md
  ↓
Composio firecrawl scrape (se URL) ou ler local
  ↓
Aplica padrão Clay (preview.html sidebar "_thebrandbook")
  ↓
Output em clientes/{slug}/branding/:
  ✓ DESIGN.md (sistema completo)
  ✓ preview.html (visual pro cliente)
  ✓ tokens.json (machine-readable)
  ✓ theme.css (importável LP)
  ✓ source/ (read-only, com analysis-notes.md)
  ↓
@qa Crivo valida preview antes do cliente ver
  ↓
Notifica @copywriter Eco (tom de voz disponível)
```

## Critério em5

≤ 5 min de input humano:
- `slug` + `fonte` = 2 args
- Resto = automatizado

## Quando usar

- **`/cliente-novo`** chama automaticamente (Fase 13.5)
- **Cliente novo sem brand** definido — extrai do site atual
- **Rebrand** — extrai brand antiga + cria DESIGN-v2.md ao lado
- **Auditoria competitiva** — extrai brand de concorrente (uso interno @scout)

## Output esperado

`clientes/{slug}/branding/`:
```
├── DESIGN.md
├── preview.html
├── tokens.json
├── theme.css
└── source/
    ├── source-url.txt OR source-path.txt
    ├── analysis-notes.md (approximations marcadas)
    └── screenshots/
```

## Anti-padrão

- NÃO inventa tokens (Art. VI honestidade)
- NÃO sobrescreve DESIGN.md existente sem confirmação user
- NÃO renderiza preview "shallow" — padrão Clay obrigatório
- NÃO opera sem `slug` válido (cliente precisa existir em `clientes/`)

## Próximos passos automáticos

Após sucesso:
1. `@designer Lux` carrega DESIGN.md como base pra criativos
2. `@copywriter Eco` lê "Tom de Voz" antes de escrever copy
3. `@qa Crivo` adiciona "confere brand" no checklist
4. Painel `/cliente/{slug}` renderiza preview embed

---

*em5 v1.3.x — Fase 13 (DESIGN.md extractor)*
