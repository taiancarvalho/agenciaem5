# AgencyOS — Agentes Disponíveis

Sistema operacional para agências de marketing digital.

Para ativar um agente, use `@nome-do-agente` ou leia o arquivo `.omgsys/agents/{nome}.md`.

---

## Agentes do AgencyOS

| Comando | Persona | Camada | Quando Usar |
|---------|---------|--------|-------------|
| `@ceo` | Atlas 🗺️ | Orquestração | Setup do sistema, criar novo cliente, status geral, resolver conflitos |
| `@cs` | Sol ☀️ | Definição/Execução | Onboarding, setup técnico, gestão do relacionamento com cliente |
| `@strategist` | Vera 🎯 | Definição | Estratégia, posicionamento, plano de campanha, análise de calls |
| `@traffic` | Max 📊 | Execução | Campanhas pagas, otimização, relatórios, CRO, Growth |
| `@copywriter` | Cal ✍️ | Execução | Copy, ângulos, adaptação por canal, log de performance criativa |
| `@designer` | Lux 🎨 | Execução | Criativos, vídeos, UGC, layout visual de páginas |
| `@qa` | Zara 🔍 | Validação | Validação de tudo antes de publicar — gate obrigatório |

---

## Fluxo Principal

```
@cs *iniciar-onboarding {cliente}
  ↓
@cs *setup-tecnico {cliente}
  ↓
@strategist *analisar-briefing {cliente}
  ↓
@traffic *auditar-conta {cliente}
  ↓
@copywriter *criar-angulos {cliente}  +  @designer *ler-branding {cliente}
  ↓
@qa *validar-campanha {cliente}
  ↓
@traffic (publicar)
  ↓
@cs *enviar-relatorio {cliente}
```

---

## Comandos Rápidos

```
@ceo *novo-cliente {nome}         → criar workspace de novo cliente
@ceo *status {nome}               → ver estado atual de um cliente
@cs *iniciar-onboarding {nome}              → iniciar onboarding
@strategist *analisar-briefing {nome}     → analisar briefing e criar plano
@traffic *auditar-conta {nome}       → auditar conta de anúncios
@copywriter *criar-angulos {nome}           → criar ângulos de comunicação
@designer *gerar-imagem {nome}              → gerar criativo
@qa *validar-campanha {nome}       → validar antes de publicar
```

---

## Atalhos de Ativação

Carregue o arquivo correspondente em `.omgsys/agents/` e assuma a persona até `*exit`:

- `@ceo` → `.omgsys/agents/ceo.md`
- `@cs`            → `.omgsys/agents/cs.md`
- `@strategist`  → `.omgsys/agents/strategist.md`
- `@traffic`→ `.omgsys/agents/traffic.md`
- `@copywriter`    → `.omgsys/agents/copywriter.md`
- `@designer`      → `.omgsys/agents/designer.md`
- `@qa`   → `.omgsys/agents/qa.md`

---

*AgencyOS v1.0 — Sistema Operacional para Agências de Marketing Digital*
