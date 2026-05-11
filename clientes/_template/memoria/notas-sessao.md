# Notas de Sessão — {Nome do Cliente}

> **REGRA WAL (Write-Ahead Log):** Atualizar SESSION-STATE ANTES de responder. Não depois.
> Ler as últimas 3 sessões antes de iniciar qualquer task.

---

## SESSION-STATE — Memória Ativa

> Este bloco é o "RAM" do agente. Atualizar DURANTE a sessão, não só no fim.
> Quando o cliente confirmar qualquer dado importante → escrever aqui PRIMEIRO, depois responder.

**Task em andamento:** [Nenhuma]

**Contexto chave do cliente:**
- CPA/ROAS meta: [preencher]
- Budget mensal: [preencher]
- Canal principal: [preencher]
- Pixel status: [preencher]
- Score de maturidade: [preencher]/100

**Pendentes para próxima sessão:**
- [ ] [preencher]

**Últimas decisões importantes:**
- [preencher]

---

## Log de Sessões

### Sessão YYYY-MM-DD

**Agente:** @{agente}
**Task executada:** {nome-da-task}
**O que foi feito:** {resumo em 2-3 linhas}
**Decisões importantes:** {o que não pode esquecer}
**Atenção para próxima sessão:** {alertas para o próximo agente}

---

<!--
Template para nova entrada (copiar acima do útimo bloco):

### Sessão YYYY-MM-DD

**Agente:** @
**Task executada:**
**O que foi feito:**
**Decisões importantes:**
**Atenção para próxima sessão:**

---
-->
