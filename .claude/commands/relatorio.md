# /relatorio — Gerar e enviar relatório de performance

**Argumento:** `/relatorio $ARGUMENTS` (ex: `/relatorio clinica-sao-paulo`)

## O que este comando faz

1. @traffic coleta dados Meta Ads + IG Business + Facebook (Composio MCP) e gera relatório markdown (audit trail interno)
2. @cs renderiza HTML para cliente a partir do template `relatorio-cliente.html` (nível Reportei)
3. @qa valida ambos antes do envio
4. @cs envia ao cliente via Gmail (Composio) com HTML inline

## Padrão de qualidade

Template baseado em Reportei — cliente recebe relatório com:
- KPIs hero (investido · conversas · custo/conversa) com % delta e valor anterior
- Gráficos linha (custo por dia · investimento por dia · alcance diário)
- Funil de conversão visual (Impressões → Alcance → Cliques → Conversas)
- Demografia (idade · gênero por canal)
- Donut seguidores por gênero
- Tabela campanhas em destaque
- Tabela anúncios em destaque (com thumb + ID)
- Posts orgânicos + Reels em destaque
- Cidades top (IG + FB)

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente.

Leia o contexto do cliente:
- `clientes/{nome}/operacao/log-operacional.md` — período coberto
- `clientes/{nome}/trafego/` — estrutura de campanhas
- `clientes/{nome}/setup-tecnico/status.md` — IDs (account, page, IG handle)
- `clientes/{nome}/branding/cores.yaml` — cores do HTML
- `em5-config.yaml` — nome da agência

---

### Passo 1 — @traffic coleta dados (Composio MCP)

Acione @traffic com:
- Cliente: {nome}
- Objetivo: coletar dados consolidados do período
- Período: {data_inicio} a {data_fim} + período anterior comparável (mesmo nº de dias)
- Fontes via Composio MCP:
  - **Meta Ads:** Impressões · Alcance · Frequência · Cliques · CTR · CPC · CPM · Conversas iniciadas (msg) · Custo/conversa · Taxa conversa · Breakdown por dia · Breakdown idade · Breakdown gênero · Lista campanhas · Lista anúncios
  - **Instagram Business (Graph API):** Visitas perfil · Views orgânicas · Views totais · Alcance diário · Audiência idade/gênero · Cliques no perfil (CTA) · Top cidades · Posts (alcance, interações, salvos, taxa) · Reels (alcance, views, curtidas)
  - **Facebook Pages:** Seguidores · Novos seguidores · Alcance diário soma · Page views · Engajamento · Taxa engajamento · Top cidades

- Destino markdown: `clientes/{nome}/relatorios/relatorio-{YYYY-MM-DD}.md`
- Estrutura do markdown: replicar a hierarquia do HTML (Hero · Meta Ads · IG · FB · Próximos passos)

**Importante:** se uma fonte não tiver dado disponível (ex: cliente sem FB), @traffic marca seção como "não aplicável" — nunca fabrica número (Constitution Art. VI — Honestidade do CLI).

---

### Passo 2 — @cs renderiza HTML

Acione @cs com:
- Cliente: {nome}
- Origem: `clientes/{nome}/relatorios/relatorio-{YYYY-MM-DD}.md`
- Template: `.em5/core/templates/relatorios/relatorio-cliente.html`
- Destino: `clientes/{nome}/relatorios/relatorio-{YYYY-MM-DD}.html`

**Substituições obrigatórias:**

Cabeçalho e cores:
- `{{nome_cliente}}` · `{{nome_agencia}}` · `{{periodo}}` · `{{data_envio}}`
- `{{brand_cor_primaria}}` · `{{brand_cor_secundaria}}` (de `branding/cores.yaml`)

KPIs hero (com delta + arrow + valor anterior):
- `{{hero_investido}}`, `{{hero_investido_delta}}`, `{{hero_investido_arrow}}` (↑ ou ↓), `{{hero_investido_delta_class}}` (up · down · flat), `{{hero_investido_prev}}`
- Mesma estrutura para `hero_conversas` e `hero_cpc_conversa`

