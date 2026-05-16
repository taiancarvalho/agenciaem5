---
name: versionar-criativo
agent: designer
description: Salvar nova versão de criativo com ID e número de versão corretos, garantindo rastreabilidade
inputs:
  - arquivo de imagem ou vídeo gerado
  - ID da peça (CR-{id})
outputs:
  - arquivo salvo em .em5/clientes/{nome}/design/criativos/ com nomenclatura correta
  - log de performance criativa atualizado
elicit: true
---

# Versionar Criativo

## Objetivo

Garantir que todo criativo produzido tenha ID único e número de versão, permitindo rastrear qual peça está rodando, qual foi iterada e qual foi descartada.

## Regra

```
Sem ID e versão = sem rastreabilidade.
Sem rastreabilidade = não sabe o que está performando.
```

---

## Padrão de nomenclatura

```
CR-{NNN}-v{N}.{ext}

Exemplos:
CR-001-v1.png     ← primeira versão da peça 001
CR-001-v2.png     ← ajuste solicitado pelo QA ou Tráfego
CR-001-v3.mp4     ← versão em vídeo do mesmo conceito
CR-002-v1.mp4     ← primeira versão da peça 002
```

---

## Passo a passo

### 1. Confirmar ID da peça

Perguntar ao usuário:

```
1. Qual o ID desta peça? (CR-{número})
   Se for peça nova: qual o próximo número disponível no log?

2. É uma iteração de versão existente (v2, v3) ou peça nova (v1)?

3. Qual o formato e extensão? (.png / .jpg / .mp4 / .gif)
```

### 2. Verificar próximo número disponível

Consultar `.em5/clientes/{nome}/operacao/log-performance-criativa.md` para identificar o maior número de CR utilizado e definir o próximo.

### 3. Salvar na pasta correta

Para imagens:
```
.em5/clientes/{nome}/design/criativos/CR-{id}-v{n}.png
```

Para vídeos:
```
.em5/clientes/{nome}/design/videos/CR-{id}-v{n}.mp4
```

Para landing pages:
```
.em5/clientes/{nome}/design/landing-pages/CR-{id}-v{n}/
```

Para exports finais aprovados:
```
.em5/clientes/{nome}/design/exports/CR-{id}-v{n}.{ext}
```

### 4. Atualizar log de performance criativa

Encontrar a linha do `CR-{id}` e atualizar campos de criativo:

```
Criativo: CR-{id}-v{n}.{ext}
Versão: v{n}
```

Se for versão nova de peça existente, adicionar observação:
```
Observação: v{n} criada em {data} — motivo: {ajuste de QA / feedback de performance / nova variação}
```

## Output esperado

- Arquivo salvo com nomenclatura correta
- Log atualizado
- Rastreabilidade garantida
