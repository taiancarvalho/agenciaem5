---
name: transcrever-audio
agent: whats
description: Áudio recebido → texto via Composio (whisper ou equiv.)
inputs:
  - audio_file_path (vindo do polling/webhook WhatsApp)
  - cliente_slug
outputs:
  - .em5/clientes/{slug}/comunicacao/transcricoes/{data}-{N}.md
elicit: false
model_tier: haiku  # transcrição é tarefa simples
mcp_dependencies:
  - composio.whisper  # OU equivalente — validar disponibilidade
fallback: manual_transcription
---

# Task: transcrever-audio

## Objetivo

Cliente brasileiro adora mandar áudio. Bot precisa entender pra responder.

## Passo a passo

1. Recebe `audio_file_path` (.ogg ou .mp3) do webhook/polling WhatsApp
2. **Tenta Composio whisper** (se toolset disponível):
   ```
   composio.whisper.transcribe({ file_path, language: "pt-BR" })
   ```
3. Se Composio não suporta:
   - **Fallback manual:** notifica @cs Sol pra ouvir + transcrever
   - **Fallback técnico:** se quiser automação total → adicionar exceção Art. IX (Whisper API direto ou outro provider)
4. Salva transcrição em `clientes/{slug}/comunicacao/transcricoes/{YYYY-MM-DD}-{N}.md`:
   ```markdown
   # Áudio — {data hh:mm} — {duracao}s

   ## Transcrição
   "..."

   ## Sentiment detectado
   {pos | neutro | neg}

   ## Próxima ação sugerida
   {chamar `*receber-mensagem` com texto transcrito}
   ```
5. Passa transcrição pro `*receber-mensagem` pra classificação normal

## Critério de saída

- Áudio transcrito (ou flag pra humano)
- Próximo agente processa como texto normal

## Anti-padrão

- NÃO ignora áudio (cliente espera resposta)
- NÃO inventa transcrição se Composio falhar — escala humano (Art. VI)

## Validação prévia

Antes de prometer auto-transcrição: rodar `node .em5/infrastructure/index.js toolsets` e checar se `whisper` está disponível no Composio. Se não, documenta limitação.
