---
nome: carrossel-ig
skill: (calendário OR pedido)
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 24-48h
qa_gate: true
versao: 1.0
---

# Receita: Carrossel Instagram

> 10 slides — hook capa + desenvolvimento + CTA específico.

## Steps

### 1. @strategist tema + ângulo
Tema · dor/desejo ICP · CTA.

### 2. @copywriter estrutura 10 slides
**Usa bloco:** `.em5/blocos/copy-escrever-com-angulo.md`
Slide 1 capa-hook · 2-9 desenvolvimento (1 ideia/slide) · 10 CTA específico.

### 3. @designer produz
**Usa bloco:** `.em5/blocos/designer-gerar-imagem.md`
10 PNGs 1080×1350 + capa otimizada.

### 4. @qa valida
**Usa bloco:** `.em5/blocos/qa-validar-criativo.md` + `.em5/blocos/qa-validar-copy.md`
Hook slide 1 forte · fluxo lógico · branding · CTA específico (não "comente abaixo").

### 5. @cs agenda
Meta Business Suite OR manual.

## Outputs
- `clientes/{nome}/social/carrosseis/{data}/slides/*.png`
- `clientes/{nome}/social/carrosseis/{data}/copy-feed.md`

## Métricas
- Prazo: <= 48h
- Taxa salvamentos: >= 5% impressões

## Composio MCP
- meta_business_suite · instagram_business
