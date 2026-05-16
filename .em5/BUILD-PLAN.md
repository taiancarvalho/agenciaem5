# agenciaem5 — Plano de Construção e Continuidade

> Este documento existe para garantir que qualquer agente possa retomar a construção do agenciaem5 de onde parou, com contexto completo sobre o que foi feito, o que falta e como fazer.

---

## O que é o agenciaem5

Framework operacional para agências de marketing digital — **NÃO é SaaS**.

**Produto distribuído via npm:** `npx em5-core install`

Inspirado no padrão AIOX (`.em5/agents/aiox-master.md`), mas voltado para operar uma agência, não desenvolver software. O instalador replica automaticamente agentes, tasks, templates, workflows, checklists e toda a estrutura da agência no projeto do usuário.

**Princípio central:** `AGENTE = PAPEL, TASK = EXECUÇÃO`

**Filesystem é a fonte da verdade.** Todos os artefatos da operação ficam em arquivos locais.

---

## Visão do Produto

O agenciaem5 é um **pacote NPM publicável** — como o AIOX. Qualquer agência instala com:

```bash
npx em5-core@latest install
```

O que acontece após instalação:

```
🚀 agenciaem5 Installation Wizard

✓ Detectando estado da instalação...
  Projeto: nova instalação

📦 Quais canais a agência opera?
  ◉ Meta Ads
  ◉ Google Ads
  ◉ WhatsApp / Evolution API
  ◯ TikTok Ads
  ◯ LinkedIn Ads

💻 Configurar para qual IDE?
  ◉ Claude Code (.claude/)
  ◯ Cursor (.cursor/)
  ◯ GitHub Copilot (.github/)

🤖 Módulos extras:
  ◉ UGC Creator (WaveSpeed AI)
  ◉ Avora Skills Library
  ◉ Agent Media Skill
  ◯ Integrar Meta Ads MCP server

✓ Instalando .em5/ framework...
✓ Configurando agentes...
✓ Configurando tasks...
✓ Configurando templates...
✓ Criando estrutura de clientes...
✓ Criando install-manifest.yaml...

✅ Instalação completa!

Próximos passos:
  1. Ative um agente: @ceo, @cs, @strategist, @traffic
  2. Configure sua agência: @ceo *setup-agencia
  3. Adicione um cliente: @ceo *new-client {nome}
```

---

## Estrutura do Package (para publicar no npm)

```json
{
  "name": "em5-core",
  "version": "0.1.0",
  "bin": { "agenciaem5": "bin/em5.js" },
  "files": [
    "lib/",
    "bin/",
    "agents/",
    "tasks/",
    "templates/",
    "workflows/",
    "checklists/",
    "data/",
    "index.js",
    "README.md"
  ],
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^12.1.0",
    "fs-extra": "^11.3.0",
    "inquirer": "^8.2.6",
    "js-yaml": "^4.1.0",
    "glob": "^10.4.4"
  }
}
```

### Instalador (`bin/em5.js`)

O instalador é **o coração do produto**. Deve:

1. **Detectar estado:** greenfield (projeto novo) vs brownfield (já tem `.em5/`)
2. **Wizard interativo** (inquirer.js):
   - Quais canais a agência opera (seleção multipla) → filtra tasks, data, workflows
   - Quais IDEs configurar (Claude Code, Cursor, etc.)
   - Módulos extras (UGC, Avora, Agent Media)
3. **Copiar estrutura** `.em5/` para o projeto do usuário
4. **Configurar `.claude/CLAUDE.md`** com as instruções do framework
5. **Configurar MCP servers** (opcional, se Meta Ads MCP selecionado)
6. **Criar `install-manifest.yaml`** para rastrear versão e escolhas
7. **Pós-instalação:** sugerir `@ceo *setup-agencia`

---

## Estrutura do projeto (após instalação)

