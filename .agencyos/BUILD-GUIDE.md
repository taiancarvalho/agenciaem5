# OMG.sys — Guia de Construção

> Este documento existe para que qualquer agente possa retomar a construção do OMG.sys de onde parou, sem perder contexto. Sempre leia antes de trabalhar no projeto.

---

## Visão Geral

**OMG.sys** (One Man Gang) é um framework operacional para agências de marketing digital, distribuído como **pacote NPM** instalável via `npx omgsys-core install`.

**Princípios fundamentais:**
- `AGENTE = PAPEL, TASK = EXECUÇÃO`
- 1 agente = 1 domínio de responsabilidade
- Filesystem = fonte da verdade
- Agentes se conectam por artefatos, não por conversa
- Executor trabalha com contexto reduzido
- **Composio MCP** = gateway único para todas as integrações externas
- **Context7** = lookup de documentação quando agente não sabe parâmetros de ferramenta

---

## Arquitetura: 3 Camadas

| Camada | ID Funcional | Nome Padrão | Responsabilidade |
|--------|-------------|-------------|------------------|
| 1 — Estratégia | @ceo | Atlas | Governança, decisões de negócio, portfólio |
| 1 — Operacional | @coo | Marcos | Orquestração, leitura de workflows, delegação |
| 2 — Definição | @cs | Sol | Onboarding, setup técnico, gestão do cliente |
| 2 — Definição | @strategist | Vera | Estratégia, briefing, ICP, posicionamento |
| 3 — Execução | @traffic | Max | Mídia paga, campanhas, otimização |
| 3 — Execução | @copywriter | Cal | Copy, ângulos, adaptação por canal |
| 3 — Execução | @designer | Lux | Criativos visuais, vídeos, UGC |
| 3 — Qualidade | @qa | Zara | Validação obrigatória antes da publicação |

---

## Estrutura do Produto

### Instalado na agência do usuário

```
agencia-do-usuario/
├── omgsys-config.yaml            ← Configuração gerada no setup
├── .agencyos/
│   ├── agents/                   ← 8 agentes (definições completas)
│   ├── setup/
│   │   ├── system-onboarding.md  ← Wizard de setup inicial
│   │   └── omgsys-config.yaml    ← Template de configuração
│   ├── core/
│   │   ├── constitution.md       ← Princípios inegociáveis
│   │   ├── tasks/                ← 53 tasks por agente
│   │   ├── templates/            ← 14 templates
│   │   ├── data/                 ← 8 data files YAML
│   │   ├── workflows/            ← 6 workflows
│   │   └── checklists/           ← 3 checklists
│   └── clientes/                 ← Workspaces
│       └── _template/
└── .claude/
    ├── CLAUDE.md                 ← Gerado pelo setup, personalizado
    ├── settings.json             ← MCP servers configurados
    ├── agents/                   ← 8 arquivos leves (apontam para .agencyos/agents/)
    │   └── ceo.md / coo.md / ...
    └── commands/                 ← 10 skills
        └── setup.md / novo-cliente.md / ...
```

### Pacote NPM

```
omgsys-core/
├── package.json                  ← name: "omgsys-core"
├── bin/omgsys.js                 ← CLI installer
├── agents/
├── core/
├── clientes/_template/
└── README.md
```

---

## Agentes

### Prontos

| ID | Arquivo `.agencyos/agents/` | Arquivo `.claude/agents/` | Status |
|----|----------------------------|--------------------------|--------|
| @ceo | `ceo.md` | `ceo.md` | ✅ |
| @coo | `coo.md` | `coo.md` | ✅ |
| @cs | `cs.md` | `cs.md` | ✅ |
| @strategist | `strategist.md` | `strategist.md` | ✅ |
| @traffic | `traffic.md` | `traffic.md` | ✅ |
| @copywriter | `copywriter.md` | `copywriter.md` | ✅ |
| @designer | `designer.md` | `designer.md` | ✅ |
| @qa | `qa.md` | `qa.md` | ✅ |

