# /abertura-semana — Ritual humano 30min

**Argumento:** `/abertura-semana` (sem args)

## Classificação
**Híbrido** → @coo executa rotina + @ceo decide 3 prioridades

## Roteamento

```
@coo Nexus — operação: abertura-semana
Receita: abertura-semana
Duração alvo: 30min
Inputs: logs operacionais última semana + tickets recentes (historico/)
Referência: .em5/receitas/abertura-semana.md
```

## Quando rodar

- Cron segunda 8h (manual no Desktop / automático CLI)
- Volta feriado/férias
- Início mês/trimestre

## Output

- `operacao/abertura-semana-{YYYY-SS}.md` (3 prioridades + plano)
- 1 entrega real gerada (ticket fechado)

## Filosofia

> **Momentum > planejamento.** Sai da segunda com 1 entrega real, não com plano perfeito.
