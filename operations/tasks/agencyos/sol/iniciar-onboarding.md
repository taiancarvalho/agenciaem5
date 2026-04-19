# Task: iniciar-onboarding

## Agente
Sol

## Objetivo
Transformar um cliente fechado em cliente documentado e pronto para estratégia.

## Inputs obrigatórios
- nome do cliente
- contato principal
- contexto comercial inicial

## Arquivos de entrada
- `clients/{cliente}/` se já existir
- `team/agencyos-registry.json`

## Passos
1. Garantir estrutura base do cliente em `clients/{cliente}/`.
2. Criar ou atualizar pastas de onboarding, setup-tecnico, estrategia, copy, design, operacao e relatorios.
3. Registrar estado inicial em `clients/{cliente}/operacao/log-operacional.md`.
4. Criar checklist inicial de briefing pendente.
5. Preparar handoff para a coleta de briefing.

## Outputs obrigatórios
- `clients/{cliente}/operacao/log-operacional.md`
- `clients/{cliente}/onboarding/status.md`

## Handoff seguinte
- Sol → Sol (`coletar-briefing`)
- ou Sol → Vera quando briefing estiver finalizado

## Bloqueios
- nome do cliente ausente
- diretório inacessível
