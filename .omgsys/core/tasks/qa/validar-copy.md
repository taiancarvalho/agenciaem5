---
name: validar-copy
agent: qa
description: Executar checklist de validacao de copy antes da publicacao
inputs:
  - .omgsys/clientes/{nome}/copy/ (arquivos de copy)
  - .omgsys/clientes/{nome}/estrategia/plano-estrategico.md
  - .omgsys/clientes/{nome}/copy/analise-icp.md
outputs:
  - resultado da validacao de copy
  - itens a corrigir (se houver)
elicit: false
---

# Validar Copy

## Objetivo

Verificar que toda copy antes de publicacao esta coerente com a estrategia, adaptada ao ICP, livre de erros e em conformidade com as politicas de plataforma.

## Regra

```
Copy nao validada = copy nao publicada.
Sem excecao, mesmo em "emergencia".
```

---

## Passo a passo

### 1. Coletar copy a ser validada

Identificar todos os arquivos de copy em `.omgsys/clientes/{nome}/copy/` que estao marcados como pendentes de validacao.

### 2. Executar checklist

#### OBRIGATORIOS

```
[ ] Coerencia com estrategia — angulo e promessa alinhados com plano-estrategico.md
[ ] ICP identificavel — dor ou desejo da persona aparecem claramente
[ ] Hook forte — primeira linha capaz de parar o scroll
[ ] Promessa realista — sem exagero ou promessa de resultado garantido
[ ] CTA presente — call to action claro e especifico
[ ] Sem erros ortograficos ou gramaticais
[ ] Tom adequado ao posicionamento do cliente
[ ] Nao viola politicas de plataforma (Meta/Google)
    — Sem antes/depois, sem afirmacoes de saude nao comprovadas
    — Sem promessas financeiras explicitas ("fique rico")
    — Sem discriminacao na segmentacao ou texto
```

#### DESEJAVEIS

```
[ ] Prova social ou dado concreto incluido
[ ] Urgencia ou escassez quando aplicavel
[ ] Adaptacao correta ao canal (Meta, Google, WhatsApp, e-mail)
[ ] Headline testavel — variante A/B disponivel
[ ] Mecanismo unico da oferta presente
```

### 3. Documentar resultado

Para cada peca de copy validada:

```markdown
## Validacao de Copy — {Nome do Cliente} — {Data}

**Peca:** {CR-{id} — tipo de copy}
**Auditado por:** Zara (QA de Campanha)

### Checklist
- Obrigatorios atendidos: X/Y
- Desejaveis atendidos: X/Y

### Resultado: APROVADO / REVISAO
{Se REVISAO:}
Itens a corrigir:
- [ ] {item 1 — especificar o que esta errado e como corrigir}
- [ ] {item 2}
```

### 4. Registrar no log operacional

```markdown
| {data} | VALIDACAO | Zara | Validacao de copy {CR-{id}}. Resultado: {APROVADO/REVISAO}. | CONCLUÍDO | {proximo passo} |
```

## Output esperado

- Cada peca de copy com resultado claro (APROVADO ou REVISAO)
- Itens de correcao especificados quando aplicavel
- Log operacional atualizado