```
agenciaem5/
├── .claude/
│   ├── CLAUDE.md                    ✅ FEITO — configuração principal do sistema
│   └── rules/
│       ├── agent-authority.md       ✅ FEITO
│       ├── agent-handoff.md         ✅ FEITO
│       └── workflow-execution.md    ✅ FEITO
├── .codex/
│   └── agents/                      ✅ TODOS OS 7 AGENTES FEITOS
│       ├── ceo.md         ✅ (Atlas 🗺️)
│       ├── cs.md                    ✅ (Sol ☀️)
│       ├── strategist.md          ✅ (Vera 🎯)
│       ├── traffic.md        ✅ (Max 📊)
│       ├── copywriter.md            ✅ (Cal ✍️)
│       ├── designer.md              ✅ (Lux 🎨)
│       └── qa.md           ✅ (Zara 🔍)
├── .em5/core/
│   ├── constitution.md              ✅ FEITO
│   ├── tasks/                       ❌ PENDENTE — ver Tarefa 5
│   ├── templates/                   ❌ PENDENTE — ver Tarefa 6
│   ├── data/                        ❌ PENDENTE — ver Tarefa 7
│   ├── workflows/                   ❌ PENDENTE — ver Tarefa 7
│   └── checklists/                  ❌ PENDENTE — ver Tarefa 7
├── .em5/clientes/
│   └── _template/                   ✅ ESTRUTURA DE PASTAS CRIADA
│       ├── onboarding/
│       ├── estrategia/
│       ├── copy/
│       ├── design/
│       ├── assets/
│       ├── branding/
│       ├── setup-tecnico/
│       └── operacao/
├── .em5/bin/                             ❌ PENDENTE — ver Tarefa 8
│   ├── agency-os-init.js
│   └── agency-os-new-client.js
├── original docs/                   ← DOCUMENTAÇÃO FONTE (leia antes de construir)
└── contexto/                        ← REFERÊNCIAS EXTERNAS (leia antes de construir)
```

---

## Agentes construídos — resumo de responsabilidades

| Agente | Persona | Papel | Flows |
|--------|---------|-------|-------|
| ceo | Atlas 🗺️ | Orquestrador geral, health do sistema | Flow 0 (Setup) |
| cs | Sol ☀️ | Onboarding, setup técnico, gestão do cliente | Flows 1, 1.5, 4 |
| strategist | Vera 🎯 | Estratégia, posicionamento, plano de campanha | Flow 2 + Sales Optimizer |
| traffic | Max 📊 | Tráfego pago, otimização, relatórios | Flow 3 + CRO + Growth |
| copywriter | Cal ✍️ | Copy, ângulos, adaptação por canal | Log de performance (criador) |
| designer | Lux 🎨 | Criativos visuais, vídeos, UGC | Stack WaveSpeed AI |
| qa | Zara 🔍 | Validação de tudo antes de publicar | Gate obrigatório |

---

## TAREFAS PENDENTES

---

### Tarefa 5 — Tasks executáveis por agente

**Onde criar:** `.em5/core/tasks/{nome-do-agente}/`

**Formato:** Markdown simples com frontmatter YAML (seguir padrão `.aiox-core/development/tasks/create-doc.md`)

**Padrão de cada task:**
```markdown
---
name: nome-da-task
agent: nome-do-agente
description: O que essa task faz
inputs:
  - o que é necessário para executar
outputs:
  - o que é produzido ao final
elicit: true/false  # se requer input interativo do usuário
---

# Título da Task

## Objetivo
...

## Passo a passo
1.
2.
3.

## Output esperado
...
```

#### Tasks do CS (Sol) — `.em5/core/tasks/cs/`

