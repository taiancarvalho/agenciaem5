---
name: auditar-conta
agent: gestor-trafego
description: Auditar a conta de anúncios do cliente para mapear o histórico, campanhas ativas, padrões de performance e oportunidades antes de agir
inputs:
  - .agencyos/clientes/{nome}/onboarding/briefing-final.md
  - .agencyos/clientes/{nome}/estrategia/plano-estrategico.md
  - acesso à conta de anúncios (Meta Ads ou Google Ads)
outputs:
  - .agencyos/clientes/{nome}/trafego/auditoria.md
elicit: false
---

# Auditar Conta de Anúncios

## Objetivo

Entender o histórico da conta antes de agir. Não subir nada, não pausar nada, não mudar nada — apenas mapear e documentar.

## Regra

```
Diagnóstico antes de ação.
Nenhuma mudança na conta sem entender o estado atual.
```

---

## Passo a passo

### 1. Acessar a conta

Se Meta Ads MCP estiver configurado, usar:
- `get_ad_accounts` — listar contas disponíveis
- `get_campaigns` — listar campanhas ativas e pausadas
- `get_campaign_insights` — métricas dos últimos 30/60/90 dias

Se não houver integração, fazer auditoria manual com dados fornecidos pelo cliente ou pelo CS.

### 2. Gerar relatório de auditoria

Criar `.agencyos/clientes/{nome}/trafego/auditoria.md`:

```markdown
# Auditoria de Conta — {Nome do Cliente}

**Data:** {data}
**Auditado por:** Max (Gestor de Tráfego)
**Conta:** {ID da conta} — {plataforma}
**Período analisado:** Últimos {30/60/90} dias

---

## Resumo Executivo

| Item | Status |
|------|--------|
| Conta ativa? | SIM / NÃO |
| Campanhas ativas | {N} |
| Campanhas pausadas | {N} |
| Pixel funcionando? | SIM / NÃO / NÃO TEM |
| Investimento total no período | R$ {valor} |
| Resultado geral | {bom/regular/ruim} |

---

## Campanhas Ativas

| ID | Nome | Objetivo | Status | Budget/dia | CPL/CPA | Volume | Observação |
|----|------|----------|--------|-----------|---------|--------|------------|
| {id} | {nome} | {objetivo} | ATIVO | R$ {x} | R$ {x} | {N} leads | {obs} |

---

## Campanhas Pausadas (com histórico relevante)

| ID | Nome | Objetivo | Por que pausou | Melhor resultado | Vale reativar? |
|----|------|----------|---------------|-----------------|----------------|
| {id} | {nome} | {objetivo} | {motivo} | CPL R$ {x} | SIM / NÃO |

---

## Públicos Utilizados

| Público | Tipo | Tamanho | Performance | Status |
|---------|------|---------|-------------|--------|
| {público 1} | Interesse/Lookalike/Custom | {tamanho} | {bom/regular/ruim} | ATIVO/PAUSADO |

---

## Criativos com Histórico

| ID | Tipo | Ângulo | CTR | CPL/CPA | Volume | Status |
|----|------|--------|-----|---------|--------|--------|
| {id} | Vídeo/Imagem | {ângulo} | {%} | R$ {x} | {N} | ATIVO/PAUSADO |

---

## Diagnóstico

**Principal problema identificado:**
{o que está causando performance ruim ou limitando crescimento}

**Oportunidades identificadas:**
1. {oportunidade 1 — ex: criativo A tinha CPL ótimo e foi pausado sem motivo claro}
2. {oportunidade 2}

**Alertas técnicos:**
- {ex: pixel sem evento de lead configurado}
- {ex: conta com score de qualidade baixo}
- {ex: todos os criativos têm mais de 90 dias}

---

## Ações Recomendadas (prioridade)

1. IMEDIATO: {ação urgente}
2. ESTA SEMANA: {ação prioritária}
3. PRÓXIMAS 2 SEMANAS: {ação planejada}
```

### 3. Identificar campanhas para reativar

Se houver campanhas com bom histórico pausadas sem motivo claro, listar para decisão.

### 4. Atualizar log operacional

```markdown
| {data} | AUDITORIA | Max | Conta auditada. {N} campanhas ativas, {N} pausadas. Principal problema: {diagnóstico}. Auditoria completa em trafego/auditoria.md | CONCLUÍDO | Estruturar campanha inicial |
```

## Output esperado

- `auditoria.md` completo com diagnóstico e ações recomendadas
- Pronto para: `*estruturar-campanha {nome}`
