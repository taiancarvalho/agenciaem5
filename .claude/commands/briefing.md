# Coletar briefing de cliente

Cliente: $ARGUMENTS

1. Confirme que `.agencyos/clientes/$ARGUMENTS/` existe.
   Se não: execute `/novo-cliente $ARGUMENTS` primeiro.

2. Ative @cs:
   ```
   @cs *coletar-briefing $ARGUMENTS
   — objetivo: documentar cliente para estratégia
   — modo: UMA pergunta por vez, aguardar resposta antes de avançar
   — referência: core/templates/briefing/formulario-briefing.md
   — entrega: clientes/$ARGUMENTS/onboarding/briefing-final.md
   ```

3. @cs conduz a coleta interativa com o usuário.
   Não faça todas as perguntas de uma vez — uma de cada vez.
   Confirme cada resposta antes de avançar.

4. Ao final:
   - Confirme que `briefing-final.md` foi salvo
   - Próximo passo sugerido: `@strategist *criar-plano-estrategico $ARGUMENTS`
