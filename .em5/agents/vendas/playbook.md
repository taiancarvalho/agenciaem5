# Playbook Vendas — Caça

> Referência expert para @vendas. Prospect → fechamento. Vende a agência, não opera campanha.

## Princípio

**Vendas qualifica e vende — não opera.** Cliente fechado vira automaticamente onboarding via `prospec-fechamento.yaml`.

## Funil de vendas

```
LEAD → MQL (Marketing Qualified) → SQL (Sales Qualified) → DIAGNOSTICO → PROPOSTA → FECHADO
```

| Estágio | Quem define | Critério |
|---------|------------|----------|
| LEAD | Captação (form, cold, indicação) | Tem nome + contato |
| MQL | @vendas | Score qualificação básico (fit ICP) |
| SQL | @vendas | Score alto + sinal compra (call agendada) |
| DIAGNOSTICO | @vendas | Call 30-45min feita |
| PROPOSTA | @vendas + @ceo | Proposta enviada |
| FECHADO | @vendas | Aceite formal cliente |

## ICP qualificado (critérios PROCEDE)

| Critério | Threshold mínimo |
|----------|------------------|
| Faturamento | >= R$ 500k/ano |
| Maturidade | Tem produto/serviço definido (não é ideia) |
| Investimento marketing | Já investe OU dor explícita declarada |
| Decisor | Identificado + contato direto |
| Tamanho time | Não precisa equipe interna marketing |
| Fit posicionamento agência | Compatível com nicho/oferta agência |

Se 5/6 → PROCEDE. Se 3-4 → NUTRIR-3M. Se < 3 → DESCARTAR.

## Pesquisa pré-call (fontes)

| Fonte | Pra que |
|-------|---------|
| Site empresa | Posicionamento + oferta atual |
| Redes sociais | Maturidade digital + tom |
| Meta Ad Library | Rodando ads? Quais? Quanto tempo? |
| Google Search | Visibilidade orgânica |
| Reclame Aqui | Saúde reputação |
| LinkedIn decisor | Background + tempo cargo |
| BuiltWith | Stack técnica (sinal de maturidade) |

**Pesquisa < 30min total.** Se gastar mais, lead provavelmente é DESCARTAR.

## Call diagnóstico (pauta 45min)

| Tempo | Bloco | Objetivo |
|-------|-------|----------|
| 5min | Contexto negócio | Aquecimento + entender modelo |
| 10min | Resultados atuais + ferramentas + agência anterior | Diagnosticar dor real |
| 10min | Objetivo próximos 6-12m | Validar fit com oferta |
| 5min | Budget + expectativa | Qualificar capacidade |
| 5min | Próximos passos | Fechar próximo step (proposta D+3) |

## Proposta — estrutura de alta-conversão

| Seção | Por quê |
|-------|---------|
| Diagnóstico (1 pg) | Mostra que entendeu — não é template |
| Proposta de valor | Como agência resolve dor específica |
| Escopo detalhado | Cliente sabe exatamente o que recebe |
| Cronograma | Onboarding + primeira campanha + relatórios |
| Investimento (3 níveis) | Anchor + recomendado + escasso |
| Cases anonimizados | Prova social |
| Próximos passos + validade | Urgência real (não fake scarcity) |

Skill: `/em5-proposta-docx`.

## Cadência follow-up

| Dia | Ação |
|-----|------|
| D+1 | Confirmação recebimento (email curto) |
| D+3 | Checagem + oferta call sanar dúvidas |
| D+7 | Última cadência (objeção escalation) |
| D+14 | Marcar PERDIDO OR NUTRIR-3M |

NUTRIR-3M = cadência mensal soft (newsletter agência, cases, conteúdo top) por 3 meses. Depois reseta.

## Tipos de objeção comuns + respostas

| Objeção | Resposta |
|---------|----------|
| "Preço alto" | Mostrar ROI esperado vs investimento (não diminuir preço) |
| "Vou pensar" | Identificar bloqueio real (perguntar "o que precisa pra decidir até X?") |
| "Já tenho agência" | Pedir comparativo de resultados — se atual entrega, agradece e sai |
| "Não tenho budget" | Validar se é fit OR se NUTRIR-3M (não fechar mal cliente) |
| "Faço internamente" | Calcular custo real (salário + tempo) vs agência |
| "Outra agência X% mais barato" | Mostrar diferenciação — se for igual, é commodity, sair |

## Métricas próprias

- Taxa qualificação (PROCEDE/total): > 40%
- Taxa diagnóstico → proposta: > 70%
- Taxa fechamento (FECHADO/PROPOSTA): > 25%
- Ticket médio alvo: definido em `em5-config.yaml`
- Ciclo venda médio: <= 21d (LEAD → FECHADO)
- LTV alvo: 12-24 meses (renovação contrato)

## Anti-padrões

- Vender pra fora ICP (cliente errado = churn)
- Reduzir preço sem reduzir escopo (margem morre)
- Prometer entregas fora escopo agência (resolve dor que não é nossa)
- Não qualificar (perde tempo com lead frio)
- Follow-up agressivo (queima ponte)
- Fechar sem @ceo aprovar (governance + margem)

## Aprendizado de perdidos

Toda perda registrada em `vendas/outreach/historico-perdidos.md` com:
- Motivo real (perguntar diretamente)
- Estágio do funil que perdeu
- Concorrente vencedor (se aplicável)

→ Input pra `icp-refinement.yaml` trimestral.
