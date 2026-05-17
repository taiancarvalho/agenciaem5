# /construir — Meta-time CONSTRUÇÃO

> User descreve necessidade em português → @arq + @builder + @reviewer entregam componente production-ready.
> Input humano ≤ 5 min (5–8 perguntas Yes/No/curta).

## Uso

```
/construir "preciso gerar contratos e PDFs por cliente"
/construir "quero um agente que monitore TikTok Ads"
/construir "playbook pra clientes de SaaS B2B"
/construir "skill pra exportar relatório em PowerPoint"
```

## Fluxo

```
@arq Arq 🏛️ — entrevista (≤ 5 min)
  ↓ .em5/construcao/CT-{NNN}/entrevista.md
  ↓
@arq Arq — desenha spec
  ↓ .em5/construcao/CT-{NNN}/spec.md (status: approved)
  ↓
@builder Cunha 🔨 — implementa via Forge templates
  ↓ arquivos criados + build-log.md (status: reviewing)
  ↓
@reviewer Lima 🧪 — valida contra constitution + checks técnicos
  ↓ veredicto: APROVADO | AJUSTES | BLOQUEADO
  ↓ se APROVADO:
@builder Cunha — commit atômico
  ↓
✓ Componente em produção. Teste com: {comando da spec}
```

## Tempo total

- Input humano: **≤ 5 min** (entrevista do Arq)
- Execução do meta-time: 5–20 min (Cunha + Lima)
- Total wall-clock: ~25 min pra componente novo completo

## Limites

- 1 ticket = 1 componente. Necessidades complexas viram múltiplos tickets (CT-1.1, CT-1.2, ...)
- Componente que exige MCP novo (não-Composio) → @arq propõe fallback manual (Art. VI)
- Necessidade que duplica algo existente → @reviewer bloqueia e propõe reuso

## Anti-padrão

- NÃO use `/construir` pra mudar agente existente — use `/forge` ou edição direta
- NÃO use pra fix de bug — use commit normal
- NÃO use pra refator — use plano formal

## Verificação ≤ 5 min

Se entrevista do @arq passa de 5 min → bug de UX → fragmentar em sub-tickets.

## Ciclo Completo Exemplo

```
User: /construir "preciso gerar contratos e PDFs por cliente"

@arq: 🏛️ Arq pronto. Vamos descobrir o que você precisa.
  P1: É agente novo, task pra existente, ou skill?
User: agente novo

  P2: Tipos de contrato — só prestação de serviço ou múltiplos?
User: prestação + NDA + termo de uso

  P3: Variáveis vêm de onde — briefing do cliente?
User: sim, do briefing

  P4: PDF gerado via toolset externo ou template HTML local?
User: template local

  P5: Pode ser bloqueado pelo @qa antes de mandar pro cliente?
User: sim, crítico se cláusula errada

@arq: ✓ Entendido. Vou criar:
  - @legal (Pacto ⚖️) — agente jurídico
  - tasks: gerar-contrato, gerar-pdf, validar-clausulas
  - skill /contrato
  - data: tipos-contrato.yaml, clausulas-padrao.yaml
  - templates: contrato.template.md, pdf.template.html
  - gate-matrix entries: clausula-ausente=critico, formatacao=baixo

Pode prosseguir? [s/N]

User: s

@arq → spec.md aprovada → @builder Cunha
@builder: 🔨 Cunha aqui. Implementando CT-001…
  ✓ .em5/agents/legal.md criado
  ✓ 3 tasks criadas
  ✓ skill /contrato criada
  ✓ 2 data files criados
  ✓ 2 templates criados
  ✓ CLAUDE.md atualizado
  ✓ AGENTS.md atualizado
  ✓ em5-config.yaml atualizado
  → @reviewer Lima

@reviewer: 🧪 Lima validando CT-001…
  ✓ Art. I–XII OK
  ✓ Anti-papel listado (3 itens)
  ✓ model_tier: balanced (coerente)
  ✓ Gate-matrix coverage 100%
  Veredicto: APROVADO ✅

@builder: ✓ Commit "feat(em5): @legal (Pacto) + skill /contrato via /construir CT-001"
@coo: ✓ CT-001 fechado. Teste: /contrato cliente-x prestacao-servico
```

---

*em5 v1.2 — Fase 6 (Meta-time CONSTRUÇÃO)*
