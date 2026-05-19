# /em5-paralelo — Dispatch paralelo de agentes independentes

**Argumento:** `/em5-paralelo $ARGUMENTS` (ex: `/em5-paralelo cna-vila-mariana onboarding-completo`)

## Por que existe

@coo Nexus historicamente dispatcha agentes em série. Audit mostrou: paralelização
da auditoria (@strategist + @scout simultâneos) cortou tempo em 50%.

Tasks **independentes** (sem dependência de estado entre si) devem rodar em paralelo.

Adapter de `superpowers:dispatching-parallel-agents`.

## Quando usar (2+ tasks independentes)

| Cenário | Agentes paralelos |
|---|---|
| Onboarding cliente novo | @cs (briefing) + @scout (concorrência) + @strategist (análise inicial) |
| Auditoria conta + competitiva | @traffic (audit Meta) + @scout (competitiva) |
| Diagnóstico full | @traffic + @scout + @strategist em paralelo, depois @ceo consolida |
| Relatório mensal multi-canal | @traffic (Meta) + @cs (IG orgânico) + @fin (financeiro) |

## Quando NÃO usar

- Tasks com dependência de estado (ex: @copywriter depende de @strategist → série)
- Workflow já documentado sequencial (`ciclo-campanha.yaml` — sério é por design)
- Apenas 1 agente envolvido

## Argumentos

```
/em5-paralelo {cliente|agencia} {topico}
```

## Instrução

### Passo 1 — Identificar tasks independentes

Mapear quais agentes podem rodar **sem precisar do output do outro**.

Test: "se rodar A e B simultaneamente, qual fica esperando o outro?" Se zero → paraleliza.

### Passo 2 — Invocar skill upstream

`superpowers:dispatching-parallel-agents` dispara cada agente como subagente
em mensagem única com múltiplas tool calls.

### Passo 3 — Contexto mínimo por agente (Art. IV)

Cada agente recebe APENAS:
- Cliente alvo
- Task específica (1 frase)
- Path do artefato de input (se houver)
- Path canônico do output esperado

Não mandar histórico completo da sessão (inflaria token por subagente).

### Passo 4 — Coletar outputs

Skill upstream agrega resultados. Cada subagente reportou:
- Path do artefato gerado
- Total tokens consumido
- Erros/avisos

### Passo 5 — Consolidar artefato

Salvar em:
```
clientes/{cliente}/operacao/paralelo-{topico}-{YYYY-MM-DD}.md
```

Estrutura:
```markdown
# Dispatch Paralelo — {topico}

**Cliente:** {cliente}
**Data:** {YYYY-MM-DD}
**Agentes:** {n} agentes em paralelo
**Tempo wall-clock:** {min} (vs {min série estimado})
**Tokens totais:** {soma}

## Tasks dispachadas

### @{agente1}
- Task: {task}
- Output: {path}
- Tokens: {n}
- Status: ✅ | ⚠️ | 🚫

### @{agente2}
...

## Consolidação
{Resumo: o que cada agente entregou, próximo passo}

## Handoff
{Qual agente entra agora — se houver agente que **depende** dos outputs paralelos}
```

## Anti-padrão

Não paralelizar sem checar dependência. Se @copywriter precisa do ICP do
@strategist, paralelizar quebra workflow.

## Limites

- Máximo recomendado: 3 agentes simultâneos
- Acima disso: token consumption explode, gerenciamento de erro complica
- 4+ tasks independentes → batch 3 em paralelo + 1 sequencial

## Integração com `/em5-plano`

Plano explícito do `/em5-plano` lista quais Steps são paralelizáveis. Marcação:
```markdown
### Step 2 — Análise competitiva
- Agente: @scout
- **Paralelo com:** Step 3 (@strategist análise)
```

@coo lê plano, identifica Steps paralelizáveis, dispatcha via `/em5-paralelo`.
