---
nome: qa-validar-relatorio
agente: qa
tempo_medio: 10-15min
composio_mcp: []
versao: 1.0
usado_em: [auditoria-conta, relatorio-cliente, qbr-trimestral, lancamento, onboarding-cliente, setup-pixel-tracking]
---

# Bloco: QA Validar Relatório

## O que faz
Veredito formal relatório cliente-facing.

## Inputs
- relatório markdown + HTML
- plano-estrategico (checar coerência metas)
- checklist específico

## Execução
Checklist:
- [ ] Coerência md ↔ HTML (sem divergência numérica)
- [ ] Sem residuo placeholder `{{...}}` (BLOQUEIO automático)
- [ ] Gráficos SVG têm pontos (não polyline vazia)
- [ ] Tabelas com >= 1 linha OR marcada "não aplicável"
- [ ] Sem fonte fabricada (Art. VI)
- [ ] Cores branding aplicadas
- [ ] Mobile-readable

## Output
- Veredito + lista ajustes
- Anotação ticket

## Anti-padrões
- ❌ Aprovar com placeholder esquecido
- ❌ Aprovar dado fabricado
