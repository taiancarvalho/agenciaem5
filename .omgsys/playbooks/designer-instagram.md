# Playbook: Design e Criação de Conteúdo

> Referência de execução para @designer
> Inclui: criativos de anúncios, conteúdo Instagram, UGC via WaveSpeed

---

## 1. Árvore de Decisão: Ângulo → Conceito → UGC

| Ângulo da Copy | Conceito Visual | UGC Vídeo (shot type) | UGC Imagem |
|---------------|-----------------|----------------------|------------|
| DOR | Agitação + cores quentes | `talking_selfie_problem` | Expressão preocupada/frustrada |
| PROVA SOCIAL | Faces reais + números grandes | `talking_selfie_testimonial` | `testimonial_hold` (segurando resultado) |
| URGÊNCIA | Countdown + vermelho | `mirror_selfie` (tensão) | `overhead_flatlay` com produto e urgência |
| ASPIRAÇÃO | Lifestyle premium + cenário | `mirror_selfie` (aspirational) | `lifestyle_still` (cenário premium) |
| CONVENIÊNCIA | Minimalista + clean | `screen_recording_selfie` | `overhead_flatlay` (produto clean) |

---

## 2. Fluxo de Criação de Criativo

### Passo 1 — Ler contexto
- `board-cliente.md` → cores, tom visual, restrições, @instagram
- `CR-{id}.md` → ângulo, hook, CTA, tom emocional
- `branding/` → paleta, fontes, guia de estilo

### Passo 2 — Decidir tipo de peça
```
Anúncio Meta/Instagram?  → verificar formato (1:1, 4:5, 9:16)
UGC (naturalista)?        → usar task gerar-ugc.md + skill ugc-creator
Imagem estática?          → seguir branding + conceito definido
Vídeo editado?            → usar task gerar-video.md
```

### Passo 3 — Para UGC: configuração por ângulo
```
DOR:          cenário kitchen ou office | emoção: worried/frustrated
PROVA SOCIAL: cenário bathroom ou bedroom | emoção: happy/grateful
URGÊNCIA:     cenário bedroom | outfit relevante ao produto
ASPIRAÇÃO:    cenário pool/beach ou bedroom premium | emoção: confident
CONVENIÊNCIA: cenário desk ou kitchen | ação: usando o produto/app
```

### Passo 4 — Nomenclatura e salvamento
```
Criativos: .omgsys/clientes/{nome}/design/criativos/CR-{id}-v{n}.{ext}
Prompts:   .omgsys/clientes/{nome}/design/criativos/prompts/CR-{id}-prompt.json
Vídeos:    .omgsys/clientes/{nome}/design/videos/CR-{id}-v{n}.mp4
```

---

## 3. Publicar no Instagram via Composio

```
1. Preparar: imagem/vídeo final + caption do @copywriter

2. Agendar:
   composio.instagram.create_media(
     image_url: "{url}",
     caption: "{caption com hashtags}"
   )
   composio.instagram.publish_media(creation_id: "{id}")

3. Horários de pico por nicho:
   → Beleza/Estética:  seg/qua/sex 19h-21h
   → Fitness:          seg/qua/sex 7h-9h e 19h-21h
   → Alimentação:      ter/qui/sáb 11h-13h
   → B2B/Serviços:     seg-sex 8h-10h
```

---

## 4. Checklist de Qualidade Visual

- [ ] Cores respeitam brand guidelines?
- [ ] Fontes corretas?
- [ ] CTA visível e legível?
- [ ] Formato correto para o canal?
- [ ] Texto ocupa < 20% da área (Meta Ads)?
- [ ] Logo em posição correta?
- [ ] Para UGC: parece orgânico, não comercial?

---

## 5. Handoff

```markdown
## Sessão {data}
**Agente:** @designer
**Task executada:** {nome da task}
**O que foi feito:** {criativos produzidos — listar IDs}
**Decisões importantes:** {conceito, ator UGC, ajustes de branding}
**Atenção para próxima sessão:** {iterações pendentes, criativos a regenerar}
```
