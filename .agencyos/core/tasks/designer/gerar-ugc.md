---
name: gerar-ugc
agent: designer
description: Criar conteudo UGC (imagem ou video) usando o sistema UGC com WaveSpeed AI, baseado em copy, branding e referencias visuais
inputs:
  - .agencyos/clientes/{nome}/copy/CR-{id}.md (copy da campanha)
  - .agencyos/clientes/{nome}/branding/ (identidade visual)
  - contexto/ugc-system/outputs/ (templates JSON de referencia)
  - .agencyos/clientes/{nome}/assets/ (imagens de referencia do produto)
outputs:
  - JSON de prompt estruturado adaptado para o cliente
  - Imagem ou video UGC gerado
elicit: true
---

# Gerar UGC

## Objetivo

Criar conteudo UGC (User Generated Content) fotorrealista para criativos de campanha usando o sistema UGC com WaveSpeed AI (Kling 3.0 Pro para video, Nano Banana 2 para imagem). O output deve parecer conteudo de criador real — nao anuncio de agencia.

O sistema UGC usa atores virtuais com identidade locked para manter consistencia entre shots. Os templates JSON em `contexto/ugc-system/outputs/` servem como base para adaptar ao cliente e ao produto.

## Regra

```
Nao usar linguagem de agencia ou estetica comercial.
Todo prompt UGC deve ter: captura consumer (nao studio),
imperfeicoes de realismo, e identidade de ator locked.
Se o produto nao se encaixa em nenhum ator existente,
adaptar o contexto visual — nunca alterar a identidade do ator.
```

---

## Passo a passo

### 1. Ler contexto do cliente

- **Copy**: `.agencyos/clientes/{nome}/copy/CR-{id}.md` — hook, angulo, promessa, CTA
- **Branding**: `.agencyos/clientes/{nome}/branding/` — cores, fontes, guia de estilo
- **Assets**: `.agencyos/clientes/{nome}/assets/` — fotos do produto, logo, referencias

### 2. Escolher tipo de UGC, cenario e persona

Com base na copy e no produto, decidir e confirmar:

**Tipo de UGC:**
- `mirror_selfie` — selfie no espelho, produto integrado naturalmente
- `grwm` (get ready with me) — rotina de preparacao com o produto
- `lifestyle_still` — foto lifestyle casual com produto
- `testimonial_hold` — pessoa segurando/produto em uso
- `unboxing` — abrindo embalagem (imagem do momento)
- `antes-depois` — transformacao ou resultado

**Cenario:**
- `bathroom` — banheiro, ideal para skincare/beleza
- `bedroom` — quarto, ideal para lifestyle/loungewear
- `kitchen` — cozinha, ideal para alimentos/suplementos
- `outdoor` — exterior, ideal para fitness/lifestyle
- `car` — dentro do carro, UGC casual/relaxado
- `office` — escritorio/trabalho
- `pool/beach` — piscina/praia, ideal para swimwear/solar
- Outro (descrever)

**Persona (ator):**
- `Amy` — platinum blonde bob, clean minimal vibe, marca: beauty mark lower left face
- `Mia` — dark brown caramel highlights, clean girl energy, marca: beauty mark below left eye
- `Astrid` — dark brown longo ondulada, criadora confiante/sedutora
- Outro (criar novo ator — ver referencia em contexto/ugc-system/)

Se `elicit: true`, perguntar ao usuario quais escolhas antes de prosseguir.

### 3. Carregar template JSON de referencia

Consultar `contexto/ugc-system/outputs/` para exemplos:

- `amy-mirror-selfie-still.json` — template de mirror selfie
- `amy-bathroom-grwm-still.json` — template de GRWM em banheiro
- `mia-beach-bikini-still.json` — template lifestyle na praia
- `mia-beach-bikini-walking-out-of-water-still.json` — template com acao
- `mia-sunscreen-poolside-kling3.json` — template Kling 3.0

Abrir o JSON mais proximo ao que precisa e usar como base estrutural.

