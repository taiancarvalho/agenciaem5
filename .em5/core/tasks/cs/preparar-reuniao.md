# Task: preparar-reuniao
# Agente: cs (Sol)
# Input: log-operacional.md + metricas recentes do cliente
# Output: clientes/{nome}/reunioes/pauta-{data}.md

## Objetivo
Preparar pauta estruturada para reuniao com o cliente, consolidando performance, pendencias e proximos passos.

## Inputs necessarios
1. `clientes/{nome}/operacao/log-operacional.md` — ultimas interacoes e status
2. `clientes/{nome}/relatorios/` — relatorio mais recente disponivel
3. `clientes/{nome}/operacao/proximos-passos.md` — pendencias abertas

## Execucao

### 1. Ler contexto operacional
- Ler log-operacional.md: ultimas 2 semanas de atividades
- Ler relatorio mais recente: metricas principais
- Ler proximos-passos.md: o que estava pendente

### 2. Identificar topicos obrigatorios
- Performance do periodo (o que foi feito, numeros chave)
- Pendencias da agencia (o que ficou para fazer)
- Pendencias do cliente (o que ele precisava entregar)
- Decisoes necessarias (o que precisa de aprovacao)
- Proximos 30 dias (o que esta planejado)

### 3. Gerar pauta
Criar arquivo em: `clientes/{nome}/reunioes/pauta-{YYYY-MM-DD}.md`

```markdown
# Reuniao — {nome-do-cliente} — {data}

**Duracao estimada:** {X} minutos
**Participantes:** {lista}

---

## 1. Performance do Periodo

| Metrica | Meta | Resultado | Status |
|---------|------|-----------|--------|
| {KPI1} | {meta} | {resultado} | ✅/⚠️/❌ |
| {KPI2} | {meta} | {resultado} | ✅/⚠️/❌ |

**Destaques:**
- {insight positivo}
- {ponto de atencao}

model_tier: balanced  # auto-set Fase 12.AAA legacy audit
---

## 2. Pendencias

**Da agencia:**
- [ ] {item pendente 1}
- [ ] {item pendente 2}

**Do cliente:**
- [ ] {item pendente 1}

---

## 3. Decisoes necessarias
- {topico para aprovacao/decisao do cliente}

---

## 4. Proximos 30 dias
- {acao planejada 1}
- {acao planejada 2}

---

## 5. Perguntas do cliente
(espaco para registrar durante a reuniao)
```

## Handoff
- Arquivo salvo em `clientes/{nome}/reunioes/`
- Registrar no log-operacional.md: "Pauta de reuniao gerada para {data}"
- Enviar pauta para cliente antes da reuniao se adequado
