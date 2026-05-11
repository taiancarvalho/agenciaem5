# Task: otimizar-search
# Agente: traffic (Max)
# Input: dados da conta (Composio) + janelas-analise.yaml
# Output: atualização em log-performance-criativa.md + ajustes na conta

## Objetivo
Otimizar campanhas de Search ativas: ajustar lances, pausar termos ruins,
expandir termos bons, melhorar Quality Score.

## Inputs necessários
1. Acesso à conta via Composio (Google Analytics / Google Ads)
2. `.omgsys/core/data/janelas-analise.yaml` — janelas de decisão
3. `.omgsys/clientes/{nome}/trafego/keywords-{data}.md` — mapa original
4. Meta de CPL ou CPA do cliente (`plano-estrategico.md`)

## Execução

### 1. Análise de search terms (semanal obrigatório)

Via Composio, puxar relatório de search terms dos últimos 7 dias:
- Identificar termos convertendo bem → adicionar como exact match
- Identificar termos gastando sem converter → adicionar como negativa
- Identificar termos irrelevantes → negativa imediata

```
Regra: qualquer termo com > R$50 gasto e 0 conversões → negativa
Regra: qualquer termo com CPA < meta em 7d+ → promover a exact
```

### 2. Quality Score por keyword

Verificar QS (1-10) de todas as keywords ativas:
- QS < 5: revisar landing page + ad copy relevância
- QS 5-7: monitorar, testar nova copy
- QS ≥ 8: manter, considerar escalar

### 3. Ajuste de lances

**Target CPA (se campanhas inteligentes):**
- Não mexer em CPA target antes de 30+ conversões no período
- Ajuste máximo: ±20% por semana

**CPC Manual:**
- Horário: reduzir 30% em horários com CPA > 2x a meta
- Dispositivo: analisar mobile vs desktop — ajustar bid modifier
- Localização: pausar cidades com CPA > 3x a meta

### 4. Análise de anúncios

Verificar Asset Performance no RSA (Responsive Search Ad):
- Assets com rating "Low" → substituir
- Testar pelo menos 2 RSAs por grupo de anúncio
- Nunca pausar anúncio antes de 200+ impressões

### 5. Registrar otimizações

Atualizar: `.omgsys/clientes/{nome}/operacao/log-performance-criativa.md`

```markdown
## Otimização Search — {data}
**Período analisado:** {janela}
**Termos negativados:** {lista}
**Termos promovidos:** {lista}
**Ajustes de lance:** {descrição}
**QS médio antes/depois:** {X} → {Y}
**Impacto esperado:** {estimativa}
```

## Handoff
- Otimizações executadas via Composio (Google Ads)
- Registrar no log antes de encerrar
- Escalar achados relevantes para @coo se impacto > 20% no CPL
