# Task: mapear-keywords
# Agente: traffic (Pulse)
# Input: briefing-final.md + plano-estrategico.md
# Output: clientes/{nome}/trafego/keywords-{data}.md

## Objetivo
Mapear palavras-chave para campanhas de Search no Google Ads:
intenção de compra, concorrentes, marca e negativas.

## Inputs necessários
1. `.em5/clientes/{nome}/onboarding/briefing-final.md`
2. `.em5/clientes/{nome}/estrategia/plano-estrategico.md`
3. Budget mensal previsto (para estimar volume)

## Execução

### 1. Categorias de keywords

**Intenção de compra (prioridade máxima):**
- Produto/serviço + localização (ex: "advogado trabalhista SP")
- Produto/serviço + modificadores (ex: "contratar", "preço", "quanto custa")
- Problema + solução implícita (ex: "demissão sem justa causa direitos")

**Concorrentes:**
- Nome dos concorrentes diretos identificados no plano estratégico
- Marcas alternativas que o público busca

**Marca:**
- Nome da empresa + variações
- Nome do produto/serviço principal

**Negativas (excluir obrigatoriamente):**
- Variações sem intenção comercial (ex: "grátis", "gratuito", "como fazer")
- Termos genéricos demais que geram custo sem conversão
- Profissões concorrentes irrelevantes

### 2. Match types por grupo

```
Exact match [palavra exata]:
→ Termos de alta intenção confirmados
→ Maior CPL, menor volume, maior qualidade

Phrase match "palavra em frase":
→ Termos de intenção moderada
→ Equilíbrio volume x qualidade

Broad match modificado (cuidado):
→ Só usar com lista de negativas robusta
→ Monitorar search terms semanalmente
```

### 3. Estrutura de grupos de anúncio

Regra: 1 tema = 1 grupo de anúncio (máximo 15-20 keywords por grupo)

```
Campanha: [CLIENTE] | Search | {objetivo}
├── Grupo: Produto Principal
│   ├── [keyword exata 1]
│   ├── [keyword exata 2]
│   └── [keyword frase 1]
├── Grupo: Problema + Solução
│   ├── [keyword problema 1]
│   └── [keyword problema 2]
└── Grupo: Concorrentes
    ├── [concorrente 1]
    └── [concorrente 2]
```

### 4. Salvar output

```markdown
# Keywords — {nome-cliente} — {data}

## Intenção de Compra
| Keyword | Match Type | Volume Est. | CPC Est. |
|---------|------------|-------------|----------|

## Concorrentes
| Keyword | Match Type |
|---------|------------|

## Marca
| Keyword | Match Type |
|---------|------------|

## Negativas Globais
- [lista]

## Estrutura de Grupos
[conforme seção 3]
```

Salvar em: `.em5/clientes/{nome}/trafego/keywords-{YYYY-MM-DD}.md`

## Handoff
- Entregar para @traffic usar em `estruturar-campanha.md` (versão Google)
- Negativas globais entram na conta antes de qualquer campanha live
