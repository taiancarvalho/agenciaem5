---
name: ler-branding
agent: designer
description: Ler o branding kit do cliente e extrair cores, tipografia, tom visual
  e referencias antes de produzir
inputs:
- .agencyos/clientes/{nome}/branding/
- .agencyos/clientes/{nome}/assets/
outputs:
- mentalizacao do brand para uso nas tasks subsequentes
elicit: false
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Ler Branding

## Objetivo

Antes de produzir qualquer peca, o Designer precisa absorver completamente a identidade visual do cliente. Consistencia visual vale mais que criatividade aleatoria.

## Regra

```
Design sem branding = arte bonita que nao pertence a marca.
Sempre ler branding antes de qualquer task de producao.
```

---

## Passo a passo

### 1. Ler arquivos de branding

Ler todos os arquivos em `.agencyos/clientes/{nome}/branding/`:
- `cores.yaml` — paleta de cores primaria, secundaria e de acao
- `fontes.yaml` — tipografia (titulos, corpo, uso)
- `guia-estilo.md` — normas visuais, tom, nivel de sofisticacao

### 2. Verificar assets

Listar `.agencyos/clientes/{nome}/assets/` para entender material disponivel:
- Logo (formatos disponiveis)
- Fotos existentes
- Videos existentes
- Imagens de produto

### 3. Extrair diretrizes para execucao

Antes de produzir, registrar mentalmente (ou em nota rapida):
- **Cores:** quais sao primarias, secundarias, de fundo, de CTA
- **Fontes:** qual usa em titulo, corpo, destaque
- **Tom visual:** premium, acessivel, tecnico, divertido, serio
- **Restricoes:** o que NAO fazer (ex: nao usar fundo escuro, nao usar emojis)
- **Assets disponiveis:** o que ja existe para reutilizar

### 4. Validar consistencia

Se houver inconsistencia entre assets existentes (ex: logo em cor diferente do guia), sinalizar:
```
⚠️ Inconsistencia detectada: {descrever}
→ Registrar no log-operacional e informar ao CS.
```

---

## Output esperado

- Designer absorveu guia de marca completo
- Pronto para: `*definir-conceito-visual {nome}`, `*gerar-imagem {nome}`, `*gerar-video {nome}`
