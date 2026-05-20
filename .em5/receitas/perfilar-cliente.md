---
nome: perfilar-cliente
skill: /perfil-cliente
tipo: hibrido
classificacao_skill: hibrido
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 5min
qa_gate: false
versao: 1.0
---

# Receita: Classificar Perfil Operacional Cliente

> 1 dos 8 perfis (PN-01 a PN-08). Adapta workflows/KPIs/canais/compliance.

## Quando usar
- Cliente novo (auto pós `/cliente-novo`)
- Cliente legado sem perfil
- Pivot cliente (raro)

## Steps

### 1. @cs entrevista 6 perguntas
**Usa bloco:** `.em5/blocos/cs-entrevista-cliente.md`
1. O que faz · 2. Segmento · 3. Cliente · 4. Canal · 5. Ticket · 6. Gargalo

### 2. @cs mapeia → 1 PN
Cruza respostas com `.em5/system/data/perfis-negocio.yaml`. Híbrido se aplicável.

### 3. @cs valida com cliente
"Encaixei em X — bate?"

### 4. @cs registra
**Output:** `clientes/{nome}/onboarding/perfil-negocio.md` (perfil + justificativa + workflows ativos + KPIs + compliance)

## Outputs
- `clientes/{nome}/onboarding/perfil-negocio.md`

## Métricas
- Duração: <= 5min
- Taxa validação cliente: 100%

## Composio MCP
- — (operação manual)
