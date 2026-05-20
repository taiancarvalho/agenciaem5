---
nome: lancamento
skill: /lancamento
tipo: hibrido
classificacao_skill: hibrido
agente_orquestrador: coo
agente_responsavel_entrega: cs
tempo_medio: 4-8 semanas
qa_gate: true
versao: 1.0
---

# Receita: Lançamento (3 fases)

> Pré (2-4 sem) + durante (1-2 sem) + pós (1-2 sem). QA gate em cada material.

## Quando usar
- Cliente com lançamento programado
- Pedido @ceo aprovou viabilidade

## Inputs
- Briefing lançamento (produto + data + meta + público + preço + canais + budget)

## FASE 1 — Pré-lançamento (2-4 semanas antes)

### 1. @cs briefing-lancamento
Coleta 8 campos obrigatórios.

### 2. @fin verificar budget
**Usa bloco:** `.em5/blocos/fin-asaas-listar-status.md`
APROVADO | PENDENTE_PAGAMENTO | INSUFICIENTE.

### 3. @scout inteligência competitiva (paralelo)
**Usa bloco:** `.em5/blocos/scout-scrape-concorrencia.md`
Ofertas similares · criativos referencia · gaps.

### 4. @strategist estrategia-lancamento
Aquecimento + abertura + remarketing + recuperação + verbas por fase.

### 5. @coo dispatcha @copy + @designer paralelo
Copy emails + ads + LP + WhatsApp. Criativos banners + vídeos + stories + reels.

### 6. @qa valida todos materiais
**Usa bloco:** `.em5/blocos/qa-validar-copy.md` + `.em5/blocos/qa-validar-criativo.md`

### 7. @cs preview cliente (aprovação formal)
Cliente assina aprovação ANTES ativação.

## FASE 2 — Durante (carrinho aberto)

### 8. @traffic ativar campanhas
Meta + Google + WhatsApp blast (template aprovado).

### 9. @traffic monitorar intensivo 2x/dia
**Usa bloco:** `.em5/blocos/traffic-composio-meta-insights.md`
Alertas: gasto > 130% diário · CPL > 2x meta · freq > 4.

### 10. @whats remarketing
**Usa bloco:** `.em5/blocos/cs-enviar-whatsapp-template.md`
Cadência plano (abandono carrinho + leads).

### 11. @cs comunicar cliente diário
1x/dia KPIs + ações.

## FASE 3 — Pós-lançamento

### 12. @traffic relatório final
**Output:** `clientes/{nome}/lancamentos/{slug}/relatorio-final.md`

### 13. @traffic campanha retenção+recuperação
Compradores (upsell) + carrinho-abandonado (recovery).

### 14. @strategist aprendizados
**Output:** `aprendizados.md` (hipóteses confirmadas/refutadas + insights + recomendações próximo lançamento).

### 15. @qa valida relatório final
**Usa bloco:** `.em5/blocos/qa-validar-relatorio.md`

### 16. @cs envia relatório cliente
**Usa bloco:** `.em5/blocos/cs-enviar-email-gmail.md`

### 17. @fin reconciliação
**Usa bloco:** `.em5/blocos/fin-asaas-listar-status.md`
Gastos × receita → input renovação/upsell.

## Outputs
- `clientes/{nome}/lancamentos/{slug}/` (briefing · plano · materiais · qa-verdicts · relatorio · aprendizados)

## Métricas
- Prazo pré: 8-10 dias úteis briefing → preview
- Comunicação diária durante: 100%
- Prazo relatório final: <= 5 dias úteis pós-fechamento

## Composio MCP
- meta_ads · google_ads · whatsapp_business · gmail · asaas
