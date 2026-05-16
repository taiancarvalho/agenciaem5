# em5 Learnings — Template

> Sistema de captura contínua de aprendizados operacionais.
> Estrutura mensal: `.em5/learnings/{YYYY-MM}/{categoria}.md`.

## Categorias

| Arquivo | Captura | Quem alimenta |
|---------|---------|---------------|
| `qa-bloqueios.md` | Padrões recorrentes de bloqueio do @qa Crivo | @qa |
| `qa-overrides.md` | Overrides de severity=alto + justificativa | @ceo / @strategist |
| `copy-vitorias.md` | Ângulos/copies que converteram (CTR/CPL bons) | @copywriter |
| `traffic-padroes.md` | Configs de campanha com ROAS > 3 ou CPA < target | @traffic |
| `cs-objecoes.md` | Objeções de cliente novo + resposta vencedora | @cs |
| `strategist-hipoteses.md` | Hipóteses validadas vs falhadas | @strategist |
| `designer-padroes.md` | Layouts/formatos com melhor performance visual | @designer |
| `system-errors.md` | Erros do sistema (workflows quebrados, MCPs fora) | qualquer agente |

## Formato de entrada

```markdown
## {YYYY-MM-DD} — {tópico curto}

**Contexto:** {cliente, campanha, situação}
**Observação:** {o que aconteceu}
**Hipótese:** {por que aconteceu}
**Ação proposta:** {o que fazer na próxima vez}
**Tags:** #nicho-X #canal-Y #severity-Z
```

## Como consultar

Use a skill `/aprender` antes de iniciar campanha nova. Agente lê últimos 30 dias da categoria relevante + sugere padrões aplicáveis.

## Como alimentar

- **Manual:** agente edita arquivo da categoria + append novo entry
- **Automatizado (Fase 1.2+):** hook PostToolUse detecta veredicto/output e appenda

## Princípios

1. Capturar **o que funcionou** (não só o que falhou)
2. Sempre incluir contexto suficiente pra outro agente entender
3. Tags consistentes (busca rápida via grep)
4. Entradas curtas (5-10 linhas) — não relatórios
5. Aprender **em 5 minutos** — quem lê deve absorver insight em 1 leitura
