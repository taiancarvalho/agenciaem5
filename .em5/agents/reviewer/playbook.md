# Playbook Reviewer — Validador Meta-time

> Meta-time. Valida componentes recém-criados pelo @builder antes de entrar em produção.

## Princípio

**Reviewer é última barreira meta-time.** Valida contra Constitution + gate-matrix coverage + model_tier + anti-papel + learnings inicializados.

Equivalente do @qa pro meta-time: componente novo NÃO entra em produção sem APROVADO.

## Checklist obrigatório

### Constitution compliance (13 artigos)

- [ ] Art. I Filesystem First — componente persiste artefatos?
- [ ] Art. II Autoridade — agente bem definido + anti_papel claro?
- [ ] Art. III Artefatos > Conversa — entrega arquivo, não chat?
- [ ] Art. IV Contexto Reduzido — dependencies mínimas?
- [ ] Art. V Trade-offs — model_tier adequado?
- [ ] Art. VI Honestidade CLI — limitações declaradas?
- [ ] Art. VII Conhecimento Modular — dependencies carregadas on-demand?
- [ ] Art. VIII Idempotência — pode rodar 2x sem efeito colateral?
- [ ] Art. IX Composio Gateway — integra via Composio (não curl direto)?
- [ ] Art. X Memória do Cliente — append em log-operacional?
- [ ] Art. XI Identidade Agente — fantasy name + persona coerente?
- [ ] Art. XII em Cinco Minutos — usável em ≤ 5min input humano?
- [ ] Art. XIII Aprendizado — learnings inicializado?

### Gate-matrix (por tipo componente)

| Componente | Gates exigidos |
|------------|----------------|
| Agente novo | model_tier + anti_papel + commands + dependencies + greeting |
| Task nova | input + output + agente + composio_mcp (se aplicável) + on_failure |
| Workflow novo | orquestrador @coo + sequência + qa_gate (cliente-facing) + metricas |
| Playbook novo | princípio + checklist + anti-padrões + métricas |
| Skill nova | roteia via @coo (se multi-agent) + referência task/workflow |

### Configs centrais (sincronizadas?)

- [ ] CLAUDE.md tabela atualizada (novo agente OR skill canônica)
- [ ] AGENTS.md atualizado (novo agente)
- [ ] em5-config.yaml (fantasy_names + serviços + canais)
- [ ] _roadmap.md (workflow novo)
- [ ] _rotinas.md (cron se aplicável)

## Veredictos

| Veredicto | Quando |
|-----------|--------|
| **APROVADO** | Todos checks ✅ — vai pra produção |
| **REVISÃO** | 1-2 ajustes pontuais não-críticos |
| **BLOQUEADO** | Violação Constitution OR gate crítico faltando |

## Anti-padrões

- Aprovar sem rodar gate-matrix completo
- Aprovar componente sem learnings inicializado
- Esquecer update configs centrais
- Não bloquear violação Constitution (ferida no princípio)

## Métricas

- Taxa primeira aprovação @builder: > 85%
- Tempo médio review: < 30min
- Componentes em produção pós-review com bug: < 5%
- Constitution violations detectadas: tracked
