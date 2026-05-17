---
name: criar-calendario-conteudo
agent: copywriter
model_tier: balanced  # auto-set Fase 12.AAA — pre-v1.1 legacy migration
description: "Ver corpo do arquivo (formato legacy pre-v1.1, mantido por compatibilidade)"
elicit: false
---

# Task: criar-calendario-conteudo
# Agente: copywriter (Eco) + strategist (Vera)
# Input: plano-estrategico.md + canais do cliente
# Output: clientes/{nome}/copy/social/calendario-{mes}.md

## Objetivo
Criar calendário editorial mensal para social media orgânico,
definindo temas, formatos e objetivos por post.

## Inputs necessários
1. `.em5/clientes/{nome}/estrategia/plano-estrategico.md`
2. Canais do cliente (Instagram, Facebook, LinkedIn)
3. Frequência acordada (ex: 3x/semana)
4. Datas especiais do mês (feriados, eventos do nicho)

## Execução

### 1. Definir mix de conteúdo

Distribuição recomendada por objetivo:
```
40% — Educação / Valor (ensinar algo relacionado ao produto/serviço)
30% — Prova social / Resultado (depoimentos, casos, antes/depois)
20% — Bastidores / Humanização (processo, equipe, rotina)
10% — Oferta direta / CTA (produto, serviço, promoção)
```

### 2. Criar grade mensal

Para cada post planejado, definir:
- **Data:** {DD/MM}
- **Canal:** Instagram / Facebook / LinkedIn / todos
- **Formato:** feed-imagem / carrossel / reels / stories
- **Tema:** {título do post}
- **Objetivo:** educar / engajar / converter / humanizar
- **Ângulo:** {gatilho mental ou abordagem principal}
- **CTA:** {ação esperada}

### 3. Salvar output

```markdown
# Calendário Editorial — {nome-do-cliente} — {mês/ano}

| Data | Canal | Formato | Tema | Objetivo | Ângulo | CTA | Status |
|------|-------|---------|------|----------|--------|-----|--------|
| 02/06 | Instagram | carrossel | 5 erros que... | Educar | Dor | Salvar | Pendente |
```

Salvar em: `.em5/clientes/{nome}/copy/social/calendario-{YYYY-MM}.md`

## Handoff
- Calendário aprovado pelo dono da agência antes da produção
- @copywriter escreve copies conforme `escrever-post-social.md`
- @designer cria criativos conforme `definir-conceito-visual.md`
- Tudo passa por @qa antes do agendamento
