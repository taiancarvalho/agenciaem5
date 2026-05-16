---
name: novo-cliente
agent: ceo
description: Criar workspace completo para novo cliente no agenciaem5, com toda a estrutura de pastas e arquivos iniciais
inputs:
  - nome do cliente (slug — sem espaços, sem acentos, ex: clinica-sao-paulo)
outputs:
  - .em5/clientes/{nome}/ com estrutura completa
  - arquivos iniciais de operação criados
elicit: true
---

# Novo Cliente

## Objetivo

Criar o workspace completo para um novo cliente dentro do agenciaem5, garantindo que toda a estrutura padrão exista antes de qualquer agente começar a operar.

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
- Verificar se já existe em `.em5/clientes/`

### 2. Criar estrutura de pastas

```bash
mkdir -p .em5/clientes/{nome}/onboarding
mkdir -p .em5/clientes/{nome}/estrategia
mkdir -p .em5/clientes/{nome}/copy
mkdir -p .em5/clientes/{nome}/design/criativos
mkdir -p .em5/clientes/{nome}/design/videos
mkdir -p .em5/clientes/{nome}/design/landing-pages
mkdir -p .em5/clientes/{nome}/design/exports
mkdir -p .em5/clientes/{nome}/assets/logo
mkdir -p .em5/clientes/{nome}/assets/fotos
mkdir -p .em5/clientes/{nome}/assets/videos
mkdir -p .em5/clientes/{nome}/branding
mkdir -p .em5/clientes/{nome}/setup-tecnico
mkdir -p .em5/clientes/{nome}/relatorios
mkdir -p .em5/clientes/{nome}/trafego
mkdir -p .em5/clientes/{nome}/operacao/historico
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
| {data} | ENTRADA | Atlas | Workspace do cliente criado no agenciaem5. | CONCLUÍDO | CS iniciar onboarding |
```

#### `operacao/log-performance-criativa.md`

```markdown
# Log de Performance Criativa — {Nome do Cliente}

**Criado em:** {data}
**Dono:** Eco (Copywriter)
**Colaboradores:** Lux (visual + versão), Pulse (status + resultado)

---

| ID | Data | Canal | Tipo | Ângulo | Copy (resumo) | Criativo | Versão | Status | Resultado | Observação |
|----|------|-------|------|--------|---------------|---------|--------|--------|-----------|------------|
```

#### `operacao/log-growth.md`

```markdown
# Log de Growth — {Nome do Cliente}

**Criado em:** {data}
**Usado em:** Modo Growth (via @traffic *modo-growth)

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
✅ Workspace criado: .em5/clientes/{nome}/

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
