# AgencyOS Workflows no OpenClaw

Esta pasta traduz os workflows do AgencyOS para orquestração com sessões persistentes no OpenClaw.

## Fluxos principais
1. onboarding-cliente
2. setup-tecnico
3. estrategia-campanha
4. gestao-trafego
5. copy-design-qa
6. gestao-continuada-cliente

## Regra central
Workflows são executados por agentes persistentes com handoff por artefato, não por contexto inflado em uma única sessão.

## Orquestração recomendada
- Atlas coordena
- Sol executa onboarding e gestão de cliente
- Vera define estratégia
- Max opera tráfego
- Cal produz copy
- Lux produz criativo
- Zara faz o gate final
