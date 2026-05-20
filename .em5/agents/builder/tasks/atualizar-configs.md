---
name: atualizar-configs
agent: builder
description: Atualiza CLAUDE.md, AGENTS.md, em5-config.yaml com novo componente
inputs:
  - componente_tipo: agente | task | playbook | skill | data
  - componente_id (slug)
  - componente_info (dict com persona/icon/role/layer/etc.)
outputs:
  - .claude/CLAUDE.md (atualizado)
  - .em5/system/AGENTS.md (atualizado se componente=agente)
  - em5-config.yaml (atualizado se componente=agente)
elicit: false
model_tier: balanced
---

# Task: atualizar-configs

## Objetivo

Configs centrais sempre coerentes com componentes reais. Drift = bug.

## Passo a passo

### Se componente = agente

1. **`.claude/CLAUDE.md`** — append linha na tabela "Agentes disponíveis":
   ```
   | @{id} | {Persona} {icon} | {whenToUse curto} |
   ```
2. **`.em5/system/AGENTS.md`** — append linha na tabela com Layer e função detalhada
3. **`em5-config.yaml`** — append em `agents:`:
   ```yaml
   {id}:
     id: {id}
     fantasy_name: "{Persona}"
     gender: "{m|f|n}"
     layer: {layer}
   ```

### Se componente = skill (`.claude/commands/`)

1. **`.claude/CLAUDE.md`** — append em "Skills planejadas" ou grupo apropriado:
   ```
   - `/{slug}` — {descrição em 1 linha}
   ```

### Se componente = task

Não atualiza configs centrais (task é interno do agente). Apenas garante que está em `.em5/agents/{agente}/persona.md` na lista `commands:`.

### Se componente = playbook

Não atualiza configs centrais. `@strategist Vera` consulta `.em5/agents/` automaticamente.

### Se componente = data

Não atualiza configs centrais. Consumido por tasks via `data_dependency`.

## Critério de saída

- Arquivos centrais atualizados
- Diff mínimo (1-3 linhas por arquivo)
- Sem quebrar formato (tabelas alinhadas)

## Anti-padrão

- NÃO reescreve config inteiro (só append/edit local)
- NÃO esquece de algum dos 3 arquivos (gera drift)
- NÃO atualiza se tipo não exige (overhead inútil)
