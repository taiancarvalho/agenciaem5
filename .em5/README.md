# `.em5/` — Arquitetura

> Sistema operacional da agência. **4 dirs apenas** — clareza estrutural priorizada.

## Mapa rápido

```
.em5/
├── agents/        # Agentes: persona + tasks + playbook (tudo do agente junto)
├── workflows/     # Pipelines yaml + roadmap + rotinas
├── system/        # Governance: constitution + rules + templates + learnings
└── infra/         # Dev/Tools: bin + hooks + setup + integrações
```

## Onde achar X?

| Quero... | Path |
|----------|------|
| Persona de um agente | `agents/{agente}/persona.md` |
| Tasks de um agente | `agents/{agente}/tasks/` |
| Playbook (referência expert) de agente | `agents/{agente}/playbook.md` |
| Workflows (pipelines) | `workflows/*.yaml` |
| Roadmap de workflows | `workflows/_roadmap.md` |
| Rotinas/cron schedule | `workflows/_rotinas.md` |
| Constitution (13 artigos) | `system/constitution.md` |
| Regras estruturais | `system/rules/` |
| Checklists QA | `system/checklists/` |
| Templates (HTML/MD/YAML) | `system/templates/` |
| Aprendizados versionados | `system/learnings/` |
| Scripts CLI | `infra/bin/` |
| Hooks do Claude Code | `infra/hooks/` |
| Wizard setup | `infra/setup/` |
| Templates do Forge (meta-time) | `infra/forge/` |
| Integrações MCP | `infra/integracoes/` |
| Tools (design-extractor, etc) | `infra/tools/` |
| Documentação geral | `infra/docs/` |

## Dirs detalhadas

### `agents/`

Cada agente tem **3 arquivos** (todos opcionais exceto persona):

```
agents/
├── traffic/
│   ├── persona.md      ← definição YAML do agente (obrigatório)
│   ├── playbook.md     ← referência expert do domínio (referenciado por tasks)
│   └── tasks/          ← tasks executáveis pelo agente
│       ├── auditar-conta.md
│       ├── otimizar-campanha.md
│       └── google-ads/  ← subdir opcional por canal
│           └── estruturar-search.md
├── copywriter/
│   ├── persona.md
│   ├── playbook.md
│   └── tasks/
└── ... (15 agentes)
```

**Por que junto:** task `auditar-conta.md` referencia `playbook.md` — antes era em outro dir, gerava frankstein. Agora tudo do agente fica num único lugar.

### `workflows/`

Pipelines yaml (83) + 2 docs source-of-truth:

```
workflows/
├── _roadmap.md           ← catálogo 84 workflows (status implementação)
├── _rotinas.md           ← cadência (diário/semanal/mensal/etc) + cron /schedule
├── ciclo-campanha.yaml   ← campanha completa
├── relatorio-cliente.yaml
├── auditoria-conta.yaml
├── cobranca-mensal.yaml
└── ... (83 yamls)
```

**Por que fora de `core/`:** `core/` vago. Workflow é cidadão de primeira classe — merece dir próprio.

### `system/`

Governance + assets compartilhados:

```
system/
├── AGENTS.md              ← spec agnóstico Anthropic
├── constitution.md        ← 13 artigos princípios (cidadão #1)
├── constitution-index.md  ← TOC rápido
├── comportamento-agente.md
├── rules/                 ← mecânica operacional
│   ├── agent-authority.md
│   ├── agent-handoff.md
│   └── workflow-execution.md
├── checklists/            ← QA gates por entregável
├── data/                  ← yaml configs (janelas-analise, canais-suportados, etc)
├── templates/             ← HTML/MD templates (relatorio-cliente.html, etc)
└── learnings/             ← aprendizados versionados
    ├── ERRORS.md
    ├── FEATURE_REQUESTS.md
    ├── LEARNINGS.md
    └── 2026-MM/           ← arquivo mensal
```

**Por que consolidado:** Constitution + Rules eram "regras" em 2 dirs separados. Agora todo "como o sistema pensa" mora em `system/`.

### `infra/`

Dev/tooling/config:

```
infra/
├── bin/                ← scripts CLI (em5-init, em5-validate, em5-forge, em5-upgrade)
├── hooks/              ← registry hooks Claude Code
├── setup/              ← wizard config
│   ├── em5-config.yaml ← config canônico template
│   ├── system-onboarding.md
│   └── forge-templates/← templates pra @builder gerar componentes
├── forge/              ← meta-time templates
│   └── _template/      ← spec/learning templates do CONSTRUÇÃO
├── integracoes/        ← excecoes Composio MCP
├── infrastructure/     ← config infra (index.js)
├── tools/              ← utilities (design-extractor)
└── docs/               ← documentação geral
    └── example-client/ ← exemplo onboarding
```

**Por que consolidado:** antes eram 8 dirs separados (bin/tools/hooks/setup/integracoes/infrastructure/docs/construcao). Sem critério claro de separação. Agora 1 dir `infra/` cobre tudo "não-domínio".

## Histórico

Reorganização aplicada em 2026-05-19. Antes: **14 dirs** top-level no `.em5/` — frankstein orgânico. Depois: **4 dirs** com responsabilidades claras.

Backup pre-reorg disponível na tag `backup/pre-reorg-2026-05-19`.

## Regra de manutenção

Ao criar novo arquivo, escolher dir pelo princípio:

1. **É de um agente específico?** → `agents/{agente}/`
2. **É pipeline executável?** → `workflows/`
3. **É regra/governance/template compartilhado?** → `system/`
4. **É dev/config/tool?** → `infra/`

Em dúvida, perguntar: "se eu deletar esse dir, o que quebra?" — se resposta = "1 agente", vai em `agents/`. Se "vários workflows", vai em `system/`. Se "tooling dev", vai em `infra/`.

---

*em5 v1.5 — Arquitetura limpa, 4 dirs, zero frankstein.*