> Arquivos legados (`agency-master.md`, `gerente.md`, `estrategista.md`, `gestor-trafego.md`, `qa-campanha.md`) mantidos como aliases durante transição.

### Padrão de arquivo `.claude/agents/`

Arquivo leve — não duplica conteúdo:

```markdown
---
name: {id}
description: |
  {2-3 linhas para o Claude decidir quando ativar automaticamente}
---

Leia `.agencyos/agents/{id}.md` e adote a persona completamente.
Leia `omgsys-config.yaml` para saber nome fantasia, agência, serviços.

**Ferramentas externas:** use Composio MCP para todas as integrações.
Se não souber como usar: consulte Context7 primeiro.
```

---

## Tasks

### Padrão de arquivo

```markdown
---
name: nome-da-task
agent: id-do-agente
description: O que essa task faz
inputs:
  - arquivo de entrada necessário
outputs:
  - arquivo produzido ao final
elicit: true/false
---

# Título da Task

## Objetivo
## Passo a passo
## Output esperado
```

### Status por Agente

**@ceo — 4 tasks:**
- [x] criar-pasta-cliente.md
- [x] listar-clientes.md
- [x] status-cliente.md
- [x] health-sistema.md

**@coo — tasks de orquestração:**
- [x] Lógica embutida no agente via workflows

**@cs — 11 tasks:**
- [x] iniciar-onboarding.md
- [x] coletar-briefing.md
- [x] gerar-briefing-final.md
- [x] listar-acessos.md
- [x] validar-tracking.md
- [x] registrar-status-tecnico.md
- [x] registrar-interacao.md
- [x] gerar-proximos-passos.md
- [x] enviar-relatorio.md
- [x] preparar-reuniao.md  ← novo
- [x] gerar-proposta.md  ← novo

**@strategist — 8 tasks:**
- [x] analisar-briefing.md
- [x] validar-objetivo-real.md
- [x] definir-posicionamento.md
- [x] criar-plano-estrategico.md
- [x] definir-funil-macro.md
- [x] criar-hipoteses.md
- [x] analisar-call.md
- [x] analisar-concorrentes.md  ← novo

**@traffic — 11 tasks:**
- [x] auditar-conta.md
- [x] mapear-publicos.md
- [x] estruturar-campanha.md
- [x] solicitar-criativos.md
- [x] monitorar-performance.md
- [x] otimizar-campanha.md
- [x] gerar-relatorio.md
- [x] modo-cro.md
- [x] modo-growth.md
- [x] auditar-conta-google.md  ← novo
- [x] mapear-keywords.md

**@copywriter — 7 tasks:**
- [x] analisar-icp.md
- [x] criar-angulos.md
- [x] criar-conceitos.md
- [x] escrever-copy.md
- [x] adaptar-canal.md
- [x] registrar-peca-log.md
- [x] iterar-com-base-em-performance.md

**@designer — 8 tasks:**
- [x] ler-branding.md
- [x] definir-conceito-visual.md
- [x] gerar-imagem.md
- [x] gerar-video.md
- [x] gerar-ugc.md
- [x] versionar-criativo.md
- [x] registrar-log-criativo.md
- [x] iterar-criativo.md

**@qa — 6 tasks:**
- [x] validar-copy.md
- [x] validar-criativo.md
- [x] validar-campanha.md
- [x] validar-landing-page.md
- [x] emitir-veredicto.md
- [x] registrar-qa.md

---

## Data Files

Em `.agencyos/core/data/`:

| Arquivo | Status |
|---------|--------|
| `estrutura-pastas.yaml` | ✅ |
| `canais-suportados.yaml` | ✅ |
| `kpis-por-objetivo.yaml` | ✅ |
| `gatilhos-mentais.yaml` | ✅ |
| `nomenclatura-campanhas.yaml` | ✅ |
| `estrutura-base-campanhas.yaml` | ✅ novo |
| `janelas-analise.yaml` | ✅ novo |
| `tipos-publicos.yaml` | ✅ novo |

