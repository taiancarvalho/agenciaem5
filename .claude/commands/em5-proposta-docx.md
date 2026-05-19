# /em5-proposta-docx — Proposta comercial em .docx (Word)

**Argumento:** `/em5-proposta-docx $ARGUMENTS` (ex: `/em5-proposta-docx prospect-acme oferta-trafego-pago`)

## Por que existe

Cliente/prospect espera receber proposta em formato **Word/DOCX** (não markdown).
Diretoria abre no Word, comenta, assina. PDF é fim de linha — DOCX é o documento
vivo da negociação.

Adapter de `docx`.

## Quando usar

- @vendas Caça envia proposta formal pra prospect (DOCX > PDF na primeira rodada)
- @cs Sol envia contrato/SOW pro cliente existente atualizar
- @fin Caixa envia ajuste de fee pra cliente assinar

## Quando NÃO usar

- Proposta de 1 página simples → PDF basta (`/em5-pdf`)
- Documento que cliente vai apenas ler (não editar) → PDF
- Comunicação informal → email/WhatsApp

## Argumentos

```
/em5-proposta-docx {cliente-ou-prospect} {tipo}
```

`tipo`: `proposta-comercial` | `contrato` | `aditivo` | `sow`

## Instrução

### Passo 1 — Carregar template

Templates base em `.em5/core/templates/contratos/`:
- `contrato-base.md` (markdown source)

Se não existir versão `.docx` template, criar do markdown via skill `docx`
upstream.

### Passo 2 — Coletar dados

Pra `proposta-comercial`:
- `.em5/clientes/{prospect}/vendas/diagnostico.md`
- `.em5/clientes/{prospect}/vendas/oferta.md`
- `em5-config.yaml` → dados da agência

Pra `contrato`/`sow`:
- `briefing-final.md` (escopo)
- `financeiro/mensalidade.yaml` (valores)
- Dados jurídicos do cliente (CNPJ, razão social, endereço)

### Passo 3 — Invocar skill upstream `docx`

Skill upstream cria/edita o documento Word preservando:
- Formatação (negritos, listas, tabelas, headings)
- Tracked changes (se for revisão de aditivo)
- Comments (se houver pontos pra cliente revisar)

### Passo 4 — Salvar artefato

```
.em5/clientes/{cliente}/vendas/proposta-{tipo}-{YYYY-MM-DD}.docx
```

ou (contratos):
```
.em5/clientes/{cliente}/financeiro/contrato-{tipo}-{YYYY-MM-DD}.docx
```

### Passo 5 — Verify + envio

- `/em5-verify {cliente} vendas/proposta-*.docx`
- @qa Crivo valida valores numéricos e dados jurídicos (não pode ter erro)
- @cs envia via Gmail (Composio) anexado

### Registro

`.em5/clientes/{cliente}/operacao/log-operacional.md`:
```
| {data} | proposta-{tipo} | DOCX enviado | APROVADO | {cliente_email} |
```

## Anti-padrão

Não gerar DOCX sem trackchanges quando enviar revisão. Cliente espera ver o que
mudou — sem isso parece documento totalmente novo, desanima.
