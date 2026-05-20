---
nome: abertura-semana
skill: /abertura-semana
tipo: hibrido
classificacao_skill: hibrido
agente_orquestrador: coo
agente_responsavel_entrega: ceo
tempo_medio: 30min
qa_gate: false
versao: 1.0
---

# Receita: Abertura de Semana (ritual humano)

> Segunda 8h. 3 prioridades + 1 entrega real + revisa ledger semana anterior.

## Quando usar
- Cron segunda 8h
- Volta feriado/férias
- Início mês/trimestre

## Inputs
- Logs operacionais última semana
- Tickets recentes (`historico/`)
- Perfis clientes ativos

## Steps

### 1. @coo revisa semana anterior (5min)
Snapshot ENTREGUE/PENDENTE/ATRASADA por cliente. Lê últimos 7d tickets.

### 2. @ceo define 3 prioridades (5min)
Framework Eisenhower. Pergunta-âncora: "se eu não fizer nada essa semana, o que quebra?"

### 3. @coo valida com capacidade (5min)
Cruza com perfis clientes + bloqueantes /check.

### 4. @coo gera 1ª entrega (15min)
Dispatcha receita correspondente à prioridade #1. Momentum > planejamento.

### 5. @coo registra plano (5min)
**Output:** `operacao/abertura-semana-{YYYY-SS}.md`

## Outputs
- `operacao/abertura-semana-{YYYY-SS}.md` (plano + ledger)
- 1 entrega real concluída (ticket fechado)
- `proximos-passos.md` cada cliente atualizado

## Anti-padrões
- ❌ Expandir > 30min (vira reunião)
- ❌ Não gerar entrega (só planejou = perdeu momentum)
- ❌ Carregar tasks pendentes 2+ semanas seguidas

## Métricas
- Duração real: <= 30min
- Taxa entrega segunda: 100%
- Taxa aderência 3 prioridades sex: >= 80%

## Composio MCP
- — (operação interna)
