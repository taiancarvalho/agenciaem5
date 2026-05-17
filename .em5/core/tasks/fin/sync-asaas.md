---
name: sync-asaas
agent: fin
description: Lista cobranças Asaas + atualiza estado local em cobrancas.yaml
inputs:
  - cliente_slug (opcional — default: todos)
  - periodo: ultimo_mes | ultimos_3 | tudo
outputs:
  - .em5/clientes/*/financeiro/cobrancas.yaml (atualizado)
  - .em5/_fin/sync-{data}.md (log)
elicit: false
model_tier: balanced
mcp_dependencies: [asaas]
---

# Task: sync-asaas

## Objetivo

Manter espelho local (Art. I filesystem) coerente com estado Asaas. Roda diário via `/dia`.

## Passo a passo

1. **Asaas MCP**: `list-payments { dateCreated[ge]: {inicio}, dateCreated[le]: {fim}, limit: 100 }`
2. Pra cada payment:
   - Identifica `cliente_slug` via cross-ref `customer_id` em `cliente-asaas.yaml`
   - Atualiza/insere em `clientes/{slug}/financeiro/cobrancas.yaml`
   - Detecta diff: pagou? venceu? cancelou?
3. Diff log → `.em5/_fin/sync-{YYYY-MM-DD}.md`:
   ```markdown
   ## Sync {data}
   - Cobranças processadas: {N}
   - Mudanças detectadas: {M}
     - Pagas: {X}
     - Vencidas novas: {Y}
     - Canceladas: {Z}
   ```
4. Eventos críticos (vencidas novas) → notifica `@fin *monitorar-inadimplencia`
5. Audit em `mcp-excecoes.md`

## Critério de saída

- Estado local = estado Asaas
- Log de sync gerado
- Eventos críticos escalados

## Anti-padrão

- NÃO duplica entries (usa `id_asaas` como chave)
- NÃO sobrescreve `observacoes` locais (campo livre do user)
