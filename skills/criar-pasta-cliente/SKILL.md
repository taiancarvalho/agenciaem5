---
name: criar-pasta-cliente
agent: agency-master
description: Criar estrutura de pastas para um novo cliente usando o template canonico
inputs:
- "nome do cliente (slug \u2014 sem espacos, sem acentos)"
outputs:
- .agencyos/clientes/{nome}/ com estrutura completa de diretorios
elicit: true
metadata:
  openclaw:
    emoji: "\U0001F9E0"
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

Validar que nao existe pasta com mesmo nome em `.agencyos/clientes/`.

### 2. Criar estrutura de diretorios

```bash
mkdir -p .agencyos/clientes/{nome}/onboarding
mkdir -p .agencyos/clientes/{nome}/estrategia
mkdir -p .agencyos/clientes/{nome}/copy
mkdir -p .agencyos/clientes/{nome}/design/criativos
mkdir -p .agencyos/clientes/{nome}/design/videos
mkdir -p .agencyos/clientes/{nome}/design/landing-pages
mkdir -p .agencyos/clientes/{nome}/design/exports
mkdir -p .agencyos/clientes/{nome}/assets/logo
mkdir -p .agencyos/clientes/{nome}/assets/fotos
mkdir -p .agencyos/clientes/{nome}/assets/videos
mkdir -p .agencyos/clientes/{nome}/assets/produtos
mkdir -p .agencyos/clientes/{nome}/branding
mkdir -p .agencyos/clientes/{nome}/setup-tecnico
mkdir -p .agencyos/clientes/{nome}/trafego
mkdir -p .agencyos/clientes/{nome}/relatorios
mkdir -p .agencyos/clientes/{nome}/operacao
mkdir -p .agencyos/clientes/{nome}/operacao/historico
```

### 3. Confirmar criacao

```
✅ Estrutura de pastas criada: .agencyos/clientes/{nome}/

Proximo passo: @cs *iniciar-onboarding {nome}
```

## Output esperado

- Estrutura completa de diretorios do cliente criada
- Pasta pronta para operacao dos agentes
