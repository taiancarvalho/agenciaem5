---
name: analisar-concorrentes
agent: strategist
description: Levantamento e analise competitiva para embasar posicionamento do cliente
inputs:
  - clientes/{nome}/onboarding/briefing-final.md
  - lista de concorrentes (fornecida no briefing ou solicitada ao usuario)
outputs:
  - clientes/{nome}/estrategia/analise-concorrentes.md
elicit: true
---

# Analisar Concorrentes

## Objetivo
Mapear o cenário competitivo do cliente para identificar gaps de posicionamento,
oportunidades inexploradas e ameaças que a estratégia precisa considerar.

## Passo a passo

1. **Confirmar lista de concorrentes**
   Verificar se o briefing-final.md contém concorrentes listados.
   Se não: perguntar ao usuário quais são os 3-5 principais concorrentes.

2. **Para cada concorrente, levantar:**
   - Posicionamento e mensagem principal (o que eles prometem?)
   - Canais onde anunciam (Meta, Google, etc.)
   - Tom e linguagem (formal, casual, agressivo, educativo)
   - Oferta e precão (se visível)
   - Pontos fortes percebidos
   - Gaps ou fraquezas notáveis

   > **Via Context7:** se precisar de benchmarks do setor ou dados de mercado,
   > consulte Context7 com a query relevante antes de avançar.

3. **Identificar o espaço de posicionamento**
   - Onde todos os concorrentes estão? (espaço saturado)
   - Onde nenhum está? (oportunidade)
   - Qual linguagem ninguém usa?
   - Qual dor ninguém resolve claramente?

4. **Gerar insights acionáveis para o cliente**
   Cada insight deve ter uma implicação prática para a estratégia.

5. **Salvar** em `clientes/{nome}/estrategia/analise-concorrentes.md`

## Output esperado

```markdown
# Análise de Concorrentes — {nome do cliente} — {data}

## Panorama Competitivo

| Concorrente | Posicionamento | Canais | Tom | Oferta | Gap |
|-------------|---------------|--------|-----|--------|-----|
| ...         | ...           | ...    | ... | ...    | ... |

## Espaços de Oportunidade
1. ...
2. ...

## Riscos / Ameaças
1. ...

## Implicações para a Estratégia de {nome do cliente}
- Posicionamento sugerido: ...
- Mensagem diferenciadora: ...
- Canais com menos concorrência: ...
```
