---
name: criar-proposta
agent: vendas
description: Gera proposta comercial baseada no diagnóstico aprovado
inputs:
  - .em5/prospects/{slug}/diagnostico.md
  - escopo (lista de serviços a contratar)
outputs:
  - .em5/prospects/{slug}/proposta.md
elicit: true
model_tier: balanced
template: .em5/system/templates/vendas/proposta.template.md
data_dependency: .em5/system/data/vendas/preco-por-nicho.yaml
---

# Task: criar-proposta

## Objetivo

Proposta executiva ≤ 2 páginas. Não vende, **resume o acordo**. Cliente assina pra confirmar entendimento, não pra ser convencido.

## Passo a passo

1. Lê diagnóstico + escopo definido em call
2. Lê `preco-por-nicho.yaml` pra range justo
3. Aplica template `proposta.template.md`:
   - Cabeçalho (cliente, agência, data)
   - Resumo do diagnóstico (1 parágrafo)
   - Escopo (lista numerada, sem ambiguidade)
   - Cronograma (mês 1 / 2 / 3+)
   - Investimento (mensalidade + taxa setup se houver)
   - Métricas de sucesso (3 KPIs trackáveis)
   - Cláusula de saída (rescisão fair)
   - Próximo passo (assinatura digital ou aceite WhatsApp)
4. Salva `.em5/prospects/{slug}/proposta.md`
5. Envia via Composio gmail OU WhatsApp via @whats Onda

## Critério de saída

- Proposta gerada e enviada
- Status atualizado em `prospects/{slug}/status.yaml`: aguardando_aceite
- Próximo: `*follow-up` em 48h se sem resposta

## Anti-padrão

- NÃO desconto antes de pedido (Art. V — sem invenção)
- NÃO promessa de número específico (use range + condicional)
- NÃO escopo aberto ("e mais tudo que precisar")
