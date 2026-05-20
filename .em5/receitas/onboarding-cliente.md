---
nome: onboarding-cliente
skill: /cliente-novo
tipo: hibrido
classificacao_skill: hibrido
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 5-7d
qa_gate: true
versao: 1.0
---

# Receita: Onboarding Cliente

> Pos-fechamento → workspace + Asaas + briefing + tracking + plano-inicial.

## Quando usar
- Cliente fechado (trigger prospec-fechamento)
- Cliente migrando agência (importar)

## Inputs
- Nome cliente + dados fechamento (contato, plano, valor)

## Steps

### 1. @cs criar workspace
Estrutura canonica `clientes/{nome}/`.

### 2. @fin cadastrar Asaas
**Usa bloco:** `.em5/blocos/fin-asaas-criar-cobranca.md`
Cadastro customer + primeira cobrança gerada.

### 3. @cs coletar board (6 perguntas)
**Usa bloco:** `.em5/blocos/cs-entrevista-cliente.md`
Entrevista consultiva, não questionário. `onboarding/board-cliente.md`.

### 4. @cs gerar briefing-final
Consolida board + dados fechamento.

### 5. @cs setup técnico
Pixel + CAPI + GA4 + UTM + iOS AEM. `setup-tecnico/status.md`.

### 6. @strategist plano-inicial
**Usa bloco:** `.em5/blocos/strategist-analise-dados.md`
`estrategia/plano-inicial.md` (posicionamento + ICP + canais + KPIs + 3 hipóteses).

### 7. @qa valida onboarding completo
**Usa bloco:** `.em5/blocos/qa-validar-relatorio.md`

### 8. @cs kickoff-call
Agenda + materiais. Marca fim onboarding.

## Outputs
- `clientes/{nome}/` workspace completo
- briefing-final.md · plano-inicial.md · status técnico OK · Asaas ativo
- Ticket fechado APROVADO

## Métricas
- Prazo total: 5-7 dias úteis
- Taxa QA primeira: > 90%
- Inadimplência 1º mês: < 5%

## Composio MCP
- asaas · meta_ads · google_analytics · gmail
