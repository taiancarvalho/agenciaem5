---
name: consolidar-e-reportar
agent: coo
description: Ao final de um workflow, consolidar os resultados de todos os agentes e reportar ao CEO (Atlas) com resumo executivo
inputs:
  - entregas finais de todos os agentes do workflow
  - nome do cliente
  - nome do workflow executado
outputs:
  - resumo executivo para o CEO
  - log operacional atualizado com conclusão
  - proximos-passos.md atualizado
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: false
---

# Consolidar e Reportar

## Objetivo

Fechar o loop de uma operação: confirmar que tudo foi entregue, registrar o resultado e reportar ao CEO com clareza sobre o que foi feito e o que vem a seguir.

---

## Passo a passo

### 1. Confirmar checklist de conclusão do workflow

Verificar que todas as etapas do workflow foram concluídas:

**Para ciclo-campanha:**
- [ ] Plano estratégico criado e aprovado
- [ ] Copy criada e aprovada pelo QA
- [ ] Criativos produzidos e aprovados pelo QA
- [ ] Campanha publicada pelo Gestor
- [ ] Relatório gerado pelo Gestor
- [ ] Relatório enviado ao cliente pelo CS

**Para onboarding-cliente:**
- [ ] Briefing coletado e finalizado
- [ ] Contrato gerado
- [ ] Pasta do cliente criada
- [ ] Setup técnico iniciado

**Para iteracao-criativa:**
- [ ] Performance analisada
- [ ] Novo ângulo criado
- [ ] Novo criativo produzido
- [ ] QA aprovado
- [ ] Novo criativo publicado

### 2. Montar resumo executivo para o CEO

Formato do relatório para Atlas:

```markdown
## Relatório de Operação — {nome-workflow} | {cliente}

**Duração:** {data início} → {data conclusão}
**Status:** CONCLUÍDO ✅

### O que foi feito
- {lista de entregas principais com localização dos arquivos}

### Resultados
- {métricas ou outputs principais — ex: campanha ativa, relatório enviado}

### Decisões tomadas em campo
- {se houve alguma decisão tática tomada pelo coo — ex: reordenou etapas}

### Alertas / Atenção
- {qualquer coisa que o CEO deve saber — ex: cliente pediu mudança de estratégia, QA teve 1 revisão}

### Próximos passos sugeridos
- {o que naturalmente vem depois — ex: monitorar performance em 7 dias}
```

### 3. Atualizar proximos-passos.md

Substituir as etapas concluídas por:
- Próxima revisão agendada (se aplicável)
- Próxima operação recomendada

```markdown
## Agência

- [ ] Monitorar performance — *monitorar {cliente} — em {data +7 dias}
- [ ] Otimização semanal — *otimizar {cliente} — em {data +7 dias}

## Cliente

- [ ] Acompanhar resultado da campanha
```

### 4. Fechar log operacional

```
| {data} | CONCLUSÃO | Nexus (COO) | Workflow {nome} concluído. Resumo enviado ao CEO. | CONCLUÍDO | {próxima ação} |
```

### 5. Reportar ao CEO

Enviar o resumo executivo para Atlas com indicação clara:
- Operação concluída
- O que fica em espera (se houver)
- Se há alguma decisão estratégica que o CEO precisa tomar agora

## Output esperado

- CEO recebe visão clara do que aconteceu sem precisar ler cada arquivo individual
- Log operacional fechado com data e status
- proximos-passos.md reflete estado real pós-operação
