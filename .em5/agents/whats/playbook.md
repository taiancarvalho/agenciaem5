# Playbook WhatsApp — Onda

> Referência expert para @whats. Orquestrador WhatsApp Business — templates, stop rules, handoff humano.

## Princípio

**WhatsApp é canal pessoal — não é email blast.** Spam queima reputação número + risco banimento. Compliance LGPD sempre.

## Dual provider — qual usar

| Provider | Quando | Custo | Pros | Contras |
|----------|--------|-------|------|---------|
| **Composio `whatsapp_business`** | Cliente formal / produção | $$ | API oficial, templates aprovados, deliverability alta | Custo + aprovação template Meta |
| **WAHA selfhosted** | Teste / cliente low-budget | Free | Sem custo + sem aprovação template | Risco bloqueio + manutenção infra |

Config via `/whats-setup` ao onboarding cliente.

## Tipos de mensagem

### 1. Template aprovado Meta (sempre 1ª mensagem)

Antes de janela 24h, **só template** pode iniciar conversa. Categorias:

| Categoria | Quando | Exemplo |
|-----------|--------|---------|
| `MARKETING` | Promo, lançamento | "🎉 Lançamento curso XYZ — vagas abertas até dia 30" |
| `UTILITY` | Confirmação, lembrete, status | "Sua cobrança de R$X vence amanhã. Link pagamento: ..." |
| `AUTHENTICATION` | OTP, código | "Seu código: 123456" |

**Template recusado por Meta:**
- Promessas exageradas
- Texto agressivo de vendas
- URLs encurtados (bit.ly suspeito)
- Emojis excessivos
- CAPS abusivo

### 2. Resposta livre (dentro janela 24h)

Após cliente responder, abre janela 24h pra qualquer texto. Use pra:
- Tirar dúvidas
- Enviar materiais
- Confirmar pedido
- Handoff humano

## Stop rules (compliance)

| Trigger | Ação |
|---------|------|
| Cliente diz "PARAR" / "STOP" / "SAIR" | Adiciona à blocklist + remove de cadências |
| Cliente reclama | Pausa imediato + escala @cs |
| 3 mensagens sem resposta cadência | Pausa cadência (não insiste) |
| Cliente bloqueia número | Detectar + remover da base |

## Handoff humano — quando

| Sinal | Ação |
|-------|------|
| Pergunta complexa fora playbook | Passa @cs com contexto |
| Reclamação | Passa @cs imediato |
| Pedido cancelamento | Passa @cs (churn-prevention) |
| Pedido cobrança/financeiro | Passa @fin |
| Discussão técnica produto | Passa especialista |

Sempre informar cliente: "Vou te conectar com [pessoa] pra esse ponto específico, OK?"

## Cadência recomendada (por tipo)

### Cobrança (cobranca-mensal.yaml)

- D-3: lembrete suave fatura
- D0: vencimento
- D+1: cobrança gentil
- D+3: retry + link novo
- D+5: escalation humana @cs

### Lançamento

- D-7: aquecimento (template MARKETING aprovado)
- D-3: contagem regressiva
- D-1: última chamada
- D0: abertura carrinho
- D+1: lembrete
- Fechamento: "última hora"

### Nurturing (suave, mensal)

- 1 mensagem/mês max
- Conteúdo de valor (não venda)
- Sempre opt-out claro

## Rate limit + boas práticas

| Regra | Razão |
|-------|-------|
| Max 50 msgs/dia/número (cold) | Evitar flag Meta |
| Max 20 msgs simultaneous send | Anti-spam detection |
| Espaçar 1-3s entre msgs em loop | Humano não envia 10/segundo |
| Não enviar 22h-7h | Educação + LGPD |
| Não enviar feriado/fim-semana sem autorização | Educação |

## Anti-padrões

- Spray-and-pray template marketing → flag + banimento
- Ignorar STOP → multa LGPD R$50M
- Handoff sem contexto → @cs recebe cego, cliente repete tudo
- Template não-aprovado tentar usar → rejeição API
- Mensagem fora janela 24h sem template → erro 132000
- WhatsApp pessoal pra cliente → quebra profissionalismo + sem rastreio

## Tools Composio essenciais

- `WHATSAPP_SEND_MESSAGE` — envio direto (janela 24h)
- `WHATSAPP_SEND_TEMPLATE_MESSAGE` — template aprovado
- `WHATSAPP_GET_MESSAGES` — histórico
- `WHATSAPP_LIST_TEMPLATES` — templates aprovados
- Webhook: `WHATSAPP_MESSAGE_RECEIVED` → trigger @whats

## Métricas próprias

- Taxa entrega: > 95%
- Taxa resposta cadência cobrança: > 30%
- Taxa STOP/blocklist: < 0.5% (sinal cadência saudável)
- Taxa handoff humano: 10-30% (depende plano cliente)
- Tempo resposta handoff: < 30min horário comercial
