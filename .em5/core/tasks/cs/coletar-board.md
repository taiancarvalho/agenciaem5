---
name: coletar-board
agent: cs
description: Conduzir coleta completa do board do cliente — o documento central que alimenta todos os agentes do sistema
inputs:
  - nome do cliente (workspace já criado)
outputs:
  - .em5/clientes/{nome}/onboarding/board-cliente.md
  - score de maturidade do cliente (0-100)
elicit: true
---

# Coletar Board do Cliente

## Objetivo

O board do cliente é o documento central do em5. Sem ele, nenhum agente consegue executar com precisão. Substitui o briefing simples: combina dados coletados com informações puxadas via Composio.

## Regra

```
Tom consultivo, não questionário frio.
Uma seção por vez — aguardar confirmação antes de avançar.
Puxar dados via Composio em background enquanto conduz a próxima seção.
Não avançar para estratégia sem o checklist de prontidão aprovado.
```

---

## Pré-sessão: criar workspace

Confirmar que `.em5/clientes/{nome}/` existe. Se não, criar:
```
.em5/clientes/{nome}/
├── onboarding/
├── memoria/
├── estrategia/
├── copy/
├── design/
├── trafego/
└── operacao/
```

---

## Seções do Board

### Seção 1 — Informações Básicas

```
Qual o nome completo da empresa?
Quem é o responsável pelo contato? (nome + WhatsApp/email)
Em qual segmento/nicho atua?
Onde opera? (cidade, estado — local/regional/nacional/internacional)
```

### Seção 2 — Objetivo e Meta

```
Qual o objetivo principal com o tráfego pago?
  → Opções: leads qualificados / vendas online / agendamentos / visibilidade
Qual o canal de conversão principal?
  → Opções: site/loja, WhatsApp, ligação, Instagram DM
Qual o CPA desejado? (quanto quer pagar por resultado)
Qual o ROAS mínimo aceitável? (para e-commerce)
Qual a meta de resultado nos primeiros 30 dias?
```

### Seção 3 — Investimento

```
Qual o budget mensal total disponível para mídia?
Como pretende dividir? (Meta Ads / Google Ads / produção)
Tem flexibilidade para escalar se o resultado aparecer?
```

### Seção 4 — Produto e Oferta

```
Qual o produto ou serviço principal?
Qual o preço médio / ticket?
É e-commerce? Se sim, qual a URL da loja?
Tem funil construído? (landing page, CRM, automação?)
Qual o LTV estimado de um cliente?
```

### Seção 5 — Público-Alvo

```
Qual a faixa de idade do cliente ideal?
Gênero: homem, mulher, ou ambos?
Cidades ou regiões específicas?
Quais os principais interesses e comportamentos do público?
Qual a maior dor que seu produto resolve?
O que esse cliente mais deseja conquistar?
```

### Seção 5b — Dinâmicas de Troca

```
Por que o cliente ideal buscaria essa solução agora?
  → Qual dor ou frustração atual está empurrando ele a mudar? (Push)
  → O que na sua oferta especificamente atrai ele? (Pull)
O que impede ele de agir mesmo quando quer? (Hábito / inércia)
Qual a maior objeção ou medo antes de comprar? (Ansiedade de troca)
```

> Mapear as respostas no diagnóstico de switching do board. Ver `playbooks/cs-board-cliente.md` para tabela de aplicação na copy.

### Seção 6 — Presença Digital

```
Tem site ou landing page? URL? Está funcionando?
Instagram: @ (quantos seguidores, frequência de posts)
Facebook Page: nome ou ID?
WhatsApp Business: usa?
Outras redes relevantes?
```

### Seção 7 — Brand Guidelines

```
Tem brand book? Se sim, compartilhe o link.
Cores principais (pode ser referência visual ou hex)?
Tom de voz: formal / informal / técnico / descontraído / emocional?
Estilo visual: minimalista / colorido / corporativo / humano?
O que NÃO pode aparecer na comunicação?
```

### Seção 8 — Concorrentes

```
Quais seus 3 principais concorrentes diretos?
O que eles fazem bem que você admira?
Qual o diferencial que você tem em relação a eles?
```

