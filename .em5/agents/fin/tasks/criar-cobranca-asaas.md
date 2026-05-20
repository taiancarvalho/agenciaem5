---
name: criar-cobranca-asaas
agent: fin
description: Cria cobrança Asaas via MCP + sync local
inputs:
  - cliente_slug
  - valor (BRL)
  - billing_type: PIX | BOLETO | CREDIT_CARD
  - due_date (YYYY-MM-DD)
outputs:
  - clientes/{slug}/financeiro/cobrancas.yaml (append)
  - .em5/system/learnings/{mes}/mcp-excecoes.md (audit)
elicit: true
model_tier: balanced
mcp_dependencies:
  - asaas  # exceção Art. IX
---

# Task: criar-cobranca-asaas

## Objetivo

Criar cobrança no Asaas via MCP oficial + manter espelho local em filesystem (Art. I).

## Pré-requisitos

- Cliente cadastrado em `clientes/{slug}/financeiro/cliente-asaas.yaml` com `customer_id`
- Se não tem `customer_id` → primeiro consultar/criar via Asaas (operação separada)
- `ASAAS_TOKEN` configurado em `.env`

## Passo a passo

### 1. Validar inputs

- `valor` > 0
- `billing_type` em `[PIX, BOLETO, CREDIT_CARD]`
- `due_date` no futuro

### 2. Buscar customer_id do cliente

Lê `clientes/{slug}/financeiro/cliente-asaas.yaml`:
```yaml
customer_id: cus_xxx
nome_fiscal: "Razão social"
documento: "CNPJ ou CPF"
```

Se ausente → erro + solicita cadastro prévio.

### 3. Chamar Asaas MCP

```
@asaas create-payment {
  customer: "cus_xxx",
  billingType: "PIX",
  value: 4500.00,
  dueDate: "2026-06-15",
  description: "Mensalidade em5 - {mes}/{ano} - {cliente_nome}"
}
```

### 4. Sync local

Append em `clientes/{slug}/financeiro/cobrancas.yaml`:
```yaml
- id_asaas: pay_xxx
  data_criacao: 2026-05-16
  vencimento: 2026-06-15
  valor: 4500.00
  tipo: PIX
  status: PENDING
  url_pagamento: https://...
  description: "Mensalidade em5 - 06/2026"
```

### 5. Auditoria MCP exceção

Append em `.em5/system/learnings/{mes-corrente}/mcp-excecoes.md`:
```markdown
## {data} — criar-cobranca-asaas
- Cliente: {slug}
- Valor: R$ {valor}
- Tipo: {billing_type}
- ID Asaas: pay_xxx
- Operação: SUCESSO
```

### 6. Output pro user

```
✅ Cobrança criada:
   Cliente: {nome}
   Valor: R$ {valor}
   Vencimento: {data}
   Tipo: {tipo}
   Link: {url_pagamento}
   ID Asaas: pay_xxx

Próximo: webhook Asaas vai disparar quando pagar (configurar via *setup-webhooks-asaas)
```

## Critério de saída

- Cobrança ativa no Asaas
- Entry local em cobrancas.yaml
- Audit em mcp-excecoes.md
- User recebeu confirmação + link pra cliente

## Anti-padrão

- NÃO criar cobrança sem customer_id (erro hard)
- NÃO bypassar audit log (Art. IX exigência)
- NÃO armazenar token Asaas em arquivo versionado — usar env var
