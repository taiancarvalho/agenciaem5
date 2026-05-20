---
nome: coo-fechar-ticket
agente: coo
tempo_medio: 2-3min
composio_mcp: []
versao: 1.0
usado_em: (toda receita — fim)
---

# Bloco: Fechar Ticket Formal

## O que faz
@coo fecha ticket após todos steps aprovados. Reporta @ceo.

## Inputs
- path ticket
- veredito final (APROVADO | REPROVADO | CANCELADO)
- resumo executivo (1-2 linhas)

## Execução
1. Verificar todos steps `veredito: aprovado`
2. Preencher seção 9 yaml: fechado_em (timestamp) · fechado_por (coo) · veredito_final · resumo_executivo
3. Atualizar status_global = APROVADO
4. Append aprendizados seção 6 (se houver)
5. Linkar artefatos seção 7
6. Reportar @ceo passando resumo_executivo + path ticket

## Output
- Ticket fechado (read-mostly)
- @ceo informado

## Anti-padrões
- ❌ Fechar sem QA aprovar (se qa_gate: true)
- ❌ Resumo executivo > 2 linhas
