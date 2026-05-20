# /onboarding — Iniciar onboarding de cliente

**Argumento:** `/onboarding $ARGUMENTS` (ex: `/onboarding clinica-sao-paulo`)

## O que este comando faz

Aciona o @cs para executar o workflow completo de onboarding do cliente.

Lê `.em5/workflows/onboarding-cliente.yaml` para conhecer a sequência.

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente.

Verifique se a pasta `clientes/{nome}/` existe.
Se não existir: sugira rodar `/novo-cliente {nome}` primeiro.

Ative o @cs e passe o contexto:
- Nome do cliente
- Etapa atual (início do onboarding)
- Referência ao workflow: `.em5/workflows/onboarding-cliente.yaml`

O @cs irá:
1. Iniciar coleta de briefing
2. Organizar briefing no formato padrão
3. Gerar briefing-final.md
4. Iniciar setup técnico (acessos, pixel, tracking)
5. Fazer handoff para @strategist quando briefing estiver completo
