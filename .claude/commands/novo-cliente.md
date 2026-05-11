# Criar workspace de novo cliente

Crie o workspace para o cliente "$ARGUMENTS".

1. Leia `.agencyos/core/data/estrutura-pastas.yaml`
2. Crie a estrutura completa em `.agencyos/clientes/$ARGUMENTS/`
3. Copie os templates base:
   - `core/templates/briefing/formulario-briefing.md` → `clientes/$ARGUMENTS/onboarding/formulario.md`
   - `core/templates/logs/log-operacional.md` → `clientes/$ARGUMENTS/operacao/log-operacional.md`
   - `core/templates/logs/log-performance-criativa.md` → `clientes/$ARGUMENTS/operacao/log-performance-criativa.md`
4. Crie `clientes/$ARGUMENTS/onboarding/meta.md` com:
   ```
   nome: $ARGUMENTS
   data_entrada: {data de hoje}
   status: novo
   etapa_atual: aguardando-onboarding
   ```
5. Liste as pastas criadas e confirme.
6. Próximo passo: `/onboarding $ARGUMENTS`
