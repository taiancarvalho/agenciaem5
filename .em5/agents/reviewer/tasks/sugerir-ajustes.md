---
name: sugerir-ajustes
agent: reviewer
description: Lista gaps no componente com sugestões específicas pro @builder corrigir
inputs:
  - .em5/infra/forge/{ticket}/spec.md
  - .em5/infra/forge/{ticket}/build-log.md
  - arquivos criados
outputs:
  - .em5/infra/forge/{ticket}/review.md (com gaps + sugestões)
elicit: false
model_tier: frontier
---

# Task: sugerir-ajustes

## Objetivo

Quando `*validar-componente` retorna AJUSTES (não BLOQUEADO nem APROVADO), esta task gera lista acionável.

## Diferença vs `*validar-componente`

| Task | Retorna |
|------|---------|
| `validar-componente` | Veredicto + gaps gerais |
| `sugerir-ajustes` | Lista específica de mudanças (linha por linha) |

## Passo a passo

1. Pega lista de gaps de `validar-componente` (já rodou)
2. Pra cada gap, gera sugestão concreta:
   - **Gap:** "Anti-papel não tem 3 itens"
   - **Sugestão:** "Em `.em5/agents/{id}/persona.md` linha {N}, adicionar 2 itens. Sugestões baseadas no domínio: 1) NÃO X 2) NÃO Y"

3. Estrutura no `review.md`:
   ```markdown
   ## Gaps a corrigir (AJUSTES)

   ### Gap 1: Anti-papel insuficiente
   - **Arquivo:** .em5/agents/{id}/persona.md
   - **Linha:** 45
   - **Atual:** "anti_papel: [- NÃO substitui agentes em5]"
   - **Sugerido:** adicionar 2 itens:
     ```yaml
     anti_papel:
       - NÃO substitui agentes em5 existentes
       - NÃO {sugestão específica do domínio}
       - NÃO {sugestão específica}
     ```

   ### Gap 2: Model tier ausente
   - **Arquivo:** .em5/agents/{x}/{y}.md frontmatter
   - **Atual:** sem `model_tier`
   - **Sugerido:** adicionar `model_tier: balanced` (estimativa baseada em complexidade)
   ```

4. Status: `building` → `building` (volta pro Cunha)
5. Chama `@builder *implementar-componente` com instruções específicas

## Critério de saída

- Lista de gaps numerada com arquivos + linhas + sugestões
- @builder pode aplicar sem precisar pensar
- review.md serve de checklist

## Anti-padrão

- NÃO sugere mudanças vagas ("melhorar tom")
- NÃO sugere refator amplo (só corrige gaps pontuais)
- NÃO renegocia spec (Lima respeita Arq)
