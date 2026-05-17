---
name: criar-hipoteses
agent: strategist
description: Formular hipoteses de campanha antes da execucao — o que acreditamos que funciona e por que
inputs:
  - .em5/clientes/{nome}/estrategia/plano-estrategico.md (ou secao de funil)
  - .em5/clientes/{nome}/estrategia/posicionamento.md
  - briefing-final
outputs:
  - secao de hipoteses no plano-estrategico.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Criar Hipoteses

## Objetivo

Documentar hipoteses de campanha antes de gastar 1 real. Toda acao de marketing é um teste — e teste sem hipotese é tiro no escuro.

## Regra

```
Hipotese sem criterio de sucesso nao é hipotese, é torcida.
Cada hipotese precisa ter: se X entao Y medindo Z em N dias.
```

---

## Passo a passo

### 1. Ler contexto estratégico

Ler plano estrategico, posicionamento, funil macro e briefing do cliente.

### 2. Formular hipoteses

Para cada area do funil, criar hipoteses no formato:

```markdown
## Hipoteses de Campanha

### H1 — [Area do funil]
**Se:** {acao que vamos tomar}
**Entao:** {resultado esperado}
**Medindo:** {metrica principal}
**Em:** {janela de tempo — 7, 14 ou 30 dias}
**Por que:** {raciocinio por tras da hipotese — baseado em que?}
**Criterio de sucesso:** {valor ou patamar que confirma a hipotese}
```

### 3. Categorias de hipoteses

Criar pelo menos uma hipotese em cada categoria:

#### A) Hipotese de Oferta
- A oferta como comunicada converte no canal escolhido?
- Exemplo: "Se comunicarmos garantias de resultado em vez de features, entao a taxa de conversao da LP aumenta 20% em 14 dias."

#### B) Hipotese de Canal
- O canal escolhido é eficiente para esse ICP?
- Exemplo: "Se rodarmos Meta Ads com video UGC para publico frio, entao CPL ficara abaixo de R$15 em 7 dias."

#### C) Hipotese de Angulo
- O angulo de comunicacao ressoa com o ICP?
- Exemplo: "Se usarmos angulo de urgencia (vagas limitadas) em vez de angulo de desejo, entao CTR sera 50% maior em 7 dias."

#### D) Hipotese de Formato
- O formato criativo performa no canal?
- Exemplo: "Se usarmos criativo estatico com texto longo em vez de video, entao CPA sera menor em 14 dias."

#### E) Hipotese de Publico
- O publico selecionado é o que melhor responde?
- Exemplo: "Se segmentarmos por interesse em X em vez de lookalike de clientes, entao qualidade de leads sera maior em 14 dias."

### 4. Criar documento

```markdown
# Hipoteses de Campanha — {Nome do Cliente}

**Data:** {data}
**Definidas por:** Vera (Estrategista)

---

| ID | Categoria | Hipotese | Metrica | Criterio Sucesso | Janela | Status |
|----|-----------|----------|---------|-------------------|--------|--------|
| H1 | Oferta | Se... entao... | CPA | < R$X | 14 dias | PENDENTE |
| H2 | Canal | Se... entao... | CPL | < R$X | 7 dias | PENDENTE |
| H3 | Angulo | Se... entao... | CTR | > X% | 7 dias | PENDENTE |
| H4 | Formato | Se... entao... | CPA | < R$X | 14 dias | PENDENTE |

---

## Detalhamento

### H1 — {titulo}
**Detalhe:** {explicacao mais completa}
**Como testar:** {como vamos validar na pratica}
**O que se aprende se falhar:** {valor de aprendizado mesmo se der errado}
```

### 5. Vincular ao ciclo de aprendizado

Explicar como as hipoteses serao validadas:
- Quem monitora (Gestor de Tráfego)
- Onde registra (log-performance-criativa.md)
- Quando revisa (7 dias para metricas de topo, 14 dias para conversao)

### 6. Atualizar log operacional

```markdown
| {data} | ESTRATÉGIA | Estrategista | {N} hipoteses definidas para {cliente} | CONCLUÍDO | Iniciar execucao e monitoramento |
```

---

## Output esperado

- Hipoteses documentadas com criterios claros de sucesso
- Vinculo com responsaveis de validacao
- Log operacional atualizado
- Pronto para `*criar-plano-estrategico {nome}` (se ainda nao criou) ou execucao direta
