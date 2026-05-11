---
name: estruturar-campanha
agent: traffic
description: Criar estrutura inicial de campanhas seguindo a regra de 2 campanhas minimas — audiencia + objetivo
inputs:
  - .omgsys/clientes/{nome}/onboarding/board-cliente.md
  - .omgsys/clientes/{nome}/trafego/auditoria.md
  - .omgsys/clientes/{nome}/trafego/publicos-mapeados.md
  - .omgsys/clientes/{nome}/estrategia/plano-estrategico.md
  - copy e criativos disponiveis (ou em producao)
outputs:
  - .omgsys/clientes/{nome}/trafego/campanhas-ativas.md
elicit: true
---

# Estruturar Campanha

## Playbook de Referência

**Ler antes de executar:** `.omgsys/playbooks/traffic-meta.md` (ou `traffic-google.md`)
**Memória:** ler últimas 3 entradas de `.omgsys/clientes/{nome}/memoria/notas-sessao.md`

---

## Objetivo

Subir ou documentar a estrutura mínima de campanhas. Regra obrigatória: mínimo 2 campanhas — uma de audiência (base) e uma de objetivo principal (conversão).

## Regra

```
Sempre 2 campanhas mínimas:
Campanha 1 = audiência/impulsionamento/trafego
Campanha 2 = objetivo principal (leads, vendas, WhatsApp)
Nomenclatura: [CLIENTE]_[OBJETIVO]_[CANAL]_[TIPO]_[ID]
```

---

## Passo a passo

### 1. Confirmar estratégia

Ler `board-cliente.md` e extrair:
- Objetivo principal do cliente
- Budget disponível e CPA desejado
- Canais escolhidos
- Públicos definidos
- Escopo geográfico

### 2. Definir distribuição de verba

```
Cliente NOVO (sem histórico):     60% frio / 40% quente
Cliente COM histórico:            40% frio / 60% quente
Campanha 1 (audiência): parte fria
Campanha 2 (objetivo):  parte quente

Subir budget: máximo +20% por vez, intervalo mínimo 3 dias
```

### 3. Estruturar Campanha 1 — Base de Audiência

```
Nome: {CLIENTE}_TRAFFIC_META_TOPO_001
Objetivo: Engajamento / Tráfego
Público: Lookalike 1-3% de compradores + interesses amplos (broad)
Posicionamentos: Automático (Advantage+)
Verba diária: R$ XX (40-60% conforme regra acima)
```

### 4. Estruturar Campanha 2 — Objetivo Principal

```
Nome: {CLIENTE}_{OBJETIVO}_META_FUNDO_002
Objetivo: {Leads / WhatsApp / Vendas}
Público: Retargeting site 7d + engajamento IG 30d
Verba diária: R$ XX (60-40% conforme regra)
UTMs: utm_source=facebook&utm_medium=paid&utm_campaign={nome}&utm_content=CR-{id}
```

### 5. Executar via Composio (meta_ads)

```
# Criar campanha (sempre PAUSED primeiro)
composio.meta_ads.create_campaign(
  name: "{CLIENTE}_{OBJETIVO}_META_FUNDO_001",
  objective: "LEAD_GENERATION",  # ou CONVERSIONS, MESSAGES
  status: "PAUSED"
)

# Criar conjunto de anúncios
composio.meta_ads.create_adset(
  campaign_id: "{id}",
  daily_budget: {valor_em_centavos},
  targeting: {
    age_min: {board.publico.idade_min},
    age_max: {board.publico.idade_max},
    geo_locations: { cities: [{board.publico.cidades}] },
    custom_audiences: [{lookalike_id}]
  }
)

# Criar anúncio com UTMs
composio.meta_ads.create_ad(
  adset_id: "{id}",
  creative: {
    body: "{copy do CR-XXX}",
    image_hash: "{hash}",
    link_url: "{canal_conversao}?utm_source=facebook&utm_medium=paid&utm_content=CR-{id}",
    call_to_action: "LEARN_MORE"
  }
)

# Ativar após revisar checklist
composio.meta_ads.update_campaign(id: "{id}", status: "ACTIVE")
```

### 6. Checklist pré-publicação

- [ ] Pixel ativo e disparando evento correto?
- [ ] UTMs configurados em todos os anúncios?
- [ ] Todos os criativos aprovados pelo QA?
- [ ] Nomenclatura no padrão?
- [ ] Verba distribuída conforme regra?

### 7. Documentar campanhas

Criar `.omgsys/clientes/{nome}/trafego/campanhas-ativas.md` com estrutura das 2 campanhas.

### 8. Registrar no log e na memória

Atualizar `log-operacional.md` e adicionar entrada em `memoria/notas-sessao.md`.

---

## Em caso de falha

Se a campanha não puder ser publicada, gerar `diagnosis.md` na pasta `trafego/`:

```markdown
**Problema identificado:** {descrição precisa}
**Causa-raiz provável:** {hipótese}
**Agente responsável pela correção:** @{agente}
**Ação corretiva:** {instrução específica}
**Prioridade:** CRÍTICO / NORMAL
**Retestar após:** {o que precisa acontecer antes de revalidar}
```

---

## Handoff

```markdown
## Handoff para @traffic (monitoramento)
**Arquivos que ele DEVE ler:**
- trafego/campanhas-ativas.md
- board-cliente.md (seções 2 e 3: objetivo e budget)

**O que foi feito:** {campanhas criadas, IDs, estrutura}
**Atenção:** {algo fora do padrão, alertas de pixel, públicos limitados}

**Próxima task:** monitorar-performance
```

## Output esperado

- `campanhas-ativas.md` documentado
- Campanhas publicadas via Composio
- Pronto para: `*monitorar-performance {nome}`
