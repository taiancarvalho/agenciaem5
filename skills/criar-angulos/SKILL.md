---
name: criar-angulos
agent: copywriter
description: "Gerar 3 a 5 \xE2ngulos de abordagem para a oferta do cliente, com base\
  \ no ICP, na oferta e na estrat\xE9gia"
inputs:
- .agencyos/clientes/{nome}/onboarding/briefing-final.md
- .agencyos/clientes/{nome}/estrategia/plano-estrategico.md
outputs:
- .agencyos/clientes/{nome}/copy/angulos.md
elicit: false
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Criar Ângulos de Comunicação

## Objetivo

Definir os diferentes ângulos de abordagem da oferta antes de escrever qualquer copy. Ângulo é o ponto de entrada da mensagem — o que vai fazer o ICP prestar atenção.

## Regra

```
Copy sem ângulo = escrever por escrever.
Ângulo define a mensagem. A mensagem define o resultado.
```

---

## Referência de tipos de ângulo

| Ângulo | Foco | Melhor para |
|--------|------|-------------|
| Dor | O que o ICP quer eliminar | ICP consciente do problema |
| Desejo | O que o ICP quer conquistar | ICP que aspira a uma transformação |
| Oportunidade | O que o ICP pode perder se não agir | Gerar urgência sem escassez artificial |
| Prova social | O que outros já conseguiram | Reduzir ceticismo e aumentar confiança |
| Mecanismo único | Por que este método é diferente | Mercado saturado ou ICP que já tentou de tudo |
| Urgência | Limite de tempo, vagas ou condição | Campanhas sazonais ou promoções |
| Conveniência | Facilidade, praticidade, velocidade | ICP sobrecarregado ou que odeia complexidade |
| Autoridade | Quem valida, reconhece ou endossa | Mercados onde credencial importa |

---

## Passo a passo

### 1. Ler briefing e plano estratégico

Acessar:
- `.agencyos/clientes/{nome}/onboarding/briefing-final.md`
- `.agencyos/clientes/{nome}/estrategia/plano-estrategico.md`

Extrair: dores do ICP, desejos, objeções, nível de consciência, linguagem, diferencial da oferta.

### 2. Gerar ângulos

Criar `.agencyos/clientes/{nome}/copy/angulos.md`:

```markdown
# Ângulos de Comunicação — {Nome do Cliente}

**Data:** {data}
**Elaborado por:** Cal (Copywriter)

---

## Contexto

- **ICP:** {descrição breve — quem é essa pessoa}
- **Nível de consciência:** {inconsciente / consciente do problema / consciente da solução}
- **Maior dor:** {dor em linguagem do ICP}
- **Maior desejo:** {desejo em linguagem do ICP}
- **Diferencial da oferta:** {o que diferencia}

---

## Ângulos Propostos

### Ângulo 1 — {tipo: ex: Dor}

**Ideia central:**
{O que o ICP está vivendo agora que ele quer parar}

**Hook sugerido:**
> "{frase de gancho — 1 linha que para o scroll}"

**Promessa implícita:**
{o que ele vai ganhar se continuar lendo/assistindo}

**Melhor canal para testar:** {Meta Feed / Reels / Google / WhatsApp}

---

### Ângulo 2 — {tipo: ex: Desejo}

**Ideia central:**
{O que o ICP quer se tornar ou conquistar}

**Hook sugerido:**
> "{frase de gancho}"

**Promessa implícita:**
{o que ele vai ganhar}

**Melhor canal para testar:** {canal}

---

### Ângulo 3 — {tipo: ex: Prova Social}

**Ideia central:**
{Resultado real de alguém semelhante ao ICP}

**Hook sugerido:**
> "{frase de gancho — resultado específico: ex: 'De 0 a 300 pacientes em 4 meses'}"

**Promessa implícita:**
{o que ele pode conseguir também}

**Melhor canal para testar:** {canal}

---

### Ângulo 4 — {tipo: opcional}
...

### Ângulo 5 — {tipo: opcional}
...

---

## Ângulo Recomendado para Começar

**{Ângulo X}** — justificativa: {por que este ângulo faz mais sentido para o momento e o nível de consciência do ICP}
```

## Output esperado

- `angulos.md` com 3 a 5 ângulos documentados
- Pronto para: `*escrever-copy {nome}` usando os ângulos aprovados
