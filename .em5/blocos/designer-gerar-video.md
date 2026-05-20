---
nome: designer-gerar-video
agente: designer
tempo_medio: 30min-2h
composio_mcp: [wavespeed, veo, hyperframes]
versao: 1.0
usado_em: [ciclo-campanha, iteracao-criativa, reels-ig, lancamento]
---

# Bloco: Gerar Vídeo

## O que faz
Cria vídeo (Reels/Shorts/anúncio).

## Inputs
- roteiro + storyboard
- duração alvo (15s/30s/60s/longer)
- formato (1080×1920 vertical / 16:9 / quadrado)
- captions baked (sim/não)

## Execução
1. Ler branding + roteiro
2. Gerar via WaveSpeed Kling 3.0 / Veo / HyperFrames
3. Edit + captions + thumb
4. Versionar CR-XXX
5. Salvar `clientes/{nome}/design/criativos/`

## Output
- arquivo vídeo .mp4 + thumb.png
- Versionado CR-XXX

## Anti-padrões
- ❌ Sem hook 3s testado
- ❌ Sem legendas baked (70% vê sem som)
- ❌ Vertical em formato horizontal OR vice-versa

## Composio
- `WAVESPEED_KLING_*` · `VEO_*` · HyperFrames CLI
