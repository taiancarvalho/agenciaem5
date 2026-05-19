---
name: escrever-post-social
agent: copywriter
model_tier: balanced  # auto-set Fase 12.AAA — pre-v1.1 legacy migration
description: "Ver corpo do arquivo (formato legacy pre-v1.1, mantido por compatibilidade)"
elicit: false
---

# Task: escrever-post-social
# Agente: copywriter (Eco)
# Input: pauta do post + plano-estrategico.md + branding/tom-de-voz
# Output: clientes/{nome}/copy/social/{data}-{tipo}-post.md

## Playbook de Referência
- Ler `.em5/playbooks/copywriter-frameworks.md` (seção INSTAGRAM ORGÂNICO + canal relevante + Seções 5-6 para regras de escrita e vídeo) antes de executar
- Ler `clientes/{nome}/memoria/notas-sessao.md` — últimas 3 entradas

## Objetivo
Escrever copy de post para redes sociais: Instagram, Facebook ou LinkedIn.
Formato adaptado por canal, seguindo o branding e ângulo estratégico.

## Inputs necessários
1. Pauta do post (tema, objetivo, formato: feed/stories/reels)
2. `clientes/{nome}/estrategia/plano-estrategico.md` — ângulo e posicionamento
3. Tom de voz do cliente (branding/guia-estilo.md ou board-cliente.md seção Brand)

## Execução

### 1. Escolher o ângulo antes de escrever

Consultar `playbooks/copywriter-frameworks.md` — tabela de 5 ângulos:

| Ângulo | Quando usar |
|--------|-------------|
| DOR | Produto resolutivo, problema claro |
| PROVA SOCIAL | Histórico de resultados, depoimentos disponíveis |
| URGÊNCIA | Promoção, lançamento, vagas limitadas |
| ASPIRAÇÃO | Transformação, lifestyle, resultado financeiro |
| CONVENIÊNCIA | Produto complexo simplificado, objeção de esforço |

Nunca usar hook genérico — reler ICP do plano-estrategico.md antes de escolher.

### 2. Entender o objetivo do post
- Qual é o papel no funil? (topo: educar/entreter | meio: engajar | fundo: converter)
- Qual é o CTA? (salvar, comentar, clicar no link, DM, comprar)
- Qual é o formato? (carrossel, imagem única, vídeo, stories, reels)

### 3. Estrutura por formato

**Post de feed (imagem/carrossel):**
```
Hook (primeira linha — para no scroll)
Desenvolvimento (2-4 parágrafos curtos)
Prova ou exemplo
CTA claro
. . .
Hashtags (5-10, mistura nicho + amplo)
```

**Legenda de Reels/Vídeo:**
```
Hook (espelha o hook visual do vídeo)
1-2 linhas de contexto
CTA direto
Hashtags (5-8)
```

**Stories (texto sobre imagem):**
```
Máximo 5-7 palavras por slide
CTA via sticker (enquete, pergunta, link, DM)
```

### 4. Regras de copy social

- Primeira linha decide se vão ler o resto — escrever 3 opções de hook, escolher o mais forte
- Parágrafos curtos (2-3 linhas máximo) — mobile first
- Emojis com moderação e coerência com o tom do cliente
- CTA específico, não genérico ("comenta aqui embaixo X" > "curte se você gostou")
- Hashtags relevantes, não spam

### 4b. Reels e Vídeo Curto — Regras Específicas

**Regra dos 3 Segundos:** os primeiros 3 segundos precisam ter simultaneamente:
- **Hook visual** (o que aparece na tela)
- **Hook verbal** (o que é dito)
- **Hook de texto** (overlay/legenda na tela)

Os três precisam trabalhar juntos — nunca depender só de um.

**Estruturas recomendadas:**

| Estrutura | Duração | Quando usar |
|-----------|---------|-------------|
| Problema-Solução | 15-30s | Produto resolutivo, ângulo DOR |
| Lista | 30-60s | Educação, top tips, ângulo autoridade |
| Tutorial | 30-90s | Mostrar produto em uso, ângulo conveniência |

**Hook formulas para Reels:**
- "Pare tudo — você está fazendo [X] errado"
- "Me disseram que não deveria mostrar isso, mas..."
- "[Número] motivos pelos quais você não está [resultado]"
- "A verdade sobre [tópico] que ninguém fala"
- "[Situação familiar do ICP] + 'e então aconteceu isso'"

**Sempre escrever 3 opções de hook antes de escolher.** O hook do vídeo é o ponto de maior alavancagem — 1 hora escolhendo o hook certo vale mais que 3 horas escrevendo o corpo.

### 5. Salvar output
Criar arquivo em: `clientes/{nome}/copy/social/`
Nomear: `{YYYY-MM-DD}-{tipo}-{tema-slug}.md`

Incluir no arquivo:
- Ângulo escolhido e justificativa
- 3 opções de hook (indicar qual foi escolhido)
- Copy final
- Brief visual para @designer (formato, conceito sugerido, referência de UGC se aplicável)

## Em caso de falha

Se o ângulo não parecer adequado ao nicho ou tom do cliente:

```
Problema identificado: {ex: hook genérico / ângulo não condiz com tom do cliente}
Causa-raiz provável: pauta vaga / briefing de branding incompleto
Agente responsável: @copywriter
Ação corretiva: revisar board-cliente.md seção Brand | pedir pauta mais detalhada ao CS
Prioridade: NORMAL
Retestar após: pauta revisada disponível
```

## Handoff para @designer

**Arquivos que ele DEVE ler:**
- `board-cliente.md` (sempre)
- `copy/social/{data}-{tipo}-{tema}.md`

**Resumo do que foi feito:** copy de post {tipo} escrita com ângulo {X} — hook, desenvolvimento e CTA definidos

**O que precisa de atenção:** {formato visual sugerido no arquivo | tom específico para este post}

**Próxima task:** definir-conceito-visual → produzir-criativos
