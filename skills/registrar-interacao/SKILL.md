---
name: registrar-interacao
agent: cs
description: "Registrar qualquer intera\xE7\xE3o relevante com o cliente no log operacional"
inputs:
- "tipo de intera\xE7\xE3o (reuni\xE3o, entrega, pend\xEAncia, ajuste, retorno do\
  \ cliente)"
- "descri\xE7\xE3o do que aconteceu"
- "pr\xF3xima a\xE7\xE3o"
outputs:
- nova linha em .agencyos/clientes/{nome}/operacao/log-operacional.md
elicit: true
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Registrar Interação

## Objetivo

Manter o log operacional atualizado com toda interação relevante — interna ou com o cliente. O log é a memória oficial do projeto.

## Regra

```
Se aconteceu algo relevante → registrar
Se houve decisão → registrar
Se ficou pendente → registrar com responsável e prazo
```

---

## Passo a passo

### 1. Coletar dados da interação

Perguntar ao usuário:

```
1. Qual o tipo de interação?
   (REUNIÃO / ENTREGA / PENDÊNCIA / AJUSTE / VALIDAÇÃO / RETORNO / ESCALADA)

2. Quem participou?

3. O que aconteceu? (descrever em 1-2 linhas)

4. Ficou alguma pendência? Se sim, quem é responsável?

5. Qual o próximo passo e quando?
```

### 2. Adicionar linha no log

Abrir `.agencyos/clientes/{nome}/operacao/log-operacional.md` e adicionar ao final:

```markdown
| {data} | {TIPO} | {Responsável} | {Descrição do que aconteceu} | {Status: CONCLUÍDO/EM ANDAMENTO/PENDENTE} | {Próxima ação e prazo} |
```

**Exemplo:**

```markdown
| 2026-04-11 | REUNIÃO | CS | Alinhamento semanal com cliente. Aprovação do plano estratégico. Solicitado ajuste na copy do anúncio A. | CONCLUÍDO | Cal ajustar copy CR-003 até 13/04 |
| 2026-04-11 | PENDÊNCIA | CS | Cliente não enviou logo em alta resolução. | PENDENTE | Lux aguardando. CS cobrar até 12/04 |
```

### 3. Atualizar proximos-passos (quando necessário)

Se a interação gerou ações concretas, atualizar também `.agencyos/clientes/{nome}/operacao/proximos-passos.md`:

```markdown
# Próximos Passos — {Nome do Cliente}
**Atualizado em:** {data}

## Agência
- [ ] {ação} — Responsável: {agente} — Prazo: {data}

## Cliente
- [ ] {ação} — Responsável: {contato} — Prazo: {data}
```

## Output esperado

- Linha adicionada no log operacional
- Próximos passos atualizados (quando aplicável)
- Contexto operacional preservado para próximas sessões
