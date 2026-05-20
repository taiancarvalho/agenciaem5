> ⚠️ **ALIAS DEPRECATED** — use \`/saude\`. Este alias será removido em 30 dias (após 2026-06-15).

# /saude-sistema — Health check completo do em5

## O que este comando faz

Verifica a integridade de toda a instalação do em5 e gera um relatório de saúde.

## Instrução

Execute o health check verificando cada item abaixo:

### 1. Estrutura Base
- [ ] `.em5/` existe
- [ ] `.em5/agents/` — 8 agentes presentes (ceo, coo, cs, strategist, traffic, copywriter, designer, qa)
- [ ] `.em5/system/constitution.md` existe
- [ ] `.em5/workflows/` — 6 workflows (onboarding-cliente, ciclo-campanha, iteracao-criativa, google-ads, social-media, lancamento)
- [ ] `.em5/system/data/` — 8 arquivos de dados
- [ ] `.em5/agents/` — 8 pastas de tasks

### 2. Claude Configuration
- [ ] `.claude/CLAUDE.md` existe
- [ ] `.claude/settings.json` com Composio e Context7 configurados
- [ ] `.claude/agents/` — 8 agentes registrados
- [ ] `.claude/commands/` — 10 skills presentes

### 3. Configuração da Agência
- [ ] `em5-config.yaml` existe (se setup foi feito)
- [ ] Composio API Key configurada
- [ ] Pelo menos um cliente em `clientes/`

### 4. Clientes Ativos
Para cada cliente em `clientes/`:
- [ ] log-operacional.md presente
- [ ] Última entrada no log tem menos de 30 dias

### Formato do relatório

```
## em5 Health Check — {data}

### Estrutura Base: ✅ OK / ⚠️ Parcial / ❌ Problemas

{lista de checks com status}

### Problemas encontrados
{lista de itens que precisam de atenção}

### Recomendações
{ações sugeridas para corrigir problemas}
```

Execute verificando arquivo por arquivo e informe o resultado final.
