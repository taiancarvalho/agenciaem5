# /briefing — Coletar briefing estruturado

**Argumento:** `/briefing $ARGUMENTS` (ex: `/briefing clinica-sao-paulo`)

## O que este comando faz

Aciona @cs para coletar briefing completo e estruturado do cliente,
usando o template padrão de perguntas.

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente.

Verifique se a pasta `.em5/clientes/{nome}/` existe.
Se não existir: crie-a primeiro com a estrutura padrão.

Leia `.em5/core/tasks/cs/coletar-briefing.md` para o roteiro de perguntas.
Leia `.em5/core/templates/briefing/briefing-perguntas.md` para o template.

Acione @cs com:
- Cliente: {nome}
- Task: coletar-briefing
- Template: `.em5/core/templates/briefing/briefing-perguntas.md`
- Destino: `.em5/clientes/{nome}/onboarding/briefing-respostas.md`

Após coleta:
- @cs gera briefing-final.md em `.em5/clientes/{nome}/onboarding/`
- Registrar no log operacional: "Briefing coletado em {data}"
- Próximo passo: `@strategist *analisar-briefing {nome}`
