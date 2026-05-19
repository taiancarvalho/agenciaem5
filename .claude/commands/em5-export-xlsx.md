# /em5-export-xlsx — Exportar dados pro cliente em Excel (.xlsx)

**Argumento:** `/em5-export-xlsx $ARGUMENTS` (ex: `/em5-export-xlsx cna-vila-mariana campanhas-90d`)

## Por que existe

Cliente quer **dados crus** pra abrir no Excel, pivot, brincar. HTML relatório
é resumo bonito; XLSX é fonte pra analista do cliente investigar.

Adapter de `xlsx`.

## Quando usar

- Cliente pede "me manda os dados em planilha"
- Análise mensal que cliente quer **detalhar por dia/criativo/público**
- Export pra contabilidade do cliente (gasto por campanha)
- @fin Caixa envia conciliação financeira

## Quando NÃO usar

- Relatório resumo → HTML (`/relatorio`)
- Apresentação executiva → PPTX (`/em5-deck-pptx`)
- Conteúdo conversacional → email

## Argumentos

```
/em5-export-xlsx {cliente} {tipo}
```

`tipo`: `campanhas-{periodo}` | `criativos-{periodo}` | `publicos` | `funil-{periodo}` | `financeiro-{periodo}`

## Instrução

### Passo 1 — Coletar dados via Composio

Por tipo:

**campanhas-{periodo}:**
- `COMPOSIO_MULTI_EXECUTE_TOOL` Meta Ads `get_insights` + Google Ads
- Breakdown: por dia × campanha × criativo

**criativos-{periodo}:**
- Meta Ads insights por anúncio + criativo metadata

**publicos:**
- Meta Ads custom audiences + insights por público
- IG/FB audience overlap se disponível

**funil-{periodo}:**
- GA4 events + Microsoft Clarity sessões → join por sessionId

**financeiro-{periodo}:**
- Asaas (cobranças, pagamentos) + Meta Ads (gasto real)

### Passo 2 — Invocar skill upstream `xlsx`

Skill gera arquivo `.xlsx` com:
- **Aba 1: Sumário** — totais, % variação vs período anterior
- **Aba 2+: Detalhe por dimensão** — uma aba por breakdown (canal, campanha, criativo, etc)
- **Aba Final: Metadata** — período, account_id Composio, timestamp captura, fonte

Formatação:
- Headers em negrito
- Numeric format (R$ X,XX pra moeda, 0,00% pra percentual)
- Conditional formatting (vermelho se CPL > baseline)
- Filtros nas tabelas
- Pivot table sugerido na aba Sumário

### Passo 3 — Salvar artefato

```
clientes/{cliente}/relatorios/export-{tipo}-{YYYY-MM-DD}.xlsx
```

ou (financeiro):
```
clientes/{cliente}/financeiro/export-{tipo}-{YYYY-MM-DD}.xlsx
```

### Passo 4 — Verify + envio

- `/em5-verify {cliente} relatorios/export-*.xlsx`
- @qa Crivo valida: totais batem entre abas, sem dado ausente sem flag
- @cs envia via Gmail anexado ou Drive compartilhado

### Registro

`clientes/{cliente}/operacao/log-operacional.md`:
```
| {data} | export-{tipo} | XLSX | APROVADO | Enviado pro {email} |
```

## Anti-padrão

Não exportar tabela sem aba Metadata. Sem timestamp + fonte, cliente compara
com outro export e fica confuso ("são os mesmos dados?"). Metadata fecha o
loop de proveniência (Constitution Art. VI — Honestidade).
