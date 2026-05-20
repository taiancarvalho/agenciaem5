---
id: {YYMMDD-clienteslug-tipo}
criado: {YYYY-MM-DD HH:MM}
criado_por: coo
receita: {nome-da-receita}
cliente: {nome-cliente}
status_global: EM_ANDAMENTO  # EM_ANDAMENTO | BLOQUEADO | APROVADO | REPROVADO | CANCELADO
---

# Ticket: {tipo} — {cliente}

## 1. Demanda original

> {texto user OR @ceo descrevendo objetivo da demanda}

## 2. Contexto cliente

- **Nome:** {cliente}
- **Perfil:** PN-0X ({nome-perfil})
- **Ad account:** {act_id se aplicável}
- **Plano contratado:** R$ {valor}/mês — {escopo}
- **Stakeholder:** {decisor + contato}

## 3. Receita base

`.em5/receitas/{nome}.md`

## 4. Steps

### Step 1: @{agente1} — {nome-step}

```yaml
agente: traffic
status: pending  # pending | doing | done | blocked | skipped
veredito: pendente  # pendente | aprovado | reprovado | cancelado
timestamp_inicio: null
timestamp_fim: null
output: null
observacoes: null
```

**Anotações livres:**

_(agente escreve aqui — citações, decisões, justificativas)_

---

### Step 2: @{agente2} — {nome-step}

```yaml
agente: qa
status: pending
veredito: pendente
timestamp_inicio: null
timestamp_fim: null
output: null
observacoes: null
```

**Anotações livres:**

---

### Step 3: @{agente3} — {nome-step}

```yaml
agente: cs
status: pending
veredito: pendente
timestamp_inicio: null
timestamp_fim: null
output: null
observacoes: null
```

**Anotações livres:**

---

## 5. Decisões globais

_(decisões que afetam ticket inteiro — quem decidiu + quando + justificativa)_

- {decisão}

## 6. Aprendizados

_(input pra .em5/system/learnings/ futuro)_

- {aprendizado}

## 7. Artefatos linkados

_(paths arquivos gerados durante execução)_

- {path1}
- {path2}

## 8. Tickets relacionados

_(referência a outros tickets na timeline)_

- **Anterior:** {id ticket parente — ex: onboarding desse cliente}
- **Próximo:** {id ticket filho — ex: iteração baseada nessa auditoria}

## 9. Fechamento

```yaml
fechado_em: null
fechado_por: null
veredito_final: null  # APROVADO | REPROVADO | CANCELADO
resumo_executivo: null  # 1-2 linhas pra reportar @ceo
```
