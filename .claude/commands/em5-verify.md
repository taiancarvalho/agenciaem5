# /em5-verify — Self-check estruturado antes de marcar task done

**Argumento:** `/em5-verify $ARGUMENTS` (ex: `/em5-verify cna-vila-mariana CR-001-v1`)

## Por que existe

Audit de sessão real mostrou: **22% dos tokens consumidos foram em retrabalho** porque
agentes marcaram task done sem auto-checar. @qa Crivo pegou erros mecânicos que o
próprio agente deveria ter visto.

Esta skill é **adapter** da `superpowers:verification-before-completion` aplicada ao em5.
Roda **antes** do agente declarar entrega. Garante que aspectos verificáveis estejam OK
antes de soltar pro @qa subjetivo.

Complementa `/lint-pre-qa` (lint mecânico de copy/criativo) — esta é mais geral: cobre
qualquer artefato produzido por qualquer agente.

## Diferença vs `/lint-pre-qa`

| Skill | Escopo | Quando |
|---|---|---|
| `/lint-pre-qa` | Copy + criativo + campanha + LP | Específico — char count, nomenclatura, palavras proibidas |
| `/em5-verify` | Qualquer entregável do agente | Genérico — self-check completo antes de "task done" |

Os dois se complementam. `/lint-pre-qa` é mais barato e roda primeiro. `/em5-verify`
captura tudo que lint mecânico não pega (coerência interna, completude, premissas).

## Argumentos

```
/em5-verify {cliente} {artefato}
```

- `cliente` — slug do cliente
- `artefato` — caminho relativo ou ID (ex: `copy/CR-001-v1.md`, `relatorios/relatorio-2026-05-18.html`, `estrategia/plano-estrategico.md`)

## Instrução

Se `$ARGUMENTS` estiver incompleto, pergunte cliente + artefato.

### Passo 1 — Identificar tipo de artefato + agente dono

| Padrão de path | Tipo | Agente dono |
|---|---|---|
| `copy/CR-*` | Copy | @copywriter Eco |
| `design/CR-*` | Criativo | @designer Lux |
| `estrategia/*` | Plano estratégico | @strategist Vera |
| `trafego/auditoria-*` | Auditoria | @traffic Pulse |
| `trafego/estrutura-campanhas.md` | Estrutura campanha | @traffic Pulse |
| `relatorios/*` | Relatório | @traffic + @cs |
| `onboarding/*` | Onboarding | @cs Sol |
| `memoria/brainstorm-*` | Brainstorm | (qualquer) |
| `setup-tecnico/*` | Setup técnico | @cs + @traffic |

### Passo 2 — Invocar skill upstream

Invoque `superpowers:verification-before-completion` passando contexto:
- Artefato em questão
- Tipo
- Agente dono
- Critérios específicos do tipo (ver Passo 3)

### Passo 3 — Checklist por tipo (executar como verificação)

**Copy (`copy/CR-*`)**:
- [ ] CTA presente e específico
- [ ] Tom alinhado com `branding/cores.yaml` + `briefing-final.md`
- [ ] Char count dentro dos limites por canal (também coberto por `/lint-pre-qa`)
- [ ] Ângulo declarado e coerente com `analise-icp.md`
- [ ] ID versionado (`CR-XXX-vN`)
- [ ] Registrado em `log-performance-criativa.md`
- [ ] Sem palavra proibida (lint mecânico)

**Criativo (`design/CR-*`)**:
- [ ] Arquivo existe no caminho declarado
- [ ] Nome do arquivo = nome no log (sem swap CR-001 ↔ CR-003)
- [ ] Aspect ratio coerente com canal pretendido
- [ ] Branding aplicado (cores, fontes)
- [ ] Copy associada existe e está APROVADA pelo @qa
- [ ] Sem content policy violation óbvia (crianças + marcas, etc)

**Plano estratégico (`estrategia/*`)**:
- [ ] ICP definido
- [ ] Oferta principal declarada
- [ ] Hipóteses ranqueadas explicitamente
- [ ] Canais escolhidos com justificativa
- [ ] Budget mensal estimado
- [ ] Funil mapeado ponta a ponta
- [ ] Próximos passos acionáveis

