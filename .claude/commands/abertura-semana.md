# /abertura-semana — Ritual humano 30min toda segunda

**Argumento:** `/abertura-semana` (sem args — varre todos clientes ativos)

## O que este comando faz

Ritual humano de 30min que abre a semana. 3 prioridades + 1 entrega real gerada + revisão do que ficou da semana anterior. Diferente dos crons automáticos — é momento de operador presente.

## Roteamento (CLAUDE.md Regra Absoluta 1)

Acione **@coo** com prompt:

```
@coo Nexus — operação: abertura de semana
Workflow: abertura-semana.yaml
Duração alvo: 30min
Entregas:
  - operacao/abertura-semana-{YYYY-SS}.md (3 prioridades + plano)
  - 1 entrega real gerada da prioridade #1
  - ledger atualizado (arquivado/continua/delega)
Referência:
  - .em5/workflows/abertura-semana.yaml
```

## Sequência (30min)

| Tempo | Etapa | Quem |
|-------|-------|------|
| 0-5min | Revisar semana anterior | @coo lê logs + reporta |
| 5-10min | @ceo define 3 prioridades | @ceo decide estratégico |
| 10-15min | @coo valida com workflows + capacidade | @coo cruza com perfis clientes |
| 15-25min | Gerar 1ª entrega (momentum) | @coo dispatch workflow |
| 25-30min | Registrar plano + atualizar ledger | @coo persiste |

## Filosofia

> **Momentum > planejamento.** Sai da segunda com 1 entrega real, não com plano perfeito.

Princípio: mata uma logo de cara. Se a semana acabar com só 1 entrega (a da segunda), foi semana melhor que 100 planejamentos zerados.

## Pergunta-âncora @ceo

> "Se eu não fizer absolutamente nada essa semana, o que quebra? E o que só anda mais devagar?"

Foca no que quebra. Resto delega @coo.

## Output esperado

`operacao/abertura-semana-{YYYY-SS}.md`:

```markdown
# Abertura Semana {YYYY-SS}

## Revisão semana anterior
- ENTREGUE: X tasks
- PENDENTE: Y (motivo + ação)
- ATRASADA: Z (escalation)

## 3 Prioridades semana
1. {prioridade #1} — workflow {nome} — cliente
2. {prioridade #2} — workflow {nome}
3. {prioridade #3} — workflow {nome}

## Entrega gerada hoje (momentum)
- {tipo + cliente + path}

## Ledger
- X continua / Y arquivado / Z delegado humano
```

## Quando rodar

- **Segunda 8h** — ritual padrão
- **Volta de feriado/férias** — re-orienta
- **Início de mês/trimestre** — alinha com OKRs (combina com `weekly-review-interna` sexta + `review-portfolio-mensal` dia 5)

## Anti-padrões

- Expandir pra 1h — vira reunião, perde foco
- Não gerar entrega — só planejou = perdeu momentum
- Carregar 3 tasks pendentes seguidas 2+ semanas — sinal falha sistêmica
- Pular ritual semanas seguidas — descompromete a operação

## Relação outros workflows

| Cadência | Workflow |
|----------|----------|
| Segunda 8h | **`/abertura-semana`** (este) |
| Sexta 17h | `weekly-review-interna` + `weekly-digest-whatsapp` |
| Dia 1 mês | `review-portfolio-mensal` + `relatorio-cliente` |
| Dia 15 trimestre | `qbr-trimestral` + `okrs-trimestrais` |
