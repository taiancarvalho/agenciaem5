#!/usr/bin/env bash
# em5 — model-router hook
# Dispara em SessionStart. Apenas DOCUMENTA tier do agente ativo (Claude Code
# não permite injetar model override via hook ainda — convenção informativa).
#
# Roteamento real:
# - User executa /model claude-opus-4-7 quando vai usar @ceo ou @qa (frontier)
# - User executa /model claude-sonnet-4-6 pra @copywriter, @traffic, etc. (balanced)
# - User executa /model claude-haiku-4-5 pra tasks simples (haiku)
#
# Este hook lê model_tier dos agentes + imprime sumário no início da sessão.

set -euo pipefail

AGENTS_DIR=".em5/agents"

if [ ! -d "$AGENTS_DIR" ]; then
  exit 0  # ambiente sem em5
fi

echo ""
echo "📋 em5 Model Tier Routing (lembrete):"
echo ""

# Lista agentes + tier sugerido (grep simples sem yq)
for f in "$AGENTS_DIR"/*.md; do
  [ -f "$f" ] || continue
  AGENT=$(basename "$f" .md)
  TIER=$(grep -m1 'model_tier:' "$f" | sed 's/.*model_tier:[[:space:]]*\([a-z]*\).*/\1/' || echo "balanced")

  case "$TIER" in
    frontier) MODEL="claude-opus-4-7" ;;
    balanced) MODEL="claude-sonnet-4-6" ;;
    haiku)    MODEL="claude-haiku-4-5" ;;
    *)        MODEL="(default)" ;;
  esac

  printf "  @%-12s → %-9s (%s)\n" "$AGENT" "$TIER" "$MODEL"
done

echo ""
echo "Tip: /model {claude-opus-4-7|claude-sonnet-4-6|claude-haiku-4-5} antes de invocar agente crítico."
echo ""

exit 0
