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
