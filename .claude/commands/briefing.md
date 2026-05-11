# /briefing — Coletar briefing estruturado

**Argumento:** `/briefing $ARGUMENTS` (ex: `/briefing clinica-sao-paulo`)

## O que este comando faz

Aciona @cs para coletar briefing completo e estruturado do cliente,
usando o template padrão de perguntas.

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente.

Verifique se a pasta `.omgsys/clientes/{nome}/` existe.
Se não existir: crie-a primeiro com a estrutura padrão.

Leia `.omgsys/core/tasks/cs/coletar-briefing.md` para o roteiro de perguntas.
Leia `.omgsys/core/templates/briefing/briefing-perguntas.md` para o template.

Acione @cs com:
- Cliente: {nome}
- Task: coletar-briefing
- Template: `.omgsys/core/templates/briefing/briefing-perguntas.md`
- Destino: `.omgsys/clientes/{nome}/onboarding/briefing-respostas.md`

Após coleta:
- @cs gera briefing-final.md em `.omgsys/clientes/{nome}/onboarding/`
- Registrar no log operacional: "Briefing coletado em {data}"
- Próximo passo: `@strategist *analisar-briefing {nome}`