| Arquivo | O que faz |
|---------|-----------|
| `iniciar-onboarding.md` | Coleta dados iniciais do cliente, cria pasta em `.em5/clientes/{nome}/` |
| `coletar-briefing.md` | Faz as perguntas de briefing ao usuário (elicit=true), estrutura respostas |
| `gerar-briefing-final.md` | Consolida respostas em `.em5/clientes/{nome}/onboarding/briefing-final.md` |
| `listar-acessos.md` | Gera lista de acessos necessários baseada nos canais escolhidos |
| `validar-tracking.md` | Checklist de tracking: pixel, GA4, eventos, conversões |
| `registrar-status-tecnico.md` | Preenche `setup-tecnico/status.md` com o que está pronto e pendente |
| `registrar-interacao.md` | Registra interação no `log-operacional.md` |
| `gerar-proximos-passos.md` | Lista o que o cliente precisa fazer após cada reunião |
| `enviar-relatorio.md` | Monta e envia relatório de performance ao cliente (via CS) |

#### Tasks do Estrategista (Vera) — `.em5/core/tasks/strategist/`

| Arquivo | O que faz |
|---------|-----------|
| `analisar-briefing.md` | Lê briefing final e extrai: objetivo real, ICP, oferta, contexto |
| `validar-objetivo-real.md` | Confirma com usuário se o objetivo declarado é o objetivo real |
| `definir-posicionamento.md` | Define posicionamento, narrativa e diferencial da oferta |
| `criar-plano-estrategico.md` | Cria `.em5/clientes/{nome}/estrategia/plano-estrategico.md` completo |
| `definir-funil-macro.md` | Define etapas do funil: topo, meio, fundo, retenção |
| `criar-hipoteses.md` | Documenta hipóteses de campanha antes da execução |
| `analisar-call.md` | (Modo Vendas) Analisa transcrição/resumo de call de vendas |

#### Tasks do Gestor de Tráfego (Max) — `.em5/core/tasks/traffic/`

| Arquivo | O que faz |
|---------|-----------|
| `auditar-conta.md` | Audita conta de anúncios: campanhas ativas, histórico, segmentação, budget |
| `mapear-publicos.md` | Mapeia audiências disponíveis e recomenda estrutura |
| `estruturar-campanha.md` | Cria estrutura inicial: mínimo Campanha 1 (audiência) + Campanha 2 (objetivo) |
| `solicitar-criativos.md` | Gera briefing de criativos para Cal e Lux com contexto de performance |
| `monitorar-performance.md` | Lê métricas atuais e avalia contra KPIs definidos |
| `otimizar-campanha.md` | Propõe otimizações baseadas em janela de 7 dias |
| `gerar-relatorio.md` | Monta relatório de performance para CS entregar ao cliente |
| `modo-cro.md` | Ativa análise de conversão: coleta dados, propõe hipóteses, define testes |
| `modo-growth.md` | Ativa modo de escala: identifica vencedores, propõe estratégia vertical/horizontal |

#### Tasks do Copywriter (Cal) — `.em5/core/tasks/copywriter/`

| Arquivo | O que faz |
|---------|-----------|
| `analisar-icp.md` | Extrai dores, desejos, objeções e linguagem do ICP a partir do briefing |
| `criar-angulos.md` | Gera 3 a 5 ângulos de abordagem para a oferta |
| `criar-conceitos.md` | Define conceitos de campanha: headline + promessa + direção |
| `escrever-copy.md` | Escreve copy por tipo (anúncio, roteiro, LP, WhatsApp, e-mail) |
| `adaptar-canal.md` | Adapta copy existente para formato correto de cada canal |
| `registrar-peca-log.md` | Cria linha no log-performance-criativa.md com ID e metadados |
| `iterar-com-base-em-performance.md` | Analisa log de performance e propõe novas versões |

#### Tasks do Designer (Lux) — `.em5/core/tasks/designer/`

| Arquivo | O que faz |
|---------|-----------|
| `ler-branding.md` | Lê branding kit e extrai: cores, tipografia, tom, referências |
| `definir-conceito-visual.md` | Escolhe conceito visual antes de produzir (baseado na copy) |
| `gerar-imagem.md` | Gera imagem com NanoBanana 2 via WaveSpeed AI — inclui estrutura de prompt |
| `gerar-video.md` | Gera vídeo com Kling 3.0 Pro via WaveSpeed AI — inclui estrutura de prompt |
| `gerar-ugc.md` | Cria conteúdo UGC usando ugc-creator skill (ver `contexto/ugc-system/`) |
| `versionar-criativo.md` | Salva arquivo com ID e versão (CR-001-v1), atualiza log |
| `registrar-log-criativo.md` | Adiciona linha no log-performance-criativa.md com referência visual |
| `iterar-criativo.md` | Cria nova versão baseada em feedback ou dados de performance |

