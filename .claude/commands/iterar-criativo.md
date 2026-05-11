# Iterar criativo com baixa performance

Cliente: $ARGUMENTS

1. Leia `.omgsys/clientes/$ARGUMENTS/operacao/log-performance-criativa.md`
   Identifique criativos com performance abaixo da meta por 7+ dias consecutivos.
   Se não houver criativos elegantes para iteração: informe e encerre.

2. Leia `.omgsys/core/workflows/iteracao-criativa.yaml`

3. Ative @coo:
   ```
   @coo *executar-workflow iteracao-criativa $ARGUMENTS
   — objetivo: criar variações dos criativos com baixa performance
   — contexto: criativos identificados no log com performance abaixo da meta
   — referência: .omgsys/clientes/$ARGUMENTS/operacao/log-performance-criativa.md
   — entrega: novas variações versionadas (CR-XXX-v2) + log atualizado
   ```

4. @coo orquestra:
   - @traffic diagnostica a lacuna e propõe nova direção
   - @copywriter cria novo ângulo ou variação de copy
   - @designer produz variação visual (CR-XXX-v2)
   - @qa valida antes de subir
   - @traffic sobe em teste A/B

5. Aguardar 7 dias antes de comparar resultados e registrar aprendizado no log.