### Seção 9 — Histórico

```
Já rodou anúncios antes? Onde?
O que funcionou (mesmo que pouco)?
O que não funcionou?
Motivo da troca de agência (se aplicável)?
```

### Seção 10 — Expectativas

```
Qual o prazo para ver os primeiros resultados que o cliente considera razoável?
Meta de curto prazo (30 dias):
Meta de médio prazo (90 dias):
Frequência de comunicação preferida (semanal? mensal?):
Canal de comunicação preferido (WhatsApp, email, reunião?):
```

---

## Busca Automática via Composio

Após a Seção 6 (presença digital), executar em background:

```
1. Composio → Meta Ads:
   - Buscar conta por nome/email do cliente
   - Se encontrada: ID da conta, status, gasto total histórico, última atividade
   - Verificar Pixel: ID, eventos configurados (lead, purchase, view_content)

2. Composio → Google Ads:
   - Buscar conta vinculada ao email
   - Se encontrada: ID da conta, campanhas ativas, gasto histórico

3. Composio → Google Analytics:
   - Buscar propriedade vinculada ao site
   - Se encontrada: tráfego orgânico mensal baseline, páginas de maior conversão
```

Registrar todos os dados encontrados na seção técnica do board.

---

## Scoring de Maturidade do Cliente

Após coletar tudo, calcular score:

```
Pixel instalado e funcionando?     → +20 pts
Tem histórico de campanhas?        → +15 pts
Budget ≥ R$2.000/mês?             → +15 pts
Tem landing page ativa?            → +15 pts
Sabe o CPA desejado?               → +10 pts
Tem brand book disponível?         → +10 pts
Tem concorrentes mapeados?         → +10 pts
Sabe o público exato?              → + 5 pts
─────────────────────────────────────
TOTAL MÁXIMO:                      100 pts
```

**Interpretação e proposta automática:**

| Score | Perfil | Próximo passo | Pacote sugerido |
|-------|--------|---------------|-----------------|
| 80–100 | Pronto | Iniciar em 2 dias | Meta + Google + UGC |
| 50–79 | Médio | 1 semana de setup | 1 canal principal |
| 30–49 | Verde | Sprint técnico primeiro | Onboarding + 1 canal |
| 0–29 | Não iniciar | Recomendar produto diferente | — |

---

## Checklist de Prontidão Pós-Board

Antes de passar para `criar-plano-estrategico`, verificar:

**OBRIGATÓRIO (sem isso, NÃO avançar):**
- [ ] CPA/ROAS desejado definido
- [ ] Budget mensal confirmado (valor exato)
- [ ] Canal de conversão claro (site, WhatsApp, loja?)
- [ ] Pixel instalado OU checklist-tracking iniciado

**IMPORTANTE (se ausente, documentar como risco):**
- [ ] Brand book disponível
- [ ] Histórico de campanhas anteriores
- [ ] Concorrentes identificados

**RED FLAGS (escalar para @ceo antes de avançar):**
- 🚨 Não sabe o CPA desejado → cliente não tem baseline de negócio
- 🚨 Budget < R$1.500/mês → recomendar produto diferente
- 🚨 Sem landing page E sem WhatsApp → conversão impossível

---

## Output

Criar `.em5/clientes/{nome}/onboarding/board-cliente.md` com todas as seções + dados técnicos do Composio + score + checklist.

Adicionar entrada inicial em `.em5/clientes/{nome}/memoria/notas-sessao.md`.

Atualizar log operacional:
```markdown
| {data} | BOARD | CS | Board completo. Score: {score}/100. Pacote: {pacote}. {alerta se red flag} | CONCLUÍDO | Criar plano estratégico |
```

---

## Handoff para @strategist

```markdown
## Handoff para @strategist
**Arquivos que ele DEVE ler:**
- board-cliente.md (este arquivo — seções 2, 3, 4, 5, 5b)

**Resumo:**
{3 linhas: quem é o cliente, objetivo, contexto mais importante}

**Atenção:**
{1-2 alertas ou riscos identificados no board}
{força de switching dominante: Push/Pull/Hábito/Ansiedade}

**Próxima task:** criar-plano-estrategico
```
