# em5 — Mapa Completo e Guia de Validação

> Este documento é o ponto de entrada do sistema. Leia antes de executar qualquer coisa.
> Última atualização: Fase 2 completa — Board + Playbooks + Memória + Diagnosis + Wave Pattern + Learnings

---

## Parte 1 — O que é o em5

em5 é uma agência de marketing operada por agentes de IA especializados, orquestrados via Claude. Cada agente tem uma função fixa, um conjunto de tasks que sabe executar, e playbooks com o método concreto de como fazer.

O sistema existe para que um operador humano consiga gerenciar múltiplos clientes com qualidade de agência, sem contratar equipe — os agentes executam o trabalho operacional.

**O humano faz:** decisões estratégicas, aprovações finais, configuração de infraestrutura, relacionamento com cliente.
**Os agentes fazem:** coleta de briefing, análise, planejamento, copy, design, tráfego, QA, relatórios.

---

## Parte 2 — Os Agentes

| Agente | Nome | Função |
|--------|------|--------|
| @cs | Mia | Customer Success — onboarding, board do cliente, relacionamento |
| @strategist | Vera | Estratégia — análise de briefing, plano estratégico, hipóteses |
| @copywriter | Cal | Copy — anúncios, posts, emails, WhatsApp, scripts |
| @designer | Lux | Design — conceito visual, criativos, UGC via WaveSpeed MCP |
| @traffic | Max | Tráfego pago — Meta Ads e Google Ads via Composio |
| @qa | — | Qualidade — valida entregáveis antes de publicar |
| @coo | — | Operações — orquestra agentes, lê diagnosis, redespacha |
| @ceo | — | Visão — escalado apenas para decisões críticas |

### Como os agentes se comunicam

Não falam diretamente entre si. A comunicação acontece via **arquivos**:
- Um agente termina uma task e deixa o output em `clientes/{nome}/`
- O próximo agente começa lendo esses arquivos
- O `## Handoff` no final de cada task define exatamente quais arquivos o próximo deve ler

---

## Parte 3 — Mapa de Arquivos

### Estrutura completa explicada

