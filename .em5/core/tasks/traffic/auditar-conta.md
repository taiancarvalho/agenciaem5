---
name: auditar-conta
agent: traffic
description: Auditar a conta de anuncios do cliente para mapear historico, campanhas ativas, padroes de performance e oportunidades antes de agir
inputs:
  - .em5/clientes/{nome}/onboarding/board-cliente.md
  - .em5/clientes/{nome}/estrategia/plano-estrategico.md
  - acesso a conta de anuncios (Meta Ads ou Google Ads)
outputs:
  - .em5/clientes/{nome}/trafego/auditoria.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: false
---

# Auditar Conta de Anúncios

## Playbook de Referência

**Ler antes de executar:** `.em5/playbooks/traffic-meta.md` (seção 3: Auditoria)
**Memória:** ler últimas 3 entradas de `.em5/clientes/{nome}/memoria/notas-sessao.md`

---

## Objetivo

Entender o histórico da conta antes de agir. Não subir nada, não pausar nada, não mudar nada — apenas mapear e documentar.

## Regra

```
Diagnóstico antes de ação.
Nenhuma mudança na conta sem entender o estado atual.
```

---

## Passo a passo

### 1. Acessar a conta via Composio

```
# Listar contas disponíveis
composio.meta_ads.get_ad_accounts()

# Listar campanhas (ativas + pausadas)
composio.meta_ads.get_campaigns(
  account_id: "{id do board-cliente}",
  date_preset: "last_90d"
)

# Puxar métricas por campanha
composio.meta_ads.get_campaign_insights(
  campaign_ids: [...],
  date_preset: "last_90d",
  fields: ["spend", "leads", "cost_per_lead", "ctr", "frequency", "impressions", "cpm"]
)

# Verificar pixel
composio.meta_ads.get_pixels(account_id: "{id}")
```

Se não houver integração Composio: solicitar dados ao @cs ou ao cliente.

### 2. Diagnóstico rápido por tipo de problema

```
Pixel ausente/com defeito:  → escalar para @cs → validar-tracking.md (bloqueador)
Todas campanhas pausadas:  → investigar motivo antes de reativar
CPL consistente > 3x meta: → conta queimada? testar campanha fresh
Frequência > 4.0:          → público saturado, renovar criativos
Criativos > 90 dias ativos:→ marcar para renovação urgente
Sem conversas salvas:      → cliente não tem histórico = começar do zero
```

### 3. Gerar relatório de auditoria

Criar `.em5/clientes/{nome}/trafego/auditoria.md`:

```markdown
# Auditoria de Conta — {Nome do Cliente}

**Data:** {data}
**Conta:** {ID} — Meta Ads
**Período analisado:** Últimos 90 dias

## Resumo Executivo

| Item | Status |
|------|--------|
| Conta ativa? | SIM / NÃO |
| Pixel funcionando? | SIM / NÃO / NÃO TEM |
| Investimento total 90d | R$ {valor} |
| Campanhas ativas | {N} |
| Melhor CPL histórico | R$ {valor} (CR-XXX) |
| Resultado geral | bom / regular / ruim |

## Campanhas Ativas

| Nome | Objetivo | Budget/dia | CPL/CPA | Volume | Observação |
|------|----------|-----------|---------|--------|------------|

## Campanhas Pausadas (com histórico relevante)

| Nome | Objetivo | Por que pausou | Melhor CPL | Vale reativar? |
|------|----------|---------------|------------|---------------|

## Públicos Utilizados

| Público | Tipo | Tamanho | Performance |
|---------|------|---------|-------------|

## Criativos com Histórico

| ID | Tipo | CTR | CPL | Volume | Status |
|----|------|-----|-----|--------|--------|

## Diagnóstico

**Principal problema identificado:** {causa raiz}
**Oportunidades:** {campanhas/criativos que podem ser reaproveitados}
**Alertas técnicos:** {pixel, tracking, problemas de conta}

## Ações Recomendadas

1. IMEDIATO: {ação urgente}
2. ESTA SEMANA: {ação prioritária}
3. PRÓXIMAS 2 SEMANAS: {ação planejada}
```

### 4. Atualizar log e memória

Atualizar `log-operacional.md` e adicionar entrada em `memoria/notas-sessao.md`.

---

## Em caso de falha

Se não for possível acessar a conta, gerar `trafego/diagnosis.md`:

```markdown
**Problema:** {sem acesso / pixel ausente / conta bloqueada}
**Agente responsável:** @cs
**Ação corretiva:** {listar-acessos.md ou setup-tecnico.md}
**Retestar após:** acesso configurado via Composio
```

---

## Handoff

```markdown
## Handoff para @traffic (estruturar)
**Arquivos que ele DEVE ler:**
- trafego/auditoria.md (este arquivo)
- board-cliente.md (seções 2 e 5: objetivo e público)

**O que foi feito:** {auditoria completa, N campanhas analisadas}
**Atenção:** {principais problemas ou oportunidades do diagnóstico}

**Próxima task:** estruturar-campanha
```

## Output esperado

- `auditoria.md` com diagnóstico e ações recomendadas
- Pronto para: `*estruturar-campanha {nome}`
