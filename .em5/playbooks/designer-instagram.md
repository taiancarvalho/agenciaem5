# Playbook: Design e Criação de Conteúdo

> Referência de execução para @designer
> Inclui: criativos de anúncios, conteúdo Instagram, UGC via WaveSpeed MCP

---

## 0. Configuração WaveSpeed MCP

### Setup inicial (uma vez por ambiente)

```bash
pip install wavespeed-mcp
export WAVESPEED_API_KEY="sua-chave-aqui"
```

Ou via `~/.claude/mcp_servers.json` para uso nativo no Claude:

```json
{
  "wavespeed": {
    "command": "wavespeed-mcp",
    "env": {
      "WAVESPEED_API_KEY": "sua-chave-aqui"
    }
  }
}
```

Após configurar: reiniciar Claude. O @designer passa a ter acesso direto à geração de imagem e vídeo sem sair da sessão.

---

### Modelos disponíveis e quando usar

| Tipo | Modelo | Quando usar |
|------|--------|-------------|
| **Vídeo** | `kling-v2-0` | Talking heads, UGC de produto, testimonials, qualquer vídeo curto |
| **Imagem realista** | `nano-banana-v2` | UGC estáticos, pessoas reais, produto em uso, lifestyle orgânico |
| **Imagem criativa** | `gpt-image-2` | Composição conceitual, mockups estilizados, arte direcional, cenários |

**Regra de ouro:** dúvida entre realista e criativo → use `nano-banana-v2` para anúncios. Conteúdo que parece orgânico converte mais.

**Regra de vídeo:** qualquer UGC que precise de movimento humano → `kling-v2-0`. Não tente simular vídeo com imagem estática.

---

### Seleção de modelo por ângulo de copy

| Ângulo | Formato ideal | Modelo |
|--------|--------------|--------|
| DOR | Vídeo (emoção é chave) | `kling-v2-0` |
| PROVA SOCIAL | Imagem com rosto + número | `nano-banana-v2` |
| URGÊNCIA | Imagem clean com destaque | `nano-banana-v2` |
| ASPIRAÇÃO | Vídeo lifestyle ou imagem premium | `kling-v2-0` ou `gpt-image-2` |
| CONVENIÊNCIA | Imagem minimalista ou screen recording | `nano-banana-v2` ou `kling-v2-0` |

---

### Template de prompt WaveSpeed

```
Sujeto: {ator UGC — descrever físico, roupa, expressão}
Cenário: {local — cozinha, quarto, escritório, exterior}
Ação: {o que está fazendo — falando para câmera, segurando produto, gesticulando}
Tom: {emocional — ansioso, aliviado, empolgado, confiante}
Iluminação: {natural / softbox frontal / anel de luz}
Formato: {16:9 / 9:16 / 1:1}
Duração: {5s / 10s / 15s} (apenas para vídeo)
```

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
UGC (naturalista)?        → usar task gerar-ugc.md (WaveSpeed MCP)
Imagem estática?          → seguir branding + conceito definido
Vídeo editado?            → usar task gerar-video.md
```

### Passo 3 — Para UGC: configuração por ângulo
```
DOR:          cenário kitchen ou office | emoção: worried/frustrated  | modelo: kling-v2-0
PROVA SOCIAL: cenário bathroom ou bedroom | emoção: happy/grateful   | modelo: nano-banana-v2
URGÊNCIA:     cenário bedroom | outfit relevante ao produto           | modelo: nano-banana-v2
ASPIRAÇÃO:    cenário pool/beach ou bedroom premium | emoção: confident | modelo: kling-v2-0
CONVENIÊNCIA: cenário desk ou kitchen | ação: usando o produto/app  | modelo: nano-banana-v2
```

### Passo 4 — Nomenclatura e salvamento
```
Criativos: .em5/clientes/{nome}/design/criativos/CR-{id}-v{n}.{ext}
Prompts:   .em5/clientes/{nome}/design/criativos/prompts/CR-{id}-prompt.json
Vídeos:    .em5/clientes/{nome}/design/videos/CR-{id}-v{n}.mp4
```

Salvar sempre o prompt usado junto do arquivo — facilita regeneração e iteração.

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
- [ ] Prompt salvo em `/prompts/CR-{id}-prompt.json`?

---

## 5. Em caso de falha

Se criativo for reprovado pelo @qa, gerar `diagnosis.md` em `design/criativos/`:

```markdown
## Diagnosis CR-{id}
**Problema identificado:** {ex: texto >20% da área, cor fora do brand book}
**Causa-raiz provável:** {ex: prompt não referenciou brand guidelines}
**Agente responsável:** @designer
**Ação corretiva:** {ex: regenerar com palette correta + checar brand book antes}
**Prioridade:** CRÍTICO / NORMAL / BAIXO
**Retestar após:** {ex: nova versão gerada com paleta correta}
```

---

## 6. Handoff

```markdown
## Handoff para @qa
**Arquivos que ele DEVE ler:**
- board-cliente.md (sempre)
- CR-{id}-v{n}.{ext} (criativo final)
- CR-{id}-prompt.json (prompt usado)

**Resumo do que foi feito:** {criativos produzidos — listar IDs e tipo}
**Decisões importantes:** {conceito, modelo WaveSpeed usado, ajustes de branding}
**O que precisa de atenção:** {iterações pendentes, variações a testar}
**Próxima task:** qa/validar-criativos
```

---

## 7. Atualizar memória

Ao terminar qualquer task, adicionar entrada em `clientes/{nome}/memoria/notas-sessao.md`:

```markdown
## Sessão {data}
**Agente:** @designer
**Task executada:** {nome da task}
**O que foi feito:** {criativos produzidos — listar IDs}
**Decisões importantes:** {conceito, modelo WaveSpeed, ator UGC, ajustes de branding}
**Atenção para próxima sessão:** {iterações pendentes, criativos a regenerar}
```
