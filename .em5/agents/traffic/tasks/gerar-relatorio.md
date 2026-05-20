---
name: gerar-relatorio
agent: traffic
description: Gerar relatório técnico de performance do período para o CS entregar ao cliente
inputs:
  - dados de performance do período (mês ou semana)
  - clientes/{nome}/operacao/log-performance-criativa.md
  - clientes/{nome}/estrategia/plano-estrategico.md (para comparar com as metas)
outputs:
  - clientes/{nome}/relatorios/{periodo}-relatorio.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Gerar Relatório de Performance

## Objetivo

Consolidar os dados do período em um relatório técnico completo que o CS vai usar para comunicar ao cliente.

## Regra

```
Pulse gera o relatório técnico.
CS transforma em comunicação.
Cliente NUNCA recebe relatório diretamente do Pulse.
```

---

## Passo a passo

### 1. Coletar dados do período

Perguntar ao usuário:

```
Preciso dos dados do período {data_inicio} a {data_fim}:

1. Investimento total
2. Resultado total por objetivo (leads / vendas / agendamentos)
3. CPL ou CPA médio
4. Detalhamento por campanha
5. Detalhamento por criativo (top 3 melhores e piores)
6. Dados de funil (cliques, impressões, taxa de conversão da LP)
7. Comparativo com período anterior (se disponível)
```

### 2. Gerar relatório técnico

Criar `clientes/{nome}/relatorios/{periodo}-relatorio.md`:

```markdown
# Relatório de Performance — {Nome do Cliente}
**Período:** {data_inicio} a {data_fim}
**Elaborado por:** Pulse (Gestor de Tráfego)
**Para:** Sol (CS) — entregar ao cliente

---

## Resultado Geral

| Métrica | Resultado | Meta | Status |
|---------|-----------|------|--------|
| Investimento total | R$ {x} | R$ {meta} | ✅/⚠️/❌ |
| {Objetivo principal} | {N} | {meta N} | ✅/⚠️/❌ |
| CPL / CPA médio | R$ {x} | R$ {meta} | ✅/⚠️/❌ |
| CTR médio | {%} | — | — |
| ROAS | {x} | {meta} | ✅/⚠️/❌ |

**Vs período anterior:** {melhorou X% / piorou X% / estável}

---

## Por Campanha

| Campanha | Investimento | Resultado | CPL/CPA | Status |
|----------|-------------|-----------|---------|--------|
| CP-001 | R$ {x} | {N} | R$ {x} | ✅/⚠️/❌ |
| CP-002 | R$ {x} | {N} | R$ {x} | ✅/⚠️/❌ |

---

## Top Criativos

### Melhores

| ID | Tipo | Ângulo | CTR | CPL/CPA | Volume |
|----|------|--------|-----|---------|--------|
| CR-{id} | {tipo} | {ângulo} | {%} | R$ {x} | {N} |

### Piores (pausados ou em atenção)

| ID | Tipo | Ângulo | CTR | CPL/CPA | Decisão |
|----|------|--------|-----|---------|---------|
| CR-{id} | {tipo} | {ângulo} | {%} | R$ {x} | PAUSADO |

---

## Análise e Contexto

**O que funcionou neste período:**
{o que gerou os melhores resultados e por quê}

**O que não funcionou:**
{o que foi pausado e por quê}

**Fator externo relevante (se houver):**
{sazonalidade, feriado, evento de mercado, limitação técnica}

---

## Aprendizados

1. {aprendizado 1 — ex: ângulo de dor performou 40% melhor que desejo neste segmento}
2. {aprendizado 2}
3. {aprendizado 3}

---

## Próximos 30 dias

**O que vai ser mantido:**
- {campanha/criativo que continua}

**O que vai ser ajustado:**
- {ajuste planejado}

**O que vai ser testado:**
- {hipótese nova a ser testada}

**Solicitações para a equipe:**
- Eco: {nova copy / novo ângulo necessário}
- Lux: {novo criativo / variação necessária}
```

### 3. Notificar CS

Informar ao usuário:

```
✅ Relatório técnico salvo em:
clientes/{nome}/relatorios/{periodo}-relatorio.md

→ Sol: *enviar-relatorio {nome}
```

## Output esperado

- Relatório técnico completo e estruturado
- CS pronto para transformar em comunicação adequada ao cliente
