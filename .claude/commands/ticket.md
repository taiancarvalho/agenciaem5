# /ticket — Criar ticket manual

**Argumento:** `/ticket {tipo} {cliente}` (ex: `/ticket auditoria-meta cnajund`)

## O que este comando faz

Cria ticket vivo manual em `historico/{YYMMDD-clienteslug-tipo}/ticket.md`. Útil pra debug, demanda fora receita padrão, OR teste do sistema.

## Roteamento (CLAUDE.md Regra Absoluta 1)

Acione **@coo** com prompt:

```
@coo Nexus — operação: criar ticket manual
Tipo: {tipo}
Cliente: {cliente-slug}
Receita base: (deixar @coo decidir OR especificar)
Workflow: usar bloco coo-criar-ticket.md
Entrega: path do ticket criado
```

## Quando usar

- **Debug:** validar estrutura ticket nova
- **Demanda fora receita:** ad-hoc
- **Teste manual:** simular fluxo sem subagent dispatch real

## Quando NÃO usar

- Skill operacional padrão (`/auditar`, `/campanha`, etc) — já criam ticket automático via @coo
- Não usar /ticket pra "pular" QA gate de receita

## Output esperado

```
✅ Ticket criado: historico/260520-cnajund-auditoria-meta/ticket.md

Próximo passo:
- Edite manualmente (debug)
- OR rode @coo dispatch step 1
```

## Referências

- Protocolo: `.em5/system/rules/protocolo-ticket-vivo.md`
- Template: `historico/_template/ticket.md`
- Bloco: `.em5/blocos/coo-criar-ticket.md`
- ID convention: `historico/README.md`
