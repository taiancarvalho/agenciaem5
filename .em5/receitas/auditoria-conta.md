---
nome: auditoria-conta
skill: /auditar
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 5-10min
qa_gate: true
versao: 1.0
---

# Receita: Auditoria de Conta de Anúncios

> Diagnóstico 30/60/90d Meta Ads OR Google Ads — read-only, sem alteracoes.

## Quando usar
- Auditoria conta nova OR diagnóstico antes otimização
- Janela mínima 30d (significância estatística)

## Não usar quando
- Conta < 30d ativa (sem dados)
- Auditoria + ação misturadas — separar em 2 demandas

## Inputs
- ad_account_id (Meta) OR customer_id (Google Ads)
- janela (default 90d)
- perfil-negocio.md (compliance)

## Steps

### 1. @traffic coleta + analisa
**Tempo:** 5-7min
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md` OR `.em5/blocos/traffic-composio-google-ads-fetch.md`
**Output:** `clientes/{nome}/trafego/auditoria-{YYYY-MM-DD}.md`

Inline: identifica anomalias (TZ errada, page fan-low, ENG vs LEADS, saturação freq>4.0) + Top 3 ações priorizadas.

### 2. @qa valida
**Tempo:** 2-3min
**Usa bloco:** `.em5/blocos/qa-validar-relatorio.md`
Checklist específico: ações acionáveis (não vagas) · evidência numérica · Art. VI honestidade limitações declaradas · sem alteração proposta implementada.

### 3. @cs apresenta
**Tempo:** 1min
**Usa bloco:** `.em5/blocos/cs-registrar-log-operacional.md`
Apresenta Top 3 ações ao user + sugere próximo passo (/iterar se aplicável).

## Outputs
| Artefato | Path |
|----------|------|
| Relatório auditoria | `clientes/{nome}/trafego/auditoria-{data}.md` |
| Ticket | `historico/{id}/ticket.md` |
| QA verdict | inline yaml step 2 ticket |

## Anti-padrões
- ❌ Auditar sem perfil-negocio.md
- ❌ Misturar com `/iterar` (auditoria é read-only)
- ❌ Janela < 30d
- ❌ Fabricar números (Art. VI)

## Métricas
- Duração total: <= 10min/conta (paralelo: 4 contas em ~8min)
- Tokens alvo: <= 120k/conta
- Taxa aprovação QA primeira: >= 90%

## Composio MCP
- meta_ads OR google_ads
