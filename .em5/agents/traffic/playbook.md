# Playbook: Tráfego Meta Ads

> Referência de execução para @traffic em campanhas Meta (Facebook + Instagram)
> Integração via Composio MCP

---

## 0. Nomenclatura e Estrutura de Conta

```
Campanha:   {CLIENTE}_{OBJETIVO}_{CANAL}_{FUNIL}_{seq}
Conjunto:   {AUDIÊNCIA}_{TIPO}_{seq}
Anúncio:    CR-{id}-v{n}

Exemplos:
  BELEZA_LEADS_META_FUNDO_001
  LOOKALIKE1PCT_FRIO_001
  CR-047-v2
```

**Alocação por fase:**

| Fase | Proven | Testes |
|------|--------|--------|
| Primeiras 2-4 semanas | 70% | 30% |
| Escalando | Consolidar nos vencedores | +20-30% por vez |
| Regra de escala | Aguardar 3-5 dias entre aumentos | — |

**Frio vs Quente:**
- Cliente novo: 60% frio / 40% quente
- Cliente com histórico: 40% frio / 60% quente

---

## 1. Subir Campanha Nova

### Pré-requisitos
- Ler `board-cliente.md` → extrair: objetivo, budget, público, escopo geo, CPA desejado
- Confirmar pixel ativo e evento configurado. Se não: escalar para @cs → `validar-tracking`
- Ter copy aprovada (CR-XXX.md) e criativos prontos

### Estrutura Base (2 campanhas mínimas)

**Campanha 1 — Base de Audiência (topo de funil)**
```
Objetivo: Engajamento ou Tráfego
Budget: 40% do total diário (cliente novo: 60%)
CBO: ativado
Conjuntos:
  → FRIO: Lookalike 1-3% de compradores + interesses amplos (broad)
  → Idade/gênero: extraídos do board-cliente
  → Geo: escopo definido no board
Posicionamentos: Automático (Advantage+)
Nomenclatura: {CLIENTE}_TRAFFIC_META_TOPO_{seq}
```

**Campanha 2 — Objetivo Principal (fundo de funil)**
```
Objetivo: LEAD_GENERATION / CONVERSIONS / MESSAGES (conforme board)
Budget: 60% do total diário (cliente novo: 40%)
CBO: ativado
Conjuntos:
  → RETARGETING: visitantes do site 7d + engajamento IG 30d
  → LOOKALIKE: 1% de lista de compradores (se existir)
UTMs: utm_source=facebook&utm_medium=paid&utm_campaign={nome}&utm_content=CR-{id}
Nomenclatura: {CLIENTE}_{OBJETIVO}_META_FUNDO_{seq}
```

### Via Composio (meta_ads)

```
1. Criar campanha:
   composio.meta_ads.create_campaign(
     name: "{CLIENTE}_{OBJETIVO}_META_FUNDO_001",
     objective: "LEAD_GENERATION",  # ou CONVERSIONS, MESSAGES
     status: "PAUSED"               # sempre PAUSED primeiro, ativar depois de revisar
   )

2. Criar conjunto:
   composio.meta_ads.create_adset(
     campaign_id: "{id}",
     daily_budget: {budget_em_centavos},
     targeting: {
       age_min: {board.publico.idade_min},
       age_max: {board.publico.idade_max},
       geo_locations: { cities: [{board.publico.cidades}] },
       custom_audiences: [{lookalike_id}]
     }
   )

3. Criar anúncio com UTMs:
   composio.meta_ads.create_ad(
     adset_id: "{id}",
     creative: {
       body: "{copy do CR-XXX}",
       image_hash: "{hash do criativo}",
       link_url: "{board.canal_de_conversao}?utm_source=facebook&utm_medium=paid&utm_content=CR-{id}",
       call_to_action: "LEARN_MORE"  # ou SEND_MESSAGE, SHOP_NOW
     }
   )

4. Ativar após revisar:
   composio.meta_ads.update_campaign(id: "{id}", status: "ACTIVE")
```

### Checklist Pré-Publicação

- [ ] Pixel ativo e disparando evento correto?
- [ ] UTMs configurados em todos os anúncios?
- [ ] Frequência cap configurado? (máx 3x/semana por usuário)
- [ ] Verba correta por conjunto?
- [ ] Nomenclatura no padrão?
- [ ] Todos os criativos aprovados pelo QA?

---

## 2. Testar Criativos — Hierarquia e Ondas

### Hierarquia de Teste (maior impacto primeiro)

```
1. Conceito/ângulo         ← maior impacto
2. Hook/headline
3. Estilo visual
4. Corpo do texto
5. CTA
```

Testar um nível por vez. Não mudar ângulo e visual ao mesmo tempo.

### Waves de Geração de Criativos

```
Wave 1 (core):     3-5 ângulos × 2 variações cada — base do teste
Wave 2 (extend):   dobrar nos 2 ângulos com melhor CTR inicial
Wave 3 (wild):     1-2 ângulos não testados ainda — contrarian, emocional, ultra-específico
```

