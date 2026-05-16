---
name: iniciar-onboarding
agent: cs
description: Iniciar o processo de onboarding de um novo cliente — cria a pasta, confirma contato e prepara a coleta de briefing
inputs:
  - nome do cliente (slug sem espaços, ex: clinica-beleza)
  - contato principal (nome, cargo, WhatsApp)
outputs:
  - pasta do cliente criada em .em5/clientes/{nome}/
  - primeiro registro no log-operacional.md
elicit: true
---

# Iniciar Onboarding

## Objetivo

Registrar a entrada de um novo cliente no sistema, criar seu workspace e preparar o processo de coleta de briefing.

## Passo a passo

### 1. Coletar dados iniciais

Perguntar ao usuário:

```
1. Qual o nome do cliente? (use slug sem espaços: ex: clinica-sao-paulo)
2. Qual o nome do contato principal e seu cargo?
3. Qual o WhatsApp do contato principal?
4. Qual o e-mail do contato principal?
5. Como o cliente chegou até a agência? (indicação, tráfego, redes sociais, etc.)
```

### 2. Criar workspace do cliente

Executar via Agency Master ou criar manualmente:

```bash
node .em5/bin/agency-os-new-client.js {nome}
```

Estrutura que deve existir após a criação:

```
.em5/clientes/{nome}/
├── onboarding/
├── estrategia/
├── copy/
├── design/
├── assets/
├── branding/
├── setup-tecnico/
├── relatorios/
└── operacao/
    ├── log-operacional.md
    ├── log-performance-criativa.md
    └── log-growth.md
```

### 3. Registrar primeiro log

Criar entrada inicial em `.em5/clientes/{nome}/operacao/log-operacional.md`:

```markdown
| Data | Tipo | Responsável | Descrição | Status | Próxima Ação |
|------|------|-------------|-----------|--------|--------------|
| {data} | ENTRADA | CS | Cliente {nome} adicionado ao sistema. Contato: {nome_contato} ({cargo}), {whatsapp} | CONCLUÍDO | Coletar briefing |
```

### 4. Confirmar e orientar próximo passo

Informar ao usuário:

```
✅ Workspace do cliente {nome} criado.

Próximo passo: *coletar-briefing {nome}
```

## Output esperado

- Pasta `.em5/clientes/{nome}/` criada com estrutura completa
- Log operacional iniciado com registro de entrada
- Sistema pronto para coleta de briefing
