# Task: gerar-proposta
# Agente: cs (Sol)
# Input: briefing do prospect
# Output: prospects/{nome}/proposta-{data}.md

## Objetivo
Gerar proposta comercial estruturada para prospect, usando template base e adaptando para o contexto do cliente.

## Inputs necessarios
1. Briefing do prospect (coletado em reuniao ou formulario)
2. `.omgsys/core/templates/contratos/proposta-base.md` — template de proposta
3. `omgsys-config.yaml` — servicos e valores da agencia (se configurado)

## Execucao

### 1. Estruturar o contexto do prospect
Antes de escrever, mapear:
- Segmento e produto/servico do prospect
- Principal dor/objetivo declarado
- Canais que ja usa (ou pretende usar)
- Orcamento de midia estimado
- Expectativa de prazo

### 2. Definir escopo proposto
Com base no contexto:
- Quais servicos incluir (trafego pago / copy / design / CS)
- Canais a operar (Meta Ads / Google Ads / outros)
- Entregaveis mensais
- Fee de gestao proposto

### 3. Gerar proposta
Criar arquivo em: `.omgsys/prospects/{nome}/proposta-{YYYY-MM-DD}.md`

```markdown
# Proposta Comercial — {nome-do-prospect}

**Data:** {data}
**Preparada por:** {nome-da-agencia}
**Validade:** 15 dias

---

## Diagnostico Inicial

{2-3 paragrafos sobre o cenario do prospect e oportunidade identificada}

---

## Solucao Proposta

### Servicos inclusos
- {servico 1}
- {servico 2}

### O que vamos fazer no primeiro mes
- {acao 1}
- {acao 2}
- {acao 3}

### Entregaveis mensais
| Entregavel | Frequencia |
|-----------|------------|
| {item} | {frequencia} |

---

## Investimento

| Item | Valor |
|------|-------|
| Fee de gestao | R$ {valor}/mes |
| Verba de midia (estimado) | R$ {valor}/mes |
| **Total estimado** | **R$ {total}/mes** |

---

## Proximos Passos
1. Aprovacao da proposta
2. Assinatura do contrato
3. Pagamento da primeira mensalidade
4. Inicio do onboarding em ate {X} dias uteis

---

*Proposta valida ate {data-validade}*
```

### 4. Registrar no sistema
- Criar pasta `.omgsys/prospects/{nome}/` se nao existir
- Salvar proposta
- Registrar no log: "Proposta gerada para prospect {nome}"

## Handoff
- Proposta entregue ao dono da agencia para revisao antes de enviar
- Apos aprovacao interna: enviar via Gmail (Composio MCP)
