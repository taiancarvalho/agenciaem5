# /em5-plano — Plano de execução explícito antes de delegar

**Argumento:** `/em5-plano $ARGUMENTS` (ex: `/em5-plano cna-vila-mariana ativacao-trimestral`)

## Por que existe

@ceo/@coo improvisam orquestração de workflows complexos. Audit mostrou: agentes
pulam etapas (workflow de criativos), retrabalho dispara. Plano explícito antes
de delegação evita 22% do desperdício.

Adapter de `superpowers:writing-plans`.

## Quando usar

- Workflow envolvendo **3+ agentes** sequenciais (campanha, onboarding completo, ativação)
- Decisão complexa do @ceo (novo serviço, vertical nova)
- Spec de componente em5 novo (@arq desenha spec via plano antes de @builder implementar)
- Trimestre/mês de operação de cliente com múltiplas frentes

## Quando NÃO usar

- Task atômica (`@traffic *auditar-conta`)
- Decisão óbvia (canal pra B2B SaaS = LinkedIn)
- Workflow já documentado (`ciclo-campanha.yaml`)

## Argumentos

```
/em5-plano {cliente|agencia} {topico}
```

## Instrução

1. Carregar contexto mínimo (Art. IV)
2. Invocar `superpowers:writing-plans` com goal + constraints
3. Salvar plano em:
   ```
   clientes/{cliente}/operacao/plano-{topico}-{YYYY-MM-DD}.md
   ```
   (ou `.em5/planos/` se topico for da agência)

## Estrutura do plano gerado

```markdown
# Plano — {topico}

**Cliente/Agência:** {cliente}
**Data:** {YYYY-MM-DD}
**Autor:** @ceo Atlas / @arq Arq / @coo Nexus
**Status:** DRAFT | APROVADO | EM_EXECUÇÃO | CONCLUÍDO

## Goal
{O que se quer alcançar — outcome mensurável}

## Constraints
- {restrição 1: verba, prazo, dependência externa}
- {restrição 2}

## Critério de sucesso
- {métrica X atinge valor Y até data Z}

## Steps (sequencial, 1-N)

### Step 1 — {nome}
- Agente: {agente}
- Comando: `@{agente} *{task}` ou `/em5-{skill}`
- Input: {artefato/dado necessário}
- Output esperado: {artefato gerado}
- Verify: `/em5-verify` ou checklist específico
- Estimativa: {min/horas}

### Step 2 — {nome}
- Depende de: Step 1
- ...

## Riscos & mitigação
- Risco: {o que pode dar errado}
- Mitigação: {como detectar/recuperar}

## Próximo passo
{Quem executa Step 1 — agente + quando}
```

## Handoff

Após plano APROVADO pelo @ceo:
- @coo Nexus pega o plano e dispatcha cada Step pro agente certo
- Cada Step gera artefato listado no plano
- Plano vira o "ground truth" de execução — desvios viram log entry

## Integração com /em5-brainstorm

```
/em5-brainstorm  (decide O QUÊ)
    ↓
/em5-plano       (decide COMO + QUEM + ORDEM)
    ↓
@coo dispatcha
```

## Anti-padrão

Não usar plano pra justificar inação. Se plano dura mais que 30min pra
escrever, é briefing incompleto disfarçado de planejamento — escala pro user.