---

## Workflows

Em `.agencyos/core/workflows/`:

| Arquivo | Status | Observação |
|---------|--------|------------|
| `onboarding-cliente.yaml` | ✅ | |
| `ciclo-campanha.yaml` | ✅ | v1.1 — ordem corrigida (solicitar-criativos antes de produzir-criativos) |
| `iteracao-criativa.yaml` | ✅ | |
| `google-ads.yaml` | ✅ novo | Fluxo específico para Google Ads |
| `social-media.yaml` | ✅ novo | Conteúdo orgânico |
| `lancamento.yaml` | ✅ novo | Pré/durante/pós-lançamento |

---

## Skills

Em `.claude/commands/`:

| Arquivo | Status |
|---------|--------|
| `setup.md` | ✅ |
| `novo-cliente.md` | ✅ |
| `onboarding.md` | ✅ |
| `status-cliente.md` | ✅ |
| `relatorio.md` | ✅ |
| `criar-campanha.md` | ✅ |
| `auditoria-conta.md` | ✅ |
| `iterar-criativo.md` | ✅ |
| `briefing.md` | ✅ |
| `saude-sistema.md` | ✅ |

---

## Templates

Em `.agencyos/core/templates/` — **14/14 ✅**

---

## Checklists

Em `.agencyos/core/checklists/` — **3/3 ✅**

---

## Estado Atual do Projeto

### Concluído
- [x] Constitution (`.agencyos/core/constitution.md`)
- [x] CLAUDE.md (`.claude/CLAUDE.md`) — personalizado com sistema de aliases
- [x] omgsys-config.yaml — template de configuração
- [x] system-onboarding.md — wizard de setup inicial
- [x] 8 agentes em `.agencyos/agents/` (IDs funcionais)
- [x] 8 agentes em `.claude/agents/` (arquivos leves)
- [x] 10 skills em `.claude/commands/`
- [x] Tasks — **53/53 ✅**
- [x] Templates — **14/14 ✅**
- [x] Data files — **8/8 ✅**
- [x] Workflows — **6/6 ✅**
- [x] Checklists — **3/3 ✅**
- [x] Estrutura de pastas de clientes (`.agencyos/clientes/_template/`)
- [x] package.json (name: omgsys-core)
- [x] README.md atualizado
- [x] AGENTS.md atualizado

### Pendente
- [ ] Renomear `.agencyos/` → `.omgsys/` (requer atualizar todos os paths)
- [ ] Atualizar `constitution.md` mencionando Composio como gateway padrão
- [ ] Package NPM com wizard interativo (Fase 3)
- [ ] Publicar no NPM como `omgsys-core`

---

## Regras de Construção

1. **Não inventar conteúdo.** Toda lógica está nos docs originais ou nos agentes já construídos.
2. **Seguir o padrão de task.** Frontmatter YAML + objetivo + passo-a-passo.
3. **Seguir o padrão de agente.** `.claude/agents/` é leve; `.agencyos/agents/` é completo.
4. **Manter contexto enxuto.** @coo só envia ao agente: cliente + objetivo + 1-2 arquivos.
5. **Atualizar o BUILD-GUIDE.** Marcar sempre o que foi feito.
6. **Filesystem First.** Tudo vira arquivo, arquivo tem lugar previsível.
7. **QA gate é obrigatório.** BLOQUEADO significa bloqueado.
8. **Composio como gateway.** Nenhuma integração externa sem Composio.

---

## Como Retomar

1. Leia este arquivo (você está aqui).
2. Verifique a seção "Estado Atual" para saber onde parou.
3. Use os docs originais como fonte de conteúdo de negócio.
4. Ao terminar cada arquivo, atualize os checklists neste arquivo.

---

*OMG.sys Builder — Documento de construção do framework*
*Última atualização: 2026-05-11*
