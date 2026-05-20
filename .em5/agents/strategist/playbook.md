# Playbook Strategist — Vera

> Referência expert para @strategist. Estratégia de marketing, posicionamento, ICP, funil, hipóteses.

## Princípio

**Strategist pensa, não opera.** Define o quê + porque + pra quem. Quem executa é @traffic/@copy/@designer.

## Framework central — Plano Estratégico

Todo cliente tem `clientes/{nome}/estrategia/plano-estrategico.md`. Estrutura:

```markdown
## 1. Diagnóstico
- Situação atual (briefing-final)
- Resultado vs esperado
- 3 dores principais

## 2. Posicionamento
- Quem somos PRA esse cliente (1 frase)
- O que NÃO somos (3 itens)
- Por que cliente escolhe vs concorrente

## 3. ICP (Ideal Customer Profile)
- Demografia (idade + gênero + região + classe)
- Psicografia (dor + desejo + objeção)
- Comportamento (onde consome, decisor, ticket médio)
- ANTI-ICP (quem evitar)

## 4. Funil
- TOFU: awareness (canais + métrica)
- MOFU: consideração (canais + métrica)
- BOFU: decisão (canais + métrica)
- Pós-venda: retenção/upsell (canais + métrica)

## 5. Canais + verbas
- % budget por canal + justificativa
- Sequência testing (qual primeiro)

## 6. Hipóteses (testar via ab-test-ciclo)
- H1: Se [mudança], então [resultado], porque [mecanismo]
- H2: ...
- H3: ...

## 7. KPIs alvo
- KPI primário (1 só — o que define sucesso)
- KPIs secundários (2-3 — sinais saúde)
- Thresholds alerta (quando agir)

## 8. Cronograma 90d
- Mês 1: foco X
- Mês 2: foco Y
- Mês 3: foco Z + review
```

Revisar trimestralmente via `qbr-trimestral.yaml`.

## 5 Ângulos estratégicos (escolher 1 dominante)

| Ângulo | Quando |
|--------|--------|
| **DOR** | Problema claro e urgente cliente reconhece |
| **DESEJO** | Aspiração/transformação (lifestyle, status) |
| **PROVA** | Mercado maduro, cliente cético, precisa case |
| **CONTRAINTUITIVO** | Quebra crença comum do nicho ("não é X que você precisa") |
| **STATUS** | Premium, segmento alto, identidade aspiracional |

NÃO misturar 5 ao mesmo tempo. Dominante + 1-2 secundários.

## Frameworks de positioning

### April Dunford — "I just need to obviously be better at THE thing"

1. Competitivas alternativas (não só competidores diretos — incluir "fazer in-house", "não fazer nada")
2. Unique attributes (o que só agência tem)
3. Value (resultado real cliente recebe)
4. Best for (segmento específico onde valor é máximo)
5. Market category (como cliente se descreveria buscando)

### Jobs-to-be-done

"Cliente contrata [produto] pra realizar [job] em [contexto] quando [trigger]."

Exemplo: "Cliente contrata [agência] pra realizar [previsibilidade de leads qualificados] em [crescimento de receita] quando [time interno não dá conta]."

## Validação hipótese (antes A/B test)

1. **Específica:** "Se mudarmos X, então Y vai melhorar Z%, porque mecanismo W"
2. **Mensurável:** métrica primária definida
3. **Refutável:** existe resultado que prova falsa?
4. **Amostra viável:** N suficiente em <= 30d?
5. **Risco aceitável:** se falhar, perda <= Y?

Se sim aos 5 → rodar `ab-test-ciclo.yaml`. Senão refinar.

## Anti-padrões

- Estratégia genérica ("crescer mais", "engajar mais")
- ICP vago ("todos que querem comprar")
- 10 KPIs simultâneos — 1 primário, max 3 secundários
- Mudar plano a cada relatório — review trimestral, não semanal
- Sem hipótese testável → cego pra aprendizado
- Ignorar dados (rodar pelo gut sem A/B)
- Copiar concorrente cegamente (cada cliente é diferente)
- Estratégia sem ANTI-ICP (quem cliente NÃO é)

## Métricas próprias

- % planos com hipótese testável: 100%
- % planos com KPI primário único: 100%
- Taxa hipóteses confirmadas: tracked (input pra refinement)
- Tempo médio plano-estratégico (greenfield): <= 5h
- % QBRs com decisões executadas: > 80%

## Tools úteis

- `criar-plano-estrategico.md` (task)
- `analisar-briefing.md`
- `analisar-concorrentes.md`
- `criar-hipoteses.md`
- `definir-posicionamento.md`
- `validar-objetivo-real.md` — testa se objetivo cliente é REAL (não é "mais leads" — é "mais receita previsível")
