---
name: health-sistema
agent: ceo
description: Verificar integridade geral dos arquivos e estrutura do agenciaem5
inputs:
  - estrutura .em5/ completa
outputs:
  - relatorio de saude do sistema
elicit: false
---

# Health Check do Sistema

## Objetivo

Verificar se todos os componentes essenciais do agenciaem5 estao presentes, consistentes e funcionais — agentes, tasks, templates, data, workflows e checklists.

---

## Passo a passo

### 1. Verificar agentes essenciais

Verificar existencia dos 7 arquivos de agente em `.em5/agents/`:

```
[ ] ceo.md
[ ] cs.md
[ ] strategist.md
[ ] traffic.md
[ ] copywriter.md
[ ] designer.md
[ ] qa.md
```

Para cada agente, validar que contem `activation-instructions` e `commands`.

### 2. Verificar tasks

Contar tasks por agente em `.em5/core/tasks/`:

```
Agente           | Esperado | Encontrado | Status
-----------------|----------|------------|--------
ceo    | 4        | {N}        | ✅/⚠️
cs               | 9        | {N}        | ✅/⚠️
strategist     | 7        | {N}        | ✅/⚠️
traffic   | 9        | {N}        | ✅/⚠️
copywriter       | 7        | {N}        | ✅/⚠️
designer         | 8        | {N}        | ✅/⚠️
qa      | 6        | {N}        | ✅/⚠️
```

### 3. Verificar templates

Checar diretorios em `.em5/core/templates/`:

```
[ ] briefing/ — briefing-final.md, briefing-perguntas.md
[ ] estrategia/ — plano-estrategico.md
[ ] logs/ — log-operacional.md, log-performance-criativa.md, log-growth.md
[ ] relatorios/ — relatorio-whatsapp.md, relatorio-completo.md
[ ] contratos/ — contrato-base.md
[ ] copy/ — copy-anuncio.md, roteiro-video.md, copy-landing-page.md, copy-whatsapp.md, headline-banco.md
[ ] setup-tecnico/ — checklist-tracking.md, status-tecnico.md
```

### 4. Verificar data files

```
[ ] estrutura-pastas.yaml
[ ] canais-suportados.yaml
[ ] kpis-por-objetivo.yaml
[ ] gatilhos-mentais.yaml
[ ] nomenclatura-campanhas.yaml
```

### 5. Verificar workflows

```
[ ] onboarding-cliente.yaml
[ ] ciclo-campanha.yaml
[ ] iteracao-criativa.yaml
```

### 6. Verificar checklists

```
[ ] checklist-pre-lancamento.md
[ ] checklist-onboarding-completo.md
[ ] checklist-relatorio-mensal.md
```

### 7. Verificar constitution e rules

```
[ ] .em5/core/constitution.md
[ ] .em5/rules/agent-authority.md
[ ] .em5/rules/agent-handoff.md
[ ] .em5/rules/workflow-execution.md
[ ] .claude/CLAUDE.md
```

### 8. Exibir relatorio

```markdown
# Health Check — agenciaem5 — {Data}

## Resumo
- Agentes: {X}/7 ✅
- Tasks: {X}/{total} ({porcentagem}%)
- Templates: {X}/{total} ({porcentagem}%)
- Data files: {X}/5 ✅
- Workflows: {X}/3 ✅
- Checklists: {X}/3 ✅

## Critico
{Se algo essencial esta faltando:}
🚨 {item faltando} — {impacto}

## Alertas
{Se algo esta incompleto:}
⚠️ {item} — {detalhe}

## OK
{Se tudo esta em ordem:}
✅ Sistema operacional. Todos os componentes essenciais presentes.
```

## Output esperado

- Relatorio completo de saude do sistema
- Alertas sobre componentes faltantes ou inconsistentes
- Visao de cobertura por categoria
