---
nome: coo-criar-ticket
agente: coo
tempo_medio: 2-3min
composio_mcp: []
versao: 1.0
usado_em: (toda receita — chamado no início)
---

# Bloco: Criar Ticket Vivo

## O que faz
@coo cria pasta `historico/{id}/ticket.md` ANTES de despachar agente.

## Inputs
- nome receita
- nome cliente (slug em em5-config.yaml)
- tipo demanda (auditoria-meta / relatorio-mensal / etc)

## Execução
1. Gerar ID: YYMMDD-clienteslug-tipo
2. Criar pasta `historico/{id}/`
3. Copiar `historico/_template/ticket.md` → `historico/{id}/ticket.md`
4. Preencher frontmatter: id, criado, criado_por, receita, cliente, status_global: EM_ANDAMENTO
5. Preencher seções 1-3 (demanda + contexto cliente + receita base)
6. Ler `.em5/receitas/{nome}.md` → popular seção 4 (steps planejados com yaml inline pending)

## Output
- `historico/{id}/ticket.md` pronto pra agentes anotarem
- Path retornado pro @coo despachar

## Anti-padrões
- ❌ Despachar agente sem criar ticket antes
- ❌ ID fora convenção
- ❌ Esquecer popular steps (agentes não sabem o que executar)
