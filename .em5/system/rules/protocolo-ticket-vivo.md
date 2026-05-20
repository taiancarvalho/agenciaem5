# Protocolo Ticket Vivo

> Regra estrutural sistema em5 v2.4+. Toda demanda operacional cria 1 ticket vivo em `historico/{id}/ticket.md`.

## Princípio (Art. III revisado)

**Ticket vivo = source-of-truth por demanda.**

Antes (v1-v2): operador sincronizava 3 arquivos por cliente (log + status + notas-sessao). Frankstein UX.

Agora (v2.4+): 1 ticket por demanda. Agentes anotam inline. YAML status parseável.

## Regras inviolaveis

### R1. Toda demanda multi-agente cria ticket

- @coo recebe demanda → cria `historico/{YYMMDD-clienteslug-tipo}/ticket.md` ANTES de despachar agente
- Sem ticket = agente não executa
- Exceções: ops single-agent triviais (`/status`, `/dia`) podem rodar sem ticket

### R2. Agente passa ID ticket, não contexto

- @coo dispatcha agente com **path do ticket** + step específico do ticket
- Agente lê ticket → identifica seu step → executa → anota
- NÃO passar contexto duplicado em prompt — agente lê do ticket

### R3. Agente escreve SÓ no seu step

- Cada agente anota apenas no seu yaml inline + suas anotações livres
- NÃO sobrescrever steps de outros agentes
- NÃO mexer em `status_global` (só @coo)

### R4. Status global = @coo

- Apenas @coo atualiza `status_global` no frontmatter
- Transições: EM_ANDAMENTO → BLOQUEADO/APROVADO/REPROVADO/CANCELADO
- @coo atualiza após cada transição relevante

### R5. Append-only nas anotações livres

- Histórico nunca é deletado
- Correção = novo append com timestamp + motivo
- Diff git rastreável

### R6. Output linkado, não embutido

- Artefatos finais ficam em `clientes/{nome}/{categoria}/{arquivo}`
- Ticket só linka path (`output: clientes/...`)
- Exceção: snippets curtos (< 200 chars) podem ir inline em observacoes

### R7. Fechamento formal

- @coo fecha ticket: preenche seção 9 yaml `fechado_em`, `veredito_final`, `resumo_executivo`
- Reporta @ceo passando o `resumo_executivo`
- Ticket fechado é imutável (read-only — apenas correção via append nota)

## Fluxo padrão

```
1. User → @ceo (decisão estratégica) OR direto skill operacional
   ↓
2. @ceo (se aplicável) → @coo
   ↓
3. @coo:
   a. Lê em5-config.yaml + perfil cliente
   b. Gera ID ticket
   c. Cria historico/{id}/ticket.md (copia do _template)
   d. Lê .em5/receitas/{nome}.md
   e. Popula ticket: demanda + contexto + steps planejados
   f. status_global: EM_ANDAMENTO
   ↓
4. @coo dispatcha step 1 → @{agente1}
   "Execute step 1 do ticket historico/{id}/ticket.md"
   ↓
5. @{agente1}:
   a. Lê ticket
   b. Identifica seu step
   c. Lê receita se precisa detalhes inline OR lê bloco se referenciado
   d. Atualiza yaml: status: doing + timestamp_inicio
   e. Executa via Composio (se aplicável)
   f. Gera artefato em clientes/{nome}/
   g. Atualiza yaml: status: done + veredito + output + observações + timestamp_fim
   h. Append anotações livres
   ↓
6. @coo monitora (lê ticket periodicamente) → step done → dispatcha próximo
   ↓
7. Loop steps 5-6 até último
   ↓
8. @coo:
   a. Verifica todos steps com veredito aprovado
   b. status_global: APROVADO
   c. Preenche seção 9 fechamento
   d. Reporta @ceo
```

## Anti-padrões

- ❌ Despachar agente sem criar ticket antes
- ❌ Passar contexto inteiro pro subagente em vez de path ticket
- ❌ Subagente editar step de outro agente
- ❌ Subagente atualizar status_global
- ❌ Deletar anotações antigas (sempre append)
- ❌ Embutir output longo no ticket (linkar)
- ❌ Fechar ticket sem QA aprovar (se qa_gate: true)

## Migração arquivos antigos

`clientes/{nome}/operacao/log-performance-criativa.md` + `status.yaml` + `memoria/notas-sessao.md` **continuam existindo**, mas:
- Tickets novos linkam pra esses paths (não duplicam)
- Atualizações vão pro ticket, não nesses arquivos
- Esses arquivos viram archive/histórico (read-mostly)

## Relação Constitution

- **Art. I (Filesystem First):** ticket é arquivo, não conversação
- **Art. III (Artefatos > Conversa):** ticket é artefato canônico de demanda
- **Art. IV (Contexto Reduzido):** agente recebe só path ticket, não contexto duplicado
- **Art. VII (Conhecimento Modular):** ticket linka receita+bloco, não duplica

## Validação CI

`.em5/infra/bin/em5-validate.js` checa:
- Tickets em historico/ têm frontmatter YAML válido
- IDs seguem convenção YYMMDD-slug-tipo
- status_global valor válido
- Steps com `status: done` têm `veredito` preenchido
