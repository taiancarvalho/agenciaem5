# Roadmap de Workflows — em5

> **Source of truth** dos pipelines operacionais da agência.
> Atualizar este arquivo a cada workflow criado/refatorado/depreciado.
> Convenção: nome do yaml = `{categoria}-{escopo}.yaml` quando útil pra namespacing.

**Última atualização:** 2026-05-19
**Versão:** v1.1 (Sprint 1 — refactor P0 concluído)
**Total catalogado:** 84 workflows (7 existentes + 77 propostos)
**Status:** 4 ✅ saudáveis | 3 ✅ refatorados Sprint 1 | 77 🔴 pendentes

---

## Legenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Implementado e em produção |
| 🟡 | Existe mas precisa refactor |
| 🔴 | Planejado — não construído |
| ⚫ | Depreciado |
| P0 | Crítico — débito técnico ou ops |
| P1 | Importante — gap funcional |
| P2 | Valor agregado |
| P3 | Nice-to-have |

---

## SPRINT TRACKING

### Sprint atual: **Sprint 2 — Skills↔YAML** (next)

### Sprints concluídos
- ✅ **Sprint 0 — Roadmap** (catálogo 84 workflows)
- ✅ **Sprint 1 — Refactor P0** (onboarding-cliente v2.0 + lancamento v2.0 + ciclo-campanha v2.1)

### Próximos sprints planejados

| Sprint | Escopo | Workflows | Estimativa |
|--------|--------|-----------|-----------|
| ~~**Sprint 1 — Refactor P0**~~ | ~~Corrigir débito dos 3 workflows incompletos~~ | ~~3~~ | ✅ Concluído |
| **Sprint 2 — Skills↔YAML** | Criar yaml pras 3 skills multi-agent sem workflow | 3 | ~3h |
| **Sprint 3 — Ativar @fin + @vendas** | Pipelines financeiros e comerciais | 2 | ~3h |
| **Sprint 4 — Conteúdo orgânico crítico** | 5 formatos mais usados | 5 | ~5h |
| **Sprint 5 — Cliente relacionamento crítico** | kickoff, ata, qbr, churn | 4 | ~4h |
| **Sprint 6 — Analytics avançado** | pixel, ga4, ab-test | 3 | ~3h |
| **Sprint 7 — Crisis + Manutenção** | Reativos + recorrentes | 4 | ~4h |
| **Sprint 8 — Aquisição + Legal + Reporting + Assets** | Restantes críticos | 5 | ~5h |
| **Sprint 9+ — Importantes (P2)** | 28 workflows P2 | 28 | ~28h |
| **Sprint N — Nice-to-have (P3)** | 16 workflows P3 | 16 | ~16h |
| **Sprint Final — Rotinas** | Definir cadência (daily/weekly/monthly) + cron `/schedule` | — | ~2h |

---

## CATÁLOGO COMPLETO

### Categoria 1 — Existentes (7)

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 1 | `ciclo-campanha.yaml` | ✅ v2.1 | coo → strategist → [traffic+copy+design ‖] → qa → fin (budget) → traffic → cs | Skill `/campanha` | **Sprint 1:** gate `@fin.verificar-budget` inserido antes publish |
| 2 | `iteracao-criativa.yaml` | ✅ | traffic → copy → designer → qa → traffic | Skill `/iterar` | OK |
| 3 | `google-ads.yaml` | ✅ | traffic → copy → qa → traffic → cs | Skill — | OK |
| 4 | `social-media.yaml` | ✅ | strategist → copy → designer → qa → cs | — | OK (mas será deprecado conforme criamos formatos específicos) |
| 5 | `lancamento.yaml` | ✅ v2.0 | coo + fin + strategist + scout + copy + designer + traffic + qa + whats + cs | Pedido lançamento | **Sprint 1:** expandido 4 → 17 steps (pré/durante/pós) + @fin/@scout/@whats |
| 6 | `onboarding-cliente.yaml` | ✅ v2.0 | cs → fin (Asaas) → cs → strategist (plano-inicial) → qa → cs | Skill `/onboard` | **Sprint 1:** add fases @fin (cadastro Asaas + primeira cobrança) + @strategist (plano-inicial) + QA gate |
| 7 | `construcao-ciclo-completo.yaml` | ✅ | arq → builder → reviewer | Skill `/construir` | OK (meta-time) |

