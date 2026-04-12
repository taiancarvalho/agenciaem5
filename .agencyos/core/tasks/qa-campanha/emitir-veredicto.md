---
name: emitir-veredicto
agent: qa-campanha
description: Formalizar veredicto final de QA com decisao APROVADO / REVISAO / BLOQUEADO
inputs:
  - resultados de todas as validacoes previas (copy, criativo, campanha, LP)
outputs:
  - documento de veredicto formal
  - registro no log-operacional.md
elicit: false
---

# Emitir Veredicto

## Objetivo

Consolidar todas as validacoes individuais em um veredicto final unico e formal — a decisao definitiva sobre se uma campanhao/pacote pode ou nao ir ao ar.

## Regra Critica

```
BLOQUEADO significa bloqueado.
Nao existe "publicar assim mesmo".
So o QA pode reverter seu proprio veredicto.
```

---

## Passo a passo

### 1. Coletar resultados das validacoes previas

Reunir todas as validacoes realizadas:
- Validacao de copy (se realizada)
- Validacao de criativo (se realizada)
- Validacao de campanhao (se realizada)
- Validação de landing page (se realizada)

### 2. Determinar veredicto aplicando a regra de severidade

```
Se qualquer item obrigatorio = BLOQUEADO → Veredicto = BLOQUEADO
Se qualquer item obrigatorio = pendente/corrigir → Veredicto = REVISAO
Se todos itens obrigatorios = atendidos → Veredicto = APROVADO
```

**Regra de escalacao de criticidade:**
- 1 BLOQUEADO em qualquer checklist → veredicto final = BLOQUEADO
- Sem BLOQUEADO, mas com REVISAO em algum item → veredicto final = REVISAO
- Tudo APROVADO → veredicto final = APROVADO

### 3. Emitir veredicto formal

```markdown
# Veredicto QA Final — {Nome do Cliente} — {Data}

**Auditado por:** Zara (QA de Campanha)
**Referencia:** Validacoes de copy, criativo, campanhao, LP

---

## Itens Validados

| Item | Resultado | Observacao |
|------|-----------|------------|
| Copy CR-{ids} | {APROVADO/REVISAO/BLOQUEADO} | {resumo} |
| Criativo CR-{ids} | {APROVADO/REVISAO/BLOQUEADO} | {resumo} |
| Estrutura de Campanhao | {APROVADO/REVISAO/BLOQUEADO} | {resumo} |
| Landing Page | {APROVADO/REVISAO/BLOQUEADO/N/A} | {resumo} |

---

## VEREDICTO FINAL: APROVADO / REVISAO / BLOQUEADO

{Se APROVADO:}
✅ Todos os criterios obrigatorios foram atendidos.
Liberado para publicacao. Boa campanha.

{Se REVISAO:}
⚠️ Ajustes necessarios antes de publicar:

**Itens obrigatorios a corrigir:**
1. {item especifico — o que, onde, como corrigir}
2. {item especifico}

**Itens nao-críticos (opcionais, podem ficar para depois):**
- {item}

Revalidar apos correcao: *validar-campanha {nome}

{Se BLOQUEADO:}
🚫 PUBLICACAO PROIBIDA.

**Problema(s) critico(s):**
1. {descrever problema e impacto}
2. {descrever problema e impacto}

**Escalacao necessaria para:** {agente responsavel}
**O que precisa acontecer antes de reavaliar:** {condicoes}
```

### 4. Registrar no log operacional

```markdown
| {data} | VALIDACAO | Zara | Veredicto QA final: {APROVADO/REVISAO/BLOQUEADO}. {resumo 1 linha}. | CONCLUÍDO | {proximo passo} |
```

### 5. Notificar agente responsavel

- **APROVADO:** Notificar Gestor de Tráfego para subir
- **REVISAO:** Notificar quem precisa corrigir (Copywriter, Designer, ou Gestor de Tráfego)
- **BLOQUEADO:** Notificar Estrategista + Gestor de Tráfego + CS sobre o bloqueio

## Output esperado

- Veredicto formal emitido com justificativa clara
- Agente responsavel notificado
- Log operacional registrado
