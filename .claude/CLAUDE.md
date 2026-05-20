# em5 — Agência em Cinco minutos

> **Todo processo da agência em ≤ 5 min de input humano.**
> Framework operacional pra gestor solo de agência de marketing digital.
> Configure com `/setup` na primeira vez.

Voce esta no em5. Leia `.em5/system/constitution-index.md` (índice dos 13 artigos)
antes de qualquer acao. Carregue `.em5/system/constitution.md` (versao completa)
APENAS em conflito, escalada ou duvida de interpretacao.
Leia `em5-config.yaml` para conhecer a configuracao desta agencia.

**Slogan dev:** Se passou de 5, refatora.

---

## Filosofia operacional

### 1. Entrega antes de estrutura

Cliente novo: **gera 1ª entrega valiosa em <= 15min** antes de explicar arquitetura/agentes/workflows. Sequência: `/cliente-novo` → `/perfil-cliente` → `/check-cliente` → primeira campanha real.

Não tente entender 84 workflows + 15 agentes antes de gerar valor. Gere valor, depois o sistema te mostra por dentro.

### 2. Perfil operacional adapta tudo

Cada cliente é classificado em 1 dos 8 perfis (`.em5/system/data/perfis-negocio.yaml`): PN-01 (Local) · PN-02 (Profissional liberal) · PN-03 (B2B) · PN-04 (Ecommerce) · PN-05 (Infoprodutor) · PN-06 (Agência) · PN-07 (Saúde) · PN-08 (Jurídico).

Perfil define: workflows ativos · KPIs primários · canais default · compliance crítico · ticket médio alvo.

### 3. Check pré-operacional protege operação

Antes da 1ª campanha real, rodar `/check-cliente` (35 itens — acessos + tracking + branding + financeiro + estratégia + compliance). Score < 80% bloqueia operação até resolver.

---

## Agentes disponíveis

| ID | Fantasy Name | Quando usar |
|----|-------------|-------------|
| @ceo | Atlas 🗺️ | Estrategia da agencia, decisoes de negocio, novo cliente |
| @coo | Nexus 🎯 | Executar workflows completos, orquestrar operacoes |
| @cs | Sol ☀️ | Onboarding, setup tecnico, relatorios ao cliente |
| @strategist | Vera 🧭 | Plano estrategico, analise de briefing, posicionamento |
| @traffic | Pulse 📊 | Campanhas, otimizacao, relatorios de trafego |
| @copywriter | Eco ✍️ | Copy, angulos, adaptacao por canal |
| @designer | Lux 🎨 | Criativos visuais, videos, UGC |
| @qa | Crivo 🔍 | Validacao obrigatoria antes de qualquer publicacao |
| @builder | Cunha 🔨 | Meta-time único — entrevista + implementa + valida componentes novos (era arq + builder + reviewer fundidos) |
| @vendas | Caça 🎯 | Prospect → diagnóstico → proposta → fechamento de cliente |
| @fin | Caixa 💰 | Mensalidades, inadimplência, ROI por cliente, MRR |
| @scout | Espia 🔍 | Inteligência competitiva, scrape concorrência, SWOT, alertas |
| @whats | Onda 📱 | Orquestrador WhatsApp — templates, stop rules, handoff humano |

*Os agentes tambem respondem pelos fantasy names. Exemplo: "@Atlas" funciona igual a "@ceo".*
*Se voce configurou nomes personalizados, eles tambem sao reconhecidos — leia `em5-config.yaml`.*

---

## Ferramentas externas

**Composio MCP é o único gateway externo** (Art. IX da constitution). Toolsets habilitados:
- Meta Ads
- Google Analytics
- Gmail
- Slack
- Google Sheets

Toolsets planejados (Fase 1.3): WhatsApp Business, Google Drive (via Composio).

**Se nao souber como usar uma ferramenta: consulte Context7 antes de executar.**

---

## Skills disponíveis (22 canônicas — classificadas por roteamento)

### Entry conversacional
| Skill | Roteia | Função |
|-------|--------|--------|
| `/pedir "{descrição}"` | @ceo OR @coo (NLP decide) | Fala português livre, sistema identifica skill |

### Operacional (skip @ceo → @coo direto)
| Skill | Receita |
|-------|---------|
| `/auditar` | auditoria-conta |
| `/campanha` | ciclo-campanha |
| `/relatorio` | relatorio-cliente |
| `/iterar` | iteracao-criativa |
| `/dia` | daily-run |
| `/abertura-semana` | abertura-semana |
| `/check-cliente` | check-cliente |

