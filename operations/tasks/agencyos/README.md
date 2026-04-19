# Tasks operacionais do AgencyOS no OpenClaw

Estas tasks traduzem o AgencyOS para execução real dentro do OpenClaw.

## Regra
- agente = dono do domínio
- task = unidade de execução
- output = arquivo previsível
- handoff = arquivo compacto
- QA = gate obrigatório

## Convenção de task
Cada task deve definir:
- objetivo
- inputs obrigatórios
- arquivos de entrada
- passos de execução
- outputs obrigatórios
- próximo handoff
- condição de bloqueio
