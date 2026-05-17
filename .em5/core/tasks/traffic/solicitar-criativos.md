---
name: solicitar-criativos
agent: traffic
description: Gerar briefing claro de criativos para o Copywriter e o Designer produzirem — com contexto de performance e objetivo da peça
inputs:
  - .em5/clientes/{nome}/estrategia/plano-estrategico.md
  - .em5/clientes/{nome}/trafego/auditoria.md (se existir)
  - .em5/clientes/{nome}/operacao/log-performance-criativa.md (se existir)
outputs:
  - .em5/clientes/{nome}/trafego/briefing-criativos.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Solicitar Criativos

## Objetivo

Briefar Copywriter e Designer com contexto suficiente para produzirem criativos alinhados à estratégia, ao histórico de performance e ao que está faltando na conta.

## Regra

```
Briefing vago = criativo genérico = resultado ruim.
Pulse não improvisa o brief. Pulse usa dados.
```

---

## Passo a passo

### 1. Identificar o que precisa ser produzido

Perguntar ao usuário:

```
1. O que está faltando na conta?
   (ex: variação de ângulo, formato novo, criativos novos para público frio, LP)

2. Qual o contexto de performance atual?
   (ex: CPL subindo, criativo saturado, ângulo de dor não funcionou)

3. Qual o ângulo ou abordagem que quer testar?
   (se já tem hipótese — caso contrário, Copywriter vai propor)

4. Qual o canal e formato? (Meta Feed / Reels / Stories / Google / LP)

5. Quantos criativos são necessários? (mínimo recomendado: 2-3 variações)
```

### 2. Gerar briefing de criativos

Criar/atualizar `.em5/clientes/{nome}/trafego/briefing-criativos.md`:

```markdown
# Briefing de Criativos — {Nome do Cliente}

**Data:** {data}
**Solicitado por:** Pulse (Gestor de Tráfego)
**Para:** Eco (Copywriter) + Lux (Designer)

---

## Contexto de Performance

{o que está acontecendo na conta que gerou essa solicitação}

**O que já rodou:**
- CR-{id}: {ângulo} — CPL R${x} — {resultado}
- CR-{id}: {ângulo} — CPL R${x} — {resultado}

**O que está faltando:**
{lacuna de criativo, ângulo, formato ou abordagem}

---

## O que precisa ser produzido

### Peça {N} — {nome descritivo}

| Campo | Definição |
|-------|-----------|
| ID | CR-{próximo número disponível} |
| Canal | Meta Feed / Reels / Stories / Google / LP |
| Formato | Vídeo / Imagem / Carrossel / Texto |
| Objetivo | Gerar lead / Vendas / Agendamento / Awareness |
| Ângulo sugerido | {dor / desejo / prova social / urgência / etc.} |
| Público-alvo | {público frio / retargeting / lookalike} |
| Duração (se vídeo) | {ex: 15-30 segundos} |
| Dimensões | {ex: 1080x1080 / 9:16 vertical} |

**Contexto extra para o Copywriter:**
{o que precisa estar na mensagem — hook, promessa, CTA esperado}

**Contexto extra para o Designer:**
{referência visual, tom, o que evitar, assets disponíveis}

---

### Peça {N+1} — ...

{repetir bloco para cada peça necessária}

---

## Prazo

Eco entrega copy até: {data}
Lux entrega criativo até: {data}
QA valida até: {data}
Publicação prevista: {data}

---

## Observações

{qualquer contexto adicional relevante}
```

### 3. Notificar Eco e Lux

Informar ao usuário:

```
Briefing criado em .em5/clientes/{nome}/trafego/briefing-criativos.md

Eco: *ler-cliente {nome} → *criar-angulos → *escrever-copy
Lux: aguarda copy do Eco antes de produzir o visual
```

### 4. Atualizar log operacional

```markdown
| {data} | SOLICITAÇÃO | Pulse | Briefing de {N} criativos enviado para Eco e Lux. Prazo de entrega: {data}. | EM ANDAMENTO | Aguardar entrega dos criativos |
```

## Output esperado

- `briefing-criativos.md` com especificação clara de cada peça
- Eco e Lux com direção para produzir
- Prazo estabelecido
