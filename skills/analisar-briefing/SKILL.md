---
name: analisar-briefing
agent: estrategista
description: "Ler e analisar o briefing final do cliente para extrair o objetivo real,\
  \ ICP, oferta e contexto estrat\xE9gico"
inputs:
- .agencyos/clientes/{nome}/onboarding/briefing-final.md
outputs:
- "an\xE1lise estruturada em mem\xF3ria (base para as tarefas seguintes)"
- .agencyos/clientes/{nome}/estrategia/analise-briefing.md
elicit: false
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Analisar Briefing

## Objetivo

Ler o briefing final com olhos estratégicos — separar o que o cliente declarou do que ele realmente precisa, e identificar os elementos que vão guiar o plano.

## Regra

```
O que o cliente diz que quer nem sempre é o que ele precisa.
A Estrategista confirma o objetivo real antes de montar qualquer plano.
```

---

## Passo a passo

### 1. Ler o briefing completo

Acessar `.agencyos/clientes/{nome}/onboarding/briefing-final.md` e ler do início ao fim antes de extrair qualquer insight.

### 2. Extrair análise estruturada

Gerar `.agencyos/clientes/{nome}/estrategia/analise-briefing.md` com:

```markdown
# Análise de Briefing — {Nome do Cliente}

**Data:** {data}
**Analisado por:** Vera (Estrategista)

---

## Objetivo Declarado vs Objetivo Real

**O que o cliente disse:** {citar diretamente}
**O que provavelmente é o objetivo real:** {interpretação estratégica}
**Confirmação necessária:** SIM / NÃO

---

## Diagnóstico de Situação Atual

**Nível de maturidade de marketing:** Iniciante / Intermediário / Avançado
**Maior problema detectado:** {problema central}
**Urgência:** Alta / Média / Baixa

**Contexto resumido:**
{2-3 linhas sobre o negócio e seu momento atual}

---

## ICP — Análise

**Clareza do ICP no briefing:** Alta / Média / Baixa
**Dores mais fortes identificadas:**
1. {dor principal — extraída das palavras do cliente}
2. {dor secundária}
3. {dor terciária}

**Nível de consciência estimado:** Inconsciente / Consciente do problema / Consciente da solução / Consciente do produto

**Linguagem do ICP para usar na copy:**
> {citações ou paráfrases do briefing}

---

## Oferta — Análise

**Clareza da oferta:** Alta / Média / Baixa
**Promessa central identificada:** {o que o cliente promete entregar}
**Diferencial real:** {o que genuinamente diferencia — se houver}
**Gaps identificados:** {o que está faltando na oferta para ser mais vendável}

---

## Infraestrutura — Diagnóstico

| Item | Status | Impacto na Estratégia |
|------|--------|----------------------|
| Landing Page | {ok/precisa criar/ruim} | {o que isso muda} |
| Pixel | {ok/não tem/pendente} | {o que isso muda} |
| Criativos | {tem/não tem/parcial} | {o que isso muda} |

---

## Riscos e Alertas

- {risco 1 — ex: cliente sem tracking vai limitar otimização}
- {risco 2 — ex: oferta pouco diferenciada em mercado competitivo}
- {alerta 3}

---

## Perguntas para confirmar com cliente (se necessário)

- {pergunta 1}
- {pergunta 2}
```

### 3. Identificar o que está faltando

Se o briefing tiver lacunas críticas, registrar e solicitar ao CS que colete antes de avançar:

```
⚠️ Lacunas críticas identificadas:
- {item faltando}
- Solicitar ao CS: *coletar-briefing {nome} — perguntas adicionais
```

## Output esperado

- `analise-briefing.md` completo
- Clareza sobre objetivo real, ICP e oferta
- Alertas de risco documentados
- Pronto para: `*criar-plano-estrategico {nome}`
