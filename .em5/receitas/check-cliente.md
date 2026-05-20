---
nome: check-cliente
skill: /check-cliente
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 5min
qa_gate: false
versao: 1.0
---

# Receita: Check Pré-Operacional (35 itens)

> Verifica acessos + tracking + branding + financeiro + estratégia + compliance ANTES de operar.

## Quando usar
- Antes 1ª campanha (`/campanha` falha se score < 80%)
- Mensal manutenção preventiva
- Trigger crisis (check desatualizado)

## Inputs
- `clientes/{nome}/onboarding/perfil-negocio.md`
- `clientes/{nome}/setup-tecnico/status.md`

## Steps

### 1. @cs valida 6 dimensões (35 itens)
- Acessos digitais (BM + GA + GAds + WhatsApp Business) — 7
- Tracking (pixel + CAPI + GA4 + UTM + iOS AEM) — 5
- Branding (cores + fontes + guia + logo + exemplos) — 5
- Financeiro (Asaas + cobrança + contrato + plano + status) — 5
- Estratégia (perfil + briefing + plano + KPIs + ICP) — 5
- Compliance (LGPD + perfil-específico CFM/OAB/CDC/CVM) — 8

**Output:** `clientes/{nome}/operacao/check-{YYYY-MM-DD}.md`

## Outputs
- Checklist com score X/35 + Status (PRONTO / ATENÇÃO / NÃO_OPERA / RE_ONBOARDING)
- Lista bloqueantes detalhada

## Decisão pós-check
| Score | Status | Ação |
|-------|--------|------|
| 35/35 | PRONTO | Operar normal |
| 28-34 | ATENÇÃO | Operar — bloqueantes zero |
| 18-27 | NÃO_OPERA | Resolver bloqueantes primeiro |
| < 18 | RE_ONBOARDING | Desde zero |

## Anti-padrões
- ❌ Skip por "sei que tá ok"
- ❌ Operar com score < 80% sem aprovação @ceo
- ❌ Score 100% sem testar mobile (CAPI/pixel só vê browser)

## Métricas
- Duração: <= 5min
- Taxa PRONTO clientes ativos: > 90%

## Composio MCP
- meta_ads · google_ads · google_analytics · asaas · whatsapp_business
