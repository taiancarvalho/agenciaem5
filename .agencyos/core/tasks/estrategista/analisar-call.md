---
name: analisar-call
agent: estrategista
description: Analisar transcrição ou resumo de call de vendas para extrair objeções, padrões e melhorias para o script comercial
inputs:
  - transcrição ou resumo da call (colado pelo usuário)
  - resultado da call (fechou / não fechou / em follow-up)
outputs:
  - .agencyos/clientes/agencia/vendas/analise-call-{id}.md
  - atualização em .agencyos/clientes/agencia/vendas/script-vendas.md (se aplicável)
elicit: true
---

# Analisar Call de Vendas

## Objetivo

Aprender com cada call para melhorar o script, identificar padrões de objeção e aumentar a taxa de fechamento.

## Regra

```
Cada call é um dado.
Dados acumulados viram padrão.
Padrão vira script.
Script vira previsibilidade comercial.
```

---

## Passo a passo

### 1. Coletar dados da call

Perguntar ao usuário:

```
1. Cole aqui a transcrição ou um resumo do que aconteceu na call.
2. Qual foi o resultado? (FECHOU / NÃO FECHOU / EM FOLLOW-UP)
3. Se não fechou — qual foi a objeção final?
4. O que você sentiu que poderia ter feito diferente?
```

### 2. Analisar a call

Gerar análise estruturada no arquivo:

```markdown
# Análise de Call — {ID} — {Data}

**Resultado:** FECHOU / NÃO FECHOU / EM FOLLOW-UP
**Analisado por:** Vera (Estrategista)

---

## Resumo da Call

{resumo em 3-5 linhas do que aconteceu}

---

## Objeções Identificadas

| Objeção | Momento (início/meio/fim) | Como foi tratada | Efetividade |
|---------|--------------------------|-----------------|-------------|
| {objeção 1} | {momento} | {resposta usada} | ✅ Funcionou / ❌ Não funcionou |
| {objeção 2} | | | |

---

## O que funcionou

- {momento ou técnica que gerou avanço na call}
- {palavra ou pergunta que abriu o prospect}

---

## O que não funcionou

- {o que travou a conversa}
- {onde o prospect desengajou}

---

## Padrão identificado (se repetição)

{se essa objeção já apareceu antes, registrar que é padrão}

---

## Sugestão de melhoria para o script

**Onde:** {parte do script — abertura / apresentação / oferta / fechamento}
**Problema atual:** {o que diz hoje que não funciona}
**Sugestão:** {o que poderia dizer no lugar}
```

### 3. Atualizar script de vendas (quando relevante)

Se a análise revelar melhoria clara para o script, sugerir atualização em:
`.agencyos/clientes/agencia/vendas/script-vendas.md`

Apresentar a mudança antes de aplicar:

```
📝 Sugestão de melhoria no script:

TRECHO ATUAL:
"{trecho problemático}"

SUGESTÃO:
"{versão melhorada}"

Deseja aplicar essa mudança?
```

### 4. Atualizar banco de objeções

Registrar em `.agencyos/clientes/agencia/vendas/objecoes.md`:

```markdown
| Objeção | Frequência | Melhor resposta | Fonte |
|---------|-----------|-----------------|-------|
| "Está caro" | 3x | "Entendo. Me conta: qual seria o valor que faria sentido pra você? [pausa]..." | Call 2026-04-11 |
```

## Output esperado

- Análise da call documentada
- Padrões de objeção registrados
- Script atualizado (se aplicável)
- Inteligência comercial acumulando
