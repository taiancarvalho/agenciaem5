# Task: auditar-conta-google
# Agente: traffic (Pulse)
# Input: acesso a conta Google Ads do cliente
# Output: relatorio de auditoria + lista de acoes priorizadas

## Objetivo
Auditar conta Google Ads do cliente, identificando campanhas ativas, performance, problemas estruturais e oportunidades de melhoria.

## Pre-requisitos
- Acesso a conta Google Ads configurado via Composio MCP
- `em5-config.yaml` com `google_ads: true`
- Se nao souber os parametros corretos: consultar Context7 antes de executar

## Execucao

### 1. Visao Geral da Conta
Via Composio MCP (Google Ads API):
- Lista de campanhas ativas e pausadas
- Gasto total nos ultimos 30 dias
- Principais KPIs: impressoes, cliques, CTR, CPC medio, conversoes, CPA
- Status de medicao de conversoes (configurado? disparando?)

### 2. Auditoria por Campanha
Para cada campanha ativa, verificar:

**Estrutura:**
- Tipo de campanha (Search, Performance Pulse, Display, Video)
- Numero de grupos de anuncios
- Qualidade dos anuncios (Ad Strength para Search)
- Extensoes configuradas (sitelinks, callouts, etc.)

**Performance:**
- Parcela de impressoes (Impression Share) — abaixo de 50% indica oportunidade ou problema
- Quality Score das palavras-chave (< 7 e preocupante)
- CPA versus meta definida no plano estrategico

**Keywords (se Search):**
- Palavras-chave com gasto alto e 0 conversoes — pausar
- Palavras-chave com bom desempenho — escalar
- Search Terms — palavras irrelevantes gerando custo (adicionar como negativas)
- Match types — muito amplo = desperdicio, muito restrito = alcance baixo

**Budget:**
- Orcamento diario versus gasto real (limitado por budget?)
- Distribuicao entre campanhas

### 3. Checklist de Problemas Criticos
- [ ] Medicao de conversoes configurada e disparando
- [ ] Sem palavras-chave com 0 impressoes por mais de 30 dias (problema de lance ou relevancia)
- [ ] Sem anuncios reprovados por politica
- [ ] Sem palavras-chave largas sem negativas (risco de desperdicio)
- [ ] Pixel/tag instalada corretamente no site

### 4. Gerar Relatorio
Salvar em: `clientes/{nome}/trafego/auditoria-google-{YYYY-MM-DD}.md`

```markdown
# Auditoria Google Ads — {nome-do-cliente}
**Data:** {data} | **Conta:** {ID da conta}

---

## Visao Geral
- Campanhas ativas: {N}
- Gasto 30d: R$ {valor}
- Conversoes 30d: {N}
- CPA medio: R$ {valor}
- Meta de CPA: R$ {valor do plano}

model_tier: balanced  # auto-set Fase 12.AAA legacy audit
---

## Status por Campanha

| Campanha | Tipo | Status | Gasto | Conv. | CPA | Acao |
|---------|------|--------|-------|-------|-----|------|
| {nome} | Search | Ativo | R$X | N | R$Y | Otimizar |

---

## Problemas Criticos
{lista de problemas que precisam de acao imediata}

---

## Recomendacoes Priorizadas
1. {acao urgente — impacto alto}
2. {acao importante — proxima semana}
3. {acao de melhoria — proximo mes}

---

## Proximos Passos
{o que será feito e quando}
```

## Ferramentas
- Google Ads API: via Composio MCP
- Google Analytics: via Composio MCP (confirmar integracao GA4 → Google Ads)
- Context7: se precisar consultar parametros especificos da API ou melhores praticas

## Handoff
- Relatorio salvo em `trafego/`
- Registrar no log operacional: "Auditoria Google Ads concluida em {data}"
- Comunicar @coo: auditoria disponivel + lista de acoes priorizadas
- @coo decide se aciona @cs para comunicar cliente sobre ajustes
