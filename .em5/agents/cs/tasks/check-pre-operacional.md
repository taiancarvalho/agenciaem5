---
name: check-pre-operacional
agent: cs
description: Verificação 35-itens pré-operacional (acessos + tracking + branding + financeiro + estratégia + compliance)
inputs:
  - clientes/{nome}/onboarding/perfil-negocio.md (pra compliance perfil-específico)
  - clientes/{nome}/setup-tecnico/status.md
  - clientes/{nome}/financeiro/
outputs:
  - clientes/{nome}/operacao/check-{YYYY-MM-DD}.md
requires_qa: false
orchestrator: coo
model_tier: balanced
duracao_alvo: "<= 5 min"
---

# Check Pré-Operacional

## Objetivo

Verificar TUDO que cliente precisa ter pronto antes de operar. Reduz interrupção em 90%.

Output: checklist 35 itens com score + lista bloqueantes.

## 6 Dimensões — 35 checks

### 1. Acessos digitais (7 itens)

- [ ] Meta BM — agência Editor/Admin
- [ ] Ad Account ativo + saldo OR cartão
- [ ] Google Ads (se aplicável) — acesso MCC
- [ ] GA4 — propriedade + Edit
- [ ] Search Console — verificado
- [ ] Página FB + IG Business conectadas
- [ ] WhatsApp Business — número + API/WAHA

### 2. Tracking técnico (5 itens)

- [ ] Pixel Meta disparando PageView
- [ ] CAPI deployado + match rate >= 70%
- [ ] Eventos custom GA4 (lead/purchase)
- [ ] UTM padronizado
- [ ] iOS 14+ AEM events (8 priorizados)

### 3. Branding (5 itens)

- [ ] cores.yaml preenchido
- [ ] fontes.yaml preenchido
- [ ] guia-estilo.md mínimo
- [ ] Logo alta-res (PNG + SVG)
- [ ] Exemplos peças anteriores

### 4. Financeiro (5 itens)

- [ ] Asaas cadastrado (asaas-cliente.json)
- [ ] Primeira cobrança paga
- [ ] Contrato assinado arquivado
- [ ] Plano claro (valor + escopo)
- [ ] Status ATIVO (não INADIMPLENTE_15d+)

### 5. Estratégia (5 itens)

- [ ] perfil-negocio.md definido
- [ ] briefing-final.md preenchido
- [ ] plano-estrategico.md (mínimo v0)
- [ ] KPIs alvo definidos
- [ ] ICP documentado

### 6. Compliance (8 itens — varia perfil)

**Sempre:**
- [ ] LGPD: política privacidade linkada
- [ ] LGPD: opt-in formulário
- [ ] LGPD: banner cookies

**Se PN-07 (Saúde):**
- [ ] CFM/CRO/CRN/CRMV checklist ativo
- [ ] Sem antes/depois sem disclaimer
- [ ] Sem promessa resultado

**Se PN-08 (Jurídico):**
- [ ] OAB Provimento 205 checklist ativo
- [ ] Sem "melhor" + comparações

**Se PN-04 (Ecommerce):**
- [ ] CDC compliance (preço claro + 7d devolução)

## Output esperado

`clientes/{nome}/operacao/check-{YYYY-MM-DD}.md`:

```markdown
# Check Pré-Operacional — {Cliente}

**Data:** YYYY-MM-DD
**Perfil:** PN-0X
**Score:** XX/35 ✅
**Status:** {PRONTO | ATENÇÃO | NÃO_OPERA}

## ✅ Prontos (X/35)
- [x] item 1
- [x] item 2
- ...

## ⚠️ Atenção (X/35) — não-bloqueante
- [ ] item — motivo + ação

## 🔴 Bloqueante (X/35) — RESOLVE ANTES OPERAR
- [ ] item — motivo + ação + prazo

## Próximo passo
- {comando recomendado}
```

## Decisão pós-check

| Score | Status | Ação |
|-------|--------|------|
| 35/35 (100%) | PRONTO | Operar normal |
| 28-34 (80-99%) | ATENÇÃO | Operar — bloqueantes zero |
| 18-27 (50-79%) | NÃO_OPERA | Resolver bloqueantes primeiro |
| < 18 (<50%) | RE_ONBOARDING | Onboarding técnico desde zero |

## Quando rodar

- Antes 1ª campanha (`/campanha` falha se score < 80%)
- Antes auditoria contratada (`/auditar`)
- Mensal — manutenção preventiva
- Trigger crisis (sinal check desatualizado)

## Princípio

**Acessos + branding + tracking ANTES de criativo + campanha.** Inverter custa 10x mais tempo depois.

## Anti-padrões

- Pular check porque "sei que tá ok"
- Score 100% sem rodar testes mobile (CAPI/pixel só vê browser)
- Reportar score sem listar bloqueantes específicos
- Operar com score < 80% sem aprovação @ceo

## Composio MCP usados

- `meta_ads` — verifica BM access + pixel events
- `google_ads` — verifica MCC + acesso
- `google_analytics` — verifica propriedade + eventos
- `google_search_console` — verifica verificação domínio
- `asaas` — status financeiro cliente
- `whatsapp_business` — status número
