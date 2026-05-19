# Agent Handoff — Protocolo de Compactação de Contexto

## Objetivo

Prevenir acúmulo de contexto ao trocar entre agentes do agenciaem5.
Cada troca compacta o agente anterior em um artefato de handoff (~400 tokens)
em vez de manter a persona completa (~3-5K tokens).

---

## Quando Aplica

Este protocolo ativa quando:
1. Usuário invoca um novo agente via `@agent-name`
2. A sessão já tem um agente ativo diferente

---

## Protocolo de Handoff

### Ao sair (agente atual)

Antes de carregar o novo agente, gerar mentalmente:

```yaml
handoff:
  from_agent: "{id do agente atual}"
  to_agent: "{id do novo agente}"
  cliente_context:
    cliente_ativo: "{nome do cliente}"
    cliente_path: "clientes/{nome}/"
    etapa_atual: "{flow em execução}"
    ultima_task: "{última task executada}"
  decisions:
    - "{decisão importante 1}"
    - "{decisão importante 2}"
  artifacts_generated:
    - "{artefato 1 gerado}"
    - "{artefato 2 gerado}"
  blockers:
    - "{blocker ativo, se houver}"
  next_action: "{o que o agente entrante deve fazer}"
```

### Ao entrar (novo agente)

O agente entrante recebe:
1. Sua própria **persona completa** (arquivo .codex/agents/{id}.md)
2. O **artefato de handoff** compacto do agente anterior
3. **NÃO** recebe a persona completa do agente anterior

---

## Limites de Compactação

| Limite | Valor |
|--------|-------|
| Tamanho máximo do artefato | 500 tokens |
| Máximo de handoffs retidos na sessão | 3 |
| Máximo de decisions no artefato | 5 |
| Máximo de artifacts_generated | 8 |
| Máximo de blockers | 3 |

---

## O Que Preservar (SEMPRE incluir)

- Cliente ativo e seu path
- Flow/etapa em execução
- Última task executada
- Artefatos gerados (com paths)
- Decisões estratégicas tomadas
- Blockers ativos

## O Que Descartar (NUNCA carregar)

- Persona completa do agente anterior
- Lista de comandos do agente anterior
- Dependências do agente anterior
- Templates de greeting do agente anterior

---

## Exemplo de Sessão

```
@cs cria onboarding → @strategist analisa briefing

Após troca:
- Persona @cs (~3K tokens) → DESCARTADA
- Artefato handoff (~400 tokens) → RETIDO
  - cliente_ativo: "Clínica São Paulo"
  - última_task: "gerar-onboarding-final"
  - artifacts_generated: ["clientes/clinica-sp/onboarding/briefing.md"]
  - next_action: "analisar briefing e gerar plano estratégico"
- Persona @strategist (~3K tokens) → CARREGADA

Total contexto: ~3.4K em vez de ~6K (43% redução)
```

---

## Armazenamento

Artefatos de handoff ficam em memória de sessão.
Para handoffs persistentes entre sessões: `.aiox/handoffs/` (se configurado).
