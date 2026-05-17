> ⚠️ **ALIAS DEPRECATED** — use \`/iterar\`. Este alias será removido em 30 dias (após 2026-06-15).

# /iterar-criativo — Iterar criativos com baixa performance

**Argumento:** `/iterar-criativo $ARGUMENTS` (ex: `/iterar-criativo clinica-sao-paulo`)

## O que este comando faz

1. @traffic analisa o log de performance criativa e identifica criativos com baixa performance
2. @copywriter propõe novos ângulos baseados nos dados
3. @designer produz as novas versões
4. @qa valida antes de publicar

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente.

Leia `.em5/core/workflows/iteracao-criativa.yaml` para a sequência completa.

Leia o contexto do cliente:
- `.em5/clientes/{nome}/operacao/log-performance-criativa.md` — o que está rodando e como

Acione @coo com:
- Cliente: {nome}
- Workflow: iteracao-criativa
- Referência: `.em5/core/workflows/iteracao-criativa.yaml`
- Dados: `.em5/clientes/{nome}/operacao/log-performance-criativa.md`

**Regra:** Iteração é baseada em dados — nunca em achismo.
Janela mínima de análise: 7 dias de dados antes de propor mudança.
