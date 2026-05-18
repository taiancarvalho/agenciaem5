# em5 — Agentes Disponíveis

Ative um agente usando `@id` ou `@nome-fantasia` (ambos funcionam).

| ID | Fantasy Name | Ícone | Quando Usar |
|----|-------------|-------|-------------|
| @ceo | Atlas | 🗺️ | Estratégia do negócio, decisões de alto nível, OKRs, portfólio |
| @coo | Marcos | 🎯 | Executar workflows completos, orquestrar agentes, delegar operações |
| @cs | Sol | ☀️ | Onboarding, setup técnico, relatórios ao cliente, reuniões |
| @strategist | Vera | 🎯 | Estratégia, posicionamento, análise de briefing, concorrentes |
| @traffic | Max | 📊 | Campanhas pagas (Meta + Google), otimização, relatórios |
| @copywriter | Cal | ✍️ | Copy, ângulos, roteiros, adaptação por canal |
| @designer | Lux | 🎨 | Criativos visuais, vídeos, UGC |
| @qa | Zara | 🔍 | Validação obrigatória antes de qualquer publicação |

*Se você configurou fantasy names personalizados em `em5-config.yaml`, eles também funcionam.*
*Exemplo: se configurou "Paulo" para @ceo, `@Paulo` funciona igual a `@ceo`.*

---

## Commands por Agente

### @ceo
- `*analise-negocio` — Revisão estratégica da agência
- `*analise-portfolio` — Visão do portfólio de clientes
- `*decisao {topico}` — Estruturar decisão de negócio
- `*okrs` — Revisar OKRs da agência
- `*new-client {nome}` — Criar workspace + delegar onboarding para @coo
- `*delegar-para-gerente {operacao} {cliente}` — Delegar para o @coo

### @coo
- `*executar-workflow {workflow} {cliente}` — Executar workflow completo
- `*analise-trafego {cliente}` — Orquestrar análise de tráfego
- `*lancar-campanha {cliente}` — Orquestrar lançamento
- `*onboarding {cliente}` — Orquestrar onboarding completo
- `*delegar {agente} {tarefa} {cliente}` — Delegar tarefa pontual
- `*status-operacao {cliente}` — Status das operações em andamento
- `*escalar-para-ceo {motivo} {cliente}` — Escalar decisão estratégica

### @cs
- `*iniciar-onboarding {cliente}` — Onboarding completo
- `*coletar-briefing {cliente}` — Coletar informações estruturadas
- `*setup-tecnico {cliente}` — Setup técnico (pixel, acessos)
- `*preparar-reuniao {cliente}` — Pauta para reunião com cliente
- `*gerar-proposta {prospect}` — Proposta comercial para prospect
- `*enviar-relatorio {cliente}` — Enviar relatório via Gmail (Composio)

### @strategist
- `*analisar-briefing {cliente}` — Analisar briefing do cliente
- `*gerar-plano-estrategico {cliente}` — Plano estratégico completo
- `*analisar-concorrentes {cliente}` — Análise competitiva
- `*definir-posicionamento {cliente}` — Posicionamento e oferta
- `*analisar-call` — Loop de aprendizado comercial

### @traffic
- `*auditar-conta {cliente} meta` — Auditoria Meta Ads
- `*auditar-conta {cliente} google` — Auditoria Google Ads
- `*subir-estrutura-inicial {cliente}` — Estrutura mínima de campanhas
- `*solicitar-criativos {cliente}` — Briefing para @copywriter e @designer
- `*monitorar {cliente}` — Verificação diária de performance
- `*otimizar {cliente}` — Otimização semanal baseada em dados
- `*gerar-relatorio {cliente}` — Relatório para o @cs enviar
- `*modo-cro {cliente}` — Análise de conversão
- `*modo-growth {cliente}` — Escala de campanhas vencedoras

### @copywriter
- `*criar-angulos {cliente}` — 3-5 ângulos de abordagem
- `*escrever-copy {cliente}` — Copy completa por tipo/canal
- `*adaptar-canal {cliente}` — Reformatar copy para canal específico
- `*registrar-peca {cliente}` — Registrar no log de performance criativa
- `*iterar-performance {cliente}` — Iterar com base em dados

### @designer
- `*ler-branding {cliente}` — Ler identidade visual do cliente
- `*definir-conceito-visual {cliente}` — Escolher conceito antes de produzir
- `*gerar-imagem {cliente}` — Gerar imagem (NanoBanana 2 / WaveSpeed)
- `*gerar-video {cliente}` — Gerar vídeo (Kling 3.0 Pro / WaveSpeed)
- `*gerar-ugc {cliente}` — Criar conteúdo UGC
- `*versionar-criativo {cliente}` — Salvar com ID e versão (CR-001-v1)
- `*iterar-criativo {cliente}` — Nova versão baseada em performance

### @qa
- `*verificar-lint` — **Sempre primeiro.** Confere se `/lint-pre-qa` rodou e aprovou
- `*validar-copy` — Validar copy com checklist
- `*validar-criativo` — Validar peça visual
- `*validar-campanha` — Validar estrutura antes de subir
- `*validar-landing-page` — Validar landing page
- `*emitir-veredicto` — APROVADO / REVISÃO / BLOQUEADO
- `*registrar-qa` — Registrar no log operacional

---

## Skills do Sistema

| Skill | O que faz |
|-------|-----------|
| `/setup` | Configurar ou reconfigurar o sistema |
| `/novo-cliente` | Criar workspace de novo cliente |
| `/onboarding` | Iniciar onboarding de cliente |
| `/status-cliente` | Resumo operacional de um cliente |
| `/relatorio` | Gerar relatório markdown + HTML (template `relatorio-cliente.html`) e enviar |
| `/lint-pre-qa` | Lint mecânico (char count, nomenclatura, palavras proibidas) antes do @qa |
| `/criar-campanha` | Ciclo completo de campanha |
| `/auditoria-conta` | Auditar conta de anúncios |
| `/iterar-criativo` | Iterar criativos com baixa performance |
| `/briefing` | Coletar briefing estruturado |
| `/saude-sistema` | Health check completo |

---

*em5 v1.0 — Agência em5 — Sistema Operacional para Agências de Marketing Digital*
