---
nome: cs-registrar-log-operacional
agente: cs
tempo_medio: 2min
composio_mcp: []
versao: 1.0
usado_em: [auditoria-conta, relatorio-cliente, ciclo-campanha, iteracao-criativa, daily-run, lancamento]
---

# Bloco: Registrar Log Operacional

## O que faz
Append entrada datada em `clientes/{nome}/operacao/log-operacional.md`.

## Inputs
- nome cliente
- tipo operação (auditoria / relatório / campanha / iteração / etc)
- agente responsável
- status (entregue / pendente / atrasado / bloqueado)
- próximo passo
- path artefato gerado

## Execução
1. Abrir log-operacional.md (criar se primeira vez — usa template)
2. Append linha:
   `| {data} | {tipo} | @{agente} | {status} | {proximo} | {path} |`
3. Salvar

## Output
- Log atualizado (rastreável)

## Anti-padrões
- ❌ Sobrescrever entradas antigas (sempre append)
- ❌ Sem path artefato (não auditável)
