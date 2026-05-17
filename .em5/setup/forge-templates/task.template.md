---
name: {{TASK_NAME}}
agent: {{AGENT_ID}}
description: {{DESCRIPTION}}
inputs:
{{INPUTS_LIST}}
outputs:
{{OUTPUTS_LIST}}
elicit: {{ELICIT}}
model_tier: {{MODEL_TIER}}
---

# Task: {{TASK_NAME}}

> {{DESCRIPTION}}
> Promessa em5: executar em ≤ 5 min.

## Quando usar

{{WHEN_TO_USE}}

## Pré-requisitos

{{PREREQS}}

## Passo a passo

1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}

## Output esperado

{{OUTPUT_FORMAT}}

## Critério de saída

- [ ] Output salvo em `.em5/clientes/{cliente}/{categoria}/{arquivo}.md`
- [ ] Log atualizado em `.em5/clientes/{cliente}/operacao/log.md`
- [ ] Handoff documentado pro próximo agente

---

*em5 Task — criada via /forge em {{DATA}}*
