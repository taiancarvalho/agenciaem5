---
name: monitorar-execucao
agent: coo
description: Verificar o status de cada etapa em andamento, confirmar entregas e acionar próximos agentes quando a dependência estiver pronta
inputs:
  - nome do cliente
  - operação em andamento (workflow + etapa atual)
outputs:
  - confirmação de entregas recebidas
  - acionamento do próximo agente na sequência
  - registro de status no log operacional
elicit: false
---

# Monitorar Execução

## Objetivo

Verificar o que foi entregue, confirmar que está completo e acionar a próxima etapa sem deixar o workflow travar por falta de coordenação.

---

## Passo a passo

### 1. Verificar entregas pendentes

Para cada etapa em andamento, verificar se o arquivo de saída esperado existe:

```
Etapa                  | Arquivo esperado
-----------------------|--------------------------------------------
CS onboarding          | .em5/clientes/{nome}/onboarding/briefing-final.md
Estrategista           | .em5/clientes/{nome}/estrategia/plano-estrategico.md
Gestor (auditoria)     | .em5/clientes/{nome}/trafego/ (arquivos de auditoria)
Copywriter             | .em5/clientes/{nome}/copy/ (copy por canal)
Designer               | .em5/clientes/{nome}/design/criativos/ (arquivos)
QA                     | log-operacional.md com veredicto: APROVADO
Gestor (relatório)     | .em5/clientes/{nome}/relatorios/relatorio-{periodo}.md
```

### 2. Avaliar qualidade mínima da entrega

Verificar se o arquivo não está vazio e contém as seções esperadas (não fazer revisão de qualidade — isso é papel do QA). Confirmar apenas:
- Arquivo existe
- Não está em branco
- Tem estrutura básica esperada

### 3. Acionar próximo agente

Quando entrega confirmada, despachar o próximo agente da sequência:

```
Entrega confirmada: briefing-final.md
→ Acionar: @strategist *analisar-briefing {cliente}
   Contexto: "Briefing finalizado pelo CS. Leia .em5/clientes/{nome}/onboarding/briefing-final.md"
```

### 4. Tratar bloqueios

Se uma entrega está atrasada ou com problema:

| Situação | Ação |
|----------|------|
| Agente pediu informação do cliente | Escalar para CS registrar e obter |
| Entrega incompleta | Retornar ao agente com especificação do que falta |
| Decisão estratégica emergiu | Escalar para CEO (Atlas) com `*escalar-para-ceo` |
| QA emitiu REVISÃO | Retornar para o agente responsável com feedback do QA |
| QA emitiu BLOQUEADO | Escalar para CEO imediatamente |

### 5. Atualizar log operacional

```
| {data} | MONITOR | Marcos (COO) | {etapa} entregue: {arquivo}. Próximo: {agente} acionado. | ANDAMENTO | {próxima ação} |
```

## Output esperado

- Cada entrega confirmada desencadeia o próximo passo automaticamente
- Bloqueios escalados sem deixar o workflow travar
- Log operacional atualizado a cada transição de etapa
