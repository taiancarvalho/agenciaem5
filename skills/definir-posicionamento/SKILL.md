---
name: definir-posicionamento
agent: estrategista
description: Definir posicionamento, narrativa e diferencial da oferta do cliente
  no mercado
inputs:
- .agencyos/clientes/{nome}/onboarding/briefing-final.md
- .agencyos/clientes/{nome}/estrategia/analise-briefing.md
- objetivo real (confirmado via validar-objetivo-real)
outputs:
- .agencyos/clientes/{nome}/estrategia/posicionamento.md
elicit: true
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Definir Posicionamento

## Objetivo

Definir como o cliente se posiciona no mercado, qual narrativa sustenta sua oferta e qual seu diferencial percebido pelo publico-alvo. Posicionamento é a base que conecta oferta ao mercado.

## Regra

```
Oferta vem antes do canal. Posicionamento vem antes da oferta.
Se o mercado não entende por que você é diferente, você não é diferente.
```

---

## Passo a passo

### 1. Ler contexto estratégico

Ler briefing-final, analise-briefing e objetivo real confirmado.

### 2. Análise de posicionamento competitivo

Identificar:
- **Estado atual do mercado:** Como o segmento se comunica? Qual o padrao?
- **Onde o cliente se encaixa:** Mais um ou diferente? Se diferente, em que dimensao?
- **Concorrentes diretos:** O que oferecem? Como se comunicam?
- **Gap de posicionamento:** Existe um espaco vazio que o cliente pode ocupar?

### 3. Definir elementos de posicionamento

Criar `.agencyos/clientes/{nome}/estrategia/posicionamento.md` com:

```markdown
# Posicionamento — {Nome do Cliente}

**Data:** {data}
**Definido por:** Vera (Estrategista)

---

## Declaração de Posicionamento

**Para:** {ICP definido}
**Que precisa:** {dor ou necessidade central}
**{Nome do Cliente} é:** {categoria + diferencial em 1 linha}
**Que entrega:** {transformação principal}
**Diferente de:** {alternativa atual do ICP ou concorrente}
**Porque:** {razão fundamental da diferenca}

---

## Narrativa Central

{Como o cliente conta sua historia. A narrativa que conecta ICP → problema → solucao → transformacao. 2-3 paragrafos.}

---

## Diferencial Percebido

**O que o mercado faz:** {padrao do segmento}
**O que o cliente faz diferente:** {ponto real de diferenca}
**Como traduzir isso em beneficio:** {nao feature, beneficio}

---

## Tom e Personalidade da Marca

**Tom principal:** {ex: autoridade acessivel, challenger, mentor}
**Nivel de formalidade:** {formal / informal / provocativo}
**Nivel de sofisticacao:** {premium / acessivel / popular}
**Personalidade em 3 adjetivos:** {ex: direto, humano, competente}

---

## O que NAO somos

{Lista do que a marca rejeita — ex: "nao somos agencia de volume", "nao prometemos milagre"}
---

## Provas Disponiveis

{O que sustenta o posicionamento: numeros, casos, certificacoes, depoimentos, experiencia}

---

## Riscos de Posicionamento

{Onde o posicionamento pode falhar: promessas que nao consegue entregar, posicoes dificeis de sustentar}
```

### 4. Validar coerencia

Checar se o posicionamento:
- É sustentavel com o que o cliente realmente entrega
- É diferente o suficiente no mercado dele
- É claro para o ICP (nao para o dono do negocio)
- Nao depende de inventar capacidades inexistentes

### 5. Atualizar log operacional

```markdown
| {data} | ESTRATÉGIA | Estrategista | Posicionamento definido para {cliente} | CONCLUÍDO | Criar plano estratégico completo |
```

---

## Output esperado

- Arquivo `posicionamento.md` criado e validado
- Log operacional atualizado
- Pronto para `*definir-funil-macro {nome}` e `*criar-plano-estrategico {nome}`
