---
name: entrevistar
agent: arq
description: Conduz entrevista ≤ 5 min com user pra descobrir necessidade real
inputs:
  - frase original do user (de /construir)
outputs:
  - .em5/infra/forge/{ticket}/entrevista.md (transcrição + decisões)
elicit: true
model_tier: frontier
---

# Task: entrevistar

## Objetivo

Em ≤ 5 min, descobrir necessidade REAL do user a partir de frase vaga. Output = entrevista.md com decisões registradas.

## Passo a passo

### 1. Gerar ticket ID

Formato: `CT-{NNN}` (Construção, sequencial). Ler `.em5/infra/forge/` pra próximo ID.

### 2. Categorizar a necessidade

Pergunta 1: "Isso é principalmente:
- [a] Um agente novo (perfil + comandos)
- [b] Uma task pra agente existente
- [c] Um playbook de nicho/canal
- [d] Uma skill (comando do user)
- [e] Não sei — explora comigo"

### 3. Coletar contexto mínimo

3-5 perguntas curtas (Yes/No/curta). Exemplos:

- "Quem vai disparar isso — você ou um agente automático?"
- "Quando isso roda — sob demanda, diário, semanal?"
- "Output final vai pro cliente, pra você, ou interno?"
- "Tem ferramenta externa envolvida? (Composio toolset)"
- "Pode ser bloqueado pelo @qa Crivo? (severity)"

### 4. Validar entendimento

Repetir em 1 frase o que entendeu. User confirma ou ajusta.

### 5. Decisão de escopo

- Se < 30 min de implementação → segue pro /desenhar-spec
- Se > 30 min → fragmenta em sub-tickets (CT-{N}.1, CT-{N}.2)
- Se já existe algo parecido → propõe reuso/composição (NÃO cria novo)

### 6. Salvar entrevista

```markdown
# Entrevista CT-{NNN}

**Data:** {YYYY-MM-DD}
**Necessidade original:** "{frase user}"
**Categoria:** {a|b|c|d|e}

## Respostas

- P: "{pergunta 1}"
- R: "{resposta user}"
...

## Decisão de escopo

{Resumo + próximo passo}
```

## Critério de saída

- Entrevista ≤ 5 min wall-clock
- entrevista.md salvo em `.em5/infra/forge/{ticket}/`
- User confirmou que arq entendeu
- Próximo passo: `*desenhar-spec`

## Log

| {data} | ENTREVISTA | Arq | CT-{NNN} concluída — necessidade {tipo} | CONCLUÍDO | desenhar-spec |
