# em5 — Manual de Uso

> Manual do usuário pra gestor solo de agência operando em5.
> Como configurar, operar dia-a-dia, e tirar máximo proveito do sistema.

## Sumário

1. [Filosofia em5](#1-filosofia-em5)
2. [Ciclo de vida do cliente](#2-ciclo-de-vida-do-cliente)
3. [Rotina diária (≤ 30 min total)](#3-rotina-diária)
4. [Cada agente — quando chamar](#4-cada-agente--quando-chamar)
5. [Skills — exemplos práticos](#5-skills--exemplos-práticos)
6. [Configuração avançada](#6-configuração-avançada)
7. [Workflows comuns](#7-workflows-comuns)
8. [Gestão de aprendizados](#8-gestão-de-aprendizados)
9. [Validação QA](#9-validação-qa-severity-gates)
10. [Financeiro (Asaas)](#10-financeiro-asaas)
11. [Comunicação cliente (WhatsApp)](#11-comunicação-cliente-whatsapp)
12. [Extensão do sistema](#12-extensão-do-sistema)
13. [FAQ](#13-faq)

---

## 1. Filosofia em5

### O princípio dos 5 minutos

Toda interação humana com o sistema tem orçamento de **≤ 5 minutos**.

| Atividade | Tempo máximo |
|-----------|--------------|
| Briefing inicial cliente | 5 min |
| Daily run (`/dia`) | 5 min |
| Criar campanha (`/campanha`) | 5 min input |
| Validação QA (`/validate`) | 5 min |
| Relatório semanal | 5 min |

Se algo passa de 5 min de input → **bug de UX**, vira ticket de refator via `/construir`.

### O sistema é sua agência

Você NÃO opera os clientes diretamente — você opera **a agência**. Agentes operam os clientes.

```
Você → @ceo Atlas (intenção) → @coo Nexus (delega) → agente especialista → execução
                                                                              ↓
                                                                         @qa Crivo valida
                                                                              ↓
                                                                         @cs Sol entrega
```

### Filesystem é a verdade

Todo trabalho gera arquivo. Conversa é exploração, arquivo é verdade (Art. I).

`clientes/{slug}/` é fonte única do estado de cada cliente.

---

## 2. Ciclo de vida do cliente

### 2.1 Prospecção (@vendas Caça)

```
@vendas Caça *pesquisar-prospect nova-clinica https://novaclinica.com.br
@vendas Caça *gerar-diagnostico nova-clinica
@vendas Caça *criar-proposta nova-clinica
@vendas Caça *follow-up nova-clinica
@vendas Caça *fechar-cliente nova-clinica
```

Output: prospect em `.em5/prospects/nova-clinica/` → após fechar, vira `clientes/nova-clinica/`.

### 2.2 Onboarding (Sol + Vera + Lux)

```
/cliente-novo nova-clinica
# Pergunta se quer extrair DESIGN.md → recomendo "sim, URL"

/extrair-design nova-clinica https://novaclinica.com.br
# @designer Lux usa design-extractor → DESIGN.md + tokens + preview

@cs Sol *iniciar-onboarding nova-clinica
@cs Sol *coletar-board nova-clinica
@cs Sol *gerar-briefing-final nova-clinica

@strategist Vera *analisar-briefing nova-clinica
@strategist Vera *criar-plano-estrategico nova-clinica
```

Output esperado:
- `clientes/nova-clinica/branding/DESIGN.md`
- `clientes/nova-clinica/onboarding/briefing-final.md`
- `clientes/nova-clinica/estrategia/plano-estrategico.md`

### 2.3 Setup financeiro (@fin Caixa)

```
@fin Caixa *cadastrar-cliente-asaas nova-clinica
# Cria customer no Asaas, gera asaas_customer_id

@fin Caixa *criar-cobranca-asaas nova-clinica
# Primeira cobrança (PIX/boleto)
```

Output:
- `clientes/nova-clinica/financeiro/cliente-asaas.yaml`
- `clientes/nova-clinica/financeiro/cobrancas.yaml`

### 2.4 Operação contínua

```
# Mensal:
@traffic Pulse *auditar-conta nova-clinica
@strategist Vera *criar-hipoteses nova-clinica
@copywriter Eco *criar-angulos nova-clinica
@designer Lux *gerar-imagem nova-clinica

# Semanal:
/dia    # daily run automático
@traffic Pulse *gerar-relatorio nova-clinica
@cs Sol *enviar-relatorio nova-clinica

# Conforme demanda:
@qa Crivo *validar-campanha nova-clinica
/iterar nova-clinica
```

### 2.5 Encerramento

```
@cs Sol *registrar-interacao nova-clinica "Cliente solicitou pausa"
# Atualiza status.yaml → estagio: pausado | churn
```

---

## 3. Rotina diária

### Manhã (5-10 min)

```
1. /dia
   → @traffic audita todas contas
   → @qa Crivo sinaliza desvios > 20% ROAS
   → @cs Sol prepara drafts WhatsApp
   → Output: .em5/_dia/{data}.md

2. Você lê resumo, aprova/ajusta ações sugeridas

3. /painel (opcional)
   → Vê dashboard visual em http://localhost:4321
```

### Tarde (sob demanda)

- Cliente novo? → `/cliente-novo X`
- Cliente pediu campanha? → `/campanha X`
- Cliente reclamou? → `@cs Sol` resolve
- Cobrança vencida? → `@fin Caixa *monitorar-inadimplencia` (auto via `/dia`)

### Noite (5 min)

```
1. Revisar learnings do dia
   ls .em5/system/learnings/{ano-mes}/
   cat .em5/system/learnings/{ano-mes}/qa-bloqueios.md

2. Validar conformidade
   /validate-em5

3. Commit do dia
   git add -A && git commit -m "ops: $(date +%Y-%m-%d)"
```

---

## 4. Cada agente — quando chamar

### @ceo Atlas 🗺️ (frontier)

**Quando:** decisões estratégicas, conflitos, novo cliente, churn.

**Comandos comuns:**
```
@ceo Atlas *analise-negocio
@ceo Atlas *analise-portfolio
@ceo Atlas *decisao "Aceitar cliente X com escopo Y?"
@ceo Atlas *okrs Q1
```

**NÃO use pra:** operação tática (delega pra Nexus).

### @coo Nexus 🎯 (balanced)

**Quando:** workflows completos, delegação cross-agente.

**Comandos comuns:**
```
@coo Nexus *executar-workflow ciclo-campanha cliente-x
@coo Nexus *monitorar-execucao cliente-x
@coo Nexus *consolidar-e-reportar cliente-x
```

**NÃO use pra:** decisão estratégica (escala ao @ceo).

### @cs Sol ☀️ (balanced)

**Quando:** cliente novo, relacionamento, relatórios, problemas.

**Comandos comuns:**
```
@cs Sol *iniciar-onboarding cliente-x
@cs Sol *enviar-relatorio cliente-x
@cs Sol *registrar-interacao cliente-x "{evento}"
```

### @strategist Vera 🧭 (balanced)

**Quando:** plano estratégico, posicionamento, hipóteses.

**Comandos comuns:**
```
@strategist Vera *analisar-briefing cliente-x
@strategist Vera *criar-plano-estrategico cliente-x
@strategist Vera *criar-hipoteses cliente-x
@strategist Vera *analisar-concorrentes cliente-x
```

### @traffic Pulse 📊 (balanced)

**Quando:** Meta Ads, Google Ads, performance, otimização.

**Comandos comuns:**
```
@traffic Pulse *auditar-conta cliente-x
@traffic Pulse *estruturar-campanha cliente-x
@traffic Pulse *monitorar-performance cliente-x
@traffic Pulse *otimizar-campanha cliente-x
@traffic Pulse *gerar-relatorio cliente-x
@traffic Pulse *modo-cro cliente-x         # Modo CRO
@traffic Pulse *modo-growth cliente-x      # Modo Growth
```

### @copywriter Eco ✍️ (balanced)

**Quando:** copy, ângulos, headlines, adaptação canal.

⚠️ **Hard dep:** precisa de DESIGN.md no cliente (Art. XIII).

**Comandos comuns:**
```
@copywriter Eco *analisar-icp cliente-x
@copywriter Eco *criar-angulos cliente-x
@copywriter Eco *escrever-copy cliente-x meta-ads
@copywriter Eco *adaptar-canal CR-001 instagram-reels
@copywriter Eco *escrever-copy-email cliente-x
```

### @designer Lux 🎨 (balanced)

**Quando:** imagens, vídeos, UGC, LP visual.

⚠️ **Hard dep:** precisa de DESIGN.md no cliente (Art. XIII).

**Comandos comuns:**
```
@designer Lux *extrair-design cliente-x https://...
@designer Lux *ler-branding cliente-x
@designer Lux *definir-conceito-visual CR-001
@designer Lux *gerar-imagem CR-001
@designer Lux *gerar-video CR-002
@designer Lux *gerar-ugc CR-003
```

### @qa Crivo 🔍 (frontier)

**Quando:** ANTES de publicar qualquer coisa pro cliente.

**Comandos comuns:**
```
@qa Crivo *validar-campanha cliente-x CP-042
@qa Crivo *validar-copy cliente-x CR-001
@qa Crivo *validar-criativo cliente-x CR-002
@qa Crivo *validar-landing cliente-x
```

**Saída:** APROVADO / APROVADO_COM_RESSALVA / REVISÃO / BLOQUEADO.

### @arq Arq 🏛️ (frontier)

**Quando:** criar componente novo no sistema (via `/construir`).

**Não chama direto** — invoca via skill `/construir`.

### @builder Cunha 🔨 (balanced)

**Quando:** implementar spec do @arq.

**Não chama direto** — invocado pelo workflow `/construir`.

### @reviewer Lima 🧪 (frontier)

**Quando:** validar componente recém-criado pelo Cunha.

**Não chama direto** — invocado pelo workflow `/construir`.

### @vendas Caça 🎯 (balanced)

**Quando:** prospecção, diagnóstico, proposta, fechamento.

**Comandos comuns:**
```
@vendas Caça *pesquisar-prospect novo-prospect https://...
@vendas Caça *gerar-diagnostico novo-prospect
@vendas Caça *criar-proposta novo-prospect
@vendas Caça *follow-up novo-prospect
@vendas Caça *fechar-cliente novo-prospect
@vendas Caça *registrar-perdido novo-prospect "motivo"
```

### @fin Caixa 💰 (balanced)

**Quando:** financeiro — cobrança, inadimplência, ROI, MRR.

**Comandos comuns:**
```
@fin Caixa *cadastrar-cliente-asaas cliente-x
@fin Caixa *criar-cobranca-asaas cliente-x 4500 PIX 2026-06-15
@fin Caixa *sync-asaas
@fin Caixa *monitorar-inadimplencia
@fin Caixa *calcular-roi-cliente cliente-x ultimo_mes
@fin Caixa *gerar-mrr-mensal
@fin Caixa *relatorio-financeiro 2026-05
```

### @scout Espia 🔍 (balanced)

**Quando:** inteligência competitiva, SWOT, monitoramento.

**Comandos comuns:**
```
@scout Espia *mapear-concorrencia cliente-x
@scout Espia *scrape-site-concorrente concorrente-y
@scout Espia *monitorar-ads-concorrente concorrente-y
@scout Espia *gerar-swot cliente-x
@scout Espia *relatorio-semanal cliente-x
```

### @whats Onda 📱 (balanced)

**Quando:** comunicação WhatsApp com cliente.

**Comandos comuns:**
```
@whats Onda *enviar-template cliente-x weekly_report
@whats Onda *enviar-draft cliente-x "msg custom"
@whats Onda *receber-mensagem
@whats Onda *handoff-humano cliente-x
@whats Onda *transcrever-audio path/audio.ogg
```

---

## 5. Skills — exemplos práticos

### `/cliente-novo`

```
> /cliente-novo clinica-sao-paulo

✓ Workspace clientes/clinica-sao-paulo/ criado
✓ status.yaml + log.md inicializados

🎨 Quer extrair DESIGN.md agora?
[1] URL do site
[2] Briefing local
[3] Skip
> 1
URL: https://clinicasaopaulo.com.br

@designer Lux executando /extrair-design...
✓ branding/DESIGN.md (confidence: high)
✓ branding/preview.html
✓ branding/tokens.json
✓ branding/theme.css

Próximo: @cs Sol *iniciar-onboarding clinica-sao-paulo
```

### `/campanha`

```
> /campanha clinica-sao-paulo

@coo Nexus orquestrando workflow ciclo-campanha...

[1/8] @strategist Vera *analisar-briefing
[2/8] @strategist Vera *criar-plano-estrategico
[3/8] @copywriter Eco *criar-angulos (4 ângulos validados via /aprender)
[4/8] @designer Lux *gerar-imagem (5 criativos)
[5/8] @traffic Pulse *estruturar-campanha (CP-042)
[6/8] @qa Crivo *validar-campanha → APROVADO
[7/8] @traffic Pulse executa publicação
[8/8] @cs Sol notifica cliente via WhatsApp

✓ Campanha CP-042 ao vivo
```

### `/dia`

```
> /dia

@traffic Pulse auditando 10 contas ativas...

⚠️ Alertas detectados:
- clinica-sao-paulo: ROAS caiu 28% (de 3.2x → 2.3x) — severity: alto
- saas-b2b: Pixel zero events últimas 24h — severity: critico

@qa Crivo validando sinalizações...
✓ Críticos confirmados, sem falsos positivos

@cs Sol preparando drafts WhatsApp:
- clinica-sao-paulo: draft "alerta ROAS" pronto pra aprovação
- saas-b2b: ESCALADO → cliente irá receber ligação humana

Output: .em5/_dia/2026-05-17.md

✅ Resumo gerado em 4min32s.
```

### `/aprender`

```
> /aprender copy-vitorias --nicho clinica-odonto

@coo Nexus consultando learnings...

Top 5 padrões (últimos 30 dias):

1. Ângulo "vergonha" — 4 ocorrências, CPL médio R$22
2. Headline "antes/depois" — 3 ocorrências, CTR 4.2%
3. CTA "agende grátis" — 6 ocorrências, conversão 18%
4. Story formato carrossel — 2 ocorrências, engagement +35%
5. Horário 19h-21h — 5 ocorrências, melhor performance

Recomendação: usar ângulo "vergonha" + CTA "agende grátis" no próximo lançamento.
```

### `/construir`

```
> /construir "preciso de agente que monitore reviews Google Maps por cliente"

@arq Arq inicia entrevista (≤ 5 min):

P1: Tipo de componente?
> agente novo

P2: Monitora reviews quão frequente?
> diário

P3: Sinaliza review negativa pra qual agente?
> @cs Sol

P4: Composio tem toolset Google Reviews?
> não sei, descobre

P5: Severity de review 1 estrela?
> alto, escalar pra owner

✓ Spec gerada: .em5/infra/forge/CT-001/spec.md

@builder Cunha implementando...
✓ Criado: .em5/agents/reviews/persona.md (Echo, persona)
✓ Criado: .em5/agents/reviews/tasks/monitorar-reviews.md
✓ Criado: skill /monitor-reviews
✓ Atualizado: CLAUDE.md, AGENTS.md, em5-config.yaml

@reviewer Lima validando...
✓ Art. I-XIII OK
✓ Anti-papel listado
✓ model_tier coerente
Veredicto: APROVADO ✅

@builder Cunha commit:
feat: @reviews Echo + /monitor-reviews via /construir CT-001

✅ Componente em produção. Teste com:
   @reviews Echo *monitorar-reviews clinica-sao-paulo
```

---

## 6. Configuração avançada

### Model tier por agente

Edita `.em5/agents/{agent}/persona.md`, campo `model_tier`:

- `frontier` — Opus (decisões críticas)
- `balanced` — Sonnet (default)
- `haiku` — Haiku (tarefas simples)

Default: ceo + qa + arq + reviewer = frontier; demais = balanced.

### Severity Gates customizados

Edita `.em5/system/data/gate-matrix.yaml`:

```yaml
gates:
  copy:
    sua_regra_custom:
      severity: alto
      action: bloqueia
      override_role: ceo
```

### Composio toolsets

Edita `.claude/settings.json` → `mcpServers.composio.args`:

```json
"--toolset", "meta_ads,google_analytics,googlesheets,..."
```

Adiciona/remove conforme necessidade. Reinicia Claude Code após mudança.

### Hooks customizados

Edita `.em5/infra/hooks/registry.js` → `defaultHooks()`:

```javascript
reg.register('PreToolUse', {
  matcher: 'Bash',
  command: 'bash .claude/hooks/seu-hook.sh',
});
```

Aplica:
```bash
node .em5/infra/hooks/registry.js apply-claude
```

---

## 7. Workflows comuns

### Cliente reclamou de algo

```
1. @whats Onda recebe mensagem
   → classifica intenção: "reclamacao"
   → severity: alto
   → handoff humano automático
   → você é notificado via WhatsApp/email

2. Você lê + decide ação

3. @cs Sol *registrar-interacao cliente-x "Reclamação X: Y"

4. Se precisa de ação:
   @coo Nexus *executar-workflow resolucao-reclamacao cliente-x

5. Após resolver:
   @whats Onda *enviar-draft cliente-x "Resposta validada pelo @qa"
   @qa Crivo valida → APROVADO → @whats envia
```

### Cliente novo via prospect

```
1. @vendas Caça *pesquisar-prospect novo-prospect URL
2. @vendas Caça *gerar-diagnostico novo-prospect
3. (você envia diagnóstico, marca reunião)
4. (após call) @vendas Caça *criar-proposta novo-prospect
5. (cliente aceita) @vendas Caça *fechar-cliente novo-prospect
   → automaticamente:
     → /cliente-novo novo-prospect
     → @cs Sol *iniciar-onboarding
     → @fin Caixa *cadastrar-cliente-asaas
6. /extrair-design novo-prospect URL
7. @strategist Vera *criar-plano-estrategico novo-prospect
8. (operação contínua)
```

### Inadimplência

```
@fin Caixa monitora diariamente (heartbeat /dia):
  3-7 dias atraso → draft amigável via @whats
  8-14 dias → escalado @qa valida + draft formal
  15-29 dias → ESCALADO @ceo + @cs ligação pessoal
  30+ dias → @ceo decide: renegociar OU churn

@fin Caixa *monitorar-inadimplencia    # manual sob demanda
```

### Iterar criativo baixa performance

```
1. @traffic Pulse identifica CR-042 com CTR 0.8% (baixo)

2. /iterar cliente-x CR-042
   → @copywriter Eco *iterar-performance CR-042
   → @designer Lux *iterar-criativo CR-042 (novas variações)
   → @qa Crivo valida

3. @traffic Pulse publica V2

4. (após 7 dias) @traffic compara V1 vs V2
   → vencedor entra em produção
   → perdedor pausado
   → learnings/{mes}/copy-vitorias.md atualizado se V2 venceu
```

---

## 8. Gestão de aprendizados

### Estrutura

```
.em5/system/learnings/
├── _template.md
├── 2026-05/
│   ├── qa-bloqueios.md
│   ├── qa-overrides.md
│   ├── copy-vitorias.md
│   ├── traffic-padroes.md
│   ├── cs-objecoes.md
│   ├── strategist-hipoteses.md
│   ├── designer-padroes.md
│   ├── system-errors.md
│   └── mcp-excecoes.md
└── 2026-06/
    └── ...
```

### Como agente alimenta

Automaticamente via hook `learnings-capture.sh` (PostToolUse Write).

Manualmente:
```
@traffic Pulse *registrar-padrao clinica-x "Publico 25-34 mulheres SP +ROAS"
```

### Como agente consome

Antes de criar algo novo:
```
/aprender copy-vitorias --nicho clinica-odonto
/aprender traffic-padroes --canal meta-ads
```

Agente sugere padrões aplicáveis.

### Revisão mensal

```bash
# Reviso o que aprendeu no mês passado
ls .em5/system/learnings/2026-04/
cat .em5/system/learnings/2026-04/copy-vitorias.md
```

Top patterns viram playbooks via `/forge playbook`.

---

## 9. Validação QA (Severity Gates)

### Severity matrix

| Severidade | Ação | Override possível |
|------------|------|-------------------|
| 🔴 crítico | Bloqueia absoluto | **NUNCA** |
| 🟠 alto | Bloqueia | Role específica via `/override` |
| 🟡 médio | Revisão solicitada | Auto-fix pelo agente original |
| 🟢 baixo | Aprovado com ressalva | Log automático |

### Exemplos de severity por gate

**Copy:**
- `sem_cta` → crítico
- `erro_ortografico` → alto (override: @ceo)
- `tom_levemente_off` → médio (auto-fix Eco)
- `formatacao_emoji` → baixo (log)

**Tráfego:**
- `pixel_ausente` → crítico
- `objetivo_errado` → crítico
- `publico_amplo_demais` → alto (override: @strategist)
- `nomenclatura_fora_padrao` → médio (auto-fix Pulse)

Lista completa: [`.em5/system/data/gate-matrix.yaml`](../.em5/system/data/gate-matrix.yaml).

### Override de bloqueio

Apenas pra severity `alto` (crítico = nunca):

```
@strategist Vera *override-qa CP-042 "Público amplo intencional pra teste A/B com nicho. Lock budget R$200."

✓ Override registrado em learnings/{mes}/qa-overrides.md
✓ Publicação liberada
✓ Revisão em 7 dias pra validar hipótese
```

---

## 10. Financeiro (Asaas)

### Setup inicial

```
@fin Caixa *cadastrar-cliente-asaas cliente-x
# Pede: nome fiscal, CPF/CNPJ, email, telefone
# Cria customer no Asaas
# Salva clientes/cliente-x/financeiro/cliente-asaas.yaml
```

### Cobranças

```
# Cobrança única
@fin Caixa *criar-cobranca-asaas cliente-x 4500 PIX 2026-06-15

# Assinatura recorrente (todo dia 5)
@fin Caixa *criar-assinatura cliente-x 4500 PIX 5
```

### Monitoramento

```
# Manual
@fin Caixa *monitorar-inadimplencia
@fin Caixa *sync-asaas

# Auto via /dia (heartbeat diário)
```

### ROI por cliente

```
@fin Caixa *calcular-roi-cliente cliente-x ultimo_mes

# Fórmula:
# ROI = (Receita Asaas - Custo ads Composio - Custo agência interno) / Custo agência
#
# Custo agência interno = horas log × custo_hora (default R$80/h em em5-config.yaml)
```

Se ROI < 1.5x → notifica @ceo (sinal de churn-risk).

### MRR mensal

```
@fin Caixa *gerar-mrr-mensal

# Output:
# .em5/_fin/{ano-mes}/mrr.md (human)
# .em5/_fin/{ano-mes}/mrr.yaml (machine, painel consome)
```

### Webhooks Asaas (auto-update)

```
@fin Caixa *setup-webhooks-asaas https://meu-endpoint.com/asaas

# Configura webhooks Asaas pra:
# - PAYMENT_CONFIRMED → registrar-pagamento auto
# - PAYMENT_OVERDUE → monitorar-inadimplencia auto
# - SUBSCRIPTION_INACTIVATED → notificar @ceo
```

⚠️ Endpoint precisa ser público (Cloudflare Worker / Vercel Function / n8n webhook).

---

## 11. Comunicação cliente (WhatsApp)

### Setup

```
/whats-setup

? Provider? [composio | waha]
? Telefone agência: +5511XXX
? Importar templates padrão? [s/N]
? Stop rules ativar?
  [x] cliente_pediu_parar
  [x] horario_silencioso 22h-08h
  [x] max_mensagens_dia 3
? Owner pra handoff humano: você@email.com
```

### Templates disponíveis

```
@whats Onda *enviar-template cliente-x briefing_inicial
@whats Onda *enviar-template cliente-x alerta_roas_critico
@whats Onda *enviar-template cliente-x weekly_report
@whats Onda *enviar-template cliente-x objecao_padrao_preco
@whats Onda *enviar-template cliente-x cobranca_amigavel
```

Templates em [`.em5/system/data/whatsapp-templates.yaml`](../.em5/system/data/whatsapp-templates.yaml).

### Templates por nicho

Override por nicho em [`.em5/system/data/whats/templates-por-nicho.yaml`](../.em5/system/data/whats/templates-por-nicho.yaml).

Exemplo:
- Cliente nicho `clinica-odonto` recebe template diferente do `saas-b2b`.

### Stop rules absolutas

```yaml
# .em5/system/data/whats-stop-rules.yaml
cliente_pediu_parar: permanente
horario_silencioso: 22h-08h (exceto severity=crítico)
max_mensagens_dia: 3
resposta_negativa_3x: handoff humano
feriado_local: agenda próximo dia útil
```

### Handoff humano

Triggers automáticos:
- Sentiment negativo
- Pergunta fora de template
- Palavras: "cancelar", "processo", "advogado", "Reclame Aqui"
- 3 respostas negativas seguidas

Quando dispara:
1. Bot envia última mensagem: "Vou chamar humano, retorno em 1h"
2. Automação pausada pro cliente
3. Owner notificado via WhatsApp + email
4. Você resolve manualmente
5. Reativa via `@whats Onda *reativar-automacao cliente-x`

---

## 12. Extensão do sistema

### Adicionar novo nicho de cliente

```
/forge playbook

? Nicho? clinica-pediatria
? Canais principais? meta-ads, instagram, whatsapp
? Ângulos validados? "papai-presente", "rotina-organizada"
? KPIs alvo? CPL R$25, taxa agendamento 35%

✓ .em5/agents/nicho-clinica-pediatria/persona.md criado
```

@strategist Vera carrega automaticamente quando cliente novo tem `nicho: clinica-pediatria`.

### Adicionar agente novo

Via meta-time (recomendado):
```
/construir "preciso de agente que gere podcasts a partir de blog posts"
```

Via wizard rápido:
```
/forge agent
# Wizard pergunta tudo
```

### Adicionar skill nova

```
/forge skill

? Nome? exportar-pptx
? Agente owner? @cs Sol
? Inputs? cliente-slug, periodo
? Output? clientes/{slug}/relatorios/relatorio-{periodo}.pptx
```

### Importar customGPT

```
/importar-gpt ~/Downloads/meu-gpt.zip
# OU
/importar-gpt ~/projects/agente-folder/
```

Detecta formato + cria agente em5 equivalente.

---

## 13. FAQ

### "Quantos clientes consigo operar solo?"

Depende do nicho. Com em5 v1.3:
- Alta complexidade (B2B SaaS): 5-8 simultâneos
- Média (e-commerce): 8-12
- Baixa (serviços locais): 15-20

Limite real = horas do dia, não capacidade técnica.

### "Posso operar mais de uma agência no mesmo em5?"

Não diretamente. Cada instalação em5 = 1 agência. Pra multi-agência:
- Opção A: 1 worktree git por agência
- Opção B: Paperclip integration (multi-empresa nativo)

### "E se eu quiser deletar um cliente?"

```bash
# Move pra archive (não deleta permanente)
mv clientes/cliente-x .em5/infra/docs/archive/clientes/cliente-x-$(date +%Y%m%d)/

# OU delete definitivo (com cuidado)
rm -rf clientes/cliente-x
```

### "Como atualizar em5 mantendo customizações?"

```bash
git pull origin main          # pega updates
npx em5@latest upgrade        # roda migrations preservando .env + agents customizados
```

### "Como contribuo com playbooks?"

PR no repo em5 com `.em5/agents/{seu-nicho}/persona.md`. Após review, vira playbook oficial da comunidade.

### "E se Composio cair?"

Sistema cai pra checklist manual (Art. VI honestidade):
- Tasks que dependem de Composio param
- Agentes geram lista de passos manuais
- Você executa direto no Meta Ads Manager, etc.
- Quando Composio voltar: auto-resume

### "Hooks travam minha sessão Claude Code?"

Hooks têm timeout. Se `learnings-capture.sh` travar, sessão continua mas hook é skipado naquela execução. Verifica:

```bash
bash .claude/hooks/learnings-capture.sh < /dev/null
# Não deve travar mais de 1 segundo
```

### "Posso usar OpenAI em vez de Claude?"

Sim, mas com trade-offs:
- Hooks de model_tier não vão aplicar (são pra Claude)
- Skills foram desenhadas pra Claude Code
- Possível mas exige adapter custom

Recomendação: usa Claude Code default.

### "Painel mostra dados errados"

```bash
cd painel
npm run build    # rebuild
```

Painel é estático — precisa rebuild pra refletir mudanças em filesystem.

### "Como migrar de OMG.sys (versão antiga) pro em5?"

```bash
git pull origin main
npx em5@latest upgrade
# Detecta v1.0 → roda migrations até v1.3
# Backup automático em .em5.v1.0.backup/
```

### "Preciso de servidor pra rodar em5?"

Não. Tudo roda local no seu Mac/Linux. Único custo:
- Anthropic API (Claude Code) — usage-based
- Composio (gateway MCP) — free tier ok pra solo
- Asaas (financeiro BR) — fee transacional

Total estimado solo: $30-150/mês depending volume.

---

## Próximos passos

1. **Instalou e validou?** → Vai operar primeiro cliente
2. **Primeiro cliente operacional?** → Explora `/dia`, `/aprender`, `/painel`
3. **Confiante no fluxo?** → Considera Paperclip pra UI visual ([`docs/INSTALL.md`](INSTALL.md#11-setup-paperclip-opcional-avançado))
4. **Tem padrões repetidos?** → Cria playbook via `/forge playbook`
5. **Sistema precisa nova funcionalidade?** → `/construir "..."` (meta-time)

---

*em5 v1.3.0 — Manual de Uso.*
*Toda dúvida: abre [issue no GitHub](https://github.com/taiancarvalho/agenciaem5/issues) ou consulta o `/saude` pro health check.*
