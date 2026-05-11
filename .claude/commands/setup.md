# OMG.sys — Setup Inicial do Sistema

Execute o setup do OMG.sys. Se `$ARGUMENTS` estiver vazio, inicie o processo interativo.

Leia `.omgsys/setup/system-onboarding.md` e execute o wizard de configuração passo a passo.

O wizard vai coletar:
1. Nome da agência e nome do dono
2. Serviços oferecidos e canais operados
3. Nomes fantasia para cada agente (ou confirmar defaults)
4. Composio API Key e quais integrações ativar

Ao final, gerará:
- `omgsys-config.yaml` na raiz do projeto
- `.claude/CLAUDE.md` personalizado com os dados coletados
- Confirmação de que todos os agentes estão registrados

Após o setup:
"Execute `@ceo` para uma visão geral da sua agência recém-configurada."
