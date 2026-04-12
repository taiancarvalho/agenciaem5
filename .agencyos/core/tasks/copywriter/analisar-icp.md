---
name: analisar-icp
agent: copywriter
description: Mapear dores, desejos, objeções, linguagem e nivel de consciencia do ICP a partir do briefing e da estrategia
inputs:
  - .agencyos/clientes/{nome}/onboarding/briefing-final.md
  - .agencyos/clientes/{nome}/estrategia/plano-estrategico.md (se existir)
outputs:
  - .agencyos/clientes/{nome}/copy/analise-icp.md
elicit: false
---

# Analisar ICP

## Objetivo

Extrair e estruturar o perfil de copy do ICP: dores que o mantem acordado, desejos que ele nao admite, objeções que travam a compra, linguagem que ele usa e nivel de consciencia. Esta analise e a base que toda copy precisa antes de existir.

## Regra

```
Copy sem ICP definido = tiro no escuro.
Nao escrever uma linha de copy antes de saber com quem esta falando.
Usar as palavras do ICP, nao as palavras da agencia.
```

---

## Passo a passo

### 1. Ler briefing

Ler `.agencyos/clientes/{nome}/onboarding/briefing-final.md` inteiro. Se plano estrategico existir, ler tambem para confirmar ou ajustar a interpretacao.

### 2. Extrair perfis de copy

Criar `.agencyos/clientes/{nome}/copy/analise-icp.md`:

```markdown
# Analise de ICP — {Nome do Cliente}

**Data:** {data}
**Elaborado por:** Cal (Copywriter)

---

## Quem e essa pessoa

**Descrição em 1 linha:** {ex: "Mulher, 35-50 anos, dona de clinica de estetica, faturando R$30-60k/mes, depende de indicacao"}

**Onde ela passa tempo online:** {Instagram, Facebook, YouTube, Google, LinkedIn, etc.}

**Nivel de consciencia:** {Inconsciente / Consciente do problema / Consciente da solucao / Consciente do produto}

---

## Dores (o que tira ela do sono)

Lista em ordem de intensidade emocional:

1. **{Dor principal}:** {em linguagem do ICP — citacao direta do briefing se possivel}
2. **{Dor secundaria}:** {citacao}
3. **{Dor terciaria}:** {citacao}

**Dor que mais converte:** {qual dor gera mais acao quando ativada}

---

## Desejos (o que ele quer mas nem sempre admite)

1. **{Desejo 1}:** {ex: "Ser reconhecido como referencia sem precisar se vender"}
2. **{Desejo 2}:** {ex: "Ter previsibilidade de Agenda sem depender de indicacao"}
3. **{Desejo 3}:**

**Desejo que mais puxa decisao:** {qual desejo move a compra}

---

## Objeções (o que ele diz antes de comprar)

1. **{Objeção 1}:** {ex: "Ja tentei trafoego e nao deu resultado"}
   → Como neutralizar: {abordagem para desarmar}
2. **{Objeção 2}:** {ex: "E muito caro"}
   → Como neutralizar: {abordagem}
3. **{Objecao 3}:**
   → Como neutralizar: {abordagem}

---

## Linguagem do ICP

**Como ele fala sobre o problema:**
> "{frases e expressoes usadas pelo ICP no briefing}"

**Palavras que usa:**
- {palavra 1}
- {palavra 2}
- {palavra 3}

**Palavras que NAO usa (evitar na copy):**
- {termo tecnico 1}
- {jargao de mercado 2}

---

## Mapa de Empatia — Resumo

| O que ele VE | O que ele OUVE | O que ele PENSA | O que ele SENTE |
|-------------|----------------|-----------------|-----------------|
| {concorrentes, ads, rede social} | {amigos, colegas, mercado} | {duvidas, crenças} | {medos, frustracoes, esperancas} |

---

## Gatilhos Mais Eficazes para este ICP

| Gatilho | Eficacia estimada | Como aplicar |
|---------|------------------|--------------|
| Prova social | Alta / Media / Baixa | {ex: depoimentos, numeros} |
| Urgencia | Alta / Media / Baixa | {ex: vagas limitadas} |
| Autoridade | Alta / Media / Baixa | {ex: certificacoes} |
| Mecanismo unico | Alta / Media / Baixa | {ex: metodo proprio} |
```

### 3. Validar com Estrategista (se necessario)

Se a analise revelar inconsistencia com o ICP definido pelo Estrategista, sinalizar:
```
⚠️ Divergencia detectada entre ICP do briefing e ICP da estrategia.
→ Verificar com Vera (Estrategista) antes de prosseguir.
```

---

## Output esperado

- `analise-icp.md` completo com dores, desejos, objeções, linguagem e gatilhos
- Pronto para: `*criar-angulos {nome}` usando os dados do ICP