```
.em5/
│
├── LEIAME.md                        ← ESTE ARQUIVO — ler primeiro
│
├── playbooks/                       ← COMO fazer (método, Composio, critérios numéricos)
│   ├── traffic-meta.md              → CPL matrix, estrutura de campanha, saturation rules
│   ├── traffic-google.md            → Search/PMax, quando usar cada um, thresholds
│   ├── copywriter-frameworks.md     → 5 ângulos com exemplos bom/ruim por canal
│   ├── designer-instagram.md        → WaveSpeed MCP setup + árvore ângulo→conceito→UGC
│   └── cs-board-cliente.md          → como conduzir o board, tom, red flags
│
├── core/
│   ├── comportamento-agente.md      ← REGRAS DE COMPORTAMENTO — todos os agentes leem
│   │                                  WAL Protocol, ciclo de memória, auto-melhoria
│   │
│   ├── tasks/                       ← O QUE fazer (instrução por task)
│   │   ├── cs/
│   │   │   ├── coletar-board.md     → 10 seções + Composio auto-lookup + scoring 0-100
│   │   │   ├── setup-tecnico.md     → configuração de pixel, acessos, tracking
│   │   │   ├── validar-tracking.md  → verificar se pixel e conversões estão ativos
│   │   │   └── [outras tasks cs]
│   │   ├── strategist/
│   │   │   ├── analisar-briefing.md → lê board → extrai objetivo real, ICP, riscos
│   │   │   ├── criar-plano-estrategico.md → plano completo com KPIs numéricos
│   │   │   └── [outras tasks strategist]
│   │   ├── traffic/
│   │   │   ├── estruturar-campanha.md   → Meta Ads — nova campanha via Composio
│   │   │   ├── auditar-conta.md         → auditoria de conta existente
│   │   │   ├── otimizar-campanha.md     → otimização com CPL decision matrix
│   │   │   └── google-ads/
│   │   │       ├── mapear-keywords.md
│   │   │       ├── estruturar-search.md → Search com RSA e negativas
│   │   │       ├── otimizar-search.md   → search terms, QS, ajuste de lances
│   │   │       └── estruturar-pmax.md   → PMax com critérios de quando usar
│   │   ├── copywriter/
│   │   │   ├── escrever-copy.md         → copy de anúncio com 5 ângulos
│   │   │   └── escrever-post-social.md  → legenda Instagram/Facebook/LinkedIn
│   │   └── designer/
│   │       ├── definir-conceito-visual.md → árvore ângulo→conceito visual
│   │       └── gerar-ugc.md              → UGC via WaveSpeed MCP (Kling/Banana/GPT-image)
│   │
│   └── workflows/
│       └── ciclo-campanha.yaml       ← ORQUESTRAÇÃO — sequência completa de waves
│
├── learnings/                       ← AUTO-MELHORIA — o sistema aprende com o tempo
│   ├── LEARNINGS.md                 → padrões descobertos, o que funciona, promoção a playbook
│   ├── ERRORS.md                    → erros encontrados, causa-raiz, correção aplicada
│   └── FEATURE_REQUESTS.md         → capacidades que faltam, pedidas por agentes ou humano
│
└── agents/                          ← definições de personalidade e instruções base
    └── (arquivos por agente)

clientes/
├── _template/                       ← copiar para novo cliente
│   ├── onboarding/board-cliente.md  → preenchido pelo @cs
│   ├── memoria/notas-sessao.md      → memória entre sessões (WAL Protocol + SESSION-STATE)
│   └── operacao/log-performance-criativa.md → log semanal de criativos
└── {nome-do-cliente}/
    ├── onboarding/
    │   └── board-cliente.md         → fonte da verdade sobre o cliente
    ├── estrategia/
    │   ├── analise-briefing.md      → gerado pelo @strategist
    │   └── plano-estrategico.md     → gerado pelo @strategist
    ├── copy/
    │   ├── anuncios/                → copy de Meta/Google
    │   └── social/                  → captions orgânicas
    ├── design/
    │   ├── criativos/               → arquivos de design e UGC
    │   └── criativos/prompts/       → prompts WaveSpeed salvos por criativo
    ├── trafego/
    │   ├── estrutura-campanhas.md   → documentação da conta
    │   └── keywords-{data}.md       → mapa de keywords Google
    ├── operacao/
    │   └── log-performance-criativa.md → histórico de criativos e decisões
    └── memoria/
        └── notas-sessao.md          → memória contínua + SESSION-STATE ativo

contexto/
├── ugc-system/                      → guia de atores, shots e configurações WaveSpeed
└── avora-skills/                    → skills de referência (copy, design, marketing)
    ├── Conteúdo & Copy/             → referência para @copywriter
    ├── Marketing, Vendas & Publicidade/ → referência para @traffic e @strategist
    ├── Design & Branding/           → referência para @designer
    ├── Direção Criativa/            → referência para @designer
    ├── Operações/                   → referência para @coo
    └── Carreira & Marca Pessoal/    → referência secundária
```

### Relação task → playbook (quem lê o quê)

| Agente | Task principal | Playbook obrigatório |
|--------|---------------|----------------------|
| @cs | coletar-board | cs-board-cliente.md |
| @strategist | analisar-briefing | — (usa o board diretamente) |
| @strategist | criar-plano-estrategico | — (usa análise + board) |
| @traffic | estruturar-campanha | traffic-meta.md |
| @traffic | otimizar-campanha | traffic-meta.md |
| @traffic | estruturar-search | traffic-google.md |
| @traffic | estruturar-pmax | traffic-google.md |
| @copywriter | escrever-copy | copywriter-frameworks.md |
| @copywriter | escrever-post-social | copywriter-frameworks.md |
| @designer | definir-conceito-visual | designer-instagram.md |
| @designer | gerar-ugc | designer-instagram.md |

---

## Parte 4 — Como Iniciar um Novo Cliente

### Passo a passo completo

**1. Criar pasta do cliente**
```
copiar clientes/_template/ → clientes/{nome-do-cliente}/
```

**2. @cs executa: `coletar-board`**
- Conduz as 10 seções com o cliente (consultivo, não questionário)
- Executa buscas Composio após seção 6 (Meta pixel, conta, Google)
- Calcula score de maturidade (0-100)
- Preenche `clientes/{nome}/onboarding/board-cliente.md`
- Resultado do score define o que propor:
  - 80-100 → plano completo (Meta + Google + UGC)
  - 50-79 → 1 canal principal
  - 30-49 → onboarding técnico primeiro
  - < 30 → recomendar produto diferente

**3. @strategist executa: `analisar-briefing` → `criar-plano-estrategico`**
- Lê o board completo
- Identifica objetivo real vs declarado
- Cria plano com ICP, oferta, canais, KPIs numéricos

**4. Wave 2 paralela (simultâneos)**
- @traffic: `auditar-contas` — verifica conta Meta/Google via Composio
- @copywriter: `analisar-icp` — estuda persona e prepara ângulos
- @designer: `ler-branding` — absorve brand book e guia de estilo

