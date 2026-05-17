# Workspaces — em5 → Paperclip

## Conceito

Paperclip **workspaces** = pastas filesystem onde agentes operam.
em5 **clientes** = `.em5/clientes/{slug}/`

Mapeamento: **1 cliente em5 = 1 workspace Paperclip**.

## Configuração

### Opção A — Workspace único compartilhado (RECOMENDADO inicial)

Todos 15 agentes apontam `cwd` pro root do em5:

```json
"adapterConfig": {
  "cwd": "/Users/taiancarvalho/Documents/Vibe Coding/AgenciaEm5/.claude/worktrees/affectionate-northcutt-2714b1"
}
```

**Vantagens:**
- Agentes navegam livremente entre clientes
- Constitution, agents/, tasks/ acessíveis a todos
- Filesystem é a única source of truth

**Trade-off:**
- Sem isolamento por cliente (segurança)
- Bom pra solo gestor, ruim pra multi-tenant

### Opção B — Workspace por cliente (futuro multi-tenant)

Cada cliente vira workspace isolado:

```json
"adapterConfig": {
  "cwd": "/Users/taiancarvalho/Documents/Vibe Coding/AgenciaEm5/.../em5/clientes/clinica-x"
}
```

**Vantagens:**
- Isolamento real
- Auditoria por cliente
- Multi-user com permissões granulares

**Trade-off:**
- Agente precisa ter cópia de constitution, agents/, tasks/
- Mais complexo, manutenção 10x

**Decisão:** começar com **A**. Migrar pra B só se virar multi-tenant real.

## Setup inicial Paperclip workspaces

Via UI:
- Settings → Workspaces
- "Add Workspace"
- Name: `agencia-em5-root`
- Path: `/Users/taiancarvalho/Documents/Vibe Coding/AgenciaEm5/.claude/worktrees/affectionate-northcutt-2714b1`
- Permissions: `read+write+execute` (todos agentes em5 precisam)

## Browser de arquivos no UI

Paperclip mostra estrutura de pasta no UI:
- Sidebar esquerda: arquivos/pastas
- Click em arquivo → preview
- Click em diretório → expande

Pro caso em5:
- Vê `.em5/clientes/{slug}/relatorios/` direto na UI
- Abre relatórios sem precisar Finder
- Edita arquivos via UI editor embutido

**Exatamente o que você pediu** ("posso clicar na pasta e ver os relatórios sem ter que buscar no meu sistema").

## Cliente novo no fluxo Paperclip

Quando criar cliente novo em5:

1. UI Paperclip → Issues → "Create Issue"
2. Title: `Cliente novo: clinica-z`
3. Assignee: Atlas (CEO)
4. Atlas heartbeat acorda → delega pra Sol
5. Sol executa `claude /cliente-novo clinica-z` (via Claude Code adapter)
6. Filesystem ganha `.em5/clientes/clinica-z/`
7. Paperclip UI auto-detecta nova pasta no workspace
8. Sidebar mostra cliente novo
9. Sol cria sub-issue: "DESIGN.md cliente clinica-z"
10. Lux pega sub-issue → `/extrair-design clinica-z {url}`
11. UI mostra preview.html quando pronto

## Workflow de relatório

Cliente pede relatório semanal:

1. UI → Issues → "Relatório clinica-z" → Pulse
2. Pulse heartbeat acorda → executa via Composio Meta Ads
3. Salva em `.em5/clientes/clinica-z/relatorios/2026-05-17.md`
4. Marca issue como `in_review`
5. Crivo pega → valida
6. Crivo aprova → marca `done`
7. Sol pega → envia via Composio Gmail OR @whats Onda
8. Issue → `done` final

User vê **tudo isso no UI** em tempo real. Activity log mostra cada passo.
