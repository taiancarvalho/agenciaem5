# /auditar — Auditar conta de anúncios

**Argumento:** `/auditar $ARGUMENTS` (ex: `/auditar clinica-sao-paulo meta`)

## O que este comando faz

Roteia auditoria de conta de anúncios via `@ceo → @coo → @traffic → @qa`.
Suporta Meta Ads e Google Ads. Usa Composio MCP para dados reais.

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente e a plataforma (meta / google / ambos).

Parse o argumento: `{nome-cliente} {plataforma}`
- Se plataforma não informada: pergunte (meta / google / ambos)

### Roteamento (NÃO pular camadas — CLAUDE.md Regra Absoluta 1)

**Main thread NÃO chama @traffic direto.** Auditoria é operação stateful
(coleta + análise + QA) e DEVE passar por @coo.

Acione **@coo** com prompt:

```
@coo Nexus — operação: auditoria de conta de anúncios
Cliente: {nome}
Plataforma: {meta|google|ambos}
Workflow: leitura sequencial da task auditar-conta(-google).md
Entrega esperada:
  - clientes/{nome}/trafego/auditoria-{plataforma}-{YYYY-MM-DD}.md
  - veredicto @qa em clientes/{nome}/trafego/qa-verdict-{YYYY-MM-DD}.md
Referência:
  - .em5/core/tasks/traffic/auditar-conta.md (meta)
  - .em5/core/tasks/traffic/auditar-conta-google.md (google)
```

### O que @coo fará (não você)

1. Lê estado: `clientes/{nome}/operacao/log-operacional.md` + `proximos-passos.md`
2. Lê task `.em5/core/tasks/traffic/auditar-conta(-google).md`
3. Monta contexto mínimo para @traffic (Art. IV): ad_account_id, janela, plano-estrategico
4. Delega @traffic → aguarda artefato
5. Delega @qa → aguarda veredicto formal
6. Append log a cada transição
7. Consolida e reporta @ceo

### Após o ciclo

Quando @coo retornar `APROVADO`:
- Apresente ao usuário: top 3 ações priorizadas da auditoria + path do arquivo
- Pergunte se deve acionar @coo novamente para executar os ajustes (`/iterar` ou ajustes específicos)

Se @coo retornar `BLOQUEADO` (qa reprovou): mostre motivo + ação corretiva.
NÃO contorne o veredicto QA (CLAUDE.md Regra Absoluta 2).
