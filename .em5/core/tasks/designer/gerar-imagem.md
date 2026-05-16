---
name: gerar-imagem
agent: designer
description: Gerar imagem estática para criativo usando NanoBanana 2 via WaveSpeed AI, com base na copy e no brief visual
inputs:
  - .em5/clientes/{nome}/copy/CR-{id}.md (brief visual do Copywriter)
  - .em5/clientes/{nome}/branding/ (cores, fontes, guia de estilo)
  - .em5/clientes/{nome}/assets/ (logo, fotos, produtos)
outputs:
  - .em5/clientes/{nome}/design/criativos/CR-{id}-v1.{ext}
  - atualização no log de performance criativa
elicit: true
---

# Gerar Imagem

## Objetivo

Produzir imagem estática para criativo de campanha usando NanoBanana 2 via WaveSpeed AI, com base na copy recebida do Copywriter e no branding do cliente.

## Regra

```
Design sem copy = arte bonita que não vende.
Lux não começa sem ter lido a copy e o brief visual.
```

---

## Passo a passo

### 1. Ler a copy e o brief visual

Acessar `.em5/clientes/{nome}/copy/CR-{id}.md` e extrair:
- Hook e promessa principal da copy
- Ideia visual sugerida pelo Copywriter
- Tom visual esperado
- CTA e onde deve aparecer
- Assets disponíveis

### 2. Ler o branding

Acessar `.em5/clientes/{nome}/branding/`:
- `cores.yaml` — paleta de cores exata
- `fontes.yaml` — tipografia aprovada
- `guia-estilo.md` — tom visual, exemplos, restrições

### 3. Verificar assets disponíveis

Acessar `.em5/clientes/{nome}/assets/`:
- `logo/` — versões da logo em alta resolução
- `fotos/` — imagens do produto, equipe, local
- `produtos/` — renders ou fotos de produto

### 4. Definir conceito visual

Antes de gerar, definir:

```
Conceito: {o que a imagem vai mostrar e por quê reforça a mensagem}
Composição: {produto em destaque / pessoa / texto forte / abstrato}
Hierarquia: {o que o olho deve ver primeiro, segundo, terceiro}
Texto na imagem: {o que entra na imagem — geralmente só hook ou CTA}
```

### 5. Montar prompt para NanoBanana 2

Estrutura do prompt:

```
[ESTILO VISUAL]: {realista / minimalista / bold / editorial / lifestyle}
[COMPOSIÇÃO]: {descrição do que aparece na cena}
[ELEMENTOS]: {produto, pessoa, texto, logo, ícone}
[CORES]: {baseado na paleta do branding — ex: fundo azul escuro #1A2B3C, texto branco}
[FORMATO]: {proporção — ex: 1:1 para feed, 9:16 para stories}
[QUALIDADE]: high quality, professional, clean, advertising visual

Exemplo completo:
"Professional advertising image for a dental clinic.
Clean white and blue composition, lifestyle photo of a smiling woman,
product shot of clinic environment in background.
Bold headline space at top: 'O sorriso que você sempre quis'.
Blue (#1A4B8C) and white color scheme.
CTA button area at bottom: 'Agende agora'.
1:1 square format, high quality, modern clean design."
```

### 6. Gerar a imagem

Usar WaveSpeed AI com NanoBanana 2.

Se a primeira geração não estiver alinhada ao branding ou à copy, ajustar o prompt e gerar novamente (máximo 3 tentativas antes de escalar para revisão).

### 7. Salvar com ID e versão

Salvar em `.em5/clientes/{nome}/design/criativos/`:

```
CR-{id}-v1.png   (primeira versão)
CR-{id}-v2.png   (se houver ajuste)
```

### 8. Atualizar log de performance criativa

Encontrar a linha do `CR-{id}` em `.em5/clientes/{nome}/operacao/log-performance-criativa.md` e preencher:

```
Criativo: CR-{id}-v1.png
Versão: v1
```

### 9. Notificar QA

```
✅ Criativo gerado: CR-{id}-v1.png

→ Crivo: *validar-criativo {nome} CR-{id}
```

## Output esperado

- Imagem salva com ID e versão
- Log de performance criativa atualizado com referência ao arquivo
- Pronto para validação do QA (Crivo)
