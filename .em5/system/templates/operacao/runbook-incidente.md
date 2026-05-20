# Runbook Incidente — {Tipo Incidente}

**Severidade:** P0 (crítico) / P1 (alto) / P2 (médio)
**Data abertura:** {YYYY-MM-DD HH:MM}
**Aberto por:** {agente OR humano}
**Cliente afetado:** {nome OR "interno"}

## 1. Resumo executivo (1 parágrafo)

> {O que está acontecendo + impacto cliente + status atual + ETA resolução}

## 2. Detecção

- **Como detectado:** {alerta automático / cliente reportou / @cs observou / daily-run}
- **Data/hora detecção:** {YYYY-MM-DD HH:MM}
- **Tempo entre evento e detecção:** {Xh / Xmin}

## 3. Impacto

| Dimensão | Detalhe |
|----------|---------|
| Clientes afetados | {N + lista} |
| Receita em risco | R$ {} |
| Reputação | {baixa/média/alta} |
| Compliance | {N/A OR violação detectada} |
| Tempo down | {Xmin / Xh} |

## 4. Causa raiz

**Hipótese inicial:** {1-2 frases}

**Investigação:**
- {ação 1 + descoberta}
- {ação 2 + descoberta}

**Causa raiz confirmada:** {descrição técnica + por que aconteceu}

## 5. Ações imediatas tomadas (timeline)

| Hora | Ação | Quem | Resultado |
|------|------|------|-----------|
| {HH:MM} | {ação 1} | @{agente} | {resultado} |
| {HH:MM} | {ação 2} | @{agente} | ... |

## 6. Status atual

- [ ] Incidente contido (parou de impactar)
- [ ] Cliente comunicado
- [ ] Causa raiz identificada
- [ ] Correção definitiva aplicada
- [ ] Validação pós-correção feita
- [ ] Post-mortem agendado

## 7. Comunicação cliente

| Hora | Canal | Mensagem (resumo) | Quem |
|------|-------|-------------------|------|
| {HH:MM} | WhatsApp/Email | {1 linha} | @cs |
| {HH:MM} | Call | {pauta} | @ceo |

**Tom:** transparente + factual + sem desculpa vazia + plano claro.

## 8. Correção definitiva

**O que foi feito:** {descrição}

**Quem aplicou:** @{agente}

**Quando:** {data + hora}

**Validação:** {como confirmou que resolveu}

## 9. Prevenção (post-mortem — preencher D+1)

### O que aprendemos
- {aprendizado 1}
- {aprendizado 2}

### O que vamos mudar (ações preventivas)
| Ação | Responsável | Prazo |
|------|-------------|-------|
| {update workflow X} | @arq + @builder | {data} |
| {novo check em /check-cliente} | @cs | {data} |
| {alerta em daily-run} | @traffic | {data} |

### Workflow afetado
- `.em5/workflows/{nome}.yaml` — modificações necessárias

## 10. Tipos de incidente comuns (referência)

| Tipo | Workflow correspondente |
|------|--------------------------|
| Conta Meta suspensa | conta-suspensa-meta.yaml |
| Pixel quebrado | pixel-quebrado.yaml |
| Cobrança falhou (chargeback) | cobranca-falhou.yaml |
| Campanha com bug | campanha-com-bug.yaml |
| Crise reputação | crise-reputacao.yaml |
| Crise negócio agência | crise-negocio.yaml |

## 11. Métricas pós-incidente

- **Tempo até detecção:** {alvo: < 1h}
- **Tempo até contenção:** {alvo: < 2h}
- **Tempo até resolução total:** {alvo: < 24h P0}
- **Aprendizado documentado em learnings/:** {sim/não}

---

**Arquivamento:** `clientes/{nome}/crisis/{tipo}-{YYYY-MM-DD}/runbook.md`
**Pos-mortem global:** `.em5/system/learnings/incidentes/{ano}/{tipo}-{YYYY-MM-DD}.md`
