---
name: pesquisar-prospect
agent: vendas
description: Pesquisa prospect via web/social pra entender negócio + dores
inputs:
  - prospect_nome (empresa ou pessoa)
  - prospect_url (site ou Instagram)
outputs:
  - .em5/prospects/{slug}/pesquisa.md
elicit: true
model_tier: balanced
---

# Task: pesquisar-prospect

## Objetivo

Reunir contexto público do prospect em ≤ 5 min pra entrar com diagnóstico armado, não improvisado.

## Passo a passo

1. **Slug do prospect** → `slugify(prospect_nome)`
2. **Composio firecrawl** scrape do site (homepage, sobre, serviços, blog últimos 3 posts)
3. **Composio firecrawl** scrape Instagram bio + últimos 10 posts (se URL fornecida)
4. Identifica:
   - Nicho real (não o declarado)
   - Tamanho (funcionários, faturamento estimado se público)
   - Concorrentes diretos visíveis (footer, parceiros)
   - Sinais de dor (reclamação em Reviews, FAQs sobre prazo, etc.)
   - Stack atual (analytics, pixel, chat, etc.)
5. Salva `.em5/prospects/{slug}/pesquisa.md` com seções: Quem é / O que vende / Pra quem / Dores aparentes / Oportunidade hipótese

## Critério de saída

- Arquivo `pesquisa.md` criado
- ≤ 5 min wall-clock
- Pelo menos 3 dores hipotéticas identificadas
- Próximo passo: `*gerar-diagnostico`

## Anti-padrão

- NÃO copia conteúdo bruto. Sintetiza.
- NÃO chuta dor sem evidência (cita fonte: "Review Google 3 estrelas reclamando de prazo")
