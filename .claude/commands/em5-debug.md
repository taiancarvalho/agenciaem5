# /em5-debug — Debug sistemático quando algo dá errado

**Argumento:** `/em5-debug $ARGUMENTS` (ex: `/em5-debug cna-vila-mariana cpl-disparou-3x`)

## Por que existe

Audit mostrou: agentes chutavam quando algo dava errado. Campanha com CPL 3x acima
do baseline, agente improvisava "tentar criativo novo". `systematic-debugging`
estrutura raciocínio: hipóteses → evidências → root cause → ação.

Adapter de `superpowers:systematic-debugging`.

## Quando usar

- Campanha com performance anormal (CPL 2x+, CTR -50%, gasto sem entrega)
- Tracking quebrado (eventos sem disparo, pixel offline)
- Workflow em5 trava em meio (agente não responde, output inconsistente)
- Composio toolkit falhou silenciosamente (token expirou, conta errada)
- Cliente reportou "não tá funcionando" (vago — debug pra concretizar)

## Quando NÃO usar

- Tarefa óbvia ("subir campanha" não é debug)
- Decisão estratégica → `/em5-brainstorm`
- Erro de processo, não de sistema → revisar workflow YAML

## Argumentos

```
/em5-debug {cliente|agencia} {sintoma}
```

`sintoma` = kebab-case do problema observado.

## Instrução

### Passo 1 — Carregar contexto mínimo

Dependendo do sintoma:
- Performance: `.em5/clientes/{cliente}/trafego/` + `relatorios/*`
- Tracking: `setup-tecnico/status.md`
- Workflow: `operacao/log-operacional.md` últimos 7 dias

### Passo 2 — Invocar skill upstream

`superpowers:systematic-debugging` conduz:

1. **Reproduce** — confirma sintoma (não chuta sem ver)
2. **Hipóteses** — lista 3-5 causas possíveis ranqueadas
3. **Evidência** — pra cada hipótese, que dado confirma/refuta
4. **Coletar dado** — Composio query, file read, log lookup
5. **Root cause** — qual hipótese sobreviveu
6. **Ação** — fix proposto + critério de validação

### Passo 3 — Salvar artefato

```
.em5/clientes/{cliente}/operacao/debug-{sintoma}-{YYYY-MM-DD}.md
```

Estrutura:
```markdown
# Debug — {sintoma}

**Cliente:** {cliente}
**Data:** {YYYY-MM-DD}
**Agente:** {quem rodou}
**Status:** EM_INVESTIGAÇÃO | ROOT_CAUSE_ENCONTRADA | RESOLVIDO

## Sintoma observado
{descrição concreta — não vaga}
**Reprodução:** {passos pra ver o problema}

## Hipóteses (ranqueadas por probabilidade)

### H1 — {hipótese mais provável}
- Evidência confirmando: {dado X = valor Y}
- Evidência refutando: {dado X' = valor Y'}
- Veredicto: CONFIRMADA | REFUTADA | INCONCLUSIVA

### H2 — ...
### H3 — ...

## Root cause
{Qual hipótese sobreviveu + por quê}

## Ação proposta
- {ação concreta acionável}
- Critério de sucesso: {métrica X volta pra Y até Z}

## Quem executa
@{agente} via `*{task}` ou `/em5-{skill}`

## Lição aprendida
{Pra evitar mesmo problema no futuro — vira entry em .em5/learnings/}
```

### Passo 4 — Handoff

- Root cause encontrada → @coo dispatcha ação pro agente certo
- Inconclusiva → escala pro @ceo Atlas (decisão de mais investigação ou pivotar)
- Lição relevante → grava em `.em5/learnings/{categoria}/{lesson}-{YYYY-MM-DD}.md`

## Anti-padrão

Não usar `/em5-debug` pra justificar ficar em análise infinita. Se 3 hipóteses
todas inconclusivas após coletar dado → escala pro user com pergunta específica
em vez de continuar adivinhando.

## Integração com /em5-verify

Quando @qa detecta inconsistência, debug entra antes de devolver pro agente
dono. Ordem:

```
@qa pega inconsistência
    ↓
/em5-debug {cliente} {inconsistência}
    ↓
Root cause: erro do agente OU erro de processo OU erro de dado
    ↓
Devolve ação específica
```
