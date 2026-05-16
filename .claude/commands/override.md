# /override — Override de Bloqueio @qa (severity=alto)

> Permite role específica overridar bloqueio do @qa em issues `alto` (NUNCA `critico`).
> Toda override é auditada em `.em5/learnings/{ano-mes}/qa-overrides.md`.

## Uso

```
/override {campanha-id} "{justificativa}"
```

Exemplo:
```
/override CP-042 "Público amplo intencional pra teste de hipótese A/B com público nicho. Lock budget R$200."
```

## Quando usar

Apenas para issues classificados como `alto` no `.em5/core/data/gate-matrix.yaml`.

**NUNCA pra `critico`:** pixel ausente, sem CTA, promessa irreal, formulário quebrado, objetivo errado. Esses bloqueios são absolutos.

## Quem pode overridar

Por gate (lookup em `gate-matrix.yaml` → campo `override_role`):

| Issue | Role autorizada |
|-------|-----------------|
| Erro ortográfico (intencional) | @ceo |
| Público amplo | @strategist |
| Budget acima briefing | @ceo |
| Logo baixa resolução | @ceo |
| Cores fora branding (sazonal) | @strategist |
| Message match baixo (teste) | @strategist |
| Formato errado plataforma (fallback) | @traffic |
| Sem ICP identificável (teste amplo) | @strategist |

## Fluxo

1. @qa retorna BLOQUEADO com issue `alto`
2. Você executa `/override CP-{id} "{justificativa}"`
3. Sistema valida: role atual = `override_role` do gate?
4. Se sim: publicação liberada + auditoria registrada
5. Se não: erro + sugere role correta

## Auditoria

Cada override gera entry em `.em5/learnings/{ano-mes}/qa-overrides.md`:

```markdown
## 2026-05-16 — CP-042 — público amplo

**Issue overridada:** publico_amplo_demais (alto)
**Override role:** @strategist (Vera)
**Justificativa:** "Público amplo intencional pra teste A/B com público nicho. Lock budget R$200."
**Outcome (preencher depois):** TODO — preencher após 7 dias de campanha
```

Revisitar mensalmente: padrões de override viram learnings novos.

---

*em5 v1.1 — Fase 3 (Gate-Matrix Severity)*
