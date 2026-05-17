---
name: monitorar-performance
agent: traffic
description: Monitorar diariamente as campanhas para detectar e evitar desvios graves de performance e desperdicio de verba
inputs:
  - .em5/clientes/{nome}/trafego/campanhas-ativas.md
  - acesso a conta de anuncios
  - .em5/clientes/{nome}/estrategia/plano-estrategico.md (KPIs de referencia)
outputs:
  - nota de monitoramento no log-operacional.md ou alerta de acao
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: false
---

# Monitorar Performance

## Objetivo

Verificacao diaria rapida para proteger a verba. Nao e hora de reestruturar — e hora de detectar se algo esta muito fora do padrao e agir antes que o desperdicio cresca.

## Regra

```
Monitoramento diario = proteger verba, nao otimizar.
Se algo esta gastando muito acima do CAC aceitavel, pause.
Nao decida com base em um dia. Decida com base em tendencia.
```

---

## Passo a passo

### 1. Verificar metricas do dia

Na conta de anuncios, olhar rapidamente (5-10 min):

| Métrica | O que verificar |
|---------|----------------|
| **Gasto diario** | Alguem gastou muito acima do esperado? |
| **CPL / CPA** | Esta dentro da media? Acima de 2x o CAC desejado? |
| **CTR** | Caiu bruscamente (< 0.5%)? |
| **CPM** | Subiu drasticamente? |
| **Conversoes** | Zeraram nas ultimas 24h? |

### 2. Classificar situacao

| Situacao | Acao |
|----------|------|
| **Normal** | Nada a fazer. Registrar "OK" no log. |
| **Atencao** | CPL/CPA 1.5x acima da media. Observar no proximo dia. |
| **Alerta** | CPL/CPA 2x+ acima, gasto acelerado. **Pausar imediatamente.** |
| **Positivo** | Performance acima da media. Registrar e considerar escalar. |

### 3. Agir se necessario

Se **Alerta**:
1. Pausar anuncio/conjunto com problema
2. Registrar no `log-operacional.md`:
   ```
   | Data | Origem | Destino | Tipo | Acao | Status |
   | {data} | Gestor de Trafego | Log | Alerta | Pausado anuncio X — CPL R${X} acima do aceitavel | Em observacao |
   ```

### 4. Registrar monitoramento

Manter nota curta de monitoramento:

```markdown
## Monitoramento — {data}
- Status geral: OK / Atencao / Alerta
- Gasto acumulado mes: R$ X.XXX
- CPL medio do dia: R$ X,XX
- Acoes tomadas: {nenhuma / pausou anuncio X / ajustou verba Y}
- Observacoes: {notas}
```

### 5. Notificar se relevante

Se houver acao tomada (pausa, ajuste significativo), informar CS via `log-operacional.md` para transparencia com cliente.

---

## Output esperado

- Registro de monitoramento no log
- Se alerta: anuncio pausado e CS notificado
- Pronto para: `*otimizar-campanha {nome}` (na otimizacao semanal)
