---
name: criar-plano-estrategico
agent: strategist
description: Criar o plano estratégico completo que vai guiar todas as ações de campanha, copy, design e tráfego
inputs:
  - clientes/{nome}/estrategia/analise-briefing.md
  - clientes/{nome}/onboarding/board-cliente.md
  - clientes/{nome}/memoria/notas-sessao.md
outputs:
  - clientes/{nome}/estrategia/plano-estrategico.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: false
---

# Criar Plano Estratégico

## Playbook de Referência
- Ler `clientes/{nome}/memoria/notas-sessao.md` — últimas 3 entradas antes de começar
- Verificar score de maturidade no `board-cliente.md` — define qual plano propor (completo / essencial / onboarding)

## Objetivo

Transformar o board e a análise em um plano estratégico que oriente todo o trabalho dos demais agentes — tráfego, copy, design e CS.

## Regra

```
O plano estratégico é a fonte da verdade para todos os agentes de execução.
Nenhuma campanha, copy ou criativo deve existir sem referência ao plano.
```

---

## Passo a passo

### 1. Ler análise e board

Carregar:
- `clientes/{nome}/estrategia/analise-briefing.md`
- `clientes/{nome}/onboarding/board-cliente.md`

### 2. Definir escopo do plano pelo score de maturidade

| Score | Plano a criar |
|-------|---------------|
| 80-100 | Plano completo — Meta + Google + UGC |
| 50-79 | Plano essencial — 1 canal principal |
| 30-49 | Plano de onboarding técnico + 1 canal após setup |
| < 30 | Não avançar — escalar para @cs recomendar produto diferente |

### 3. Gerar o plano estratégico

Criar `clientes/{nome}/estrategia/plano-estrategico.md`:

```markdown
# Plano Estratégico — {Nome do Cliente}

**Versão:** 1.0
**Data:** {data}
**Elaborado por:** Vera (Estrategista)
**Score de maturidade:** {X}/100
**Status:** RASCUNHO | VALIDADO

---

## 1. Resumo Executivo

| Item | Definição |
|------|----------|
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

**Nível de consciência:** {inconsciente / consciente do problema / consciente da solução / consciente do produto}

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
**Mecanismo:** {como você entrega — o diferencial do método}
**Prova:** {depoimentos, números, resultados}
**Ângulo de entrada:** {dor / desejo / oportunidade}

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
TOPO    → {awareness, alcance, impacto}
        → Canal: {canal} | Tipo: {tipo de campanha}

MEIO    → {consideração, engajamento, nutrição}
        → Canal: {canal} | Tipo: {tipo de campanha}

FUNDO   → {conversão, compra, agendamento}
        → Canal: {canal} | Tipo: {tipo de campanha}

RETENÇÃO → {recompra, indicação, fidelização}
          → Canal: {canal} | Tipo: {tipo de campanha}
```

---

## 8. Estrutura de Campanhas Inicial

| Campanha | Objetivo | Público | Budget |
|----------|----------|---------|--------|
| CP-001 — {nome} | {objetivo} | {audiência} | R$ {valor} |
| CP-002 — {nome} | {objetivo} | {audiência} | R$ {valor} |

---

## 9. KPIs e Metas

| Métrica | Meta | Crítico se... |
|---------|------|---------------|
| CPL | R$ {valor} | > R$ {valor crítico} |
| CPA | R$ {valor} | > R$ {valor crítico} |
| CTR | {%} | < {% mínimo} |
| ROAS | {x} | < {x mínimo} |

---

## 10. Hipóteses Iniciais

```
H1: {hipótese de ângulo}
H2: {hipótese de canal}
H3: {hipótese de formato}
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

### 4. Marcar status

Iniciar como `RASCUNHO`. Marcar como `VALIDADO` após revisão interna ou alinhamento com o cliente.

## Em caso de falha

Se análise de briefing tiver lacunas críticas que impeçam o plano:

```
Problema identificado: {ex: ICP não definido / objetivo real ambíguo / budget insuficiente}
Causa-raiz provável: board-cliente.md incompleto | análise de briefing rasa
Agente responsável: @cs para lacunas de board | @strategist para lacunas de análise
Ação corretiva: solicitar complemento ao @cs antes de prosseguir
Prioridade: CRÍTICO
Retestar após: board e análise completos
```

## Handoff para agentes de execução

**Arquivos que eles DEVEM ler:**
- `board-cliente.md` (sempre)
- `estrategia/plano-estrategico.md` (este arquivo)

**Resumo do que foi feito:** plano estratégico v{X} — ICP, oferta, canais, KPIs e cronograma definidos

**O que precisa de atenção:** {hipóteses principais | restrições de budget | risks identificados}

**Próximas tasks em paralelo:**
- @traffic: `*auditar-contas {nome}`
- @copywriter: `*analisar-icp {nome}`
- @designer: `*ler-branding {nome}`

## Atualizar memória

Ao terminar, adicionar entrada em `clientes/{nome}/memoria/notas-sessao.md`:

```
## Sessão {data}
**Agente:** @strategist
**Task executada:** criar-plano-estrategico
**O que foi feito:** plano v{X} criado — {canais definidos} | {meta principal}
**Decisões importantes:** {ângulo de entrada escolhido | distribuição de budget}
**Atenção para próxima sessão:** {hipóteses a validar | riscos mapeados}
```