#### Tasks do QA (Zara) — `.em5/core/tasks/qa/`

| Arquivo | O que faz |
|---------|-----------|
| `validar-copy.md` | Executa checklist de copy (coerência, tom, CTA, erros) |
| `validar-criativo.md` | Executa checklist de criativo (branding, legibilidade, formato, políticas) |
| `validar-campanha.md` | Executa checklist de campanha (nomenclatura, pixel, objetivo, budget) |
| `validar-landing-page.md` | Executa checklist de LP (message match, formulário, pixel, mobile) |
| `emitir-veredicto.md` | Formaliza veredicto: APROVADO / REVISÃO / BLOQUEADO com justificativa |
| `registrar-qa.md` | Registra resultado no log-operacional.md |

#### Tasks do Agency Master (Atlas) — `.em5/core/tasks/ceo/`

| Arquivo | O que faz |
|---------|-----------|
| `criar-pasta-cliente.md` | Cria estrutura completa de pastas para novo cliente |
| `listar-clientes.md` | Lista todos os clientes em `.em5/clientes/` com status |
| `status-cliente.md` | Exibe resumo do estado atual de um cliente específico |
| `health-sistema.md` | Verifica integridade geral dos arquivos do sistema |

---

### Tarefa 6 — Templates essenciais

**Onde criar:** `.em5/core/templates/{categoria}/`

**Formato:** Markdown com frontmatter YAML + estrutura de preenchimento

#### `.em5/core/templates/briefing/`

**`briefing-final.md`** — Template de briefing consolidado
```
Campos obrigatórios:
- nome_cliente
- segmento
- produto_servico (o que vende)
- objetivo_principal (meta, leads, vendas, awareness)
- objetivo_real (confirmado pelo Estrategista)
- ticket_medio
- publico_alvo (descrição qualitativa)
- icp_demografico (idade, genero, localização)
- icp_dores (lista)
- icp_desejos (lista)
- icp_objecoes (lista)
- canais_atuais (o que já usa)
- canais_propostos (o que vamos trabalhar)
- budget_mensal
- concorrentes (lista de 3)
- diferenciais (lista)
- historico_marketing (o que já tentou)
- ativos_disponiveis (site, LP, fotos, videos, logo)
- contatos (nome, cargo, WhatsApp, e-mail)
- prazo_inicio
- expectativas
```

**`briefing-perguntas.md`** — Script de perguntas para coleta (CS usa durante onboarding)

#### `.em5/core/templates/estrategia/`

**`plano-estrategico.md`** — Template do plano estratégico
```
Seções:
1. Resumo executivo (objetivo, prazo, budget)
2. Diagnóstico (situação atual, histórico, ativos)
3. ICP (persona detalhada com dores, desejos, objeções)
4. Oferta (produto, promessa, diferencial, mecanismo único)
5. Posicionamento e narrativa
6. Canais escolhidos e justificativa
7. Funil macro (topo, meio, fundo, retenção)
8. Estrutura de campanhas (objetivo por campanha)
9. KPIs e metas por canal
10. Hipóteses iniciais
11. Cronograma macro
12. Próximos passos imediatos
```

#### `.em5/core/templates/logs/`

**`log-operacional.md`** — Log de operação do cliente
```
Formato tabela:
| Data | Tipo | Responsável | Descrição | Status | Próxima Ação |
```
Tipos: REUNIÃO, ENTREGA, PENDÊNCIA, AJUSTE, VALIDAÇÃO, ESCALADA