**5. Wave 3 de produção**
- @copywriter: escreve copy com ângulo escolhido
- @designer: define conceito visual → produz criativos (WaveSpeed MCP)
- @traffic: estrutura campanha via Composio

**6. Wave 4 de publicação**
- @qa: valida tudo (copy + criativos + configuração)
- @traffic: publica após aprovação

**7. Wave 5 de acompanhamento (semanal)**
- @traffic: otimiza com CPL decision matrix
- @cs: gera e envia relatório ao cliente

---

## Parte 5 — Guia de Validação

### Os 5 documentos mais importantes — ler nesta ordem

**1º — `clientes/{nome}/onboarding/board-cliente.md`**
O que procurar: score de maturidade calculado no final (0-100). Se não tiver, o @cs não terminou a task. Se score < 30, o sistema não deveria ter avançado para campanha.

**2º — `clientes/{nome}/estrategia/plano-estrategico.md`**
O que procurar: campos com valores numéricos concretos — meta em número de leads, CPL/CPA em reais, budget em reais. Se estiver genérico ("aumentar vendas"), o @strategist não fez o trabalho.

**3º — `.em5/playbooks/traffic-meta.md` (ou google.md)**
O que procurar: a CPL Decision Matrix com thresholds numéricos. Se você lê "otimize quando ruim" em vez de "CPL > 2x meta por 7d → pausar", o playbook está incompleto.

**4º — `clientes/{nome}/memoria/notas-sessao.md`**
O que procurar: entradas recentes de sessões anteriores + SESSION-STATE ativo. Se está vazio ou não existe, os agentes estão trabalhando sem memória — cada sessão começa do zero.

**5º — `.em5/core/workflows/ciclo-campanha.yaml`**
O que procurar: as seções `waves:` com `sync: all-must-complete` e `on-failure: gerar-diagnosis`. Se não existirem, o workflow ainda é sequencial e sem loop de QA.

---

### Como simular um ciclo completo — 5 perguntas

**Pergunta 1 — O board está completo?**
Abra `board-cliente.md`. Tem score calculado? Tem dados do Composio (pixel ID, conta Meta)? Tem CPA desejado preenchido?

**Pergunta 2 — O plano é específico?**
Abra `plano-estrategico.md`. Tem "100 leads com CPL até R$35" ou tem "gerar mais leads"? O primeiro é válido. O segundo é inútil para os agentes.

**Pergunta 3 — As tasks têm método?**
Abra qualquer task de `traffic/` ou `copywriter/`. Tem `## Playbook de Referência` no topo? Tem `## Em caso de falha` com template de diagnosis.md? Se sim, a task está completa.

**Pergunta 4 — O workflow tem ondas?**
Abra `ciclo-campanha.yaml`. Tem `wave-2-paralelo` com tasks simultâneas? Tem `on-failure:` com `auto-retry`? Se sim, o sistema age sozinho quando algo falha.

**Pergunta 5 — A memória está sendo usada?**
Após qualquer sessão com cliente, abra `memoria/notas-sessao.md`. Tem entrada da última sessão com SESSION-STATE? Se não, o agente trabalhou mas não registrou — a próxima sessão vai começar do zero.

---

### Checklist rápido — 12 itens

```
□ board-cliente.md tem score 0-100 calculado?
□ plano-estrategico.md tem CPL/CPA meta com valor em reais?
□ ciclo-campanha.yaml tem seção "waves:" com sync points?
□ ciclo-campanha.yaml tem seção "on-failure:" com gerar-diagnosis?
□ Pelo menos 1 playbook tem matriz de decisão com números concretos?
□ Tasks de traffic têm "## Playbook de Referência" no topo?
□ Tasks críticas têm "## Em caso de falha" com template de diagnosis.md?
□ Tasks têm "## Handoff" com lista de arquivos para o próximo agente?
□ clientes/_template/memoria/notas-sessao.md tem SESSION-STATE ativo?
□ playbooks/ tem os 5 arquivos (traffic-meta, traffic-google, copywriter-frameworks, designer-instagram, cs-board-cliente)?
□ .em5/core/comportamento-agente.md existe com WAL Protocol?
□ .em5/learnings/ tem os 3 arquivos (LEARNINGS, ERRORS, FEATURE_REQUESTS)?
```

**10-12 checks:** sistema em 7.5/10 — pronto para primeiro cliente real.
**7-9 checks:** gaps pontuais — identifique qual arquivo está faltando.
**< 7 checks:** revisão dos commits da Fase 2 necessária.

---

### Red flags — sintomas e causas

