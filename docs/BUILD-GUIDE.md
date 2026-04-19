# AgencyOS — Guia de Construção (OpenClaw Native)

> Este documento existe para que qualquer agente possa retomar a construção do AgencyOS de onde parou, sem perder contexto. Sempre leia antes de trabalhar no projeto.

---

## Visão Geral

**AgencyOS** é um framework operacional para agências de marketing digital, arquitetado 100% no padrão **OpenClaw Gateway**.

**Princípios fundamentais:**
- `AGENTE = PAPEL, SKILL = EXECUÇÃO`
- 1 agente = 1 domínio de responsabilidade
- Filesystem = fonte da verdade
- Agentes se conectam por artefatos, não por conversa
- Gateway OpenClaw orquestra a inicialização e o roteamento

---

## Arquitetura: 3 Camadas

| Camada | AgencyOS (OpenClaw) | Responsabilidade |
|--------|---------------------|------------------|
| 1 — Orquestração | ISIS (Raiz) | Governança, criação de componentes, workflow, setup geral |
| 2 — Definição | estrategista (Vera) + cs (Sol) | Estratégia, briefing, ICP, posicionamento |
| 3 — Execução | gestor-trafego, copywriter, designer, qa | Operação prática — mídia, copy, criativos, validação |

---

## Estrutura do Sistema

```
workspace/
├── AGENTS.md                   ← Regras operacionais gerais e roteamento
├── SOUL.md                     ← Identidade da orquestradora (ISIS) e organograma
├── USER.md                     ← Contexto do usuário
├── agents.json                 ← Registro oficial dos sub-agentes no OpenClaw
├── agents/                     ← Personas isoladas
│   ├── cs.md                   ← Sol (CS)
│   ├── estrategista.md         ← Vera (Estrategista)
│   └── ...                     ← (Max, Cal, Lux, Zara)
├── skills/                     ← Ações executáveis (antigas "tasks")
│   ├── coletar-briefing/       
│   │   └── SKILL.md            ← Skill com Frontmatter YAML OpenClaw
│   └── ...
├── operations/                 ← Manuais, templates e fluxos
│   ├── constitution.md         ← Princípios inegociáveis
│   ├── templates/              ← Templates de documentos
│   ├── data/                   ← Dados de referência (YAML)
│   ├── workflows/              ← Workflows multi-step
│   └── checklists/             ← Checklists de validação
└── clients/                    ← Workspaces dos clientes
    └── _template/              ← Estrutura base de pastas
```

---

## Agentes (Definidos e Prontos em `agents/`)

| Agente | Persona | Camada | Responsabilidade |
|--------|---------|--------|------------------|
| `isis` (Raiz)| ISIS | Orquestração | Governança, setup do sistema, health check |
| `cs` | Sol | Definição | Onboarding, setup técnico, gestão do cliente |
| `estrategista` | Vera | Definição | Posicionamento, estratégia, plano de campanha |
| `gestor-trafego` | Max | Execução | Mídia paga, campanhas, otimização, relatórios |
| `copywriter` | Cal | Execução | Copy, ângulos, adaptação por canal |
| `designer` | Lux | Execução | Criativos visuais, vídeos, UGC |
| `qa-campanha` | Zara | Validação | Validação antes da publicação (gate obrigatória) |

**Padrão do Agente:** Todos estão registrados no `agents.json` e definidos em `agents/*.md` usando a tag YAML `activation-instructions` e os metadados do OpenClaw.

---

## Skills (Antigas Tasks)

No OpenClaw, uma "task executável" é uma **Skill**. 
Todas as ações padronizadas dos agentes devem ser criadas em `skills/<nome-da-skill>/SKILL.md`.

**Padrão Obrigatório de Skill:**
```markdown
---
name: nome-da-skill
description: "O que essa skill faz"
metadata:
  openclaw:
    emoji: '🧠'
---

# Título da Skill

## Objetivo
...

## Passo a passo
1.
2.

## Output esperado
...
```

*(Consulte o `BUILD-PLAN.md` para a lista completa de skills pendentes por agente).*

---

## Operações (Templates, Data, Workflows, Checklists)

Tudo isso vive agora na pasta `operations/` (ou subpastas).

1. **Templates:** `operations/templates/` (Briefings, Logs, Contratos, Copy).
2. **Data Files:** `operations/data/` (Arquivos YAML como `canais-suportados.yaml`, `estrutura-pastas.yaml`).
3. **Workflows:** `operations/workflows/` (Ex: `onboarding-cliente.yaml`).
4. **Checklists:** `operations/checklists/` (Validações).

---

## Integrações Externas

| Integração | Local | Agente | Status |
|-----------|-------|--------|--------|
| UGC System (WaveSpeed AI) | `contexto/ugc-system/` | Designer | Tasks usam JSON templates de `outputs/` |
| Avora Skills (~20 selecionadas) | `contexto/avora-skills/` | Todos | Referenciar nas skills pertinentes |

---

## Regras de Construção

1. **Arquitetura OpenClaw:** Tudo é centralizado pelo Gateway. Sem scripts de instalação `npx`, a estrutura vive e respira no repositório.
2. **Não inventar conteúdo:** Toda lógica de negócio está nos docs originais.
3. **Padrão de Skill:** Toda skill deve ter o frontmatter YAML para o OpenClaw indexar.
4. **Contexto Enxuto:** O agente só carrega o que precisa na hora que precisa.
5. **Atualizar o BUILD-PLAN:** Sempre marque o que foi feito.
6. **Filesystem First:** Tudo vira arquivo em um lugar previsível.
7. **QA Obrigatório:** Nada vai para o cliente sem validação da Zara.

---

*AgencyOS Builder — Documento de construção do framework atualizado para o Padrão OpenClaw.*
