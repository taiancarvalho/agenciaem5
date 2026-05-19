---
name: modo-growth
agent: traffic
description: Ativar modo de escala — identificar vencedores, propor estrategias verticais/horizontais e registrar acoes de growth
inputs:
  - clientes/{nome}/operacao/log-performance-criativa.md
  - dados de performance atuais da conta de anuncios
  - clientes/{nome}/estrategia/plano-estrategico.md
outputs:
  - plano de escalacao vertical/horizontal
  - entradas no log-growth.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Modo Growth

## Objetivo

Quando uma campanha esta com desempenho saudavel, ativar o modo de escala: identificar o que funciona, propor como expandir (mais budget, novos publicos, novos canais, novos ofertas) e registrar cada acao no log de growth.

## Regra

```
Nao escalar o que ainda nao provou funcionamento.
Growth e sobre acelerar o que funciona, nao consertar o que nao funciona.
```

## Gatilho de Ativacao

```
Ativar quando: CPA dentro da meta por 7+ dias consecutivos
OU quando: ROAS > 2x por 7+ dias consecutivos
```

---

## Passo a passo

### 1. Avaliar condicoes de escalacao

Verificar:

- CPA esta dentro da meta? Qual a tendencia nos ultimos 7-14 dias?
- Volume de conversoes e suficiente para decisao estatistica?
- Budget atual esta sendo consumido integralmente?
- Ha criativos vencedores claros (CTR > 2%, CPL abaixo da media)?

Se **NAO** atender minimamente:

```
⚠️ Condicoes de escalacao nao atendidas.
- CPA atual: R$X (meta: R$Y)
- Dias dentro da meta: N dias (minimo: 7)
→ Recomendar otimizacao continua antes de growth.
```

### 2. Identificar vencedores

Listar:

**Criativos vencedores:**
- CR-{id}: CTR, CPL, conversoes — o que faz funcionar?
- Qual angulo/conceito gerou melhor resultado?

**Publicos vencedores:**
- Qual audiencia/similar tem melhor CPA?
- Qual faixa etaria/genero mais responde?

**Canais vencedores:**
- Meta vs Google vs outro — qual ROI?

### 3. Definir estrategia de escalacao

#### Escalacao Vertical (aumentar investimento no que funciona)

```
Vertical:
- Aumentar budget do ad set vencedor: +20-30% a cada 3-4 dias
- Manter mesma estrutura, mesmo publico, mesmos criativos
- Monitorar se CPA se mantem apos aumento
```

#### Escalacao Horizontal (expandir para novos espacos)

```
Horizontal:
- Novos Lookalikes (2%, 5%, 10%) do publico que converteu
- Novos canais (se so Meta → testar Google; se so Google → testar TikTok)
- Novas ofertas ou produtos complementares
- Novos angulos criativos baseados no vencedor
```

### 4. Criar plano de crescimento

Gerar documento em `clientes/{nome}/trafego/plano-growth.md`:

```markdown
# Plano de Growth — {Nome do Cliente}

**Data:** {data}
**Criado por:** Pulse (Gestor de Trafego)
**Gatilho:** {CPA X dias na meta / ROAS Y}

## Situacao Atual
- Budget mensal: R$X
- CPA medio: R$Y (meta: R$Z)
- Conversoes/mes: N
- ROI atual: X%

## O Que Esta Funcionando
- **Criativo:** CR-{id} — CTR X%, CPL R$Y
- **Publico:** {descricao} — CPA R$X
- **Canal:** {canal} — ROAS X

## Plano de Escalacao Vertical
| Acao | Budget Antes | Budget Depois | Data | Status |
|------|-------------|---------------|------|--------|
| {adset} | R$X/dia | R$Y/dia | {data} | Pendente |

## Plano de Escalacao Horizontal
| Acao | Tipo | Publico/Canal | Budget | Data Prevista |
|------|------|---------------|--------|---------------|
| {acao} | LOOKALIKE / CANAL / OFERTA | {detalhe} | R$X | {data} |

## Riscos
- {risco 1 — ex: aumentar budget pode elevar CPA}
- {risco 2 — ex: audiencia pode saturar em X semanas}

## Metrica de Sucesso
- Meta: reduzir CPA em X% OU aumentar conversoes em Y%
- Janela de avaliacao: 14 dias por acao
```

### 5. Registrar no log de growth

Para cada acao do plano, adicionar entrada em `clientes/{nome}/operacao/log-growth.md`:

```markdown
| GW-{id} | {data} | {descricao da acao} | {VERTICAL/HORIZONTAL/CRIATIVO/CANAL/OFERTA} | Pendente | Agendada |
```

### 6. Comunicar ao CS

```
📈 Plano de growth criado para {cliente}.
- {N} acoes verticais
- {N} acoes horizontais
→ CS compartilhar com cliente para aprovacao de budget antes de executar.
```

## Output esperado

- `plano-growth.md` com estrategia detalhada
- Entradas criadas no log-growth.md
- CS comunicado sobre mudancas de budget
