# Playbook: Tráfego Meta Ads

> Referência de execução para @traffic em campanhas Meta (Facebook + Instagram)
> Integração via Composio MCP

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

## 2. Otimizar Campanha (Revisão Semanal)

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

## 3. Auditoria de Conta

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

## 4. Handoff

Ao terminar, adicionar em `memoria/notas-sessao.md`:

```markdown
## Sessão {data}
**Agente:** @traffic
**Task executada:** {nome da task}
**O que foi feito:** {1 linha}
**Decisões importantes:** {configurações, pausas, escalas feitas}
**Atenção para próxima sessão:** {o que monitorar}
```
