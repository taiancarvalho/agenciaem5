---
nome: coo-despachar-agente
agente: coo
tempo_medio: <1min
composio_mcp: []
versao: 1.0
usado_em: (toda receita — múltiplas vezes)
---

# Bloco: Despachar Agente com Ticket

## O que faz
@coo invoca subagent passando SÓ path do ticket + step específico (Art. IV contexto reduzido).

## Inputs
- agente alvo (@traffic/@cs/@qa/etc)
- path ticket
- step específico (id do step pra executar)

## Execução
1. Verificar agente disponível (não em outro ticket bloqueante)
2. Prompt minimal:
```
Execute step {id} do ticket {path}.
Lê o ticket, identifica seu step, executa, anota inline (yaml status + observações).
NÃO modificar outros steps.
```
3. Aguardar `<task-notification>` (push, não polling)
4. Validar agente atualizou step (status: done + veredito + output)

## Output
- Subagent dispatched (background)
- Notificação push quando done

## Anti-padrões
- ❌ Passar contexto duplicado em prompt (agente lê do ticket)
- ❌ Polling em vez de push notification
- ❌ Despachar 2 agentes pro mesmo step
