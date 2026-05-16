# em5 — Baseline Audit 2026-05-16

> Estado do sistema antes do refator "Agência em Cinco minutos".

## Inventário

| Componente | Count | Caminho |
|------------|-------|---------|
| Agentes | 8 | `.em5/agents/*.md` |
| Tasks executáveis | 63 | `.em5/core/tasks/{ceo,coo,copywriter,cs,designer,qa,strategist,traffic}/*.md` |
| Playbooks | 5 | `.em5/playbooks/` |
| Commands (skills) | 10 | `.claude/commands/*.md` |
| Rules | 3 | `.em5/rules/{agent-authority,agent-handoff,workflow-execution}.md` |
| Core data (YAML) | 8 | `.em5/core/data/` (canais, KPIs, nomenclatura, públicos, janelas, gatilhos, estrutura) |
| Learnings | 3 stubs | `.em5/learnings/{ERRORS,FEATURE_REQUESTS,LEARNINGS}.md` |
| Clientes | 1 demo + template | `.em5/clientes/{_template, odontovital-sp}` |

## Agentes (estado atual)

| ID | Persona atual | Persona depois | Genero |
|----|---------------|----------------|--------|
| @ceo | Atlas | Atlas (manter) | m |
| @coo | Nexus | **Nexus** | n |
| @cs | Sol | Sol (manter) | f |
| @strategist | Vera | Vera (manter) | f |
| @traffic | Pulse | **Pulse** | n |
| @copywriter | Eco | **Eco** | n |
| @designer | Lux | Lux (manter) | f |
| @qa | Crivo | **Crivo** | n |

## Skills (estado atual)

10 commands em `.claude/commands/`:
- `auditoria-conta.md` → renomear `auditar`
- `briefing.md` → manter
- `criar-campanha.md` → renomear `campanha`
- `iterar-criativo.md` → renomear `iterar`
- `novo-cliente.md` → renomear `cliente-novo`
- `onboarding.md` → renomear `onboard`
- `relatorio.md` → manter
- `saude-sistema.md` → renomear `saude`
- `setup.md` → manter
- `status-cliente.md` → renomear `status`

## Learnings — estado real

Diretório existe com 3 arquivos stub:
- `LEARNINGS.md`
- `ERRORS.md`
- `FEATURE_REQUESTS.md`

**Nenhuma captura automatizada.** Hook PostToolUse precisa ser criado (Fase 1.2). Estrutura mensal `2026-05/` pode ser iniciada agora.

## Composio MCP — toolsets ativos

`.claude/settings.json` declara: `meta_ads,google_analytics,googlesheets,gmail,slack`

**Faltando (Fase 1.3):** `whatsapp_business`, `googledrive`.

## Cliente demo

`.em5/clientes/odontovital-sp/` — 8 subpastas. Provável demo, manter como referência viva ou mover pra `_examples/` no futuro.

## Rules atuais

`agent-authority.md`, `agent-handoff.md`, `workflow-execution.md` — base do roteamento. Não tocar na Fase 0.5.

## Gaps pra refator

- [ ] `model_tier` em nenhum agente (Fase 1.1)
- [ ] Hooks pasta `.claude/hooks/` não existe (Fase 1.1, 1.2)
- [ ] Gate-matrix YAML não existe (Fase 3)
- [ ] `bin/em5-forge.js` não existe (Fase 2)
- [ ] Release layer (`lib/`, `bin/em5.js` distribuível) não existe (Fase 4)
- [ ] Persona names hardcoded em 8 lugares (em5-config.yaml + agents/*.md + AGENTS.md + CLAUDE.md)

## Critério de saída Fase 0

✅ Inventário completo
✅ Gaps mapeados
✅ Persona names mapeados pra rename Fase 0.5

Pronto pra Fase 0.5.
