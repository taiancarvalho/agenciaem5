---
name: iterar-criativo
agent: designer
description: Criar nova versao de criativo baseado em feedback humano ou dados de performance, versionando e atualizando log
inputs:
  - .em5/clientes/{nome}/operacao/log-performance-criativa.md (dados de performance)
  - .em5/clientes/{nome}/design/criativos/ ou /videos/ (criativo original)
  - Feedback do QA (Zara), Gestor de Tráfego (Max) ou Copywriter (Cal)
outputs:
  - Nova versao versionada (CR-{id}-v2, v3, etc.)
  - Log de performance criativa atualizado com observacao de iteracao
elicit: false
---

# Iterar Criativo

## Objetivo

Criar uma nova versao de um criativo existente com base em feedback humano ou dados de performance. Cada iteracao deve manter o ID original e incrementar a versao (CR-001-v2, CR-001-v3), registrando o motivo da mudanca no log.

Iteracao nao e recriacao do zero. E ajuste cirurgico baseado em dados — o que funcionou, se repete; o que falhou, se corrige.

## Regra

```
Nunca alterar a versao original de um criativo.
Sempre criar nova versao com numero incrementado.
Se o criativo esta performando mal, o problema pode ser
o visual, a copy ou a segmentacao — nao assumir que e so design.
```

---

## Passo a passo

### 1. Identificar o criativo e o motivo da iteracao

Ler `.em5/clientes/{nome}/operacao/log-performance-criativa.md` e localizar o CR-{id}:

- Qual e a versao atual (v1, v2, etc.)
- Quais sao os dados de performance (CTR, CPC, CPA, CPM, ROAS)
- Qual foi o motivo da iteracao:

```
Motivo da iteracao (um destes):
- feedback_QA: Zara identificou problema na validacao
- feedback_tráfego: Max reportou performance ruim ou pedido de variacao
- feedback_copy: Cal sugeriu ajuste visual para alinhar com nova copy
- variacao_a_testar: criar variacao voluntaria para split test
- problema_tecnico: formato errado, proporcao incorreta, etc.
```

### 2. Analisar dados de performance

No log, identificar padroes:

```
Se CTR está baixo (< 1% para Meta Ads):
→ Problema de atencao. O hook visual nao esta prendendo.
→ Solucao: mudar os primeiros 3s (video) ou a imagem principal (estatico).

Se CTR esta ok mas CPA esta alto:
→ O visual prende, mas a landing ou a oferta nao converte.
→ Nao e problema so de design — escalar para Estrategista.

Se CPM esta muito acima da media:
→ Pode ser problema de audiencia ou fadiga de anuncio.
→ Considerar variar criativo completamente (nova abordagem).

Se variacoes anteriores ja falharam com o mesmo conceito:
→ Nao repetir conceitos. Mudar angulo visual completamente.
```

### 3. Ler feedback recebido

Se veio do QA (Zara):
- O que foi flagged como problema?
- Quais correcoes sao obrigatorias vs. sugestoes?

Se veio do Gestor de Tráfego (Max):
- Quais dados justificam a iteracao?
- Qual e o benchmark de referencia para o canal?

Se veio do Copywriter (Cal):
- A copy mudou? Se sim, o visual precisa de ajuste de enquadramento.

### 4. Criar a nova versao

Com base na analise, executar a mudanca:

```
Versao anterior: CR-{id}-v{n}
Nova versao: CR-{id}-v{n+1}
```

Diretrizes por tipo de problema:

| Problema | Acao no Design |
|----------|---------------|
| Hook fraco | Alterar composicao principal, cor dominante, imagem de impacto |
| Legibilidade ruim | Aumentar contraste, mudar posicao do texto, simplificar hierarquia |
| Nao alinhado ao branding | Recarregar cores, fontes, tom visual do branding |
| Fadiga de criativo | Mudar cenario, angulo ou conceito visual (nao so ajustar cores) |
| Formato errado | Reproporcionar para {9:16 / 1:1 / 16:9} sem perder hierarquia |
| Copy mudou | Reposicionar texto, ajustar enquadramento para novo hook/CTA |

### 5. Gerar a nova versao

Executar com as ferramentas adequadas:

- **Imagem estatica**: usar `*gerar-imagem` como referencia, ajustar prompt
- **Video**: usar `*gerar-video` como referencia, ajustar prompt
- **UGC**: usar `*gerar-ugc` como referencia, ajustar JSON

Se for iteracao de UGC:
- Manter o mesmo `actor_identity_card` (nao trocar de ator)
- Ajustar apenas `scenario`, `environment` ou `camera` conforme necessario
- Incrementar `shot_id` (shot_01 → shot_02)

### 6. Salvar com nova versao

Seguir o padrao de versionamento:

```
Imagem:  .em5/clientes/{nome}/design/criativos/CR-{id}-v{n+1}.png
Video:   .em5/clientes/{nome}/design/videos/CR-{id}-v{n+1}.mp4
Prompts: .em5/clientes/{nome}/design/criativos/prompts/CR-{id}-v{n+1}-prompt.json
```

### 7. Atualizar o log

Em `.em5/clientes/{nome}/operacao/log-performance-criativa.md`, na entrada do CR-{id}:

- Atualizar `Criativo` para `CR-{id}-v{n+1}.{ext}`
- Atualizar `Versao` para `v{n+1}`
- Adicionar observacao:

```
Observacao: v{n+1} criada em {data}
  Motivo: {feedback_QA / feedback_tráfego / feedback_copy / variacao_test / problema_tecnico}
  Mudanca: {descrever o que foi alterado}
  Referencia de performance anterior: CTR X%, CPA Y
```

## Output esperado

- Nova versao do criativo salva com ID e versao corretos
- Log de performance criativa atualizado com motivo e detalhe da mudanca
- Versao anterior preservada (nunca sobrescrita)
- Pronto para revalidacao do QA (Zara)