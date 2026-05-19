# /em5-deck-pptx — Deck PowerPoint pra cliente/prospect

**Argumento:** `/em5-deck-pptx $ARGUMENTS` (ex: `/em5-deck-pptx prospect-acme pitch-comercial`)

## Por que existe

Reunião com cliente/prospect espera **deck** (PPTX). Markdown não passa em sala
de diretoria. PDF é estático — PPTX permite editar pra adaptar 1 slide na hora.

Adapter de `pptx`.

## Quando usar

- @vendas Caça pitch comercial pra prospect
- @cs Sol QBR (Quarterly Business Review) pro cliente
- @strategist Vera apresentação de plano estratégico
- @ceo Atlas pitch de novo serviço/portfólio

## Quando NÃO usar

- 1-slide-resumo → manda imagem ou PDF
- Conteúdo só pra leitura → PDF
- Apresentação interna da agência → markdown serve

## Argumentos

```
/em5-deck-pptx {cliente-ou-prospect} {tipo}
```

`tipo`: `pitch-comercial` | `qbr` | `apresentacao-plano` | `relatorio-mensal-deck`

## Instrução

### Passo 1 — Brainstorm da narrativa (recomendado)

Antes de gerar slides, rodar:
```
/em5-brainstorm {cliente} narrativa-{tipo}
```

Pra decidir:
- Storyarc (3 atos: problema → solução → próximos passos)
- Slide-por-slide breakdown
- Quais dados/visuais entram

Pular brainstorm = deck genérico que cliente esquece.

### Passo 2 — Carregar contexto

Por tipo:

**pitch-comercial:**
- `clientes/{prospect}/vendas/diagnostico.md`
- `em5-config.yaml` → branding agência

**qbr:**
- `clientes/{cliente}/relatorios/*.html` últimos 3 meses
- `clientes/{cliente}/estrategia/plano-estrategico.md`

**apresentacao-plano:**
- `clientes/{cliente}/estrategia/plano-estrategico.md`
- Brainstorm da narrativa

**relatorio-mensal-deck:**
- `clientes/{cliente}/relatorios/relatorio-{YYYY-MM-DD}.md` mais recente

### Passo 3 — Invocar skill upstream `pptx`

Skill upstream gera deck preservando:
- Master slide da agência (branding consistente)
- Charts (linha, barra, donut) com dados reais
- Tabelas (KPIs, comparativos)
- Imagens (logo, criativos aprovados)
- Notes do apresentador (script de fala por slide)

### Passo 4 — Salvar artefato

```
clientes/{cliente}/vendas/deck-{tipo}-{YYYY-MM-DD}.pptx
```

ou (relatórios):
```
clientes/{cliente}/relatorios/deck-{tipo}-{YYYY-MM-DD}.pptx
```

### Passo 5 — Verify + envio

- `/em5-verify {cliente} deck-{tipo}-*.pptx`
- @qa Crivo valida:
  - Logo do cliente correto
  - Números batem com fonte (relatórios HTML)
  - Sem placeholder `{{...}}` residual
  - Slide notes coerentes com slide visual
- @cs envia via Gmail (Composio) anexado ou Google Slides (Composio) compartilhado

## Estrutura mínima por tipo

### pitch-comercial (8-12 slides)
1. Capa
2. Problema (do prospect)
3. Diagnóstico (achados da análise)
4. Solução (oferta agência)
5. Resultado esperado
6. Cases relevantes (1-2)
7. Investimento + condições
8. Próximos passos

### qbr (10-15 slides)
1. Capa do trimestre
2. Highlights (3-5 wins)
3. Resultados por canal (Meta, Google, IG)
4. Funil de conversão (visual)
5. Criativos top performers
6. Aprendizados
7. Pontos de atenção
8. Plano próximo trimestre

## Anti-padrão

Não gerar deck com texto genérico ("nosso compromisso é com excelência").
Cada slide deve ter dado/insight específico do cliente.
