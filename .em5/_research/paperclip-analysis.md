# Paperclip — Análise Estrutural pra Adaptação no em5

> **Branch isolada:** `claude/paperclip-style-exploration`
> **Data:** 2026-05-17
> **Objetivo:** extrair padrões do paperclip (482 agentes em 16 empresas) pra escalar em5 de 15 → 50+ agentes sem virar bagunça.

---

## 1. Modelo Organizacional Paperclip

### Hierarquia de diretórios

```
/companies/
  ├── .agents/              # Definições compartilhadas cross-company
  │   └── skills/
  ├── skills/               # Skills reutilizáveis root-level
  │   ├── company-creator
  │   └── readme-updater
  ├── {company-slug}/
  │   ├── agents/           # Flat — TODOS agentes da empresa aqui
  │   ├── teams/            # Agrupamentos semânticos
  │   ├── skills/           # Skills da empresa
  │   ├── COMPANY.md        # Metadata + config + roster
  │   └── README.md         # Auto-gerado pelo readme-updater
  └── default/              # Templates baseline
```

### Princípios estruturais

1. **Filesystem-first** — sem registry central, descoberta via path traversal
2. **Flat agents/** — todos agentes da empresa no mesmo nível, NÃO nested por cargo
3. **Metadata hierarchy** — `reportsTo:` em COMPANY.md, não em estrutura de pastas
4. **Skills decoupled** — não pertencem a agentes, são ferramentas reutilizáveis
5. **Auto-generated docs** — readme-updater mantém READMEs sync sem manutenção manual

---

## 2. Como Paperclip mantém 482 agentes sem virar bagunça

| Padrão | Mecânica |
|--------|----------|
| **Company isolation** | Cada empresa = unidade autocontida, cresce independente |
| **Metadata-driven org** | reportsTo em COMPANY.md, reorg = edita texto (não move arquivo) |
| **Shared skill library** | Skills comuns (criar empresa, atualizar readme) centralizadas, evita duplicação |
| **Flat agent directories** | Sem nested folders, descoberta O(1), escala linearmente |
| **Automated docs** | readme-updater varre COMPANY.md → regenera README com org charts |
| **Template/override** | Root `.agents/` provê baselines, empresas estendem |

---

## 3. Decisão Estratégica: Absorver 3 padrões, NÃO clonar tudo

### ✅ Absorver

#### Padrão 1 — Metadata-driven hierarchy
- **Atualmente em5:** estrutura plana `.em5/agents/*.md` (já parecido com paperclip)
- **Adicionar:** central `AGENTS.md` no formato roster com `reportsTo` por agente
- **Ganho:** reorganização = editar markdown (sem mover arquivos)

#### Padrão 2 — Shared skill library central
- **Atualmente em5:** tasks em `.em5/core/tasks/{agente}/` (acopladas ao agente)
- **Adicionar:** `.em5/skills/` com skills cross-agente (ex: `gerar-relatorio`, `extrair-design`, `validar-output`)
- **Ganho:** uma skill, múltiplos agentes consomem; menos duplicação quando crescer

#### Padrão 3 — Automated docs (readme-updater equivalente)
- **Atualmente em5:** CLAUDE.md, AGENTS.md, README.md mantidos manualmente (drift risco)
- **Adicionar:** script `bin/em5-update-docs.js` que escaneia `.em5/agents/*.md` + `AGENTS.md` central → regenera tabelas
- **Ganho:** zero manutenção manual, dispara via hook PreCommit ou skill `/docs-rebuild`

### ❌ NÃO absorver (over-engineering pro em5)

- **Multi-company structure** — em5 é 1 agência, não holding de 16
- **`.agents/` shared library** — abstração desnecessária pra agência única
- **company-creator skill** — em5 não cria empresas novas (já é a empresa)
- **default/ templates** — overhead sem ganho

---

## 4. Anti-padrões do paperclip pra NÃO copiar

| Anti-padrão | Razão |
|-------------|-------|
| Agentes shell de 15 linhas com link externo | Já validamos — paperclip "tem" 482 mas apenas ~50 funcionais |
| Deep nesting por hierarquia | Use metadata, não diretórios |
| Skills duplicadas por company | Centraliza em raiz |
| README manual | Automatiza ou aceita drift |
| Esquemas de equipe minimalistas | em5 ganha mais com teams ricos (budgets, sprint, deps) |

---

## 5. Path de Migração Recomendado: PARALLEL STRUCTURE (não big-bang)

### ❌ Refator big-bang (rejeitado)
- Risco alto de quebrar operação
- 87 tasks migradas em massa = bugs garantidos
- Rollback complexo

### ✅ Parallel v2 (recomendado)

```
.em5/
├── (v1 atual — congelado, funcional)
│   ├── agents/
│   ├── core/tasks/
│   └── ...
├── v2/                          # Estrutura nova lado a lado
│   ├── AGENTS.md                # Roster central (metadata)
│   ├── agents/                  # Flat — migra incrementalmente
│   ├── skills/                  # Shared library central
│   ├── teams/                   # Semantic groupings (novo)
│   └── README.md                # Auto-gerado
└── bin/
    └── em5-update-docs.js       # readme-updater equivalente
```

### Fases de migração (4 semanas)

| Semana | Ação |
|--------|------|
| 1 | Cria estrutura `.em5/v2/` + central `AGENTS.md` + `bin/em5-update-docs.js` |
| 2 | Migra agentes high-traffic: @ceo, @qa, @copywriter, @designer pro v2 |
| 3 | Migra restantes 11 agentes + skills centrais |
| 4 | Decomissiona v1 (move pra `_descarte/`) — v2 vira default |

Critério de saída: v2 passa em todos os smoke tests (6/6) + validate-em5 (0 issues).

---

## 6. Comparação com em5 atual

| Aspecto | em5 v1.3 atual | Paperclip | em5 v2 (alvo) |
|---------|----------------|-----------|---------------|
| Agentes | 15 em `.em5/agents/` flat | 482 em 16 companies flat | 15-50 em `.em5/v2/agents/` flat |
| Hierarquia | Via `reports_to:` em cada agent.md | Via `reportsTo:` em COMPANY.md central | **Híbrido: central `AGENTS.md` + cross-ref nos agents** |
| Skills | Tasks por agente `.em5/core/tasks/{agent}/` | Compartilhadas + por company | **Mix: tasks coupling forte + skills shared cross** |
| Docs | Manual (CLAUDE.md, AGENTS.md, README.md) | Auto via readme-updater | **Auto via em5-update-docs.js** |
| Constitution | `.em5/core/constitution.md` (13 arts) | COMPANY.md por empresa | **Mantém + agentes referem por slug** |
| Composio | Único MCP (Art. IX) | Sem MCPs documentados | **Mantém Art. IX** |

---

## 7. Próximos passos sugeridos

### Opção A — Adoção mínima (1 semana, baixo risco)
- Cria `bin/em5-update-docs.js` (readme-updater style)
- Adiciona script ao CI/CD
- ZERO mudança estrutural — só automatiza docs

### Opção B — Adoção média (2-3 semanas, risco médio)
- Opção A +
- Cria `AGENTS.md` central com roster + reportsTo
- Migra cross-refs gradualmente

### Opção C — Refator parallel v2 (4 semanas, risco alto-médio)
- Opção B +
- Estrutura `.em5/v2/` paralela
- Migra agentes incrementalmente
- Decomissiona v1 no final

### Recomendação: **Opção A primeiro** (validar valor do automated docs antes de refatorar).

Se A entregar valor real (zero drift, docs sempre atualizadas), considera B. C só faz sentido se em5 chegar a 30+ agentes ou virar produto distribuível com múltiplas agências.

---

## 8. Riscos identificados

| Risco | Mitigação |
|-------|-----------|
| Refator quebra agência em operação | Parallel structure (v1 congelado) |
| Drift entre AGENTS.md central e agents/*.md | em5-update-docs.js valida + falha CI se inconsistente |
| User não entende estrutura nova | Tutorial em CHANGELOG + README atualizado |
| Tasks migradas pra skills perdem contexto | Mantém tasks tradicionais; skills são adicionais |

---

## 9. Decisões pendentes pro user

1. **Opção A, B ou C?** (recomendação: A pra começar)
2. **Manter em5 v1 funcional enquanto v2 cresce?** (recomendação: sim)
3. **Vale criar teams formal?** (paperclip tem; em5 não — opcional)
4. **Renomear `.em5/core/tasks/` pra `.em5/skills/` no v2?** (paperclip pattern)

---

*Análise gerada por Explore agent + síntese — `claude/paperclip-style-exploration` branch.*
