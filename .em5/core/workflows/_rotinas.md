# Rotinas Operacionais — em5

> Mapeamento de **cada workflow → cadência de execução** + comandos `/schedule` para agendamento automático.
> Source of truth do "quando rodar o quê" da agência.

**Última atualização:** 2026-05-19
**Versão:** v1.0 (Sprint Final)
**Workflows mapeados:** 83 (todos do `_roadmap.md`)

---

## Princípios de cadência

1. **Filesystem first (Art. I):** cron resultados ficam em `clientes/{nome}/operacao/` — nunca conversação
2. **Orquestrador @coo (Regra Absoluta 1):** todo cron dispara @coo, não agente operacional direto
3. **Skip feriados nacionais + fim-de-semana** quando aplicável (configurável via `em5-config.yaml.feriados`)
4. **Degradação graciosa:** falha de 1 cliente não bloqueia execução pros outros
5. **Rate limit Composio:** max 5 paralelos pra Meta/Google (evitar throttling)
6. **Auditoria:** todo cron append em `operacao/cron-log-{YYYY-MM}.md`

---

## 📅 Diário (8h–9h horário comercial)

| Cron | Workflow | Trigger | Justificativa |
|------|----------|---------|---------------|
| `0 8 * * 1-6` | `daily-run` | seg-sáb 8h | Snapshot protetivo todas contas — detecta ALERTA antes do dia rodar |
| `0 9 * * 1-5` | `daily-standup` | seg-sex 9h | Bloqueios + prioridades internos |
| `0 10 * * 1-6` | `monitorar-pagamento` (interno cobranca-mensal) | seg-sáb 10h | Conciliação Asaas diária dia 1-30 |
| `0 18 * * 1-5` | `time-tracking` | seg-sex 18h | Coleta horas fim-de-dia |
| `0 11 * * 1-5` | `stories-sequencia` | conforme calendário cliente | Stories diários quando cliente ativo |

**Comandos `/schedule`:**
```
/schedule create daily-run "0 8 * * 1-6" "@coo executa workflow daily-run em todas contas ativas"
/schedule create daily-standup "0 9 * * 1-5" "@coo executa daily-standup interno"
/schedule create time-tracking "0 18 * * 1-5" "@coo executa time-tracking + roi-hora"
```

---

## 📆 Semanal

| Cron | Workflow | Dia/Hora | Justificativa |
|------|----------|----------|---------------|
| `0 8 * * 1` | `cold-outreach` | seg 8h | Início semana SDR — lista nova + cadência |
| `0 10 * * 1` | `inteligencia-semanal` | seg 10h | Scout concorrência semana |
| `0 10 * * 1` | `competitor-creative-lib` | seg 10h | Scrape Meta Ad Library concorrentes |
| `0 9 * * 2` | `newsletter` | ter 9h | Envio semanal (ter = pico open rate B2B) |
| `0 17 * * 5` | `weekly-digest-whatsapp` | sex 17h | Resumo cliente fim-de-semana |
| `0 17 * * 5` | `weekly-review-interna` | sex 17h | Review interna agência |
| varia | `carrossel-ig` | 2-3x/semana cliente | Calendário cliente-específico |
| varia | `reels-ig` | 1-3x/semana cliente | Calendário cliente-específico |
| varia | `linkedin-post` | 2-3x/semana cliente | Calendário B2B cliente |
| varia | `tiktok-native` | 3-5x/semana cliente | Calendário TikTok cliente |
| varia | `post-feed-estatico` | conforme calendário | Calendário cliente |
| varia | `twitter-thread` | conforme calendário | Calendário X cliente |
| varia | `youtube-shorts` | semanal cliente | Calendário YT |

**Comandos `/schedule`:**
```
/schedule create cold-outreach "0 8 * * 1" "@coo executa cold-outreach SDR"
/schedule create inteligencia-semanal "0 10 * * 1" "@coo executa inteligencia-semanal pra todos clientes"
/schedule create competitor-creative-lib "0 10 * * 1" "@coo executa scrape Meta Ad Library"
/schedule create newsletter "0 9 * * 2" "@coo executa newsletter pra todos clientes com newsletter ativa"
/schedule create weekly-digest-whatsapp "0 17 * * 5" "@coo executa weekly-digest-whatsapp"
/schedule create weekly-review-interna "0 17 * * 5" "@coo executa weekly-review-interna"
```

