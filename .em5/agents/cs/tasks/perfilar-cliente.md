---
name: perfilar-cliente
agent: cs
description: Classificar cliente em 1 dos 8 perfis operacionais em5 (PN-01 a PN-08) via entrevista curta
inputs:
  - clientes/{nome}/onboarding/board-cliente.md (se já preenchido)
  - .em5/system/data/perfis-negocio.yaml
outputs:
  - clientes/{nome}/onboarding/perfil-negocio.md
requires_qa: false
orchestrator: coo
model_tier: balanced
---

# Perfilar Cliente — Classificação Operacional

## Objetivo

Classificar cliente em 1 perfil (ou híbrido) dos 8 disponíveis em `perfis-negocio.yaml`. Adapta workflows/KPIs/canais/compliance ao perfil.

## Princípio

**Entrevista curta — não questionário.** Tom consultivo, 6 perguntas (não preencher formulário longo). Max 5min.

Cliente pode responder em texto, áudio OU formulário.

## 6 Perguntas estruturadas

| # | Pergunta | Captura |
|---|----------|---------|
| 1 | "Em uma frase, o que sua empresa faz?" | Tipo de negócio + produto/serviço |
| 2 | "Qual segmento exato você atende?" | Nicho específico |
| 3 | "Quem é seu cliente principal? (pessoa OR empresa)" | B2B vs B2C + ICP |
| 4 | "Onde seu cliente compra hoje? (canal principal)" | Canal primário |
| 5 | "Qual o ticket médio?" | Faixa de complexidade venda |
| 6 | "Onde dói mais agora?" | Gargalo atual (input prioridades) |

Adicional se ambíguo:
- "É serviço presencial OU 100% online?"
- "Tem regulação específica? (ANVISA/CFM/OAB/CVM/etc)"

## Mapeamento → Perfis

Lê `perfis-negocio.yaml` e cruza respostas:

```yaml
# Exemplos de classificação

resposta_combinada: "restaurante" + "delivery + presencial" + "consumidor local" + "WhatsApp + iFood"
→ PN-01 (Estabelecimento Físico Local)

resposta_combinada: "psicóloga" + "particular" + "pessoas físicas" + "indicação + Instagram"
→ PN-02 (Profissional Liberal Solo)

resposta_combinada: "software empresarial" + "empresas mid-market" + "CFOs" + "outbound + LinkedIn"
→ PN-03 (B2B Consultivo)

resposta_combinada: "loja roupas" + "feminino young adult" + "consumidor final" + "Meta Ads + Shopify"
→ PN-04 (Ecommerce Catálogo)

resposta_combinada: "curso online" + "marketing digital" + "infoprodutores" + "Instagram + WhatsApp"
→ PN-05 (Infoprodutor Lançador)

resposta_combinada: "agência marketing" + "tráfego pago" + "PMEs" + "indicação + LinkedIn"
→ PN-06 (Agência de Marketing)

resposta_combinada: "clínica multi-especialidade" + "saúde geral" + "pacientes locais" + "Maps + WhatsApp"
→ PN-07 (Clínica e Saúde)

resposta_combinada: "escritório advocacia" + "trabalhista" + "empresas" + "LinkedIn + indicação"
→ PN-08 (Jurídico e Regulado)
```

## Híbridos

Cliente pode encaixar em 2 perfis (ver `hibridos_comuns` em yaml). Caso comum:
- "Psicóloga com clínica própria" → PN-02 + PN-07
- "Ecommerce com lançamentos sazonais" → PN-04 + PN-05

Quando híbrido, marcar **principal + secundário**, ativar workflows de ambos.

## Output

`clientes/{nome}/onboarding/perfil-negocio.md`:

```markdown
# Perfil Operacional — {Nome Cliente}

**Perfil principal:** PN-0X — {Nome}
**Híbrido:** (se aplicável) PN-0Y — {Nome}
**Data classificação:** {YYYY-MM-DD}
**Classificador:** @cs

## Justificativa
{2-3 frases — por que esse perfil baseado nas 6 respostas}

## Resumo das respostas
1. **O que faz:** {resposta 1}
2. **Segmento:** {resposta 2}
3. **Cliente:** {resposta 3}
4. **Canal principal:** {resposta 4}
5. **Ticket médio:** {resposta 5}
6. **Gargalo atual:** {resposta 6}

## Workflows ativos (do perfil)
- {workflow1.yaml}
- {workflow2.yaml}
- ...

## Workflows descartados (irrelevantes pra perfil)
- {workflowX.yaml} — motivo

## KPIs primários
- {kpi1}
- {kpi2}

## Canais primários
- {canal1}
- {canal2}

## Compliance crítico (se aplicável)
- {LGPD/CFM/OAB/CVM/etc}

## Ticket médio alvo (mensalidade agência)
R$ {min}-{max}/mês
```

## Anti-padrões

- **Perguntar 20 itens** — usar 6 (mais perguntas = cliente desiste)
- **Classificar sem confirmar** — sempre validar com cliente: "encaixei em X — bate com sua visão?"
- **Forçar perfil único** quando híbrido é óbvio
- **Re-classificar toda semana** — perfil muda raramente (só em pivot real)

## Re-classificação

Cliente raramente muda perfil. Mas se:
- Cliente pivotou negócio (B2C → B2B)
- Adicionou novo serviço grande
- Mudou modelo (presencial → online)

→ Rodar `/perfil-cliente` novamente + arquivar perfil antigo em `clientes/{nome}/onboarding/perfis-historico/`.

## Quando rodar

- **Cliente novo:** automatico no fim do `/cliente-novo`
- **Cliente legado sem perfil:** ad-hoc — adapta workflows
- **Pivot cliente:** raro — reclassifica
