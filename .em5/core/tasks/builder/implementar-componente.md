---
name: implementar-componente
agent: builder
description: Lê spec.md aprovada e gera arquivos via Forge templates
inputs:
  - .em5/construcao/{ticket}/spec.md (status: approved)
outputs:
  - arquivos novos conforme seção 9 da spec
  - .em5/construcao/{ticket}/build-log.md
elicit: false
model_tier: balanced
---

# Task: implementar-componente

## Objetivo

Materializar a spec aprovada em arquivos reais. Sem improviso.

## Passo a passo

### 1. Validar spec

Spec status = `approved`? Se não → erro + volta pro Arq.

### 2. Marcar status

`approved` → `building`.

### 3. Criar agente (se na spec)

- Lê `.em5/setup/forge-templates/agent.template.md`
- Substitui placeholders com valores da spec
- Salva em `.em5/agents/{slug}.md`

### 4. Criar tasks (se na spec)

Pra cada task:
- Lê `.em5/setup/forge-templates/task.template.md`
- Preenche placeholders
- Salva em `.em5/core/tasks/{agent}/{task-name}.md`

### 5. Criar playbook (se na spec)

- Lê `.em5/setup/forge-templates/playbook.template.md`
- Preenche placeholders
- Salva em `.em5/playbooks/{nicho|canal}-{nome}.md`

### 6. Criar skill (se na spec)

Escreve `.claude/commands/{skill}.md` em padrão em5:
- Header com promessa ≤ 5 min
- Uso (sintaxe)
- Fluxo (agentes envolvidos)
- Critério de saída

### 7. Criar data files (se na spec)

YAMLs em `.em5/core/data/{arquivo}.yaml` com schema documentado.

### 8. Inicializar learnings

Cria stubs em `.em5/learnings/{ano-mes}/{slug-agente}-{tipo}.md` (Art. X).

### 9. Atualizar configs centrais

- `.claude/CLAUDE.md` — adiciona linha na tabela de agentes + skills
- `.em5/AGENTS.md` — adiciona linha na tabela de agentes
- `em5-config.yaml` — adiciona em `agents:` se for agente novo

### 10. Build-log

Salva `.em5/construcao/{ticket}/build-log.md` com:
- Lista de arquivos criados
- Lista de arquivos modificados
- Hash SHA-256 de cada novo arquivo (audit trail)

### 11. Handoff Lima

Marca status `building` → `reviewing`. Chama @reviewer Lima.

## Critério de saída

- Todos arquivos da seção 9 da spec criados/modificados
- Build-log gerado
- Status = reviewing
- @reviewer notificado

## Anti-padrão

- NÃO commita aqui (Lima decide se aprova)
- NÃO improvisa nomes (vem da spec)
- NÃO edita arquivos fora da seção 9
