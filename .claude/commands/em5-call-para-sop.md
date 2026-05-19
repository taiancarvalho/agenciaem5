# /em5-call-para-sop — Transcrição de call → SOP estruturado

**Argumento:** `/em5-call-para-sop $ARGUMENTS` (ex: `/em5-call-para-sop cna-vila-mariana setup-walda-whatsapp`)

## Por que existe

Calls com cliente, com Walda (operador), com prospect — geram conhecimento operacional
crítico que vira só "anotação no caderno" e se perde. Esta skill **converte transcrição
não-estruturada em SOP versionado**, sem ambiguidade de ordem.

É **adapter** da skill upstream `generating-structured-sops` aplicada ao em5.

## Quando usar

- Pós-call comercial com prospect (vira playbook de objeção)
- Pós-call onboarding com cliente novo (vira SOP de setup técnico)
- Pós-call com operador (Walda WhatsApp) — vira SOP de SLA de resposta
- Transcrição de áudio recebido via WhatsApp do cliente
- Documentação de "como fazer X" que o user gravou pra explicar

## Argumentos

```
/em5-call-para-sop {cliente} {topico}
```

- `cliente` — slug do cliente (ou `agencia` se for SOP interno)
- `topico` — kebab-case curto do que o SOP cobre (ex: `setup-walda-whatsapp`, `objecao-preco-segundo-semestre`)

## Instrução

Se `$ARGUMENTS` estiver incompleto, pergunte cliente + tópico **e** peça pra user
indicar fonte da transcrição (path arquivo, paste no chat, ou link Composio/Drive).

### Passo 1 — Obter transcrição

Fontes possíveis:
- **Arquivo local** — path direto (`.txt`, `.md`, `.srt`)
- **Áudio bruto** — invocar `gladia-automation` ou `deepgram-automation` (via Composio) pra transcrever primeiro
- **Drive/Docs** — `googledrive-automation` / `googledocs-automation`
- **Paste direto** — user cola no chat

Se for áudio em `clientes/{cliente}/audios/{nome}.mp3`:
1. Invocar Composio `gladia` ou `deepgram` para transcrever
2. Salvar transcrição em `clientes/{cliente}/audios/{nome}.txt` antes de processar

### Passo 2 — Invocar skill upstream

Invoque `generating-structured-sops` com:
- Transcrição completa
- Tópico definido
- Contexto: SOP é pra agência de marketing (linguagem operacional, não acadêmica)

A skill converte texto solto em SOP **sequencial, sem ambiguidade**, separando:
- Pré-requisitos
- Passos numerados
- Decisões / branching (se X então Y)
- Outputs esperados
- Anti-padrões

### Passo 3 — Salvar artefato

Salvar em:
```
clientes/{cliente}/sops/{topico}-v1.md
```

Se cliente = `agencia`:
```
.em5/sops/{topico}-v1.md
```

Versionar (`v1`, `v2`, ...) — SOPs evoluem. Sempre criar v2 ao iterar, nunca sobrescrever v1.

Estrutura mínima do arquivo:

```markdown
# SOP — {topico}

**Cliente/Agência:** {cliente}
**Versão:** v1
**Data:** {YYYY-MM-DD}
**Fonte:** {arquivo/call/áudio original}
**Autor:** @cs Sol (ou agente responsável)
**Status:** RASCUNHO | APROVADO | DEPRECATED

## Quando aplicar
{contexto — em qual situação seguir este SOP}

## Pré-requisitos
- [ ] {acesso necessário}
- [ ] {ferramenta configurada}
- [ ] {informação prévia obtida}

## Passos sequenciais

### 1. {nome do passo}
- Ação: {ação concreta}
- Output esperado: {o que deve estar pronto após este passo}
- Quem executa: {agente / humano}

### 2. {nome do passo}
- Ação: {ação concreta}
- Decisão: se {condição} então pular pro passo {N}, senão continuar
- Output esperado: ...

### 3. ...

## Outputs finais
- {arquivo/estado gerado}
- {confirmação esperada do cliente}
- {métrica/log atualizado}

## Anti-padrões
- ❌ {erro comum 1 — porque acontece}
- ❌ {erro comum 2}

## Casos especiais
- **Se {condição rara}** → executar SOP `{outro-sop}` antes

## Histórico de revisões
| Versão | Data | Mudança | Autor |
|--------|------|---------|-------|
| v1 | {data} | Criação a partir de {fonte} | @cs Sol |
```

### Passo 4 — Registrar índice

Atualizar índice de SOPs do cliente em:
```
clientes/{cliente}/sops/INDEX.md
```

Se não existir, criar com cabeçalho:
```markdown
# SOPs — {cliente}

| Tópico | Versão | Status | Última revisão |
|--------|--------|--------|----------------|
| {topico} | v1 | RASCUNHO | {YYYY-MM-DD} |
```

### Passo 5 — Verify + QA

- Rodar `/em5-verify {cliente} sops/{topico}-v1.md`
- Se PRONTO → @qa Crivo valida sequência (sem passo ambíguo, sem decisão sem branching declarado)
- Aprovado → marcar `APROVADO` no front-matter e índice

## Quando NÃO usar

- Anotação solta de reunião (use `memoria/notas-sessao.md` direto)
- Decisão única e simples (não vira SOP, vira log entry)
- Documento que muda toda semana (SOPs assumem estabilidade — se muda demais, é workflow)

## Anti-padrão

Não usar `/em5-call-para-sop` pra documentar tudo que foi conversado. SOP é sobre
**procedimento repetível**. Se transcrição é discussão estratégica, vira `brainstorm-*.md`
via `/em5-brainstorm` em vez de SOP.

## Integração com `/aprender` (Fase 1.2 planejada)

Quando `/aprender` for implementada (consulta de learnings antes de criar componente),
SOPs serão fonte primária de "como a agência já fez antes". Cada SOP novo aumenta o
acervo institucional consultável.
