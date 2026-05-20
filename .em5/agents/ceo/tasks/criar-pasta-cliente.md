---
name: criar-pasta-cliente
agent: ceo
description: Criar estrutura de pastas para um novo cliente usando o template canonico
inputs:
  - nome do cliente (slug — sem espacos, sem acentos)
outputs:
  - clientes/{nome}/ com estrutura completa de diretorios
model_tier: frontier  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Criar Pasta Cliente

## Objetivo

Garantir que a estrutura de pastas de um novo cliente exista antes que qualquer agente comeca a operar. Esta task e usada quando o cliente tem um nome novo e precisa de workspace.

## Nota

```
Preferir usar *novo-cliente sempre que possivel, pois cria arquivos iniciais tambem.
Esta task existe para criar apenas a estrutura de diretorios quando necessario.
```

---

## Passo a passo

### 1. Confirmar nome do cliente

Perguntar ao usuario:

```
Qual o nome do cliente para o workspace?
Slug sem espacos e sem acentos (ex: clinica-sao-paulo)
```

Validar que nao existe pasta com mesmo nome em `clientes/`.

### 2. Criar estrutura de diretorios

```bash
mkdir -p clientes/{nome}/onboarding
mkdir -p clientes/{nome}/estrategia
mkdir -p clientes/{nome}/copy
mkdir -p clientes/{nome}/design/criativos
mkdir -p clientes/{nome}/design/videos
mkdir -p clientes/{nome}/design/landing-pages
mkdir -p clientes/{nome}/design/exports
mkdir -p clientes/{nome}/assets/logo
mkdir -p clientes/{nome}/assets/fotos
mkdir -p clientes/{nome}/assets/videos
mkdir -p clientes/{nome}/assets/produtos
mkdir -p clientes/{nome}/branding
mkdir -p clientes/{nome}/setup-tecnico
mkdir -p clientes/{nome}/trafego
mkdir -p clientes/{nome}/relatorios
mkdir -p clientes/{nome}/operacao
mkdir -p clientes/{nome}/operacao/historico
```

### 3. Confirmar criacao

```
✅ Estrutura de pastas criada: clientes/{nome}/

Proximo passo: @cs *iniciar-onboarding {nome}
```

## Output esperado

- Estrutura completa de diretorios do cliente criada
- Pasta pronta para operacao dos agentes
