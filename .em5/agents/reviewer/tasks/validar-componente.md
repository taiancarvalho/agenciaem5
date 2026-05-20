---
name: validar-componente
agent: reviewer
description: Valida componente recém-criado contra constitution + boas práticas
inputs:
  - .em5/infra/forge/{ticket}/spec.md
  - .em5/infra/forge/{ticket}/build-log.md
  - arquivos criados pelo @builder
outputs:
  - veredicto: APROVADO | BLOQUEADO | AJUSTES
  - .em5/infra/forge/{ticket}/review.md
elicit: false
model_tier: frontier
---

# Task: validar-componente

## Objetivo

Última barreira antes do componente entrar em produção. Equivalente meta-time do @qa Crivo.

## Passo a passo

### 1. Carregar contexto

Lê spec.md + build-log.md + cada arquivo criado.

### 2. Rodar /validate-em5

Executa `node .em5/infra/bin/em5-validate.js`. Se exit ≠ 0 → componente quebrou conformidade global → BLOQUEADO.

### 3. Constitution checklist (todos 12 artigos)

| Artigo | Check específico | OK? |
|--------|------------------|-----|
| I | Componente gera artefato em filesystem? | |
| II | Domínio único (1 agente = 1 papel)? | |
| III | Handoff via .md, não conversa? | |
| IV | Executor com contexto reduzido? | |
| V | Sem invasão de escopo? | |
| VI | Honestidade CLI (sem promessa fake)? | |
| VII | Knowledge em tasks/data, não persona inflada? | |
| VIII | Outputs cliente-facing têm gate? | |
| IX | Composio único, sem MCP novo? | |
| X | Learnings inicializados pro agente novo? | |
| XI | Outputs cobertos no gate-matrix.yaml? | |
| XII | Skill respeitando ≤ 5 min input? | |

### 4. Checks técnicos

- `model_tier` declarado e coerente
- Anti-papel listado (mínimo 3 itens concretos)
- Signature closing presente
- Greetings minimal + named + archetypal
- Dependencies declaradas
- Configs centrais (CLAUDE.md, AGENTS.md, em5-config.yaml) atualizadas

### 5. Reuso check

Componente novo duplica algo existente? Busca em `.em5/agents/`, `.em5/agents/`, `.em5/agents/`. Se sim → BLOQUEADO + sugere composição.

### 6. Veredicto

| Resultado | Ação |
|-----------|------|
| **APROVADO** ✅ | Status `reviewing` → `done`. Chama @builder pra commit. |
| **AJUSTES** 🔄 | Lista gaps específicos. Status volta `building`. @builder corrige. |
| **BLOQUEADO** 🚫 | Spec viola constitution. Status → `blocked`. @arq re-especifica. |

### 7. Salvar review

`.em5/infra/forge/{ticket}/review.md`:
```markdown
# Review CT-{NNN}

**Veredicto:** {APROVADO | AJUSTES | BLOQUEADO}
**Data:** {YYYY-MM-DD}

## Constitution
{tabela 12 artigos com OK/gap}

## Técnicos
{lista}

## Gaps (se aplicável)
- {gap 1 — sugestão}
- {gap 2 — sugestão}

## Próximo passo
{texto}
```

## Critério de saída

- review.md salvo
- Status atualizado
- Próximo agente notificado

## Anti-padrão

- NÃO implementa correção (Cunha faz)
- NÃO renegocia constitution (Art. NON-NEGOTIABLE = lei)
- NÃO aprova por pressão de prazo
