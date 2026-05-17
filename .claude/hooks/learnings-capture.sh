#!/usr/bin/env bash
# em5 — learnings-capture hook
# Dispara em PostToolUse (Write). Detecta arquivos relevantes + append em learnings.
# Configurado via .em5/hooks/registry.js → apply-claude.

set -euo pipefail

# Claude Code injeta JSON via stdin:
# { "tool_input": {"file_path": "..."}, "tool_response": {...} }

INPUT=$(cat)

# Extrai file_path do JSON sem jq (usa grep + sed pra portabilidade)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/' || echo "")

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Mês atual pra organizar learnings
MES=$(date +%Y-%m)
LEARNINGS_DIR=".em5/learnings/${MES}"
mkdir -p "$LEARNINGS_DIR"

DATA_HUMANA=$(date '+%Y-%m-%d %H:%M')

# Padrões pra detectar
case "$FILE_PATH" in
  *qa*BLOQUEADO*|*qa*bloqueio*)
    echo "## ${DATA_HUMANA} — QA Bloqueio detectado" >> "${LEARNINGS_DIR}/qa-bloqueios.md"
    echo "- Arquivo: ${FILE_PATH}" >> "${LEARNINGS_DIR}/qa-bloqueios.md"
    echo "" >> "${LEARNINGS_DIR}/qa-bloqueios.md"
    ;;
  *clientes/*/copy/*aprovado*)
    echo "## ${DATA_HUMANA} — Copy aprovada" >> "${LEARNINGS_DIR}/copy-vitorias.md"
    echo "- Arquivo: ${FILE_PATH}" >> "${LEARNINGS_DIR}/copy-vitorias.md"
    echo "" >> "${LEARNINGS_DIR}/copy-vitorias.md"
    ;;
  *clientes/*/trafego/*relatorio*)
    echo "## ${DATA_HUMANA} — Relatório tráfego salvo" >> "${LEARNINGS_DIR}/traffic-padroes.md"
    echo "- Arquivo: ${FILE_PATH}" >> "${LEARNINGS_DIR}/traffic-padroes.md"
    echo "" >> "${LEARNINGS_DIR}/traffic-padroes.md"
    ;;
  *prospects/*/aceite*|*clientes/*/onboarding/*)
    echo "## ${DATA_HUMANA} — Cliente novo / aceite" >> "${LEARNINGS_DIR}/cs-objecoes.md"
    echo "- Arquivo: ${FILE_PATH}" >> "${LEARNINGS_DIR}/cs-objecoes.md"
    echo "" >> "${LEARNINGS_DIR}/cs-objecoes.md"
    ;;
  *integracoes/*|*mcp-excecoes*)
    echo "## ${DATA_HUMANA} — Operação MCP excecional" >> "${LEARNINGS_DIR}/mcp-excecoes.md"
    echo "- Arquivo: ${FILE_PATH}" >> "${LEARNINGS_DIR}/mcp-excecoes.md"
    echo "" >> "${LEARNINGS_DIR}/mcp-excecoes.md"
    ;;
esac

# Sempre exit 0 — hook não bloqueia operação
exit 0
