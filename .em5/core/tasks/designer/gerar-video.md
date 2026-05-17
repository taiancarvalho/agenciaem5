---
name: gerar-video
agent: designer
description: Gerar video para criativo usando Kling 3.0 Pro via WaveSpeed AI, com prompt estruturado baseado na copy, branding e conceito visual
inputs:
  - .em5/clientes/{nome}/copy/CR-{id}.md (copy da campanha)
  - .em5/clientes/{nome}/branding/ (identidade visual)
  - .em5/clientes/{nome}/design/conceito-visual-CR-{id}.md (conceito definido)
outputs:
  - .em5/clientes/{nome}/design/videos/CR-{id}-v1.mp4
  - JSON de prompt em .em5/clientes/{nome}/design/videos/prompts/CR-{id}-prompt.json
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Gerar Video

## Objetivo

Produzir video para criativo de campanha usando Kling 3.0 Pro via WaveSpeed AI. O video deve ser estruturado com prompt detalhado que cubra cenario, atores ou elementos visuais, movimentos de camera, duracao e ritmo — tudo alinhado com a copy, branding e conceito visual definidos.

Video para ads exige atencao nos primeiros 3 segundos. O hook visual é mais importante que a perfeicao tecnica.

## Regra

```
Video sem copy definida = video bonito que nao converte.
Todo video deve ter prompt estruturado salvo antes da geracao.
Nao usar linguagem comercial polida — preferir captura consumer realista.
```

---

## Passo a passo

### 1. Ler contexto

Reunir todas as entradas necessarias:

- **Copy**: `.em5/clientes/{nome}/copy/CR-{id}.md` — extrair hook, angulo, promessa e CTA
- **Branding**: `.em5/clientes/{nome}/branding/` — cores, fontes, guia de estilo
- **Conceito visual**: documento gerado pela task `definir-conceito-visual`
- **Assets**: `.em5/clientes/{nome}/assets/` — elementos disponiveis para usar

### 2. Definir estrutura do video

Antes de montar o prompt, definir:

```
Tipo de video: {UGC / produto / motion grafico / lifestyle / depoimento}
Duracao: {6s / 10s / 15s / 30s — para ads, preferir 10-15s}
Aspect ratio: {9:16 stories/reels / 1:1 feed / 16:9 YouTube}
Hook visual (0-3s): {o que aparece nos primeiros 3 segundos que prende atencao}
Meio (3-8s): {desenvolvimento — mostra produto, prova social, transformacao}
Fechamento (8-15s): {CTA visual — o que aparece na tela final}
```

### 3. Montar prompt para Kling 3.0 Pro

Usar esta estrutura de prompt:

```
[VISAO GERAL]
{Descreva em 1-2 frases o que o video mostra no geral}

[CENARIO]
{Onde se passa — descrica o do ambiente, objeto, contexto}

[PERSONAS/ATORES]
{Se houver pessoa: descreva aparencia, expressao, acao, postura}
{Sem "flawless skin" ou "perfect lighting" — usar linguagem realista}

[MOVIMENTO DE CAMERA]
{handheld / static locked / slow pan / push-in / follow / tilt}
{Abrir com: "Locked static camera. Smartphone capture quality." para UGC}
{Ou: "Slow handheld pan from left to right, slight natural shake."}

[ILUMINACAO]
{natural / golden hour / fluorescent / hard sun / overcast}
{Incluir imperfeicoes: "slight lens flare", "warm color cast from window"}

[DURACAO E RITMO]
{X segundos, ritmo {lento / medio / rapido}}
{Se UGC: descrever acao humana continua, nao cortes}

[TEXTO NA TELA - SE APLICAVEL]
{Hook text: "..."} (se aparece texto no vídeo)
{CTA text: "..."} (no final)

[REFERENCIA DE ESTILO]
{UGC casual / cinematic / editorial / minimalista / bold}
```

### 4. Definir parametros de geracao

```
Modelo: Kling 3.0 Pro (WaveSpeed AI)
Aspect ratio: {9:16 ou 1:1 ou 16:9}
Duracao: {5s / 10s / 15s}
Resolucao: 1080p (padrão para ads)
Seed: {fixar seed para reprodutibilidade}
```

### 5. Gerar o video

Usar WaveSpeed AI com Kling 3.0 Pro. Enviar o prompt estruturado.

- Se a primeira geracao nao estiver alinhada: ajustar prompt (maquina de prompt, nao de camera) — maximo 3 tentativas
- Se apos 3 tentativas ainda nao estiver bom: documentar o problema e escalar para revisao
- Salvar o JSON do prompt em `.em5/clientes/{nome}/design/videos/prompts/CR-{id}-prompt.json`

### 6. Versionar e salvar

Salvar video em `.em5/clientes/{nome}/design/videos/`:

```
CR-{id}-v1.mp4   ← primeira versao
CR-{id}-v2.mp4   ← se houver ajuste
```

Salvar prompt JSON em `.em5/clientes/{nome}/design/videos/prompts/`:

```json
{
  "creative_id": "CR-{id}",
  "version": "v1",
  "model": "kling-3.0-pro",
  "concept": "{conceito visual utilizado}",
  "aspect_ratio": "9:16",
  "duration": "15s",
  "prompt": "{prompt completo estruturado}",
  "seed": "{seed utilizada}",
  "generated_at": "{data/hora}"
}
```

### 7. Registrar no log

Atualizar `.em5/clientes/{nome}/operacao/log-performance-criativa.md`:

```
Criativo: CR-{id}-v1.mp4
Tipo: video
Modelo: Kling 3.0 Pro
Duracao: {X}s
Conceito visual: {nome}
```

### 8. Notificar QA

```
Video gerado: CR-{id}-v1.mp4

→ Crivo: *validar-criativo {nome} CR-{id}
```

## Output esperado

- Video MP4 salvo com ID e versao
- JSON de prompt estruturado registrado
- Log de performance criativa atualizado
- Pronto para validacao do QA (Crivo)