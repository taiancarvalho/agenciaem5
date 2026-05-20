---
nome: coo-atualizar-status-global
agente: coo
tempo_medio: <1min
composio_mcp: []
versao: 1.0
usado_em: (toda receita — após cada step done)
---

# Bloco: Atualizar Status Global Ticket

## O que faz
@coo atualiza `status_global` no frontmatter ticket conforme progressão.

## Inputs
- path ticket
- novo status (EM_ANDAMENTO | BLOQUEADO | APROVADO | REPROVADO | CANCELADO)
- motivo (se BLOQUEADO/REPROVADO/CANCELADO)

## Execução
1. Ler ticket
2. Editar campo `status_global` no frontmatter
3. Append nota seção decisões globais com timestamp + motivo
4. Commitar mudança (git histórico)

## Output
- Ticket atualizado
- Histórico git rastreável

## Anti-padrões
- ❌ Atualizar status sem motivo (BLOQUEADO/REPROVADO/CANCELADO)
- ❌ Pular EM_ANDAMENTO → APROVADO sem QA validar
