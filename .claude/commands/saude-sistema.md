# /saude-sistema — Health check completo do OMG.sys

## O que este comando faz

Verifica a integridade de toda a instalação do OMG.sys e gera um relatório de saúde.

## Instrução

Execute o health check verificando cada item abaixo:

### 1. Estrutura Base
- [ ] `.omgsys/` existe
- [ ] `.omgsys/agents/` — 8 agentes presentes (ceo, coo, cs, strategist, traffic, copywriter, designer, qa)
- [ ] `.omgsys/core/constitution.md` existe
- [ ] `.omgsys/core/workflows/` — 6 workflows (onboarding-cliente, ciclo-campanha, iteracao-criativa, google-ads, social-media, lancamento)
- [ ] `.omgsys/core/data/` — 8 arquivos de dados
- [ ] `.omgsys/core/tasks/` — 8 pastas de tasks

### 2. Claude Configuration
- [ ] `.claude/CLAUDE.md` existe
- [ ] `.claude/settings.json` com Composio e Context7 configurados
- [ ] `.claude/agents/` — 8 agentes registrados
- [ ] `.claude/commands/` — 10 skills presentes

### 3. Configuração da Agência
- [ ] `omgsys-config.yaml` existe (se setup foi feito)
- [ ] Composio API Key configurada
- [ ] Pelo menos um cliente em `.omgsys/clientes/`

### 4. Clientes Ativos
Para cada cliente em `.omgsys/clientes/`:
- [ ] log-operacional.md presente
- [ ] Última entrada no log tem menos de 30 dias

### Formato do relatório

```
## OMG.sys Health Check — {data}

### Estrutura Base: ✅ OK / ⚠️ Parcial / ❌ Problemas

{lista de checks com status}

### Problemas encontrados
{lista de itens que precisam de atenção}

### Recomendações
{ações sugeridas para corrigir problemas}
```

Execute verificando arquivo por arquivo e informe o resultado final.