Resumo:
- `{{resumo_executivo}}` (1 parágrafo)
- Loop `{{#highlights}}...{{/highlights}}` (3-5 bullets)
- Loop `{{#pontos_atencao}}...{{/pontos_atencao}}` (opcional)

Meta Ads:
- KPIs: `{{meta_impressoes}}`, `{{meta_frequencia}}`, `{{meta_alcance}}`, `{{meta_cliques}}`, `{{meta_taxa_conversa}}`, `{{meta_conversas}}`, `{{meta_custo_conversa}}` (todos com `_delta`, `_arrow`, `_delta_class`, `_prev`)
- Gráficos: `{{meta_grafico_custo_pontos}}`, `{{meta_grafico_conversas_pontos}}`, `{{meta_grafico_invest_pontos}}` (formato SVG polyline: `"x1,y1 x2,y2 ..."` — coordenadas normalizadas no viewBox 540×200 com área útil 40-520 × 20-170)
- Labels eixo X: `{{meta_grafico_d1}}` ... `{{meta_grafico_d10}}`
- Funil: já consome `meta_impressoes`/`meta_alcance`/`meta_cliques`/`meta_conversas` + `meta_taxa_alcance` + `meta_ctr`
- Loop `{{#meta_idade}}` com `{faixa, pct, valor}`
- Loop `{{#meta_genero}}` com `{canal, pct_m, pct_f, total}`
- Loop `{{#meta_campanhas}}` com 10 campos por linha
- Loop `{{#meta_anuncios}}` com `{thumb_label, nome, id, ...}` (thumb_label = iniciais ou número)

Instagram:
- KPIs: `{{ig_visitas}}`, `{{ig_views_organicas}}`, `{{ig_views_total}}` (com delta etc)
- `{{ig_handle}}`, `{{ig_seguidores}}`, `{{ig_genero_m_pct}}`, `{{ig_genero_f_pct}}`
- `{{ig_alcance_pontos}}` (polyline)
- Loop `{{#ig_idade}}` com `{faixa, pct_m, pct_f, total_pct}`
- Loop `{{#ig_cliques_perfil}}` com `{tipo, contagem, ctr}`
- Loop `{{#ig_cidades}}` com `{cidade, seguidores}`
- Loop `{{#ig_posts}}` e `{{#ig_reels}}`

Facebook:
- KPIs: `{{fb_seguidores}}`, `{{fb_novos_seguidores}}`, `{{fb_alcance}}`, `{{fb_views}}`, `{{fb_engajamento}}`, `{{fb_taxa_engajamento}}`
- Loop `{{#fb_cidades}}`

Próximos passos:
- Loop `{{#proximos_passos}}` (3-6 bullets acionáveis)

**Validação automática:** após render, varrer HTML pra checar resíduo `{{...}}`. Se sobrou placeholder → BLOQUEIO automático antes do @qa.

---

### Passo 3 — @qa valida

Veredicto formal sobre markdown + HTML:
- Coerência markdown ↔ HTML (sem divergência numérica)
- Sem placeholder não substituído (resíduo `{{...}}` = BLOQUEADO)
- Gráficos SVG têm pontos (não polyline vazia)
- Tabelas com pelo menos 1 linha (ou seção marcada "não aplicável")
- Sem links quebrados
- Cores do branding aplicadas no header

---

### Passo 4 — @cs envia

Após veredicto APROVADO:
- Email via Gmail (Composio MCP) com HTML inline + .md anexado pra histórico
- Assunto: `[{{nome_agencia}}] Relatório {{periodo}} — {{nome_cliente}}`

### Registro

`clientes/{nome}/operacao/log-operacional.md`:
```
| {YYYY-MM-DD} | Relatório {periodo} | Relatório | APROVADO | HTML Reportei-style enviado via Gmail |
```