---

## 📅 Mensal

| Cron | Workflow | Dia | Justificativa |
|------|----------|-----|---------------|
| `0 9 1 * *` | `cobranca-mensal` | dia 1 9h | Geração faturas mês |
| `0 9 1 * *` | `gerar-mrr-mensal` (interno cobranca) | dia 1 9h | MRR mês anterior |
| `0 9 1 * *` | `review-portfolio-mensal` | dia 1 9h | Saúde portfólio mês |
| `0 9 1 * *` | `relatorio-cliente` (mensal) | dia 1 9h | Relatório mensal todos clientes |
| `0 9 1 * *` | `creative-leaderboard` | dia 1 9h | Top 10 criativos mês |
| `0 10 5 * *` | `lookalike-refresh` | dia 5 10h | LAL atualizado base seed nova |
| `0 10 5 * *` | `review-portfolio-mensal` | dia 5 10h | Snapshot pós-fechamento mês |
| `0 10 10 * *` | `pixel-event-validation` | dia 10 10h | Validação eventos pixel |
| `0 9 10 * *` | `clarity-comportamento` | dia 10 9h | Análise heatmap + recordings mês |
| Trigger 60d | `renovacao-contrato` | 60d antes vencimento | Cron diário checa vencimentos |
| Trigger 30d | `lancamento` (pré-fase) | quando aplicável | Lançamento agendado |

**Comandos `/schedule`:**
```
/schedule create cobranca-mensal "0 9 1 * *" "@coo executa cobranca-mensal todos clientes ativos"
/schedule create review-portfolio "0 9 5 * *" "@coo executa review-portfolio-mensal"
/schedule create relatorio-mensal "0 9 1 * *" "@coo executa relatorio-cliente periodo mes anterior pra todos clientes"
/schedule create creative-leaderboard "0 9 1 * *" "@coo executa creative-leaderboard mes anterior"
/schedule create lookalike-refresh "0 10 5 * *" "@coo executa lookalike-refresh todos clientes"
/schedule create pixel-validation "0 10 10 * *" "@coo executa pixel-event-validation"
/schedule create clarity-mensal "0 9 10 * *" "@coo executa clarity-comportamento mes anterior"
```

---

## 🗓️ Trimestral

| Cron | Workflow | Quando | Justificativa |
|------|----------|--------|---------------|
| `0 9 15 3,6,9,12 *` | `qbr-trimestral` | dia 15 mar/jun/set/dez | QBR clientes |
| `0 9 15 3,6,9,12 *` | `executive-summary-trimestral` | dia 15 mar/jun/set/dez | C-level summary |
| `0 9 20 3,6,9,12 *` | `nps-pesquisa` | dia 20 mar/jun/set/dez | NPS clientes |
| `0 9 20 3,6,9,12 *` | `icp-refinement` | dia 20 mar/jun/set/dez | Refina ICP baseado em dados |
| `0 9 20 3,6,9,12 *` | `custom-audience-hygiene` | dia 20 mar/jun/set/dez | Limpa audiências obsoletas |
| `0 9 25 3,6,9,12 *` | `okrs-trimestrais` | dia 25 mar/jun/set/dez | Define OKRs próximo Q |
| `0 9 25 3,6,9,12 *` | `upsell-pitch` (proativo) | dia 25 mar/jun/set/dez | Mapeia oportunidades upsell |

**Comandos `/schedule`:**
```
/schedule create qbr-trimestral "0 9 15 3,6,9,12 *" "@coo executa qbr-trimestral todos clientes ativos"
/schedule create nps-trimestral "0 9 20 3,6,9,12 *" "@coo executa nps-pesquisa todos clientes"
/schedule create icp-refinement "0 9 20 3,6,9,12 *" "@coo executa icp-refinement"
/schedule create audience-hygiene "0 9 20 3,6,9,12 *" "@coo executa custom-audience-hygiene todos clientes"
/schedule create okrs "0 9 25 3,6,9,12 *" "@coo executa okrs-trimestrais"
```

