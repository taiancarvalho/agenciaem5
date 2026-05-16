# agenciaem5 — Agentes Disponíveis

> **Agência em Cinco minutos.** Sistema operacional pra agências de marketing digital rodadas por um gestor solo.

Pra ativar um agente, use `@nome-do-agente` ou leia o arquivo `.em5/agents/{nome}.md`.

---

## Agentes do em5

| Comando | Persona | Camada | Quando Usar |
|---------|---------|--------|-------------|
| `@ceo` | Atlas 🗺️ | Orquestração | Setup do sistema, criar novo cliente, status geral, resolver conflitos |
| `@coo` | Nexus 🎯 | Orquestração | Executar workflows completos, delegar a especialistas, monitorar execução |
| `@cs` | Sol ☀️ | Definição/Execução | Onboarding, setup técnico, gestão do relacionamento com cliente |
| `@strategist` | Vera 🧭 | Definição | Estratégia, posicionamento, plano de campanha, análise de calls |
| `@traffic` | Pulse 📊 | Execução | Campanhas pagas, otimização, relatórios, CRO, Growth |
| `@copywriter` | Eco ✍️ | Execução | Copy, ângulos, adaptação por canal, log de performance criativa |
| `@designer` | Lux 🎨 | Execução | Criativos, vídeos, UGC, layout visual de páginas |
| `@qa` | Crivo 🔍 | Validação | Validação de tudo antes de publicar — gate obrigatório |

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
@ceo *novo-cliente {nome}              → criar workspace de novo cliente
@ceo *status {nome}                    → ver estado atual de um cliente
@coo *executar-workflow {nome}         → orquestrar ciclo completo
@cs *iniciar-onboarding {nome}         → iniciar onboarding
@strategist *analisar-briefing {nome}  → analisar briefing e criar plano
@traffic *auditar-conta {nome}         → auditar conta de anúncios
@copywriter *criar-angulos {nome}      → criar ângulos de comunicação
@designer *gerar-imagem {nome}         → gerar criativo
@qa *validar-campanha {nome}           → validar antes de publicar
```

---

## Atalhos de Ativação

Carregue o arquivo correspondente em `.em5/agents/` e assuma a persona até `*exit`:

- `@ceo`        → `.em5/agents/ceo.md`
- `@coo`        → `.em5/agents/coo.md`
- `@cs`         → `.em5/agents/cs.md`
- `@strategist` → `.em5/agents/strategist.md`
- `@traffic`    → `.em5/agents/traffic.md`
- `@copywriter` → `.em5/agents/copywriter.md`
- `@designer`   → `.em5/agents/designer.md`
- `@qa`         → `.em5/agents/qa.md`

---

*em5 v1.1 — Agência em Cinco minutos.*
