---
nome: ciclo-campanha
skill: /campanha
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 2-4h
qa_gate: true
versao: 1.0
---

# Receita: Ciclo Completo de Campanha

> Estratégia → produção (paralela) → QA → budget gate → publish.

## Quando usar
- Cliente com board completo (board-cliente.md)
- Nova campanha (não iteração — usar `/iterar`)

## Inputs
- `clientes/{nome}/onboarding/board-cliente.md`
- `clientes/{nome}/estrategia/plano-estrategico.md`
- Budget aprovado cliente (`em5-config.yaml`)

## Steps

### 1. @strategist plano estratégico
**Tempo:** 30-45min · inline (específico desta receita)
Lê briefing + concorrência → `clientes/{nome}/estrategia/plano-estrategico.md`

### 2. Wave paralela: @traffic + @copywriter + @designer
**Tempo:** 60-90min · 3 agentes em paralelo
- @traffic: estrutura campanha + audiências (`trafego/campanhas-ativas.md`)
- @copywriter: ângulos + copy (`copy/CR-XXX.md`)
- @designer: criativos (`design/CR-XXX-v1.png`)

### 3. @qa valida tudo
**Usa bloco:** `.em5/blocos/qa-validar-copy.md` + `.em5/blocos/qa-validar-criativo.md`
Veredito unificado.

### 4. @fin gate budget
**Usa bloco:** `.em5/blocos/fin-asaas-listar-status.md`
Veredictos: APROVADO | PENDENTE_PAGAMENTO_CLIENTE | INSUFICIENTE | EXCEDE_LIMITE.

### 5. @traffic publica
**Tempo:** 10-15min
Sobe campanha Meta/Google via Composio. Só com APROVADO step 3 + 4.

### 6. @cs comunica cliente
Email confirmação + cronograma monitoramento.

## Outputs
- `clientes/{nome}/estrategia/plano-estrategico.md`
- `clientes/{nome}/trafego/campanhas-ativas.md`
- `clientes/{nome}/copy/CR-*.md`
- `clientes/{nome}/design/criativos/CR-*-v1.*`
- Campanha ativa Meta/Google
- Ticket histórico

## Anti-padrões
- ❌ Publicar sem QA + Budget aprovados
- ❌ Pular wave paralela (sequencial dobra tempo)
- ❌ Misturar com iteração

## Métricas
- Duração total: <= 4h briefing → publicado
- Taxa primeira aprovação QA: >= 80%
- Cliente surpresa pós-publish: 0

## Composio MCP
- meta_ads · google_ads · asaas
