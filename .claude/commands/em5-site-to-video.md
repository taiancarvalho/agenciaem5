# /em5-site-to-video — Site/LP do cliente → vídeo promo automático

**Argumento:** `/em5-site-to-video $ARGUMENTS` (ex: `/em5-site-to-video cna-vila-mariana https://cna.com.br/vila-mariana`)

## Por que existe

Cenário recorrente em agência:
- Prospect novo → @vendas Caça precisa de **proposta com mockup de criativo**
- Cliente existente sem material visual → primeiro criativo precisa parecer **profissional**
- Pitch deck → vídeo automático da LP do cliente vira slide animado

Esta skill captura a URL, extrai elementos (hero, copy, imagens, branding), e
gera vídeo promo HTML standalone via **HyperFrames**.

É **adapter** da skill upstream `website-to-hyperframes`.

## Quando usar

- **@vendas Caça pitch deck** — mockup de criativo na proposta comercial
- **@cs Sol onboarding** — primeiro draft visual enquanto briefing completo não vem
- **@designer Lux conceito** — referência rápida do tom visual do cliente
- **@strategist Vera análise** — visual do funil atual antes de redesenhar

## Quando NÃO usar

- Cliente sem LP/site online (rede social não conta — usar @designer fluxo padrão)
- Cliente com brandbook completo (skip — usar `/em5-criativo-video` com assets reais)
- Vídeo final pro cliente ver (este é mockup, sempre revisar e iterar)

## Argumentos

```
/em5-site-to-video {cliente} {url} [aspect]
```

- `cliente` — slug
- `url` — URL completa do site/LP
- `aspect` — opcional: `9:16` (default reels), `1:1`, `4:5`, `16:9`

## Instrução

Se `$ARGUMENTS` incompleto, pergunte cliente + url + aspect.

### Passo 1 — Validar URL

Se URL é cliente sob domínio franqueado (ex: CNA Vila Mariana em cna.com.br),
**avisar** o agente que o conteúdo capturado pode não ser representativo da
unidade específica. Pedir confirmação antes de prosseguir.

### Passo 2 — Invocar skill upstream

Invoque `website-to-hyperframes` com:
- URL alvo
- Aspect ratio definido
- Branding override (se cliente já tem `branding/cores.yaml` configurado)

A skill captura:
- Screenshot da página (hero + sections principais)
- Texto/copy extraído (headlines, body, CTA)
- Imagens principais
- Cores predominantes (se não tiver branding override)
- Vídeo de scroll (animado) ou cenas estáticas com transições

### Passo 3 — Salvar artefato

```
.em5/clientes/{cliente}/design/site-promo-{YYYY-MM-DD}.html  (HTML standalone)
.em5/clientes/{cliente}/design/site-promo-{YYYY-MM-DD}.mp4   (renderizado)
.em5/clientes/{cliente}/design/site-promo-{YYYY-MM-DD}-meta.json
```

Metadata:
```json
{
  "source_url": "{url}",
  "captured_at": "{ISO timestamp}",
  "aspect": "9:16",
  "duration_sec": 15,
  "tool_chain": ["website-to-hyperframes", "hyperframes-cli"],
  "branding_source": "cores.yaml" | "extracted_from_site",
  "status": "MOCKUP" | "REFINADO" | "PARA_PUBLICAR",
  "warnings": [
    "Domínio franqueado — conteúdo capturado pode não ser específico da unidade",
    "Cores extraídas do site não confirmadas com brandbook oficial"
  ]
}
```

### Passo 4 — Decisão de fluxo

**Mockup pra @vendas/@cs (uso interno):**
- Marcar `status: MOCKUP` no meta
- Pular @qa — uso interno

**Material pra cliente (raro):**
- Marcar `status: PARA_PUBLICAR`
- @designer Lux refina (substitui assets capturados por oficiais)
- `/em5-verify` + `*validar-criativo` (@qa)

### Passo 5 — Registrar

`.em5/clientes/{cliente}/operacao/log-operacional.md`:
```
| {data} | site-promo-{data} | Mockup vídeo | INFO | URL capturada: {url} |
```

## Anti-padrão

Não publicar mockup gerado automaticamente como criativo final sem refinar. Site
capturado pode ter:
- Cores aproximadas (não-oficiais do brandbook)
- Imagens com direitos restritos
- Texto desatualizado
- Layout não otimizado pro canal

Use `/em5-site-to-video` como **ponto de partida**, não entregável final.

## Limitações conhecidas

- Sites com JS pesado (SPA, lazy-load complexo) podem capturar mal — fallback é screenshot estático
- Sites com paywall ou login não funcionam — capturar página pública apenas
- Domínios com Cloudflare bot protection podem bloquear — usar `defuddle` como fallback de extração de texto

## Integração com `/em5-brainstorm`

Workflow recomendado pra prospect novo:
1. `/em5-site-to-video {prospect} {url-do-prospect}` → mockup visual rápido
2. `/em5-brainstorm {prospect} oferta-inicial` → decisão de oferta
3. `@vendas *criar-proposta` → proposta com mockup anexado
