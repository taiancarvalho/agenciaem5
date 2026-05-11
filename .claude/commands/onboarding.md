# Iniciar onboarding de cliente

Cliente: $ARGUMENTS

1. Confirme que `.omgsys/clientes/$ARGUMENTS/onboarding/meta.md` existe.
   Se não existir: pare e instrua → execute `/novo-cliente $ARGUMENTS` primeiro.

2. Ative @coo com delegação mínima:
   ```
   @coo *onboarding $ARGUMENTS
   — objetivo: documentar cliente novo para estratégia
   — referência: .omgsys/clientes/$ARGUMENTS/onboarding/meta.md
   — entrega: .omgsys/clientes/$ARGUMENTS/onboarding/briefing-final.md
   ```

3. @coo lê `.omgsys/core/workflows/onboarding-cliente.yaml` e orquestra:
   @cs coleta briefing → gera briefing-final → lista acessos → valida tracking

4. Ao final, confirme que `briefing-final.md` foi gerado.
5. Sinalize: handoff para @strategist pronto.