**`log-performance-criativa.md`** — Log de criativos e performance
```
Formato tabela:
| ID | Data | Canal | Tipo | Ângulo | Copy (resumo) | Criativo | Versão | Status | Resultado | Observação |
```
Status: RASCUNHO, EM_QA, APROVADO, ATIVO, PAUSADO, ARQUIVADO
Resultado: CPL R$XX, CPA R$XX, CTR X%, ROAS X

**`log-growth.md`** — Log de ações de growth (usado em modo-growth)
```
Formato tabela:
| ID | Data | Ação | Tipo | Resultado | Decisão |
```
Tipos: VERTICAL (aumentar verba), HORIZONTAL (novos públicos), CRIATIVO, CANAL, OFERTA

#### `.em5/core/templates/relatorios/`

**`relatorio-whatsapp.md`** — Relatório simplificado para WhatsApp
```
Formato:
📊 Relatório [CLIENTE] — [PERÍODO]

✅ RESULTADO:
• Leads: X
• CPL: R$X,XX
• Investimento: R$X.XXX

📈 DESTAQUES:
• [melhor campanha]
• [melhor criativo]

⚠️ PONTOS DE ATENÇÃO:
• [ajuste necessário]

🎯 PRÓXIMOS PASSOS:
• [ação planejada]
```

**`relatorio-completo.md`** — Relatório detalhado para reuniões mensais

#### `.em5/core/templates/contratos/`

**`contrato-base.md`** — Template de contrato de gestão de tráfego
```
Seções:
1. Partes contratantes
2. Objeto do contrato
3. Escopo de serviços (o que está incluído)
4. O que NÃO está incluído
5. Investimento e forma de pagamento
6. Budget de mídia (separado da gestão)
7. Prazo e renovação
8. Confidencialidade
9. Responsabilidades do cliente
10. Responsabilidades da agência
11. KPIs e expectativas
12. Rescisão
13. Assinaturas
```

#### `.em5/core/templates/copy/`

**`copy-anuncio.md`** — Template de anúncio por canal (Meta, Google)
**`roteiro-video.md`** — Template de roteiro com gancho, desenvolvimento, CTA
**`copy-landing-page.md`** — Estrutura de LP: hero, benefícios, prova, CTA, FAQ
**`copy-whatsapp.md`** — Mensagem de WhatsApp para follow-up ou oferta
**`headline-banco.md`** — Banco de headlines por ângulo para testar

#### `.em5/core/templates/setup-tecnico/`

**`checklist-tracking.md`** — Checklist de pixel, GA4, eventos, conversões
**`status-tecnico.md`** — Template de status técnico do cliente

---

### Tarefa 7 — Data files, Workflows e Checklists

#### Data files — `.em5/core/data/`

**`estrutura-pastas.yaml`** — Define estrutura canônica de pastas do cliente
```yaml
cliente:
  onboarding:
    - briefing-original.md
    - briefing-final.md
    - contrato.md
  estrategia:
    - plano-estrategico.md
  copy:
    - (peças organizadas por ID)
  design:
    - criativos/
    - videos/
    - landing-pages/
    - exports/
  assets:
    - logo/
    - fotos/
    - videos/
    - produtos/
  branding:
    - cores.yaml
    - fontes.yaml
    - guia-estilo.md
  setup-tecnico:
    - acessos.md
    - checklist-tracking.md
    - status.md
  operacao:
    - log-operacional.md
    - log-performance-criativa.md
    - log-growth.md
```

**`canais-suportados.yaml`** — Lista de canais com configurações
```yaml
meta_ads:
  nome: Meta Ads (Facebook + Instagram)
  objetivo_possiveis: [leads, vendas, awareness, trafego, engajamento]
  formatos: [imagem, video, carrossel, stories, reels]
  kpis_principais: [CPL, CPA, ROAS, CTR, CPM]

google_ads:
  nome: Google Ads
  objetivo_possiveis: [leads, vendas, trafego, awareness]
  formatos: [search, display, video, shopping]
  kpis_principais: [CPC, CPA, ROAS, CTR, impressoes]

whatsapp:
  nome: WhatsApp / Evolution API
  tipo: canal_proprio
  uso: [follow-up, nutrição, vendas diretas]

email:
  nome: E-mail Marketing
  tipo: canal_proprio
  uso: [nutrição, relacionamento, reativação]
```

