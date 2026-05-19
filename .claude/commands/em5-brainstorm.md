# /em5-brainstorm — Brainstorm estruturado antes de criar

**Argumento:** `/em5-brainstorm $ARGUMENTS` (ex: `/em5-brainstorm cna-vila-mariana oferta-segundo-semestre`)

## Por que existe

Antes de **qualquer trabalho criativo** (estratégia, ângulo, criativo, oferta, componente em5),
brainstorming explora intent + requisitos + design antes de implementar.

Evita: agente pular pra solução sem mapear alternativas → retrabalho.

Complementa Constitution Art. III (Artefatos sobre Conversa) — brainstorm vira artefato versionado.

## Skill upstream usada

Esta skill é **adaptador** da `superpowers:brainstorming`. Invoca a skill upstream
pra estruturar a exploração, depois salva o resultado no filesystem em5 no formato canônico.

## Argumentos

```
/em5-brainstorm {cliente} {topico}
```

- `cliente` — slug do cliente (ex: `cna-vila-mariana`) OU `agencia` (se for assunto da agência)
- `topico` — kebab-case curto do que vai brainstormar (ex: `oferta-segundo-semestre`, `angulo-vergonha`, `funil-whatsapp`)

## Instrução

Se `$ARGUMENTS` estiver incompleto, pergunte cliente + tópico.

### Passo 1 — Determinar contexto

Carregue **apenas** os arquivos relevantes pro tópico:
- Se tópico for de estratégia/oferta: ler `briefing-final.md` + `plano-estrategico.md` (se existir)
- Se tópico for de criativo/copy: ler `analise-icp.md` + último CR-XXX.md aprovado
- Se tópico for de operação: ler `log-operacional.md` últimos 7 dias
- Se cliente = `agencia`: ler `em5-config.yaml` + relevantes

### Passo 2 — Invocar skill upstream

Invoque a skill `superpowers:brainstorming` (via tool `Skill` quando disponível, ou
seguindo o protocolo dela manualmente) com o foco do tópico. A skill conduz:

1. **Intent discovery** — o que o user quer realmente alcançar?
2. **Requirements** — restrições conhecidas (verba, prazo, regulatório, branding)
3. **Alternatives** — listar 3-5 abordagens distintas, não só uma
4. **Design** — escolher 1 com justificativa explícita

### Passo 3 — Salvar artefato

Salvar em:
```
clientes/{cliente}/memoria/brainstorm-{topico}-{YYYY-MM-DD}.md
```

Estrutura mínima do arquivo:

```markdown
# Brainstorm — {topico}

**Cliente:** {cliente}
**Data:** {YYYY-MM-DD}
**Autor:** {agente ou main thread}
**Status:** EXPLORATÓRIO | DECIDIDO | DESCARTADO

## Intent
Em 1 parágrafo, o que se quer alcançar (não o como).

## Restrições
- {restrição 1 — ex: verba ≤ R$ X}
- {restrição 2 — ex: prazo até DD/MM}
- {restrição 3 — ex: política Meta proíbe Y}

## Alternativas exploradas

### A — {nome curto}
Descrição em 3-5 linhas. Pros / Contras.

### B — {nome curto}
...

### C — {nome curto}
...

## Decisão
Escolhida: **{A | B | C}**

Justificativa em 2-3 linhas (por que vence as outras).

## Próximos passos
- [ ] {agente} executa: {comando ou task}
- [ ] {agente} valida: {checagem}

## Referências
- {link/path pra artefato relacionado}
```

### Passo 4 — Handoff

Se brainstorm levou a **decisão acionável**, registrar próximo passo no log operacional:
```
clientes/{cliente}/operacao/log-operacional.md
```
Formato:
```
| {YYYY-MM-DD} | Brainstorm: {topico} | Decisão | {A/B/C} | brainstorm-{topico}-{YYYY-MM-DD}.md |
```

Se brainstorm precisa **mais input do user** (decisão exploratória), marcar status como `EXPLORATÓRIO` e pedir
ao user pra revisar antes de qualquer agente executar a decisão.

## Quando usar (e quando NÃO)

**Use ANTES de:**
- `@strategist *gerar-plano-estrategico` (decisão de oferta/ângulo macro)
- `@copywriter *criar-angulos` (quando o ângulo certo não está óbvio)
- `@designer *definir-conceito-visual` (concept não trivial)
- `@arq *entrevistar` (criar componente em5 novo)
- `/cliente-novo` em vertical desconhecida pela agência

**NÃO use pra:**
- Tasks puramente operacionais (subir campanha, gerar relatório)
- Decisões com 1 caminho óbvio (ex: "qual canal pra B2B SaaS?" → LinkedIn)
- Anti-padrão: brainstormar quando o briefing já é claro = procrastinação

## Anti-padrão

Não use brainstorm pra adiar decisão. Se brainstorm fica vago e sem fechamento, é briefing
incompleto disfarçado de criatividade — escala pro @ceo ou @strategist.
