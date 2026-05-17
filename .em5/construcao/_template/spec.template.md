---
ticket: {ID-TICKET}
arquiteto: '@arq Arq'
data: {YYYY-MM-DD}
status: draft  # draft | approved | building | reviewing | done | blocked
necessidade_original: "{frase do user em /construir}"
---

# Spec: {Nome do Componente}

## 1. Necessidade Real (após entrevista)

{1-2 parágrafos. O que user realmente precisa, decifrado da conversa.}

## 2. Componentes a Criar

| Tipo | Nome | Função |
|------|------|--------|
| Agente | @{slug} ({Persona} {emoji}) | {1 linha} |
| Tasks | {slug-task-1} | {1 linha} |
| Tasks | {slug-task-2} | {1 linha} |
| Skill | /{slug-skill} | {1 linha} |
| Playbook | {nicho-ou-canal-slug} | {1 linha} |
| Data | {arquivo}.yaml | {1 linha} |
| Templates | {template}.md | {1 linha} |

## 3. Decisões Arquiteturais

- **Layer:** {estrategia | definicao | execucao | validacao | construcao}
- **Model tier:** {frontier | balanced | haiku}
- **Reports to:** {@coo | @ceo | …}
- **Handoff recebe de:** {…}
- **Handoff envia para:** {…}

## 4. Anti-Papel (mínimo 3)

- NÃO {…}
- NÃO {…}
- NÃO {…}

## 5. Composio Toolsets Necessários

- {toolset_1} ({uso})
- {toolset_2} ({uso})

Se algum toolset não existe no Composio atual: declarar limitação (Art. VI) e cair pra checklist manual.

## 6. Gate-Matrix Coverage (Art. XI)

| Output | Severidade default | Override role |
|--------|--------------------|---------------|
| {output_1} | {critico\|alto\|medio\|baixo} | {@role ou never} |
| {output_2} | … | … |

## 7. Learnings (Art. X)

Categoria a inicializar em `.em5/learnings/{ano-mes}/`:
- `{slug-agente}-{tipo}.md` — {o que captura}

## 8. Critério "≤ 5 min" (Art. XII)

- Input humano: {N perguntas, descrever}
- Tempo estimado: {minutos}
- Se passar de 5: fragmentar em 2 skills

## 9. Arquivos a Editar

- `.em5/agents/{slug}.md` (novo)
- `.em5/core/tasks/{slug}/` (novo dir)
- `.claude/commands/{skill}.md` (novo)
- `.em5/playbooks/{playbook}.md` (novo, se aplicável)
- `.em5/core/data/{data}.yaml` (novo, se aplicável)
- `.claude/CLAUDE.md` (atualizar tabela agentes + skills)
- `.em5/AGENTS.md` (atualizar tabela)
- `em5-config.yaml` (adicionar agente em `agents:`)

## 10. Plano de Teste

1. {Teste 1 — comando + resultado esperado}
2. {Teste 2}
3. {Teste 3}

## 11. Aprovação

- [ ] User confirmou necessidade real
- [ ] Spec aprovada pelo @arq
- [ ] Implementação aprovada pelo @reviewer Lima
- [ ] Configs centrais atualizadas
- [ ] Teste E2E passou

---

*Spec gerada pelo @arq Arq via /construir*
