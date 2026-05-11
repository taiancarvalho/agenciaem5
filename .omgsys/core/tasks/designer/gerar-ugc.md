---
name: gerar-ugc
agent: designer
description: Criar conteudo UGC (imagem ou video) usando o sistema UGC com WaveSpeed AI
inputs:
  - .omgsys/clientes/{nome}/copy/CR-{id}.md
  - .omgsys/clientes/{nome}/branding/
  - contexto/ugc-system/outputs/ (templates JSON)
  - .omgsys/clientes/{nome}/assets/
outputs:
  - JSON de prompt estruturado
  - Imagem ou video UGC gerado
elicit: true
---

# Gerar UGC

## Playbook de Referência

**Ler antes de executar:** `.omgsys/playbooks/designer-instagram.md` (seção 1: Árvore de decisão)
**Memória:** ler últimas 3 entradas de `.omgsys/clientes/{nome}/memoria/notas-sessao.md`

---

## Objetivo

Criar conteúdo UGC fotorrealista para criativos de campanha usando WaveSpeed AI (Kling 3.0 Pro para vídeo, Nano Banana 2 para imagem). O output deve parecer conteúdo de criador real — não anúncio de agência.

## Regra

```
Não usar linguagem de agência ou estética comercial.
Todo prompt UGC deve ter: captura consumer (não studio),
imperfeicoes de realismo, e identidade de ator locked.
```

---

## Mapeamento Ângulo → Configuração UGC

| Ângulo | Shot Type | Cenário | Emoção/Ação |
|--------|-----------|---------|-------------|
| DOR | `talking_selfie_problem` | kitchen ou office | worried/frustrated |
| PROVA SOCIAL | `talking_selfie_testimonial` ou `testimonial_hold` | bathroom ou bedroom | happy/grateful |
| URGÊNCIA | `mirror_selfie` | bedroom | tense/excited |
| ASPIRAÇÃO | `mirror_selfie` ou `lifestyle_still` | pool/beach ou bedroom premium | confident/happy |
| CONVENIÊNCIA | `screen_recording_selfie` ou `overhead_flatlay` | desk ou kitchen | relaxed/focused |

Usar esta tabela como ponto de partida. Ajustar conforme o produto do cliente.

---

## Passo a passo

### 1. Ler contexto do cliente

- **Copy**: `CR-{id}.md` — hook, ângulo, promessa, CTA
- **Branding**: `branding/` — cores, fontes, guia de estilo
- **Assets**: `assets/` — fotos do produto, logo, referências

### 2. Escolher configuração com base no ângulo

Consultar tabela acima. Confirmar com usuário:
- **Shot type** (conforme tabela)
- **Cenário** (conforme tabela, ajustar ao produto)
- **Persona (ator)**:
  - `Amy` — platinum blonde bob, clean minimal vibe, beauty mark lower left face
  - `Mia` — dark brown caramel highlights, clean girl energy, beauty mark below left eye
  - `Astrid` — dark brown longo ondulada, criadora confiante/sedutora

### 3. Carregar template JSON de referência

Consultar `contexto/ugc-system/outputs/` e abrir o template mais próximo ao que precisa.

### 4. Adaptar o JSON para o cliente

Estrutura obrigatória do JSON:
```json
{
  "actor_identity_card": { ... },
  "shot_plan": {
    "shot_type": "{conforme tabela de ângulo}",
    "camera_profile": "consumer iPhone handheld",
    "intent": "{objetivo da peça}"
  },
  "prompt_stack": {
    "character_lock": "Actor lock: ...",
    "scenario": "Scenario: {produto integrado naturalmente}",
    "environment": "Environment: {cenário}",
    "camera": "Camera: iPhone, handheld, natural light",
    "realism_injection": "skin_pores, stray_hairs, under_eye_texture, uneven_skin_tone, fabric_texture, environmental_noise, lighting_imperfection, camera_artifacts, nail_detail, jewelry_physics",
    "negative_prompt": "beauty filter, CGI, commercial polish, studio lighting, perfect skin"
  }
}
```

### 5. Gerar conteúdo

**Imagem (Nano Banana 2):**
```
Modelo: Google Nano Banana 2
Formato: 3:4 ou 1:1
Resolução: 2k
Prompt: campo full_prompt do JSON
Negative: campo negative_prompt
```

**Vídeo (Kling 3.0 Pro):**
```
Modelo: Kling 3.0 Pro
Duração: 5s, 10s ou 15s
Aspect: 9:16 (stories/reels) ou 1:1 (feed)
Prompt: campo full_prompt do JSON
Negative: campo negative_prompt
```

### 6. Critérios de regeneração

```
Re-gerar se:
❌ Beauty mark do ator desapareceu
❌ Skin muito perfeita (sem poros visíveis)
❌ Iluminação parece studio (não natural)
❌ Produto deformado ou irreconhecível

Não re-gerar por:
✔ Variação de 5-10% na cor do cabelo
✔ Ângulo ligeiramente diferente do esperado
✔ Expressão facial com pequena variação

Máximo 3 tentativas — se falhar, abrir diagnosis.md
```

### 7. Salvar e versionar

```
Criativos: .omgsys/clientes/{nome}/design/criativos/CR-{id}-v{n}.{ext}
Prompts:   .omgsys/clientes/{nome}/design/criativos/prompts/CR-{id}-ugc-prompt.json
Vídeos:    .omgsys/clientes/{nome}/design/videos/CR-{id}-v{n}.mp4
```

### 8. Registrar e atualizar memória

Atualizar `log-performance-criativa.md` e adicionar entrada em `memoria/notas-sessao.md`.

---

## Em caso de falha (> 3 regenerações)

```markdown
**Problema:** UGC não atingiu critérios de realismo em 3 tentativas
**Causa-raiz provável:** {prompt com linguagem comercial / negative prompt insuficiente / cenário incompível com o produto}
**Ação corretiva:** {ajustar realism_injection / trocar shot type / trocar cenário}
**Escalar para:** @ceo se 3 rounds não resolverem
```

---

## Handoff

```markdown
## Handoff para @qa
**Arquivos que ele DEVE ler:**
- design/criativos/CR-{id}-v{n}.{ext}
- copy/CR-{id}.md (para verificar se visual casa com copy)

**O que foi feito:** {UGC gerado, tipo, ator, cenário}
**Atenção:** {variações geradas, qual a versão recomendada}

**Próxima task:** validar-copy (Zara/QA)
```

## Output esperado

- Imagem UGC ou vídeo UGC gerado
- JSON de prompt adaptado e salvo
- Log de performance criativa atualizado
- Pronto para validação do QA