**`kpis-por-objetivo.yaml`** — KPIs esperados por objetivo e estágio
```yaml
leads:
  kpis_primarios: [CPL, volume_leads]
  kpis_secundarios: [taxa_conversao_LP, CPM, CTR]
  referencia_saudavel:
    CPL_baixo: "Depende do ticket médio — geralmente < 10% do ticket"
    CTR_minimo: "1.5%"

vendas:
  kpis_primarios: [CPA, ROAS, receita_gerada]
  kpis_secundarios: [taxa_conversao, AOV]
```

**`gatilhos-mentais.yaml`** — Lista de gatilhos com exemplos de aplicação em copy
```yaml
urgencia:
  descricao: "Prazo ou condição que expira"
  exemplos:
    - "Oferta válida até sexta-feira"
    - "Últimas 3 vagas"
prova_social:
  descricao: "O que outras pessoas fizeram ou disseram"
  exemplos:
    - "+500 clientes atendidos"
    - "4.9 estrelas no Google"
```

**`nomenclatura-campanhas.yaml`** — Padrão de nomenclatura de campanhas
```yaml
padrao: "[CLIENTE]_[OBJETIVO]_[CANAL]_[TIPO]_[ID]"
exemplos:
  - "CLINICA_LEADS_META_PROSPECCAO_001"
  - "ECOMMERCE_VENDAS_GOOGLE_SEARCH_003"
objetivos:
  - LEADS
  - VENDAS
  - AWARENESS
  - RETENCAO
  - REATIVACAO
tipos:
  - PROSPECCAO
  - RETARGETING
  - LOOKALIKE
  - REMARKETING
  - SEARCH
  - SHOPPING
```

#### Workflows — `.em5/core/workflows/`

**`onboarding-cliente.yaml`** — Workflow completo de onboarding
```yaml
# Sequência:
# CS inicia onboarding →
# CS coleta briefing (elicit) →
# CS cria pasta cliente →
# CS gera briefing final →
# CS lista acessos →
# CS faz setup técnico →
# Estrategista analisa briefing →
# Estrategista cria plano estratégico →
# CS valida plano com cliente
```

**`ciclo-campanha.yaml`** — Workflow de campanha completa
```yaml
# Sequência:
# Estrategista cria plano →
# Max audita conta e estrutura campanha →
# Max solicita criativos →
# Cal cria ângulos e copy →
# Lux produz criativos →
# Zara valida tudo →
# Max sobe campanha →
# Max monitora →
# Max gera relatório →
# Sol envia relatório ao cliente
```

**`iteracao-criativa.yaml`** — Workflow de iteração baseada em performance
```yaml
# Ativado quando: performance ruim ou oportunidade de melhoria
# Max identifica lacuna de performance →
# Max briefia Cal com dados →
# Cal cria novo ângulo/copy →
# Lux produz variação →
# Zara valida →
# Max sobe variação →
# Max compara resultados
```

#### Checklists — `.em5/core/checklists/`

**`checklist-pre-lancamento.md`** — Antes de subir qualquer campanha nova
**`checklist-onboarding-completo.md`** — Para verificar se onboarding foi feito corretamente
**`checklist-relatorio-mensal.md`** — Para garantir qualidade do relatório

---

### Tarefa 8 — Instaladores

**Onde criar:** `.em5/bin/`

#### `.em5/bin/agency-os-init.js`

