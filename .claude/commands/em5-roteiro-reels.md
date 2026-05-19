# /em5-roteiro-reels — Roteiro de Reels Instagram (instant-value)

**Argumento:** `/em5-roteiro-reels $ARGUMENTS` (ex: `/em5-roteiro-reels cna-vila-mariana ingles-em-3-passos`)

## Por que existe

Roteiros de Reels que **funcionam pro algoritmo IG** têm padrão específico:
gancho em 1s, valor instantâneo, CTA pra comentar (gera interação → reach).

Esta skill é **adapter** da `instant-value-reels` aplicada ao em5. Output canônico
no filesystem do cliente, ID versionado, registrado no log de performance criativa.

## Diferença vs `/em5-brainstorm` ou `*escrever-copy`

- `brainstorm` decide o **conceito** (qual oferta? qual ângulo?)
- `*escrever-copy` cria copy genérica de anúncio (pago, várias formas)
- `/em5-roteiro-reels` cria roteiro **específico de Reels orgânico** (gancho-valor-CTA-comentário)

Use depois do `/em5-brainstorm` (se conceito não trivial) e antes do @qa.

## Argumentos

```
/em5-roteiro-reels {cliente} {tema}
```

- `cliente` — slug do cliente
- `tema` — kebab-case curto (ex: `ingles-em-3-passos`, `cna-kids-rotina`, `medo-de-falar`)

## Instrução

Se `$ARGUMENTS` estiver incompleto, pergunte cliente + tema.

### Passo 1 — Contexto mínimo

Carregue (Constitution Art. IV — contexto reduzido):
- `.em5/clientes/{cliente}/onboarding/briefing-final.md` (oferta, ICP)
- `.em5/clientes/{cliente}/estrategia/plano-estrategico.md` (ângulo macro, se existir)
- `.em5/clientes/{cliente}/copy/analise-icp.md` (dor, linguagem)

### Passo 2 — Invocar skill upstream

Invoque `instant-value-reels` passando contexto:
- Tema definido
- ICP do cliente
- Oferta principal (pra gancho de valor)
- Restrição: roteiro deve gerar comentários "EU QUERO" / "ME MANDA" (não engagement vago)

A skill é **principle-driven** — não é template fixo. Foco em:
- **Gancho em 1s** (não 3s) — pattern interruption visual ou verbal
- **Valor instantâneo** — entrega 1 coisa útil DENTRO do reel, não promete pra DM
- **CTA específico** — palavra-código pra comentar (ex: "EU QUERO O TEMPLATE")
- **DM automation** — comentário gatilha DM com material complementar
- **Sem motivacional vazio** — se cai em "acredite em você", refaz

### Passo 3 — Salvar artefato

Salvar em:
```
.em5/clientes/{cliente}/copy/CR-{NNN}-reels-{tema}.md
```

Onde `NNN` = próximo número incremental (verificar pasta `copy/` antes).

Estrutura mínima:

```markdown
# Reels — {tema}

**Cliente:** {cliente}
**ID:** CR-{NNN}-v1
**Canal:** Instagram Reels (orgânico)
**Objetivo:** Gerar comentários "{palavra-código}" → DM automation
**ICP alvo:** {ICP do plano estratégico}
**Data:** {YYYY-MM-DD}
**Autor:** @copywriter Eco

---

## Gancho (0-1s)
{texto curto · pattern interruption}

## Desenvolvimento (1-15s)
{passo 1 · passo 2 · passo 3 — valor entregue NO reel}

## CTA (15-20s)
"Comente **{palavra-código}** que mando o {material complementar}."

## Material complementar (entregue via DM)
- {o que vai pra DM quem comentar}
- {link/PDF/template/checklist}

## Texto da legenda
{copy da legenda — repete CTA com hashtags}

## Hashtags sugeridas
{5-10 hashtags relevantes pro nicho}

## Cena visual (briefing pro @designer Lux)
{descrição de cada plano · luz · pessoa · cenário · texto na tela}

## Métricas de sucesso
- Comentários com palavra-código: meta {N}/dia
- Reach: comparar com baseline orgânico do cliente
- DM automation: % de resposta no template
```

### Passo 4 — Registrar no log

`.em5/clientes/{cliente}/operacao/log-performance-criativa.md`:
```
| {YYYY-MM-DD} | CR-{NNN}-reels-{tema} | Reels | Orgânico IG | PENDENTE @qa | comentários="{palavra-código}" |
```

### Passo 5 — Handoff

Próximo passo: @designer Lux cria cena visual + `/em5-verify` + @qa Crivo valida.

Anti-padrão: gravar antes de @qa aprovar. Se gancho não passa em 1s no roteiro,
não vai passar em vídeo.

## Quando NÃO usar

- Anúncio pago (use `*escrever-copy` ou `*adaptar-canal`)
- Conteúdo educacional longo (Reels >30s perde alcance — use carrossel)
- Promoção direta (sem valor entregue dentro do reel = baixa retenção)

## Setup necessário no cliente

- DM automation configurada (ManyChat, Respond.io, ou nativo) com gatilho na palavra-código
- Material complementar pronto antes do reel ir ao ar
- ICP no plano estratégico (sem isso, gancho é genérico)
