# /perfil-cliente — Classificar perfil operacional do cliente

**Argumento:** `/perfil-cliente $ARGUMENTS` (ex: `/perfil-cliente clinica-sao-paulo`)

## O que este comando faz

Classifica cliente em 1 dos 8 perfis operacionais em5 (PN-01 a PN-08). Adapta workflows, KPIs, canais e compliance ao perfil. Roda durante onboarding ANTES do plano estratégico.

## Roteamento (CLAUDE.md Regra Absoluta 1)

Acione **@coo** com prompt:

```
@coo Nexus — operação: classificação de perfil operacional
Cliente: {nome}
Workflow: leitura sequencial cs/perfilar-cliente.md + system/data/perfis-negocio.yaml
Entrega esperada:
  - clientes/{nome}/onboarding/perfil-negocio.md
  - workflows ativos atualizados conforme perfil
Referência:
  - .em5/agents/cs/tasks/perfilar-cliente.md
  - .em5/system/data/perfis-negocio.yaml
```

## O que @coo fará

1. Lê `system/data/perfis-negocio.yaml` (8 perfis disponíveis)
2. Delega @cs com task `perfilar-cliente.md`
3. @cs conduz entrevista 6 perguntas curtas (não questionário)
4. Classifica em 1 PN (ou híbrido)
5. Output `perfil-negocio.md` no workspace do cliente
6. Sugere workflows relevantes ao perfil + descarta irrelevantes

## Output esperado

`clientes/{nome}/onboarding/perfil-negocio.md`:

```markdown
# Perfil Operacional — {Nome Cliente}

**Perfil principal:** PN-0X — {Nome Perfil}
**Híbrido:** (se aplicável) PN-0X + PN-0Y
**Data classificação:** YYYY-MM-DD

## Justificativa
{1-2 parágrafos por que esse perfil — baseado em entrevista}

## Workflows ativos (alta prioridade)
- workflow-1.yaml
- workflow-2.yaml
- ...

## Workflows descartados (irrelevantes pra esse perfil)
- workflow-X.yaml — motivo
- workflow-Y.yaml — motivo

## KPIs primários
- kpi-1
- kpi-2

## Canais primários
- canal-1
- canal-2

## Compliance crítico (se aplicável)
- {LGPD/CFM/OAB/etc}

## Ticket médio alvo
R$ X-Y/mês
```

## Quando rodar

- **Cliente novo:** depois de `/cliente-novo`, antes de `/onboard` (informa todo workflow seguinte)
- **Cliente legado sem perfil:** rodar ad-hoc — re-adapta workflows
- **Mudança escopo cliente:** se cliente pivotou negócio (raro)

## Filosofia em5

> **Entrega antes de estrutura.** Não tenta classificar perfeito de primeira — classifica em 5min, gera primeira entrega valiosa, refina perfil ao longo dos primeiros 30 dias se necessário.

## Relação com outros workflows

| Skill / Workflow | Como integra |
|---|---|
| `/cliente-novo` | Cria workspace + dispara `/perfil-cliente` automático |
| `/onboard` (onboarding-cliente.yaml) | Lê perfil pra adaptar checklist setup técnico |
| `/campanha` | Lê perfil pra escolher canais default |
| Todo workflow novo do roadmap | Verifica se relevante pro perfil cliente antes ativar |
