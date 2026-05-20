# Playbook Builder — Meta-time Único

> Referência expert pra @builder. Como alternar 3 modos contextualmente.

## Princípio

**3 papéis em 1 agente.** Mesmo modelo Opus alterna entre entrevistador → desenvolvedor → revisor sequencialmente. Solo dev não precisa hierarquia formal arq+builder+reviewer.

## Modo 1: ENTREVISTA (5min)

Trigger: user pede algo vago ("preciso de X").

### 5 perguntas-âncora

| # | Pergunta | Por que importa |
|---|----------|-----------------|
| 1 | Quem usaria isso? | Define agente alvo |
| 2 | Quando precisa? | Diário/semanal/raro |
| 3 | O que entrega? | Output esperado |
| 4 | Algo similar já existe? | Evita duplicação (consultar `.em5/receitas/_index.md`) |
| 5 | Quem aprova entrega? | QA gate |

Se 5 respostas claras → spec.md. Senão refine.

### Output entrevista

`.em5/infra/forge/{ticket}/spec.md` — estrutura:
- Necessidade real
- Tipo componente (agente / receita / bloco / skill / template)
- Inputs/outputs
- Quem aprova
- Onde mora (path proposto)

## Modo 2: IMPLEMENTAÇÃO

Trigger: spec aprovada (modo 1 done).

### Templates por tipo

| Tipo | Template | Local saída |
|------|----------|-------------|
| Agente | `.em5/infra/setup/forge-templates/agent.template.md` | `.em5/agents/{nome}/persona.md` |
| Receita | `.em5/receitas/_template/receita.md` | `.em5/receitas/{nome}.md` |
| Bloco | `.em5/blocos/_template/bloco.md` | `.em5/blocos/{nome}.md` |
| Skill | (manual) | `.claude/commands/{nome}.md` |
| Template | (manual) | `.em5/system/templates/{cat}/{nome}.md` |

### Configs centrais (sempre sincronizar)

- `.claude/CLAUDE.md` (novo agente OR skill canônica)
- `.em5/system/AGENTS.md` (todo agente)
- `em5-config.yaml` (fantasy_names + serviços)
- `.em5/receitas/_index.md` (toda receita nova)

### Learnings inicializado

`.em5/system/learnings/{categoria}/{componente}-learnings.md` (vazio mas existe).

## Modo 3: VALIDAÇÃO

Trigger: implementação concluída — antes commit.

### Checklist Constitution (13 artigos)

- [ ] Art. I (Filesystem First): persiste artefatos?
- [ ] Art. II (Autoridade): agente + anti_papel claros?
- [ ] Art. III (Artefatos > Conversa): ticket vivo respeitado?
- [ ] Art. IV (Contexto Reduzido): dependencies mínimas?
- [ ] Art. V (Trade-offs): model_tier adequado?
- [ ] Art. VI (Honestidade): limitações declaradas?
- [ ] Art. VII (Modular): on-demand?
- [ ] Art. VIII (Idempotência): roda 2x ok?
- [ ] Art. IX (Composio): via Composio, não curl direto?
- [ ] Art. X (Memória): log-operacional?
- [ ] Art. XI (Identidade): fantasy name coerente?
- [ ] Art. XII (Cinco Minutos): usável <= 5min?
- [ ] Art. XIII (Aprendizado): learnings inicializado?

### Gate-matrix por tipo

**Agente novo:**
- model_tier (frontier/balanced/haiku) declarado
- anti_papel listado
- commands principais
- dependencies on-demand
- greeting estruturado

**Receita:**
- Frontmatter YAML válido (parseável)
- Steps numerados + inline OR ref bloco
- Outputs declarados (path + agente)
- Anti-padrões listados
- Métricas alvo

**Bloco:**
- Agente padrão declarado
- Composio tools
- `usado_em` atualizado (qual receita referencia)
- Body curto (~50 linhas max)

**Skill:**
- Classificação operacional/estratégico/híbrido
- Receita referenciada
- Roteamento explícito (@coo OR @ceo)

### Veredictos

- **APROVADO** — checklist 100% → commit
- **REVISÃO** — 1-2 ajustes pontuais → volta modo 2
- **BLOQUEADO** — violação Constitution → reentrevistar (volta modo 1)

## Anti-padrões transversais

- ❌ Pular qualquer modo (entrevista → impl → valid)
- ❌ Implementar sem spec aprovada
- ❌ Aprovar próprio componente sem checklist
- ❌ Duplicar componente existente
- ❌ Modificar componente sem reentrevistar (ainda faz sentido?)

## Métricas próprias

- Tempo entrevista: <= 5min
- Specs aprovados validação primeira: > 90%
- Componentes duplicados criados: 0
- Componentes em produção com bug pós-validação: < 5%

## Tools úteis

- `.em5/infra/bin/em5-validate.js` (CI validation — pode rodar local)
- `.em5/infra/bin/em5-forge.js` (scaffold componente novo)