Instalador do sistema agenciaem5. Deve:
1. Verificar se está rodando dentro de um projeto (git ou pasta válida)
2. Criar estrutura de pastas `.em5/core/` se não existir
3. Verificar se `.claude/CLAUDE.md` já tem configuração agenciaem5
4. Criar/atualizar `AGENTS.md` na raiz (para Claude Code reconhecer os agentes)
5. Criar `package.json` mínimo se não existir
6. Exibir mensagem de boas-vindas com lista de agentes disponíveis
7. Sugerir próximo passo: `node .em5/bin/agency-os-new-client.js`

#### `.em5/bin/agency-os-new-client.js`

Criador de novo cliente. Deve:
1. Perguntar nome do cliente (slug sem espaços, ex: `clinica-beleza`)
2. Verificar se pasta já existe em `.em5/clientes/`
3. Criar estrutura completa de pastas baseada em `.em5/core/data/estrutura-pastas.yaml`
4. Criar arquivos iniciais vazios com frontmatter:
   - `.em5/clientes/{nome}/operacao/log-operacional.md`
   - `.em5/clientes/{nome}/operacao/log-performance-criativa.md`
   - `.em5/clientes/{nome}/operacao/log-growth.md`
5. Exibir confirmação e instrução: "Execute `@cs *iniciar-onboarding {nome}` para começar"

---

### Tarefa 9 (bonus) — AGENTS.md

**Onde criar:** raiz do projeto (`/AGENTS.md`)

Arquivo que Claude Code usa para descobrir agentes disponíveis.

```markdown
# agenciaem5 — Agentes Disponíveis

Ative um agente usando `@nome-do-agente` ou lendo o arquivo `.em5/agents/{nome}.md`.

| Comando | Agente | Quando Usar |
|---------|--------|-------------|
| @ceo | Atlas 🗺️ | Setup do sistema, novo cliente, status geral |
| @cs | Sol ☀️ | Onboarding, setup técnico, gestão do relacionamento |
| @strategist | Vera 🎯 | Estratégia, posicionamento, plano de campanha |
| @traffic | Max 📊 | Campanhas pagas, otimização, relatórios |
| @copywriter | Cal ✍️ | Copy, ângulos, adaptação por canal |
| @designer | Lux 🎨 | Criativos, vídeos, UGC, layout visual |
| @qa | Zara 🔍 | Validação antes de publicar qualquer coisa |
```

---

## Contexto para ler antes de construir

### Documentação original (leia para entender o que o usuário quer)
```
original docs/Agency OS — Flow 1 Onboarding.md
original docs/Agency OS — Flow 2 Estratégia.md
original docs/Agency OS — Flow 3 Tráfego.md
original docs/Agency OS — Flow 4 CS.md
original docs/Agency OS — Flow 5 CRO.md
original docs/Agency OS — Flow 6 Expansão Growth.md
original docs/Agency OS — Flow 1.5 Setup Técnico.md
original docs/Agency OS — Flow Designer.md
original docs/Agency OS — Flow Copywriter.md
```

### Agentes AIOX (referência de padrão de construção)
```
.em5/agents/aiox-master.md     ← padrão de agente orquestrador
.em5/agents/dev.md             ← padrão de agente executor
.em5/agents/qa.md              ← padrão de agente de qualidade
```

### Tasks AIOX (referência de padrão de task)
```
.aiox-core/development/tasks/create-doc.md    ← exemplo de task com elicit
.aiox-core/development/tasks/create-next-story.md ← exemplo de task complexa
```

### Contexto externo (referências de integração)
```
contexto/ugc-system/     ← WaveSpeed AI (Kling 3.0 Pro + Nano Banana 2)
contexto/avora-skills/   ← ~20 skills selecionadas das 455, por agente
```

---

## Padrão de arquivo de agente (para não esquecer)

```markdown
# {nome-agente}

ACTIVATION-NOTICE: ...

\`\`\`yaml
activation-instructions:
  - STEP 1: ...

agent:
  name: {NomePessoa}
  id: {nome-agente}
  title: ...
  icon: {emoji}
  whenToUse: ...

persona_profile:
  archetype: ...
  communication:
    tone: ...
    greeting_levels:
      minimal: ...
      named: ...
      archetypal: ...
    signature_closing: ...

persona:
  role: ...
  identity: ...
  core_principles:
    - ...

commands:
  - name: ...
    description: ...

dependencies:
  tasks: [...]
  templates: [...]
  data: [...]
\`\`\`

---

## Quick Commands
...

*agenciaem5 Agent — {Nome} {emoji}*
```

