---
name: desenhar-spec
agent: arq
description: Após entrevistar, escreve spec.md completa pro @builder implementar
inputs:
  - .em5/infra/forge/{ticket}/entrevista.md
outputs:
  - .em5/infra/forge/{ticket}/spec.md
elicit: false
model_tier: frontier
---

# Task: desenhar-spec

## Objetivo

Transformar entrevista.md em spec.md acionável pro @builder Cunha. Spec contém TUDO que Cunha precisa pra implementar sem perguntar de novo.

## Passo a passo

### 1. Copiar template

Copia `.em5/infra/forge/_template/spec.template.md` → `.em5/infra/forge/{ticket}/spec.md`.

### 2. Preencher seções

Em ordem:
1. Necessidade real (1-2 parágrafos)
2. Componentes a criar (tabela)
3. Decisões arquiteturais (layer, model_tier, handoff)
4. Anti-papel (mínimo 3)
5. Composio toolsets necessários
6. Gate-matrix coverage por output
7. Learnings a inicializar
8. Critério ≤ 5 min validado
9. Arquivos a editar (lista exata)
10. Plano de teste (3 testes mínimos)

### 3. Validar contra constitution

Antes de fechar spec, checa cada artigo:
- Art. I: gera artefato? Sim.
- Art. II: domínio único? Confirma.
- Art. V: scope sem invasão? Confirma.
- Art. IX: só Composio? Se precisar de MCP novo → BLOQUEIA spec, propõe fallback manual.
- Art. XII: ≤ 5 min input? Se não, fragmenta.

### 4. Apresenta spec pro user

Mostra spec em formato compacto:
```
🏛️ Spec CT-{NNN}:
- Vai criar: {agente X} + {tasks Y} + {skill Z}
- Tempo estimado de execução do builder: {min}
- Após pronto, testa com: {comando}

[A] Aprovado, pode implementar
[R] Quero revisar antes
[M] Mudar escopo
```

### 5. Se aprovado → handoff @builder

Atualiza spec status: `draft` → `approved`. Chama @builder Cunha passando ticket.

### 6. Se revisar → ajusta spec sem refazer entrevista

User aponta o que mudar. Arq edita spec. Repete passo 4.

## Critério de saída

- spec.md preenchida 100%
- Constitution checks passaram
- User aprovou
- Status = approved
- @builder notificado

## Log

| {data} | SPEC | Arq | CT-{NNN} spec.md aprovada | CONCLUÍDO | @builder *implementar-componente |
