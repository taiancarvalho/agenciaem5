# AgencyOS

> Framework Operacional NATIVO para OpenClaw (Agências de Marketing Digital)

Um framework baseado em múltiplos agentes de IA desenhado para gerenciar e executar rotinas de uma agência de marketing — desde o onboarding até a entrega de relatórios e otimização de tráfego.

## O que é

AgencyOS é um conjunto de **Agentes Especialistas**, **Skills (ações executáveis)**, **Templates**, **Workflows** e **Checklists** que transformam a operação de marketing em um processo padronizado e escalável.

**Não é SaaS. Não é um prompt simples.** É uma infraestrutura de múltiplos agentes que opera usando o poder de roteamento do **OpenClaw Gateway**.

## Como funciona (A Arquitetura de 3 Camadas)

O sistema distribui a responsabilidade baseada na especialização, mantendo contexto reduzido e hiper-foco para cada IA:

| Agente | Persona | Responsabilidade |
|--------|---------|-----------------|
| `isis` | ISIS 🜂 | Orquestração, orquestração da raiz, setup, health check |
| `cs` | Sol ☀️ | Definição: Onboarding, setup técnico, gestão do cliente |
| `estrategista` | Vera 🎯 | Definição: Estratégia, posicionamento, plano de campanha |
| `gestor-trafego` | Max 📊 | Execução: Tráfego pago, otimização, relatórios |
| `copywriter` | Cal ✍️ | Execução: Copy, ângulos, adaptação por canal |
| `designer` | Lux 🎨 | Execução: Criativos visuais, vídeos, geração UGC |
| `qa-campanha` | Zara 🔍 | Validação: Validação pré-publicação (Gatekeeper) |

## Skills (O Coração da Operação)

Os agentes não operam no escuro. Eles usam **Skills** (localizadas na pasta `/skills/`) para executar rotinas pré-programadas, como:
- `coletar-briefing`
- `auditar-conta`
- `criar-angulos`
- `validar-copy`

*(Consulte o BUILD-PLAN.md e BUILD-GUIDE.md para a lista completa e guia de desenvolvimento).*