### Categoria 2 — Skills sem yaml (3) [Sprint 2]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 8 | `relatorio-cliente.yaml` | 🔴 P1 | coo → traffic → cs → qa → cs (envio) | Skill `/relatorio` | Skill já existe, falta yaml |
| 9 | `auditoria-conta.yaml` | 🔴 P1 | coo → traffic → qa → cs | Skill `/auditar` | Cobre meta + google |
| 10 | `daily-run.yaml` | 🔴 P1 | coo → traffic (×N clientes ‖) → cs (alertas) | Skill `/dia` | Cron diário 8h |

### Categoria 3 — Ativar @fin + @vendas (4) [Sprint 3]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 11 | `cobranca-mensal.yaml` | 🔴 P1 | fin (Asaas fatura) → whats (envia) → fin (concilia) → cs (escala 5d+) | Cron 1º dia mês | Usa MCP Asaas |
| 12 | `prospec-fechamento.yaml` | 🔴 P1 | vendas (qualifica) → vendas (diagnóstico) → vendas (proposta) → ceo (aprova) → fin (cadastra) → onboarding | Skill `/vendas-pipeline` (novo) | — |
| 13 | `cold-outreach.yaml` | 🔴 P1 | vendas (lista) → vendas (cadência) → vendas (resposta) → diagnóstico | Cron semanal | SDR |
| 14 | `cobranca-falhou.yaml` | 🔴 P0 (crisis) | fin (retry Asaas) → whats (comunicação) → cs (escala 3d) | Webhook Asaas falha | — |

### Categoria 4 — Conteúdo orgânico (15) [Sprints 4–6]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 15 | `carrossel-ig.yaml` | 🔴 P1 | strategist (tema) → copy (10 slides + hook) → designer → qa → cs | Calendário | Formato #1 IG |
| 16 | `reels-ig.yaml` | 🔴 P1 | copy (roteiro) → designer (storyboard + edit) → qa → cs | Skill `/em5-roteiro-reels` | Skill existe |
| 17 | `stories-sequencia.yaml` | 🔴 P1 | copy → designer → cs | Diário | Stickers + polls |
| 18 | `post-feed-estatico.yaml` | 🔴 P2 | copy → designer → qa → cs | Calendário | Formato menor uso |
| 19 | `live-ig.yaml` | 🔴 P3 | strategist → copy (roteiro) → designer (divulgação) → cs | Pedido cliente | Pouco recorrente |
| 20 | `linkedin-post.yaml` | 🔴 P1 | copy → designer → qa → cs | Calendário | B2B — voz diferente |
| 21 | `linkedin-artigo.yaml` | 🔴 P2 | strategist → copy → qa → cs | Calendário mensal | Long-form |
| 22 | `youtube-longform.yaml` | 🔴 P2 | strategist (keyword) → copy (roteiro) → designer (b-roll + thumb) → qa | Pedido cliente | SEO YT |
| 23 | `youtube-shorts.yaml` | 🔴 P2 | copy → designer → qa | Calendário | Vertical 60s |
| 24 | `tiktok-native.yaml` | 🔴 P2 | strategist (trend) → copy → designer → cs | Calendário | Não republica Reels |
| 25 | `blog-seo.yaml` | 🔴 P1 | strategist (keyword) → copy (outline + texto) → qa (SEO on-page) → cs (publica) | Calendário | — |
| 26 | `newsletter.yaml` | 🔴 P1 | strategist → copy → cs (segment + send) → cs (relatório) | Cron semanal | Gmail/ESP via Composio |
| 27 | `email-nurture-drip.yaml` | 🔴 P2 | copy (5-7 emails) → qa → cs (setup gatilho) | Pedido | Comportamental |
| 28 | `twitter-thread.yaml` | 🔴 P3 | copy → designer → qa | Calendário | — |
| 29 | `podcast-episodio.yaml` | 🔴 P3 | strategist (pauta) → copy → designer (capa) → cs (distribuição) | Pedido cliente | — |

