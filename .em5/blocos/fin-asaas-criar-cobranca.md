---
nome: fin-asaas-criar-cobranca
agente: fin
tempo_medio: 2-5min
composio_mcp: [asaas]
versao: 1.0
usado_em: [onboarding-cliente, cobranca-mensal, cobranca-falhou, lancamento, prospec-fechamento]
---

# Bloco: Criar Cobrança Asaas

## O que faz
Gera cobrança Asaas (PIX/Boleto/Cartão). Retorna link + dados pagamento.

## Inputs
- customer_id Asaas
- valor (R$)
- vencimento (data)
- descrição
- método preferido (PIX > Boleto > Cartão)

## Execução
1. ASAAS_LIST_CUSTOMERS (validar customer existe)
2. ASAAS_CREATE_PAYMENT (cobranca nova)
3. Capturar payment_id + invoice_url + bank_slip_url + pix_qr_code
4. Salvar em `clientes/{nome}/financeiro/cobrancas/{YYYY-MM}.json`
5. Anotar no ticket

## Output
- payment_id Asaas + link pagamento
- JSON cobranca arquivado

## Anti-padrões
- ❌ Vencimento < 3d (cliente sem prazo)
- ❌ Sem descrição (cliente confuso)

## Composio
- MCP nativo Asaas (exceção Composio — ver `~/.claude/rules/mcp-servers.md`)
