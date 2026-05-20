---
name: monitorar-ads-concorrente
agent: scout
description: Checa Meta Ads Library + Google Ads Transparency Center pra ads ativos
inputs:
  - concorrente_url ou page_id_meta
  - cliente_slug
outputs:
  - clientes/{slug}/inteligencia/ads-{concorrente}-{data}.md
elicit: false
model_tier: balanced
---

# Task: monitorar-ads-concorrente

## Objetivo

Saber quais ads concorrentes estão rodando. Inspira ângulos sem copiar (Art. VI).

## Fontes

- **Meta Ads Library:** https://www.facebook.com/ads/library/ (público, sem login)
- **Google Ads Transparency Center:** https://adstransparency.google.com/

## Passo a passo

1. Identifica `page_id` Meta do concorrente (parsing do site ou manual)
2. **Composio firecrawl:** scrape Meta Ads Library URL → captura ads ativos
3. Pra cada ad ativo:
   - Headline + body
   - CTA
   - Formato (imagem, vídeo, carousel)
   - Plataformas (Facebook, Instagram, Reels)
   - Data de início (quanto tempo rodando = sinal de performance)
4. Salva `ads-{concorrente}-{data}.md` com snapshot
5. Compara com snapshot anterior:
   - Ads novos = teste novo
   - Ads sumiram = matou (não performou OU substituiu)
   - Ads há > 30 dias = winner provável

## Critério de saída

- Snapshot salvo
- Winners (ads > 30d) sinalizados
- Insights → `learnings/{mes}/scout-ads-padroes.md`

## Anti-padrão

- NÃO copia ad (rip-off)
- NÃO assume que ad > 30d = bom (pode ser inércia)
- Inspiração ≠ cópia. Pega o ângulo, não a frase.
