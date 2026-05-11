---
name: otimizar-campanha
agent: traffic
description: Analisar performance da janela de 7 dias e tomar decisões de otimização baseadas em dados
inputs:
  - dados de performance dos últimos 7 dias (da plataforma ou fornecidos pelo usuário)
  - .omgsys/clientes/{nome}/trafego/auditoria.md
  - .omgsys/clientes/{nome}/estrategia/plano-estrategico.md
  - .omgsys/clientes/{nome}/operacao/log-performance-criativa.md
outputs:
  - registro das decisões no log operacional
  - atualização no log de performance criativa (status dos criativos)
elicit: true
---

# Otimizar Campanha

## Objetivo

Revisar os dados da semana, identificar o que está funcionando e o que não está, e tomar decisões de otimização com critério — não no impulso.

## Regra Crítica

```
Janela mínima de análise: 7 dias.
Nunca otimizar com 1-2 dias de dados.
Decisão sem dado = chute = desperdício de verba.
```

---

## Passo a passo

### 1. Coletar dados da semana

Perguntar ao usuário (ou puxar via Meta Ads MCP):

```
Preciso dos dados dos últimos 7 dias:

1. Investimento total
2. Resultado total (leads / vendas / agendamentos)
3. CPL ou CPA médio
4. Por campanha: nome, investimento, resultado, CPL/CPA
5. Por criativo: ID, nome, CTR, CPL/CPA, volume
6. Alguma anomalia notada? (spike de custo, queda de volume, criativo saturado)
```

### 2. Diagnosticar

Para cada campanha, classificar:

| Status | Critério |
|--------|---------|
| ✅ SAUDÁVEL | CPL/CPA dentro da meta. Manter. |
| ⚠️ ATENÇÃO | CPL/CPA até 30% acima da meta. Monitorar mais. |
| 🔴 PROBLEMA | CPL/CPA mais de 30% acima da meta por 7+ dias. Agir. |
| 💀 PAUSAR | Sem resultado em 7 dias com volume de impressões suficiente. |

Para cada criativo, classificar:

| Status | Critério |
|--------|---------|
| ⭐ VENCEDOR | CTR alto + CPL/CPA saudável + volume crescente |
| ✅ ATIVO | Performando dentro do esperado |
| ⚠️ OBSERVAR | CTR caindo ou CPL subindo nos últimos 3 dias |
| ❌ PAUSAR | CTR < 1% e/ou CPL 50%+ acima da meta por 7 dias |

### 3. Tomar decisões

Para cada problema identificado, definir ação:

```markdown
## Decisões de Otimização — {data}

### Campanhas

| Campanha | Diagnóstico | Ação | Motivo |
|----------|-------------|------|--------|
| CP-001 | 🔴 PROBLEMA | Reduzir budget 30% | CPL R$85 vs meta R$50 por 8 dias |
| CP-002 | ✅ SAUDÁVEL | Manter | CPL R$42, dentro da meta |
| CP-003 | 💀 PAUSAR | Pausar | 0 leads em 7 dias, R$320 investidos |

### Criativos

| Criativo | Diagnóstico | Ação | Motivo |
|---------|-------------|------|--------|
| CR-001 | ⭐ VENCEDOR | Aumentar budget | CTR 4.2%, CPL R$28 |
| CR-003 | ❌ PAUSAR | Pausar | CTR 0.8%, CPL R$98 em 7 dias |
| CR-005 | ⚠️ OBSERVAR | Monitorar mais 3 dias | CTR caindo, aguardar |
```

### 4. Verificar se precisa de novos criativos

Se vencedores estiverem saturando ou não houver variações suficientes:

```
⚠️ Ação necessária: solicitar novos criativos
→ *solicitar-criativos {nome} — faltam variações do ângulo {X}
```

### 5. Registrar no log operacional

```markdown
| {data} | OTIMIZAÇÃO | Max | Otimização semanal executada. Pausado: {N} campanhas, {N} criativos. Escalado: CR-{id}. CPL médio atual: R${x}. | CONCLUÍDO | Monitorar até {próxima data} |
```

### 6. Atualizar log de performance criativa

Para criativos pausados, atualizar status na coluna `Status` para `PAUSADO` e registrar motivo em `Observação`.

## Output esperado

- Decisões documentadas
- Log operacional atualizado
- Log de performance criativa atualizado
- Conta otimizada com base em dados da janela de 7 dias
