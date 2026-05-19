---
name: monitorar-inadimplencia
agent: fin
description: Lista cobranças vencidas via Asaas + dispara drafts WhatsApp
inputs:
  - dias_atraso_min (default: 3)
outputs:
  - .em5/_fin/{data}/inadimplencia.md
  - drafts WhatsApp pro @whats Onda (severity escalada via dias)
elicit: false
model_tier: balanced
mcp_dependencies:
  - asaas
---

# Task: monitorar-inadimplencia

## Objetivo

Detectar inadimplência via Asaas + escalar severity conforme dias de atraso. Drafts WhatsApp passam por @qa Crivo se severity > medio.

## Severity por dias de atraso

| Dias | Severity | Ação |
|------|----------|------|
| 0-2 | baixo | Log silencioso, sem mensagem |
| 3-7 | medio | Draft amigável → @whats (auto-fix possível) |
| 8-14 | alto | Draft formal → @whats + @qa valida |
| 15-29 | critico | Escala @ceo + @cs Sol pra contato pessoal |
| 30+ | critico + churn-risk | @ceo decide: renegociar OU churn |

## Passo a passo

### 1. Buscar pendências via Asaas

```
@asaas list-payments {
  status: "OVERDUE",
  limit: 100
}
```

### 2. Cruzar com clientes locais

Pra cada `payment_id` retornado:
- Achar cliente em `clientes/*/financeiro/cobrancas.yaml`
- Calcular `dias_atraso = today - dueDate`
- Determinar severity (tabela acima)

### 3. Atualizar status local

`clientes/{slug}/financeiro/mensalidade.yaml`:
```yaml
inadimplencia_dias: {N}
ultima_cobranca_status: OVERDUE
ultimo_check: {data}
```

### 4. Gerar drafts (por severity)

**Medio (3-7d)** — draft auto pro @whats:
```yaml
template: cobrança_amigavel
severity: medio
auto_fix: true
```

**Alto (8-14d)** — draft + @qa valida:
```yaml
template: cobrança_amigavel
severity: alto
qa_required: true
```

**Crítico (15+d)** — escalada:
```yaml
notificar: ['@ceo Atlas', '@cs Sol']
acao_sugerida: contato_pessoal_ou_renegociacao
severity: critico
```

### 5. Output consolidado

`.em5/_fin/{YYYY-MM-DD}/inadimplencia.md`:
```markdown
# Inadimplência — {data}

## Total: {N} clientes em atraso

| Cliente | Valor | Dias | Severity | Ação |
|---------|-------|------|----------|------|
| {...} | R$ {...} | {N} | {sev} | {acao} |
```

### 6. Auditoria MCP

Append em `.em5/learnings/{mes}/mcp-excecoes.md`:
```markdown
## {data} — monitorar-inadimplencia
- Total checado: {N}
- Em atraso: {M}
- Severity distribuição: {baixo: X, medio: Y, alto: Z, critico: W}
```

## Critério de saída

- Estado local sincronizado com Asaas
- Drafts gerados por severity
- Críticos escalados pro @ceo
- Audit log atualizado

## Frequência

Recomendado: `/dia` chama isso automaticamente. Solo gestor olha resumo em < 1 min.
