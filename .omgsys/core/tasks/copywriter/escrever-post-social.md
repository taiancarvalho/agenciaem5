# Task: escrever-post-social
# Agente: copywriter (Cal)
# Input: pauta do post + plano-estrategico.md + branding/tom-de-voz
# Output: clientes/{nome}/copy/social/{data}-{tipo}-post.md

## Objetivo
Escrever copy de post para redes sociais: Instagram, Facebook ou LinkedIn.
Formato adaptado por canal, seguindo o branding e ângulo estratégico.

## Inputs necessários
1. Pauta do post (tema, objetivo, formato: feed/stories/reels)
2. `.omgsys/clientes/{nome}/estrategia/plano-estrategico.md` — ângulo e posicionamento
3. Tom de voz do cliente (branding/guia-estilo.md ou briefing-final.md)

## Execução

### 1. Entender o objetivo do post
- Qual é o papel no funil? (topo: educar/entreter | meio: engajar | fundo: converter)
- Qual é o CTA? (salvar, comentar, clicar no link, DM, comprar)
- Qual é o formato? (carrossel, imagem única, vídeo, stories, reels)

### 2. Estrutura por formato

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

### 3. Regras de copy social

- Primeira linha decide se vão ler o resto — escreva 3 opções de hook, escolha o mais forte
- Parágrafos curtos (2-3 linhas máximo) — mobile first
- Emojis com moderação e coerência com o tom do cliente
- CTA específico, não genérico ("comenta aqui embaixo X" > "curte se você gostou")
- Hashtags relevantes, não spam

### 4. Salvar output
Criar arquivo em: `.omgsys/clientes/{nome}/copy/social/`
Nomear: `{YYYY-MM-DD}-{tipo}-{tema-slug}.md`

## Handoff
- Entregar para @designer com brief visual embutido no arquivo
- Submeter para @qa antes de agendar publicação
