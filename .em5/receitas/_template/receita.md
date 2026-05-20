---
nome: {nome-receita}
skill: /{comando-humano}
tipo: operacional  # operacional | estrategico | hibrido
classificacao_skill: operacional  # operacional (pula @ceo) | estrategico (passa @ceo) | hibrido
agente_orquestrador: coo  # coo (operacional) | ceo (estratégico)
agente_responsavel_entrega: {agente-final}
tempo_medio: 5-15min
qa_gate: true  # true | false
versao: 1.0
---

# Receita: {Nome da Operação}

> {1 frase descritiva do que essa receita resolve}

## Quando usar

- {Contexto 1 que dispara essa operação}
- {Contexto 2}
- {Contexto 3}

## Não usar quando

- {Anti-caso 1}
- {Anti-caso 2}

## Inputs necessários

- {input 1 — path OR parametro}
- {input 2}
- {input 3}

## Steps

### 1. @{agente1} — {nome-step}

**Tempo:** {Xmin}

**Inline OR bloco:**
- Se INLINE (específico desta receita): descrever ações detalhadas aqui
- Se BLOCO (reusável 2+ vezes): `usa bloco: blocos/{nome-bloco}.md`

**Output:**
- {arquivo gerado OR estado mudado}

**Anotação no ticket:**
- yaml `status: done` + `veredito: aprovado/reprovado` + `output: {path}` + observações

---

### 2. @{agente2} — {nome-step}

**Tempo:** {Xmin}

**Usa bloco:** `.em5/blocos/{nome-bloco}.md`

**Output:**
- {arquivo}

---

### 3. @{agente3} — {nome-step}

...

## Outputs esperados

| Artefato | Path | Quem gera |
|----------|------|-----------|
| {nome 1} | `clientes/{nome}/{path}` | @{agente1} |
| {nome 2} | `historico/{ticket}/ticket.md` (anotações) | todos |
| {nome 3} | `clientes/{nome}/{path}` | @{agente3} |

## Anti-padrões

- ❌ {anti-padrão 1 e por quê}
- ❌ {anti-padrão 2}
- ❌ {anti-padrão 3}

## Métricas alvo

- Tempo total: <= {Xmin}
- Taxa primeira aprovação QA: >= {X%}
- {outra métrica chave}

## Composio MCP usados

- {toolkit 1} (ex: meta_ads)
- {toolkit 2} (ex: asaas)

## Relação outras receitas

- **Precede:** {receita que normalmente vem antes — ex: check-cliente}
- **Sucede:** {receita que normalmente vem depois — ex: iteracao-criativa}
- **Bloqueia:** {receita que NÃO pode rodar se esta falhar}
