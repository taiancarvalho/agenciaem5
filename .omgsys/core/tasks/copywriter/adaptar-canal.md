---
name: adaptar-canal
agent: copywriter
description: Transformar copy existente no formato correto para cada canal (Meta, WhatsApp, e-mail, LinkedIn, blog)
inputs:
  - .omgsys/clientes/{nome}/copy/ (peca original)
  - .omgsys/clientes/{nome}/estrategia/plano-estrategico.md
outputs:
  - .omgsys/clientes/{nome}/copy/CR-{NNN}-adaptada-{canal}.md
elicit: false
---

# Adaptar Copy por Canal

## Objetivo

Reformatar uma copy ja escrita para o canal correto de distribuicao. Adaptar nao e reescrever — e traduzir a mesma mensagem para o formato, tamanho e comportamento de cada canal.

## Regra

```
A mensagem e a mesma. O formato muda.
Cada canal tem sua gramatica propria de atencao e interacao.
```

---

## Passo a passo

### 1. Ler copy original e estratégia

Ler a peca de copy original e o plano estrategico para confirmar:
- ICP, angulo, promessa central, CTA original

### 2. Regras de adaptacao por canal

#### Meta Ads (Feed/Stories/Reels)
- **Hook:** 1-2 linhas maximum — precisa parar o scroll
- **Corpo:** 2-4 paragrafos curtos. Linhas separadas.
- **CTA:** Direto. "Clique em Saiba Mais", "Toque no botao"
- **Headline do anuncio:** Maximo 40 caracteres visiveis
- **Legenda:** Maximo 125 caracteres antes do "ver mais"

#### WhatsApp
- **Abertura:** Cumprimento + contexto (de onde veio o contato)
- **Corpo:** 1-3 mensagens curtas. Nao enviar bloco unico
- **CTA:** Pergunta ou acao direta. "Posso te ajudar com X?"
- **Tom:** Conversacional, pessoal, nunca corporativo
- **Formatacao:** Usar *negrito* e _italico_ do WhatsApp

#### E-mail
- **Assunto:** 4-7 palavras. Curiosidade ou beneficio direto
- **Preheader:** Complemento do assunto (nao repeticao)
- **Corpo:** Pode ser mais longo. Paragrafos de 2-3 linhas.
- **CTA:** Link ou botao claro. Um CTA principal por e-mail

#### LinkedIn
- **Hook:** 1-2 linhas. Profissional, dados-driven
- **Corpo:** Estrutura pensador → problema → solucao.
- **Tom:** Profissional mas humano. Sem gimmick.
- **CTA:** Soft. "Me chama no DM", "Comenta ai"

#### Blog (SEO)
- **Titulo:** Keyword principal + beneficio
- **Estrutura:** H1, H2, H3. Subheadings a cada 200-300 palavras
- **Corpo:** 1000-2000 palavras. Paragrafos curtos
- **CTA:** Inline (meio do texto) e final do post

### 3. Criar arquivo adaptado

Criar `.omgsys/clientes/{nome}/copy/CR-{NNN}-adaptada-{canal}.md`:

```markdown
# Copy Adaptada — {Canal} | {ID da peca original}

**Peça original:** CR-{NNN} ({tipo original})
**Canal de destino:** {canal}
**Data:** {data}
**Adaptado por:** Cal (Copywriter)

---

## {Canal} — Versão Final

### Hook / Assunto / Titulo
"{texto adaptado}"

### Corpo
{text0 formatado para o canal}

### CTA
"{acao especifica para o canal}"

---

### Notas de adaptacao
- {o que mudou em relacao ao original e por que}
```

### 4. Manter consistencia

Verificar que a copy adaptada:
- Mantem o mesmo angulo e promessa da original
- Usa o mesmo tom definido pelo Estrategista
- Tem CTA coerente com o funil (nao pedir venda no topo)

---

## Output esperado

- Peca adaptada no formato correto do canal
- Arquivo salvo com ID referencia a peca original
- Pronto para QA ou para Designer
