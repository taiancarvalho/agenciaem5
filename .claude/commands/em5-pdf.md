# /em5-pdf — Converter artefato (HTML/MD/DOCX) em PDF estático

**Argumento:** `/em5-pdf $ARGUMENTS` (ex: `/em5-pdf cna-vila-mariana relatorios/relatorio-2026-05-18.html`)

## Por que existe

PDF é **fim de linha** — assinatura, arquivamento, anexo formal de email,
WhatsApp. HTML/MD/DOCX são vivos (editáveis); PDF é congelado.

Adapter de `pdf`.

## Quando usar

- Anexo de email pro cliente que não vai editar (relatório finalizado)
- Contrato assinado (formato imutável)
- Proposta finalizada após aprovação cliente (DOCX → PDF assinado)
- Arquivamento legal (Asaas, contabilidade)

## Quando NÃO usar

- Documento em rascunho/revisão → DOCX (editável)
- Relatório mensal vivo → HTML (mais rico, interativo, sem perda no print)
- Compartilhamento interno entre agentes → markdown

## Argumentos

```
/em5-pdf {cliente} {source_path}
```

`source_path`: caminho relativo ao workspace do cliente

Aceita: `.html`, `.md`, `.docx`, `.pptx`

## Instrução

### Passo 1 — Validar fonte

- Arquivo existe?
- Tipo suportado?
- Tem placeholder `{{...}}` residual? → BLOQUEIO (artefato incompleto)

### Passo 2 — Invocar skill upstream

`pdf` skill upstream converte preservando:
- **HTML:** estilo CSS inline, paginação `@media print`, quebras de página
- **DOCX:** formatação Word preservada
- **PPTX:** 1 slide por página, 16:9 ou 4:3 mantido
- **MD:** renderiza via pandoc/typography custom

### Passo 3 — Salvar artefato

Mesma pasta da fonte + extensão `.pdf`:
```
{source_path}.pdf
```

Exemplo:
- Fonte: `clientes/cna-vm/relatorios/relatorio-2026-05-18.html`
- PDF: `clientes/cna-vm/relatorios/relatorio-2026-05-18.pdf`

### Passo 4 — Metadata

Salvar paralelo:
```
{source_path}-pdf-meta.json
```

```json
{
  "source": "{source_path}",
  "source_hash": "sha256:...",
  "pdf_output": "{pdf_path}",
  "pdf_size_bytes": 123456,
  "pages": 4,
  "generated_at": "2026-05-19T10:30:00Z",
  "status": "FINAL" | "DRAFT"
}
```

Hash da fonte permite verificar se PDF está stale (fonte foi editada após).

### Passo 5 — Verify + envio

- `/em5-verify {cliente} {pdf_path}`
- @qa Crivo valida:
  - PDF abre sem erro
  - Páginas batem com versão HTML/DOCX
  - Sem caractere quebrado (encoding utf-8)
  - Texto selecionável (não imagem do texto)
- @cs envia anexado via Gmail (Composio)

## Anti-padrão

Não gerar PDF cedo. Se artefato ainda muda, PDF vira lixo digital. Regra: PDF só
depois de @qa APROVADO + cliente confirmou versão.

## Combinações comuns

```
/relatorio cliente              → HTML
/em5-pdf cliente relatorios/X.html  → PDF anexável

/em5-proposta-docx prospect Y   → DOCX (cliente edita)
[após assinatura]
/em5-pdf prospect vendas/Y.docx → PDF arquivo final

/em5-deck-pptx cliente Z        → PPTX (apresentação ao vivo)
/em5-pdf cliente vendas/Z.pptx  → PDF pra enviar pré-reunião
```

## Integração com Asaas (financeiro BR)

PDFs de contrato + nota fiscal são anexados em cobrança Asaas via:
```
@fin *anexar-contrato-asaas {cliente}
```
Que invoca `/em5-pdf` se contrato ainda for DOCX.
