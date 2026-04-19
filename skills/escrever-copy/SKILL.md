---
name: escrever-copy
agent: copywriter
description: "Escrever copy completa para o tipo e canal solicitado, com base no \xE2\
  ngulo definido"
inputs:
- .agencyos/clientes/{nome}/copy/angulos.md
- .agencyos/clientes/{nome}/trafego/briefing-criativos.md (se existir)
- .agencyos/clientes/{nome}/estrategia/plano-estrategico.md
outputs:
- .agencyos/clientes/{nome}/copy/CR-{id}.md
- nova linha em .agencyos/clientes/{nome}/operacao/log-performance-criativa.md
elicit: true
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Escrever Copy

## Objetivo

Escrever a copy final para o tipo e canal solicitado — estruturada, com ângulo claro, hook forte, desenvolvimento e CTA.

## Regra

```
Estrutura base de toda copy:
Hook → Desenvolvimento → Prova → CTA

Sem hook forte, o resto não existe.
```

---

## Estrutura por tipo de copy

### Anúncio curto (Meta Feed / Stories / Reels — legenda ou texto)

```
[HOOK — 1 linha que para o scroll]

[DESENVOLVIMENTO — 2-4 linhas que aprofundam a dor ou o desejo]

[PROVA — 1 linha com resultado real, dado ou depoimento]

[CTA — ação clara e específica]
```

### Roteiro de vídeo (15-60 segundos)

```
[0-3s] GANCHO VISUAL + frase de abertura que prende
[3-15s] PROBLEMA ou DESEJO amplificado
[15-35s] SOLUÇÃO + mecanismo que viabiliza a promessa
[35-50s] PROVA + resultado de quem já usou
[50-60s] CTA direto
```

### Copy de landing page

```
[HERO] Headline principal (promessa central) + Subheadline (como)
[DOR] Bloco que espelha o problema do ICP
[SOLUÇÃO] Apresentação do produto/serviço como resposta
[BENEFÍCIOS] Lista de transformações (não de features)
[PROVA] Depoimentos, números, casos reais
[CTA PRINCIPAL] Ação clara
[FAQ] Objeções mais comuns respondidas
[CTA FINAL] Repetição da ação
```

### Mensagem de WhatsApp

```
Olá {nome}! [abertura personalizada]
[1 frase que conecta com o contexto do lead]
[Oferta ou próximo passo direto]
[CTA com instrução clara: "Posso te mandar mais detalhes?"]
```

---

## Passo a passo

### 1. Definir escopo

Perguntar ao usuário:

```
1. Qual o ID desta peça? (CR-{próximo número})
2. Qual o tipo? (anúncio / roteiro / landing page / WhatsApp / e-mail / legenda)
3. Qual o canal? (Meta / Google / WhatsApp / E-mail / Instagram / LinkedIn)
4. Qual o ângulo a usar? (consultar angulos.md)
5. Qual o CTA esperado? (clicar no link / mandar mensagem / ligar / comprar)
```

### 2. Escrever a copy

Produzir a copy completa com base na estrutura do tipo definido.

### 3. Salvar arquivo

Criar `.agencyos/clientes/{nome}/copy/CR-{id}.md`:

```markdown
# CR-{id} — {nome descritivo}

**Data:** {data}
**Autor:** Cal (Copywriter)
**Canal:** {canal}
**Tipo:** {tipo}
**Ângulo:** {ângulo}
**Status:** RASCUNHO / EM QA / APROVADO

---

## Copy

{copy completa aqui}

---

## Brief visual para o Designer

**ID da peça:** CR-{id}
**Ideia visual sugerida:** {o que o visual deve mostrar para amplificar a mensagem}
**Tom visual:** {urgente / aspiracional / humano / técnico / minimalista}
**CTA visual:** {onde e como o CTA deve aparecer}
**Assets disponíveis:** {fotos, vídeos ou ícones que podem ser usados}

---

## Observações

{qualquer contexto relevante para o Designer ou o Gestor de Tráfego}
```

### 4. Registrar no log de performance criativa

Adicionar linha em `.agencyos/clientes/{nome}/operacao/log-performance-criativa.md`:

```markdown
| CR-{id} | {data} | {canal} | {tipo} | {ângulo} | {resumo da copy em 1 linha} | — | — | RASCUNHO | — | — |
```

## Output esperado

- `CR-{id}.md` com copy completa e brief visual
- Linha criada no log de performance criativa
- Pronto para: Lux (`*gerar-imagem` ou `*gerar-video`) + Zara (`*validar-copy`)
