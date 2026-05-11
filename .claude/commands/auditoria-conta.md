# Auditar conta de anúncios

Argumento esperado: "{cliente} {plataforma}"
Exemplos: "empresa-abc meta" | "empresa-abc google"

Parse o argumento: primeiro token = cliente, segundo token = plataforma (meta ou google).

1. Confirme que os arquivos do cliente existem:
   - `.agencyos/clientes/{cliente}/onboarding/briefing-final.md`
   - `.agencyos/clientes/{cliente}/estrategia/plano-estrategico.md`
   Se faltarem: avise quais estão ausentes e qual etapa executar primeiro.

2. Ative @traffic:
   ```
   @traffic *auditar-conta {cliente} {plataforma}
   — objetivo: mapear estado atual da conta e identificar oportunidades
   — via Composio {plataforma}_ADS: puxar campanhas, públicos, performance histórica
   — se não souber os parâmetros exatos: consulte Context7 antes de executar
   — referência: briefing-final.md + plano-estrategico.md
   — entrega: clientes/{cliente}/auditoria/auditoria-{data}.md
   ```

3. Confirme que o arquivo de auditoria foi gerado e liste os principais achados.
