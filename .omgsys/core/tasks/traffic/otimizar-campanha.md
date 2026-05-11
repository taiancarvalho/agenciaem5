---
name: otimizar-campanha
agent: traffic
description: Analisar performance da janela de 7 dias e tomar decisoes de otimizacao baseadas em dados
inputs:
  - dados de performance dos ultimos 7 dias (plataforma ou usuario)
  - .omgsys/clientes/{nome}/trafego/auditoria.md
  - .omgsys/clientes/{nome}/estrategia/plano-estrategico.md
  - .omgsys/clientes/{nome}/operacao/log-performance-criativa.md
outputs:
  - registro das decisoes no log operacional
  - atualizacao no log de performance criativa
elicit: true
---

# Otimizar Campanha

## Playbook de Referência

**Ler antes de executar:** `.omgsys/playbooks/traffic-meta.md` (seção 2: Otimizar)
**Memória:** ler últimas 3 entradas de `.omgsys/clientes/{nome}/memoria/notas-sessao.md`

---

## Objetivo

Revisar os dados da semana, identificar o que está funcionando e o que não está, e tomar decisões de otimização com critério — não no impulso.

## Regra Crítica

```
Janela mínima de análise: 7 dias.
Nunca otimizar com 1-2 dias de dados.
Decisão sem dado = chute = desperdício de verba.
0 conversões só é motivo para pausar se > 1.000 impressões acumuladas.
```

---

## Passo a passo

### 1. Coletar dados da semana

Puxar via Composio:

```
composio.meta_ads.get_campaign_insights(
  campaign_ids: [...],
  date_preset: "last_7d",
  fields: ["spend", "leads", "cost_per_lead", "ctr", "frequency", "impressions"]
)
```

Ou perguntar ao usuário: investimento total, CPL/CPA por campanha e criativo, anomalias notadas.

### 2. Diagnosticar — CPL/CPA Decision Matrix

**Por campanha:**

| Status | Critério | Ação |
|--------|---------|------|
| ✅ SAUDÁVEL | CPL < meta | Manter. Se estável por 14d: aumentar budget +20% |
| ⚠️ ATENÇÃO | CPL 1x–1.3x meta | Monitorar 3 dias antes de agir |
| 🔴 PROBLEMA | CPL 1.3x–2x meta por 7d+ | Diagnosticar causa-raiz. Testar novo criativo |
| 💠 PAUSAR | CPL > 2x meta por 7d+ OU 0 conv com > 1k impressões | Pausar e abrir diagnosis.md |

**Por criativo:**

| Status | Critério | Ação |
|--------|---------|------|
| ⭐ VENCEDOR | CTR alto + CPL < meta + volume crescendo | Aumentar budget, criar variações |
| ✅ ATIVO | Dentro do esperado | Manter |
| ⚠️ OBSERVAR | CTR caindo ou CPL subindo há 3 dias | Monitorar mais 3 dias |
| ❌ PAUSAR | CTR < 1% e CPL 50%+ acima da meta por 7d | Pausar, registrar motivo |

**Saturação:**
```
Frequência > 2.5 na semana  → Rotacionar criativos — obrigatório
Frequência > 4.0 na semana  → Pausar conjunto 7 dias
```

### 3. Diagnóstico de causa-raiz (antes de pausar)

```
1. Frequência > 3.5?          → Público saturado → trocar conjunto
2. CTR < 1.5%?                → Criativo fraco → trocar creative
3. CTR bom + CPL alto?        → LP com baixa conversão → acionar modo-cro.md
4. Pixel sem eventos?         → Tracking com defeito → escalar @cs
5. < 50 conversões na conta?  → Ainda em aprendizado → aguardar
```

### 4. Tomar e documentar decisões

```markdown
## Decisões de Otimização — {data}

### Campanhas
| Campanha | Diagnóstico | Ação | Motivo |
|----------|-------------|------|--------|

### Criativos
| Criativo | Diagnóstico | Ação | Motivo |
|---------|-------------|------|--------|
```

### 5. Verificar se precisa de novos criativos

Se vencedores estiverem saturando ou não houver variações:
```
⚠️ Solicitar novos criativos: *solicitar-criativos {nome}
```

### 6. Registrar no log e na memória

Atualizar `log-operacional.md` e `log-performance-criativa.md`.
Adicionar entrada em `memoria/notas-sessao.md`.

---

## Em caso de falha

Se não for possível otimizar (sem dados, sem acesso), gerar `diagnosis.md`:

```markdown
**Problema:** {descrição}
**Agente responsável:** @{quem pode resolver}
**Ação corretiva:** {instrução específica}
**Retestar após:** {condição}
```

---

## Handoff

```markdown
## Handoff para @traffic (próxima otimização)
**Arquivos que ele DEVE ler:**
- trafego/log-performance-criativa.md
- memoria/notas-sessao.md (entradas recentes)

**O que foi feito:** {decisões tomadas, IDs pausados, escalados}
**Atenção:** {criativos saturando, CPL evoluindo, próximo checkpoint}

**Próxima otimização:** {data sugerida}
```

## Output esperado

- Decisões documentadas no log operacional
- Log de performance criativa atualizado
- Conta otimizada com base em dados de 7 dias