### ICE Score para priorizar próximos testes

| Dimensão | Pergunta |
|----------|----------|
| **Impact** | Se funcionar, quanto move CPL/CPA? |
| **Confidence** | Baseado em dados, não intuição |
| **Ease** | Quão rápido consegue produzir e medir? |

**ICE Score = (Impact + Confidence + Ease) / 3** — rodar os de maior score primeiro.

---

## 3. Otimizar Campanha (Revisão Semanal)

### CPL/CPA Decision Matrix

| Situação | Ação | Observação |
|---------|------|------------|
| CPL < meta | Aumentar budget +20% | Aguardar 3 dias para confirmar tendência |
| CPL 1x–1.3x meta | Manter, monitorar 3 dias | Normal em fase de aprendizado |
| CPL 1.3x–2x meta por 7d+ | Testar novo criativo, manter campanha | Diagnosticar causa-raiz antes |
| CPL > 2x meta por 7d+ | Pausar conjunto, abrir diagnosis.md | Não pausar sem diagnóstico |
| 0 conversões em 7 dias | Pausar SE > 1.000 impressões acumuladas | Se < 1.000: aguardar mais dados |

### Saturação

```
Frequência > 2.5 na semana  → Rotacionar criativos — obrigatório
Frequência > 4.0 na semana  → Pausar conjunto 7 dias para resfriar
CTR caindo por 3+ dias      → Trocar criativo ativo por variação nova
```

### Escala

```
2 → 4 campanhas: CPA consistente < meta por 14 dias
Aumentar budget: máximo +20% por vez, intervalo mínimo de 3 dias
Novo cliente (frio/quente): 60% frio / 40% quente
Cliente com histórico: 40% frio / 60% quente
```

### Puxar dados via Composio

```
composio.meta_ads.get_campaign_insights(
  campaign_ids: ["{id1}", "{id2}"],
  date_preset: "last_7d",
  fields: ["spend", "leads", "cost_per_lead", "ctr", "frequency", "impressions"]
)
```

### Diagnóstico de CPL alto — causa-raiz

Antes de pausar, identificar:
```
1. Frequência > 3.5?          → Público saturado → trocar conjunto
2. CTR < 1.5%?                → Criativo fraco → trocar creative
3. CTR bom + CPL alto?        → LP com baixa conversão → modo CRO
4. Leads não aparecem?        → Pixel com evento errado → escalar @cs
5. Campanha < 50 conversões?  → Ainda em aprendizado → aguardar
```

---

## 4. Retargeting — Janelas e Frequência

| Estágio | Audiência | Janela | Frequência |
|---------|-----------|--------|------------|
| Quente | Carrinho abandonado / iniciou cadastro | 1-7 dias | Alta OK |
| Morno | Visitantes de página-chave (preço, produto) | 7-30 dias | 3-5x/semana |
| Frio | Qualquer visita ao site | 30-90 dias | 1-2x/semana |

**Exclusões obrigatórias:**
- Clientes atuais (exceto upsell intencional)
- Conversores recentes (janela de 7-14 dias)
- Visitantes com bounce < 10s

---

## 5. Atribuição

```
Dado de plataforma é inflado — sempre comparar com GA4/Analytics.
Usar UTMs consistentes em todos os anúncios.
Olhar CAC blended, não só CPA por plataforma.
Plataforma conta view-through; Analytics conta apenas click-through.
```

---

## 6. Auditoria de Conta

### Puxar histórico via Composio

```
composio.meta_ads.get_ad_accounts()  # listar contas
composio.meta_ads.get_campaigns(
  account_id: "{id}",
  date_preset: "last_90d"
)
composio.meta_ads.get_campaign_insights(
  campaign_ids: [...],
  fields: ["spend", "leads", "cpa", "ctr", "frequency"]
)
```

### Critério para reativar campanha pausada
```
✅ Reativar se: CPA < 1.5x meta no histórico + público > 200k + pausou por orçamento
❌ Descartar se: CPA > 3x meta consistente ou criativo inativo há > 60 dias
```

---

## 7. Handoff

Ao terminar, adicionar em `memoria/notas-sessao.md`:

```markdown
## Sessão {data}
**Agente:** @traffic
**Task executada:** {nome da task}
**O que foi feito:** {1 linha}
**Decisões importantes:** {configurações, pausas, escalas feitas}
**Atenção para próxima sessão:** {o que monitorar}
```
# Playbook: Tráfego Google Ads

> Referência de execução para @traffic em campanhas Google
> Integração via Composio MCP

---

## 1. Quando Usar Google vs Meta

| Situação | Canal recomendado |
|---------|------------------|
| Produto com demanda ativa (pessoas já pesquisam) | Google Search |
| Serviço local (clínica, advocacia, estética) | Google Search |
| E-commerce com catálogo | Google PMax |
| Produto que o público não sabe que precisa | Meta Ads |
| Budget < R$1.500/mês | Meta primeiro, Google depois |

---

## 2. Campanha Search

### Estrutura

