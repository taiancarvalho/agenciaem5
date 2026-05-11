# /auditoria-conta — Auditar conta de anúncios

**Argumento:** `/auditoria-conta $ARGUMENTS` (ex: `/auditoria-conta clinica-sao-paulo meta`)

## O que este comando faz

Aciona @traffic para fazer auditoria completa da conta de anúncios do cliente.
Suporta Meta Ads e Google Ads. Usa Composio MCP para dados reais.

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente e a plataforma (meta ou google).

Parse o argumento: `{nome-cliente} {plataforma}`
- Se plataforma não informada: pergunte (meta / google / ambos)

**Para Meta Ads:**
- Leia `.omgsys/core/tasks/traffic/auditar-conta.md`
- Use Composio MCP com ferramentas Meta Ads

**Para Google Ads:**
- Leia `.omgsys/core/tasks/traffic/auditar-conta-google.md`
- Use Composio MCP com ferramentas Google Ads

Acione @traffic com:
- Cliente: {nome}
- Plataforma: {meta/google}
- Task: auditar-conta (ou auditar-conta-google)
- Destino do relatório: `.omgsys/clientes/{nome}/trafego/auditoria-{plataforma}-{data}.md`

Após auditoria: apresentar lista priorizada de ações recomendadas.
Perguntar se deve acionar @coo para executar os ajustes.