| Sintoma | Causa provável | Onde corrigir |
|---------|---------------|---------------|
| Agente pergunta o que já foi respondido | `notas-sessao.md` não existe ou não está sendo lido | Verificar instrução no playbook do agente |
| Copy genérica, sem ângulo definido | `analisar-icp` não foi executada \| playbook não referenciado | `tasks/copywriter/escrever-copy.md` |
| Criativo sem conexão com o ângulo da copy | Tabela ângulo→UGC ausente | `playbooks/designer-instagram.md` |
| Campanha sobe sem UTM | Checklist pré-publicação ausente na task | `tasks/traffic/estruturar-campanha.md` |
| QA bloqueia mas ninguém sabe o próximo passo | `Em caso de falha` ausente | Task bloqueada + `ciclo-campanha.yaml` |
| Estratégia muda a cada sessão sem motivo | `notas-sessao.md` vazio | Instruir agente a escrever ao final de cada task |
| PMax ativo com budget < R$150/dia | Critérios de `estruturar-pmax.md` não seguidos | `tasks/traffic/google-ads/estruturar-pmax.md` |
| Score do cliente < 30 mas campanhas rodando | @cs não escalou para @ceo | `tasks/cs/coletar-board.md` seção RED FLAGS |
| Agente repete o mesmo erro em sessões diferentes | ERRORS.md não está sendo lido | `core/comportamento-agente.md` — verificar ciclo de memória |
| Aprendizado importante não vira melhoria de sistema | Promoção para playbook não acontece | LEARNINGS.md — verificar se atingiu 3 ocorrências |

---

## Parte 6 — O que falta para chegar em 9/10

### Status atual: 7.5/10

O sistema executa o fluxo completo. Os agentes têm método. O QA tem loop. A memória entre sessões existe. O sistema aprende com LEARNINGS.md. O @designer tem acesso a WaveSpeed MCP.

### Para chegar em 9.0 — 3 iniciativas

**Iniciativa A — Memory stack real (maior impacto)**
Instalar `claude-mem` completo: SQLite para eventos + Chroma para busca vetorial.
Hoje: agente lê últimas 3 entradas do `notas-sessao.md`.
Com claude-mem: agente busca semanticamente em todo o histórico do cliente.
Requer: ambiente com disco persistente + instalação do stack.

**Iniciativa B — Auto-triggers via n8n**
Hoje: @coo redespacha agentes manualmente após ler diagnosis.md.
Com n8n: quando @cs termina board → n8n dispara @strategist automaticamente.
Requer: n8n rodando + workflows importados + credenciais Composio configuradas.
Referência: repo `taiancarvalho/n8n-backup`.

**Iniciativa C — Skills de marketing integradas**
As pastas `avora-skills/Conteúdo & Copy/` e `avora-skills/Marketing, Vendas & Publicidade/` têm ~85 arquivos não analisados.
Analisar quais são realmente úteis e referenciar nos playbooks onde fazem sentido.
Sem dependência de infraestrutura — pura análise e edição de arquivos.

### Para chegar em 9.5 — em cima dos 9.0

**Feedback loop de criativos:**
O `log-performance-criativa.md` já existe. Falta o @strategist lê-lo antes de criar novo ciclo e ajustar o plano com base nos aprendizados registrados. É comportamento — não requer novo arquivo.

**Relatório automático para o cliente:**
@cs já tem `enviar-relatorio.md`. Integrar com Composio (Gmail/WhatsApp) para que o relatório seja enviado automaticamente todo domingo sem intervenção humana.

**instagram-carousel skill:**
Gerar carrosséis 1080x1350 nativamente via Playwright. Absorver o padrão Hook→Problema→Solução→CTA nos slides do @designer.

---

## Parte 7 — Como ler o sistema por agente

Se quiser auditar um agente específico, leia em ordem:

1. **Definição do agente** — `agents/{agente}.md` (personalidade, regras, ferramentas)
2. **Comportamento base** — `core/comportamento-agente.md` (WAL Protocol, memória, auto-melhoria)
3. **Playbook** — `playbooks/{agente}.md` (método concreto, critérios numéricos)
4. **Tasks** — `core/tasks/{agente}/` (instrução por task)
5. **Handoffs** — seção `## Handoff` em cada task (confirma continuidade)

Se qualquer uma dessas camadas estiver quebrada, o agente vai falhar naquele ponto.

---

*em5 — Fase 2 completa. Board + Playbooks + Memória + Diagnosis + Wave Pattern + Learnings + WaveSpeed MCP.*
*Próxima Fase: claude-mem + n8n auto-triggers + skills integradas.*
