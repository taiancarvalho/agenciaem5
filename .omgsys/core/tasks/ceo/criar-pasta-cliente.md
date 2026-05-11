---
name: criar-pasta-cliente
agent: ceo
description: Criar estrutura de pastas para um novo cliente usando o template canonico
inputs:
  - nome do cliente (slug — sem espacos, sem acentos)
outputs:
  - .omgsys/clientes/{nome}/ com estrutura completa de diretorios
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

Validar que nao existe pasta com mesmo nome em `.omgsys/clientes/`.

### 2. Criar estrutura de diretorios

```bash
mkdir -p .omgsys/clientes/{nome}/onboarding
mkdir -p .omgsys/clientes/{nome}/estrategia
mkdir -p .omgsys/clientes/{nome}/copy
mkdir -p .omgsys/clientes/{nome}/design/criativos
mkdir -p .omgsys/clientes/{nome}/design/videos
mkdir -p .omgsys/clientes/{nome}/design/landing-pages
mkdir -p .omgsys/clientes/{nome}/design/exports
mkdir -p .omgsys/clientes/{nome}/assets/logo
mkdir -p .omgsys/clientes/{nome}/assets/fotos
mkdir -p .omgsys/clientes/{nome}/assets/videos
mkdir -p .omgsys/clientes/{nome}/assets/produtos
mkdir -p .omgsys/clientes/{nome}/branding
mkdir -p .omgsys/clientes/{nome}/setup-tecnico
mkdir -p .omgsys/clientes/{nome}/trafego
mkdir -p .omgsys/clientes/{nome}/relatorios
mkdir -p .omgsys/clientes/{nome}/operacao
mkdir -p .omgsys/clientes/{nome}/operacao/historico
```

### 3. Confirmar criacao

```
✅ Estrutura de pastas criada: .omgsys/clientes/{nome}/

Proximo passo: @cs *iniciar-onboarding {nome}
```

## Output esperado

- Estrutura completa de diretorios do cliente criada
- Pasta pronta para operacao dos agentes
