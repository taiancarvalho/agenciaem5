# em5 — Agência em Cinco minutos

> **Todo processo da agência em ≤ 5 min de input humano.**
> Sistema operacional pra gestor solo de agência de marketing digital.
> 8 agentes especializados via Claude Code + Composio MCP único.

[![v1.2.0](https://img.shields.io/badge/version-1.2.0-blue)](https://github.com/taiancarvalho/agenciaem5)
[![MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Free Forever](https://img.shields.io/badge/free-forever-22c55e)](LICENSE)

---

## 🚀 Quick Start

```bash
npx em5@latest install
cd seu-projeto
# abra Claude Code
/setup
/cliente-novo nome-do-cliente
```

Setup completo em **≤ 5 minutos** — wizard pergunta apenas o essencial.

---

## 🎯 Agentes

| ID | Persona | Camada | Função |
|----|---------|--------|--------|
| @ceo | Atlas 🗺️ | Estratégia | Decisões de negócio, novo cliente |
| @coo | Nexus 🎯 | Orquestração | Workflows completos, delegação |
| @cs | Sol ☀️ | Definição/Execução | Onboarding, relacionamento cliente |
| @strategist | Vera 🧭 | Definição | Estratégia, posicionamento |
| @traffic | Pulse 📊 | Execução | Meta Ads, Google Ads, otimização |
| @copywriter | Eco ✍️ | Execução | Copy, ângulos, adaptação canal |
| @designer | Lux 🎨 | Execução | Criativos, vídeos, UGC |
| @qa | Crivo 🔍 | Validação | Gate obrigatório antes de publicar |
| @arq | Arq 🏛️ | Construção | Meta-time: entrevista + spec de componentes novos |
| @builder | Cunha 🔨 | Construção | Meta-time: implementa via Forge templates |
| @reviewer | Lima 🧪 | Construção | Meta-time: valida componentes vs Constitution |
| @vendas | Caça 🎯 | Definição | Prospect → diagnóstico → proposta → fechamento |
| @fin | Caixa 💰 | Execução | Mensalidades, inadimplência, ROI, MRR |
| @scout | Espia 🔍 | Definição | Inteligência competitiva, scrape, SWOT |
| @whats | Onda 📱 | Execução | WhatsApp dual-provider, templates, stop rules |

---

## ⚡ Skills (≤ 5 min cada)

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

## 🏛️ Constituição (12 Artigos)

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
| IX | Composio como Gateway Externo | NON-NEGOTIABLE |
| X | Learnings Perpétuos | MUST |
| XI | Severity Gates | NON-NEGOTIABLE |
| XII | em Cinco Minutos | SHOULD |
| XIII | Construção Self-Service | MUST |

Veja [`.em5/core/constitution.md`](.em5/core/constitution.md) completo.

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

## 🔌 Composio MCP (único gateway externo)

Toolsets habilitados via Composio:
- Meta Ads
- Google Analytics
- Google Sheets
- Gmail
- Slack
- WhatsApp Business
- Google Drive

**Zero MCPs paralelos.** Art. IX da constitution.

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

Use `/aprender` antes de criar campanha — sistema sugere padrões aplicáveis.

---

## 🛠️ Forge (criar agentes/tasks/playbooks)

```bash
/forge agent      # novo agente especializado
/forge task       # nova task pra agente existente
/forge playbook   # playbook de nicho ou canal
```

Wizard inquirer ≤ 5 min. Templates em `.em5/setup/forge-templates/`.

---

## 📦 CLI

```bash
npx em5@latest install     # Setup wizard
npx em5@latest upgrade     # Atualiza versão preservando customizações
npx em5@latest forge       # Wizard de criação
npx em5@latest version     # Mostra versão
```

---

## 🎯 Slogan dev

> **"Se passou de 5, refatora."**

Qualquer skill que extrapole 5 min de input humano = bug de UX → ticket de refator.

---

## 🖥️ Painel + Desktop

- `painel/` — Dashboard Astro estático local
- `desktop/` — Wrapper Electron Win/Mac/Linux (.dmg/.exe/.AppImage)

Veja [`painel/README.md`](painel/README.md) e [`desktop/README.md`](desktop/README.md).

## 📄 License

MIT © Taian Carvalho. Free forever. Open source. Contribuições bem-vindas.

---

*em5 v1.2.0 — Agência em Cinco minutos.*
*12 agentes (Atlas, Nexus, Sol, Vera, Pulse, Eco, Lux, Crivo, Arq, Cunha, Lima, Vendas/Caça, Fin/Caixa, Scout/Espia, Whats/Onda) + 18 skills + 13 artigos constitucionais.*
