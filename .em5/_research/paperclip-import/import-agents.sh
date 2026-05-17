#!/usr/bin/env bash
# em5 → Paperclip — Import dos 15 agentes via API
# Pré-req: PAPERCLIP_API_URL, PAPERCLIP_API_KEY, PAPERCLIP_COMPANY_ID setados
# Pré-req: jq instalado
# Pré-req: pasta em5 absoluta em EM5_ROOT

set -euo pipefail

: "${PAPERCLIP_API_URL:?PAPERCLIP_API_URL não setada}"
: "${PAPERCLIP_API_KEY:?PAPERCLIP_API_KEY não setada}"
: "${PAPERCLIP_COMPANY_ID:?PAPERCLIP_COMPANY_ID não setada}"

EM5_ROOT="${EM5_ROOT:-$HOME/Documents/Vibe Coding/AgenciaEm5/.claude/worktrees/affectionate-northcutt-2714b1}"

if [ ! -d "$EM5_ROOT" ]; then
  echo "❌ EM5_ROOT não existe: $EM5_ROOT"
  exit 1
fi

ROSTER=".em5/_research/paperclip-import/agents-roster.json"
if [ ! -f "$EM5_ROOT/$ROSTER" ]; then
  echo "❌ Roster não encontrado: $EM5_ROOT/$ROSTER"
  exit 1
fi

echo "🔥 em5 → Paperclip Import"
echo ""
echo "  API: $PAPERCLIP_API_URL"
echo "  Company: $PAPERCLIP_COMPANY_ID"
echo "  em5 root: $EM5_ROOT"
echo ""

# Cache de IDs criados (nome → id) pra resolver reportsTo
declare -A AGENT_IDS

import_agent() {
  local agent_json="$1"

  local name=$(echo "$agent_json" | jq -r '.name')
  local role=$(echo "$agent_json" | jq -r '.role')
  local title=$(echo "$agent_json" | jq -r '.title')
  local icon=$(echo "$agent_json" | jq -r '.icon')
  local reports_to_name=$(echo "$agent_json" | jq -r '.reportsTo // empty')
  local capabilities=$(echo "$agent_json" | jq -r '.capabilities')
  local instructions_source=$(echo "$agent_json" | jq -r '.instructionsBundle_source')

  echo "→ Importando $name ($title)..."

  # Lê AGENTS.md do em5
  local instructions_file="$EM5_ROOT/$instructions_source"
  if [ ! -f "$instructions_file" ]; then
    echo "  ❌ Arquivo source não existe: $instructions_file"
    return 1
  fi
  local instructions=$(cat "$instructions_file" | jq -Rs .)

  # Resolve reportsTo (nome → id)
  local reports_to_id="null"
  if [ -n "$reports_to_name" ] && [ "$reports_to_name" != "null" ]; then
    reports_to_id="\"${AGENT_IDS[$reports_to_name]:-}\""
    if [ "$reports_to_id" = "\"\"" ]; then
      echo "  ❌ Manager '$reports_to_name' ainda não criado (ordem hierárquica errada?)"
      return 1
    fi
  fi

  # Modifica cwd no adapterConfig pra path absoluto
  local adapter_config=$(echo "$agent_json" | jq --arg cwd "$EM5_ROOT" '.adapterConfig.cwd = $cwd | .adapterConfig')
  local runtime_config=$(echo "$agent_json" | jq '.runtimeConfig')

  # Body do POST
  local body=$(jq -n \
    --arg name "$name" \
    --arg role "$role" \
    --arg title "$title" \
    --arg icon "$icon" \
    --argjson reportsTo "$reports_to_id" \
    --arg capabilities "$capabilities" \
    --arg adapterType "$(echo "$agent_json" | jq -r '.adapterType')" \
    --argjson adapterConfig "$adapter_config" \
    --argjson runtimeConfig "$runtime_config" \
    --argjson instructions "$instructions" \
    '{
      name: $name,
      role: $role,
      title: $title,
      icon: $icon,
      reportsTo: $reportsTo,
      capabilities: $capabilities,
      adapterType: $adapterType,
      adapterConfig: $adapterConfig,
      runtimeConfig: $runtimeConfig,
      instructionsBundle: { files: { "AGENTS.md": $instructions } }
    }'
  )

  # POST pro Paperclip
  local response=$(curl -sS -X POST \
    "$PAPERCLIP_API_URL/api/companies/$PAPERCLIP_COMPANY_ID/agent-hires" \
    -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$body")

  local agent_id=$(echo "$response" | jq -r '.id // .agent.id // empty')
  local approval=$(echo "$response" | jq -r '.approval // empty')

  if [ -z "$agent_id" ]; then
    echo "  ❌ Falha:"
    echo "$response" | jq .
    return 1
  fi

  AGENT_IDS["$name"]="$agent_id"
  echo "  ✓ ID: $agent_id"
  if [ -n "$approval" ] && [ "$approval" != "null" ]; then
    echo "  ⏳ Aguardando aprovação no UI (governance ativo)"
  fi
}

# Itera roster em ordem
echo "[1/15] Atlas (CEO)..."
import_agent "$(jq '.agents[0]' "$EM5_ROOT/$ROSTER")"

for i in $(seq 1 14); do
  echo ""
  echo "[$((i+1))/15] $(jq -r ".agents[$i].name" "$EM5_ROOT/$ROSTER")..."
  import_agent "$(jq ".agents[$i]" "$EM5_ROOT/$ROSTER")"
done

echo ""
echo "✅ Import concluído. 15 agentes criados."
echo ""
echo "Próximo passo: aprovar hires no UI Paperclip (se governance ativa)."
echo "URL: $PAPERCLIP_API_URL"
