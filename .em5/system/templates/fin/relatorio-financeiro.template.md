# Relatório Financeiro — {Mês/Ano}

**Agência:** {NOME_AGENCIA}
**Data:** {YYYY-MM-DD}

---

## 📊 MRR

- **Total:** R$ {MRR}
- Clientes ativos: **{N}**
- Novos no mês: **+{X}** (R$ {valor_new})
- Churn no mês: **−{Y}** (R$ {valor_churn})
- Net: **{+/-Z}** (R$ {valor_net})

**ARR projetado:** R$ {MRR × 12}

## 💰 Receita realizada (pagamentos confirmados)

| Métrica | Valor |
|---------|-------|
| Cobranças emitidas | {N} |
| Pagas | {X} ({%}) |
| Vencidas | {Y} ({%}) |
| Total recebido | R$ {recebido} |
| Pendente | R$ {pendente} |

## 📈 ROI por cliente

| Cliente | Receita | Custo ads | Custo interno | ROI | Status |
|---------|---------|-----------|---------------|-----|--------|
| {cliente_1} | R$ {x} | R$ {y} | R$ {z} | {N}x | 🟢 ok |
| {cliente_2} | ... | ... | ... | ... | 🟡 médio |

**Média ROI:** {N}x

## ⚠️ Inadimplência

| Cliente | Valor | Dias atraso | Severity | Status |
|---------|-------|-------------|----------|--------|
| {cliente_x} | R$ {valor} | {N} | {sev} | {acao} |

Total em atraso: R$ {total}

## 💵 Lucratividade

- Receita total: R$ {receita}
- Custo ads (passa pra cliente): R$ {custo_ads}
- Custo agência (horas × {custo_hora}): R$ {custo_interno}
- **Lucro bruto:** R$ {lucro}
- **Margem:** {%}

## 🎯 Top 3 ações sugeridas

1. **{Ação 1}** — ex: Upsell {cliente X} (ROI {N}x, sinal positivo pra +1 serviço)
2. **{Ação 2}** — ex: Conversar {cliente Y} (ROI < 1.5x, risco de churn)
3. **{Ação 3}** — ex: Otimizar custo em {nicho Z} (gasto interno alto vs receita)

---

*Relatório gerado pelo @fin Caixa via `*relatorio-financeiro`. Pra detalhes por cliente: `*calcular-roi-cliente`.*
