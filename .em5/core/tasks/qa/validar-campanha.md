---
name: validar-campanha
agent: qa
description: Executar checklist completo de validação antes de subir qualquer campanha ao ar
inputs:
  - clientes/{nome}/estrategia/plano-estrategico.md
  - clientes/{nome}/copy/ (copies aprovadas)
  - clientes/{nome}/design/ (criativos aprovados)
  - clientes/{nome}/setup-tecnico/status.md
  - estrutura de campanha descrita pelo Gestor de Tráfego
outputs:
  - veredicto formal: APROVADO / APROVADO_COM_RESSALVA / REVISÃO / BLOQUEADO
  - registro no log operacional
  - auditoria em .em5/learnings/{ano-mes}/qa-* quando aplicável
elicit: true
model_tier: frontier  # validação final = Opus sempre
gate_matrix: .em5/core/data/gate-matrix.yaml
---

# Validar Campanha (Severity-Based — em5 v1.1)

## Objetivo

Ser a última barreira entre o rascunho e o resultado. Verificar que copy, criativo, estrutura técnica e alinhamento estratégico estão corretos antes de qualquer publicação.

## Sistema de Severidade (Fase 3)

Carrega `.em5/core/data/gate-matrix.yaml` pra classificar cada issue:

| Severidade | Ação | Override |
|------------|------|----------|
| 🔴 `crítico` | **Bloqueia absoluto** | **NUNCA** |
| 🟠 `alto` | Bloqueia | Role específica (ver gate-matrix) |
| 🟡 `médio` | Revisão solicitada | Auto-fix pelo agente original |
| 🟢 `baixo` | Aprovado com ressalva | Publica + log em learnings |

## Verdictos possíveis

| Verdict | Quando | Ação |
|---------|--------|------|
| **APROVADO** ✅ | Zero issues `medio`+ | Publica imediatamente |
| **APROVADO_COM_RESSALVA** ⚠️ | Só issues `baixo` | Publica + log em `.em5/learnings/{ano-mes}/qa-overrides.md` |
| **REVISÃO** 🔄 | Issues `medio` (auto_fix=true) | Volta pro agente original |
| **BLOQUEADO** 🚫 | Issues `alto` ou `critico` | Bloqueia. `alto` overridável via `/override` |

## Regra Crítica (mantida)

```
BLOQUEADO com severity=critico = NUNCA tem override.
Pixel ausente, copy sem CTA, promessa irreal, formulário quebrado: BLOQUEIO ABSOLUTO.
QA não aprova por pressão de prazo.
```

---

## Passo a passo

### 1. Coletar o que precisa ser validado

Perguntar ao usuário:

```
O que precisa ser validado hoje?
1. Copy (anúncio, LP, WhatsApp, e-mail)
2. Criativo visual (imagem ou vídeo)
3. Estrutura de campanha completa (nome, objetivo, público, budget, criativos)
4. Landing page
5. Tudo do lançamento (copy + criativo + campanha + LP)
```

### 2. Executar checklist por item

#### Checklist de Copy

```
OBRIGATÓRIOS:
[ ] Coerência com a estratégia (plano-estrategico.md confirma o ângulo)
[ ] ICP identificável — dor ou desejo da persona aparecem claramente
[ ] Hook presente e capaz de parar o scroll
[ ] Promessa realista (sem exagero, sem promessa de resultado garantido ilegal)
[ ] CTA presente, claro e específico
[ ] Sem erros ortográficos ou gramaticais graves
[ ] Tom adequado ao posicionamento do cliente

DESEJÁVEIS:
[ ] Prova social ou dado concreto presente
[ ] Urgência ou escassez quando aplicável
[ ] Adaptação correta ao canal de destino
```

#### Checklist de Criativo Visual

```
OBRIGATÓRIOS:
[ ] Logo do cliente presente (quando obrigatório pelo contexto)
[ ] Cores dentro da paleta de branding
[ ] Texto na imagem legível (contraste suficiente)
[ ] CTA visível e em destaque
[ ] Formato correto para o canal (proporção, resolução mínima)
[ ] Coerência visual com a copy associada
[ ] Sem elementos que violem políticas de plataforma
  (sem antes/depois para saúde, sem promessas financeiras explícitas, etc.)

DESEJÁVEIS:
[ ] Hierarquia visual clara (olho sabe onde ir primeiro)
[ ] Conceito visual alinhado com o ângulo da copy
[ ] ID de versionamento registrado
```

#### Checklist de Estrutura de Campanha

```
OBRIGATÓRIOS:
[ ] Nomenclatura correta: [CLIENTE]_[OBJETIVO]_[CANAL]_[TIPO]_[ID]
[ ] Pixel instalado e ativo no destino
[ ] Objetivo da campanha na plataforma alinhado com objetivo do plano
[ ] Público-alvo configurado conforme plano estratégico
[ ] Budget definido e dentro do aprovado
[ ] URL de destino funcionando (clicar e testar)
[ ] Ao menos 1 criativo aprovado associado à campanha

DESEJÁVEIS:
[ ] Exclusão de públicos já convertidos (quando aplicável)
[ ] Mínimo de 2 variações de criativo para teste
[ ] Período de aprendizado considerado no budget inicial
```

#### Checklist de Landing Page

```
OBRIGATÓRIOS:
[ ] Headline da LP alinha com o hook do anúncio (message match)
[ ] CTA visível acima da dobra
[ ] Formulário ou WhatsApp funcionando (testar envio)
[ ] Pixel disparando evento de conversão na página de obrigado
[ ] Sem links quebrados
[ ] Carregamento aceitável (estimar pelo tamanho da página)

DESEJÁVEIS:
[ ] Visualização mobile correta (responsiva)
[ ] Prova social visível
[ ] FAQ com principais objeções respondidas
```

### 3. Emitir veredicto formal

Após executar o checklist, emitir:

```markdown
## Veredicto QA — {Nome do Cliente} — {Data}

**Item validado:** {copy CR-{id} / criativo CR-{id} / campanha CP-{id} / landing page}
**Auditado por:** Crivo (QA de Campanha)

### Resultado

**VEREDICTO: APROVADO / REVISÃO / BLOQUEADO**

{Se APROVADO:}
✅ Todos os critérios obrigatórios foram atendidos. Liberado para publicação.

{Se REVISÃO:}
⚠️ Itens a corrigir antes da publicação:
- [ ] {item específico 1 — o que está errado e como corrigir}
- [ ] {item específico 2}

Itens não-críticos (podem ser corrigidos após publicação):
- {item opcional}

{Se BLOQUEADO:}
🚫 PUBLICAÇÃO PROIBIDA. Problema crítico identificado:
- {problema crítico 1 — ex: pixel sem evento de conversão}
- {problema crítico 2}

Escalada necessária: {Estrategista / CS / Gestor de Tráfego / Agency Master}
```

### 4. Registrar no log operacional

```markdown
| {data} | QA | Crivo | Validação: {item}. Veredicto: {APROVADO/REVISÃO/BLOQUEADO}. {resumo em 1 linha} | CONCLUÍDO | {próxima ação} |
```

## Output esperado

- Veredicto formal emitido com justificativa
- Log operacional registrado
- Agente responsável notificado sobre resultado
