---
name: preparar-reuniao
agent: cs
description: Prepara roteiro completo para reuniao de resultado com o cliente
inputs:
  - clientes/{nome}/operacao/log-operacional.md
  - clientes/{nome}/operacao/log-performance-criativa.md
  - clientes/{nome}/estrategia/plano-estrategico.md
  - clientes/{nome}/relatorios/ (relatorio mais recente)
outputs:
  - clientes/{nome}/reunioes/pauta-{data}.md
elicit: false
---

# Preparar Reunião de Resultado

## Objetivo
Gerar pauta estruturada e dados consolidados para a reunião de resultado com o cliente.
O CS conduz a reunião com dados na mão — sem improvisar.

## Passo a passo

1. **Ler o relatório mais recente**
   - Abrir `clientes/{nome}/relatorios/` e identificar o relatório mais recente
   - Extrair: métricas principais, comparativo com meta, destaques positivos e negativos

2. **Ler o log operacional**
   - Identificar as últimas 5 interações com o cliente
   - Listar pendências em aberto (cliente ou agência)
   - Identificar promessas feitas na última reunião que precisam de resposta

3. **Ler o plano estratégico**
   - Relembrar o objetivo principal do cliente
   - Verificar se a estratégia atual ainda faz sentido
   - Identificar oportunidades de upsell ou expansão

4. **Montar a pauta no formato padrão**

## Output esperado

```markdown
# Reunião de Resultado — {nome do cliente} — {data}

## Abertura (5 min)
- Check-in rápido
- Pauta de hoje: {lista dos tópicos}

## Performance do Período (15 min)
**Objetivo:** {objetivo do cliente}
**Meta:** {meta do período}
**Resultado:** {resultado real}
**Variação:** {% acima ou abaixo da meta}

### Destaques positivos
- ...

### Pontos de atenção
- ...

## Pendentes das reuniões anteriores (10 min)
| Pendente | Responsável | Status |
|----------|-------------|--------|
| ...      | ...         | ...    |

## Próximos 30 dias (15 min)
- Ação 1: ...
- Ação 2: ...
- Ação 3: ...

## Encerramento
- Próxima reunião: {data sugerida}
- Pendências geradas hoje: {lista}
```

5. **Salvar** em `clientes/{nome}/reunioes/pauta-{data}.md`
6. **Registrar** no log operacional: "Pauta de reunião preparada para {data}"