### Estratégico (passa @ceo)
| Skill | Receita |
|-------|---------|
| `/proposta` | prospec-fechamento |
| `/qbr` | qbr-trimestral |
| `/portfolio` | analise-portfolio |

### Híbrido (@ceo decide + @coo executa)
| Skill | Receita |
|-------|---------|
| `/cliente-novo` | (workspace) |
| `/perfil-cliente` | perfilar-cliente |
| `/onboard` | onboarding-cliente |

### Utilitário / Meta
| Skill | Função |
|-------|--------|
| `/ticket {tipo} {cliente}` | Criar ticket manual (debug/ad-hoc) |
| `/setup` | Configurar/reconfigurar sistema (wizard 7 etapas) |
| `/construir` | @builder meta-time único (entrevista + impl + valid) |
| `/status` | Resumo operacional cliente |
| `/saude` | Health check sistema |

### Adapters externos core
| Skill | Adapter |
|-------|---------|
| `/em5-brainstorm` | superpowers:brainstorming |
| `/em5-debug` | superpowers:systematic-debugging |
| `/em5-verify` | superpowers:verification-before-completion |

**Total: 22 skills + 13 agentes + 25 receitas + 22 blocos. Sistema enxuto.**

---

## Fluxo padrão v2.4+ (Ticket Vivo + Receitas + Blocos)

### Operacional (maioria das ops diárias)
```
Você → skill operacional OR /pedir → @coo
  → @coo lê .em5/receitas/{nome}.md (spec da operação)
  → @coo cria historico/{YYMMDD-clienteslug-tipo}/ticket.md (bloco coo-criar-ticket)
  → @coo despacha agentes (passa SÓ path do ticket — Art. IV)
  → cada agente lê seu step no ticket + executa + anota inline (yaml status + observações)
  → @qa valida + escreve veredito no ticket
  → @coo fecha ticket + reporta operador
```

### Estratégico (decisões de negócio)
```
Você → skill estratégica OR /pedir → @ceo
  → @ceo decide (aprovar/recusar/ajustar)
  → se executar: @ceo → @coo (mesmo fluxo operacional acima)
  → se recusar: @ceo registra decisão + motivo
```

### Onde olhar pra acompanhar
- **historico/{id}/ticket.md** — fonte verdade por demanda (não 3 arquivos espalhados)
- **historico/** raiz — lista TODAS demandas agência (pronto pra UI futura)
- **clientes/{nome}/operacao/log-operacional.md** — sumário cronológico cliente (alimentado pelos tickets)

### Novos conceitos
- **Receita** (`.em5/receitas/*.md`): spec da operação (substitui workflow yaml + task md)
- **Bloco** (`.em5/blocos/*.md`): step atômico reusável em 2+ receitas
- **Ticket vivo** (`historico/{id}/ticket.md`): instância executada de receita

Detalhes em `.em5/system/rules/protocolo-ticket-vivo.md` + `skills-classificadas.md`.

---

## Regras absolutas (NÃO violar)

### 1. Main thread NÃO orquestra operações multi-agente

Toda operação que envolve 2+ agentes operacionais (@traffic, @cs, @copywriter,
@designer, @scout, @whats, @qa) DEVE passar por `@ceo → @coo`.

**Proibido:** main thread chamar `Agent(subagent_type=traffic)` ou qualquer
operacional diretamente quando workflow envolve sequência/paralelo de agentes.
Pular @coo viola Constitution Art. II (Autoridade do Agente) e Art. IV
(Contexto Reduzido) — vimos isso na auditoria 4 contas CNA 2026-05-19.

**Exceção:** operação single-agent isolada (ex: "@traffic mostra status conta X")
pode ir direto. Multi-agent ou stateful (auditoria + relatório + QA) → @coo
obrigatório.

Slash commands operacionais (`/auditar`, `/campanha`, `/relatorio`, `/iterar`)
JÁ ROTEAM via @coo — siga o template, não otimize pulando camadas.

### 2. Nada vai ao cliente sem veredicto APROVADO do @qa (Crivo)

QA nao aprova por pressao. BLOQUEADO significa bloqueado.

---

*em5 v1.1 — Agência em Cinco minutos. Configure com `/setup`*
