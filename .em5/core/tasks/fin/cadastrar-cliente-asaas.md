---
name: cadastrar-cliente-asaas
agent: fin
description: Cria customer no Asaas + sync local em cliente-asaas.yaml
inputs:
  - cliente_slug
  - nome_fiscal
  - documento (CPF ou CNPJ)
  - email
  - telefone
outputs:
  - clientes/{slug}/financeiro/cliente-asaas.yaml
elicit: true
model_tier: balanced
mcp_dependencies: [asaas]
---

# Task: cadastrar-cliente-asaas

## Objetivo

Cria customer no Asaas via MCP (pré-requisito pra qualquer cobrança).

## Passo a passo

1. **Valida documento** (CPF 11 dígitos ou CNPJ 14, sem máscara)
2. **Asaas MCP**: `create-customer { name, cpfCnpj, email, mobilePhone }`
3. Salva `clientes/{slug}/financeiro/cliente-asaas.yaml`:
   ```yaml
   customer_id: cus_xxx
   nome_fiscal: "{nome}"
   documento: "{cpf_cnpj}"
   email: "{email}"
   telefone: "{phone}"
   cadastrado_em: {data}
   ```
4. Audit em `mcp-excecoes.md`

## Critério de saída

- `cliente-asaas.yaml` com `customer_id` válido
- Pronto pra `*criar-cobranca-asaas`
