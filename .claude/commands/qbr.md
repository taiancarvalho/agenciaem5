# /qbr — QBR Trimestral (híbrido)

**Argumento:** `/qbr {cliente-slug} {quarter}` (ex: `/qbr cnajund 2026-Q1`)

## Classificação
**Híbrido** → @ceo decide + @coo executa

## Roteamento

Acione **@coo** com prompt (após @ceo aprovar agenda):
```
@coo Nexus — operação: QBR trimestral
Cliente: {slug}
Trimestre: {YYYY-Q}
Receita: qbr-trimestral
Referência: .em5/receitas/qbr-trimestral.md
```

## Quando rodar

- Cron trimestral (dia 15 mar/jun/set/dez)
- Pedido cliente
- Renovação proxima (60d antes)

## Output

- `clientes/{nome}/qbr/{Q}/` (dados + deck + ata + plano-proximo-trimestre)
- Reunião 60-90min cliente
- @ceo decide renovação após QBR
