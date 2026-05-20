---
nome: cobranca-mensal
skill: (cron dia 1)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: fin
tempo_medio: ongoing mês
qa_gate: false
versao: 1.0
---

# Receita: Cobrança Mensal Recorrente

> Asaas faturas + WhatsApp + email + escalação progressiva 5/15/30d + MRR.

## Steps

### 1. @coo lista clientes ativos
Filtra ativos + valores.

### 2. @fin gerar faturas Asaas (paralelo)
**Usa bloco:** `.em5/blocos/fin-asaas-criar-cobranca.md`
Vencimento dia 10. Paralelo por cliente.

### 3. @whats enviar cobrança
**Usa bloco:** `.em5/blocos/cs-enviar-whatsapp-template.md` (template cobranca-mensal-padrao)
Fallback email se sem WhatsApp.

### 4. @cs enviar email backup paralelo
**Usa bloco:** `.em5/blocos/cs-enviar-email-gmail.md`

### 5. @fin monitorar pagamento (cron 6h)
**Usa bloco:** `.em5/blocos/fin-asaas-listar-status.md`
Classifica PAGO/PENDENTE/VENCIDO/INADIMPLENTE_{5d/15d/30d}.

### 6. @cs escalar inadimplência 5d+
Call humana + log + flag. 15d → @ceo decide pause. 30d → trigger churn-prevention.

### 7. @fin gerar MRR mensal (dia 1 mês+1)
**Output:** `operacao/painel-mrr-{YYYY-MM}.md`

## Outputs
- `clientes/{nome}/financeiro/cobrancas/{YYYY-MM}.json`
- `clientes/{nome}/financeiro/log-cobranca-{YYYY}.md` append
- `operacao/painel-mrr-{YYYY-MM}.md`

## Métricas
- Taxa entrega comunicação: > 95%
- Inadimplência 15d: < 5% MRR
- Churn mensal: < 3%

## Composio MCP
- asaas · whatsapp_business · gmail
