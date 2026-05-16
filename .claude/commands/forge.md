# /forge — Wizard pra Criar Agentes/Tasks/Playbooks

> Cria novos componentes em5 via wizard interativo. Em ≤ 5 min você tem agente/task/playbook novo rodando.

## Uso

```
/forge                 # pergunta o tipo
/forge agent           # cria novo agente
/forge task            # cria nova task pra agente existente
/forge playbook        # cria playbook de nicho ou canal
```

## Como funciona

Executa o script `node .em5/bin/em5-forge.js [tipo]`. Wizard inquirer-style pergunta:

### `/forge agent`
- Slug, persona name, role, icon
- Archetype, layer (estrategia/definicao/execucao/validacao)
- Reports to, tone, model tier (frontier/balanced/haiku)
- When to use, signature
- Handoff (recebe de / envia para)
- Anti-papel (3 itens)
- Comandos iniciais

Cria: `.em5/agents/{slug}.md` + lembra de atualizar CLAUDE.md, AGENTS.md, em5-config.yaml.

### `/forge task`
- Agente alvo, nome da task
- Descrição, when-to-use
- Inputs, outputs, elicit
- Model tier (override do agente)
- Pré-requisitos, 3 steps, output format

Cria: `.em5/core/tasks/{agente}/{task-name}.md`

### `/forge playbook`
- Tipo (nicho ou canal)
- Nome do nicho/canal
- Contexto, KPIs target (CPL, ROAS, taxa agendamento)
- Até 3 ângulos validados com baseline
- Públicos vencedores, anti-padrões

Cria: `.em5/playbooks/{nicho|canal}-{nome}.md`. @strategist carrega automaticamente quando `cliente.nicho` ou `cliente.canal` match.

## Templates fonte

`.em5/setup/forge-templates/{agent,task,playbook}.template.md`

## Workflow recomendado

1. Roda 3 clientes do mesmo nicho → identifica padrão
2. `/forge playbook` cria playbook do nicho
3. 4º cliente do nicho entra rodando com playbook ativo
4. `/aprender` retroalimenta o playbook com novos learnings

## Critério em5

Wizard inteiro: ≤ 5 min. Se demora mais, simplificar perguntas.

---

*em5 v1.1 — Fase 2 (Forge/Builder)*
