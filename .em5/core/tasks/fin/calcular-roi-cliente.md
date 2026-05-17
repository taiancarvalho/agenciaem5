---
name: calcular-roi-cliente
agent: fin
description: ROI = (receita Asaas - custo ads Composio - custo agência) / custo agência
inputs:
  - cliente_slug
  - periodo: ultimo_mes | ultimos_3 | YTD
outputs:
  - .em5/clientes/{slug}/financeiro/roi-{periodo}.md
elicit: false
model_tier: balanced
---

# Task: calcular-roi-cliente

## Objetivo

ROI por cliente é métrica-chave pra decidir manter/escalar/churn. Solo gestor não pode ter cliente que dá prejuízo de tempo.

## Fórmula

```
Receita = pagamentos confirmados Asaas no periodo
Custo ads = soma de gastos Meta + Google (via Composio)
Custo agência (interno) = custo_hora * horas_dedicadas (do log operacional)

ROI_cliente = (Receita - Custo_ads) / Custo_agência_interno
```

## Passo a passo

1. Lê `cobrancas.yaml` → soma pagas no período
2. Lê via Composio Meta Ads: `account_spend(account_id, date_range)`
3. Lê via Composio Google Ads (se aplicável): idem
4. Soma horas em `clientes/{slug}/operacao/log.md` (auditável)
5. Multiplica por `custo_hora_agencia` (default R$ 80 — em `em5-config.yaml`)
6. Calcula ROI
7. Salva `.em5/clientes/{slug}/financeiro/roi-{periodo}.md`:
   ```markdown
   # ROI {cliente} — {periodo}
   - Receita: R$ {X}
   - Custo ads (Meta+Google): R$ {Y}
   - Custo agência interno: R$ {Z}
   - **ROI:** {N}x

   ## Diagnóstico
   - {< 1.5x: alerta de churn-risk}
   - {1.5–3x: ok, padrão}
   - {> 3x: candidato pra upsell}
   ```
8. Se `ROI < 1.5x` → notifica `@ceo Atlas`

## Critério de saída

- Arquivo `roi-{periodo}.md` gerado
- Status em `status.yaml` atualizado com `roi_ultimo: {N}`
- @ceo notificado se ROI baixo
