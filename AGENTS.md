# AgencyOS — Sistema de Agentes em 3 Camadas

Este arquivo é lido automaticamente pelo Claude Code. Ative um agente lendo o arquivo em `.agencyos/agents/{id}.md`.

---

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────┐
│         CAMADA 1 — ESTRATÉGICA              │
│   @agency-master  (Atlas 🗺️)                │
│   CEO — Parceiro estratégico do dono        │
└──────────────────┬──────────────────────────┘
                   │ delega operações
┌──────────────────▼──────────────────────────┐
│         CAMADA 2 — TÁTICA                   │
│   @gerente  (Marcos 🎯)                     │
│   COO — Lê SOPs, sequencia, delega          │
└──┬──────┬───────┬──────┬───────┬────────────┘
   │      │       │      │       │
┌──▼──┐ ┌─▼──┐ ┌──▼─┐ ┌─▼──┐ ┌──▼──┐ ┌──────┐
│ CS  │ │Est │ │Max │ │Cal │ │ Lux │ │ Zara │
│☀️   │ │🎯  │ │📊  │ │✍️  │ │ 🎨  │ │  🔍  │
└─────┘ └────┘ └────┘ └────┘ └─────┘ └──────┘
│         CAMADA 3 — OPERACIONAL              │
└─────────────────────────────────────────────┘
```

---

## Camada 1 — Estratégica

### `@agency-master` — Atlas 🗺️

**Leia:** `.agencyos/agents/agency-master.md`

**Quando usar:**
- Falar sobre estratégia do negócio, crescimento da agência, OKRs
- Fazer análise do portfólio de clientes
- Tomar decisões de posicionamento da agência
- Quando precisar de um parceiro para pensar, não apenas executar
- Quando um problema não tem solução nos workflows existentes

**NÃO usar para:**
- Executar tarefas operacionais diretamente → use `@gerente`
- Onboarding, copy, design, tráfego → use os operacionais via gerente

---

## Camada 2 — Tática

### `@gerente` — Marcos 🎯

**Leia:** `.agencyos/agents/gerente.md`

**Quando usar:**
- Executar qualquer operação que envolva mais de um agente
- "Quero análise de tráfego do cliente X" → CEO fala, gerente executa
- "Lance a campanha do cliente Y" → gerente orquestra tudo
- "Faça o onboarding do cliente Z" → gerente sequencia CS → Estrategista
- Quando você sabe o QUE fazer mas não quer orquestrar o COMO

**Fluxo padrão via gerente:**
```
Você → @gerente *executar-workflow {workflow} {cliente}
Gerente lê SOP → aciona agentes em ordem → reporta conclusão
```

**NÃO usar para:**
- Decisões estratégicas do negócio → use `@agency-master`
- Tarefas isoladas de um único agente → chame o operacional diretamente

---

## Camada 3 — Operacional

Use os agentes operacionais diretamente quando a tarefa for isolada e você já sabe exatamente o que precisa.

### `@cs` — Sol ☀️
**Leia:** `.agencyos/agents/cs.md`
- Onboarding, setup técnico, gestão diária, relatórios ao cliente
- Quando: `*iniciar-onboarding`, `*setup-tecnico`, `*enviar-relatorio`

### `@estrategista` — Vera 🎯
**Leia:** `.agencyos/agents/estrategista.md`
- Estratégia, posicionamento, plano de campanha, análise de calls de vendas
- Quando: `*analisar-briefing`, `*criar-plano-estrategico`, `*modo-vendas`

### `@gestor-trafego` — Max 📊
**Leia:** `.agencyos/agents/gestor-trafego.md`
- Mídia paga, auditoria de contas, otimização, relatórios de performance
- Quando: `*auditar-conta`, `*subir-estrutura-inicial`, `*monitorar`, `*modo-growth`

### `@copywriter` — Cal ✍️
**Leia:** `.agencyos/agents/copywriter.md`
- Copy, ângulos, adaptação por canal, performance criativa
- Quando: `*criar-angulos`, `*escrever-copy`, `*iterar`

### `@designer` — Lux 🎨
**Leia:** `.agencyos/agents/designer.md`
- Criativos, vídeos, UGC, landing pages, identidade visual
- Quando: `*gerar-imagem`, `*gerar-video`, `*gerar-ugc`

### `@qa-campanha` — Zara 🔍
**Leia:** `.agencyos/agents/qa-campanha.md`
- Validação obrigatória antes de qualquer publicação
- Quando: `*validar-campanha`, `*validar-copy`, `*validar-criativo`
- **REGRA:** Nada vai para o cliente sem veredicto APROVADO da Zara

---

## Fluxos de Uso Mais Comuns

### Análise de Tráfego de Cliente
```
Você: "quero análise de tráfego do cliente X"
→ @agency-master: recebe, delega para @gerente
→ @gerente *analise-trafego {cliente}
   → aciona @gestor-trafego *auditar-conta {cliente}
   → aciona @gestor-trafego *gerar-relatorio {cliente}
   → aciona @cs *enviar-relatorio {cliente}
   → reporta resultado para CEO
```

### Lançamento de Campanha
```
Você: "lance a campanha do cliente Y"
→ @gerente *lancar-campanha {cliente}
   → @estrategista (se plano não existe ainda)
   → @gestor-trafego *auditar-conta + *solicitar-criativos
   → @copywriter + @designer (em paralelo)
   → @qa-campanha *validar-campanha
   → @gestor-trafego *subir-estrutura-inicial
   → @cs *enviar-relatorio
```

### Novo Cliente
```
Você: "*new-client {nome}" (via @agency-master ou @gerente)
→ @agency-master: cria pasta e estrutura
→ @gerente *onboarding {cliente}
   → @cs *iniciar-onboarding
   → @cs *setup-tecnico
   → @estrategista *analisar-briefing
```

---

## Regras do Sistema

1. **CEO pensa, Gerente executa, Operacionais entregam**
2. **Nada publica sem QA** — Zara é a última linha antes de qualquer publicação
3. **Relatório ao cliente sempre via CS** — Max nunca fala direto com o cliente
4. **Todos os handoffs via arquivo** — resultados salvos em `.agencyos/clientes/{nome}/`
5. **Contexto mínimo em cada delegação** — não sobrecarregar agentes com histórico

---

## Estrutura de Arquivos do Sistema

```
.agencyos/
├── agents/        — Definições dos 8 agentes (incluindo @gerente)
├── core/
│   ├── tasks/     — 52 tasks executáveis (49 + 3 do gerente)
│   ├── templates/ — 14 templates de documentos
│   ├── workflows/ — 3 workflows YAML + ciclos de delegação
│   ├── data/      — 5 arquivos de configuração
│   └── checklists/— 3 checklists de validação
├── rules/         — Constitution + autoridade + handoffs
└── clientes/      — Workspace de cada cliente
```

---

*AgencyOS v1.1 — Sistema Operacional para Agências de Marketing Digital*
*3-Layer Agent Architecture: Strategic → Tactical → Operational*
