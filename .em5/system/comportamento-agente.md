# Comportamento Padrão dos Agentes — em5

> Este arquivo define as regras de comportamento que TODOS os agentes seguem.
> Absorvido de: elite-longterm-memory + self-improving-agent skills.

---

## 1. WAL Protocol — Regra Fundamental

**Write-Ahead Log: escrever estado ANTES de responder. Nunca depois.**

Se você responder primeiro e a sessão compactar antes de salvar → o contexto se perde permanentemente.

| Gatilho | Ação imediata (ANTES de responder) |
|---------|-------------------------------------|
| Cliente confirma CPA/ROAS meta | Escrever em `notas-sessao.md` → SESSION-STATE |
| Cliente confirma budget mensal | Escrever em `notas-sessao.md` → SESSION-STATE |
| Decisão estratégica tomada | Escrever em `notas-sessao.md` → SESSION-STATE |
| Criativo aprovado ou reprovado | Escrever em `notas-sessao.md` → SESSION-STATE |
| Erro de API ou falha de Composio | Escrever em `.em5/system/learnings/ERRORS.md` |
| Cliente corrige o agente | Escrever em `.em5/system/learnings/LEARNINGS.md` |
| Gap identificado no sistema | Escrever em `.em5/system/learnings/FEATURE_REQUESTS.md` |

---

## 2. Ciclo de Memória por Sessão

### Inicio de toda sessão
1. Ler `clientes/{nome}/memoria/notas-sessao.md` — bloco SESSION-STATE + últimas 3 entradas
2. Verificar alertas e pendências listadas
3. Não perguntar o que já está documentado

### Durante a task
- Informação relevante recebida → Atualizar SESSION-STATE IMEDIATAMENTE
- Erro detectado → Registrar em `.em5/system/learnings/ERRORS.md`
- Aprendizado de negócio → Registrar em `.em5/system/learnings/LEARNINGS.md`
- Gap de capacidade → Registrar em `.em5/system/learnings/FEATURE_REQUESTS.md`

### Ao terminar a task
1. Adicionar entrada no log de sessões de `notas-sessao.md`
2. Atualizar bloco SESSION-STATE com o estado final
3. Marcar pendências para próxima sessão

---

## 3. Auto-melhoria do Sistema

Quando um agente identificar:
- Um padrão que se repete (mesmo problema em clientes diferentes)
- Uma instrução de playbook que não funciona na prática
- Uma forma melhor de executar uma task

**Ação:** Registrar em `.em5/system/learnings/LEARNINGS.md` com category `best_practice`

**Regra de promoção:** Se um aprendizado aparecer 3x ou mais → promover para o playbook relevante.

| Tipo de aprendizado | Promover para |
|--------------------|---------------|
| Como executar melhor uma task | Playbook do agente relevante |
| Erro recorrente de API | `ERRORS.md` + nota no playbook |
| Gap de capacidade do sistema | `FEATURE_REQUESTS.md` + escalar para @coo |
| Padrão de cliente (nicho específico) | `notas-sessao.md` do cliente |

---

## 4. Detecção de Gatilhos

### Registrar em LEARNINGS.md quando:
- Cliente corrige o agente: "Não, na verdade…", "Isso está errado…"
- Informação nova que o agente não tinha
- Abordagem melhor descoberta para tarefa recorrente
- Comportamento de plataforma diferente do esperado

### Registrar em ERRORS.md quando:
- Composio retorna erro em API call
- @qa bloqueia entrega
- Campanha com CPA > 3x meta após 14 dias
- Cliente contesta resultado entregue

### Registrar em FEATURE_REQUESTS.md quando:
- Cliente pede algo que o sistema não consegue fazer
- Agente identifica gap no fluxo que exigiria nova task/playbook
- Integração útil identificada (ex: novo canal, nova ferramenta)

---

## 5. Prioridades de Registro

| Prioridade | Quando usar |
|-----------|-------------|
| `critical` | Bloqueia execução, perda de dados, risco de conta |
| `high` | Impacta resultado do cliente, erro recorrente |
| `medium` | Melhoria importante, workaround existe |
| `low` | Melhoria menor, caso de borda |
