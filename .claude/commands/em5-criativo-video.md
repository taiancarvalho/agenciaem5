# /em5-criativo-video — Gera criativo em vídeo HTML standalone

**Argumento:** `/em5-criativo-video $ARGUMENTS` (ex: `/em5-criativo-video cna-vila-mariana CR-001`)

## Por que existe

Auditoria interna mostrou drift estrutural na geração de imagens: fal.ai instável,
WaveSpeed sumiu, content policy quebra criatividade ("criança + Disney" bloqueado),
nomes de arquivo se trocam, créditos desperdiçados.

**HyperFrames** resolve: vídeo HTML standalone, roda local, **custo zero** (sem
endpoint queue, sem API quota), TTS + captions sync + transições.

Esta skill é **adapter** das skills upstream:
- `hyperframes` — composição
- `hyperframes-cli` — CLI dev loop (init, lint, preview, render)
- `hyperframes-media` — TTS, transcribe, remove-background

Pra @designer Lux substituir/complementar fal.ai em **vídeos** (imagens estáticas
continuam via fal.ai por enquanto).

## Quando usar

- **Reels orgânico IG** — roteiro do `/em5-roteiro-reels` vira vídeo
- **Criativo Meta Ads de vídeo** — anúncio com texto animado + voz off
- **UGC sem precisar de modelo** — TTS + captions + B-roll local
- **Post de carrossel animado** — sequência de cenas com transição
- **Reels educacional** — "3 dicas em 30s" com texto pulando + ritmo

## Quando NÃO usar (use outra ferramenta)

- Imagem estática única → fal.ai ou Adobe Firefly
- UGC com pessoa falando → HeyGen (avatar) ou gravação real
- Vídeo > 60s com narrativa complexa → editor humano

## Argumentos

```
/em5-criativo-video {cliente} {cr_id_ou_roteiro}
```

- `cliente` — slug do cliente
- `cr_id_ou_roteiro` — ID do criativo (`CR-XXX`) com roteiro/copy já aprovada, OU caminho direto para um `.md` de roteiro

## Pré-requisitos

```bash
# Verificar HyperFrames CLI instalado
npx hyperframes --version

# Se não instalado, a skill instala on-demand via npx (cache local)
```

## Instrução

Se `$ARGUMENTS` incompleto, pergunte cliente + CR/roteiro.

### Passo 1 — Carregar contexto mínimo (Art. IV)

Leia:
- `clientes/{cliente}/copy/{CR-XXX}.md` — roteiro, copy, CTA
- `clientes/{cliente}/branding/cores.yaml` — paleta
- `clientes/{cliente}/branding/fontes.yaml` — tipografia
- `clientes/{cliente}/design/conceito-visual.md` (se existir) — conceito macro

### Passo 2 — Pré-processamento de mídia (se necessário)

Invoque `hyperframes-media` para:
- **TTS** — gerar áudio narração a partir do roteiro (vozes ElevenLabs ou local)
- **Transcribe** — se cliente forneceu áudio de referência, transcrever pra captions
- **Remove-background** — se há B-roll do cliente pra usar em composição

Output salvo em `clientes/{cliente}/design/assets/{CR-XXX}/`.

### Passo 3 — Invocar skill upstream `hyperframes`

Invoque `hyperframes` passando:
- Roteiro/copy do `CR-XXX.md`
- Branding (cores, fontes)
- Aspect ratio do canal alvo (1:1 feed, 9:16 reels/stories, 4:5 feed alto)
- Duração alvo (15s, 30s, 60s)
- TTS de voz (se gerado no passo 2) ou texto-pra-falar inline
- Captions sync (gerado automaticamente do roteiro)
- Beat sync (se há música de fundo)
- Transições entre cenas

A skill produz **HTML standalone** com toda animação inline.

### Passo 4 — Lint + preview via `hyperframes-cli`

```bash
npx hyperframes lint clientes/{cliente}/design/{CR-XXX}-v1.html
npx hyperframes preview clientes/{cliente}/design/{CR-XXX}-v1.html
```

Lint pega: timing inválido, asset faltando, sync de caption fora de range.

Preview abre browser local — agente confirma visual antes de render final.

### Passo 5 — Render final

```bash
npx hyperframes render clientes/{cliente}/design/{CR-XXX}-v1.html \
  --output clientes/{cliente}/design/{CR-XXX}-v1.mp4 \
  --resolution 1080x1920  # ajustar conforme aspect
```

Output: `.mp4` ou `.webm` pronto pra upload.

### Passo 6 — Salvar metadados

Em `clientes/{cliente}/design/{CR-XXX}-v1-meta.json`:
```json
{
  "cr_id": "CR-XXX",
  "version": "v1",
  "fonte_html": "{CR-XXX}-v1.html",
  "output_video": "{CR-XXX}-v1.mp4",
  "aspect_ratio": "9:16",
  "duration_sec": 18,
  "canal_alvo": "instagram_reels",
  "tts_voice": "elevenlabs_rachel_pt-br",
  "branding_aplicado": ["cores.yaml", "fontes.yaml"],
  "created_at": "2026-05-19T10:30:00Z",
  "tool_chain": ["hyperframes", "hyperframes-media", "hyperframes-cli"]
}
```

### Passo 7 — Verify + log + QA

- Rodar `/em5-verify {cliente} design/{CR-XXX}-v1.mp4`
- Registrar em `clientes/{cliente}/operacao/log-performance-criativa.md`
- @qa Crivo valida via `*validar-criativo`

## Vantagens vs fal.ai/queue-based providers

| Critério | HyperFrames | fal.ai / WaveSpeed |
|---|---|---|
| Custo | Zero (roda local) | Por geração |
| Latência | Imediato (sem queue) | Polling 30s-5min |
| Determinismo | Mesmo HTML = mesmo output | Stochastic, varia |
| Versionamento | HTML é versionável em git | Output binário |
| Iteração | Edita HTML, re-renderiza | Re-gera com novo prompt |
| Content policy | Sem restrição (HTML local) | Bloqueia tópicos sensíveis |
| Modificação pós-render | Reabre HTML, ajusta, re-renderiza | Re-gera tudo |

## Anti-padrão

Não usar HyperFrames pra emular geração de imagem com modelo (Midjourney-style).
HyperFrames é **composição programática** — textos animados, layouts, transições.
Pra arte gerada por IA: usar fal.ai/Adobe Firefly + integrar como asset.

## Configuração agência

`em5-config.yaml` pode adicionar:
```yaml
hyperframes:
  enabled: true
  default_tts_voice: "elevenlabs_rachel_pt-br"  # ou local
  default_aspect_by_canal:
    instagram_reels: "9:16"
    instagram_feed: "1:1"
    instagram_stories: "9:16"
    meta_video_ad: "4:5"
    youtube_shorts: "9:16"
  render_resolution_default: "1080x1920"
```

Se ausente, skill assume defaults sensatos.
