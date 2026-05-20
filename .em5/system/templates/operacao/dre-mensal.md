# DRE Mensal — {Nome Agência OU Cliente}

**Período:** {YYYY-MM}
**Gerado por:** @fin
**Data geração:** {YYYY-MM-DD}

## 1. Receita Bruta

| Item | Valor (R$) | % Total |
|------|-----------|---------|
| MRR contratos fixos | {valor} | {%} |
| Projetos one-off | {valor} | {%} |
| Comissão performance | {valor} | {%} |
| Outras (consultoria, treinamento) | {valor} | {%} |
| **Total Receita Bruta** | **{total}** | **100%** |

## 2. Impostos + Deduções

| Item | Valor (R$) | Alíquota |
|------|-----------|----------|
| Simples Nacional (PJ) | {valor} | {%} |
| ISS | {valor} | {%} |
| **Total Deduções** | **{total}** | — |

**Receita Líquida:** R$ {receita - deducoes}

## 3. Custos Diretos (CMV/CSV)

| Item | Valor (R$) | % Receita Líquida |
|------|-----------|-------------------|
| Salários equipe operacional | {valor} | {%} |
| Freelas + UGC creators | {valor} | {%} |
| Ferramentas (Composio, Asaas, etc.) | {valor} | {%} |
| Mídia paga (rara em agência — só se houver) | {valor} | {%} |
| **Total Custos Diretos** | **{total}** | **{%}** |

**Margem Bruta:** R$ {receita_liquida - custos} (**{margem_%}**)

## 4. Despesas Operacionais

| Categoria | Valor (R$) |
|-----------|-----------|
| Aluguel + estrutura | {valor} |
| Marketing agência (próprio) | {valor} |
| Software/SaaS overhead | {valor} |
| Comissões vendas internas | {valor} |
| Treinamento + capacitação | {valor} |
| Outras admin | {valor} |
| **Total OpEx** | **{total}** |

## 5. EBITDA

```
EBITDA = Margem Bruta - OpEx
EBITDA = R$ {margem_bruta} - R$ {opex}
EBITDA = R$ {ebitda} ({ebitda_margem_%})
```

## 6. Resultado Líquido

| Item | Valor (R$) |
|------|-----------|
| EBITDA | {ebitda} |
| (-) Depreciação | {valor} |
| (-) Juros financiamentos | {valor} |
| (-) IRPJ + CSLL | {valor} |
| **Resultado Líquido** | **{resultado}** |

## 7. Análise comparativa

| Métrica | Mês atual | Mês anterior | Delta % | Meta |
|---------|-----------|--------------|---------|------|
| Receita Bruta | R$ {atual} | R$ {anterior} | {delta}% | {meta} |
| Margem Bruta | {%} | {%} | {delta}pp | {meta}% |
| EBITDA | R$ {atual} | R$ {anterior} | {delta}% | {meta} |
| Margem Líquida | {%} | {%} | {delta}pp | {meta}% |

## 8. Observações + ações

- {ponto atenção 1 com ação}
- {ponto atenção 2}
- {oportunidade identificada}

## 9. Próximo mês — projeção

Receita projetada: R$ {valor} (baseado em pipeline confirmado + recorrência)

---

**Aprovação:** @ceo {data}
**Arquivamento:** `clientes/_agencia/financeiro/dre-{YYYY-MM}.md` OU `clientes/{cliente}/financeiro/dre-{YYYY-MM}.md`
