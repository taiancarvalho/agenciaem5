> ⚠️ **ALIAS DEPRECATED** — use \`/status\`. Este alias será removido em 30 dias (após 2026-06-15).

# /status-cliente — Resumo operacional de um cliente

**Argumento:** `/status-cliente $ARGUMENTS` (ex: `/status-cliente clinica-sao-paulo`)

## O que este comando faz

Gera um resumo executivo do estado atual de um cliente, consolidando:
- Etapa atual no pipeline
- Pendências abertas (agência + cliente)
- Últimas ações registradas
- Próximos passos definidos
- Status técnico (pixel, acessos, tracking)

## Instrução

Se `$ARGUMENTS` estiver vazio, liste os clientes em `clientes/` e pergunte qual.

Leia os seguintes arquivos do cliente:
1. `clientes/{nome}/operacao/log-operacional.md` — últimas 10 entradas
2. `clientes/{nome}/operacao/proximos-passos.md`
3. `clientes/{nome}/setup-tecnico/status.md`

Gere um resumo no formato:

```
## Status: {nome-do-cliente}
**Atualizado:** {data de hoje}

### Etapa atual
{onboarding / estratégia / campanha ativa / otimização / etc.}

### Últimas ações
- {data}: {ação}
- {data}: {ação}

### Pendências — Agência
- [ ] {item}

### Pendências — Cliente
- [ ] {item}

### Próximos passos
- {ação} → responsável: @{agente}
```
