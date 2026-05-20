---
nome: cobranca-falhou
skill: (webhook Asaas reativo)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: fin
tempo_medio: <= 2h primeira resposta
qa_gate: false
versao: 1.0
---

# Receita: Cobrança Falhou (crisis reativo)

> Webhook → diagnose → retry inteligente PIX > boleto > cartão → escalação.

## Trigger
Webhook Asaas: PAYMENT_OVERDUE | PAYMENT_REFUSED | PAYMENT_CHARGEBACK.

## Steps

### 1. @coo receber webhook + criar incidente
Cria ticket urgente.

### 2. @fin diagnosticar causa
**Usa bloco:** `.em5/blocos/fin-asaas-listar-status.md`
Causa: CARTAO_RECUSADO / SALDO_INSUFICIENTE / DADOS_DESATUALIZADOS / **CHARGEBACK** / VENCIMENTO_PASSOU.

### 3. @fin retry (causa-específico)
**Usa bloco:** `.em5/blocos/fin-asaas-criar-cobranca.md`
PIX > boleto +3d > cartão (solicita dados).

### 4. @whats comunicar cliente
**Usa bloco:** `.em5/blocos/cs-enviar-whatsapp-template.md`
Tom empático — assume problema técnico.

### 5. @cs email fallback paralelo
**Usa bloco:** `.em5/blocos/cs-enviar-email-gmail.md`

### 6. @fin monitorar 72h
PAGO OR escalar 3d.

### 7. @cs escalar 3d (call humana)
Negociar parcelamento/prazo.

### 8. @ceo decisão 15d
CONTINUAR (parcelar) | PAUSAR campanhas | OFFBOARDING (trigger workflow).

## Caminho especial CHARGEBACK
Escalar @ceo <1h. @fin evidências. Contestar Asaas 7d.

## Outputs
- `clientes/{nome}/financeiro/incidentes/cobranca-falhou-{data}/`
- Decisão @ceo se 15d+

## Métricas
- Tempo resposta webhook: <= 2h
- Taxa recuperação retry D+3: >= 60%
- Chargebacks/mês: < 0.5%

## Composio MCP
- asaas · whatsapp_business · gmail
