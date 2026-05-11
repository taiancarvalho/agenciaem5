# Executar ciclo completo de campanha

Cliente: $ARGUMENTS

1. Verifique se `.agencyos/clientes/$ARGUMENTS/estrategia/plano-estrategico.md` existe.
   Se não existir: PARE.
   Estratégia é obrigatória antes de criar campanha.
   Instrua: execute `/onboarding $ARGUMENTS` e depois `@strategist *criar-plano-estrategico $ARGUMENTS`.

2. Leia `.agencyos/core/workflows/ciclo-campanha.yaml`

3. Ative @coo:
   ```
   @coo *lancar-campanha $ARGUMENTS
   — objetivo: ciclo completo desde análise até publicação
   — referência: estrategia/plano-estrategico.md
   — entrega: campanha ativa + relatório inicial para @cs
   ```

4. @coo orquestra a sequência:
   - @strategist analisa briefing
   - @traffic audita conta + estrutura campanha + solicita criativos
   - @copywriter + @designer em paralelo (após solicitação do @traffic)
   - @qa valida tudo: copy + criativos + estrutura da campanha
   - Somente com veredicto APROVADO: @traffic publica
   - @traffic monitora → gera relatório → @cs envia ao cliente

Nenhuma campanha vai ao ar sem veredicto APROVADO do @qa.