---

## Estado atual (o que foi feito até aqui)

### ✅ Concluído

1. **Constitution** — `.em5/core/constitution.md` (8 artigos Não-negociaveis)
2. **CLAUDE.md** — `.claude/CLAUDE.md` (configuração principal do sistema)
3. **Rules** — `.claude/rules/` (agent-authority, agent-handoff, workflow-execution)
4. **Todos os 7 agentes** — `.em5/agents/` (ceo, cs, strategist, traffic, copywriter, designer, qa)
5. **Estrutura de pastas** — `.em5/clientes/_template/` (estrutura canonica do cliente)
6. **Tasks TODAS** — **49/49 concluídas** ✅
   - CS: 9/9
   - Estrategista: 7/7
   - Gestor de Trafego: 9/9
   - Copywriter: 7/7
   - Designer: 8/8
   - QA: 6/6
   - Agency Master: 5/5 (inclui novo-cliente.md)
7. **Templates** — **14/14 concluídos** ✅
   - briefing: briefing-final, briefing-perguntas
   - estrategia: plano-estrategico
   - logs: criados dinamicamente pelas tasks
   - relatorios: relatorio-whatsapp, relatorio-completo
   - contratos: contrato-base
   - copy: copy-anuncio, roteiro-video, copy-landing-page, copy-whatsapp, headline-banco
   - design: criativo-briefing
   - setup-tecnico: checklist-tracking, status-tecnico
8. **Data files** — **4/4 concluídos** ✅
   - estrutura-pastas.yaml, canais-suportados.yaml, kpis-por-objetivo.yaml, gatilhos-mentais.yaml, nomenclatura-campanhas.yaml
9. **Workflows** — **3/3 concluídos** ✅
   - onboarding-cliente.yaml, ciclo-campanha.yaml, iteracao-criativa.yaml
10. **Checklists** — **3/3 concluídos** ✅
    - checklist-pre-lancamento, checklist-onboarding-completo, checklist-relatorio-mensal

### ❌ Pendente

#### Tarefa 10 — Pacote NPM instalavel (Fase 3)

O `package.json` e os scripts locais ja existem. Falta:

1. **Installer CLI com wizard:** refatorar scripts para `bin/em5.js` com inquirer.js (selecao de canais, IDE, modulos)
2. **Configuração MCP:** opcional — Meta Ads, Google Ads
3. **install-manifest.yaml:** rastreamento do que foi instalado
4. **Upgrade path:** `npx em5-core@latest install --upgrade`
5. **Publicação no NPM:** registry, versioning, CHANGELOG

### 🚀 Roadmap

```
Fase 1 ✅: Conteúdo operacional completo (Tasks + Templates + Data + Workflows + Checklists)
Fase 2 ✅: Scripts locais + AGENTS.md + package.json + README-template.md
Fase 3: Installer CLI com wizard + Publicar `em5-core` no NPM
Fase 4: Documentacao publica + site
Fase 5: GitHub open-source + contribuicoes
```

---

## Para o proximo agente que retomar esta tarefa

1. Leia este arquivo (`BUILD-PLAN.md`) do inicio ao fim
2. Os agentes ja construidos estao em `.em5/agents/`
3. A constitution esta em `.em5/core/constitution.md`
4. **Fases 1 e 2 estao completas.** Proximo passo: **Fase 3 — NPM package com wizard**
5. Use os docs originais em `original docs/` como referencia de conteudo
6. Cada task criada amplia o valor do instalador **npm** final

**O usuario deu 100% de autonomia para construir. Pode criar todos os arquivos sem pedir confirmacao para cada um.**
