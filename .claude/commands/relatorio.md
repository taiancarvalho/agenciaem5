# /relatorio — Gerar e enviar relatório de performance

**Argumento:** `/relatorio $ARGUMENTS` (ex: `/relatorio clinica-sao-paulo`)

## O que este comando faz

1. Aciona @traffic para gerar relatório de performance com os dados disponíveis
2. @qa valida o relatório antes do envio
3. @cs envia ao cliente via canal oficial (Gmail via Composio)

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente.

Leia o contexto do cliente:
- `.em5/clientes/{nome}/operacao/log-operacional.md` — período e últimas campanhas
- `.em5/clientes/{nome}/trafego/` — dados de campanha disponíveis

Acione @traffic com:
- Cliente: {nome}
- Objetivo: gerar relatório de performance do período
- Referência: dados em `.em5/clientes/{nome}/trafego/`
- Destino: `.em5/clientes/{nome}/relatorios/relatorio-{YYYY-MM-DD}.md`
- Ferramenta: Composio MCP (Google Analytics + Meta Ads) para dados reais

Após @traffic gerar o relatório:
- @qa valida antes do envio
- @cs envia via Gmail (Composio MCP) após veredicto APROVADO

Registrar no log operacional: "Relatório gerado e enviado em {data}"
