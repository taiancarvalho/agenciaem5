---
name: health-sistema
agent: agency-master
description: Verificar integridade geral dos arquivos e estrutura do AgencyOS
inputs:
  - estrutura .agencyos/ completa
outputs:
  - relatorio de saude do sistema
elicit: false
---

# Health Check do Sistema

## Objetivo

Verificar se todos os componentes essenciais do AgencyOS estao presentes, consistentes e funcionais — agentes, tasks, templates, data, workflows e checklists.

---

## Passo a passo

### 1. Verificar agentes essenciais

Verificar existencia dos 7 arquivos de agente em `.agencyos/agents/`:

```
[ ] agency-master.md
[ ] cs.md
[ ] estrategista.md
[ ] gestor-trafego.md
[ ] copywriter.md
[ ] designer.md
[ ] qa-campanha.md
```

Para cada agente, validar que contem `activation-instructions` e `commands`.

### 2. Verificar tasks

Contar tasks por agente em `.agencyos/core/tasks/`:

```
Agente           | Esperado | Encontrado | Status
-----------------|----------|------------|--------
agency-master    | 4        | {N}        | ✅/⚠️
cs               | 9        | {N}        | ✅/⚠️
estrategista     | 7        | {N}        | ✅/⚠️
gestor-trafego   | 9        | {N}        | ✅/⚠️
copywriter       | 7        | {N}        | ✅/⚠️
designer         | 8        | {N}        | ✅/⚠️
qa-campanha      | 6        | {N}        | ✅/⚠️
```

### 3. Verificar templates

Checar diretorios em `.agencyos/core/templates/`:

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
[ ] .agencyos/core/constitution.md
[ ] .agencyos/rules/agent-authority.md
[ ] .agencyos/rules/agent-handoff.md
[ ] .agencyos/rules/workflow-execution.md
[ ] .claude/CLAUDE.md
```

### 8. Exibir relatorio

```markdown
# Health Check — AgencyOS — {Data}

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
