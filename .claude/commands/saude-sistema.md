# Health check completo do OMG.sys

1. Liste todos os clientes em `.omgsys/clientes/` (ignore `_template`)

2. Para cada cliente, verifique a existência de:
   - `onboarding/briefing-final.md` → onboarding completo
   - `estrategia/plano-estrategico.md` → estratégia definida
   - `operacao/log-operacional.md` → log ativo
   Classifique: ativo | em-onboarding | sem-estrategia | incompleto

3. Liste os agentes em `.claude/agents/`
   Verifique se os 8 estão presentes: ceo, coo, cs, strategist, traffic, copywriter, designer, qa

4. Verifique se `omgsys-config.yaml` existe na raiz (sistema configurado?)

5. Monte o relatório:

---
## OMG.sys Health Check — {data de hoje}

### Clientes ({N} total)
| Cliente | Onboarding | Estratégia | Log | Status |
|---------|------------|-----------|-----|--------|
| ...     | ✅/❌       | ✅/❌       | ✅/❌ | ...    |

### Sistema
- Agentes registrados: X/8 {lista dos faltantes se houver}
- Configuração (omgsys-config.yaml): ✅/❌
- Alertas: {problemas encontrados}

### Próximas ações sugeridas
- {lista baseada nos problemas encontrados}
---
