---
nome: newsletter
skill: (cron semanal)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 24h
qa_gate: true
versao: 1.0
---

# Receita: Newsletter Semanal

> Curadoria + escrita + segment + send + relatório D+3.

## Steps

### 1. @strategist tema + curadoria
Tema principal + 2-3 itens curadoria.

### 2. @copywriter escreve
**Usa bloco:** `.em5/blocos/copy-escrever-com-angulo.md`
Subject <= 50 chars · preview <= 90 chars · 300-600 palavras · 1 CTA · PS.

### 3. @designer render HTML email
Responsivo + dark mode + < 100kb.

### 4. @qa valida
**Usa bloco:** `.em5/blocos/qa-validar-copy.md`
Subject sem trigger spam · mobile+desktop OK · UTM · unsubscribe · sem imagens-only.

### 5. @cs envia
**Usa bloco:** `.em5/blocos/cs-enviar-email-gmail.md` (OR ESP via Composio)
Segmento engajados últimos 90d.

### 6. @cs relatório D+3
**Output:** `relatorio-d3.md` (open · click · unsubscribe · reply).

## Outputs
- `clientes/{nome}/email/newsletters/{data}/conteudo.md` + `html-final.html`
- Email enviado + relatorio D+3

## Métricas
- Open rate: >= 25%
- Click rate: >= 3%
- Reply rate: >= 1%

## Composio MCP
- mailchimp OR resend OR sendlane · gmail
