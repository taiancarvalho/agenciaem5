# em5 — Agência em Cinco minutos

> **Todo processo da agência em ≤ 5 min de input humano.**
> Sistema operacional pra gestor solo de agência de marketing digital.
> 15 agentes Claude Code, Composio MCP, painel visual, integração Asaas BR.

[![v1.3.0](https://img.shields.io/badge/version-1.3.0-blue)](https://github.com/taiancarvalho/agenciaem5)
[![MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Free Forever](https://img.shields.io/badge/free-forever-22c55e)](LICENSE)
[![15 agents](https://img.shields.io/badge/agents-15-5b8dee)](.em5/agents/)
[![Asaas](https://img.shields.io/badge/asaas-BR-yellow)](.em5/integracoes/excecoes.yaml)

---

## 🎯 O que é

em5 é um **sistema operacional pra agência solo** rodando inteiramente em Claude Code:

- 15 agentes especializados (estratégia, tráfego, copy, design, QA, vendas, financeiro)
- 87 tasks executáveis, 19 skills, Constitution v1.3 (13 artigos)
- Workspace nativo por cliente em `.em5/clientes/{slug}/`
- Composio MCP como único gateway externo (Art. IX)
- Asaas integrado pra financeiro BR (PIX/boleto/cartão)
- Painel Astro estático + Electron desktop
- Opcional: integração Paperclip pra UI visual orquestrada

**Princípio central:** se uma skill precisa de mais que 5 min de input humano, é bug de UX → ticket de refator.

---

## ⚡ Quick Start

### Pré-requisitos

- macOS, Linux ou WSL
- Node 20+ + npm
- [Claude Code CLI](https://claude.com/claude-code) instalado e autenticado
- Conta [Composio](https://app.composio.dev/) (gateway MCP)
- (Opcional) Conta [Asaas](https://www.asaas.com) sandbox/prod pra financeiro BR

### Instalação em 3 comandos

```bash
git clone https://github.com/taiancarvalho/agenciaem5.git
cd agenciaem5
npm install
```

### Setup

```bash
cp .env.example .env
# Edita .env com COMPOSIO_API_KEY + ASAAS_TOKEN
```

### Validar

```bash
npm test                          # 6 smoke tests
node .em5/bin/em5-validate.js     # conformidade Constitution
```

### Operar

Abre o projeto no Claude Code. No primeiro comando:

```
/setup                       # configura a agência (1× só)
/cliente-novo nome-cliente   # cria workspace
/dia                         # daily run de todas contas
```

📖 **Manual completo:** [`docs/MANUAL.md`](docs/MANUAL.md)
📖 **Instalação detalhada:** [`docs/INSTALL.md`](docs/INSTALL.md)

---

## 🤖 Agentes (15)

| ID | Persona | Camada | Função |
|----|---------|--------|--------|
| `@ceo` | Atlas 🗺️ | Estratégia | Decisões irreversíveis, novo cliente, conflitos |
| `@coo` | Nexus 🎯 | Orquestração | Workflows completos, delegação |
| `@cs` | Sol ☀️ | Definição/Execução | Onboarding, relatórios, relacionamento |
| `@strategist` | Vera 🧭 | Definição | Estratégia, posicionamento, plano |
| `@traffic` | Pulse 📊 | Execução | Meta Ads, Google Ads, otimização |
| `@copywriter` | Eco ✍️ | Execução | Copy, ângulos, adaptação canal |
| `@designer` | Lux 🎨 | Execução | Criativos, vídeos, UGC |
| `@qa` | Crivo 🔍 | Validação | Gate obrigatório, severity matrix |
| `@arq` | Arq 🏛️ | Construção | Meta-time: spec de componentes novos |
| `@builder` | Cunha 🔨 | Construção | Meta-time: implementa via Forge |
| `@reviewer` | Lima 🧪 | Construção | Meta-time: valida contra Constitution |
| `@vendas` | Caça 🎯 | Definição | Prospect → diagnóstico → proposta → fecha |
| `@fin` | Caixa 💰 | Execução | Mensalidades, Asaas, ROI, MRR |
| `@scout` | Espia 🔍 | Definição | Inteligência competitiva, scrape, SWOT |
| `@whats` | Onda 📱 | Execução | WhatsApp dual-provider, templates, stop rules |

---

## ⚡ Skills (19)

### Operação cliente
```
/setup           Setup inicial
/cliente-novo    Cria workspace de cliente
/onboard         Inicia onboarding
/briefing        Coleta briefing
/campanha        Ciclo completo de campanha
/auditar         Audita conta de ads
/iterar          Itera criativos baixa performance
/relatorio       Gera + envia relatório
/status          Status operacional do cliente
/dia             Daily run de todas contas
```

### Meta-time + extensão
```
/construir       Meta-time descobre + cria componente novo
/forge           Wizard rápido cria agente/task/playbook
/importar-gpt    Adapta customGPT → componente em5
/extrair-design  URL/briefing → DESIGN.md + tokens + preview
/aprender        Consulta learnings antes de criar
/override        Override @qa (severity=alto, com auditoria)
```

### Sistema
```
/saude           Health check do sistema
/validate-em5    Conformidade contra Constitution
/painel          Dashboard visual local (Astro)
/whats-setup     Setup WhatsApp dual-provider
```

---

## 🏛️ Constituição (13 Artigos)

| # | Artigo | Severidade |
|---|--------|------------|
| I | Filesystem First | NON-NEGOTIABLE |
| II | Autoridade do Agente | NON-NEGOTIABLE |
| III | Artefatos sobre Conversa | MUST |
| IV | Contexto Reduzido no Executor | MUST |
| V | Sem Invenção de Escopo | MUST |
| VI | Honestidade do CLI | MUST |
| VII | Conhecimento Modular | SHOULD |
| VIII | Quality Gate Obrigatório | NON-NEGOTIABLE |
| IX | Composio Gateway + Exceções (v1.3) | NON-NEGOTIABLE |
| X | Learnings Perpétuos | MUST |
| XI | Severity Gates | NON-NEGOTIABLE |
| XII | em Cinco Minutos | SHOULD |
| XIII | Construção Self-Service | MUST |

📖 Constituição completa: [`.em5/core/constitution.md`](.em5/core/constitution.md)

---

## 🔒 Gate-Matrix (Severity)

QA usa matriz de severidade em `.em5/core/data/gate-matrix.yaml`:

| Severidade | Ação | Override |
|------------|------|----------|
| 🔴 crítico | Bloqueia absoluto | **NUNCA** |
| 🟠 alto | Bloqueia | Role específica via `/override` |
| 🟡 médio | Revisão solicitada | Auto-fix |
| 🟢 baixo | Aprovado com ressalva | Log em learnings |

---

## 🔌 Integrações Externas

### Composio MCP (gateway default — Art. IX)

Toolsets habilitados:
- Meta Ads
- Google Analytics
- Google Sheets
- Gmail
- Slack
- WhatsApp Business
- Google Drive

### Asaas (exceção formal Art. IX v1.3)

Financeiro BR — PIX, boleto, cartão. Documentado em [`.em5/integracoes/excecoes.yaml`](.em5/integracoes/excecoes.yaml).

### WhatsApp dual-provider

Configurável via `/whats-setup`:
- **Composio** (`whatsapp_business` toolset) — oficial Meta, pago
- **WAHA** selfhosted — free, não-oficial (risco de ban)

---

## 📚 Learnings Perpétuos

`.em5/learnings/{ano-mes}/{categoria}.md` — sistema aprende em loop:

- `qa-bloqueios.md` — padrões de bloqueio
- `qa-overrides.md` — overrides + outcomes
- `copy-vitorias.md` — ângulos que converteram
- `traffic-padroes.md` — configs ROAS > 3
- `cs-objecoes.md` — objeções vencidas
- `strategist-hipoteses.md` — validações
- `designer-padroes.md` — layouts performantes
- `system-errors.md` — erros do sistema
- `mcp-excecoes.md` — auditoria MCPs não-default

Use `/aprender` antes de criar campanha — sistema sugere padrões aplicáveis.

---

## 🛠️ Forge (criar agentes/tasks/playbooks)

Dois caminhos:

### Meta-time `/construir` (recomendado)
User descreve necessidade em português → @arq Arq entrevista (≤ 5 min) → @builder Cunha implementa → @reviewer Lima valida → componente em produção.

```
/construir "preciso gerar contratos PDF por cliente"
```

### Wizard `/forge` (rápido)
Inquirer direto pra criar agente/task/playbook sem entrevista.

```bash
/forge agent     # ou /forge task | /forge playbook
```

Templates em `.em5/setup/forge-templates/`.

---

## 🖥️ Painel + Desktop

### Painel Astro estático (local)

```bash
cd painel
npm install
npm run dev    # localhost:4321
```

3 páginas:
- `/` — Cards de todos clientes ordenados por severity
- `/financeiro` — MRR, ARR, ROI por cliente, inadimplência
- `/cliente/{slug}` — Drill-down individual + DESIGN.md preview

📖 Detalhes: [`painel/README.md`](painel/README.md)

### Electron desktop (Win/Mac/Linux)

```bash
cd desktop
npm install
npm run dev   # janela Electron carregando o painel
```

Build pra release:
```bash
npm run build:mac    # .dmg
npm run build:win    # .exe (NSIS)
npm run build:linux  # .AppImage
```

📖 Detalhes: [`desktop/README.md`](desktop/README.md)

---

## 🔗 Paperclip Integration (opcional)

Alternativa visual ao painel custom — orquestração estilo holding com UI mobile-ready:

```bash
mkdir ~/paperclip-em5 && cd ~/paperclip-em5
npx paperclipai onboard --yes
# UI em localhost:3100
```

Importa os 15 agentes em5 como empresa "Agência em Cinco":

```bash
bash .em5/_research/paperclip-import/import-agents.sh
```

📖 Pacote completo: [`.em5/_research/paperclip-import/README.md`](.em5/_research/paperclip-import/README.md)

---

## 🧪 Validação contínua

### Smoke tests (CI/CD)

```bash
npm test    # 6 vitest tests
```

Cobertura:
1. `/validate-em5` retorna 0 issues
2. Infrastructure health 8 módulos OK
3. Constitution tem 13 artigos required
4. Todos 15 agentes têm `model_tier`
5. `em5-config.yaml` versão 1.3+ com tagline
6. Composio + Asaas vs `excecoes.yaml`

### GitHub Actions

- [`.github/workflows/validate.yml`](.github/workflows/validate.yml) — roda em PRs + push
- [`.github/workflows/release.yml`](.github/workflows/release.yml) — release auto em tag `v*`

---

## 📦 CLI

```bash
npx em5@latest install     # Setup wizard
npx em5@latest upgrade     # Atualiza versão preservando customizações
npx em5@latest forge       # Wizard cria componente
npx em5@latest version     # Mostra versão
```

---

## 🚀 Roadmap

Veja [`CHANGELOG.md`](CHANGELOG.md) pro histórico completo.

### v1.4 planejado
- [ ] Paperclip integration plugins (Composio + Asaas)
- [ ] Painel pages adicionais (`/learnings`, `/concorrentes`)
- [ ] Cobertura de testes ampliada
- [ ] Logo real (icon.icns/.ico/.png)

### v2.0 visão
- [ ] NPM publish público
- [ ] Marketplace de playbooks comunidade
- [ ] Multi-user via Paperclip auth
- [ ] Cloud-hosted opcional (Tailscale)

---

## 🤝 Contribuição

Open source MIT. Issues + PRs bem-vindos.

### Princípios de contribuição

- Toda PR roda `/validate-em5` + smoke tests (CI bloqueia se falhar)
- Mudanças em agentes/tasks passam pelo @reviewer Lima (Art. XIII Construção Self-Service)
- Constitution Art. I–XII inegociáveis — mudanças exigem proposta formal

---

## 🎯 Slogan dev

> **"Se passou de 5, refatora."**

Qualquer skill que extrapole 5 min de input humano = bug de UX → ticket de refator.

---

## 📄 License

MIT © Taian Carvalho. Free forever. Open source. Contribuições bem-vindas.

---

*em5 v1.3.0 — Agência em Cinco minutos.*
*15 agentes + 19 skills + 13 artigos constitucionais.*
*Composio default + Asaas exceção (BR financeiro). Hooks ativos (learnings auto + model tier).*
