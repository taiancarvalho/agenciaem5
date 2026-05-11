# OMG.sys

> One Man Gang — Sistema Operacional para Agências de Marketing Digital

Framework operacional baseado em agentes de IA para gerenciar toda a operação de uma agência de marketing — do onboarding do cliente à entrega de relatórios.

## O que é

OMG.sys é um conjunto de **agentes especializados**, **tasks executáveis**, **templates**, **workflows**, **skills** e **checklists** que transformam a operação de marketing em processo padronizado e replicável.

**Não é SaaS. Não é ferramenta.** É um framework que roda dentro do seu projeto via Claude Code.

**Ferramentas externas:** todas via Composio MCP — Meta Ads, Google Analytics, Gmail, Slack, Sheets.

## Instalação

```bash
npx omgsys-core@latest install
```

O installer roda o wizard de setup e pergunta:
- Nome da sua agência e do usuário
- Quais serviços você entrega
- Nome fantasia de cada agente (ou usa os padrões)
- Composio API Key e quais integrações ativar

Ou execute `/setup` dentro do Claude Code para rodar o wizard manualmente.

## Agentes

Cada agente tem um **ID funcional** (imutável) e um **nome fantasia** (configurável no setup).

| ID | Nome Padrão | Quando Usar |
|----|-------------|-------------|
| @ceo | Atlas | Estratégia da agência, decisões de negócio, novo cliente |
| @coo | Marcos | Executar workflows, orquestrar operações, delegar tarefas |
| @cs | Sol | Onboarding, setup técnico, relatórios ao cliente |
| @strategist | Vera | Plano estratégico, análise de briefing, posicionamento |
| @traffic | Max | Campanhas pagas, otimização, relatórios de tráfego |
| @copywriter | Cal | Copy, ângulos, adaptação por canal |
| @designer | Lux | Criativos visuais, vídeos, UGC |
| @qa | Zara | Validação obrigatória antes de qualquer publicação |

> Os agentes também respondem pelo nome fantasia configurado. `@Atlas` funciona igual a `@ceo`.

## Fluxo Padrão

```
Você → @ceo (traduz intenção) → @coo (lê workflow, delega com contexto mínimo)
     → agente especializado (recebe cliente + objetivo + arquivo)
     → salva output em arquivo → próximo agente lê
     → @qa valida → cliente recebe
```

**Regra absoluta:** nada vai ao cliente sem veredicto APROVADO do @qa.

## Skills

| Skill | Quando Usar |
|-------|-------------|
| `/setup` | Configurar ou reconfigurar o sistema |
| `/novo-cliente` | Criar workspace de novo cliente |
| `/onboarding` | Iniciar onboarding de cliente |
| `/status-cliente` | Resumo operacional de um cliente |
| `/relatorio` | Gerar e enviar relatório de performance |
| `/criar-campanha` | Ciclo completo de campanha |
| `/auditoria-conta` | Auditar conta de anúncios |
| `/iterar-criativo` | Iterar criativos com baixa performance |
| `/briefing` | Coletar briefing estruturado |
| `/saude-sistema` | Health check completo do sistema |

## Estrutura

```
.claude/
├── CLAUDE.md              # Memória do sistema — lido automaticamente
├── settings.json          # MCP servers (Composio, Context7)
├── agents/                # 8 agentes registrados
│   ├── ceo.md
│   ├── coo.md
│   ├── cs.md
│   ├── strategist.md
│   ├── traffic.md
│   ├── copywriter.md
│   ├── designer.md
│   └── qa.md
└── commands/              # 10 skills
    ├── setup.md
    ├── novo-cliente.md
    ├── onboarding.md
    ├── status-cliente.md
    ├── relatorio.md
    ├── criar-campanha.md
    ├── auditoria-conta.md
    ├── iterar-criativo.md
    ├── briefing.md
    └── saude-sistema.md

.agencyos/
├── agents/                # Definições completas dos 8 agentes
├── setup/
│   ├── system-onboarding.md   # Wizard de configuração inicial
│   └── omgsys-config.yaml     # Template de configuração
├── core/
│   ├── constitution.md        # Princípios inegociáveis
│   ├── tasks/                 # 53 tasks por agente
│   ├── templates/             # 14 templates de documentos
│   ├── data/                  # 8 arquivos de dados YAML
│   ├── workflows/             # 6 workflows multi-agente
│   └── checklists/            # 3 checklists de validação
└── clientes/                  # Workspaces dos clientes

omgsys-config.yaml             # Configuração da agência (gerado no setup)
```

## Contagem de Arquivos

| Tipo | Total |
|------|-------|
| Agentes (.claude/agents/) | 8 |
| Tasks | 53 |
| Templates | 14 |
| Data files | 8 |
| Workflows | 6 |
| Checklists | 3 |
| Skills | 10 |

## Princípios

1. **Filesystem First:** tudo é arquivo, arquivo tem lugar previsível
2. **Agente = Papel, Task = Execução:** 1 agente, 1 domínio de responsabilidade
3. **Artefatos sobre Conversa:** agentes se conectam por arquivos, não por diálogo
4. **Contexto Reduzido:** @coo delega com contexto mínimo — só o que o agente precisa
5. **QA Gate Obrigatório:** nada vai ao cliente sem veredicto APROVADO do @qa
6. **Composio como Gateway:** todas as integrações externas passam pelo Composio MCP

## Configuração

Após instalar, a configuração fica em `omgsys-config.yaml`:

```yaml
agency:
  name: "Minha Agência"
  owner: "Seu Nome"

agents:
  ceo:
    fantasy_name: "Atlas"
  coo:
    fantasy_name: "Marcos"
  # ... etc

integrations:
  composio:
    api_key: "${COMPOSIO_API_KEY}"
    tools:
      meta_ads: true
      google_analytics: true
      gmail: true
```

## Desenvolvimento

### Status

- ✅ Fase 1: Conteúdo operacional completo (agents, tasks, templates, data, workflows, checklists)
- ✅ Fase 2: CLAUDE.md + skills + sistema de configuração + OMG.sys rebrand
- 🔄 Fase 3: NPM package com wizard interativo

## License

MIT
