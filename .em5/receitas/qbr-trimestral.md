---
nome: qbr-trimestral
skill: /qbr
tipo: hibrido
classificacao_skill: hibrido
agente_orquestrador: ceo
agente_responsavel_entrega: cs
tempo_medio: 1-2h preparação + 60-90min apresentação
qa_gate: true
versao: 1.0
---

# Receita: QBR Trimestral

> Revisão executiva 3M + decisões + plano próximo trimestre.

## Quando usar
- Cron trimestral (dia 15 mar/jun/set/dez)
- Pedido cliente

## Steps

### 1. @traffic consolida dados 3M
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md` (janela 90d)
**Output:** `clientes/{nome}/qbr/{YYYY-Q}/dados-consolidados.md`

### 2. @strategist revisa plano + hipóteses
**Usa bloco:** `.em5/blocos/strategist-analise-dados.md`
**Output:** `plano-proximo-trimestre.md` (hipóteses confirmadas/refutadas + nova direção + KPIs)

### 3. @cs monta deck (skill `/em5-deck-pptx`)
15-20 slides executivo (resumo + resultados + aprendizados + plano + decisões pedidas).

### 4. @qa valida
**Usa bloco:** `.em5/blocos/qa-validar-relatorio.md`
Coerência com relatórios mensais · decisões pedidas claras · tom executivo.

### 5. @cs apresenta (60-90min)
Composio: googlemeet. Reunião decisão.

### 6. @ceo documenta decisões
Ata + assinatura plano-próximo-trimestre. Input renovação.

## Outputs
- `clientes/{nome}/qbr/{Q}/deck-qbr.pptx`
- `clientes/{nome}/qbr/{Q}/ata.md`
- `clientes/{nome}/qbr/{Q}/plano-proximo-trimestre.md` assinado

## Métricas
- Prazo: <= 15 dias úteis pós-trimestre
- Taxa renovação pós-QBR: >= 90%

## Composio MCP
- meta_ads · google_ads · google_analytics · googlemeet · googlecalendar
