---
name: validar-criativo
agent: qa-campanha
description: Executar checklist de validacao de criativo visual (imagem ou video)
  antes da publicacao
inputs:
- .agencyos/clientes/{nome}/design/ (arquivos de criativo)
- .agencyos/clientes/{nome}/branding/ (cores.yaml, fontes.yaml, guia-estilo.md)
- .agencyos/clientes/{nome}/copy/ (copy associada ao criativo)
outputs:
- resultado da validacao de criativo
- itens a corrigir (se houver)
elicit: false
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Validar Criativo

## Objetivo

Garantir que todo criativo visual esteja dentro do padrao de branding, legivel, adequado ao canal e em conformidade com politicas de plataforma antes de ir ao ar.

## Regra

```
Criativo nao validado = criativo nao publicado.
Mesmo que o cliente "ame o resultado", QA valida primeiro.
```

---

## Passo a passo

### 1. Coletar criativo a ser validado

Identificar os arquivos de criativo em `.agencyos/clientes/{nome}/design/` pendentes de validacao.

### 2. Ler diretrizes de branding

Consultar `.agencyos/clientes/{nome}/branding/cores.yaml`, `fontes.yaml` e `guia-estilo.md` (se existir) para validar conformidade visual.

### 3. Executar checklist

#### OBRIGATORIOS

```
[ ] Logo do cliente presente (quando obrigatorio pelo contexto)
[ ] Cores dentro da paleta de branding (conforme cores.yaml)
[ ] Texto na imagem legivel — contraste suficiente entre texto e fundo
[ ] CTA visivel e em destaque
[ ] Formato correto para o canal:
    — Meta Feed: 1080x1080 ou 1080x1350
    — Stories/Reels: 1080x1920
    — Google Display: 300x250, 728x90, 160x600, 300x600
[ ] Coerencia visual com a copy associada (angulo combinado)
[ ] Sem elementos que violem politicas de plataforma:
    — Sem antes/depois para saude/beleza
    — Sem promessas financeiras explicitas
    — Sem discriminacao visual ou de segmentacao
    — Sem uso indevido de marcas registradas ou rostos sem autorizacao
```

#### DESEJAVEIS

```
[ ] Hierarquia visual clara — o olho sabe onde ir primeiro
[ ] Conceito visual alinhado com o angulo da copy
[ ] ID de versionamento registrado (CR-{id}-v{versao})
[ ] Resolucao adequada (minimo 1080px no maior lado para imagens)
[ ] Duracao otimizada para video (15-30s para Meta, 6-15s para YouTube bumper)
```

### 4. Documentar resultado

```markdown
## Validacao de Criativo — {Nome do Cliente} — {Data}

**Peca:** CR-{id} — {tipo: imagem/video/carrossel}
**Auditado por:** Zara (QA de Campanha)

### Checklist
- Obrigatorios atendidos: X/Y
- Desejaveis atendidos: X/Y

### Resultado: APROVADO / REVISAO / BLOQUEADO
{Se REVISAO ou BLOQUEADO: listar items especificos a corrigir}
```

### 5. Registrar no log operacional

```markdown
| {data} | VALIDACAO | Zara | Validacao de criativo CR-{id}. Resultado: {APROVADO/REVISAO/BLOQUEADO}. | CONCLUÍDO | {proximo passo} |
```

## Output esperado

- Cada criativo com resultado claro
- Especificacao exata do que precisa ser ajustado
- Log operacional atualizado
