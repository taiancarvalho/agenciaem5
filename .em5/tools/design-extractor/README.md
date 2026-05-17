# em5 — Design Extractor

> Extrai sistema de design completo de URL/briefing/screenshots → gera DESIGN.md estruturado padrão `@google/design.md`.
> Absorvido em 2026-05-17 do projeto `design-md-extractor` (Vibe Coding).

## Atribuição

Ferramenta original: `~/Documents/Vibe Coding/design-md-extractor`
Licença upstream: ISC (mantida)
Padrão de output: [@google/design.md](https://www.npmjs.com/package/@google/design.md)

## O que faz

Input: URL pública, pasta local, screenshots, HTML, CSS, ou briefing.
Output: `.em5/clientes/{slug}/branding/` com:
- `DESIGN.md` — sistema de design estruturado (consumido por @designer, @copywriter, @qa)
- `preview.html` — visualização tipo Clay/Linear pra mostrar ao cliente
- `tokens.json` — design tokens machine-readable (Lux usa em criativos)
- `theme.css` — variáveis CSS/Tailwind importáveis na LP
- `source/` — inputs originais (read-only)

## Uso no em5

### Via skill (recomendado)
```
/extrair-design {cliente-slug} {url|caminho|briefing}
```

Exemplo:
```
/extrair-design clinica-x https://www.clinicax.com.br
/extrair-design saas-b2b ~/briefings/saas-b2b.md
```

### Diretamente (@designer Lux)
```
@designer Lux *extrair-design clinica-x https://...
```

## Hard rules (Constitution-aligned)

- Output **sempre** em `.em5/clientes/{slug}/branding/` (Art. I filesystem-first)
- Source = read-only (Art. III)
- Sem inventar tokens/screenshots/motion (Art. VI honestidade)
- Mark approximations em `source/analysis-notes.md`
- Templates obrigatórios: `templates/design-board-preview.{html,css,js}`
- @designer Lux **NÃO opera sem DESIGN.md carregado** (Art. XIII — anti-papel)

## Shell mestre "Clay"

Mantido do projeto original — padrão visual da ferramenta de documentação:

- Canvas creme: `#fffaf0`
- Tipografia Inter, headlines peso 500
- Tracking negativo (`-2.5px` XL, `-2px` L, `-1px` M)
- Cor da marca extraída = **só sotaque** (badges/links), headings neutros

## Arquivos absorvidos

```
.em5/tools/design-extractor/
├── README.md (este)
├── README-original.md (atribuição upstream)
├── GEMINI-original.md (mandato Clay shell)
├── SKILL-source.md (prompt principal — 89 linhas)
├── prompt-source.toml (gemini command — 51 linhas)
├── prompt-update-source.toml (gemini update command)
├── package.json (dep: @google/design.md)
└── templates/
    ├── design-board-preview.html
    ├── design-board-preview.css
    └── design-board-preview.js
```

## Próximo passo

Após `/extrair-design`:
1. @designer Lux valida tokens (cores fazem sentido?)
2. @copywriter Eco lê "Tom de Voz" + "Personalidade da Marca"
3. @qa Crivo confere `preview.html` antes do cliente ver
4. Painel `/cliente/{slug}` renderiza preview embed

---

*em5 v1.3.x — Fase 13 (DESIGN.md extractor absorption)*