### Categoria 5 — Cliente relacionamento (10) [Sprint 5+]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 30 | `kickoff-call.yaml` | 🔴 P1 | cs (agenda) → strategist (materiais) → cs (ata) → coo (próximos passos) | Pós-fechamento | — |
| 31 | `reuniao-1on1-cliente.yaml` | 🔴 P1 | cs (pauta) → cs (ata) → coo (follow-up) | Recorrente | — |
| 32 | `ata-reuniao.yaml` | 🔴 P1 | cs (transcrição) → cs (ata estruturada) → cs (envia) | Pós-call | Usa `/em5-call-para-sop` interno |
| 33 | `qbr-trimestral.yaml` | 🔴 P1 | strategist (revisa plano) → traffic (3M dados) → cs (deck) → qa → cs (apresenta) | Cron trimestral | Reunião exec |
| 34 | `renovacao-contrato.yaml` | 🔴 P1 | fin (alerta 60d) → strategist (revisa resultados) → vendas (proposta nova) → ceo (aprova) | Cron 60d antes vencimento | — |
| 35 | `upsell-pitch.yaml` | 🔴 P2 | strategist (analisa gap) → vendas (proposta) → ceo (aprova) | Cliente saudável 6m+ | — |
| 36 | `churn-prevention.yaml` | 🔴 P1 | fin (sinal atraso) OR cs (NPS baixo) → ceo (escala) → cs (call retenção) | Trigger sinais | — |
| 37 | `offboarding.yaml` | 🔴 P2 | cs (handoff assets) → fin (encerra Asaas) → coo (post-mortem) | Cliente sai | — |
| 38 | `nps-pesquisa.yaml` | 🔴 P2 | cs (envia) → cs (coleta) → cs (ação por nota) | Cron trimestral | — |
| 39 | `case-study.yaml` | 🔴 P3 | cs (entrevista) → copy (estudo) → designer (visual) → qa | Top performer | — |

### Categoria 6 — Analytics avançado (7) [Sprint 6]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 40 | `setup-pixel-tracking.yaml` | 🔴 P1 | cs (instala pixel + CAPI) → traffic (valida disparos) → qa (auditoria) | Cliente novo | — |
| 41 | `setup-ga4-eventos.yaml` | 🔴 P1 | cs (eventos + conversões) → traffic (UTM) → qa | Cliente novo | — |
| 42 | `setup-conversion-api.yaml` | 🔴 P2 | cs (deploy CAPI server-side) → traffic (valida) | Cliente avançado | — |
| 43 | `ab-test-ciclo.yaml` | 🔴 P1 | strategist (hipótese) → traffic (setup) → traffic (run 7-14d) → strategist (análise) → coo | Pedido cliente | — |
| 44 | `cro-funil.yaml` | 🔴 P2 | strategist → traffic (modo-cro task existe) → designer (variações) → qa | Conversão baixa | Task existe sem workflow |
| 45 | `clarity-comportamento.yaml` | 🔴 P2 | traffic (heatmap + recordings via MCP Clarity) → strategist (insight) → cs | Mensal | **MCP disponível não usado** |
| 46 | `atribuicao-multi-touch.yaml` | 🔴 P3 | traffic (cruza UTM+GA4+Meta+GAds) → strategist (modelo) → cs | Pedido específico | — |

