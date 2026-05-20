---
nome: fin-asaas-listar-status
agente: fin
tempo_medio: 1-2min
composio_mcp: [asaas]
versao: 1.0
usado_em: [cobranca-mensal, cobranca-falhou, lancamento, ciclo-campanha, analise-portfolio]
---

# Bloco: Listar Status Pagamentos Asaas

## O que faz
Consulta status cobranças (PAGO/PENDENTE/VENCIDO/INADIMPLENTE) via Asaas.

## Inputs
- customer_id OR lista clientes ativos
- janela (default mês corrente)

## Execução
1. ASAAS_LIST_PAYMENTS (filtra cliente + status + janela)
2. Classificar: PAGO · PENDENTE · VENCIDO (1-4d) · INADIMPLENTE_5d / 15d / 30d
3. Calcular total MRR realizado vs esperado
4. Anotar no ticket OR painel-mrr

## Output
- Tabela status por cliente
- Total MRR realizado

## Composio
- MCP nativo Asaas
