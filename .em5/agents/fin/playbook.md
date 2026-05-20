# Playbook Fin — Caixa

> Referência expert para @fin. Cobrança, MRR, ROI, inadimplência via MCP Asaas.

## Princípio

**Financeiro precede operação.** Sem pagamento confirmado, campanha não sobe (`ciclo-campanha.yaml` tem gate `@fin.verificar-budget`).

MCP Asaas é exceção Composio — ver `~/.claude/rules/mcp-servers.md`.

## Fluxos principais

### 1. Cobrança recorrente (mensal)

Workflow: `cobranca-mensal.yaml`

```
Cron dia 1, 9h
├── @fin gera fatura Asaas (CRIAR_COBRANCA)
├── @whats envia link pagamento ao cliente
├── @cs envia email fallback paralelo
├── cron diário monitora pagamento até dia 30
└── @fin escala via @cs se INADIMPLENTE_5d+
```

### 2. Cobrança falhou (reativo)

Workflow: `cobranca-falhou.yaml`

```
Webhook Asaas (PAYMENT_OVERDUE/REFUSED/CHARGEBACK)
├── Diagnostica causa
├── Retry inteligente (PIX prioritário > boleto > cartão)
├── Comunica cliente empático
├── Escalação progressiva 3d → 15d → CEO
└── Caminho especial CHARGEBACK = escala @ceo em <1h
```

### 3. ROI por cliente

Mensal — input pra decisão renovação:

```
ROI = (receita_gerada_cliente - custo_operacional - custo_midia) / custo_total
```

- **ROI > 3x:** cliente saudável → upsell-pitch
- **ROI 1-3x:** observa, otimiza margem
- **ROI < 1x:** alerta @ceo (cliente custa mais que gera)

### 4. MRR mensal

Workflow: `gerar-mrr-mensal.md` (task dentro cobranca-mensal):

```
MRR = soma(valores_mensais_ativos)
ARR = MRR × 12
Churn rate = (clientes_perdidos / clientes_inicio_mes) × 100
NRR = ((MRR_inicio - churn + expansion) / MRR_inicio) × 100
```

Saudável: NRR >= 100% (expansão compensa churn).

## Decisões financeiras críticas

| Decisão | Quem | Trigger |
|---------|------|---------|
| Aprovar budget campanha | @fin | Antes publish (ciclo-campanha gate) |
| Decisão pause serviço inadimplência | @ceo | 15d+ sem pagamento |
| Decisão offboarding inadimplência | @ceo | 30d+ sem pagamento |
| Renegociação parcelamento | @ceo + @fin | Pedido cliente OR ROI baixo |
| Disputa chargeback | @ceo + @fin | <7d prazo Asaas |
| Aumento mensalidade | @ceo | Sempre |

@fin **nunca decide pause/churn sozinho** — sempre @ceo.

## Categorização causa inadimplência

| Causa | Resposta padrão |
|-------|-----------------|
| `CARTAO_RECUSADO` | Retry PIX + boleto novo D+3 |
| `SALDO_INSUFICIENTE` | Retry PIX D+3 + comunica cliente |
| `DADOS_DESATUALIZADOS` | @cs solicita atualização |
| `CHARGEBACK` | **ALERTA MAX** — escala @ceo <1h + evidências |
| `VENCIMENTO_PASSOU` | Lembrete suave + retry +3d |

## Anti-padrões

- Publicar campanha sem `verificar-budget` → cliente surpresa = churn
- @fin decidir pause sem @ceo → quebra hierarquia
- Cobrar extra sem aviso → quebra contrato
- Ignorar chargeback → vira processo legal
- ROI sem custo operacional contabilizado → métrica enganosa
- Inadimplência > 15d sem escalation → MRR sangra silenciosamente

## Métricas próprias

- Taxa geração cobrança sucesso: 100% (zero falhas Asaas aceitas)
- Taxa entrega comunicação (WA+email): > 95%
- Inadimplência 15d alvo: < 5% do MRR
- Churn rate mensal: < 3%
- Tempo resposta webhook: <= 2h horário comercial
- Taxa recuperação retry (D+3): >= 60%
- Chargebacks/mês: < 0.5%

## Tools Asaas essenciais

- `CRIAR_COBRANCA` — gera fatura
- `LISTAR_COBRANCAS` — status atual
- `CONSULTAR_COBRANCA` — detalhe individual
- `LISTAR_CLIENTES` — base
- `CRIAR_CLIENTE` — onboarding
- `WEBHOOK_LISTAR_EVENTOS` — config webhooks
- `CONSULTAR_CONTA` — saldo conta agência
