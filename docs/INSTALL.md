# em5 — Guia de Instalação

> Passo-a-passo completo da instalação. Estimativa: **30 min** se for primeira vez.

## Sumário

1. [Pré-requisitos](#1-pré-requisitos)
2. [Instalar Claude Code](#2-instalar-claude-code)
3. [Clonar em5](#3-clonar-em5)
4. [Configurar Composio](#4-configurar-composio-obrigatório)
5. [Configurar Asaas](#5-configurar-asaas-opcional-mas-recomendado)
6. [Configurar WhatsApp](#6-configurar-whatsapp-opcional)
7. [Validar instalação](#7-validar-instalação)
8. [Primeira execução](#8-primeira-execução)
9. [Setup do Painel](#9-setup-do-painel-opcional)
10. [Setup do Electron Desktop](#10-setup-do-electron-desktop-opcional)
11. [Setup Paperclip](#11-setup-paperclip-opcional-avançado)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Pré-requisitos

### Sistema operacional
- ✅ macOS 12+
- ✅ Linux (Ubuntu 22+, Debian 11+)
- ✅ Windows via WSL2

### Software base

```bash
# Node 20+
node --version   # esperado: v20.x.x ou superior

# npm
npm --version

# git
git --version

# jq (pra scripts de import)
brew install jq          # Mac
sudo apt install jq      # Linux
```

Se Node antigo: usa [nvm](https://github.com/nvm-sh/nvm) → `nvm install 20`.

---

## 2. Instalar Claude Code

```bash
# Mac
brew install anthropic/claude/claude-code

# Linux/WSL
curl -fsSL https://claude.com/install.sh | sh

# Verifica
claude --version
```

Login (abre browser pra autenticar):

```bash
claude
# Segue prompt de login OAuth
```

Após login, deve ver mensagem "Claude Code is ready". Sai com `/exit`.

---

## 3. Clonar em5

```bash
cd ~/Documents   # ou onde preferir
git clone https://github.com/taiancarvalho/agenciaem5.git
cd agenciaem5
npm install      # instala 86 packages (~30s)
```

---

## 4. Configurar Composio (obrigatório)

Composio é o gateway MCP único pra Meta Ads, Google Analytics, Gmail, Slack, etc.

### 4.1 Criar conta

1. Acessa [app.composio.dev](https://app.composio.dev/)
2. Sign up (free tier suficiente pra começar)
3. Após login: **Settings → API Keys → Create New Key**
4. Copia a key (formato `cma_xxx`)

### 4.2 Adicionar no .env

```bash
cp .env.example .env
```

Edita `.env` e cola:

```bash
COMPOSIO_API_KEY=cma_xxx
```

### 4.3 Conectar toolsets

Acessa cada toolset no Composio e autentica:

| Toolset | Como conectar |
|---------|---------------|
| `meta_ads` | OAuth Meta Business Manager — precisa conta de ads ativa |
| `google_analytics` | OAuth Google Workspace |
| `googlesheets` | OAuth Google |
| `gmail` | OAuth Google |
| `slack` | OAuth Slack workspace |
| `whatsapp_business` | API key Meta WhatsApp Business (se for usar) |
| `googledrive` | OAuth Google |

**Mínimo pra começar:** Meta Ads + Google Analytics + Gmail.

### 4.4 Reload Claude Code

Após adicionar `COMPOSIO_API_KEY`, **reinicia Claude Code**:

```bash
# Fecha qualquer Claude Code aberto
# Reabre na pasta agenciaem5/
```

Testa MCPs:

```bash
node .em5/infra/infrastructure/index.js toolsets
# Deve listar: meta_ads, google_analytics, gmail, slack, googlesheets, whatsapp_business, googledrive
```

---

## 5. Configurar Asaas (opcional mas recomendado)

Pra agência BR — automação de cobranças, MRR, inadimplência.

### 5.1 Criar conta

- **Sandbox (testes):** [sandbox.asaas.com](https://sandbox.asaas.com) — token `$aact_sandbox_xxx`
- **Produção:** [www.asaas.com](https://www.asaas.com) — token `$aact_xxx`

### 5.2 Obter token

1. Login Asaas
2. **Integrações → API → Gerar nova chave**
3. Copia (começa com `$aact_`)

### 5.3 Adicionar no .env

```bash
ASAAS_TOKEN=$aact_xxx
ASAAS_SANDBOX=true     # false em produção
```

### 5.4 Confirmar exceção Art. IX

Verifica que Asaas está documentado:

```bash
cat .em5/infra/integracoes/excecoes.yaml | head -20
```

Deve mostrar entry `mcp_id: asaas`.

---

## 6. Configurar WhatsApp (opcional)

Dois caminhos:

### Opção A — Composio whatsapp_business (oficial Meta, pago)

Já configurado no passo 4.3 se conectou o toolset.

### Opção B — WAHA selfhosted (free, não-oficial)

⚠️ Risco de ban — use só pra dev/teste.

```bash
# Docker compose recomendado
docker run -it -p 3000:3000 devlikeapro/waha
```

Adiciona no `.env`:
```bash
WAHA_URL=http://localhost:3000
WAHA_API_KEY=
```

### Setup pelo em5

No Claude Code, executa:

```
/whats-setup
```

Wizard pergunta provider, telefone, templates, stop rules.

---

## 7. Validar instalação

### 7.1 Conformidade

```bash
node .em5/infra/bin/em5-validate.js
```

**Esperado:** `✅ Todos os checks passaram. 0 issues.`

Se falhar:
- Falta `.env`? → volta passo 4
- Falta agente? → reinstala: `npm install`
- Estrutura quebrada? → re-clona

### 7.2 Smoke tests

```bash
npm test
```

**Esperado:** `6 tests passed`.

### 7.3 Infrastructure health

```bash
node .em5/infra/infrastructure/index.js health
```

**Esperado:** 8 módulos com status `ok` ou `loaded`.

### 7.4 Hooks ativos

```bash
bash .claude/hooks/model-router.sh
```

**Esperado:** Lista 15 agentes com seus model tiers.

---

## 8. Primeira execução

### 8.1 Setup inicial (1× só)

Abre o projeto no Claude Code:

```bash
claude
# Já está em /agenciaem5
```

Executa:

```
/setup
```

Wizard pergunta:
- Nome da agência
- Seu nome (owner)
- Time size (solo / pequeno / médio)
- Serviços ativos
- Tier de modelo default

Salva em `em5-config.yaml`.

### 8.2 Cria primeiro cliente teste

```
/cliente-novo teste-piloto
```

Pergunta se quer extrair DESIGN.md. Responde "skip" pra primeira vez.

Resultado: `clientes/teste-piloto/` com 13 subpastas.

### 8.3 Daily run

```
/dia
```

@coo Nexus orchestra @traffic Pulse pra auditar contas. Sem contas reais ainda, vai dar relatório vazio mas demonstra fluxo.

---

## 9. Setup do Painel (opcional)

Dashboard visual local.

```bash
cd painel
npm install     # ~330 packages
npm run dev     # abre http://localhost:4321
```

Browser abre painel mostrando:
- KPIs gerais (vazio até ter cliente real)
- Card do `teste-piloto`

Pra build estático:

```bash
npm run build
# Output em painel/dist/
```

Deploy: copia `painel/dist/` pra qualquer hosting estático (Cloudflare Pages, Vercel, Netlify, GitHub Pages).

---

## 10. Setup do Electron Desktop (opcional)

Empacota painel como app desktop.

### Dev

```bash
# Terminal 1
cd painel && npm run dev

# Terminal 2
cd desktop
npm install
npm run dev    # abre janela Electron
```

### Build pra distribuir

```bash
cd painel && npm run build && cd ../desktop

# Mac (.dmg)
npm run build:mac

# Win (.exe)
npm run build:win

# Linux (.AppImage)
npm run build:linux
```

Output em `desktop/dist-app/`.

⚠️ Pré-build: gera ícones reais (vetor placeholder em `desktop/build/icon.svg`). Veja [`desktop/build/README.md`](../desktop/build/README.md).

---

## 11. Setup Paperclip (opcional avançado)

UI visual orquestrada — alternativa ao painel custom.

### 11.1 Instalar Paperclip

```bash
# Pasta SEPARADA do em5
mkdir ~/paperclip-em5 && cd ~/paperclip-em5
npx paperclipai onboard --yes
# Abre http://localhost:3100
```

### 11.2 Criar empresa

Via UI:
- "Create Company"
- Name: `Agência em Cinco`
- Slug: `agencia-em-cinco`

### 11.3 Importar agentes em5

```bash
# Pega API key em Settings → API Keys
export PAPERCLIP_API_URL=http://localhost:3100
export PAPERCLIP_API_KEY=pk_xxx
export PAPERCLIP_COMPANY_ID=$(curl -sS "$PAPERCLIP_API_URL/api/companies" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  | jq -r '.[] | select(.slug=="agencia-em-cinco") | .id')

cd ~/Documents/agenciaem5
bash .em5/_research/paperclip-import/import-agents.sh
```

15 agentes criados em ~2 min. Volta pro UI Paperclip — vê org chart.

📖 Detalhes: [`.em5/_research/paperclip-import/README.md`](../.em5/_research/paperclip-import/README.md)

---

## 12. Troubleshooting

### "claude: command not found"

```bash
# Mac
which claude   # se vazio:
brew install anthropic/claude/claude-code

# Linux
ls ~/.local/bin/claude   # se vazio:
curl -fsSL https://claude.com/install.sh | sh
```

### "COMPOSIO_API_KEY não setada"

```bash
echo $COMPOSIO_API_KEY   # se vazio:
source .env              # carrega .env
# OU edita .env e reabre terminal
```

### "validate-em5 retorna issues"

```bash
node .em5/infra/bin/em5-validate.js 2>&1
# Cola o output completo no issue do GitHub se persistir
```

### "Cliente não aparece no painel"

```bash
# Cliente precisa ter operacao/status.yaml
ls clientes/{slug}/operacao/status.yaml

# Rebuild painel
cd painel && npm run build
```

### "Hook não dispara"

Hooks só funcionam dentro de sessão Claude Code. Pra testar manualmente:

```bash
bash .claude/hooks/model-router.sh    # SessionStart
echo '{"tool_input":{"file_path":"test.md"}}' | bash .claude/hooks/learnings-capture.sh    # PostToolUse
```

### "npm test falha"

```bash
# Reinstala deps
rm -rf node_modules package-lock.json
npm install
npm test
```

### "Asaas MCP não conecta"

```bash
# Verifica token
echo $ASAAS_TOKEN | head -c 20

# Testa API direto (sandbox)
curl -sS https://sandbox.asaas.com/api/v3/customers \
  -H "access_token: $ASAAS_TOKEN" | jq '.errors // "OK"'
```

Se retornar `{"errors":[{"description":"Invalid token"}]}`: token errado, gera novo.

### "Painel build falha"

```bash
cd painel
rm -rf node_modules dist
npm install
npm run build 2>&1 | tail -20
# Cola output se persistir
```

### "Electron não abre janela"

```bash
cd desktop
# Mac: permitir Gatekeeper
xattr -dr com.apple.quarantine dist-app/

# Linux: dar exec
chmod +x dist-app/*.AppImage
```

---

## Próximo passo

Após instalar, vai pro [`MANUAL.md`](MANUAL.md) pra aprender operar dia-a-dia.

---

*em5 v1.3.0 — Guia de Instalação.*
