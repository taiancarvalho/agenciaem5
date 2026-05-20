# Índice de Receitas em5 v2.4

> Source-of-truth de todas operações. **25 receitas críticas validadas.**
> Antes: 83 workflows + 98 tasks (~80% YAGNI). Agora: enxuto, só essencial.

**Última atualização:** 2026-05-20
**Versão:** v2.4

## Categorias

### Operacionais diárias (7)
| Receita | Skill | Classificação |
|---------|-------|---------------|
| `auditoria-conta.md` | `/auditar` | operacional |
| `ciclo-campanha.md` | `/campanha` | operacional |
| `relatorio-cliente.md` | `/relatorio` | operacional |
| `iteracao-criativa.md` | `/iterar` | operacional |
| `daily-run.md` | `/dia` | operacional |
| `abertura-semana.md` | `/abertura-semana` | híbrido |
| `check-cliente.md` | `/check-cliente` | operacional |

### Cliente lifecycle (5)
| Receita | Skill | Classificação |
|---------|-------|---------------|
| `onboarding-cliente.md` | `/onboard` | híbrido |
| `perfilar-cliente.md` | `/perfil-cliente` | híbrido |
| `qbr-trimestral.md` | `/qbr` | híbrido |
| `churn-prevention.md` | (trigger sinais) | estratégico |
| `prospec-fechamento.md` | `/proposta` | estratégico |

### Conteúdo (4)
| Receita | Skill |
|---------|-------|
| `carrossel-ig.md` | (calendário) |
| `reels-ig.md` | (calendário) |
| `blog-seo.md` | (calendário) |
| `newsletter.md` | (cron semanal) |

### Financeiro / Crisis (4)
| Receita | Skill |
|---------|-------|
| `cobranca-mensal.md` | (cron dia 1) |
| `cobranca-falhou.md` | (webhook Asaas) |
| `conta-suspensa-meta.md` | (trigger crisis) |
| `pixel-quebrado.md` | (trigger daily-run) |

### Manutenção / Estratégico (3)
| Receita | Skill |
|---------|-------|
| `pixel-event-validation.md` | (cron mensal) |
| `inteligencia-semanal.md` | (cron semanal) |
| `setup-pixel-tracking.md` | (parte onboarding) |

### Lançamento + Portfólio (2)
| Receita | Skill |
|---------|-------|
| `lancamento.md` | `/lancamento` (proposto) |
| `analise-portfolio.md` | `/portfolio` |

## Convenção

Toda receita tem frontmatter YAML padrão:
- `nome` · `skill` · `tipo` · `classificacao_skill` · `agente_orquestrador` · `agente_responsavel_entrega` · `tempo_medio` · `qa_gate` · `versao`

Body markdown estruturado: quando usar / inputs / steps / outputs / anti-padrões / métricas / Composio MCP.

## Princípios

1. **Quando criar receita nova?** Quando demanda real recorrente surge (não em projeção)
2. **Step usado em 2+ receitas?** Vira bloco (`.em5/blocos/`)
3. **Receita similar já existe?** Consultar este índice ANTES de criar
4. **Receita obsoleta?** Marcar `versao: deprecated` + data + motivo (preserva histórico git)

## Criar receita nova

Use `/construir` → @builder modo entrevista (5min) → spec → impl → validação.

Spec sai em `.em5/infra/forge/{ticket}/spec.md`, receita final em `.em5/receitas/{nome}.md`.
