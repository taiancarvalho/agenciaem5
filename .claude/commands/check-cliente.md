# /check-cliente — Verificação pré-operacional de cliente

**Argumento:** `/check-cliente $ARGUMENTS` (ex: `/check-cliente clinica-sao-paulo`)

## O que este comando faz

Verifica TUDO que cliente precisa ter pronto antes de qualquer operação real. Acessos + tracking + branding + financeiro + compliance. Reduz interrupção operacional em 90%.

Roda em <= 5min e devolve checklist: ✅ pronto / ⚠️ atenção / 🔴 bloqueante.

## Roteamento (CLAUDE.md Regra Absoluta 1)

Acione **@coo** com prompt:

```
@coo Nexus — operação: check pré-operacional cliente
Cliente: {nome}
Workflow: leitura sequencial cs/check-pre-operacional.md
Entrega esperada:
  - clientes/{nome}/operacao/check-{YYYY-MM-DD}.md
  - lista bloqueantes pra resolver antes próxima operação
Referência:
  - .em5/agents/cs/tasks/check-pre-operacional.md
```

## Checklist coberto (35 itens — 6 dimensões)

### 1. Acessos digitais (BM + tracking)
- [ ] Meta Business Manager — agência tem acesso Editor/Admin
- [ ] Ad Account ativo + saldo OR cartão configurado
- [ ] Google Ads (se aplicável) — acesso via MCC
- [ ] Google Analytics 4 — propriedade + permissão Edit
- [ ] Google Search Console — verificado
- [ ] Página Facebook + Instagram Business conectados
- [ ] WhatsApp Business — número + acesso API/WAHA

### 2. Tracking técnico
- [ ] Pixel Meta instalado + disparando PageView
- [ ] Conversion API (CAPI) deployado + match rate >= 70%
- [ ] Eventos custom GA4 configurados (lead/purchase/etc)
- [ ] UTM padronizado (per `system/data/`)
- [ ] iOS 14+ AEM events configurados (8 priorizados)

### 3. Branding
- [ ] `clientes/{nome}/branding/cores.yaml` preenchido
- [ ] `clientes/{nome}/branding/fontes.yaml` preenchido
- [ ] `clientes/{nome}/branding/guia-estilo.md` mínimo
- [ ] Logo alta-res disponível (PNG transparente + SVG)
- [ ] Exemplos peças anteriores (referência visual)

### 4. Financeiro
- [ ] Cliente cadastrado Asaas (asaas-cliente.json existe)
- [ ] Primeira cobrança gerada + paga (status atual ok)
- [ ] Contrato assinado + arquivado
- [ ] Plano contratado claro (valor + escopo)
- [ ] Status: ATIVO (não INADIMPLENTE_15d+)

### 5. Estratégia
- [ ] `perfil-negocio.md` definido (rodou `/perfil-cliente`)
- [ ] `briefing-final.md` preenchido
- [ ] `plano-estrategico.md` existe (mínimo plano-inicial v0)
- [ ] KPIs alvo definidos
- [ ] ICP documentado

### 6. Compliance (conforme perfil)
- [ ] LGPD: política privacidade + opt-in + banner cookies (sempre)
- [ ] Saúde (PN-07): checklist CFM/CRO/CRN ativo
- [ ] Jurídico (PN-08): checklist OAB Provimento 205 ativo
- [ ] Financeiro (PN-08): checklist CVM ativo se aplicável

## Output

`clientes/{nome}/operacao/check-{YYYY-MM-DD}.md`:

```markdown
# Check Pré-Operacional — {Cliente}

**Data:** YYYY-MM-DD
**Score:** 32/35 ✅
**Status:** PRONTO PARA OPERAR (com 1 atenção)

## ✅ Prontos (32/35)
- [x] Meta BM acesso Admin
- [x] Pixel disparando
- ... (lista todos OK)

## ⚠️ Atenção (2/35) — não-bloqueante
- [ ] CAPI match rate em 65% (alvo 70%) — agendar otimização
- [ ] Logo só PNG (falta SVG) — pedir cliente

## 🔴 Bloqueante (1/35) — RESOLVE ANTES OPERAR
- [ ] Pixel não testado em mobile — testar D+1 antes 1ª campanha

## Próximo passo
- Resolver bloqueante → /campanha {cliente}
```

## Quando rodar

- **Sempre** antes da primeira campanha real (`/campanha`)
- **Sempre** antes de auditoria contratada (`/auditar`)
- **Mensal** clientes ativos (manutenção preventiva)
- **Trigger** quando algo quebra (sinal de check desatualizado)

## Decisão pós-check

| Score | Ação |
|-------|------|
| 100% (35/35) | OPERAR normal |
| 80-99% (28-34) | OPERAR com atenção — bloqueantes zero |
| 50-79% (18-27) | NÃO opera — resolver bloqueantes primeiro |
| < 50% | NÃO opera — re-onboarding técnico necessário |

## Filosofia em5

> **Acessos + branding + tracking ANTES de criativo + campanha.** Inverter ordem custa 10x mais tempo depois.

## Relação com outros workflows

| Skill | Relação |
|---|---|
| `/onboard` | Inclui check inicial no fim do onboarding |
| `/campanha` | Falha se score < 80% — pede `/check-cliente` antes |
| `/auditar` | Recomenda mas não bloqueia (auditoria é read-only) |
| `/relatorio` | Independente — gera mesmo com check pendente |
