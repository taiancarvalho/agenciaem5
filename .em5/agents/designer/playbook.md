# Playbook Designer — Lux

> Referência expert para @designer. Conceito visual + criativos + UGC + vídeo. Trabalha a partir do briefing copywriter.

**Playbook específico Instagram:** `playbook-instagram.md` (criativos IG + setup WaveSpeed)

## Princípio

**Designer = tradutor visual da estratégia.** Não inventa conceito — recebe brief (@copywriter) e materializa.

## Inputs essenciais antes de produzir

| Input | Onde |
|-------|------|
| Branding | `clientes/{nome}/branding/cores.yaml` + `fontes.yaml` + `guia-estilo.md` |
| Copy + ângulo | output @copywriter (CR-XXX.md) |
| Ref visual | `clientes/{nome}/branding/exemplos/` (peças anteriores que performaram) |
| Plataforma alvo | brief @traffic |
| Especificações técnicas | tabela abaixo |

## Especificações por plataforma

### Instagram

| Formato | Resolução | Duração |
|---------|-----------|---------|
| Feed quadrado | 1080×1080 | imagem |
| Feed retrato | 1080×1350 | imagem (recomendado — ocupa mais tela) |
| Stories | 1080×1920 | imagem ou 15s vídeo |
| Reels | 1080×1920 | 7-90s (sweet 30-60s) |
| Carrossel | 1080×1080 OR 1080×1350 | até 10 slides |

### Facebook Ads

- Feed: 1080×1080 OR 1200×628
- Stories: 1080×1920
- Vídeo: max 240min, .mp4 ou .mov

### Google Ads

- Display responsivo: múltiplas (1200×628, 1200×1200, 1200×1500)
- YouTube: 16:9 (1920×1080) OR 9:16 Shorts (1080×1920)

### LinkedIn

- Single image: 1200×627 OR 1200×1500
- Vídeo: 1920×1080 (16:9), max 10min
- Carrossel: PDF documento

## Princípios criativo alta performance

| Princípio | Significado |
|-----------|-------------|
| **Hook 3s** (vídeo) | Pessoa decide continuar nos 3 primeiros segundos |
| **Legível mobile** | Texto >= 14pt equivalente |
| **Sem dependência áudio** | Legendas baked, 70% vê sem som |
| **Branding consistente** | Cores + fontes + logo padrão |
| **Hierarquia visual** | 1 elemento dominante por peça |
| **Texto < 20% imagem** | Regra antiga Meta — ajuda CTR |
| **Loop-able** (vídeo) | Final liga com começo = mais views |
| **Contraste** | Branco/escuro OR preto/claro (não cinza médio) |

## Versionamento criativo (CR-XXX)

```
CR-{id}-v{n}.{ext}

CR-047-v1.png  (primeira versão)
CR-047-v2.png  (iteração feedback)
CR-047-thumb.jpg  (thumbnail vídeo)
CR-047-v1.mp4  (vídeo)
```

Sempre registrar em `log-performance-criativa.md`:
```
| CR-047-v1 | 2026-05-01 | LOOKALIKE1PCT | 1.4 CTR | 18.50 CPL | ATIVO |
```

## Tools por tipo

| Tool | Pra que | Acesso |
|------|---------|--------|
| WaveSpeed MCP | UGC fotorrealista + variations | API key (~/.claude/mcp_servers.json) |
| Canva | Edição rápida + templates | Composio canva |
| Adobe Express | Edição rápida | Composio adobe |
| HyperFrames | Vídeo HTML standalone | Skill `/em5-criativo-video` |
| Photoshop | Edição profunda manual | Local |
| Figma | UI/UX (LP) | Composio figma |
| Veo / Sora | Geração vídeo IA | Composio veo |
| ElevenLabs | TTS narração | Composio elevenlabs |

## UGC pipeline

Workflow: `ugc-creator-pipeline.yaml`

```
1. @copywriter cria brief (roteiro 30-60s + persona)
2. @cs contrata creator (lista pré-aprovada agência)
3. Recebe raw video
4. @designer edita (corte + legenda + branding suave)
5. @qa valida
6. @traffic publica
```

UGC tem CPL geralmente 30-50% menor que criativo institucional. Sempre testar.

## Vídeo curto (Reels/Shorts/TikTok) — estrutura

```
0-3s   HOOK (visual + verbal — falha aqui = perdeu)
3-45s  DESENVOLVIMENTO (1 ideia por bloco 5-7s)
45-60s CTA específico
```

Use `/em5-roteiro-reels` (skill) pra estrutura instant-value.

## Anti-padrões

- Texto < 14pt (ilegível mobile)
- Branding inconsistente
- Vídeo sem captions (70% perdido sem som)
- Hook fraco
- Sem versionamento CR-XXX
- Criar do zero sem ver branding
- Ignorar especificação plataforma
- Confundir Reels com Stories

## Métricas próprias

- Taxa aprovação QA primeira: > 80%
- Tempo médio imagem: < 30min
- Tempo médio vídeo: < 2h
- CR ativos > 7d: tracked
- Vencedores reutilizados: tracked
