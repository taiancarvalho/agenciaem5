# Task: coletar-briefing

## Agente
Sol

## Objetivo
Coletar e estruturar o briefing inicial sem inventar dados.

## Inputs obrigatórios
- nome do cliente
- respostas reais do cliente ou contexto já documentado

## Arquivos de entrada
- `clients/{cliente}/onboarding/`
- templates relevantes do projeto

## Passos
1. Consolidar respostas existentes.
2. Identificar lacunas explicitamente.
3. Registrar briefing bruto e briefing estruturado.
4. Marcar perguntas pendentes sem preencher no chute.

## Outputs obrigatórios
- `clients/{cliente}/onboarding/briefing-bruto.md`
- `clients/{cliente}/onboarding/briefing-estruturado.md`

## Handoff seguinte
- Sol → Sol (`gerar-briefing-final`)

## Bloqueios
- ausência total de contexto mínimo
