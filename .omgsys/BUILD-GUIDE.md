# AgencyOS — Guia de Construcao

> Este documento existe para que qualquer agente possa retomar a construcao do AgencyOS de onde parou, sem perder contexto. Sempre leia antes de trabalhar no projeto.

---

## Visao Geral

**AgencyOS** é um framework operacional para agências de marketing digital, distribuído como **pacote NPM** instalável via `npx agencyos-core install`.

**Modelo:** Inspirado no AIOX-FullStack (SynkraAI), mas voltado para operar uma agência de marketing — não para desenvolver software.

**Princípios fundamentais:**
- `AGENTE = PAPEL, TASK = EXECUÇÃO`
- 1 agente = 1 domínio de responsabilidade
- Filesystem = fonte da verdade
- Agentes se conectam por artefatos, não por conversa
- Executor trabalha com contexto reduzido

---

## Arquitetura: 3 Camadas

| Camada | AIOX | AgencyOS | Responsabilidade |
|--------|------|----------|------------------|
| 1 — Orquestracao | aiox-master | ceo (Atlas) | Governança, criação de componentes, workflow |
| 2 — Definição | PM | strategist (Vera) + cs (Sol) | Estratégia, briefing, ICP, posicionamento |
| 3 — Execucao | DEV | traffic, copywriter, designer | Operacao pratica — midia, copy, criativos |

O AgencyOS **NÃO copia** o AIOX. Ele replica a **estrutura** (agentes → tasks → templates → data → workflows → checklists) mas com conteúdo e dominio completamente diferentes.

---

## Produtos: O que esta sendo construido

### Produto Final (distribuido)

```
agencia-do-usuario/
├── .omgsys/                    ← Framework instalado
│   ├── agents/                   ← 7 agentes (definicoes)
│   ├── core/
│   │   ├── constitution.md       ← Principios inegociaveis
│   │   ├── tasks/                ← Tasks executaveis por agente
│   │   ├── templates/            ← Templates de documentos
│   │   ├── data/                 ← Dados de referencia (YAML)
│   │   ├── workflows/            ← Workflows multi-step
│   │   └── checklists/           ← Checklists de validacao
│   └── clientes/                 ← Workspaces dos clientes
│       └── _template/
├── .claude/
│   └── CLAUDE.md                 ← Configuracao do framework
└── contexto/                     ← Referencias externas (nao distribuidas)
    ├── ugc-system/
    └── avora-skills/
```

### Pacote NPM (publicar)

```
agencyos-core/
├── package.json                  ← name: "agencyos-core"
├── bin/agencyos.js               ← CLI installer
├── agents/                       ← 7 agentes
├── core/                         ← Constitution + tasks + templates + data + workflows
├── clientes/_template/           ← Estrutura base de cliente
└── README.md
```

### Installer (`npx agencyos-core install`)

Deve seguir o padrao AIOX:
1. Wizard interativo (inquirer.js): canais operados, IDEs, modulos extras
2. Copiar `.omgsys/` para o projeto
3. Configurar `.claude/CLAUDE.md`
4. Configurar MCP servers (opcional)
5. Criar `install-manifest.yaml`
6. Pos-instalacao: sugerir `@ceo *setup-agencia`

---

## Agentes

### Definidos e Prontos

| Agente | Persona | Camada | Responsabilidade |
|--------|---------|--------|------------------|
| `ceo` | Atlas | Orquestracao | Governança, setup do sistema, health check |
| `cs` | Sol | Definição | Onboarding, setup tecnico, gestao do cliente |
| `strategist` | Vera | Definição | Posicionamento, estrategia, plano de campanha |
| `traffic` | Max | Execucao | Midia paga, campanhas, otimizacao, relatorios |
| `copywriter` | Cal | Execucao | Copy, angulos, adaptacao por canal |
| `designer` | Lux | Execucao | Criativos visuais, videos, UGC |
| `qa` | Zara | Execucao | Validacao antes da publicacao (gate obrigatoria) |

### Arquivos

Todos em `.omgsys/agents/`. Cada arquivo segue o padrao:

```yaml
activation-instructions: (STEP 1-5: ler arquivo, adotar persona, greeting, HALT)
agent: (name, id, title, icon, whenToUse)
persona_profile: (archetype, communication)
persona: (role, identity, core_principles)
commands: (lista de comandos com *)
dependencies: (tasks, templates, data, workflows, checklists)
```

**CRITICO:** Cada agente tem `dependencies` que mapeiam para `.omgsys/core/tasks/{agente}/`, `.omgsys/core/templates/`, etc. Agentes **SO** carregam dependencias quando o usuario executa o comando correspondente. Nunca carregar tudo na ativacao.

---

## Tasks

### Padrao de Arquivo

```markdown
---
name: nome-da-task
agent: nome-do-agente
description: O que essa task faz
inputs:
  - arquivo de entrada necessario
outputs:
  - arquivo produzido ao final
elicit: true/false  # requer interacao do usuario?
---

# Titulo da Task

## Objetivo
...

## Passo a passo
1. ...
2. ...
3. ...

## Output esperado
...
```

