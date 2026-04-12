---
name: criar-plano-estrategico
agent: estrategista
description: Criar o plano estratégico completo que vai guiar todas as ações de campanha, copy, design e tráfego
inputs:
  - .agencyos/clientes/{nome}/estrategia/analise-briefing.md
  - .agencyos/clientes/{nome}/onboarding/briefing-final.md
outputs:
  - .agencyos/clientes/{nome}/estrategia/plano-estrategico.md
elicit: false
---

# Criar Plano Estratégico

## Objetivo

Transformar o briefing e a análise em um plano estratégico que oriente todo o trabalho dos demais agentes — tráfego, copy, design e CS.

## Regra

```
O plano estratégico é a fonte da verdade para todos os agentes de execução.
Nenhuma campanha, copy ou criativo deve existir sem referência ao plano.
```

---

## Passo a passo

### 1. Ler análise e briefing

Carregar:
- `.agencyos/clientes/{nome}/estrategia/analise-briefing.md`
- `.agencyos/clientes/{nome}/onboarding/briefing-final.md`

### 2. Gerar o plano estratégico

Criar `.agencyos/clientes/{nome}/estrategia/plano-estrategico.md`:

```markdown
# Plano Estratégico — {Nome do Cliente}

**Versão:** 1.0
**Data:** {data}
**Elaborado por:** Vera (Estrategista)
**Status:** RASCUNHO | VALIDADO

---

## 1. Resumo Executivo

| Item | Definição |
|------|-----------|
| Objetivo principal | {leads / vendas / agendamentos / awareness} |
| Meta primária (30 dias) | {número concreto — ex: 100 leads com CPL até R$30} |
| Budget de mídia | R$ {valor}/mês |
| Canais principais | {Meta Ads / Google Ads / ambos} |
| Prazo de início | {data estimada} |

---

## 2. Diagnóstico

**Situação atual:**
{2-3 linhas sobre o negócio, o momento e o contexto de mercado}

**Principal problema a resolver:**
{o que está impedindo crescimento agora}

**Nível de maturidade:**
{iniciante no digital / já rodou mas sem resultado / tem base e quer escalar}

---

## 3. ICP — Persona Estratégica

**Nome da persona:** {ex: "A Dona do Salão" ou "O Empresário Local"}

**Perfil:**
- Idade: {faixa}
- Gênero: {homem/mulher/ambos}
- Localização: {cidade/região/online}

**Nível de consciência:** {inconsciente do problema / consciente do problema / consciente da solução / consciente do produto}

**Dores que mais movem:**
1. {dor 1 — nas palavras dela}
2. {dor 2}
3. {dor 3}

**O que ela quer chegar:**
1. {desejo 1}
2. {desejo 2}

**Objeções que precisamos vencer:**
1. {objeção 1 + como responder}
2. {objeção 2 + como responder}

---

## 4. Oferta Estratégica

**O que estamos vendendo:** {descrição direta}
**Promessa central:** {transformação entregue em 1 linha}
**Mecanismo que viabiliza a promessa:** {como você entrega — o diferencial do método}
**Prova de que funciona:** {depoimentos, números, resultados}
**Ângulo de entrada:** {como vamos apresentar a oferta — dor / desejo / oportunidade}

---

## 5. Posicionamento e Narrativa

**Posicionamento:** {quem somos, para quem somos, o que nos diferencia}
**Narrativa central:** {o fio condutor da comunicação}
**Tom de voz:** {formal / informal / especialista / empático / direto / aspiracional}

---

## 6. Canais e Justificativa

| Canal | Por que usar | Objetivo no canal |
|-------|-------------|-------------------|
| Meta Ads | {razão} | {ex: geração de leads} |
| Google Ads | {razão} | {ex: captura de demanda} |
| WhatsApp | {razão} | {ex: nutrição e fechamento} |

---

## 7. Funil Macro

```
TOPO    → {o que faz: awareness, alcance, impacto)
        → Canal: {canal} | Tipo: {tipo de campanha}

MEIO    → {o que faz: consideração, engajamento, nutrição}
        → Canal: {canal} | Tipo: {tipo de campanha}

FUNDO   → {o que faz: conversão, compra, agendamento}
        → Canal: {canal} | Tipo: {tipo de campanha}

RETENÇÃO → {o que faz: recompra, indicação, fidelização}
         → Canal: {canal} | Tipo: {tipo de campanha}
```

---

## 8. Estrutura de Campanhas Inicial

| Campanha | Objetivo | Público | Budget |
|----------|----------|---------|--------|
| CP-001 — {nome} | {objetivo} | {audiência} | R$ {valor} |
| CP-002 — {nome} | {objetivo} | {audiência} | R$ {valor} |

**Nomenclatura das campanhas:** `{CLIENTE}_{OBJETIVO}_{CANAL}_{TIPO}_{ID}`

---

## 9. KPIs e Metas

| Métrica | Meta | Considerado Crítico se... |
|---------|------|--------------------------|
| CPL | R$ {valor} | > R$ {valor crítico} |
| CPA | R$ {valor} | > R$ {valor crítico} |
| CTR | {%} | < {% mínimo} |
| ROAS | {x} | < {x mínimo} |

---

## 10. Hipóteses Iniciais

```
H1: {hipótese de ângulo — ex: "ângulo de dor vai converter mais do que desejo neste mercado"}
H2: {hipótese de canal — ex: "Meta vai performar melhor que Google neste segmento"}
H3: {hipótese de formato — ex: "vídeo curto vai ter CPL menor que imagem estática"}
```

---

## 11. Cronograma Macro

| Semana | O que acontece |
|--------|----------------|
| Semana 1 | Setup técnico concluído. Copywriter e Designer produzindo. |
| Semana 2 | Campanhas no ar. Início de coleta de dados. |
| Semana 3 | Primeira otimização baseada em dados. |
| Semana 4 | Relatório do primeiro mês. Decisão de escala ou ajuste. |

---

## 12. Próximos Passos Imediatos

1. {ação 1} — Responsável: {agente} — Prazo: {data}
2. {ação 2} — Responsável: {agente} — Prazo: {data}
3. {ação 3} — Responsável: {agente} — Prazo: {data}
```

### 3. Marcar status

Iniciar como `RASCUNHO`. Marcar como `VALIDADO` após revisão interna ou alinhamento com o cliente.

## Output esperado

- `plano-estrategico.md` completo e assinado pela Estrategista
- Handoff disponível para: Max (`*ler-cliente`), Cal (`*analisar-icp`), Lux (`*ler-branding`)