---

## 📅 Anual

| Cron | Workflow | Quando | Justificativa |
|------|----------|--------|---------------|
| `0 9 15 1 *` | `brand-voice-update` | 15 jan | Revisão style guide |
| `0 9 10 1 *` | `ano-novo-okrs-anuais` | 10 jan | OKRs anuais |
| `0 9 30 12 *` | `retrospectiva-ano` | 30 dez | Post-mortem ano (custom) |

---

## 🎯 Sob demanda (skill / pedido)

| Skill | Workflow | Trigger humano |
|-------|----------|----------------|
| `/campanha` | `ciclo-campanha` | Operador pede campanha nova |
| `/iterar` | `iteracao-criativa` | Operador OR alerta performance |
| `/auditar` | `auditoria-conta` | Operador pede auditoria |
| `/relatorio` | `relatorio-cliente` | Operador pede relatório ad-hoc |
| `/onboard` | `onboarding-cliente` | Cliente novo fechado |
| `/cliente-novo` | `prospec-fechamento` | Prospect entra pipeline |
| `/em5-roteiro-reels` | `reels-ig` | Roteiro Reels específico |
| `/em5-call-para-sop` | `ata-reuniao` OR `sop-update` | Pós-call |
| `/extrair-design` | `landing-page-build` | LP nova |
| `/construir` | `construcao-ciclo-completo` | Meta-time |
| — | `lancamento` | Cliente com lançamento agendado |
| — | `kickoff-call` | Pós-fechamento (parte do onboarding) |
| — | `reuniao-1on1-cliente` | Cadência contrato |
| — | `ab-test-ciclo` | Hipótese identificada |
| — | `webinar-captura` | Estratégia marketing |
| — | `lead-magnet` | Captura inbound |
| — | `branding-novo-cliente` | Cliente sem branding |
| — | `photoshoot-cliente` | Pedido cliente |
| — | `ugc-creator-pipeline` | Estratégia UGC |
| — | `influencer-outreach` | Estratégia influencer |
| — | `youtube-longform` | Canal YT ativo |
| — | `podcast-episodio` | Canal podcast ativo |
| — | `live-ig` | Live agendada |
| — | `linkedin-artigo` | Estratégia thought-leadership |
| — | `blog-seo` | Calendário editorial inbound |
| — | `email-nurture-drip` | Sequência configurada |
| — | `setup-pixel-tracking` | Cliente novo OR migração |
| — | `setup-ga4-eventos` | Cliente novo OR migração |
| — | `setup-conversion-api` | Cliente avançado |
| — | `cro-funil` | Conversão baixa identificada |
| — | `atribuicao-multi-touch` | Análise específica grandes contas |
| — | `case-study` | Cliente top performer |
| — | `parceria-network` | Oportunidade identificada |
| — | `analise-portfolio` | Pedido @ceo |
| — | `decisao-estrategica` | Decisão complexa @ceo |
| — | `recrutamento` | Demanda crescimento |
| — | `treinamento-equipe` | Novo funcionário |
| — | `contrato-cliente-novo` | Pós-fechamento prospect |
| — | `nda-prospect` | Diagnóstico aprofundado |
| — | `lgpd-review-campanha` | Antes publish formulário/captura |
| — | `sop-update` | Pós-call relevante |

---

## ⚡ Trigger por evento (webhook / detecção)

| Workflow | Trigger |
|----------|---------|
| `cobranca-falhou` | Webhook Asaas (PAYMENT_OVERDUE/REFUSED/CHARGEBACK) |
| `conta-suspensa-meta` | Notificação Meta OR daily-run detecta delivery=0 |
| `pixel-quebrado` | Daily-run detecta queda 80%+ conversões |
| `campanha-com-bug` | Erro detectado em produção |
| `crise-reputacao` | Scout alerta menção negativa OR comentário cliente |
| `churn-prevention` | Sinais detectados (financeiro OR NPS OR engajamento OR performance) |
| `crise-negocio` | Evento crítico negócio |
| `whatsapp-orquestracao` | Webhook WhatsApp Business OR WAHA |
| `monitorar-pagamento` (interno) | Webhook Asaas PAYMENT_CONFIRMED |

