# `.em5/` — Arquitetura v2.4 (Cenário C refatorado)

> Sistema operacional da agência. **4 dirs + historico/ raiz.** Refatorado pra eliminar redundância.

## Mapa rápido

```
AgenciaEm5/
├── .em5/
│   ├── agents/        # 13 agentes: persona + playbook
│   ├── receitas/      # 25 receitas (substituem workflows yaml + tasks md)
│   ├── blocos/        # 22 blocos atômicos reusáveis (steps 2+ receitas)
│   ├── system/        # constitution + rules + checklists + templates + learnings
│   └── infra/         # bin + tools + hooks + setup + forge + integracoes + docs
└── historico/         # tickets vivos por demanda (raiz — UI futura)
    └── {YYMMDD-clienteslug-tipo}/ticket.md
```

## Conceitos centrais

### Agente (13)
Persona + playbook. Categorias:
- **Estratégico:** ceo · strategist
- **Tático:** coo
- **Operacionais:** cs · traffic · copywriter · designer · qa · scout · fin · vendas · whats
- **Meta:** builder (era arq + builder + reviewer fundidos)

### Receita (25)
`.em5/receitas/{nome}.md` — spec de operação (1 arquivo).

Substitui antigo workflow yaml + task md (3 arquivos viraram 1). Frontmatter YAML + body markdown. Steps inline OU referenciam blocos.

### Bloco (22)
`.em5/blocos/{nome}.md` — step atômico reusável.

Critério: step usado em **2+ receitas** vira bloco. Senão fica inline.

### Ticket vivo
`historico/{YYMMDD-clienteslug-tipo}/ticket.md` — instância executada de receita.

1 documento por demanda. Todos agentes envolvidos anotam inline (YAML status + observações).

Substitui sync manual de 3 arquivos antigos (log + status + notas-sessao).

### Skills (22 canônicas)
Classificadas:
- **Operacional** (7): pula @ceo
- **Estratégico** (3): passa @ceo
- **Híbrido** (3): @ceo decide
- **Utilitário** (5): meta/setup/status
- **Adapters** (3): superpowers core
- **/pedir** (1): conversacional fallback

## Comparação antes vs depois

| Métrica | v2.3 (antes) | v2.4 (Cenário C) | Redução |
|---------|--------------|-------------------|---------|
| Agentes | 15 | 13 | -13% |
| Workflows yaml | 83 | 0 | -100% |
| Tasks .md | 98 | 0 | -100% |
| **Receitas** | — | 25 | (novo) |
| **Blocos** | — | 22 | (novo) |
| Skills | 45 | 22 | -51% |
| Arquivos operação total | 226 | 47 | **-79%** |
| Dispatch operacional | 2-3 hops | 1-2 hops | -33% |
| Tokens operacional | ~80k | ~40-50k | -40% |

## Onde achar X?

| Quero... | Path |
|----------|------|
| Persona agente | `agents/{nome}/persona.md` |
| Playbook agente | `agents/{nome}/playbook.md` |
| Receita operação | `receitas/{nome}.md` |
| Bloco atômico | `blocos/{nome}.md` |
| Ticket vivo demanda | `historico/{id}/ticket.md` |
| Constitution 13 artigos | `system/constitution.md` |
| Regras estruturais | `system/rules/` |
| Templates (DRE/LP/etc) | `system/templates/` |
| Aprendizados | `system/learnings/` |
| Scripts CLI | `infra/bin/` |
| Hooks Claude Code | `infra/hooks/` |
| Wizard setup | `infra/setup/` |

## Princípios de manutenção

1. **Criar componente novo?** → @builder (`/construir`) — 3 modos (entrevista + impl + valid)
2. **Receita similar já existe?** → consultar `receitas/_index.md` antes
3. **Step usado em 2+ receitas?** → vira bloco
4. **Não toca:** Constitution + identidade agentes + Composio + hierarquia 4-dirs

## Backup

Tag `backup/pre-refactor-v4-2026-05-20` → estado anterior à refatoração Cenário C.

Rollback: `git reset --hard backup/pre-refactor-v4-2026-05-20`

---

*em5 v2.4 — Cenário C refatorado. Sistema enxuto, testável, escalável.*
