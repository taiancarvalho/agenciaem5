# Skills Classificadas — Operacional / Estratégico / Híbrido

> Regra estrutural sistema em5 v2.4+. Toda skill tem **classificação** que determina rota.

## Princípio

Não toda demanda precisa passar por @ceo. Maioria das ops diárias (auditar, relatar, iterar) são **operacionais puras** — vão direto pro @coo, economizando 1 hop dispatch + tokens.

@ceo entra só quando há **decisão real de negócio**.

## 3 classificações

### Operacional (pula @ceo)

Ops recorrentes sem decisão estratégica. Direto pra @coo.

| Skill | Receita | Quando rodar |
|-------|---------|--------------|
| `/auditar` | auditoria-conta | Diagnóstico conta ads |
| `/campanha` | ciclo-campanha | Criar campanha nova |
| `/relatorio` | relatorio-cliente | Relatório mensal/semanal |
| `/iterar` | iteracao-criativa | Iterar criativos baixa performance |
| `/dia` | daily-run | Snapshot diário todas contas |
| `/abertura-semana` | abertura-semana | Ritual segunda 30min |
| `/check` | check-cliente | Pré-operacional 35 itens |

### Estratégico (passa @ceo)

Decisões de negócio. @ceo julga, pode delegar @coo executar.

| Skill | Receita | Quando rodar |
|-------|---------|--------------|
| `/proposta` | prospec-fechamento | Aprovar proposta cliente novo |
| `/qbr` | qbr-trimestral | QBR trimestre + decisões |
| `/portfolio` | review-portfolio | Saúde portfolio mensal |
| `/decisao` | decisao-estrategica | Estruturar decisão complexa |

### Híbrido (@ceo decide se delega @coo)

Mistos — @ceo avalia se vale + delega operação.

| Skill | Receita | Por quê |
|-------|---------|---------|
| `/cliente-novo` | onboarding-cliente | @ceo decide se aceita + @coo executa onboarding |
| `/lancamento` | lancamento | @ceo aprova plano + @coo executa 3 fases |
| `/perfil-cliente` | perfilar-cliente | @ceo confirma vertical + @coo executa entrevista |
| `/qbr` (com renovação) | qbr-trimestral | @ceo decide renovação + @coo executa apresentação |

## Implementação na skill

Toda skill `.claude/commands/{nome}.md` declara classificação:

```markdown
# /auditar — Auditar conta de anúncios

**Classificação:** operacional
**Roteia direto:** @coo
**Receita:** .em5/receitas/auditoria-conta.md
```

OR estratégico:

```markdown
# /proposta — Aprovar proposta cliente novo

**Classificação:** estrategico
**Roteia direto:** @ceo
**Receita:** .em5/receitas/prospec-fechamento.md
```

OR híbrido:

```markdown
# /cliente-novo — Workspace cliente novo

**Classificação:** hibrido
**Roteia:** @ceo (decisão aceitar) → se sim, @coo executa
**Receita:** .em5/receitas/onboarding-cliente.md
```

## Skill `/pedir` conversacional

Pra operador não decorar 15 comandos. Fala português, @director decide skill.

```bash
/pedir "preciso auditar CNA Jundiaí"
# → identifica /auditar (operacional) → @coo

/pedir "tô pensando em aceitar cliente novo"
# → identifica /proposta (estratégico) → @ceo

/pedir "lança o curso do João dia 15"
# → identifica /lancamento (híbrido) → @ceo decide → @coo executa
```

`/pedir` é fallback genérico. Se operador sabe skill direto, usar acelera (skip parse).

## Economia (vs antes)

| Cenário | Hops antes | Hops agora |
|---------|------------|------------|
| `/auditar` | user → main → @ceo → @coo → @traffic = 4 | user → main → @coo → @traffic = 3 |
| `/relatorio` | 4 | 3 |
| `/iterar` | 4 | 3 |
| `/proposta` | 4 | 4 (mantém — estratégica) |
| `/lancamento` | 4 | 4 (mantém — híbrida) |

Op operacional pura economiza 1 hop = ~5-15s latency + ~5-10k tokens boot @ceo.

Pra agência 15 clientes × 5 ops/dia = 75 ops/dia × 80% operacionais = 60 ops × economia = **300-900s latency/dia + 300-600k tokens/dia salvos**.

## Anti-padrões

- ❌ Skill operacional pulando ticket vivo
- ❌ Skill estratégica indo direto @coo sem passar @ceo
- ❌ Operador usando skill errada (`/auditar` pra decisão estratégica)
- ❌ `/pedir` sem texto descritivo

## Relação Constitution

- **Regra Absoluta 1 (CLAUDE.md):** main thread não orquestra multi-agente. Skills classificadas reforçam — rota explícita.
- **Art. II (Autoridade Agente):** @ceo só nas decisões. @coo nas operações. Sem overlap.
- **Art. XII (em Cinco Minutos):** classificação reduz fricção UX.
