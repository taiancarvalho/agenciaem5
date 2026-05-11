# /criar-campanha — Ciclo completo de campanha

**Argumento:** `/criar-campanha $ARGUMENTS` (ex: `/criar-campanha clinica-sao-paulo`)

## O que este comando faz

Executa o workflow `ciclo-campanha` completo:
estratégia → tráfego → copy + design (paralelo) → QA → publicação → monitoramento

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente.

Verifique se o briefing-final.md existe em `.omgsys/clientes/{nome}/onboarding/`.
Se não existir: sugira rodar `/onboarding {nome}` primeiro.

Leia `.omgsys/core/workflows/ciclo-campanha.yaml` para conhecer a sequência completa.

Acione @coo com:
- Cliente: {nome}
- Workflow: ciclo-campanha
- Referência: `.omgsys/core/workflows/ciclo-campanha.yaml`
- Briefing: `.omgsys/clientes/{nome}/onboarding/briefing-final.md`

O @coo irá orquestrar todos os agentes na sequência correta.
Monitorar progresso e reportar cada etapa concluída.

**Regra:** Nada é publicado sem veredicto APROVADO do @qa.
