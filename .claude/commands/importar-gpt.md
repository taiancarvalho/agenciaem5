# /importar-gpt — Adaptador customGPT → em5

> Importa customGPT (OpenAI), Claude Project, ou folder com prompt+knowledge.
> Sistema analisa, propõe mapping, cria agente em5 equivalente.

## Uso

```
/importar-gpt {caminho}
```

Exemplos:
```
/importar-gpt ~/Downloads/meu-gpt-export.zip
/importar-gpt ~/projects/claude-project.json
/importar-gpt ~/agentes/copy-master/         # folder com prompt.md + knowledge/
```

## Formatos suportados

| Formato | Extensão | Como obter |
|---------|----------|------------|
| OpenAI customGPT | `.zip` | Builder OpenAI → Export (precisa extrair antes) |
| Claude Project | `.json` | Anthropic console → Export project |
| Folder genérico | `prompt.md` + `knowledge/` | Manual ou de outros tools |

## Fluxo

```
/importar-gpt {caminho}
  ↓
Script .em5/bin/em5-import-gpt.js detecta formato
  ↓
Extrai: system prompt, knowledge files, actions
  ↓
Propõe mapping pro user:
  - slug do agente
  - persona name + icon
  - role, model_tier, layer, reports_to
  ↓
User confirma
  ↓
Gera .em5/agents/{slug}.md (com prompt original como referência)
Gera .em5/core/data/{slug}/ (knowledge files + manifest)
  ↓
Lista próximos passos manuais
```

## Recomendação

Após import, **rode `/construir CT-{X}`** pra refinar:
- @arq Arq entrevista o que adaptar pro contexto em5
- @builder Cunha cria tasks específicas (não usar prompt original literal)
- @reviewer Lima valida conformidade

Import bruto = ponto de partida, não componente final.

## Crítico

- Prompts originais ficam como **referência** no agente, não execução literal
- Anti-papel padrão é adicionado pra evitar invasão de escopo (Art. V)
- Knowledge files importados ficam em `.em5/core/data/{slug}/`
- Agente NÃO entra em CLAUDE.md/AGENTS.md/em5-config.yaml automaticamente — user revisa primeiro

## Workflow recomendado

1. Tem 5 customGPTs guardados? Importa um por vez
2. Pra cada, roda `/importar-gpt {caminho}`
3. Revisa o `.md` gerado, ajusta tom/anti-papel
4. Roda `/construir` pra criar tasks operacionais
5. `/validate-em5` confirma conformidade
6. Commit

---

*em5 v1.2 — Fase 9 (customGPT Adapter)*
