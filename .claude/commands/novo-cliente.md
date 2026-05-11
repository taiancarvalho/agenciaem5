# Criar workspace de novo cliente

Crie o workspace para o cliente "$ARGUMENTS".

1. Leia `.omgsys/core/data/estrutura-pastas.yaml`
2. Crie a estrutura completa em `.omgsys/clientes/$ARGUMENTS/`
3. Copie os templates base:
   - `.omgsys/core/templates/briefing/formulario-briefing.md` → `.omgsys/clientes/$ARGUMENTS/onboarding/formulario.md`
   - `.omgsys/core/templates/logs/log-operacional.md` → `.omgsys/clientes/$ARGUMENTS/operacao/log-operacional.md`
   - `.omgsys/core/templates/logs/log-performance-criativa.md` → `.omgsys/clientes/$ARGUMENTS/operacao/log-performance-criativa.md`
4. Crie `.omgsys/clientes/$ARGUMENTS/onboarding/meta.md` com:
   ```
   nome: $ARGUMENTS
   data_entrada: {data de hoje}
   status: novo
   etapa_atual: aguardando-onboarding
   ```
5. Liste as pastas criadas e confirme.
6. Próximo passo: `/onboarding $ARGUMENTS`
