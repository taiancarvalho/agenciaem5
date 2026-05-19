---
name: status-cliente
agent: ceo
description: Exibir resumo detalhado do estado atual de um cliente especifico
inputs:
  - nome do cliente (slug)
outputs:
  - resumo completo do status do cliente
model_tier: frontier  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Status Cliente

## Objetivo

Fornecer uma visao 360 do estado de um cliente — o que existe, o que falta, qual o estagio atual, e quais sao os proximos passos.

---

## Passo a passo

### 1. Coletar nome do cliente

Perguntar ao usuario:

```
Qual cliente quer verificar?
```

Validar que o cliente existe em `clientes/`.

### 2. Verificar artefatos existentes

Verificar existencia de cada arquivo e diretorio:

```
onboarding/briefing-final.md — ✅ ou ❌
onboarding/contrato.md — ✅ ou ❌
estrategia/plano-estrategico.md — ✅ ou ❌
estrategia/analise-briefing.md — ✅ ou ❌
setup-tecnico/status.md — ✅ ou ❌
setup-tecnico/checklist-tracking.md — ✅ ou ❌
operacao/log-operacional.md — ✅ ou ❌
operacao/log-performance-criativa.md — ✅ ou ❌ (se tiver entradas)
operacao/log-growth.md — ✅ ou ❌ (se tiver entradas)
copy/ — {N} arquivos
design/criativos/ — {N} arquivos
trafego/ — {N} arquivos
relatorios/ — {N} arquivos
```

### 3. Determinar estagio atual

| Ultima entrega feita | Estagio |
|---------------------|---------|
| Nenhuma | ONBOARDING PENDENTE |
| Briefing | ESTRATEGIA |
| Plano estrategico | SETUP TECNICO |
| Setup completo | PRONTO PARA EXECUCAO |
| Campania ativa | OPERACAO ATIVA |
| Sem atividade recente | INATIVO |

### 4. Analisar log operacional

Ler `clientes/{nome}/operacao/log-operacional.md` e extrair:
- Ultima entrada (data, tipo, responsavel)
- Pendencias em aberto (status != CONCLUÍDO)
- Total de entradas por tipo

### 5. Exibir resumo

```markdown
# Status — {Nome do Cliente}

**Estagio atual:** {estagio}
**Ultima atividade:** {data}

## Artefatos

| Area | Status | Arquivos |
|------|--------|----------|
| Onboarding | ✅ ou ❌ | {N} arquivos |
| Estrategia | ✅ ou ❌ | {N} arquivos |
| Setup Tecnico | ✅ ou ❌ | {N} arquivos |
| Copy | ✅ ou ❌ | {N} arquivos |
| Design | ✅ ou ❌ | {N} arquivos |
| Trafego | ✅ ou ❌ | {N} arquivos |
| Relatorios | ✅ ou ❌ | {N} arquivos |
| Logs | {N} entradas | |

## Pendencias em Aberto

| Item | Tipo | Responsavel | Desde |
|------|------|-------------|-------|
| {pendencia 1} | {tipo} | {agente} | {data} |

## Proximos Passos Recomendados

1. {acao 1 — ex: @strategist criar-plano-estrategico}
2. {acao 2}
3. {acao 3}

## Liberacao

**Liberado para execucao:** {SIM / NAO — motivo}
```

## Output esperado

- Visao completa do estado do cliente
- Pendencias identificadas
- Proximos passos recomendados
