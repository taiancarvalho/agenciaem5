# em5 — Agência em Cinco minutos

> **Todo processo da agência em ≤ 5 min de input humano.**
> Sistema operacional pra gestor solo de agência de marketing digital.
> 8 agentes especializados via Claude Code + Composio MCP único.

[![v1.1.0](https://img.shields.io/badge/version-1.1.0-blue)](https://github.com/taiancarvalho/agenciaem5)
[![MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

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

---

## ⚡ Skills (≤ 5 min cada)

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
/saude           Health check do sistema
/dia             Daily run de todas contas
/aprender        Consulta learnings antes de criar
/forge           Wizard cria agente/task/playbook
/override        Override @qa (severity=alto, com auditoria)
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

## 📄 License

MIT © Taian Carvalho

---

*em5 v1.1.0 — Agência em Cinco minutos.*
