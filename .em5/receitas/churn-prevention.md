---
nome: churn-prevention
skill: (trigger por sinais)
tipo: estrategico
classificacao_skill: estrategico
agente_orquestrador: ceo
agente_responsavel_entrega: cs
tempo_medio: <= 48h primeira ação
qa_gate: false
versao: 1.0
---

# Receita: Churn Prevention

> Sinais detectados → call retenção → @ceo decide → executar plano OR offboarding.

## Trigger (qualquer 1)
- Atraso pagamento 5+d
- NPS <= 6 OR comentário negativo
- Não responde reuniões 2+ semanas
- Queda KPI 30%+ vs trimestre
- Menciona concorrente sem ser perguntado

## Steps

### 1. @coo consolida sinais
Todos sinais cruzados + severidade total.

### 2. @strategist analise causa raiz
Causa + probabilidade churn (BAIXA/MÉDIA/ALTA) + estratégia salvamento.

### 3. @cs prepara call retenção
Agenda + dados de valor + soluções pré-pensadas. Não vender — ouvir.

### 4. @cs executa call (45-60min)
Pauta: reconhecer · ouvir 15min · mostrar valor 10min · propor solução 15min · acordo.

### 5. @ceo decisão formal
MANTER (acordo) | RENEGOCIAR | OFFBOARDING_CONTROLADO.

### 6. @coo executa decisão
Plano-recuperação 60d com monitoramento D+7, D+30, D+60.

### 7. @strategist post-mortem (caso churn)
Input `learnings/churn-cases.md`.

## Outputs
- `clientes/{nome}/risco-churn/{data}/diagnostico.md`
- `clientes/{nome}/risco-churn/{data}/plano-recuperacao.md`
- Decisão @ceo registrada

## Métricas
- Taxa recuperação: >= 60% (não-churn em 60d)
- Prazo resposta: <= 48h pós-detecção

## Composio MCP
- gmail · googlemeet · whatsapp_business