---

## 🔄 Workflows internos (chamados por outros)

Não disparam direto via cron — são step de outros workflows:

| Workflow interno | Disparado por |
|------------------|---------------|
| `gerar-mrr-mensal` (task) | step de `cobranca-mensal` |
| `setup-pixel-tracking` (workflow) | step de `onboarding-cliente` |
| `setup-ga4-eventos` (workflow) | step de `onboarding-cliente` |
| `lgpd-review-campanha` | gate antes de publish em qualquer captura |
| `contrato-cliente-novo` | step pós-`prospec-fechamento` |
| `cadastrar-asaas` (task) | step de `onboarding-cliente` |
| `kickoff-call` | step final `onboarding-cliente` |

---

## 🚦 Configuração `/schedule` recomendada

### Setup inicial

Rodar uma vez pra agendar todos os crons:

```bash
# Diários
/schedule create daily-run "0 8 * * 1-6"
/schedule create daily-standup "0 9 * * 1-5"
/schedule create monitorar-pagamento-asaas "0 10 * * 1-6"
/schedule create time-tracking "0 18 * * 1-5"

# Semanais
/schedule create cold-outreach "0 8 * * 1"
/schedule create inteligencia-semanal "0 10 * * 1"
/schedule create competitor-creative-lib "0 10 * * 1"
/schedule create newsletter "0 9 * * 2"
/schedule create weekly-digest-whatsapp "0 17 * * 5"
/schedule create weekly-review-interna "0 17 * * 5"

# Mensais
/schedule create cobranca-mensal "0 9 1 * *"
/schedule create relatorio-mensal "0 9 1 * *"
/schedule create creative-leaderboard "0 9 1 * *"
/schedule create review-portfolio-mensal "0 9 5 * *"
/schedule create lookalike-refresh "0 10 5 * *"
/schedule create pixel-validation "0 10 10 * *"
/schedule create clarity-mensal "0 9 10 * *"

# Trimestrais
/schedule create qbr-trimestral "0 9 15 3,6,9,12 *"
/schedule create exec-summary "0 9 15 3,6,9,12 *"
/schedule create nps-trimestral "0 9 20 3,6,9,12 *"
/schedule create icp-refinement "0 9 20 3,6,9,12 *"
/schedule create audience-hygiene "0 9 20 3,6,9,12 *"
/schedule create okrs "0 9 25 3,6,9,12 *"

# Anuais
/schedule create brand-voice "0 9 15 1 *"
```

### Validação pós-setup

```bash
/schedule list  # confirma todos agendados
/schedule run-test daily-run  # dry-run pra validar workflow
```

---

## 📊 Capacidade operacional estimada

Assumindo agência com N clientes ativos:

| Operação | Volume mensal | Tempo agente |
|----------|---------------|--------------|
| daily-run | N × 26 dias = 26N execuções | ~5 min cada (paralelo: 8min total) |
| relatorio-cliente | N relatórios | ~30 min cada |
| ciclo-campanha | ~0.5N campanhas novas | ~4h cada |
| iteracao-criativa | ~2N iterações | ~2h cada |
| reuniao-1on1 + ata | ~4N reuniões | ~1h cada (incluindo ata) |
| auditoria-conta | ~0.3N (não toda conta toda mês) | ~1h cada |
| qbr-trimestral | N/3 por mês (escalonado) | ~3h cada |

**Para N=10 clientes:** ~120h operação/mês = viável solo com automação em5.
**Para N=20 clientes:** ~240h = precisa equipe (2-3 pessoas) + delegação intensa via @coo.
**Para N=50+ clientes:** infraestrutura como esta + automação heavy é o que separa SaaS de serviço.

---

## 🔧 Manutenção deste arquivo

Quando criar/refatorar workflow:
1. Adicionar entrada na seção correspondente (diário/semanal/etc.)
2. Atualizar comando `/schedule` se mudar cadência
3. Atualizar `_roadmap.md` em paralelo
4. Commit com mensagem `docs(rotinas): {workflow} cadência {tipo}`

---

*em5 v1.4 — Rotinas Operacionais. Source of truth do "quando rodar o quê".*
