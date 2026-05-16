---
name: registrar-qa
agent: qa
description: Registrar resultado de validacao QA no log operacional para rastreabilidade
inputs:
  - resultado da validacao (veredicto, itens, detalhes)
  - .em5/clientes/{nome}/operacao/log-operacional.md
outputs:
  - entrada registrada no log-operacional.md
elicit: false
---

# Registrar QA

## Objetivo

Documentar toda resultado de validacao QA no log operacional, garantindo rastreabilidade de quem validou o que, quando, e qual foi a decisao.

## Regra

```
Toda validacao QA gera registro no log.
Sem registro = sem historico de qualidade.
```

---

## Passo a passo

### 1. Reunir informacoes da validacao

Coletar:
- **Data:** data da validacao
- **Tipo de validacao:** Copy, Criativo, Campanhao, Landing Page, ou Veredicto Final
- **Item validado:** ID da peca (CR-{id}, CP-{id}, LP)
- **Resultado:** APROVADO, REVISAO ou BLOQUEADO
- **Resumo:** 1-2 linhas sobre o que foi encontrado
- **Proxima acao:** o que deve acontecer apos esta validacao

### 2. Registrar no log operacional

Adicionar linha em `.em5/clientes/{nome}/operacao/log-operacional.md`:

```markdown
| {data} | VALIDACAO | Zara | QA: {tipo} de {item}. Resultado: {APROVADO/REVISAO/BLOQUEADO}. {detalhe 1 linha}. | CONCLUÍDO | {proximo passo} |
```

**Exemplo:**
```markdown
| 2026-04-11 | VALIDACAO | Zara | QA: Copy de CR-003 (Meta Feed — angulo prova social). Resultado: APROVADO. Hook forte, CTA claro. | CONCLUÍDO | Designer produzir criativo visual |
```

### 3. Confirmar registro

```
✅ QA registrado no log: {tipo} — {resultado}.
Proxima acao: {proximo passo}.
```

## Output esperado

- Entrada no log operacional com todas as informacoes da validacao
- Historico de rastreabilidade de qualidade preservado
