# OMG.sys — One Man Gang

> Sistema Operacional para Agência de Marketing Digital.
> Instale em qualquer projeto e opere com 8 agentes especializados via Claude Code.

---

## O que é

OMG.sys é um framework operacional que transforma qualquer pasta em uma agência de marketing digital funcionando com agentes Claude Code especializados.

**Você → @ceo → @coo → agentes → arquivos → @qa → cliente**

Cada agente tem um papel fixo, opera por arquivos e passa handoffs via documentos — não por conversa.

---

## Instalação

```bash
npx omgsys-core@latest install
```

Ou clone e configure manualmente:

```bash
git clone https://github.com/taiancarvalho/AgencyOS.git minha-agencia
cd minha-agencia
# Abra no Claude Code e digite:
/setup
```

---

## Agentes

| ID | Fantasy Name | Papel |
|----|-------------|-------|
| @ceo | Atlas | Estratégia da agência, decisões de negócio |
| @coo | Marcos | Orquestrador operacional, workflows |
| @cs | Sol | Customer Success, onboarding, relatórios |
| @strategist | Vera | Estratégia de marketing, posicionamento |
| @traffic | Max | Mídia paga, campanhas, otimização |
| @copywriter | Cal | Copy, ângulos, adaptação por canal |
| @designer | Lux | Criativos visuais, vídeos, UGC |
| @qa | Zara | Validação obrigatória antes de publicar |

Cada ID funciona como `@ceo` ou pelo nome fantasia configurado (`@Atlas`).
Configure nomes personalizados no `/setup`.

---

## Fluxo Padrão

```
Você
 └→ @ceo — traduz intenção estratégica
     └→ @coo — lê workflow, delega com contexto mínimo
         ├→ @strategist — plano estratégico
         ├→ @traffic — estrutura e sobe campanhas
         ├→ @copywriter — copy e ângulos
         ├→ @designer — criativos visuais
         └→ @qa — valida tudo antes de publicar
              └→ @cs — envia ao cliente
```

---

## Skills (Slash Commands)

| Skill | O que faz |
|-------|-----------|
| `/setup` | Configurar o sistema pela primeira vez |
| `/novo-cliente` | Criar workspace de novo cliente |
| `/onboarding` | Iniciar onboarding de cliente |
| `/status-cliente` | Resumo operacional de um cliente |
| `/relatorio` | Gerar e enviar relatório de performance |
| `/criar-campanha` | Ciclo completo de campanha ponta a ponta |
| `/auditoria-conta` | Auditar conta Meta ou Google Ads |
| `/iterar-criativo` | Iterar criativos com baixa performance |
| `/briefing` | Coletar briefing estruturado |
| `/saude-sistema` | Health check completo |

---

## Integrações Externas

Todas as integrações passam pelo **Composio MCP** (Artigo IX da Constituição):

- Meta Ads
- Google Analytics / Google Ads
- Gmail
- Slack
- Google Sheets

Se não souber os parâmetros: consulte **Context7** antes de executar.

---

## Estrutura do Projeto

```
.omgsys/
├── agents/          ← 8 agentes completos (personas, comandos, dependências)
├── core/
│   ├── constitution.md
│   ├── tasks/       ← 53+ tasks distribuídas em 8 pastas de agente
│   ├── data/        ← 8 arquivos de dados (KPIs, estruturas, nomenclaturas)
│   ├── workflows/   ← 6 workflows (onboarding, ciclo-campanha, google-ads, social-media, lancamento, iteracao-criativa)
│   ├── templates/   ← templates de briefing, copy, relatorios, contratos
│   └── checklists/  ← checklists operacionais
├── setup/           ← wizard de configuração inicial
├── rules/           ← regras de autoridade, handoff e execução
└── clientes/        ← workspace por cliente

.claude/
├── CLAUDE.md        ← entry point do sistema
├── settings.json    ← Composio + Context7 MCPs
├── agents/          ← 8 wrappers leves (apontam para .omgsys/agents/)
└── commands/        ← 10 skills operacionais

omgsys-config.yaml   ← configuração da agência (gerado pelo /setup)
```

---

## Primeira Vez

1. Abra o projeto no Claude Code
2. Digite `/setup` para configurar sua agência
3. Crie seu primeiro cliente: `/novo-cliente {nome}`
4. Inicie o onboarding: `/onboarding {nome}`
5. Ou fale diretamente com o CEO: `@ceo`

---

## Princípios

1. **Filesystem First:** Tudo é arquivo, arquivo tem lugar previsível
2. **1 Agente = 1 Papel:** Cada agente conhece seu domínio e seus limites
3. **Artefatos sobre Conversa:** Handoffs acontecem por documento, não por diálogo
4. **Contexto Reduzido:** Executor carrega apenas o que precisa para a task
5. **QA Gate Obrigatório:** Nada vai ao cliente sem veredicto APROVADO do @qa
6. **Composio como Gateway:** Todas as integrações externas passam pelo Composio MCP

---

## Regra Fundamental

> **Nada vai ao cliente sem veredicto APROVADO do @qa.**
> QA não aprova por pressão. BLOQUEADO significa bloqueado.

---

*OMG.sys v1.0 — One Man Gang*
