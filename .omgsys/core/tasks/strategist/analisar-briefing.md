---
name: analisar-briefing
agent: strategist
description: Ler e analisar o board do cliente para extrair o objetivo real, ICP, oferta e contexto estratégico
inputs:
  - .omgsys/clientes/{nome}/onboarding/board-cliente.md
  - .omgsys/clientes/{nome}/memoria/notas-sessao.md
outputs:
  - análise estruturada em memória (base para as tarefas seguintes)
  - .omgsys/clientes/{nome}/estrategia/analise-briefing.md
elicit: false
---

# Analisar Briefing

## Playbook de Referência
- Ler `.omgsys/clientes/{nome}/memoria/notas-sessao.md` — últimas 3 entradas antes de qualquer análise
- Verificar se já existe `analise-briefing.md` de versão anterior — se sim, identificar o que mudou

## Objetivo

Ler o board do cliente com olhos estratégicos — separar o que o cliente declarou do que ele realmente precisa, e identificar os elementos que vão guiar o plano.

## Regra

```
O que o cliente diz que quer nem sempre é o que ele precisa.
A Estrategista confirma o objetivo real antes de montar qualquer plano.
```

---

## Passo a passo

### 1. Ler o board completo

Acessar `.omgsys/clientes/{nome}/onboarding/board-cliente.md` e ler do início ao fim antes de extrair qualquer insight. Verificar score de maturidade calculado pelo @cs — ele define o que é viável propor.

### 2. Extrair análise estruturada

Gerar `.omgsys/clientes/{nome}/estrategia/analise-briefing.md` com:

```markdown
# Análise de Briefing — {Nome do Cliente}

**Data:** {data}
**Analisado por:** Vera (Estrategista)
**Score de maturidade do cliente:** {X}/100

---

## Objetivo Declarado vs Objetivo Real

**O que o cliente disse:** {citar diretamente}
**O que provavelmente é o objetivo real:** {interpretação estratégica}
**Confirmação necessária:** SIM / NÃO

---

## Diagnóstico de Situação Atual

**Nível de maturidade de marketing:** Iniciante / Intermediário / Avançado
**Maior problema detectado:** {problema central}
**Urgência:** Alta / Média / Baixa

**Contexto resumido:**
{2-3 linhas sobre o negócio e seu momento atual}

---

## ICP — Análise

**Clareza do ICP no board:** Alta / Média / Baixa
**Dores mais fortes identificadas:**
1. {dor principal — extraída das palavras do cliente}
2. {dor secundária}
3. {dor terciária}

**Nível de consciência estimado:** Inconsciente / Consciente do problema / Consciente da solução / Consciente do produto

**Linguagem do ICP para usar na copy:**
> {citações ou paráfrases do board}

---

## Oferta — Análise

**Clareza da oferta:** Alta / Média / Baixa
**Promessa central identificada:** {o que o cliente promete entregar}
**Diferencial real:** {o que genuinamente diferencia — se houver}
**Gaps identificados:** {o que está faltando na oferta para ser mais vendável}

---

## Infraestrutura — Diagnóstico

| Item | Status | Impacto na Estratégia |
|------|--------|----------------------|
| Landing Page | {ok/precisa criar/ruim} | {o que isso muda} |
| Pixel | {ok/não tem/pendente} | {o que isso muda} |
| Criativos | {tem/não tem/parcial} | {o que isso muda} |

---

## Riscos e Alertas

- {risco 1 — ex: cliente sem tracking vai limitar otimização}
- {risco 2 — ex: oferta pouco diferenciada em mercado competitivo}
- {alerta 3}

---

## Perguntas para confirmar com cliente (se necessário)

- {pergunta 1}
- {pergunta 2}
```

### 3. Identificar o que está faltando

Se o board tiver lacunas críticas, registrar e solicitar ao CS que colete antes de avançar:

```
⚠️ Lacunas críticas identificadas:
- {item faltando}
- Solicitar ao CS: *coletar-board {nome} — perguntas adicionais
```

## Em caso de falha

Se board incompleto ou score de maturidade < 30 (cliente não está pronto):

```
Problema identificado: board incompleto / cliente sem maturidade para avançar
Causa-raiz provável: @cs não coletou informações obrigatórias | cliente não sabe responder
Agente responsável: @cs
Ação corretiva: retornar ao @cs para coletar seções faltantes | recomendar produto diferente se score < 30
Prioridade: CRÍTICO
Retestar após: board completo com todos os campos obrigatórios preenchidos
```

## Output esperado

- `analise-briefing.md` completo
- Clareza sobre objetivo real, ICP e oferta
- Alertas de risco documentados
- Pronto para: `*criar-plano-estrategico {nome}`

## Atualizar memória

Ao terminar, adicionar entrada em `.omgsys/clientes/{nome}/memoria/notas-sessao.md`:

```
## Sessão {data}
**Agente:** @strategist
**Task executada:** analisar-briefing
**O que foi feito:** {resumo da análise}
**Decisões importantes:** {objetivo real identificado | score de maturidade | riscos principais}
**Atenção para próxima sessão:** {o que o próximo agente precisa saber}
```