### Status por Agente

**CS (Sol) — 9 tasks planejadas:**
- [ ] iniciar-onboarding.md
- [ ] coletar-briefing.md
- [ ] gerar-briefing-final.md
- [ ] listar-acessos.md
- [ ] validar-tracking.md
- [ ] registrar-status-tecnico.md
- [ ] registrar-interacao.md
- [ ] gerar-proximos-passos.md
- [ ] enviar-relatorio.md

**Estrategista (Vera) — 7 tasks planejadas:**
- [ ] analisar-briefing.md
- [ ] validar-objetivo-real.md
- [ ] definir-posicionamento.md
- [ ] criar-plano-estrategico.md
- [ ] definir-funil-macro.md
- [ ] criar-hipoteses.md
- [ ] analisar-call.md

**Gestor de Trafego (Max) — 9 tasks planejadas:**
- [ ] auditar-conta.md
- [ ] mapear-publicos.md
- [ ] estruturar-campanha.md
- [ ] solicitar-criativos.md
- [ ] monitorar-performance.md
- [ ] otimizar-campanha.md
- [ ] gerar-relatorio.md
- [ ] modo-cro.md
- [ ] modo-growth.md

**Copywriter (Cal) — 7 tasks planejadas:**
- [ ] analisar-icp.md
- [ ] criar-angulos.md
- [ ] criar-conceitos.md
- [ ] escrever-copy.md
- [ ] adaptar-canal.md
- [ ] registrar-peca-log.md
- [ ] iterar-com-base-em-performance.md

**Designer (Lux) — 8 tasks planejadas:**
- [ ] ler-branding.md
- [ ] definir-conceito-visual.md
- [ ] gerar-imagem.md
- [ ] gerar-video.md
- [ ] gerar-ugc.md
- [ ] versionar-criativo.md
- [ ] registrar-log-criativo.md
- [ ] iterar-criativo.md

**QA Campanha (Zara) — 6 tasks planejadas:**
- [ ] validar-copy.md
- [ ] validar-criativo.md
- [ ] validar-campanha.md
- [ ] validar-landing-page.md
- [ ] emitir-veredicto.md
- [ ] registrar-qa.md

**Agency Master (Atlas) — 4 tasks planejadas:**
- [ ] criar-pasta-cliente.md
- [ ] listar-clientes.md
- [ ] status-cliente.md
- [ ] health-sistema.md

### Fonte de Conteudo

TODO conteudo de negocio ja existe nos docs originais:
```
original docs/Agency OS — Flow 1 Onboarding.md      → Tasks do CS
original docs/Agency OS — Flow 1.5 Setup Tecnico.md  → Tasks do CS (setup)
original docs/Agency OS — Flow 2 Estrategia.md       → Tasks do Estrategista
original docs/Agency OS — Flow 3 Gestao de Trafego.md → Tasks do Gestor de Trafego
original docs/Agency OS — Flow 4 Gestao do Cliente.md → Tasks do CS (gestao)
original docs/Agency OS — Flow 5 CRO.md              → Tasks do Gestor de Trafego (CRO)
original docs/Agency OS — Flow 6 Expansao Growth.md  → Tasks do Gestor de Trafego (Growth)
original docs/Agency OS — Flow Copywriter.md         → Tasks do Copywriter
original docs/Agency OS — Flow Designer.md           → Tasks do Designer
```

**REGRA:** Nao inventar conteudo. Toda logica de negocio esta nos docs originais ou nos agentes ja construidos.

---

## Templates

Criar em `.omgsys/core/templates/` conforme BUILD-PLAN:
- `briefing/briefing-final.md` — template de briefing
- `briefing/briefing-perguntas.md` — script de perguntas
- `estrategia/plano-estrategico.md` — plano estrategico do cliente
- `logs/log-operacional.md` — log vivo
- `logs/log-performance-criativa.md` — log criativo com performance
- `logs/log-growth.md` — log de acoes de growth
- `relatorios/relatorio-whatsapp.md` — relatorio simplificado
- `relatorios/relatorio-completo.md` — relatorio detalhado
- `contratos/contrato-base.md` — template de contrato
- `copy/copy-anuncio.md`, `copy/roteiro-video.md`, `copy/copy-landing-page.md`, `copy/copy-whatsapp.md`, `copy/headline-banco.md`
- `setup-tecnico/checklist-tracking.md`, `setup-tecnico/status-tecnico.md`

---

## Data Files

Criar em `.omgsys/core/data/`:
- `estrutura-pastas.yaml` — estrutura canonica de pastas do cliente
- `canais-suportados.yaml` — canais com suas configs (Meta, Google, WhatsApp, Email)
- `kpis-por-objetivo.yaml` — KPIs esperados por objetivo
- `gatilhos-mentais.yaml` — gatilhos com exemplos de aplicacao
- `nomenclatura-campanhas.yaml` — padrao de naming de campanhas

