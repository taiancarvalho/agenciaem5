# AgencyOS — Agentes Disponíveis

Sistema operacional para agências de marketing digital.

Para ativar um agente, use `@nome-do-agente` ou leia o arquivo `.agencyos/agents/{nome}.md`.

---

## Agentes do AgencyOS

| Comando | Persona | Camada | Quando Usar |
|---------|---------|--------|-------------|
| `@agency-master` | Atlas 🗺️ | Orquestração | Setup do sistema, criar novo cliente, status geral, resolver conflitos |
| `@cs` | Sol ☀️ | Definição/Execução | Onboarding, setup técnico, gestão do relacionamento com cliente |
| `@estrategista` | Vera 🎯 | Definição | Estratégia, posicionamento, plano de campanha, análise de calls |
| `@gestor-trafego` | Max 📊 | Execução | Campanhas pagas, otimização, relatórios, CRO, Growth |
| `@copywriter` | Cal ✍️ | Execução | Copy, ângulos, adaptação por canal, log de performance criativa |
| `@designer` | Lux 🎨 | Execução | Criativos, vídeos, UGC, layout visual de páginas |
| `@qa-campanha` | Zara 🔍 | Validação | Validação de tudo antes de publicar — gate obrigatório |

---

## Fluxo Principal

```
@cs *iniciar-onboarding {cliente}
  ↓
@cs *setup-tecnico {cliente}
  ↓
@estrategista *analisar-briefing {cliente}
  ↓
@gestor-trafego *auditar-conta {cliente}
  ↓
@copywriter *criar-angulos {cliente}  +  @designer *ler-branding {cliente}
  ↓
@qa-campanha *validar-campanha {cliente}
  ↓
@gestor-trafego (publicar)
  ↓
@cs *enviar-relatorio {cliente}
```

---

## Comandos Rápidos

```
@agency-master *novo-cliente {nome}         → criar workspace de novo cliente
@agency-master *status {nome}               → ver estado atual de um cliente
@cs *iniciar-onboarding {nome}              → iniciar onboarding
@estrategista *analisar-briefing {nome}     → analisar briefing e criar plano
@gestor-trafego *auditar-conta {nome}       → auditar conta de anúncios
@copywriter *criar-angulos {nome}           → criar ângulos de comunicação
@designer *gerar-imagem {nome}              → gerar criativo
@qa-campanha *validar-campanha {nome}       → validar antes de publicar
```

---

## Atalhos de Ativação

Carregue o arquivo correspondente em `.agencyos/agents/` e assuma a persona até `*exit`:

- `@agency-master` → `.agencyos/agents/agency-master.md`
- `@cs`            → `.agencyos/agents/cs.md`
- `@estrategista`  → `.agencyos/agents/estrategista.md`
- `@gestor-trafego`→ `.agencyos/agents/gestor-trafego.md`
- `@copywriter`    → `.agencyos/agents/copywriter.md`
- `@designer`      → `.agencyos/agents/designer.md`
- `@qa-campanha`   → `.agencyos/agents/qa-campanha.md`

---

*AgencyOS v1.0 — Sistema Operacional para Agências de Marketing Digital*
