---
name: novo-cliente
agent: agency-master
description: Criar workspace completo para novo cliente no AgencyOS, com toda a estrutura
  de pastas e arquivos iniciais
inputs:
- "nome do cliente (slug \u2014 sem espa\xE7os, sem acentos, ex": clinica-sao-paulo)
outputs:
- .agencyos/clientes/{nome}/ com estrutura completa
- "arquivos iniciais de opera\xE7\xE3o criados"
elicit: true
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Novo Cliente

## Objetivo

Criar o workspace completo para um novo cliente dentro do AgencyOS, garantindo que toda a estrutura padrão exista antes de qualquer agente começar a operar.

---

## Passo a passo

### 1. Confirmar nome do cliente

Perguntar ao usuário:

```
Qual o nome do cliente para uso no sistema?
Use slug sem espaços e sem acentos (ex: clinica-sao-paulo, academia-fit, ecommerce-moda)
```

Validar:
- Sem espaços (usar hífens)
- Sem acentos
- Tudo em minúsculo
- Verificar se já existe em `.agencyos/clientes/`

### 2. Criar estrutura de pastas

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
mkdir -p .agencyos/clientes/{nome}/branding
mkdir -p .agencyos/clientes/{nome}/setup-tecnico
mkdir -p .agencyos/clientes/{nome}/relatorios
mkdir -p .agencyos/clientes/{nome}/trafego
mkdir -p .agencyos/clientes/{nome}/operacao/historico
```

### 3. Criar arquivos iniciais

#### `operacao/log-operacional.md`

```markdown
# Log Operacional — {Nome do Cliente}

**Criado em:** {data}
**Dono:** Sol (CS)
**Colaboradores:** Todos os agentes

---

| Data | Tipo | Responsável | Descrição | Status | Próxima Ação |
|------|------|-------------|-----------|--------|--------------|
| {data} | ENTRADA | Atlas | Workspace do cliente criado no AgencyOS. | CONCLUÍDO | CS iniciar onboarding |
```

#### `operacao/log-performance-criativa.md`

```markdown
# Log de Performance Criativa — {Nome do Cliente}

**Criado em:** {data}
**Dono:** Cal (Copywriter)
**Colaboradores:** Lux (visual + versão), Max (status + resultado)

---

| ID | Data | Canal | Tipo | Ângulo | Copy (resumo) | Criativo | Versão | Status | Resultado | Observação |
|----|------|-------|------|--------|---------------|---------|--------|--------|-----------|------------|
```

#### `operacao/log-growth.md`

```markdown
# Log de Growth — {Nome do Cliente}

**Criado em:** {data}
**Usado em:** Modo Growth (via @gestor-trafego *modo-growth)

---

| ID | Data | Ação | Tipo | Resultado | Decisão |
|----|------|------|------|-----------|---------|
```

#### `operacao/proximos-passos.md`

```markdown
# Próximos Passos — {Nome do Cliente}

**Atualizado em:** {data}

## Agência

- [ ] CS iniciar onboarding → *iniciar-onboarding {nome}

## Cliente

- [ ] Aguardando contato inicial
```

#### `setup-tecnico/status.md`

```markdown
# Status Técnico — {Nome do Cliente}

**Última atualização:** {data}

| Item | Status | Observação |
|------|--------|------------|
| Business Manager | ⏳ Aguardando | |
| Conta de Anúncios | ⏳ Aguardando | |
| Pixel Meta | ⏳ Aguardando | |
| GA4 | ⏳ Aguardando | |
| Site/LP | ⏳ Aguardando | |

**Liberado para execução:** NÃO — setup técnico pendente
```

#### `branding/cores.yaml`

```yaml
# Cores — {Nome do Cliente}
# Preencher após receber branding kit
primaria: ""
secundaria: ""
fundo: ""
texto: ""
destaque: ""
```

#### `branding/fontes.yaml`

```yaml
# Fontes — {Nome do Cliente}
# Preencher após receber branding kit
principal: ""
secundaria: ""
peso_titulos: ""
peso_corpo: ""
```

### 4. Confirmar criação

Exibir para o usuário:

```
✅ Workspace criado: .agencyos/clientes/{nome}/

Estrutura:
├── onboarding/
├── estrategia/
├── copy/
├── design/ (criativos, videos, landing-pages, exports)
├── assets/ (logo, fotos, videos)
├── branding/ (cores.yaml, fontes.yaml)
├── setup-tecnico/ (status.md)
├── trafego/
├── relatorios/
└── operacao/
    ├── log-operacional.md ✅
    ├── log-performance-criativa.md ✅
    ├── log-growth.md ✅
    └── proximos-passos.md ✅

Próximo passo: @cs *iniciar-onboarding {nome}
```

## Output esperado

- Workspace completo criado
- Arquivos iniciais de operação preenchidos
- Sistema pronto para o CS iniciar o onboarding
