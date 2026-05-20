---
nome: reels-ig
skill: /em5-roteiro-reels
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 48-72h
qa_gate: true
versao: 1.0
---

# Receita: Reels Instagram

> Hook 3s + roteiro 60s + edit + CTA específico.

## Steps

### 1. @strategist objetivo + hook
Objetivo (comentários/educar/vender) + hook 3s + CTA.

### 2. @copywriter roteiro
**Usa bloco:** `.em5/blocos/copy-escrever-com-angulo.md`
Pattern instant-value-reels quando objetivo == comentários. Hook 3s + dev + CTA loop.

### 3. @designer edição
**Usa bloco:** `.em5/blocos/designer-gerar-video.md`
1080×1920 60s + captions baked + thumb.

### 4. @copywriter legenda feed
Curta + hashtags + CTA refluxo.

### 5. @qa valida
**Usa bloco:** `.em5/blocos/qa-validar-criativo.md`
Hook 3s prende · audio+visual sync · thumb chamativa · duração 7-90s.

### 6. @cs publica
**Usa bloco:** `.em5/blocos/cs-registrar-log-operacional.md`
Tracking pós D+7.

## Outputs
- `clientes/{nome}/social/reels/{data}/roteiro.md`
- `clientes/{nome}/social/reels/{data}/video.mp4`
- `clientes/{nome}/social/reels/{data}/legenda.md` + `thumb.png`

## Métricas
- Prazo: <= 72h
- Views orgânicos: > 5x seguidores
- Save rate: >= 2%

## Composio MCP
- instagram_business · hyperframes
