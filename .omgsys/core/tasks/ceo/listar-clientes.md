---
name: listar-clientes
agent: ceo
description: Listar todos os clientes cadastrados no AgencyOS com resumo de status
inputs:
  - .omgsys/clientes/ (diretorio de clientes)
outputs:
  - lista de clientes com status de cada um
elicit: false
---

# Listar Clientes

## Objetivo

Fornecer visao rapida de todos os clientes no sistema — quantos sao, em que etapa cada um esta, e quando foi a ultima atividade.

---

## Passo a passo

### 1. Listar pastas de clientes

Verificar subdiretorios em `.omgsys/clientes/` (excluindo `_template`).

### 2. Para cada cliente, coletar status

Para cada cliente encontrado:

**Verificar existencia de arquivos chave:**
- `onboarding/briefing-final.md` — onboarding completo?
- `estrategia/plano-estrategico.md` — estrategia definida?
- `setup-tecnico/status.md` — setup tecnico feito?
- `operacao/log-operacional.md` — ha atividade recente?
- Entries no `log-operacional.md` — quando foi a ultima?

**Determinar estagio:**
| Condicao | Estagio |
|----------|---------|
| Pasta existe, sem briefing | ONBOARDING |
| Briefing existe, sem plano | ESTRATEGIA |
| Plano existe, sem campanha ativa | SETUP |
| Campanha ativa no log | ATIVO |
| Sem atividade em 30+ dias | INATIVO |

### 3. Exibir resumo

```markdown
# Clientes AgencyOS — {Data}

| Cliente | Estagio | Ultima Atividade | Observacao |
|---------|---------|-----------------|------------|
| {nome} | {estagio} | {data} | {resumo 1 linha} |

**Total:** {N} clientes
- Ativos: {N}
- Em setup: {N}
- Em estrategia: {N}
- Em onboarding: {N}
- Inativos: {N}
```

### 4. Alertar sobre anomalias

Se detectar problemas:
```
⚠️ Alertas:
- {cliente}: tem briefing mas nao tem plano estrategico ha 7+ dias
- {cliente}: sem atividade operacional ha 30+ dias
- {cliente}: setup tecnico pendente bloqueando execucao
```

## Output esperado

- Lista completa de clientes com estagio e ultima atividade
- Alertas sobre clientes parados ou com pendencias
