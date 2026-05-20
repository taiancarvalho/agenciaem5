# SOP — {Nome do Processo}

**Versão:** {N.M}
**Data criação:** {YYYY-MM-DD}
**Última revisão:** {YYYY-MM-DD}
**Autor:** {agente OR humano}
**Aprovador final:** @ceo OR @coo

## 1. Propósito (1 frase)

> {Por que esse processo existe + qual problema resolve}

## 2. Quando aplica

**Trigger:** {evento que dispara esse processo}

**Frequência esperada:** {sob demanda / diário / semanal / mensal}

**Quem dispara:** {humano OR agente OR cron}

## 3. Pré-requisitos

- [ ] {requisito 1 — ex: cliente em status ATIVO}
- [ ] {requisito 2 — ex: workflow X concluído antes}
- [ ] {requisito 3 — ex: acesso BM Meta configurado}

## 4. Quem faz o quê (RACI)

| Atividade | Responsável | Aprovador | Consultado | Informado |
|-----------|-------------|-----------|-----------|----------|
| {ativ. 1} | @{agente} | @{agente} | — | @{agente} |
| {ativ. 2} | ... | ... | ... | ... |

## 5. Passo a passo

### Passo 1 — {nome}
- **Quem:** @{agente}
- **O que:** {ação concreta}
- **Como:** {comando/skill/workflow OR ferramenta}
- **Output:** {arquivo gerado OR estado mudado}
- **Tempo médio:** {Xmin}

### Passo 2 — {nome}
- ...

### Passo N — Validação final
- **Quem:** @qa
- **Checklist:** {ver checklist específico}
- **Veredicto:** APROVADO/REVISÃO/BLOQUEADO

## 6. Checklist de qualidade

- [ ] {item 1}
- [ ] {item 2}
- [ ] {item N}

## 7. Outputs esperados

| Artefato | Path padrão |
|----------|-------------|
| {arquivo 1} | `clientes/{nome}/{path}` |
| {arquivo 2} | ... |

## 8. Métricas

- **Tempo total alvo:** {Xh}
- **Taxa primeira aprovação @qa:** {X%}
- **Custo médio operacional:** {R$}

## 9. Anti-padrões

- {anti-padrão 1 + por que evitar}
- {anti-padrão 2}

## 10. Casos extremos + on-failure

| Situação | Ação |
|----------|------|
| {erro 1} | {procedimento} |
| {bloqueio 2} | escalation {@agente} |
| {3+ retries falha} | escalation @coo OR @ceo |

## 11. Compliance + governance

- **Constitution Art. aplicáveis:** {lista}
- **Regras Absolutas tocadas:** {lista}
- **Compliance específico (LGPD/CFM/OAB):** {se aplicável}

## 12. Versionamento

| Versão | Data | Autor | Mudança |
|--------|------|-------|---------|
| 1.0 | {data} | {autor} | Criação inicial |
| 1.1 | {data} | {autor} | {mudança} |

## 13. Referências

- Workflow yaml: `.em5/workflows/{nome}.yaml`
- Tasks relacionadas: `.em5/agents/{agente}/tasks/{nome}.md`
- Playbook: `.em5/agents/{agente}/playbook.md`

---

**Arquivamento:** `.em5/system/learnings/sops/{nome-processo}.md`
**Skill `/em5-call-para-sop`** automatiza geração baseada em transcrição call.
