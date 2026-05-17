---
name: receber-mensagem
agent: whats
description: Polling de mensagens recebidas + classifica + decide ação
inputs:
  - cliente_slug (opcional — default: todos)
outputs:
  - .em5/clientes/{slug}/comunicacao/whats-recebido.md (append)
  - acionamento de tasks downstream
elicit: false
model_tier: balanced
---

# Task: receber-mensagem

## Objetivo

@whats Onda recebe mensagem → classifica intenção → roteia pra agente certo.

## Fluxo

1. **Polling** via driver (composio.whatsapp_business OU waha)
2. Pra cada mensagem nova:
   a. Cross-ref `from_number` com clientes (`mensalidade.yaml.telefone`)
   b. Identifica `cliente_slug`
   c. Se número não bate → flag "número desconhecido" + @cs decide
3. **Classifica intenção** (model_tier balanced suficiente):
   - `pergunta_simples` → @whats responde direto (template ou draft baixo)
   - `solicitacao_relatorio` → aciona @traffic *gerar-relatorio
   - `reclamacao` → severity=alto → handoff @cs Sol imediato
   - `pagamento_confirmado` → aciona @fin *registrar-pagamento
   - `cancelamento` → severity=critico → handoff @ceo
   - `sumiu` (silêncio > 7d) → log + alerta @cs
4. **Sentiment analysis** rápida:
   - Negativo? → handoff humano (Art. de stop-rules)
   - Neutro/positivo? → segue fluxo
5. Append em `clientes/{slug}/comunicacao/whats-recebido.md`:
   ```markdown
   ## {data hh:mm} — De: {nome}
   - Mensagem: "..."
   - Classificação: {intencao}
   - Sentiment: {pos|neutro|neg}
   - Ação: {ação tomada}
   ```

## Triggers de handoff humano

- Sentiment negativo
- Pergunta fora de qualquer template/intenção conhecida
- Palavra crítica: "cancelar", "processo", "advogado", "Reclame Aqui"
- 3 respostas negativas seguidas

## Critério de saída

- Mensagem processada
- Intenção classificada
- Ação tomada ou escalada
- Log atualizado

## Frequência

Idealmente: webhook (composio whatsapp_business suporta). Fallback: polling a cada 5 min via cron.
