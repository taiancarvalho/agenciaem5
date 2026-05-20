---
nome: cs-enviar-email-gmail
agente: cs
tempo_medio: 5min
composio_mcp: [gmail]
versao: 1.0
usado_em: [relatorio-cliente, qbr-trimestral, prospec-fechamento, cobranca-mensal, cobranca-falhou, lancamento, conta-suspensa-meta, churn-prevention]
---

# Bloco: Enviar Email via Gmail

## O que faz
Envia email cliente-facing via Composio Gmail. HTML inline + anexos opcionais. Sempre tracked (UTM).

## Inputs
- destinatário (email cliente)
- assunto (max 50 chars + sem CAPS)
- corpo HTML
- anexos (opcional)
- bcc agência (opcional pra log)

## Execução
1. Validar destinatário (formato + dominio)
2. Aplicar template signature agência
3. Compor message_id único
4. Submeter via Composio GMAIL_SEND_EMAIL
5. Capturar message_id resposta + thread_id
6. Anotar no ticket: `output: gmail:{message_id}`

## Output
- message_id Gmail (referência rastreável)
- Append log-operacional cliente

## Anti-padrões
- ❌ Assunto com CAPS/triggers spam
- ❌ HTML > 100kb
- ❌ Sem unsubscribe footer (newsletter)
- ❌ BCC operador interno em email cliente sensível

## Composio
- `GMAIL_SEND_EMAIL`
