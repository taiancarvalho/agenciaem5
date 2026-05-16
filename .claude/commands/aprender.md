# /aprender — Consulta Learnings do em5

> Lê últimos 30 dias de `.em5/learnings/` e sugere padrões aplicáveis ao contexto.
> Promessa em5: insight em ≤ 5 min.

## Uso

```
/aprender [categoria] [filtros]
```

**Exemplos:**
- `/aprender` — sumário geral dos últimos 30 dias (top 5 padrões por categoria)
- `/aprender qa-bloqueios` — padrões recorrentes de bloqueio
- `/aprender copy-vitorias --nicho clinica-odonto` — ângulos vencedores filtrados por nicho
- `/aprender traffic-padroes --canal meta` — configs Meta com ROAS > 3

## Categorias disponíveis

`qa-bloqueios`, `qa-overrides`, `copy-vitorias`, `traffic-padroes`, `cs-objecoes`, `strategist-hipoteses`, `designer-padroes`, `system-errors`

## Fluxo

1. @coo (Nexus) recebe `/aprender $ARGUMENTS`
2. Lê arquivos de `.em5/learnings/{ano-mes}/` (último mês completo + mês corrente)
3. Filtra por tags se houver flag `--nicho`, `--canal`, `--severity`
4. Sintetiza: top 5 padrões, tendências, alertas
5. Salva síntese em `.em5/learnings/_sinteses/{data}-{categoria}.md` se útil
6. Retorna direto pro user (≤ 5 min)

## Quando chamar

- **Antes de `/campanha`** — checar ângulos validados pro nicho
- **Antes de `/cliente-novo`** — checar objeções recorrentes
- **Após bloqueio @qa** — entender se é padrão ou exceção
- **Semanal** — review geral

## Critério de saída

Resposta enxuta, acionável, ≤ 5 min de leitura. Sem relatório longo. Insights aplicáveis na próxima ação.

---

*em5 v1.1 — Fase 1.2 (Learnings Automatizado)*
