# Changelog — em5

> Todas mudanças relevantes documentadas. Formato baseado em [Keep a Changelog](https://keepachangelog.com/).

## [1.3.0] — 2026-05-16

### Added — Asaas + tasks completas + hooks ativos
- **Constitution Art. IX revisado (v1.3):** Composio é gateway default, exceções permitidas pra MCPs oficiais com 5 critérios
- **Asaas MCP integrado** como exceção formal (financeiro BR — PIX/boleto/cartão)
- `.em5/integracoes/excecoes.yaml` documenta MCPs não-default com aprovação @ceo
- Task `fin/criar-cobranca-asaas` + `fin/monitorar-inadimplencia` (com severity escalada por dias)
- 26 tasks "fantasmas" preenchidas (vendas, fin, scout, whats, builder, reviewer)
- 6 templates novos (proposta, diagnóstico, swot, weekly-report, briefing, etc.)
- 5 data files (objeções, preços, concorrentes, templates por nicho)
- Hooks ativos: `learnings-capture.sh` + `model-router.sh`
- `bin/em5-upgrade.js` extendido com migrations v1.1→v1.2→v1.3
- `.env.example` reescrito pro contexto em5 (Composio, Asaas, WhatsApp, etc.)
- `.gitignore` atualizado (painel/dist, desktop/dist-app, secrets.yaml)
- CHANGELOG.md criado
- `desktop/build/README.md` com instruções pra ícones

### Changed
- `package.json` v1.3.0 + descrição atualizada
- `/validate-em5` checa MCPs adicionais vs `excecoes.yaml`
- @fin Caixa: 9 commands (vs 6) com integração Asaas

## [1.2.0] — 2026-05-16

### Added — Roadmap pós-MVP completo (Fases 5–11)
- **Fase 5 — aiox-core absorption:** Hook Registry + Modular Infrastructure + `/validate-em5`
- **Fase 6 — Meta-time CONSTRUÇÃO:** @arq Arq, @builder Cunha, @reviewer Lima + skill `/construir` + Art. XIII (Construção Self-Service)
- **Fase 7 — Agentes high-value:** @vendas Caça, @fin Caixa, @scout Espia
- **Fase 8 — WhatsApp Stack dual provider:** @whats Onda (Composio | WAHA) + templates + stop rules
- **Fase 9 — customGPT Adapter:** `/importar-gpt` + `bin/em5-import-gpt.js`
- **Fase 10 — Dashboard Astro estático:** `painel/` com 6 KPIs + cards por severity
- **Fase 11 — Electron desktop:** `desktop/` wrapper Win/Mac/Linux + LICENSE MIT

### Changed
- 15 agentes total (vs 8 anteriores)
- 18 skills total (vs 13 anteriores)
- Constitution com 13 artigos (vs 12)

## [1.1.0] — 2026-05-16

### Added — Quick wins + Forge + Severity gates + Release layer (Fases 0–4)
- Auditoria baseline + rename agentes (Marcos→Nexus, Max→Pulse, Cal→Eco, Zara→Crivo)
- Skills canônicas: `/cliente-novo`, `/onboard`, `/campanha`, etc. (+ 7 aliases retrocompat)
- Tagline "Agência em Cinco minutos" + slogan dev "Se passou de 5, refatora"
- Model profiling (`model_tier: frontier|balanced|haiku`) nos 8 agentes
- Learnings system com 8 categorias + estrutura mensal
- Composio toolsets expandidos: `whatsapp_business`, `googledrive`
- Skill `/dia` (daily run), `/aprender` (consulta learnings)
- **Fase 2 — Forge:** `bin/em5-forge.js` wizard cria agente/task/playbook
- **Fase 3 — Gate-Matrix Severity:** 4 níveis (crítico/alto/médio/baixo) + skill `/override` + Arts. X, XI, XII
- **Fase 4 — Release Layer:** `bin/em5.js` + `lib/installer.js` + `bin/em5-upgrade.js` + README público

## [1.0.0] — pré-2026-05-16 (origem como OMG.sys)

### Added
- 8 agentes (Atlas, Marcos, Sol, Vera, Max, Cal, Lux, Zara)
- Constitution v1.0 (9 artigos)
- 10 skills operacionais
- 63 tasks executáveis
- 5 playbooks de domínio
- Composio MCP unificado
- Workspace cliente nativo (`.em5/clientes/{slug}/`)

### Migration
- Repo renomeado: `AgencyOS` → `agenciaem5`
- Diretório: `.omgsys/` → `.em5/`
- Config: `omgsys-config.yaml` → `em5-config.yaml`

---

*em5 v1.3.0 — Agência em Cinco minutos. Free forever. Open source MIT.*
