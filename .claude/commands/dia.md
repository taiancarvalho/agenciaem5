# /dia — Daily Run em5

> Auditoria diária de todas contas ativas, em ≤ 5 min de input humano.
> Sistema faz triage → você decide o que escalar.

## Uso

```
/dia
/dia --cliente {slug}     # só uma conta
/dia --canal meta          # só Meta Ads
/dia --severity alto       # só desvios graves
```

## Fluxo

1. **@coo (Nexus)** recebe `/dia`
2. Lê `.em5/clientes/*/operacao/status.yaml` pra identificar contas ativas
3. Delega pra **@traffic (Pulse)** com lista de contas
4. **Pulse** consulta Composio (Meta Ads + Google Analytics) e identifica:
   - ROAS desvio > 20% vs janela 7d
   - CPA desvio > 20%
   - CPM/CTR fora de banda
   - Campanhas pausadas inesperadamente
   - Pixel quebrado (event count = 0)
5. **@qa (Crivo)** valida sinalizações (filtro de falsos positivos)
6. **@cs (Sol)** prepara WhatsApp draft com diagnóstico — só urgência (severity=alto+)
7. Output:
   - `.em5/clientes/{slug}/relatorios/diario-{YYYY-MM-DD}.md` por conta
   - Resumo consolidado: `.em5/_dia/{YYYY-MM-DD}.md` (top issues + ações sugeridas)

## Critério de saída

- ≤ 5 min de input humano: você lê o resumo + decide o que aprovar
- Drafts de WhatsApp prontos (não envia sem aprovação)
- Issues `crítico` → bloqueio automático (campanha pausada se gravidade extrema)
- Issues `alto`+ → notificação + draft de ação
- Issues `médio` → log silencioso em learnings/traffic-padroes.md
- Issues `baixo` → ignorados na rotina diária

## Tags pros learnings

- Casos virtuosos (ROAS > 3x baseline) → append em `learnings/{mês}/traffic-padroes.md`
- Bloqueios recorrentes → append em `learnings/{mês}/qa-bloqueios.md`

## Quando rodar

- Manhã (recomendado): 1× por dia, antes de qualquer outra ação
- Automatizado (Fase 4+): cron job via `npx em5 dia --auto` envia resumo por WhatsApp/email

---

*em5 v1.1 — Fase 1.4 (Daily Run)*
