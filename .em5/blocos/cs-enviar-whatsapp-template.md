---
nome: cs-enviar-whatsapp-template
agente: whats
tempo_medio: 2min
composio_mcp: [whatsapp_business]
versao: 1.0
usado_em: [cobranca-mensal, cobranca-falhou, daily-run, lancamento, conta-suspensa-meta, churn-prevention]
---

# Bloco: Enviar Template WhatsApp Aprovado

## O que faz
Envia template MARKETING/UTILITY pré-aprovado Meta via Composio. Sempre primeira mensagem (fora janela 24h).

## Inputs
- número destinatário (E.164)
- template_id (aprovado Meta)
- variáveis substituição (nome, valor, link, etc)

## Execução
1. Validar número (formato + opt-in OR janela 24h aberta)
2. Substituir variáveis no template
3. Submeter via Composio WHATSAPP_SEND_TEMPLATE
4. Capturar message_id
5. Rate limit check (max 20/dia/número cold OR 50/dia ativo)
6. Anotar no ticket: `output: wa:{message_id}`

## Output
- message_id WhatsApp
- Append log comunicação

## Anti-padrões
- ❌ Template não-aprovado (erro 132000)
- ❌ Spray-and-pray (flag + ban)
- ❌ Ignorar STOP rule (blocklist permanente)
- ❌ Enviar 22h-7h sem autorização

## Composio
- `WHATSAPP_SEND_TEMPLATE_MESSAGE`