### Categoria 7 — Crisis / reativo (5) [Sprint 7]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 47 | `conta-suspensa-meta.yaml` | 🔴 P1 | traffic (diagnose) → cs (appeal Meta) → ceo (escala) → cs (comunica cliente) | BM/conta bloqueada | Recovery <24h |
| 48 | `pixel-quebrado.yaml` | 🔴 P1 | traffic (detecta queda) → cs (re-instala) → qa (valida) | Conversões -80%+ overnight | Incident |
| 49 | `crise-reputacao.yaml` | 🔴 P2 | scout (monitora) → ceo (decide resposta) → copy (rascunha) → qa → cs (publica) | Comentário viral negativo | — |
| 50 | `campanha-com-bug.yaml` | 🔴 P2 | traffic (pausa) → qa (root cause) → copy/designer (corrige) → qa → traffic (relança) | Ad com erro detectado | — |
| 51 | `cobranca-falhou.yaml` | (#14 acima) | — | — | Já catalogado em fin |

### Categoria 8 — Aquisição (5) [Sprint 8]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 52 | `webinar-captura.yaml` | 🔴 P2 | strategist (tema) → copy (promo + lp) → designer → cs (live) → cs (nurture) | Pedido marketing agência | — |
| 53 | `parceria-network.yaml` | 🔴 P3 | vendas (mapeia) → ceo (decide) → vendas (negocia) | Oportunidade | Co-venda |
| 54 | `lead-magnet.yaml` | 🔴 P2 | strategist (tema) → copy (material) → designer → cs (captura + nurture) | Calendário marketing | Ebook/template |

### Categoria 9 — Assets produção (5) [Sprint 8]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 55 | `photoshoot-cliente.yaml` | 🔴 P3 | strategist (brief) → designer (moodboard) → cs (produção) → designer (seleção) | Pedido cliente | — |
| 56 | `ugc-creator-pipeline.yaml` | 🔴 P2 | copy (brief) → cs (contratação) → designer (edit recebido) → qa | Pedido | — |
| 57 | `influencer-outreach.yaml` | 🔴 P2 | scout (pesquisa) → cs (outreach) → vendas (negocia) → copy (brief) → qa | Pedido | — |
| 58 | `branding-novo-cliente.yaml` | 🔴 P2 | strategist → designer (logo + paleta + tipo) → qa → cs | Cliente sem branding | — |
| 59 | `landing-page-build.yaml` | 🔴 P1 | strategist → copy → designer → designer (dev HTML) → qa → cs (publica) | Pedido cliente | Skill `/extrair-design` ajuda |

### Categoria 10 — Internal agency (6) [Sprint 9]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 60 | `daily-standup.yaml` | 🔴 P1 | coo (consolida bloqueios todos clientes) → ceo (decide) | Cron 9h diário | Solo: snapshot dia |
| 61 | `weekly-review-interna.yaml` | 🔴 P2 | coo (semana ops) → fin (semana $) → ceo (decisões) | Cron sex 17h | — |
| 62 | `recrutamento.yaml` | 🔴 P3 | ceo (vaga) → cs (divulga) → ceo (triagem) → ceo (entrevista) | Pedido | — |
| 63 | `treinamento-equipe.yaml` | 🔴 P3 | ceo (define) → cs (onboarding interno) | Novo funcionário | — |
| 64 | `time-tracking.yaml` | 🔴 P2 | coo (loga horas por cliente) → fin (ROI hora) | Diário | Input pra ROI |
| 65 | `sop-update.yaml` | 🔴 P2 | qualquer agente (input call) → cs (`/em5-call-para-sop`) → reviewer | Pós-call relevante | Loop versionamento |

### Categoria 11 — Legal / compliance (3) [Sprint 8]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 66 | `lgpd-review-campanha.yaml` | 🔴 P1 | cs (checa consent + política) → qa (audit) | Antes formulário/captura | Compliance |
| 67 | `contrato-cliente-novo.yaml` | 🔴 P2 | vendas (`/em5-proposta-docx`) → ceo (revisa) → cs (envia assinatura) | Pós-fechamento | Skill existe |
| 68 | `nda-prospect.yaml` | 🔴 P2 | vendas (gera) → ceo (assina) → vendas (envia) | Diagnóstico aprofundado | — |

### Categoria 12 — Reporting especializado (4) [Sprint 8]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 69 | `weekly-digest-whatsapp.yaml` | 🔴 P1 | traffic (snapshot) → cs (resumo curto) → whats (envia) | Cron sex 17h | Status semanal cliente |
| 70 | `executive-summary-trimestral.yaml` | 🔴 P2 | strategist (decisões) → fin (números) → cs (1 página) → qa → cs (envia) | Cron trimestral | C-level |
| 71 | `creative-leaderboard.yaml` | 🔴 P2 | traffic (top 10 mês) → strategist (insight) → copy/designer (input iteração) | Cron mensal | — |
| 72 | `competitor-creative-lib.yaml` | 🔴 P2 | scout (scrape biblioteca anúncios concorrente) → strategist → copy | Cron semanal | — |

### Categoria 13 — Manutenção recorrente (5) [Sprint 7]

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 73 | `lookalike-refresh.yaml` | 🔴 P1 | traffic (atualiza LAL com base nova) → qa | Cron mensal | — |
| 74 | `custom-audience-hygiene.yaml` | 🔴 P2 | traffic (remove < 1000) → qa | Cron trimestral | — |
| 75 | `pixel-event-validation.yaml` | 🔴 P1 | traffic (testa todos eventos) → qa | Cron mensal | — |
| 76 | `icp-refinement.yaml` | 🔴 P2 | strategist (analisa dados reais) → copy (atualiza ICP) | Cron trimestral | — |
| 77 | `brand-voice-update.yaml` | 🔴 P3 | strategist → copy (style guide) → qa | Cron anual | — |

### Categoria 14 — Scout / Inteligência (1 — já listada parcialmente)

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 78 | `inteligencia-semanal.yaml` | 🔴 P2 | scout (scrape concorrência) → scout (SWOT) → cs (envia insight) | Cron semanal | — |

### Categoria 15 — WhatsApp orquestração (1)

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 79 | `whatsapp-orquestracao.yaml` | 🔴 P2 | whats (recebe) → whats (triagem) → [agente relevante] OR handoff humano | Webhook WhatsApp | — |

### Categoria 16 — CEO governo (5)

| # | Workflow | Status | Agentes | Trigger | Notas |
|---|----------|--------|---------|---------|-------|
| 80 | `review-portfolio-mensal.yaml` | 🔴 P2 | ceo + fin (MRR) + coo (ops status) | Cron mensal | Saúde negócio |
| 81 | `okrs-trimestrais.yaml` | 🔴 P3 | ceo → coo (cascade) | Cron trimestral | — |
| 82 | `analise-portfolio.yaml` | 🔴 P3 | ceo + fin + cs | Pedido | — |
| 83 | `decisao-estrategica.yaml` | 🔴 P3 | ceo (estrutura decisão) → coo (executa se aplicável) | Pedido | — |
| 84 | `crise-negocio.yaml` | 🔴 P3 | ceo → coo → fin → cs | Crise (perda cliente grande, etc) | — |

---

## ROTINAS (preenche no Sprint Final)

> A definir após todos os workflows estarem criados.
> Mapeará cada workflow para cadência (diário/semanal/mensal/trimestral/anual/sob-demanda)
> e gerará `crontab` ou `/schedule` correspondente.

### Template (a preencher):

| Cadência | Workflows |
|----------|-----------|
| **Diário (cron 8h-9h)** | daily-run, daily-standup, stories-sequencia (se ativo) |
| **Semanal (sex 17h)** | weekly-digest-whatsapp, weekly-review-interna, cold-outreach, newsletter, inteligencia-semanal, competitor-creative-lib |
| **Mensal (dia 1)** | cobranca-mensal, lookalike-refresh, pixel-event-validation, creative-leaderboard, review-portfolio-mensal, relatorio-cliente |
| **Trimestral** | qbr-trimestral, nps-pesquisa, custom-audience-hygiene, icp-refinement, executive-summary-trimestral, okrs-trimestrais |
| **Anual** | brand-voice-update |
| **Sob demanda (skill / pedido)** | campanha, iterar, auditar, ab-test, kickoff, ata-reuniao, landing-page, ugc, etc. |
| **Trigger evento** | conta-suspensa, pixel-quebrado, cobranca-falhou, churn-prevention, renovacao-contrato, crise-reputacao |

---

## Convenções de yaml

Pra consistência, todo workflow novo segue:

```yaml
nome: "{nome-kebab-case}"
descricao: "{1 linha}"
versao: "1.0"
fase: {número} # quando aplicável
gatilho: "{trigger humano-legível}"
agente_orquestrador: "coo"  # sempre @coo (CLAUDE.md Regra 1)
agente_responsavel_entrega: "{quem entrega final}"
qa_gate: true|false
inputs:
  - {path arquivo}
outputs:
  - {path arquivo entregue}
steps:
  - id: 1
    nome: "{nome curto}"
    agente: "{agente}"
    task: "{task.md referenciada}"
    input_de: [{step ids anteriores}]
    output_para: "{path}"
    on_failure: "{escala pra coo|qa|ceo}"
```

---

*Roadmap em5 v1.0 — Atualizar a cada sprint*
