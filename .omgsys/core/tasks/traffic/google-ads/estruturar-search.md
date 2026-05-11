# Task: estruturar-search
# Agente: traffic (Max)
# Input: keywords-{data}.md + estrutura-base-campanhas.yaml
# Output: clientes/{nome}/trafego/estrutura-campanhas.md (seção Google Ads)

## Objetivo
Montar a estrutura de campanhas de Search no Google Ads:
hierarquia campanha → grupo de anúncio → keywords → anúncios.

## Inputs necessários
1. `.omgsys/clientes/{nome}/trafego/keywords-{data}.md`
2. `.omgsys/core/data/estrutura-base-campanhas.yaml`
3. Budget total Google Ads (`plano-estrategico.md`)
4. Copy de anúncios (`copy/search/` — gerada por @copywriter)

## Execução

### 1. Definir estrutura de campanhas

Seguir `estrutura-base-campanhas.yaml` como base:

```
Conta Google Ads
├── Campanha: [CLIENTE] | Search | Conversão
│   Orçamento: 60-70% do budget total
│   Objetivo: Leads / Vendas
│   Bidding: Target CPA (após 30+ conv.) ou Max Conversions
│   ├── Grupo: {Tema Principal}
│   ├── Grupo: {Problema/Solução}
│   └── Grupo: Concorrentes
│
└── Campanha: [CLIENTE] | Search | Marca
    Orçamento: 10-15% do budget total
    Objetivo: Proteger marca, capturar demand
    Bidding: Max Clicks ou Target Impression Share
    └── Grupo: Marca
```

### 2. Configurações obrigatórias antes de subir

- [ ] Negativas globais adicionadas na lista da conta
- [ ] Negativas de campanha aplicadas (lista do mapear-keywords.md)
- [ ] Extensões configuradas: sitelinks, callouts, snippets, chamada
- [ ] Conversões configuradas e verificadas no Google Analytics (Composio)
- [ ] Rastreamento de URL definido (parâmetros UTM)
- [ ] Programação de anúncios: verificar se horário comercial é relevante
- [ ] Segmentação geográfica: apenas regiões do ICP

### 3. Configuração de anúncios RSA

Por grupo de anúncio, criar:
- Mínimo 1 RSA com 15 headlines e 4 descriptions
- Pinnar headline 1: nome/marca ou oferta principal
- Variar ângulos: benefício, urgência, credencial, objeção

### 4. Documentar estrutura

Atualizar: `.omgsys/clientes/{nome}/trafego/estrutura-campanhas.md`

```markdown
## Google Ads — Estrutura

### Campanha: Conversão
- Budget: R$ {X}/dia
- Objetivo: {Lead Gen / Conversão}
- Bidding: {estratégia}

#### Grupos de Anúncio
| Grupo | Keywords (qtd) | Match Types | RSAs |
|-------|---------------|-------------|------|
| {nome} | {n} | exact, phrase | {n} |

### Lista de Negativas Globais
[lista completa]

### Checklist pré-publicação
[itens acima]
```

## Handoff
- Estrutura documentada → @qa valida antes de subir
- Subir campanhas via Composio (Google Ads) após aprovação do @qa
- Registrar data de subida no `log-operacional.md`
