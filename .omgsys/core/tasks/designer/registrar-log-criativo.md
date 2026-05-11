---
name: registrar-log-criativo
agent: designer
description: Registrar novo criativo no log de performance criativa com metadados visuais e referencias
inputs:
  - .omgsys/clientes/{nome}/operacao/log-performance-criativa.md
  - dados do criativo (ID, canal, tipo, angulo, versao)
outputs:
  - linha adicionada no log-performance-criativa.md
elicit: false
---

# Registrar Log Criativo

## Objetivo

Garantir que todo criativo produzido seja registrado no log compartilhado, com metadados suficientes para que o Gestor de Tráfego possa rastrear a performance e o Copywriter possa correlacionar copy + visual.

## Regra

```
Sem registro no log = sem visibilidade do que funcionou.
Todo criativo, mesmo em rascunho, deve ter uma linha no log.
```

---

## Passo a passo

### 1. Coletar metadados do criativo

Reunir as informacoes:

- **ID:** CR-{numero sequencial} (ex: CR-001)
- **Canal:** Meta Ads, Google Ads, TikTok, etc.
- **Tipo:** Imagem, Video, Carousel, Stories, Reels, etc.
- **Angulo:** Qual angulo da copy este criativo ilustra
- **Copy:** Resumo em 1 frase da copy associada
- **Versao:** v1, v2, v3...
- **Status:** RASCUNHO / EM_QA / APROVADO / ATIVO / PAUSADO / ARQUIVADO

### 2. Adicionar entrada ao log

Abrir `.omgsys/clientes/{nome}/operacao/log-performance-criativa.md` e adicionar nova linha:

```markdown
| CR-{id} | {data} | {canal} | {tipo} | {angulo} | {resumo copy} | {nome arquivo criativo} | v{versao} | {status} | | |
```

### 3. Confirmar registro

Informar ao usuario:

```
✅ Criativo registrado: CR-{id} no log de performance.
Proximo passo: enviar para QA (*validar-campanha {nome}) ou subir como ATIVO se ja validado.
```

## Output esperado

- Linha adicionada ao log com todos os metadados visuais
- Creativo rastreavel por angulo, canal e versao
- Pronto para performance tracking quando ativo