```
Campanha: {CLIENTE}_{OBJETIVO}_SEARCH_{seq}
Tipo: Search
Bidding:
  → < 30 conv/mês no histórico: Maximizar Cliques + CPC máximo definido
  → ≥ 30 conv/mês: Target CPA (valor do board)
Grupos de anúncios:
  → Grupo 1: Keywords alta intenção  (ex: "clínica estética SP")
  → Grupo 2: Keywords de marca       (ex: "nome do cliente")
  → Grupo 3: Keywords de problema    (ex: "como eliminar gordura")
RSA (anúncio responsivo):
  → 15 headlines (keyword no headline 1 obrigatório)
  → 4 descriptions
  → Pinnar: H1 = oferta principal, H2 = diferencial
```

### Progressão de Bidding

```
Fase 1 (0-30 conv):   Maximizar Cliques com CPC máximo
Fase 2 (30-100 conv): Target CPA — usar histórico para definir o target
Fase 3 (100+ conv):   Target ROAS ou Maximizar Conversões
Regra: não mudar bidding mais de uma vez por semana — deixar o algoritmo aprender.
```

### Via Composio

```
composio.google_ads.create_campaign(
  name: "{CLIENTE}_LEADS_SEARCH_001",
  campaign_type: "SEARCH",
  bidding_strategy: "TARGET_CPA",
  target_cpa: {board.cpa_desejado * 1_000_000},  # em micros
  budget_micros: {budget_diario * 1_000_000}
)

composio.google_ads.create_ad_group(
  campaign_id: "{id}",
  keywords: [
    {text: "{keyword}", match_type: "EXACT"},
    {text: "{keyword}", match_type: "PHRASE"}
  ]
)
```

### Checklist Pré-Ativação Search

- [ ] Conversão configurada no Google Ads? (não apenas Analytics)
- [ ] Quality Score > 6 nas keywords principais?
- [ ] Lista de negativas globais aplicada?
- [ ] URL final tem UTMs?
- [ ] Extensões configuradas (sitelinks, callout, estruturadas)?

---

## 3. Performance Pulse (PMax)

### Quando usar PMax
- E-commerce com catálogo de produtos
- Budget > R$150/dia (abaixo disso, dados insuficientes)
- Mínimo 30 conversões no histórico do último mês
- Pixel ativo com conversões recentes
- Combinado com Search para clientes com histórico

### Assets obrigatórios
```
→ 15 imagens (produto, lifestyle, logo)
→ 5 logos
→ 5 vídeos (ou geração automática do Google)
→ 5 headlines curtos (≤ 30 chars)
→ 5 headlines longos (≤ 90 chars)
→ 5 descriptions
Signals de audiência: lista de compradores + visitantes site + lookalike
```

### Período de aprendizado PMax
```
Primeiros 14 dias: NÃO pausar mesmo se CPA alto — algoritmo aprendendo.
Avaliação real começa na semana 3.
Se CPA > 3x meta após 14 dias: gerar diagnosis.md, não pausar imediatamente.
```

---

## 4. Otimização Google

### Decision Matrix Search

| Situação | Ação |
|---------|------|
| Keyword: gasto > R$50 + 0 conversões | Pausar imediatamente |
| Keyword: CPA > 2x meta (50+ cliques) | Pausar, criar nova variação |
| Search term fora do escopo do produto | Adicionar como negativa |
| Quality Score < 5 | Reescrever anúncio ou criar LP dedicada |
| CPA < meta por 7 dias consecutivos | Aumentar target CPA bid em 10-15% |

### Framework de Negativas

```
Negativas imediatas: termos sem intenção de compra (ex: grátis, curso, tutorial)
Negativas por performance: gasto > R$50 sem conversão
Negativas de marca concorrente: só adicionar se CPC muito alto
Revisar search terms: semanal nas primeiras 4 semanas, quinzenal depois
```

### Puxar Search Terms (semanal)

```
composio.google_ads.get_search_term_report(
  campaign_id: "{id}",
  date_range: "LAST_7_DAYS",
  fields: ["search_term", "clicks", "cost", "conversions", "cpa"]
)
```

### Ajustes por dispositivo/horário

```
Mobile CPA > 2x desktop:   → reduzir lance mobile -30%
Tablet CPA > 3x desktop:   → excluir tablet
Horários de baixa conv:    → reduzir -20% a -50%
```

---

## 5. Atribuição Google

```
Usar conversões do Google Ads + comparar com Analytics.
Google Ads usa last-click por padrão — mudar para data-driven após 50+ conv.
UTMs em todas as URLs finais — padrão:
  utm_source=google&utm_medium=cpc&utm_campaign={nome}&utm_content={adgroup}
Comparar CPA do Google com CAC real no CRM mensalmente.
```

---

## 6. Handoff

```markdown
## Sessão {data}
**Agente:** @traffic (Google)
**Task executada:** {nome da task}
**O que foi feito:** {1 linha}
**Decisões importantes:** {ajustes, pausas, escalas}
**Atenção para próxima sessão:** {o que monitorar}
```
