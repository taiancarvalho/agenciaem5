# Status operacional do cliente

Cliente: $ARGUMENTS

Leia em paralelo e monte o resumo:
1. `.agencyos/clientes/$ARGUMENTS/onboarding/briefing-final.md` → objetivo e oferta
2. `.agencyos/clientes/$ARGUMENTS/estrategia/plano-estrategico.md` → estratégia e metas
3. `.agencyos/clientes/$ARGUMENTS/operacao/log-operacional.md` → últimas 5 interações e pendências abertas
4. `.agencyos/clientes/$ARGUMENTS/operacao/log-performance-criativa.md` → criativos ativos e status

Se algum arquivo não existir: indique qual etapa está pendente.

Formato do resumo:
```
## Status: $ARGUMENTS — {data de hoje}
**Objetivo:** ...
**Estratégia atual:** ...
**Campanhas ativas:** ...
**Performance:** ...
**Pendências abertas:** ...
**Próximos passos:** ...
```
