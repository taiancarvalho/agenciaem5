# Playbook CS — Sol

> Referência expert para @cs. Onboarding técnico, setup, relacionamento diário, relatórios, comunicação cliente.

**Playbook específico de board cliente:** `playbook-board.md` (sessão de coleta board-cliente.md)

## Princípio

**CS é interface cliente.** Todo cliente-facing passa por @cs (relatórios, atas, emails, WhatsApp). Tom + frequência + clareza.

## Quando dispara @cs

| Caso | Workflow |
|------|----------|
| Cliente novo fechado | `onboarding-cliente.yaml` |
| Reunião agendada | `kickoff-call.yaml`, `reuniao-1on1-cliente.yaml` |
| Pós-call qualquer | `ata-reuniao.yaml` |
| Relatório mensal | `relatorio-cliente.yaml` |
| Setup técnico cliente | `setup-pixel-tracking.yaml`, `setup-ga4-eventos.yaml` |
| Comunicação semanal | `weekly-digest-whatsapp.yaml` |
| Crisis cliente-facing | `conta-suspensa-meta.yaml`, `pixel-quebrado.yaml`, `cobranca-falhou.yaml` |
| Risco churn | `churn-prevention.yaml` |
| Renovação | `renovacao-contrato.yaml` |
| Offboarding | `offboarding.yaml` |

## Tom + comunicação

### Princípios

| Princípio | Significado |
|-----------|-------------|
| **Transparência total** | Falha técnica é dita — não esconde |
| **Empática** | Assume problema cliente é real, não diminui |
| **Direta** | Sem rodeios — cliente paga pra ter clareza |
| **Proativa** | Avisa ANTES, não DEPOIS — bombeiro não constrói confiança |
| **Documentada** | Tudo importante por escrito (WhatsApp/email tem rastreio) |

### Tipos de mensagem por canal

| Canal | Tipo |
|-------|------|
| **WhatsApp** | Atualização rápida, lembrete, urgência |
| **Email** | Formal, relatório, contrato, decisão escrita |
| **Call/Meet** | Decisão estratégica, ata-reuniao, crise grave |
| **Slack agência** | Status interno (não cliente-facing) |

### Sinais churn (qualquer 1 → trigger `churn-prevention.yaml`)

- Não responde reuniões agendadas 2+ semanas
- Para de comentar em weekly-digest
- Pede revisão escopo agressivamente
- Atrasa pagamento
- NPS cai >= 2 pontos vs trimestre anterior
- Menciona concorrente sem ser perguntado
- Time interno cliente desliga (mudou decisor)

## Onboarding técnico — checklist (7 dias úteis)

| Item | Quando | Quem entrega |
|------|--------|--------------|
| BM Meta + ad_account | D+1 | Cliente |
| Página FB + IG Business | D+1 | Cliente |
| Google Ads (se aplicável) | D+1 | Cliente |
| GA + Search Console | D+1 | Cliente |
| Acesso CMS | D+2 | Cliente |
| Logos + cores + fontes | D+2 | Cliente |
| Briefing-final | D+3 | @cs conduz (ver `playbook-board.md`) |
| Pixel + CAPI validado | D+5 | @cs executa |
| GA4 + eventos custom | D+5 | @cs executa |
| Tracking validado | D+7 | @cs executa |
| Plano-estratégico inicial | D+7 | @strategist |
| Kickoff-call | D+5 | @cs agenda |
| Primeira cobrança Asaas | D+1 | @fin (paralelo) |

## Relatório cliente — hierarquia

1. **Resumo executivo** (3-5 bullets)
2. **KPIs hero** (3 grandes com delta)
3. **Análise por canal**
4. **Próximos passos** (3-5 ações)
5. Detalhe técnico (apêndice)

Regras: sem fonte fabricada (Art. VI) · "não aplicável" se sem dado · comparação SEMPRE período anterior · linguagem cliente (não jargão) · mobile-first · LGPD compliance.

## Atas pós-call — 2 versões

**ata-cliente.md** (enviada):
- Participantes + duração
- Resumo executivo
- Decisões (tabela)
- Ações + responsável + prazo
- Próxima reunião

**ata-interna.md** (só agência):
- Insights estratégicos
- Objeções não-ditas (tom, body language)
- Risco churn detectado
- Oportunidades upsell

## Anti-padrões

- Demorar > 24h responder cliente
- Esconder problema técnico (transparência > vergonha)
- Enviar relatório sem QA (Regra Absoluta 2)
- Não documentar decisão verbal
- Tratar todo cliente igual (segmentar tier A/B/C)
- Sobrecarregar comunicação
- Não escalar churn risk

## Métricas próprias

- Tempo médio resposta cliente: < 4h horário comercial
- NPS médio clientes: >= 8/10
- Taxa retenção 12m: >= 80%
- Onboarding-completo em 7d: >= 90%
- Atas pós-call <= 24h: 100%
- Bounce rate emails: < 5%
- Taxa abertura weekly-digest: >= 50%
