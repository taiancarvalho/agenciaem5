# em5 — Guia de Construção

> Este documento existe para que qualquer agente possa retomar a construção do em5 de onde parou, sem perder contexto. Sempre leia antes de trabalhar no projeto.

---

## Visão Geral

**em5 (Agência em5)** é um framework operacional para agências de marketing digital, distribuído como **pacote NPM** instalável via `npx em5-core@latest install`.

**Princípios fundamentais:**
- `AGENTE = PAPEL, TASK = EXECUÇÃO`
- 1 agente = 1 domínio de responsabilidade
- Filesystem = fonte da verdade
- Agentes se conectam por artefatos, não por conversa
- Executor trabalha com contexto reduzido
- Composio MCP = único gateway para ferramentas externas (Artigo IX)

---

## Arquitetura: 3 Camadas

| Camada | ID | Fantasy Name | Responsabilidade |
|--------|----|-------------|-----------------|
| 1 — Estratégia | @ceo | Atlas | Negócio, decisões, portfólio, delega para @coo |
| 2 — Orquestração | @coo | Nexus | Lê workflow, delega com contexto mínimo |
| 2 — Definição | @strategist | Vera | Estratégia, briefing, posicionamento |
| 2 — Relacionamento | @cs | Sol | Onboarding, setup técnico, cliente |
| 3 — Execução | @traffic | Pulse | Mídia paga, campanhas, otimização |
| 3 — Execução | @copywriter | Eco | Copy, ângulos, adaptação por canal |
| 3 — Execução | @designer | Lux | Criativos visuais, vídeos, UGC |
| 3 — Gate | @qa | Crivo | Validação obrigatória antes de publicar |

---

## Estrutura do Repositório

```
.em5/                          ← Framework instalado
├── agents/                       ← 8 agentes (personas completas)
│   ├── ceo.md
│   ├── coo.md
│   ├── cs.md
│   ├── strategist.md
│   ├── traffic.md
│   ├── copywriter.md
│   ├── designer.md
│   └── qa.md
├── core/
│   ├── constitution.md           ← Princípios inegociáveis (v1.1 — Artigo IX Composio)
│   ├── tasks/                    ← Tasks por agente
│   │   ├── ceo/                  ← 5 tasks
│   │   ├── coo/                  ← 3 tasks
│   │   ├── cs/                   ← 11 tasks (incl. preparar-reuniao, gerar-proposta)
│   │   ├── strategist/           ← 8 tasks (incl. analisar-concorrentes)
│   │   ├── traffic/              ← 11 tasks (incl. auditar-conta-google)
│   │   │   └── google-ads/       ← tasks específicas Google Ads
│   │   ├── copywriter/           ← 8 tasks (incl. social-media tasks)
│   │   ├── designer/             ← 8 tasks
│   │   └── qa/                   ← 6 tasks
│   ├── data/                     ← 8 arquivos de dados
│   │   ├── canais-suportados.yaml
│   │   ├── estrutura-pastas.yaml
│   │   ├── gatilhos-mentais.yaml
│   │   ├── kpis-por-objetivo.yaml
│   │   ├── nomenclatura-campanhas.yaml
│   │   ├── estrutura-base-campanhas.yaml
│   │   ├── janelas-analise.yaml
│   │   └── tipos-publicos.yaml
│   ├── templates/                ← Templates por tipo
│   ├── workflows/                ← 6 workflows
│   │   ├── onboarding-cliente.yaml
│   │   ├── ciclo-campanha.yaml
│   │   ├── iteracao-criativa.yaml
│   │   ├── google-ads.yaml
│   │   ├── social-media.yaml
│   │   └── lancamento.yaml
│   └── checklists/               ← 3 checklists
├── setup/
│   ├── system-onboarding.md      ← Wizard de configuração
│   └── em5-config.yaml        ← Template de configuração
├── rules/                        ← 3 arquivos de regras
└── clientes/                     ← Workspaces dos clientes

.claude/
├── CLAUDE.md                     ← Entry point do sistema
├── settings.json                 ← Composio + Context7 MCPs
├── agents/                       ← 8 wrappers leves
└── commands/                     ← 10 skills

em5-config.yaml                ← Configuração da agência (gerado pelo /setup)
```

---

## Pacote NPM

```
em5-core/
├── package.json          ← name: "em5-core", bin: "em5"
├── bin/em5.js         ← CLI installer
├── .em5/              ← Framework completo
├── .claude/              ← Agents + commands
└── README.md
```

### Installer (`npx em5-core@latest install`)

1. Wizard interativo (`/setup`): nome da agência, serviços, agentes, Composio API Key
2. Gera `em5-config.yaml` personalizado
3. Gera `.claude/CLAUDE.md` com dados reais da agência
4. Configura MCPs: Composio + Context7
5. Sugere primeiro passo: `@ceo`

---

## Integrações Externas

Todas via **Composio MCP** — Artigo IX da Constituição:

| Ferramenta | Composio Tool |
|-----------|--------------|
| Meta Ads | meta_ads |
| Google Analytics | google_analytics |
| Google Ads | (via analytics) |
| Gmail | gmail |
| Slack | slack |
| Google Sheets | googlesheets |

**Context7** = lookup de documentação quando agente não sabe os parâmetros.

---

## Status da Build (v1.0)

| Componente | Status |
|-----------|--------|
| 8 agentes com IDs funcionais | ✅ |
| 8 `.claude/agents/` (wrappers) | ✅ |
| 10 `.claude/commands/` (skills) | ✅ |
| `.claude/CLAUDE.md` | ✅ |
| `constitution.md` v1.1 (Artigo IX) | ✅ |
| 8 data files | ✅ |
| 6 workflows | ✅ |
| Tasks: ceo (5), coo (3), cs (11), strategist (8), traffic (11), copywriter (8), designer (8), qa (6) | ✅ |
| `em5-config.yaml` template | ✅ |
| `system-onboarding.md` | ✅ |
| NPM wizard interativo | 🔄 Fase 3 |

---

*em5 BUILD-GUIDE v1.0*
