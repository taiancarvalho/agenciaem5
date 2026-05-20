# Fluxo de Caixa Semanal — {Agência OU Cliente}

**Semana:** {YYYY-SS} ({data início} a {data fim})
**Gerado por:** @fin
**Frequência:** semanal (sex 17h)

## Saldo

| Conta | Saldo início | Entradas | Saídas | Saldo fim |
|-------|--------------|----------|--------|-----------|
| Conta corrente | R$ {} | R$ {} | R$ {} | R$ {} |
| Asaas (recebimentos) | R$ {} | R$ {} | R$ {} | R$ {} |
| Reserva emergência | R$ {} | R$ {} | R$ {} | R$ {} |
| **Total** | **R$ {}** | **R$ {}** | **R$ {}** | **R$ {}** |

## Entradas detalhadas (semana)

| Data | Origem | Categoria | Valor | Status |
|------|--------|-----------|-------|--------|
| {data} | {cliente} | MRR mensal | R$ {} | ✅ pago |
| {data} | {cliente} | Projeto extra | R$ {} | ✅ pago |
| {data} | {cliente} | Comissão | R$ {} | ⏳ aguarda |

**Total entrado:** R$ {}
**Total pendente confirmação:** R$ {}

## Saídas detalhadas (semana)

| Data | Destino | Categoria | Valor |
|------|---------|-----------|-------|
| {data} | {fornecedor} | {salário/SaaS/freela} | R$ {} |
| ... | ... | ... | ... |

**Total saídas:** R$ {}

## Inadimplência atual

| Cliente | Valor vencido | Dias atraso | Status escalation |
|---------|--------------|-------------|-------------------|
| {nome} | R$ {} | {N}d | INADIMPLENTE_5d / 15d / 30d |

**Total inadimplência:** R$ {} ({%} do MRR)

## Projeção próximas 4 semanas

| Semana | Entradas previstas | Saídas previstas | Saldo final projetado |
|--------|---------------------|------------------|------------------------|
| {S+1} | R$ {} | R$ {} | R$ {} |
| {S+2} | R$ {} | R$ {} | R$ {} |
| {S+3} | R$ {} | R$ {} | R$ {} |
| {S+4} | R$ {} | R$ {} | R$ {} |

## Burn rate + runway

- **Burn médio mensal:** R$ {}
- **Saldo atual:** R$ {}
- **Runway sem novos contratos:** {N} meses

## Alertas

### 🔴 Crítico
- {ex: saldo < 1 mês burn = ALERTA + escalation @ceo}

### 🟡 Atenção
- {ex: inadimplência > 5% MRR}

### 🟢 OK
- {confirmar entradas previstas semana N+1 efetivamente entraram}

## Ações próxima semana

| Ação | Quem | Prazo |
|------|------|-------|
| Cobrar inadimplência > 5d | @cs | Segunda |
| Renegociar fornecedor X | @ceo | Terça |
| Conciliar Asaas | @fin | Quinta |

---

**Arquivamento:** `clientes/_agencia/financeiro/fluxo-caixa/{YYYY-SS}.md`
**Aprovação:** @ceo se saldo < runway 3 meses
