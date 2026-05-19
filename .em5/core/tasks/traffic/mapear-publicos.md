---
name: mapear-publicos
agent: traffic
description: Mapear audiencias disponiveis na conta de anuncios e recomendar estrutura de publicos para as campanhas
inputs:
  - clientes/{nome}/trafego/auditoria.md
  - clientes/{nome}/estrategia/plano-estrategico.md
  - acesso a conta de anuncios
outputs:
  - secao de publicos dentro de auditoria.md ou arquivo publicos-mapeados.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: false
---

# Mapear Publicos

## Objetivo

Levantar todos os publicos existentes na conta e planejar a estrutura de audiencias para as campanhas. Nao pular esta etapa — operacao sem publicos definidos e desperdicio de verba.

## Regra

```
Publico certo > criativo perfeito para publico errado.
Mapear antes de subir. Validar antes de escalar.
```

---

## Passo a passo

### 1. Levantar publicos existentes

Na conta de anuncios, verificar se existem:
- Públicos de engajamento: Instagram, Facebook (7, 14, 30, 60, 90, 180, 365 dias)
- Públicos de site (se pixel ativo): visitantes, page views, leads
- Custom audiences: listas de clientes, emails, telefones
- Lookalikes: se existem e de qual base
- Públicos salvos: interesses, comportamentos ja segmentados

### 2. Identificar lacunas

Comparar publicos disponiveis com o que a estrategia pede:
- Ha publico frio suficiente para prospeccao?
- Ha publico quente para remarketing?
- Ha lookalike da base de clientes?
- O pixel esta gerando dados de site?

### 3. Recomendar estrutura

Criar mapeamento de publicos organizados por funil:

```markdown
# Publicos Mapeados — {Nome do Cliente}

**Data:** {data}

## Publicos existentes
| Tipo | Nome | Tamanho | Status |
|------|------|---------|--------|
| Engajamento IG | IG 30d | X | Ativo/Inativo |

## Publicos a criar
| Tipo | Nome recomendado | Base | Prioridade |
|------|-----------------|------|------------|
| Lookalike | LAL 1% - Compradores | Lista clientes | Alta |

## Estrutura recomendada por funil
- **Topo (frio):** Aberto, interesses, LAL 1-3%
- **Meio (morno):** Engajamento 30-90d, visitantes site
- **Fundo (quente):**Engajamento 7d, leads, carrinho abandonado
- **Retargeting:** Visitantes LP 7d, iniciaram checkout
```

### 4. Conectar com estrutura de campanha

A cada publico mapeado, indicar qual campanha vai usar:
- Campanha de audiencia → publico frio
- Campanha de objetivo → publico quente + meio

---

## Output esperado

- Documento com publicos existentes, lacunas e estrutura recomendada
- Pronto para: `*estruturar-campanha {nome}`
