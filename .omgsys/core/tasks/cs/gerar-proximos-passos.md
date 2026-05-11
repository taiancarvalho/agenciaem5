---
name: gerar-proximos-passos
agent: cs
description: Gerar resumo de proximos passos e pendencias do cliente apos reuniao ou interacao
inputs:
  - nome do cliente
  - contexto da reuniao/interacao recente (ou log operacional)
outputs:
  - atualiza log-operacional.md
  - .omgsys/clientes/{nome}/operacao/proximos-passos.md
elicit: true
---

# Gerar Próximos Passos

## Objetivo

Gerar um resumo claro e acionavel de proximos passos e pendencias para o cliente apos cada reuniao ou interacao significativa. Usar na gestao diaria (Flow 4) para manter o cliente informado sobre o que precisa fazer e o que esta em andamento.

## Regra

Simplicidade primeiro. O cliente nao precisa ver complexidade operacional — apenas o que ele precisa fazer, prazos e o status geral.

---

## Passo a passo

### 1. Coletar contexto da interacao recente

Ler o `log-operacional.md` em `.omgsys/clientes/{nome}/operacao/` para entender:

- Qual foi a ultima interacao com o cliente
- O que foi decidido/conversado
- O que esta em andamento
- O que esta pendente (bloqueando)

Se o usuario fornecer contexto verbal da reuniao, usar como base.

### 2. Listar pendencias abertas

Identificar todos os itens que estao:

- **Bloqueando** — algo que a agencia precisa do cliente para avancar
- **Em andamento** — trabalho em progresso pela agencia
- **Aguardando** — itens que dependem de terceiros ou prazo

Consultar tambem `status.md` em `setup-tecnico/` se houver pendencias tecnicas abertas.

### 3. Categorizar por responsavel

Separar os itens entre:

```
O QUE O CLIENTE PRECISA FAZER:
- itens que dependem exclusivamente do cliente

O QUE A AGENCIA ESTA FAZENDO:
- itens em progresso pela equipe

O QUE ESTAMOS AGUARDANDO:
- prazos, aprovacoes pendentes, terceiros
```

### 4. Gerar documento de proximos passos

Criar `.omgsys/clientes/{nome}/operacao/proximos-passos.md`:

```markdown
# Proximos Passos — {Nome do Cliente}

**Gerado em:** {data}
**Referente a:** {reuniao/interacao}
**Responsavel:** Sol (CS)

---

## Resumo

{1-2 paragrafos resumindo o estado atual do cliente. Ex: "Estamos na fase de setup tecnico. Aguardando alguns acessos para avancar com a instalacao dos pixels. A equipe de estrategia ja esta trabalhando no plano de canais."}

---

## O Que Precisamos de Voce

| Item | Prazo | Prioridade | Status |
|------|-------|------------|--------|
| {acesso ao Business Manager} | {data} | 🔴 Alta | Aguardando |
| {enviar logo em alta resolucao} | {data} | 🟡 Media | Aguardando |
| {confirmar oferta principal} | {data} | 🟡 Media | Aguardando |

---

## O Que Estamos Fazendo

| Item | Responsavel | Previsao | Status |
|------|-------------|----------|--------|
| {criacao de campanhas} | Max | {data} | Em andamento |
| {copy dos anuncios} | Cal | {data} | Em andamento |
| {criativos} | Lux | {data} | Em andamento |

---

## O Que Estamos Aguardando

| Item | De quem? | Desde quando | Status |
|------|----------|--------------|--------|
| {aprovacao do plano} | Cliente | {data} |  |
| {resposta do fornecedor} | Terceiro | {data} |  |

---

## Proxima Reuniao/Contato

**Data prevista:** {data}
**Pauta:** {temas que serao discutidos}

---

*Dúvidas? Responda essa mensagem ou chame no WhatsApp.*
```

### 5. Priorizar itens corretamente

Usar a seguinte logica de prioridade:

- **Alta (bloqueante)** — impede que qualquer outro trabalho aconteca
- **Media (importante)** — nao bloqueia imediatamente mas pode atrasar
- **Baixa (rotina)** — itens operacionais de menor impacto

### 6. Atualizar log operacional

Adicionar entrada no log:

```markdown
| {data} | PROXIMOS PASSOS | CS | Proximos passos gerados apos {reuniao/interacao}. {N} pendencias com cliente, {N} itens em andamento. | CONCLUÍDO | Acompanhar prazos |
```

### 7. Entregar ao usuario

Apresentar o resumo e perguntar:

```
Proximos pasos gerados. Quer:

1. Ajustar algum item?
2. Enviar como mensagem para o cliente?
3. Salvar e seguir?
```

## Output esperado

- Documento `proximos-passos.md` com visao clara do que cada parte deve fazer
- Item organizado por responsavel e prioridade
- Log operacional atualizado
- Opcao de enviar resumo resumido para o cliente por WhatsApp
