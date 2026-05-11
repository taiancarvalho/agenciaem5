---
name: auditar-conta-google
agent: traffic
description: Auditoria completa de conta Google Ads via Composio
inputs:
  - clientes/{nome}/onboarding/briefing-final.md
  - clientes/{nome}/estrategia/plano-estrategico.md
outputs:
  - clientes/{nome}/auditoria/auditoria-google-{data}.md
elicit: false
---

# Auditar Conta Google Ads

## Objetivo
Mapear o estado atual da conta Google Ads do cliente, identificar o que está funcionando,
o que está desperdiçando verba e o que está faltando.

## Passo a passo

1. **Ler o cliente**
   - `briefing-final.md` — objetivo, segmento, produto/serviço, público
   - `plano-estrategico.md` — metas, KPIs esperados, estratégia acordada

2. **Acessar a conta via Composio**

   > Se não souber os parâmetros exatos das ferramentas abaixo,
   > **consulte Context7 antes de executar.**

   Dados a coletar:
   - Campanhas ativas e pausadas (nome, objetivo, status, gasto, conversões)
   - Grupos de anúncios por campanha
   - Palavras-chave: match type, CTR, CPC, posição média, qualidade
   - Palavras negativas configuradas
   - Termos de pesquisa (o que realmente disparou os anúncios)
   - Assets dos anúncios (headlines, descriptions, performance)
   - Extensões de anúncio configuradas
   - Configuração de conversoes (o que está sendo rastreado?)

3. **Analisar por área**

   **Estrutura:**
   - Campanha tem 1 tema por grupo? Ou está misturado?
   - Match types adequados para o objetivo?
   - Quality Score das principais palavras (abaixo de 6 = problema)

   **Palavras-chave:**
   - Termos irrelevantes disparando anúncios?
   - Palavras de alta intencão sendo cobertas?
   - Palavras negativas suficientes?

   **Anúncios:**
   - Pelo menos 3 variações por grupo?
   - RSA com assets suficientes (15 headlines, 4 descriptions)?
   - Existe correspondência entre a busca, o anúncio e a landing page?

   **Rastreamento:**
   - Tag de conversão instalada e disparando corretamente?
   - Microconversões configuradas (visualização de página, tempo no site)?

4. **Identificar prioridades**
   Classificar os achados em:
   - 🔴 Crítico (desperdício ativo ou conversão não rastreada)
   - 🟡 Atenção (afeta performance mas não crítico)
   - 🟢 Melhoria (otimização de longo prazo)

5. **Salvar** em `clientes/{nome}/auditoria/auditoria-google-{data}.md`

## Output esperado

```markdown
# Auditoria Google Ads — {nome do cliente} — {data}

## Resumo Executivo
- Status geral: ...
- Gasto mensal atual: R$ ...
- Conversoes rastreadas: sim/nao
- Principal problema identificado: ...

## Estrutura de Campanhas
| Campanha | Objetivo | Status | Gasto/mês | Conversões | CPL |
|----------|----------|--------|-----------|-----------|-----|

## Achados por Área
### 🔴 Criticos
### 🟡 Atencao
### 🟢 Melhorias

## Plano de Acao (próximos 30 dias)
1. ...
2. ...
```