---

## Workflows

Criar em `.omgsys/core/workflows/`:
- `onboarding-cliente.yaml` — CS onboarding ponta a ponta
- `ciclo-campanha.yaml` — Estrategista → Trafego → Copy → Design → QA → Publicacao
- `iteracao-criativa.yaml` — Performance baixa → Nova copy → Novo criativo → QA

### Regra de Workflow

Cada workflow define:
```yaml
nome: nome-do-workflow
descricao: O que esse workflow faz
gatilho: Quando e ativado
agente_responsavel: Quem orquestra
sequencia:
  - etapa: "nome"
    agente: "quem executa"
    entrada: "o que precisa"
    saida: "o que produz"
    dependencia: "o que precisa estar pronto antes"
```

---

## Checklists

Criar em `.omgsys/core/checklists/`:
- `checklist-pre-lancamento.md` — Antes de subir campanha
- `checklist-onboarding-completo.md` — Validar onboarding
- `checklist-relatorio-mensal.md` — Validar relatorio antes de enviar

---

## Integracoes Externas

### Ja disponiveis (referencias locais)

| Integracao | Local | Agente | Status |
|-----------|-------|--------|--------|
| UGC System (WaveSpeed AI) | `contexto/ugc-system/` | Designer | Tasks precisam usar os JSON templates da pasta `outputs/` |
| Avora Skills (~20 selecionadas) | `contexto/avora-skills/` | Todos | Skills filtradas por relevancia — referenciar nas tasks |

### Planejadas (nao bloqueiam construcao)

| Integracao | Tipo | Agente |
|-----------|------|--------|
| Meta Ads MCP (pipeboard-co/meta-ads-mcp) | MCP Server | Gestor de Trafego |
| Agent Media Skill (agent-media.ai) | Skill de video IA | Designer |
| Awesome Design Patterns (VoltAgent/awesome-design-md) | Referencia | Designer |

---

## Roadmap de Construcao

```
Fase 1 — CONTEUDO OPERACIONAL (agora)
  1. Completar todas as tasks (51 restantes)
  2. Criar todos os templates
  3. Criar data files (YAML)
  4. Criar workflows
  5. Criar checklists

Fase 2 — PACOTE NPM
  6. package.json (name: agencyos-core)
  7. bin/agencyos.js (CLI installer)
  8. bin/agency-os-new-client.js (criador de cliente)
  9. README.md
  10. AGENTS.md (raiz)

Fase 3 — PUBLICACAO
  11. Publish no NPM
  12. Documentacao publica
  13. GitHub open-source
```

---

## Estado Atual do Projeto

### Concluido
- [x] Constitution (`.omgsys/core/constitution.md`)
- [x] CLAUDE.md (`.claude/CLAUDE.md`)
- [x] Rules (agent-authority, agent-handoff, workflow-execution)
- [x] 7 agentes (`.omgsys/agents/`)
- [x] Estrutura de pastas de clientes (`.omgsys/clientes/_template/`)
- [x] BUILD-PLAN (`.omgsys/BUILD-PLAN.md`)

### Em progresso
- [x] Tasks — **49/49 concluidas** ✅
- [x] Templates — **14/14 concluidos** ✅
- [x] Data files — **5/5 concluidos** ✅
- [x] Workflows — **3/3 concluidos** ✅
- [x] Checklists — **3/3 concluidos** ✅
- [x] Scripts locais + AGENTS.md + package.json (Fase 2) ✅

### Pendente
- [ ] Package NPM com wizard interativo (Fase 3)
- [ ] Publicar no NPM

---

## Regras de Construcao

1. **Nao inventar conteudo.** Toda logica esta nos docs originais.
2. **Seguir o padrao de task.** Frontmatter YAML + objetivo + passo-a-passo.
3. **Seguir o padrao de agente.** YAML completo com activation-instructions.
4. **Manter contexto enxuto.** Executor so carrega o que precisa.
5. **Atualizar o BUILD-PLAN.** Sempre marcar o que foi feito.
6. **Nao modificar agents ja prontos** sem motivo valido.
7. **Filesystem First.** Tudo vira arquivo, arquivo tem lugar previsivel.
8. **O QA gate e obrigatorio.** Nada vai para o cliente sem validacao.

---

## Como Retomar

1. Leia este arquivo (voce esta aqui).
2. Leia o `BUILD-PLAN.md` para o plano detalhado.
3. Verifique o BUILD-PLAN secao "Estado atual" para saber onde parou.
4. Continue pela proxima task/template pendente.
5. Use os "original docs" como fonte de conteudo.
6. Ao terminar cada arquivo, atualize o checklist neste arquivo e no BUILD-PLAN.

---

*AgencyOS Builder — Documento de construcao do framework*
*Ultima atualizacao: 2026-04-11*
