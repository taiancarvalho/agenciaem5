# em5 → Paperclip Import Pack

> Importa os 15 agentes em5 + workspaces de cliente pra empresa Paperclip "Agência em Cinco".

## Pré-requisitos

- Node.js 20+, pnpm 9+
- Claude Code CLI instalado e autenticado (`claude --version`)
- Conta Composio (`COMPOSIO_API_KEY`)
- Asaas sandbox token (`ASAAS_TOKEN`)

## Passo 1 — Instalar Paperclip

```bash
# Em pasta separada (NÃO no diretório em5):
mkdir ~/paperclip-em5 && cd ~/paperclip-em5
npx paperclipai onboard --yes
# Abre browser em http://localhost:3100
```

Resultado: UI Paperclip rodando, vazio.

## Passo 2 — Criar empresa "Agência em Cinco"

Via UI:
- "Create Company"
- Name: `Agência em Cinco`
- Slug: `agencia-em-cinco`
- Goal: `Operar agência de marketing digital com gestor solo, todos processos em ≤ 5 min de input humano`
- Monthly budget cents: `200000` ($2000 USD em tokens — ajuste depois)
- Skip "Hire CEO" — vamos importar manualmente

## Passo 3 — Setup env vars

```bash
# No diretório Paperclip:
cp ~/Documents/Vibe\ Coding/AgenciaEm5/.claude/worktrees/affectionate-northcutt-2714b1/.em5/_research/paperclip-import/env-template.txt .env
# Edita com seus valores reais
```

## Passo 4 — Extrair API URL + key

Via UI Paperclip:
- Settings → API Keys → "Create API Key"
- Copia key
- Define vars:
  ```bash
  export PAPERCLIP_API_URL=http://localhost:3100
  export PAPERCLIP_API_KEY=pk_xxx
  export PAPERCLIP_COMPANY_ID=$(curl -sS "$PAPERCLIP_API_URL/api/companies" -H "Authorization: Bearer $PAPERCLIP_API_KEY" | jq -r '.[0].id')
  ```

## Passo 5 — Importar agentes

```bash
cd ~/Documents/Vibe\ Coding/AgenciaEm5/.claude/worktrees/affectionate-northcutt-2714b1/.em5/_research/paperclip-import
bash import-agents.sh
```

Script lê `agents-roster.json` e cria os 15 agentes em ordem hierárquica:

1. **Atlas** (CEO) — primeiro, sem `reportsTo`
2. **Nexus** (COO) — reporta a Atlas
3. **Vera, Sol** — reportam a Nexus
4. **Pulse, Eco, Lux** — reportam a Vera
5. **Crivo** — reporta a Atlas (gate independente)
6. **Arq, Builder, Lima** (meta-time) — reportam a Nexus
7. **Caça** (vendas) — reporta a Atlas
8. **Caixa** (fin) — reporta a Atlas
9. **Espia** — reporta a Vera
10. **Onda** (whats) — reporta a Sol

## Passo 6 — Importar workspaces

Workspaces Paperclip = pastas filesystem. Aponta cada agente pra:

- **Working directory:** `~/Documents/Vibe Coding/AgenciaEm5/.claude/worktrees/affectionate-northcutt-2714b1`
- **Cwd compartilhado** pros 15 agentes (todos operam no mesmo em5 root)

Veja `workspaces.md` pra detalhes.

## Passo 7 — Validar

Roda 1 task de cliente fake:

Via UI:
- Issues → "Create Issue"
- Title: `Teste: criar workspace cliente teste-piloto`
- Assignee: `Atlas (CEO)`
- Click "Run heartbeat now"

Atlas deve:
- Acordar via heartbeat
- Ler instructions (do AGENTS.md bundle)
- Delegar pra Nexus
- Nexus delega pra Sol
- Sol executa task em filesystem
- Issue → `done`

Se funcionou: **Paperclip + em5 = OK pra produção solo.**

## Troubleshooting

Ver `troubleshooting.md` (a criar conforme testar).

## Próximos passos pós-validação

1. Plugin Composio (custom): integra MCP toolsets via Paperclip
2. Plugin Asaas (custom): integra MCP exceção
3. Plugin WhatsApp: handoff humano via UI
4. Fork Paperclip → "em5 Edition" se customização passar de 30% do core
5. Multi-empresa: cada cliente em5 vira empresa Paperclip? Ou continuam como workspaces?
