# AIOX — Comparativo Estrutural (Master vs PM vs Dev)

# Objetivo

Consolidar a comparação estrutural entre os perfis Master, PM e Dev do AIOX, para usar essa leitura como base de arquitetura do Agency OS.

---

# 1. Papel no sistema

## Master

> Orquestrador e arquiteto do sistema
> 
- governa o framework
- cria e modifica agentes, workflows e componentes
- executa qualquer task se necessário
- decide fluxo completo ponta a ponta

## PM

> Definidor de direção
> 
- transforma ideia em especificação
- organiza escopo, prioridades e objetivos
- conecta negócio com execução

## Dev

> Executor operacional
> 
- pega uma tarefa definida
- executa passo a passo
- valida, corrige e entrega

---

# 2. Anti-papel

## Master

- não deve substituir especialistas sem motivo
- usa outros agentes quando isso aumenta a qualidade

## PM

- não implementa
- não faz arquitetura técnica
- não executa tarefas operacionais

## Dev

- não decide estratégia
- não redefine escopo
- não pensa macro

---

# 3. Tipo de contexto que cada um carrega

## Master → contexto amplo

- visão do sistema inteiro
- todos os agentes
- workflows disponíveis
- registry do que existe e do que já foi feito

## PM → contexto de negócio

- objetivo
- usuário
- problema
- métricas
- escopo

## Dev → contexto mínimo

- tarefa atual
- critérios de aceitação
- instruções específicas

## Insight

Execução = contexto reduzido.

Esse é um princípio crítico para o Agency OS.

---

# 4. Tipo de comando

## Master

Meta-comandos de sistema:

```
*create
*modify
*run-workflow
*plan
*analyze-framework
*validate-workflow
*list-components
```

## PM

Comandos de definição:

```
*gather-requirements
*write-spec
*prioritize
*define-kpis
```

## Dev

Comandos de execução:

```
*execute-subtask
*run-tests
*fix-issues
*rollback
*build
```

---

# 5. Artefatos que cada um gera

## Master

- workflows
- agentes
- estrutura do sistema
- registry atualizado

## PM

- PRD
- specs
- roadmap
- definição de sucesso

## Dev

- resultado executado
- logs
- validação
- correções aplicadas

---

# 6. Como eles se conectam

```
MASTER → decide fluxo
PM → transforma ideia em plano
DEV → executa plano
```

---

# 7. O padrão escondido

O AIOX não é sobre agentes isolados. Ele é sobre 3 camadas de operação.

## Camada 1 — Orquestração

Responsável por decidir o que fazer, quem faz e em que ordem.

## Camada 2 — Definição

Responsável por entender o problema, criar plano e definir direção.

## Camada 3 — Execução

Responsável por fazer, testar, corrigir e entregar.

---

# Tradução para o Agency OS

## Camada 1 — Agency Master

Função:

- receber demanda
- identificar tipo de trabalho
- montar workflow
- acionar agentes certos
- controlar sequência

## Camada 2 — Estratégia

Função:

- coletar briefing
- diagnosticar
- definir estratégia
- definir métricas
- montar plano

## Camada 3 — Execução

Função:

- executar tarefas específicas
- seguir checklist
- validar
- corrigir

---

# Insight final

Você não está construindo agentes de profissão.

Você está construindo:

```
SISTEMA = ORQUESTRAÇÃO + DEFINIÇÃO + EXECUÇÃO
```

Se errar isso, vira bagunça.

Se acertar isso, vira máquina.