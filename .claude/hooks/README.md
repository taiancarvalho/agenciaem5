# em5 — Hooks System

> Hooks do Claude Code que disparam em eventos do harness (PreToolUse, PostToolUse, SessionStart, etc.).
> Configurados via `.claude/settings.json`.

## Convenções em5

### Model Tier (Fase 1.1)

Cada agente declara `model_tier` no seu YAML frontmatter:

| Tier | Modelo padrão | Uso |
|------|---------------|-----|
| `frontier` | claude-opus-4-7 | Decisões irreversíveis, validação final (@ceo, @qa) |
| `balanced` | claude-sonnet-4-6 | Estratégia, análise, copy, design, tráfego, CS |
| `haiku` | claude-haiku-4-5 | Listagens, status, ler-arquivo, relatórios simples |

**Estado atual:** o tier é **declaração informativa** lida pelo agente ao ativar. O usuário escolhe o modelo no Claude Code via `/model`. Roteamento automático requer suporte futuro do harness ou wrapper externo (Anthropic SDK app).

**Override por task:** task `model_tier` no frontmatter sobrepõe agente. Exemplo: `qa/validar-campanha.md` mantém `frontier` mesmo se @qa default mudar.

### Learnings Capture (Fase 1.2)

Hook PostToolUse `learnings-capture.sh` (planejado): após @qa retornar veredicto, append em `.em5/learnings/{YYYY-MM}/qa-bloqueios.md` se BLOQUEADO. Atualmente captura manual via agente.

## Hooks ativos

Nenhum hook ativo no `settings.json` ainda — aguardando implementação Fase 1+.

## Adicionar hook

Edite `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "bash .claude/hooks/learnings-capture.sh" }
        ]
      }
    ]
  }
}
```
