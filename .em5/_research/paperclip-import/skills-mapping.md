# Skills Mapping — em5 → Paperclip

## em5 skills (19 atuais) → ações Paperclip

Skills em5 são markdown em `.claude/commands/`. Paperclip tem skill library separada.

3 caminhos pra portar:

### Caminho A — Skills viram **issue templates**
Cada skill em5 = template de issue que cria sub-tasks automaticamente.

Exemplo:
- `/cliente-novo clinica-z` → cria issue parent "Onboarding cliente clinica-z"
  - Sub-issue: "Criar workspace filesystem" → Sol
  - Sub-issue: "Extrair DESIGN.md" → Lux
  - Sub-issue: "Cadastrar Asaas" → Caixa
  - Sub-issue: "Briefing inicial WhatsApp" → Onda

### Caminho B — Skills viram **Paperclip skills custom**
Usa skill creator API do Paperclip. Cada skill em5 vira plugin.

Exemplo `paperclip-em5-cliente-novo`:
```yaml
name: em5-cliente-novo
description: Cria workspace cliente em5 + delega onboarding
adapter: claude_local
script: bash .em5/bin/cliente-novo.sh {slug}
```

### Caminho C — Skills permanecem em `.claude/commands/` no em5
Paperclip orquestra via heartbeat. Agente Claude Code (`claude_local` adapter) tem acesso ao `.claude/commands/` no `cwd`.

**Mais simples** — zero migração. Skills continuam funcionando.

**Recomendação:** **C** pra começar. B/A só se Paperclip exigir.

## Tabela de mapeamento

| em5 skill | Agente owner | Frequência | Mapeamento Paperclip |
|-----------|--------------|------------|---------------------|
| `/setup` | Atlas | 1x | Issue template "Setup inicial" |
| `/cliente-novo` | Atlas → Sol | Por demanda | Issue parent → sub-issues |
| `/onboard` | Sol | Por demanda | Sub-issue |
| `/briefing` | Sol → Vera | Por demanda | Sub-issue |
| `/campanha` | Nexus orchestrate | Por demanda | Issue parent → workflow |
| `/auditar` | Pulse | Por demanda | Single issue → Pulse |
| `/iterar` | Pulse + Eco + Lux | Loop | Workflow recorrente |
| `/relatorio` | Pulse → Crivo → Sol | Semanal | Heartbeat schedule (Pulse weekly) |
| `/status` | Atlas | Sob demanda | UI dashboard nativo Paperclip |
| `/saude` | Atlas | Sob demanda | UI health check Paperclip |
| `/dia` | Nexus orchestrate | Daily | Heartbeat schedule diário |
| `/aprender` | Vera | Sob demanda | Query API `.em5/learnings/` |
| `/forge` | Arq+Builder+Lima | Sob demanda | Issue workflow meta-time |
| `/construir` | Arq+Builder+Lima | Sob demanda | Issue parent → 3 sub-issues |
| `/extrair-design` | Lux | Sob demanda | Sub-issue extraction |
| `/importar-gpt` | Arq | Sob demanda | Issue template "Import customGPT" |
| `/override` | role-specific | Crítico | Approval workflow nativo |
| `/validate-em5` | (CI) | Pre-commit | GitHub Actions ou Paperclip pre-issue check |
| `/whats-setup` | Onda | 1x setup | Issue template |
| `/painel` | (UI) | N/A | **Substituído pelo UI Paperclip** |

## Substituições

Skills que Paperclip **substitui nativamente**:

- ❌ `/painel` → Paperclip UI tem dashboard, KPIs, cards de cliente
- ❌ `/status` → UI mostra status em tempo real
- ❌ `/saude` → UI health page nativa
- ❌ `/override` → Approval workflow embutido

Skills que Paperclip **complementa**:

- ✅ `/dia` — Paperclip schedule heartbeat diário em Nexus
- ✅ `/relatorio` — heartbeat semanal Pulse
- ✅ `/construir` — workflow meta-time vira issue tree

Skills que **permanecem** no em5 (executadas via claude_local adapter):

- `/cliente-novo`, `/extrair-design`, `/campanha`, `/auditar`, `/forge`, `/importar-gpt`, `/briefing`, `/onboard`, `/iterar`, `/aprender`, `/whats-setup`, `/validate-em5`

## Próximos passos

1. Importar agentes (Caminho C — skills onde estão)
2. Criar 1 issue de teste: "Setup inicial"
3. Validar Atlas pega, delega, executa
4. Se OK → migrar progressivamente pra Caminho B (skills nativas Paperclip) conforme valor justifica
