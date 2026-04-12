---
name: coletar-briefing
agent: cs
description: Conduzir coleta completa de briefing com o cliente através de perguntas estruturadas
inputs:
  - nome do cliente (workspace já criado)
outputs:
  - .agencyos/clientes/{nome}/onboarding/briefing-respostas.md
elicit: true
---

# Coletar Briefing

## Objetivo

Conduzir a sessão de briefing com o cliente, fazendo as perguntas certas para entender o negócio, o público, a oferta e os objetivos antes de qualquer estratégia.

## Regra

Não pule perguntas. Não assuma respostas. Se a resposta for vaga, aprofunde com "pode me dar um exemplo?"

---

## Perguntas de Briefing

Conduza as perguntas em blocos. Aguarde resposta de cada bloco antes de continuar.

### Bloco 1 — O negócio

```
1. Qual o nome da empresa e o que ela vende?
2. Há quanto tempo está no mercado?
3. Qual o ticket médio do produto/serviço principal?
4. Onde opera? (cidade, estado, online, presencial)
5. Qual o faturamento médio mensal atual? (opcional, mas importante)
```

### Bloco 2 — O cliente ideal

```
6. Quem é o cliente que você MAIS quer atender? (descreva uma pessoa real)
7. Qual a faixa de idade principal?
8. É homem, mulher ou ambos?
9. Qual a maior dor que esse cliente tem e que você resolve?
10. O que esse cliente mais deseja conquistar?
11. Quais as principais objeções que ele tem antes de comprar?
12. Como esse cliente fala sobre o problema? (use as palavras dele, não do mercado)
```

### Bloco 3 — A oferta

```
13. O que exatamente você vende? (produto, serviço, programa, plano)
14. Qual a transformação que você entrega? (antes X depois)
15. Por que seu cliente compraria de você e não do concorrente?
16. Existe algum mecanismo único, método próprio ou diferencial claro?
17. Você tem alguma garantia ou diferencial de risco?
```

### Bloco 4 — Histórico de marketing

```
18. Já rodou tráfego pago antes? Onde? Qual foi o resultado?
19. Qual o maior problema que teve com marketing até hoje?
20. O que já tentou que NÃO funcionou?
21. O que já tentou que funcionou, mesmo que pouco?
22. Tem site ou landing page? Está funcionando?
23. Tem pixel instalado? (Meta Pixel / GA4)
```

### Bloco 5 — Objetivos e contexto atual

```
24. Qual o principal objetivo com o tráfego pago agora? (leads, vendas, agendamentos, seguidores)
25. Qual meta de resultado você considera sucesso nos primeiros 30 dias?
26. Qual o budget mensal disponível para investimento em mídia?
27. Tem flexibilidade para aumentar o budget se o resultado aparecer?
28. Qual o prazo para começar a ver resultados que você considera razoável?
```

### Bloco 6 — Ativos disponíveis

```
29. Tem logo em alta resolução disponível?
30. Tem fotos e vídeos do produto/serviço/equipe?
31. Tem depoimentos de clientes? (texto, vídeo, print)
32. Tem landing page ou a agência vai precisar criar?
33. Tem acesso ao WhatsApp Business? Usa algum CRM?
```

### Bloco 7 — Concorrência e referências

```
34. Quais são seus 3 principais concorrentes diretos?
35. Tem alguma referência de comunicação que você admira? (pode ser fora do seu segmento)
36. Como você NÃO quer ser comunicado? (algo que te incomoda na comunicação do mercado)
```

---

## Registrar respostas

Salvar todas as respostas em:

```
.agencyos/clientes/{nome}/onboarding/briefing-respostas.md
```

Formato:

```markdown
# Briefing — {Nome do Cliente}
**Data da coleta:** {data}
**Conduzido por:** Sol (CS)

---

## Bloco 1 — O negócio
**P1:** {pergunta}
**R:** {resposta}

...
```

---

## Atualizar log operacional

```markdown
| {data} | BRIEFING | CS | Briefing coletado com {contato}. Respostas salvas em onboarding/briefing-respostas.md | CONCLUÍDO | Gerar briefing final |
```

## Output esperado

- Arquivo `briefing-respostas.md` preenchido completamente
- Log atualizado
- Pronto para: `*gerar-briefing-final {nome}`
