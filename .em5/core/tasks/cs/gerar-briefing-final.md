---
name: gerar-briefing-final
agent: cs
description: Consolidar as respostas do briefing em um documento estruturado e validado para uso dos agentes
inputs:
  - .em5/clientes/{nome}/onboarding/briefing-respostas.md
outputs:
  - .em5/clientes/{nome}/onboarding/briefing-final.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: false
---

# Gerar Briefing Final

## Objetivo

Transformar as respostas brutas do briefing em um documento consolidado, organizado e pronto para ser lido pela Estrategista (Vera) e pelos demais agentes.

## Regra

O briefing final não é um resumo — é uma consolidação estruturada. Preserve as palavras do cliente para descrever dores, desejos e linguagem. Não filtre ou suavize demais.

---

## Passo a passo

### 1. Ler briefing-respostas.md

Acessar `.em5/clientes/{nome}/onboarding/briefing-respostas.md` e processar todas as respostas.

### 2. Consolidar no template

Gerar o arquivo `.em5/clientes/{nome}/onboarding/briefing-final.md` com a estrutura abaixo:

```markdown
# Briefing Final — {Nome do Cliente}

**Data:** {data}
**Consolidado por:** Sol (CS)
**Status:** RASCUNHO | VALIDADO

---

## Resumo Executivo

- **Empresa:** {nome}
- **Produto/Serviço:** {o que vende}
- **Ticket Médio:** R$ {valor}
- **Operação:** {cidade/estado/online}
- **Objetivo Principal:** {objetivo declarado}
- **Budget de Mídia:** R$ {valor}/mês
- **Meta de Resultado (30 dias):** {meta declarada}

---

## O Negócio

{descrição consolidada do negócio com contexto, tempo de mercado e posição atual}

---

## ICP — Cliente Ideal

**Perfil:**
- Idade: {faixa}
- Gênero: {homem/mulher/ambos}
- Localização: {onde está}

**Dores principais:**
- {dor 1 — nas palavras do cliente}
- {dor 2}
- {dor 3}

**Desejos:**
- {desejo 1}
- {desejo 2}

**Objeções comuns:**
- {objeção 1}
- {objeção 2}

**Linguagem do ICP:** (como o cliente fala sobre o problema)
> "{citação direta ou paráfrase fiel}"

---

## A Oferta

**O que é:** {descrição direta}
**Transformação entregue:** {antes} → {depois}
**Diferencial:** {por que comprar aqui e não no concorrente}
**Mecanismo único:** {método, tecnologia ou processo proprietário, se houver}
**Garantia:** {se houver}

---

## Histórico de Marketing

**Canais já usados:** {lista}
**O que funcionou:** {se houver}
**O que não funcionou:** {se houver}
**Problemas anteriores:** {contexto relevante}

---

## Infraestrutura Disponível

| Item | Status |
|------|--------|
| Site/Landing Page | {existe/não existe/precisa criar} |
| Meta Pixel | {instalado/não instalado/desconhecido} |
| GA4 | {configurado/não/desconhecido} |
| Logo em alta resolução | {sim/não} |
| Fotos/Vídeos | {sim/não/parcial} |
| Depoimentos de clientes | {sim/não/parcial} |
| WhatsApp Business | {sim/não} |
| CRM | {qual/não usa} |

---

## Concorrentes

1. {concorrente 1}
2. {concorrente 2}
3. {concorrente 3}

---

## Referências e Restrições

**Referências de comunicação admira:** {se houver}
**Como NÃO quer ser comunicado:** {restrições de tom ou abordagem}

---

## Observações do CS

{qualquer contexto relevante captado na conversa que não entrou nos blocos acima}
```

### 3. Marcar status

Após geração, o status inicial é `RASCUNHO`. Marcar como `VALIDADO` somente após revisão com o cliente ou confirmação interna.

### 4. Atualizar log operacional

```markdown
| {data} | ENTREGA | CS | Briefing final gerado em onboarding/briefing-final.md | CONCLUÍDO | Encaminhar para Estrategista |
```

## Output esperado

- `briefing-final.md` completo e organizado
- Pronto para: `@strategist *analisar-briefing {nome}`
