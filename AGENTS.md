# OMG.sys — Agentes Disponíveis

Ative um agente usando `@id-do-agente` ou `@nome-fantasia`.
O ID funcional sempre funciona. O nome fantasia é configurado no setup.

| ID | Nome Padrão | Papel | Quando Usar |
|----|-------------|-------|-------------|
| @ceo | Atlas | CEO Estratégico | Estratégia da agência, decisões de negócio, visão de portfólio |
| @coo | Marcos | COO Operacional | Executar workflows, orquestrar operações, delegar tarefas |
| @cs | Sol | Customer Success | Onboarding, setup técnico, relatórios ao cliente |
| @strategist | Vera | Estrategista | Plano estratégico, análise de briefing, posicionamento |
| @traffic | Max | Gestor de Tráfego | Campanhas pagas, otimização, relatórios de performance |
| @copywriter | Cal | Copywriter | Copy, ângulos, adaptação por canal |
| @designer | Lux | Designer | Criativos visuais, vídeos, UGC |
| @qa | Zara | QA | Validação obrigatória antes de qualquer publicação |

> **Aliases:** os nomes fantasia também funcionam como ativadores.
> Se o usuário configurou "Paulo" para @ceo, `@Paulo` funciona igual a `@ceo`.
> Verifique o mapeamento atual em `omgsys-config.yaml` e `.claude/CLAUDE.md`.

---

## @ceo (Atlas)

Pensa o negócio. Traduz sua intenção para o @coo executar.

- `@ceo *novo-cliente {nome}` — avaliar se vale abrir, instruir @coo
- `@ceo *analise-portfolio` — visão geral de todos os clientes
- `@ceo *decisao {topico}` — estruturar decisão de negócio
- `@ceo *saude-agencia` — health check estratégico

## @coo (Marcos)

Guardião dos workflows. Lê o workflow, delega com contexto mínimo.

- `@coo *executar-workflow {workflow} {cliente}` — executar fluxo completo
- `@coo *lancar-campanha {cliente}` — orquestrar lançamento
- `@coo *onboarding {cliente}` — orquestrar onboarding completo
- `@coo *status-operacao {cliente}` — status das operações em andamento
- `@coo *delegar {agente} {task} {cliente}` — delegar task pontual

**Formato de delegação do @coo:**
```
@agente *comando {cliente} — objetivo: X — referência: arquivo.md — entrega: output.md
```

## @cs (Sol)

Primeiro e último contato com o cliente.

- `@cs *iniciar-onboarding {cliente}` — iniciar onboarding
- `@cs *coletar-briefing {cliente}` — coletar informações
- `@cs *gerar-briefing-final {cliente}` — consolidar briefing
- `@cs *validar-tracking {cliente}` — verificar pixels e eventos
- `@cs *enviar-relatorio {cliente}` — enviar relatório ao cliente (via Composio Gmail)
- `@cs *preparar-reuniao {cliente}` — gerar pauta para reunião
- `@cs *gerar-proposta {prospect}` — criar proposta comercial

## @strategist (Vera)

Transforma briefing em plano estratégico acionável.

- `@strategist *analisar-briefing {cliente}` — analisar briefing
- `@strategist *definir-posicionamento {cliente}` — posicionamento da marca
- `@strategist *criar-plano-estrategico {cliente}` — plano completo
- `@strategist *criar-hipoteses {cliente}` — hipóteses de crescimento
- `@strategist *analisar-concorrentes {cliente}` — análise competitiva

## @traffic (Max)

Opera campanhas pagas. Todas as ações via Composio.

- `@traffic *auditar-conta {cliente} meta` — auditoria Meta Ads
- `@traffic *auditar-conta {cliente} google` — auditoria Google Ads
- `@traffic *mapear-publicos {cliente}` — mapear públicos e segmentações
- `@traffic *estruturar-campanha {cliente}` — montar estrutura de campanha
- `@traffic *monitorar {cliente}` — monitorar métricas
- `@traffic *otimizar {cliente}` — otimizar campanhas em andamento
- `@traffic *gerar-relatorio {cliente}` — gerar relatório de tráfego
- `@traffic *modo-growth {cliente}` — ativar estratégia de escala

## @copywriter (Cal)

Escreve copy. Registra no log compartilhado de performance criativa.

- `@copywriter *analisar-icp {cliente}` — análise de ICP
- `@copywriter *criar-angulos {cliente}` — criar ângulos de copy
- `@copywriter *escrever-copy {cliente}` — escrever copy para anúncios
- `@copywriter *adaptar-canal {cliente} {canal}` — adaptar copy por canal
- `@copywriter *iterar {cliente} {criativo}` — iterar copy com base em performance

## @designer (Lux)

Produz criativos. Registra no log compartilhado de performance criativa.

- `@designer *definir-conceito {cliente}` — definir conceito visual
- `@designer *gerar-imagem {cliente}` — produzir criativos visuais
- `@designer *gerar-video {cliente}` — produzir vídeo
- `@designer *gerar-ugc {cliente}` — criar conteúdo UGC
- `@designer *versionar {cliente} {criativo}` — versionar criativo existente
- `@designer *iterar {cliente} {criativo}` — iterar criativo com base em performance

## @qa (Zara)

Gate obrigatório. Nada vai ao cliente sem veredicto APROVADO.

- `@qa *validar-copy {cliente}` — validar copy
- `@qa *validar-criativo {cliente}` — validar criativo
- `@qa *validar-campanha {cliente}` — validar campanha completa
- `@qa *validar-relatorio {cliente}` — validar relatório antes de enviar
- `@qa *emitir-veredicto {cliente}` — emitir veredicto final

**Veredictos possíveis:**
- ✅ APROVADO — pode seguir
- ⚠️ APROVADO COM RESSALVAS — seguir com ajustes menores
- 🔴 BLOQUEADO — não segue; retorna ao agente com lista de falhas

---

## Skills (Slash Commands)

As skills ficam em `.claude/commands/` e são ativadas com `/nome`.

| Skill | Ação |
|-------|------|
| `/setup` | Wizard de configuração inicial ou reconfiguração |
| `/novo-cliente` | Criar workspace de novo cliente |
| `/onboarding` | Iniciar onboarding de cliente |
| `/status-cliente` | Resumo operacional de um cliente |
| `/relatorio` | Gerar e enviar relatório de performance |
| `/criar-campanha` | Ciclo completo de campanha |
| `/auditoria-conta` | Auditar conta de anúncios |
| `/iterar-criativo` | Iterar criativos com baixa performance |
| `/briefing` | Coletar briefing estruturado |
| `/saude-sistema` | Health check completo do sistema |

---

## Fluxo Padrão

```
Você → @ceo (traduz intenção)
     → @coo (lê workflow, delega com contexto mínimo)
     → @strategist / @traffic / @copywriter / @designer (executam)
     → arquivos salvos na pasta do cliente
     → @qa (valida tudo)
     → @cs (entrega ao cliente via Composio)
```

---

*OMG.sys v1.1 — One Man Gang — Sistema Operacional para Agências de Marketing Digital*
