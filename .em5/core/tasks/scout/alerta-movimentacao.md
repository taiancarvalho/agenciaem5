---
name: alerta-movimentacao
agent: scout
description: Detecta mudanças relevantes em concorrentes + notifica
inputs:
  - cliente_slug
  - mudanca_detectada (de scrape diff)
outputs:
  - .em5/clientes/{slug}/inteligencia/alertas-{YYYY-MM}.md (append)
  - notificação @strategist se relevante
elicit: false
model_tier: balanced
---

# Task: alerta-movimentacao

## Objetivo

Classificar mudanças detectadas em scrape/ads e decidir se merece atenção.

## Severity de mudanças

| Mudança | Severity | Ação |
|---------|----------|------|
| Concorrente baixou preço > 20% | alto | Alerta @strategist + @ceo |
| Concorrente lançou serviço novo | medio | Alerta @strategist |
| Concorrente mudou headline | baixo | Log silencioso |
| Concorrente subiu ads novos | medio | Salvar ângulos pra inspirar |
| Concorrente parou de anunciar | alto | Oportunidade — investigar pq |
| Concorrente fechou/sumiu | critico | @ceo + @vendas (mercado vago) |

## Passo a passo

1. Recebe diff de `scrape-site-concorrente` ou `monitorar-ads-concorrente`
2. Classifica severity (tabela acima)
3. Append em `clientes/{slug}/inteligencia/alertas-{YYYY-MM}.md`:
   ```markdown
   ## {data} — {concorrente} — {tipo_mudanca}
   - Severity: {sev}
   - Evidência: {link/snapshot}
   - Recomendação: {ação}
   ```
4. Se severity ≥ medio → notifica `@strategist Vera`
5. Se severity = crítico → notifica `@ceo Atlas` também
6. Append em `learnings/{mes}/scout-padroes.md` (padrões viram learning)

## Critério de saída

- Alerta classificado
- Notificação enviada se relevante
- Learning capturado se padrão

## Anti-padrão

- NÃO inflar severity ("concorrente respira")
- NÃO ignorar movimento crítico
