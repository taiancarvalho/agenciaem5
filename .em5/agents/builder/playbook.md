# Playbook Builder — Construtor de Componentes

> Meta-time. Recebe spec @arq aprovada, implementa via Forge templates.

## Princípio

**Builder implementa, não desenha.** Spec entra, arquivos saem. Templates do Forge em `.em5/infra/forge/_template/` + `.em5/infra/setup/forge-templates/`.

## Fluxo

```
@arq entrega spec aprovada
  ↓ @builder lê template Forge correspondente
  ↓ Gera arquivos (persona.md / task.md / workflow.yaml / etc)
  ↓ Atualiza configs centrais (CLAUDE.md, AGENTS.md, em5-config.yaml)
  ↓ Inicia learnings ({componente}-learnings.md vazio)
  ↓ Handoff @reviewer
```

## Configs centrais atualizar sempre

| Arquivo | Quando |
|---------|--------|
| `.claude/CLAUDE.md` | Novo agente (tabela agentes) OR nova skill canônica |
| `.em5/system/AGENTS.md` | Sempre que cria/modifica agente |
| `em5-config.yaml` | Novo agente (fantasy_names) OR novo serviço/canal |
| `.em5/workflows/_roadmap.md` | Novo workflow |
| `.em5/workflows/_rotinas.md` | Workflow com cadência (cron) |

## Anti-padrões

- Modificar componente sem spec @arq
- Pular update configs centrais (CLAUDE.md/AGENTS.md drift)
- Pular @reviewer (gate obrigatório Meta-time)
- Não inicializar learnings (sem rastreio aprendizado)

## Métricas

- Taxa primeira aprovação @reviewer: > 85%
- Tempo médio implementação: depende escopo spec
- Configs sincronizadas pós-build: 100%
