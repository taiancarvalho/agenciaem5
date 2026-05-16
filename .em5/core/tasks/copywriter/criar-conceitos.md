---
name: criar-conceitos
agent: copywriter
description: Definir conceitos de campanha — headline, promessa e direção principal da peça — combinando ângulo com execução visual
inputs:
  - .em5/clientes/{nome}/copy/angulos.md
  - .em5/clientes/{nome}/estrategia/plano-estrategico.md
outputs:
  - .em5/clientes/{nome}/copy/conceitos-campanha.md
elicit: true
---

# Criar Conceitos de Campanha

## Objetivo

Transformar ângulos estratégicos em conceitos de campanha executáveis. Conceito é a ponte entre o ângulo (direção de mensagem) e a copy/criativo (execução real). Cada conceito responde: o que dizemos, como dizemos e o que mostramos.

## Regra

```
Ângulo sem conceito = direção sem tradução prática.
Conceito é o que Eco entrega para Lux entender o que o visual precisa reforçar.
```

---

## Passo a passo

### 1. Ler ângulos e contexto

Ler `.em5/clientes/{nome}/copy/angulos.md` e o plano estratégico.

### 2. Definir conceitos por ângulo

Para cada ângulo aprovado, criar um conceito com:

- **Headline principal** (hook traduzido em 1 frase)
- **Subheadline** (amplificação da promessa)
- **Promessa central** (o que o ICP ganha ao engajar)
- **Direção visual sugerida** (para Lux: o que o criativo deve transmitir)
- **CTA** (ação específica e urgente)
- **Tom** (autoridade, urgência, empatia, provocação, etc.)

### 3. Criar documento

Criar `.em5/clientes/{nome}/copy/conceitos-campanha.md`:

```markdown
# Conceitos de Campanha — {Nome do Cliente}

**Data:** {data}
**Elaborado por:** Eco (Copywriter)

---

## Conceito 1 — {Nome do Ângulo 1}
**Baseado no ângulo:** {tipo}

### Headline
"{frase principal — 1 linha}"

### Subheadline
"{amplificação — 1-2 linhas}"

### Promessa Central
{O que o ICP ganha ao engajar — em linguagem dele}

### Direção Visual (para Lux)
{O que o criativo deve transmitir para reforçar essa mensagem}

### CTA
"{ação específica}"

### Tom
{autoridade / urgência / empatia / provocação / aspiracional}

---

## Conceito 2 — {Nome do Ângulo 2}
...

## Conceito 3 — {Nome do Ângulo 3}
...

---

## Prioridade de Teste

1. **{Conceito X}** — razão: {nivel de consciencia do ICP, urgencia do momento}
2. **{Conceito Y}** — razao: {diferenciação, potencial viral}
3. **{Conceito Z}** — razao: {prova social, validação}
```

### 4. Brief visual para Designer

Para cada conceito, incluir nota específica para o Designer:

```markdown
### Brief Visual → Lux (Conceito 1)
- **Intenção:** {o que o visual precisa comunicar}
- **Hierarquia:** {o que deve ser visto primeiro}
- **Referência:** {tipo de imagem/vídeo sugerido}
- **ID da peça:** CR-001
```

---

## Output esperado

- `conceitos-campanha.md` com 3 a 5 conceitos documentados
- Brief visual claro para cada conceito
- Pronto para: `*escrever-copy {nome}` e handoff para Designer
