---
nome: relatorio-cliente
skill: /relatorio
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 30-45min
qa_gate: true
versao: 1.0
---

# Receita: Relatório Cliente (mensal/semanal)

> Coleta dados → render HTML Reportei-style → QA → envio Gmail.

## Quando usar
- Cron mensal (dia 1) OR semanal (sex 17h) OR ad-hoc
- Cliente ativo com tracking funcionando (`/check-cliente` score >= 80%)

## Inputs
- Período (default: mês fechado anterior)
- `clientes/{nome}/setup-tecnico/status.md` (IDs)
- `clientes/{nome}/branding/cores.yaml`
- Template: `.em5/system/templates/relatorios/relatorio-cliente.html`

## Steps

### 1. @traffic coleta dados
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md` + `.em5/blocos/traffic-composio-ga4-eventos.md`
**Output:** `clientes/{nome}/relatorios/relatorio-{YYYY-MM-DD}.md`
Honestidade Art. VI: se fonte sem dado → "não aplicável".

### 2. @cs render HTML
**Tempo:** 10-15min
Substitui placeholders template. Validação automática: residuo `{{...}}` = BLOQUEIO.
**Output:** `clientes/{nome}/relatorios/relatorio-{YYYY-MM-DD}.html`

### 3. @qa valida
**Usa bloco:** `.em5/blocos/qa-validar-relatorio.md`
Coerência md ↔ HTML · sem residuo placeholder · gráficos SVG não-vazios.

### 4. @cs envia Gmail
**Usa bloco:** `.em5/blocos/cs-enviar-email-gmail.md`
HTML inline + .md anexo. Assunto: `[{agencia}] Relatório {periodo} — {cliente}`.

### 5. @cs registra log
**Usa bloco:** `.em5/blocos/cs-registrar-log-operacional.md`

## Outputs
- `clientes/{nome}/relatorios/relatorio-{data}.md` + `.html`
- Email enviado
- Ticket

## Anti-padrões
- ❌ Enviar sem QA aprovar
- ❌ Fabricar dado (Art. VI)
- ❌ Render com placeholder esquecido
- ❌ Mobile-broken HTML

## Métricas
- Prazo mensal: <= 3 dias úteis pós-fechamento
- Taxa aprovação QA primeira: >= 85%
- Taxa abertura email alvo: >= 60%

## Composio MCP
- meta_ads · google_ads · google_analytics · instagram_business · facebook_pages · gmail
