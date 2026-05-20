---
name: delegar-operacao
agent: coo
description: Ler o workflow relevante, montar o contexto mínimo para cada agente e despachar as delegações na ordem correta
inputs:
  - pedido recebido (do CEO ou do usuário direto)
  - nome do cliente
  - nome do workflow a executar
outputs:
  - delegações enviadas para agentes operacionais com contexto correto
  - registro de operação aberta no log do cliente
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: false
---

# Delegar Operação

## Objetivo

Transformar um pedido em delegações concretas para os agentes certos, na ordem certa, com o contexto mínimo necessário para cada um executar sem dúvida.

---

## Passo a passo

### 1. Identificar o workflow

Verificar qual workflow se aplica ao pedido recebido:

| Pedido | Workflow |
|--------|----------|
| Onboarding de novo cliente | `onboarding-cliente.yaml` |
| Lançar campanha | `ciclo-campanha.yaml` |
| Analisar/otimizar criativos | `iteracao-criativa.yaml` |
| Análise de tráfego | Sequência: `auditar-conta` → `gerar-relatorio` (Pulse) |
| Relatório mensal | Sequência: `gerar-relatorio` (Pulse) → `enviar-relatorio` (CS) |

Ler o arquivo do workflow em `.em5/workflows/{nome}.yaml`.

### 2. Verificar estado do cliente

Checar em `clientes/{nome}/operacao/` o que já foi feito:
- `log-operacional.md` — última interação e etapa atual
- `proximos-passos.md` — o que está pendente

Identificar em qual etapa do workflow o cliente está.

### 3. Montar contexto mínimo para cada delegação

Para cada agente a ser acionado, preparar:

```
Agente: @{id}
Comando: *{comando} {cliente}
Contexto: {1-2 frases — o que este agente precisa saber}
Arquivo de referência: clientes/{nome}/{caminho}
Entrega esperada: {arquivo ou confirmação}
```

**Regra de contexto mínimo:**
- Incluir: cliente, objetivo desta etapa, arquivo de entrada
- Não incluir: histórico completo, estratégias de outras etapas, detalhes de outros agentes

### 4. Despachar na sequência correta

Seguir a ordem do workflow. Atenção às regras de paralelismo:

**Paralelo (podem rodar ao mesmo tempo):**
- `@copywriter` + `@designer` após briefing e estratégia aprovados

**Sequencial (um depende do outro):**
- `@cs` entrega `briefing-final.md` → `@strategist` começa
- `@strategist` entrega `plano-estrategico.md` → `@traffic` começa
- Todos entregam → `@qa` valida → `@traffic` publica

### 5. Registrar operação aberta

Adicionar entrada no `log-operacional.md` do cliente:

```
| {data} | OPERAÇÃO | Nexus (COO) | Iniciado: {nome-workflow}. Agentes acionados: {lista}. | EM ANDAMENTO | Aguardar entregas |
```

## Output esperado

- Cada agente recebeu sua delegação com contexto claro
- Sequência registrada no log operacional
- Gerente aguarda confirmação de cada etapa antes de acionar a próxima
