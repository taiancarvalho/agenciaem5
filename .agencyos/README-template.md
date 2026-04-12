# AgencyOS

> Sistema Operacional para Agencias de Marketing Digital

Framework operacional baseado em agentes de IA para gerenciar toda operacao de uma agencia de marketing — do onboarding do cliente a entrega de relatorios.

## O que e

AgencyOS e um conjunto de **agentes especializados**, ** tasks executaveis**, **templates**, **workflows** e **checklists** que transformam a operacao de marketing em processo padronizado e replicavel.

**Nao e SaaS. Nao e ferramenta.** E um framework que roda dentro do seu projeto via Claude Code (ou qualquer ambiente compativel com agentes).

## Instalacao

```bash
npx agencyos-core@latest install
```

Ou copie `.agencyos/` para seu projeto manualmente.

## Agentes

| Agente | Persona | Responsabilidade |
|--------|---------|-----------------|
| @agency-master | Atlas 🗺️ | Orquestracao, setup, health check |
| @cs | Sol ☀️ | Onboarding, setup tecnico, gestao do cliente |
| @estrategista | Vera 🎯 | Estrategia, posicionamento, plano de campanha |
| @gestor-trafego | Max 📊 | Midia paga, campanha, otimizacao |
| @copywriter | Cal ✍️ | Copy, angulos, adaptacao por canal |
| @designer | Lux 🎨 | Criativos visuais, videos, UGC |
| @qa-campanha | Zara 🔍 | Validacao antes de publicar |

## Como Usar

### 1. Criar workspace de cliente

```bash
node .agencyos/bin/agency-os-new-client.js nome-do-cliente
```

### 2. Iniciar operacao

```
@cs *iniciar-onboarding nome-do-cliente
```

### 3. Flu

```
Onboarding (CS) → Estrategia (Vera) → Trafego + Copy + Design → QA (Zara) → Publicacao
```

## Estrutura

```
.agencyos/
├── agents/          # Definições dos 7 agentes
├── core/
│   ├── constitution.md    # Principios inegociaveis
│   ├── tasks/      # Tasks executaveis por agente
│   ├── templates/  # Templates de documentos
│   ├── data/       # Dados de referencia
│   ├── workflows/  # Workflows multi-agent
│   └── checklists/ # Checklists de validação
├── clientes/       # Workspaces dos clientes
│   └── _template/  # Template base
└── bin/            # Scripts auxiliares
```

## Principios

1. **Filesystem First:** Tudo e arquivo, arquivo tem lugar previsivel
2. **Agente = Papel, Task = Execucao:** 1 agente = 1 dominio responsabilidade
3. **Artefatos sobre Conversa:** Agentes se conectam por arquivos, nao por dialogo
4. **Contexto Reduzido:** Executor so carrega que precisa
5. **QA Gate Obrigatorio:** Nada vai para o cliente sem validacao

## Integracoes

- **UGC Creator (WaveSpeed AI):** Geracao de conteudo UGC fotorrealista
- **Avora Skills Library:** Biblioteca de skills de marketing e vendas
- **Meta Ads MCP:** Operacao real de campanhas (opcional)

## License

MIT
