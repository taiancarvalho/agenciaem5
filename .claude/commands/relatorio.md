# Gerar e enviar relatório de performance

Cliente: $ARGUMENTS

1. Ative @traffic:
   ```
   @traffic *gerar-relatorio $ARGUMENTS
   — objetivo: relatório de performance do período
   — via Composio Meta Ads: puxar insights dos últimos 30 dias
   — se não souber os parâmetros: consulte Context7 primeiro
   — entrega: .omgsys/clientes/$ARGUMENTS/relatorios/relatorio-{data}.md
   ```

2. Com relatório gerado, ative @qa:
   ```
   @qa *validar-copy $ARGUMENTS
   — tipo: relatório
   — checklist: dados corretos, tom adequado, sem promessas exageradas
   — referência: .omgsys/clientes/$ARGUMENTS/relatorios/relatorio-{data}.md
   ```

3. Com veredicto APROVADO, ative @cs:
   ```
   @cs *enviar-relatorio $ARGUMENTS
   — via Composio Gmail: enviar para contato registrado no briefing
   — registrar envio no log operacional
   ```

Nunca envie relatório sem passar por @qa.
Se qualquer etapa falhar: informe o motivo e o que corrigir antes de continuar.
