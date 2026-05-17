# Task: analisar-concorrentes
# Agente: strategist (Vera)
# Input: briefing do cliente + lista de concorrentes
# Output: clientes/{nome}/estrategia/analise-concorrentes.md

## Objetivo
Mapear posicionamento, ofertas, canais e diferenciais dos principais concorrentes do cliente para informar a estrategia de campanha.

## Inputs necessarios
1. `.em5/clientes/{nome}/onboarding/briefing-final.md` — lista de concorrentes mencionados
2. Pesquisa via Composio (web search) para dados atualizados
3. Context7 para tecnicas de analise competitiva se necessario

## Execucao

### 1. Identificar concorrentes
- Listar concorrentes diretos (mesmo produto, mesmo publico)
- Listar concorrentes indiretos (solucao alternativa para o mesmo problema)
- Priorizar top 3-5 mais relevantes

### 2. Para cada concorrente, mapear:

**Posicionamento:**
- Qual e a promessa central da marca?
- Qual e o publico principal que parece estar mirando?
- Qual e o tom de comunicacao?

**Oferta:**
- O que vendem? Como estruturam a oferta?
- Qual e o preco ou modelo de precificacao?
- Quais sao os diferenciais declarados?

**Canais:**
- Onde estao anunciando? (Meta, Google, YouTube)
- Qual e a frequencia de publicacao?
- Que formatos de criativo usam mais?

**Copy e Angulo:**
- Qual e o angulo principal de comunicacao?
- Que gatilhos mentais usam?
- Como e o CTA?

### 3. Identificar oportunidades
- Gaps de posicionamento (o que nenhum concorrente faz bem)
- Angulos nao explorados
- Publicos nao atendidos
- Formatos de criativo ausentes

### 4. Gerar documento
Salvar em: `.em5/clientes/{nome}/estrategia/analise-concorrentes.md`

```markdown
# Analise de Concorrentes — {nome-do-cliente}
**Data:** {data} | **Responsavel:** @strategist

---

## Panorama Competitivo

{1 paragrafo com visao geral do mercado}

model_tier: balanced  # auto-set Fase 12.AAA legacy audit
---

## Concorrentes Mapeados

### {Concorrente 1}
- **Posicionamento:** {resumo}
- **Oferta principal:** {o que vende}
- **Canais:** {onde anuncia}
- **Angulo de comunicacao:** {como fala com o cliente}
- **Pontos fortes:** {o que fazem bem}
- **Pontos fracos:** {gaps identificados}

### {Concorrente 2}
{mesmo formato}

---

## Oportunidades para {nome-do-cliente}

| Oportunidade | Tipo | Prioridade |
|-------------|------|-----------|
| {gap 1} | posicionamento/canal/angulo | alta/media/baixa |

---

## Recomendacoes Estrategicas

1. {recomendacao baseada na analise}
2. {recomendacao}
3. {recomendacao}
```

## Ferramentas
- Pesquisa de anuncios ativos: Composio MCP (web search)
- Biblioteca de anuncios Meta: manual (listar URL para o usuario verificar)
- Analise de site: Composio MCP se disponivel
- Se nao souber como usar alguma ferramenta: consultar Context7 primeiro

## Handoff
- Documento salvo em estrategia/
- Registrar no log operacional: "Analise de concorrentes concluida"
- Informar @coo que analise esta disponivel para proxima etapa
