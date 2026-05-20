---
nome: analise-portfolio
skill: /portfolio
tipo: estrategico
classificacao_skill: estrategico
agente_orquestrador: ceo
agente_responsavel_entrega: ceo
tempo_medio: 2-3h
qa_gate: false
versao: 1.0
---

# Receita: Análise Portfólio Agência

> Saúde agência mensal — MRR + churn + LTV/CAC + tier A/B/C.

## Quando usar
- Cron mensal (dia 5)
- Pedido @ceo ad-hoc

## Steps

### 1. @fin consolidar números
**Usa bloco:** `.em5/blocos/fin-asaas-listar-status.md`
MRR · ARR · churn · NRR · LTV · CAC · concentração.

### 2. @coo consolidar capacidade operacional
Clientes ativos × capacidade max × utilização.

### 3. @vendas consolidar pipeline
Diagnóstico · proposta · negociação · valor potencial.

### 4. @strategist análise tier A/B/C
Tier A top 20% (high LTV) · Tier B médio · Tier C baixo (risco).

### 5. @ceo decisões pendentes + ações
Crítico (decisão semana) · atenção (monitorar 30d) · OK.

**Output:** `clientes/_agencia/portfolio/dashboard-{YYYY-MM}.md` (usa template `system/templates/operacao/dashboard-portfolio.md`)

## Outputs
- Dashboard preenchido
- Decisões @ceo registradas

## Métricas
- Frequência: mensal
- Pareto check: 20% clientes geram >= 80% MRR (saudável)
- LTV/CAC: >= 3x

## Composio MCP
- asaas · meta_ads · google_ads
