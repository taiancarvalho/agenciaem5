---
nome: setup-pixel-tracking
skill: (parte onboarding)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 3-5d
qa_gate: true
versao: 1.0
---

# Receita: Setup Pixel + Tracking (Meta + CAPI + GA4)

> Instalação + validação + CAPI deploy + match rate >= 70%.

## Quando usar
- Cliente novo (parte onboarding-cliente)
- Migração agência

## Steps

### 1. @cs criar pixel BM
Composio meta_ads. pixel_id + dataset_id.

### 2. @cs instalar pixel site
GTM OR plugin (WordPress/Shopify/Webflow/custom).

### 3. @cs configurar eventos custom
Lead · Purchase · AddToCart com parametros (value, currency, content_ids).

### 4. @cs deployar CAPI
GTM Server-side OR backend custom. Deduplicação event_id obrigatória.

### 5. @cs configurar GA4 (paralelo)
**Usa bloco:** `.em5/blocos/traffic-composio-ga4-eventos.md`

### 6. @traffic validar eventos
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md`
Test Events Meta + match rate >= 70%.

### 7. @qa validar tracking
**Usa bloco:** `.em5/blocos/qa-validar-relatorio.md`
PageView + eventos críticos + deduplicação + iOS 14 AEM.

## Outputs
- `clientes/{nome}/setup-tecnico/pixel-instalado.md` + `capi-deployado.md` + `eventos-validados.md`

## Métricas
- Prazo: <= 5d cliente novo → validado
- Match rate alvo: >= 80%

## Composio MCP
- meta_ads · google_analytics
