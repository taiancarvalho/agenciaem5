---
nome: prospec-fechamento
skill: /proposta
tipo: estrategico
classificacao_skill: estrategico
agente_orquestrador: ceo
agente_responsavel_entrega: vendas
tempo_medio: 7-21d (ciclo venda)
qa_gate: false
versao: 1.0
---

# Receita: Prospec → Fechamento Comercial

> Pesquisa → qualifica → diagnostico → proposta → CEO aprova → fechamento → trigger onboarding.

## Quando usar
- Lead novo entrou (form/cold/indicação)
- Skill `/proposta {prospect}`

## Steps

### 1. @vendas pesquisa prospect
Site + redes + Ad Library + LinkedIn + Reclame Aqui. Max 30min.

### 2. @vendas qualifica (ICP fit)
6 critérios PROCEDE. Score >= 5/6 → diagnóstico.

### 3. @vendas call diagnóstico (45min)
Pauta: contexto · resultados atuais · objetivo · budget · próx passos.

### 4. @vendas cria proposta
Skill `/em5-proposta-docx`. 3 níveis preço (anchor + recomendado + escasso).

### 5. @ceo aprova proposta
Critérios: margem >= 30% · fit posicionamento · capacidade operacional · risco compliance OK.

### 6. @vendas envia + follow-up
Cadência D+1/3/7/14 break-up.

### 7. @vendas fechamento (aceite formal)
Contrato assinado.

### 8. @fin + @cs trigger onboarding
Cadastra Asaas + cria workspace + dispara `onboarding-cliente.md`.

## Outputs
- `vendas/prospects/{slug}/diagnostico.md`
- `vendas/prospects/{slug}/proposta.docx`
- `vendas/prospects/{slug}/contrato-assinado.pdf`
- Cliente ativo em `clientes/{nome}/`

## Métricas
- Taxa qualificação: > 40%
- Taxa fechamento: > 25%
- Ciclo venda: <= 21d

## Composio MCP
- linkedin · gmail · asaas · docuseal
