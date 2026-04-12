---
name: definir-funil-macro
agent: estrategista
description: Definir as etapas do funil do cliente: topo, meio, fundo e retencao — mapeando objetivo de cada etapa
inputs:
  - .agencyos/clientes/{nome}/onboarding/briefing-final.md
  - .agencyos/clientes/{nome}/estrategia/posicionamento.md
  - objetivo real confirmado
outputs:
  - secao de funil dentro do plano-estrategico.md ou arquivo proprio
elicit: true
---

# Definir Funil Macro

## Objetivo

Mapear o funil do cliente — desde a primeira interacao ate a conversao e retencaoo. Cada etapa tem um publico, uma mensagem, um formato e um KPI diferente.

## Regra

```
Nem todo funil é igual. Um ecommerce é diferente de uma clinica.
O funil se desenha a partir do comportamento do ICP, nao de template.
```

---

## Passo a passo

### 1. Ler contexto

Ler briefing-final, posicionamento e objetivo real confirmado.

### 2. Identificar tipo de funil

Com base no segmento e modelo de negocio do cliente, identificar:
- **Venda direta (ecommerce):** Anuncio → Produto → Checkout → Compra → Recompra
- **Captacao de leads (servico):** Anuncio → LP → Lead → Contato → Venda
- **Agendamento (agenda):** Anuncio → LP/WhatsApp → Agendamento → Comparecimento → Retorno
- **SaaS/Assinatura:** Anuncio → Trial → Onboarding → Ativacao → Uso continuo

### 3. Definir etapas do funil

Para cada etapa, definir:

| Etapa | Objetivo | Formato Principal | KPI |
|-------|----------|-------------------|-----|
| **Topo** | Atrair audiencia qualificada | Anuncios de awareness/content | CPM, CTR, Alcance |
| **Meio** | Consideracao e engajamento | Lead magnet, conteudo, prova | CPL, Taxa de LP |
| **Fundo** | Conversao direta | Oferta direta, retargeting | CPA, Taxa de conversao |
| **Retencao** | Fidelizacao e recompra | Email, WhatsApp, remarketing | LTV, Referral |

### 4. Criar documento

Criar atualizar o plano estrategico com:

```markdown
## Estrutura do Funil

### Topo de Funil — Aquisicao
**Objetivo:** {o que queremos nessa etapa}
**Publico:** {quem alcancar — publico frio, amplo, interesses}
**Formato:** {tipo de anuncio/conteudo}
**Canal:** {Meta, Google, etc.}
**Sucesso =** {como saber que esta funcionando}

### Meio de Funil — Consideracao
**Objetivo:** {capturar interesse, construir confianca}
**Publico:** {engajou, visitou, consumiu — nao converteu ainda}
**Formato:** {lead magnet, conteudo rico, prova social}
**Canal:** {canal principal + canal de nutricao}
**Sucesso =** {metrica}

### Fundo de Funil — Conversao
**Objetivo:** {converter em venda, lead qualificado, agendamento}
**Publico:** {quente — ja engajou, visitou LP, abandonou carrinho}
**Formato:** {oferta direta, urgencia, retargeting}
**Canal:** {canal de conversao}
**Sucesso =** {metrica}

### Retencao — Pos-venda e LTV
**Objetivo:** {fidelizar, gerar recompra, referral}
**Publico:** {clientes ativos e inativos}
**Formato:** {email, WhatsApp, ofertas, conteudo exclusivo}
**Sucesso =** {metrica}
```

### 5. Mapear gaps

Identificar o que o cliente **precisa ter** para cada etapa funcionar:
- Tem LP para capturar leads?
- Tem processo de pos-venda?
- Tem CRM ou forma de acompanhar?
- Tem conteudo de prova social disponivel?

Registrar gaps como alertas:
```
⚠️ Gap identificado: {gap}
→ Necessario resolver antes de ativar etapa de {etapa do funil}
```

### 6. Atualizar log operacional

```markdown
| {data} | ESTRATÉGIA | Estrategista | Funil macro definido para {cliente} | CONCLUÍDO | Criar hipoteses ou plano final |
```

---

## Output esperado

- Funil macro documentado com etapas, objetivos, publicos e KPIs
- Gaps identificados e registrados
- Log operacional atualizado
- Pronto para `*criar-hipoteses {nome}` e `*criar-plano-estrategico {nome}`
