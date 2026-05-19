---
name: escrever-copy
agent: copywriter
description: Escrever copy completa para o tipo e canal solicitado, com base no angulo definido
inputs:
  - clientes/{nome}/copy/angulos.md
  - clientes/{nome}/trafego/briefing-criativos.md (se existir)
  - clientes/{nome}/estrategia/plano-estrategico.md
outputs:
  - clientes/{nome}/copy/CR-{id}.md
  - nova linha em clientes/{nome}/operacao/log-performance-criativa.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Escrever Copy

## Playbook de Referência

**Ler antes de executar:** `.em5/playbooks/copywriter-frameworks.md`
**Memória:** ler últimas 3 entradas de `clientes/{nome}/memoria/notas-sessao.md`

---

## Objetivo

Escrever a copy final para o tipo e canal solicitado — estruturada, com ângulo claro, hook forte, desenvolvimento e CTA.

## Regra

```
Estrutura base de toda copy:
Hook → Desenvolvimento → Prova → CTA

Sem hook forte, o resto não existe.
```

---

## Framework de Ângulos (5 tipos)

Escolher o ângulo correto antes de escrever. Consultar `playbooks/copywriter-frameworks.md` para exemplos completos.

| Ângulo | Quando usar | Exemplo de hook |
|--------|------------|------------------|
| DOR | Produto resolve problema urgente | "Você tá gastando R$1k+ em tráfego e levando zero leads?" |
| PROVA SOCIAL | Depoimentos e resultados reais | "847 clientes já passaram por aqui" |
| URGÊNCIA | Prazo ou escassez real | "Últimas 12 vagas — depois fecha" |
| ASPIRAÇÃO | Transformação de vida / lifestyle | "Imagine abrir o app e ver mais um pagamento de R$2k" |
| CONVENIÊNCIA | Produto simplifica algo complexo | "Em 3 cliques, sem sair de casa" |

**Regra de ouro:** nunca usar hook genérico. Se não der para identificar o ângulo — reler o ICP antes de escrever.

---

## Estrutura por tipo de copy

### Anúncio curto (Meta Feed / Stories / Reels)

```
[HOOK — 1 linha que para o scroll]

[DESENVOLVIMENTO — 2-4 linhas que aprofundam a dor ou o desejo]

[PROVA — 1 linha com resultado real, dado ou depoimento]

[CTA — ação clara e específica]
```

### Roteiro de vídeo (15-60 segundos)

```
[0-3s]   GANCHO VISUAL + frase de abertura que prende
[3-15s]  PROBLEMA ou DESEJO amplificado
[15-35s] SOLUÇÃO + mecanismo que viabiliza a promessa
[35-50s] PROVA + resultado de quem já usou
[50-60s] CTA direto
```

### Copy de landing page

```
[HERO]    Headline principal (promessa) + Subheadline (como)
[DOR]     Bloco que espelha o problema do ICP
[SOLUÇÃO] Produto como resposta
[BENEF]   Lista de transformações (não features)
[PROVA]   Depoimentos, números, casos reais
[CTA]     Ação clara
[FAQ]     Objeções respondidas
[CTA]     Repetição final
```

### Mensagem de WhatsApp

```
Olá {nome}! [abertura personalizada]
[1 frase que conecta com o contexto do lead]
[Oferta ou próximo passo direto]
[CTA: "Posso te mandar mais detalhes?"]
```

---

## Passo a passo

### 1. Definir escopo

```
1. Qual o ID desta peça? (CR-{próximo número})
2. Qual o tipo? (anúncio / roteiro / landing page / WhatsApp / e-mail / legenda)
3. Qual o canal? (Meta / Google / WhatsApp / E-mail / Instagram)
4. Qual o ângulo? (consultar tabela acima + angulos.md)
5. Qual o CTA esperado? (clicar / mandar mensagem / ligar / comprar)
```

### 2. Escrever a copy

Produzir a copy completa com base na estrutura do tipo definido.

### 3. Salvar arquivo

Criar `clientes/{nome}/copy/CR-{id}.md` com copy + brief visual para o designer.

### 4. Registrar no log

Adicionar linha no `log-performance-criativa.md` e entrada em `memoria/notas-sessao.md`.

---

## Em caso de falha

Se a copy não puder ser entregue (dados insuficientes, ICP não analisado):

```markdown
**Problema:** {o que falta para escrever}
**Agente responsável:** @copywriter
**Ação corretiva:** executar analisar-icp.md antes de tentar novamente
**Retestar após:** analise-icp.md disponível
```

---

## Handoff

```markdown
## Handoff para @designer
**Arquivos que ele DEVE ler:**
- copy/CR-{id}.md (este arquivo — seção "Brief visual")
- board-cliente.md (seção 7: brand guidelines)

**O que foi feito:** {copy escrita, ângulo usado, canal}
**Atenção:** {restrições visuais, tom específico, assets necessários}

**Próxima task:** definir-conceito-visual ou gerar-ugc
```

## Output esperado

- `CR-{id}.md` com copy completa e brief visual
- Linha criada no log de performance criativa
- Pronto para: Lux (`*gerar-imagem` ou `*gerar-video`) + Crivo (`*validar-copy`)