### 4. Adaptar o JSON para o cliente

Cada JSON tem esta estrutura obrigatoria:

```json
{
  "actor_identity_card": {
    "actor_id": "...",
    "display_name": "...",
    "prompt_seed": "...",
    "vibe": "...",
    "face": { "shape": "...", "jawline": "..." },
    "eyes": { "shape": "...", "color": "..." },
    "skin": { "tone_hex": "...", "undertone": "...", "finish": "..." },
    "hair": { "color": "...", "style": "...", "length": "...", "parting": "..." },
    "distinguishing_marks": ["..."],
    "signature_accessories": ["..."]
  },
  "shot_plan": {
    "shot_id": "shot_01",
    "shot_type": "...",
    "camera_profile": "...",
    "intent": "..."
  },
  "prompt_stack": {
    "character_lock": "Actor lock: ...",
    "scenario": "Scenario: ...",
    "environment": "Environment: ...",
    "camera": "Camera: ...",
    "realism_injection": "Realism injection: ...",
    "negative_prompt": "..."
  },
  "full_prompt": "...prompt concat...",
  "negative_prompt": "..."
}
```

**Adaptacoes necessarias:**
- Atualizar `actor_identity_card` com o ator escolhido
- Adaptar `scenario` para integrar o produto do cliente
- Ajustar `environment` para o cenario escolhido
- Manter `camera` com perfil consumer (handheld, iPhone, nao comercial)
- Preencher os 10 anchors de realismo em `realism_injection`:
  `skin_pores`, `stray_hairs`, `under_eye_texture`, `uneven_skin_tone`,
  `fabric_texture`, `environmental_noise`, `lighting_imperfection`,
  `camera_artifacts`, `nail_detail`, `jewelry_physics`
- `negative_prompt`: remover artefatos com beauty filter, CGI, polish comercial

### 5. Gerar conteudo

**Para imagem:** usar WaveSpeed AI com Nano Banana 2 (text-to-image).
```
Modelo: Google Nano Banana 2
Formato: 3:4 ou 1:1
Resolucao: 2k
Prompt: campo `full_prompt` do JSON
Negative prompt: campo `negative_prompt` do JSON
```

**Para video:** usar WaveSpeed AI com Kling 3.0 Pro (text-to-video).
```
Modelo: Kling 3.0 Pro
Duracao: 5s, 10s ou 15s
Aspect ratio: 9:16 (stories/reels) ou 1:1 (feed)
Prompt: campo `full_prompt` do JSON
Negative prompt: campo `negative_prompt` do JSON
```

Se a geracao nao estiver realista o suficiente:
- Revisar `realism_injection` — adicionar mais imperfeicoes
- Verificar se `camera` nao usa linguagem comercial
- Checar se `negative_prompt` esta bloqueando polimento de agencia
- Maximo 3 tentativas antes de escalar para revisao

### 6. Salvar e versionar

Salvar JSON adaptado em `.agencyos/clientes/{nome}/design/criativos/prompts/`:
```
CR-{id}-ugc-{tipo}-prompt.json
```

Salvar a imagem em `.agencyos/clientes/{nome}/design/criativos/`:
```
CR-{id}-v1.png (ou .jpg)
```

Salvar o video em `.agencyos/clientes/{nome}/design/videos/`:
```
CR-{id}-v1.mp4
```

### 7. Registrar no log

Atualizar `.agencyos/clientes/{nome}/operacao/log-performance-criativa.md`:

```
Criativo: CR-{id}-v1.{ext}
Tipo: UGC {imagem/video}
Ator: {Amy / Mia / Astrid}
Cenario: {cenario}
Modelo: {Nano Banana 2 / Kling 3.0 Pro}
Conceito visual: {nome do conceito}
```

## Output esperado

- Imagem UGC ou video UGC gerado
- JSON de prompt adaptado e salvo
- Log de performance criativa atualizado
- Pronto para validacao do QA (Zara)