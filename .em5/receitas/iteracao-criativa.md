---
nome: iteracao-criativa
skill: /iterar
tipo: operacional
classificacao_skill: operacional
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 2-3h
qa_gate: true
versao: 1.0
---

# Receita: Iteração Criativa (baseado dados)

> Performance baixa 7+d → identifica → novas variações → QA → publish.

## Quando usar
- Campanha ativa com CPL/CPA 1.5x+ meta por 7d consecutivos
- Saturação freq > 2.5 detectada
- Janela mínima 7d (sem achismo)

## Inputs
- `clientes/{nome}/operacao/log-performance-criativa.md`
- `clientes/{nome}/estrategia/plano-estrategico.md`
- Top 5 criativos vencedores OR perdedores

## Steps

### 1. @traffic identifica fracos + diagnose
**Tempo:** 30min
Lê log-performance, classifica VENCEDOR/ATIVO/OBSERVAR/PAUSAR. Diagnose causa (criativo? audiência? oferta?).

### 2. @copywriter cria novos ângulos
**Usa bloco:** `.em5/blocos/copy-escrever-com-angulo.md`
3-5 ângulos novos baseado dados (não achismo).

### 3. @designer produz variações
**Usa bloco:** `.em5/blocos/designer-gerar-imagem.md` OR `.em5/blocos/designer-gerar-video.md`
Versiona CR-XXX-vN.

### 4. @qa valida
**Usa bloco:** `.em5/blocos/qa-validar-copy.md` + `.em5/blocos/qa-validar-criativo.md`

### 5. @traffic publica + pausa antigos
Sobe novos. Pausa underperformers. Documenta decisões em log-performance.

## Outputs
- `clientes/{nome}/copy/CR-XXX-vN.md` (novos ângulos)
- `clientes/{nome}/design/criativos/CR-XXX-vN.{png,mp4}`
- `clientes/{nome}/operacao/log-performance-criativa.md` updated
- Campanhas ajustadas Meta/Google

## Anti-padrões
- ❌ Iterar com < 7d dados
- ❌ Mudar tudo de uma vez (não isolar causa)
- ❌ Pausar vencedor por "achei"

## Métricas
- Lift CTR/CVR primeira iteração: >= 15%
- Taxa hipóteses confirmadas: tracked

## Composio MCP
- meta_ads · google_ads
