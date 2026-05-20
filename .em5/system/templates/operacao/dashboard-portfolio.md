# Dashboard Portfólio Agência — {Período}

**Snapshot:** {YYYY-MM-DD}
**Gerado por:** @fin + @cs + @coo
**Cadência:** mensal (dia 5)

## Visão geral

| Métrica | Atual | Mês -1 | Mês -3 | Delta 3M |
|---------|-------|--------|--------|----------|
| Clientes ativos | {N} | {N} | {N} | {%} |
| MRR | R$ {valor} | R$ {valor} | R$ {valor} | {%} |
| ARR (proj 12M) | R$ {valor} | — | — | — |
| Churn rate mensal | {%} | {%} | {%} | {delta_pp} |
| NRR (Net Revenue Retention) | {%} | {%} | {%} | {delta_pp} |
| Ticket médio | R$ {valor} | R$ {valor} | R$ {valor} | {%} |
| LTV médio | R$ {valor} | — | — | — |
| CAC médio | R$ {valor} | — | — | — |
| LTV/CAC ratio | {Nx} | — | — | — |
| Gross margin média | {%} | {%} | {%} | {delta_pp} |

## Saúde por cliente (Tier A/B/C)

### Tier A (Top 20% — high LTV/baixo churn)

| Cliente | Perfil | MRR | LTV | Mês cliente | NPS | Status |
|---------|--------|-----|-----|-------------|-----|--------|
| {nome} | PN-0X | R$ {} | R$ {} | {N} | {0-10} | 🟢/🟡/🔴 |

### Tier B (Médio — meta cresce ou estabiliza)

| Cliente | Perfil | MRR | Mês cliente | Risco | Ação |
|---------|--------|-----|-------------|-------|------|
| {nome} | PN-0X | R$ {} | {N} | {baixo/médio} | {ação} |

### Tier C (Baixo — alto custo ou churn risk)

| Cliente | Perfil | MRR | Mês cliente | Risco | Decisão @ceo |
|---------|--------|-----|-------------|-------|--------------|
| {nome} | PN-0X | R$ {} | {N} | {alto} | {MANTER/RENEGOCIAR/OFFBOARDING} |

## Movimento mensal

| Categoria | Quantidade | MRR Impacto |
|-----------|-----------|-------------|
| Novos clientes | {N} | +R$ {} |
| Upsell em base | {N} | +R$ {} |
| Downsell em base | {N} | -R$ {} |
| Churn | {N} | -R$ {} |
| **Net change** | {N} | **{+/-R$ }** |

## Capacidade operacional

| Indicador | Atual | Capacidade máx | Utilização |
|-----------|-------|----------------|------------|
| Clientes ativos | {N} | {N} | {%} |
| Horas operacionais/mês | {H} | {H} | {%} |
| QBRs trimestre | {N} | {N} | {%} |
| Onboardings paralelos | {N} | {N} | {%} |

**Limite saudável:** 70-80% utilização. > 90% = risco delivery quality.

## Concentração de receita

- **Top 1 cliente:** {%} do MRR — {se > 20%: ALERTA risco}
- **Top 3 clientes:** {%} do MRR
- **Top 5 clientes:** {%} do MRR
- **Pareto check:** 20% clientes geram {%} do MRR (saudável >= 80%)

## Pipeline comercial

| Estágio | Quantidade | Valor potencial MRR |
|---------|-----------|---------------------|
| Diagnóstico agendado | {N} | R$ {} |
| Proposta enviada | {N} | R$ {} |
| Em negociação | {N} | R$ {} |
| **Total pipeline** | {N} | **R$ {}** |

Conversion alvo proposta → fechado: 25% → previsão fechamentos próximos 30d: {N} clientes / R$ {} MRR.

## Alertas + decisões pendentes

### 🔴 Crítico (decisão @ceo necessária esta semana)
- {ítem 1}
- {ítem 2}

### 🟡 Atenção (monitorar 30d)
- {ítem 1}

### 🟢 OK (continuar)
- {ítem 1}

## Próximas ações

| Ação | Responsável | Prazo |
|------|-------------|-------|
| {ação 1} | @ceo OR @coo | {data} |
| {ação 2} | @vendas | {data} |

---

**Arquivamento:** `clientes/_agencia/portfolio/dashboard-{YYYY-MM}.md`
