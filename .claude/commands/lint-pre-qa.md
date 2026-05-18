# /lint-pre-qa — Lint mecânico antes do @qa

**Argumento:** `/lint-pre-qa $ARGUMENTS` (ex: `/lint-pre-qa odontovital copy CR-001`)

## O que este comando faz

Roda checagens **mecânicas** sobre copy, criativos, campanhas ou landing pages **antes** do @qa/Crivo emitir veredicto subjetivo. Bloqueia erros operacionais óbvios (char count, nomenclatura, palavras proibidas) sem ocupar o @qa.

Crivo continua sendo gate final — esta skill só pré-filtra ruído mecânico.

## Por que existe

@qa/Crivo é caro e julga subjetivo (gancho, oferta, coerência estratégica). Não faz sentido ele rejeitar copy só porque headline tem 41 chars. Lint mecânico resolve antes.

Complementa Constitution Art. VIII (Quality Gate Obrigatório). Não substitui.

## Argumentos

```
/lint-pre-qa {cliente} {tipo} [arquivo]
```

- `cliente` — slug do cliente (ex: `odontovital`)
- `tipo` — `copy` | `criativo` | `campanha` | `landing-page` | `tudo`
- `arquivo` — opcional, caminho relativo ou ID (ex: `CR-001`). Sem este, varre toda a pasta do tipo

## Instrução

Se `$ARGUMENTS` estiver incompleto, pergunte cliente + tipo.

### Passo 1 — Carregar regras

Ler `.em5/core/data/lint-rules.yaml`. Carregar bloco `{tipo}`.

### Passo 2 — Mapear arquivos alvo

| Tipo | Pasta |
|------|-------|
| copy | `.em5/clientes/{cliente}/copy/` |
| criativo | `.em5/clientes/{cliente}/design/` |
| campanha | `.em5/clientes/{cliente}/trafego/estrutura-campanhas.md` |
| landing-page | `.em5/clientes/{cliente}/setup-tecnico/` |

Se `arquivo` foi passado, filtrar.

### Passo 3 — Rodar checagens

Para cada arquivo:

**Copy:**
- Extrair blocos (Texto Principal, Headline, Descrição) por marcadores markdown
- Contar caracteres de cada bloco
- Comparar com limites do canal (Meta/Google/WhatsApp) em `lint-rules.yaml`
- Verificar presença de CTA (verbo imperativo)
- Buscar palavras proibidas (case-insensitive)
- Marcar cada finding com severidade

**Criativo:**
- Verificar nome do arquivo bate com regex `CR-\d{3}-v\d+\.(jpg|png|mp4|...)$`
- Confirmar copy associada existe
- Conferir aspect ratio declarado vs requerido (quando metadados disponíveis)

**Campanha:**
- Aplicar regex de nomenclatura
- Verificar pixel, budget, URL com UTM em `estrutura-campanhas.md`
- Confirmar ao menos 1 criativo APROVADO em `log-operacional.md`

**Landing page:**
- Buscar tag de conversão (pixel) no <head>
- Buscar CTA acima da dobra (heurística: primeiros 800 chars de body)
- Validar formulário tem endpoint

### Passo 4 — Gerar relatório

Salvar em `.em5/clientes/{cliente}/operacao/lint-{YYYY-MM-DD}.md`:

```markdown
# Lint pré-@qa — {cliente} — {YYYY-MM-DD}

**Tipo:** {tipo}
**Escopo:** {arquivo ou "toda a pasta"}
**Veredicto:** ✅ APROVADO | ⚠️ AVISOS | 🚫 BLOQUEADO

## Findings

### 🚫 Bloqueios
- [arquivo]: descrição do erro · regra: {regra}

### ⚠️ Avisos
- [arquivo]: descrição · regra: {regra}

### ✅ Pass
- [arquivo]: passou em todas as regras aplicáveis

## Próximo passo
{
  Se APROVADO: "Encaminhar pro @qa para validação subjetiva"
  Se AVISOS: "Pode ir pro @qa com lista de alertas anexada"
  Se BLOQUEADO: "Devolver pro autor ({agente}) corrigir antes do @qa"
}
```

### Passo 5 — Decisão de fluxo

- **APROVADO ou AVISOS** → marcar no log: `Lint OK em {data}` → @qa pode entrar
- **BLOQUEADO** → devolver pro agente autor (Eco/Lux/Pulse) com lista de erros mecânicos. @qa NÃO é acionado ainda.

## Integração com fluxo padrão

```
Eco/Lux/Pulse cria artefato
    ↓
/lint-pre-qa cliente tipo
    ↓
🚫 BLOQUEADO → devolve pro autor
✅ APROVADO ou ⚠️ AVISOS → @qa entra
    ↓
@qa emite veredicto formal (APROVADO/REVISÃO/BLOQUEADO)
    ↓
@cs publica/envia
```

## Não faz

- Não substitui @qa (Art. VIII permanece)
- Não julga gancho, oferta, posicionamento (papel do @qa + @strategist)
- Não corrige erros automaticamente — só reporta