**Auditoria de conta (`trafego/auditoria-*`)**:
- [ ] Período declarado
- [ ] Account ID Composio declarado
- [ ] Insights por campanha extraídos via Composio (não inventados)
- [ ] Top achados ranqueados por impacto financeiro
- [ ] Recomendações acionáveis (não vagas)

**Estrutura de campanha (`trafego/estrutura-campanhas.md`)**:
- [ ] Nomenclatura padrão `[CLIENTE]_[OBJETIVO]_[CANAL]_[TIPO]_[ID]`
- [ ] Pixel ID declarado
- [ ] Budget diário > 0
- [ ] URL com UTMs
- [ ] Ao menos 1 criativo APROVADO associado
- [ ] Objetivo coerente com plano estratégico

**Relatório (`relatorios/*`)**:
- [ ] Período declarado
- [ ] Métricas confirmadas via Composio (sem fabricação)
- [ ] Variação vs período anterior calculada
- [ ] Próximos passos acionáveis
- [ ] HTML sem placeholder `{{...}}` residual
- [ ] Coerência markdown ↔ HTML (mesmo número em ambos)

**Onboarding (`onboarding/*`)**:
- [ ] Campos obrigatórios preenchidos (nome, contato, CNPJ, oferta, ICP)
- [ ] Setup técnico mapeado (pixel, BM, acessos)
- [ ] Próximos passos acionáveis pra @strategist

**Brainstorm (`memoria/brainstorm-*`)**:
- [ ] Status declarado (EXPLORATÓRIO | DECIDIDO | DESCARTADO)
- [ ] Alternativas listadas (3+)
- [ ] Decisão tem justificativa explícita
- [ ] Próximos passos atribuídos a agente

### Passo 4 — Salvar resultado

Salvar em:
```
.em5/clientes/{cliente}/operacao/verify-{YYYY-MM-DD}-{artefato_slug}.md
```

Formato:
```markdown
# Self-verification — {artefato}

**Data:** {YYYY-MM-DD}
**Agente dono:** {agente}
**Tipo:** {tipo}
**Veredicto:** ✅ PRONTO PARA @qa | ⚠️ CORRIGIR ANTES | 🚫 FALTA INFORMAÇÃO

## Checklist executado
- [x] {item OK}
- [ ] {item FALTANDO} → ação: {o quê fazer}

## Premissas verificadas
- {premissa 1 confirmada com dado real}
- {premissa 2 PENDENTE — depende de}

## Próximo passo
{
  Se PRONTO: "Encaminhar pro @qa Crivo via *validar-{tipo}"
  Se CORRIGIR: "Voltar pro agente dono ({agente}) com lista acima"
  Se FALTA INFO: "Pedir ao user/cliente: {o que falta}"
}
```

### Passo 5 — Decisão de fluxo

- **PRONTO** → encaminha pro `@qa` (ou pro próximo agente do workflow)
- **CORRIGIR** → devolve pro agente dono. **NÃO acione @qa ainda** (economiza tokens dele)
- **FALTA INFO** → escala pro user com pergunta específica

## Integração com fluxo padrão

```
Agente cria artefato
    ↓
/lint-pre-qa (se aplicável — copy/criativo/campanha)
    ↓
/em5-verify (self-check completo)
    ↓
🚫 CORRIGIR → devolve pro autor
✅ PRONTO ou ⚠️ AVISOS → @qa entra
    ↓
@qa valida subjetivo (gancho, oferta, coerência estratégica)
```

## Não faz

- Não substitui @qa Crivo (Art. VIII permanece — gate final é dele)
- Não corrige automaticamente — só reporta
- Não pega aspectos puramente subjetivos (gancho fraco, oferta confusa) — papel do @qa

## Anti-padrão

Não rodar `/em5-verify` como "carimbo" sem executar checklist real. Se agente passar
verify sem verificar dado, @qa vai pegar mesmo assim e o token gasto duplica.
