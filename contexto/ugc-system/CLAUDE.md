# UGC System — Claude Code Context

## O que é este projeto

Sistema de criação de UGC (User Generated Content) com IA. Gera pacotes de prompts fotorrealistas para imagens e vídeos que preservam identidade de ator, comportamento de câmera iPhone, imperfeição de criador e continuidade entre shots.

O output são JSONs estruturados prontos para uso no **WaveSpeed** (Kling 3.0 Pro/Std para vídeo, Nano Banana 2 para imagem).

---

## Stack e ferramentas

- **Geração de vídeo:** WaveSpeed — Kling 3.0 Pro (text-to-video) / Kling 3.0 Std (image-to-video)
- **Geração de imagem:** WaveSpeed — Google Nano Banana 2 (text-to-image)
- **Auth:** `WAVESPEED_API_KEY` (Bearer token)
- **Framework:** Claude Code skill system
- **Skill principal:** `/ugc-creator` — ler sempre `SKILL.md` antes de qualquer geração
- **Output:** JSON prompt packages em `/outputs/`

---

## Estrutura do projeto

```
operacao/ugc-system/
├── CLAUDE.md                          ← este arquivo
├── .claude/
│   ├── skills/ugc-creator/
│   │   ├── SKILL.md                   ← spec completa do sistema (ler primeiro)
│   │   └── actors/                    ← identity cards dos atores em JSON
│   │       ├── amy.json
│   │       └── mia.json
│   └── prompt-referencias/            ← materiais de referência e estudo
│       ├── PhotoShoot.md
│       ├── _Prompts de Realidade.md
│       ├── Prompts para UGC Realista.md
│       ├── Angles.md
│       ├── Koda - Realism.md
│       ├── Koda - claude creative.md
│       └── emotionskling3guide1.pdf   ← guia de emoções para Kling 3.0
├── img-referencias/                   ← imagens de referência visual dos atores
│   ├── amy.png
│   └── gothic.png
└── outputs/                           ← prompt packages gerados
    ├── amy-bathroom-grwm-still.json
    ├── amy-mirror-selfie-still.json
    ├── mia-beach-bikini-still.json
    └── ...
```

---

## Atores cadastrados

### Amy — `ugc_amy_seed_51704`
- **Aparência:** platinum blonde sleek blunt bob chin-length, olhos amêndoa hazel-brown, pele #E9D8CB (neutral warm ivory)
- **Marca:** clean minimal vibe
- **Marca registrada:** beauty mark lower left side, clean blunt hair edge
- **Arquivo:** `.claude/skills/ugc-creator/actors/amy.json`

### Mia — `ugc_mia_seed_24031`
- **Aparência:** dark brown hair com caramel highlights, loose waves mid-chest, olhos dark brown, pele #C2875E (warm golden dewy)
- **Marca:** clean girl energy
- **Marca registrada:** beauty mark below left eye, slight smile asymmetry, gold hoops + dainty chain necklace
- **Arquivo:** `.claude/skills/ugc-creator/actors/mia.json`

### Astrid — `ugc_astrid_seed_28641`
- **Aparência:** dark brown hair longo com pontas suavemente onduladas, olhos dark brown, pele #C98A6B (warm neutral golden beige)
- **Marca:** criadora adulta com energia confiante e sedutora
- **Marca registrada:** olhar half-lidded sedutor, nariz levemente empinado, labios naturalmente rosados
- **Arquivo:** `.claude/skills/ugc-creator/actors/astrid.json`

---

## Como trabalhar neste projeto

### Para gerar prompts de imagem ou vídeo
1. Usar a skill `/ugc-creator`
2. A skill carrega automaticamente a `SKILL.md` com todas as regras
3. Informar: ator, shot type, cenário, produto/contexto
4. Receber: JSON completo com `actor_identity_card`, `actor_reference_headshot_payload`, `shot_plan`, `prompt_stack`, `wavespeed_payload`, `continuity_ledger`

### Para gerar headshot de referência de um ator
1. Usar `/ugc-creator` informando "gerar headshot de referência para [ator]"
2. Output: payload para WaveSpeed Nano Banana 2 (text-to-image, 3:4, 2k)
3. Salvar imagem gerada em `img-referencias/{ator}-headshot-ref.png`
4. Atualizar o campo `reference_headshot_file` no JSON do ator

### Para adicionar um novo ator
1. Criar arquivo JSON em `.claude/skills/ugc-creator/actors/` seguindo o schema em `SKILL.md > Actor System`
2. Gerar um `prompt_seed` único e fixo
3. Preencher todos os campos obrigatórios de `identity_lock.must_match`
4. Gerar headshot de referência (ver acima) e salvar em `img-referencias/`

### Para salvar um output gerado
- Arquivo em `/outputs/`
- Convenção de nome: `{actor_name}-{shot_type}-{contexto}-{formato}.json`
- Exemplos: `amy-bathroom-grwm-still.json`, `mia-beach-bikini-kling3.json`

---

## Convenções obrigatórias

### Identidade do ator — nunca alterar entre shots da mesma série
Os campos abaixo são **locked** e não podem variar:
`face.shape`, `face.jawline`, `eyes.shape`, `eyes.color`, `skin.tone_hex`, `hair.color`, `distinguishing_marks`, `prompt_seed`

### Linguagem de prompt
- **Sempre** assumir captura handheld consumer, não polimento comercial
- **Nunca** usar: flawless, perfect skin, pristine lighting, studio-clean, ideal symmetry
- **Sempre** abrir layer de câmera com a `opening_convention` do perfil selecionado (ex: `Candid UGC iPhone selfie (no portrait mode, no bokeh):`)
- **Para vídeos com emoção:** sempre abrir com `Camera holds locked... No zoom, no dolly, no push-in.`

### Os 10 anchors de realismo (obrigatórios em todo prompt)
`skin_pores` · `stray_hairs` · `under_eye_texture` · `uneven_skin_tone` · `fabric_texture` · `environmental_noise` · `lighting_imperfection` · `camera_artifacts` · `nail_detail` · `jewelry_physics`

### Emoção em vídeo (Kling)
- Descrever **músculos**, não humores. Nunca escrever "angry" — escrever "eyebrows slam into severe V-shape"
- Usar linguagem de escalada: "overtakes in escalating waves", "deepening every second"
- Fechar sempre com tech footer: `Locked static camera. Smartphone capture quality, realistic skin texture, no beauty filtering.`

---

## Referências rápidas

| O que preciso | Onde encontrar |
|---------------|----------------|
| Spec completa do sistema | `.claude/skills/ugc-creator/SKILL.md` |
| Identity card de ator | `.claude/skills/ugc-creator/actors/{nome}.json` |
| Mapa de modelos WaveSpeed | `SKILL.md > WaveSpeed Model Map` |
| Sistema de headshot de referência | `SKILL.md > Actor Reference Headshot` |
| Cheat sheet de emoções para Kling | `SKILL.md > Kling Emotion Engine > emotion_cheat_sheet` |
| Presets de cena (bathroom, car, gym...) | `SKILL.md > Scene Presets` |
| Sliders de ajuste (mais amador / mais real) | `SKILL.md > Quick Adjustment Controls` |
| Vocabulário de ações humanas | `SKILL.md > Human Action Library` |
| Guia de emoções Kling (PDF original) | `.claude/prompt-referencias/emotionskling3guide1.pdf` |
| Outputs anteriores como referência | `/outputs/` |
