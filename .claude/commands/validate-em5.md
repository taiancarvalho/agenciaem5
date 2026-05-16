# /validate-em5 — Conformidade Constitution + Boas Práticas

> Audita sistema contra constitution v1.1+ e checa health. ≤ 30 segundos.

## Uso

```
/validate-em5
```

## O que checa

11 verificações automatizadas (severity-tagged):

### NON-NEGOTIABLE 🚫
- Composio é único MCP externo (Art. IX)
- gate-matrix.yaml existe (Art. XI — Severity Gates)
- Workspace cliente `_template/` existe

### MUST ⚠️
- Todos agentes têm `model_tier` (Fase 1.1)
- Constitution tem 12 artigos (Arts. X, XI, XII presentes)
- Estrutura learnings inicializada (Fase 1.2)
- Composio toolsets mínimos: `meta_ads`, `google_analytics`, `gmail`
- `package.json` declara `bin/em5.js` (Fase 4)

### SHOULD 💡
- `em5-config.yaml` versão >= 1.1
- Skills canônicas presentes (`setup`, `cliente-novo`, `campanha`, `dia`, etc.)
- Tagline "Agência em Cinco minutos" em CLAUDE.md

## Execução

Script: `node .em5/bin/em5-validate.js`

Exit codes:
- `0` — Sistema OK ou só pendências SHOULD
- `1` — Violação NON-NEGOTIABLE detectada (bloqueio)

## Quando rodar

- Antes de cada commit grande
- Após Fase X completar
- Pré-publish npm (Fase 4)
- Pós-merge de PR externo (futuro)
- CI/CD (futuro)

## Auto-fix (futuro)

`/validate-em5 --fix` aplicará correções automáticas em pendências SHOULD/MUST onde possível (model_tier default, schema config bumps).

---

*em5 v1.1 — Fase 5.3 (aiox-core absorption)*
