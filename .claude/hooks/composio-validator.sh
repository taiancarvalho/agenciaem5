#!/usr/bin/env bash
# em5 — Composio token validator (SessionStart hook)
# Verifica status de toolkits Composio críticos na abertura da sessão.
# Endpoint: GET /api/v3/connected_accounts (header x-api-key)
# Política: WARNING-ONLY — nunca bloqueia a sessão (exit 0 sempre).

set -u  # erro em vars não definidas; sem -e pra continuar mesmo se curl falhar

# Toolkits considerados críticos pra operação em5
CRITICAL=("meta_ads" "facebook" "instagram" "gmail" "googleads" "google_analytics")

# Sem API key configurada: pula silenciosamente (ambiente dev/install limpo)
if [[ -z "${COMPOSIO_API_KEY:-}" ]]; then
  exit 0
fi

# Requer curl + jq disponíveis
if ! command -v curl >/dev/null 2>&1 || ! command -v jq >/dev/null 2>&1; then
  echo "⚠️  em5 · composio-validator: curl ou jq ausente — pulando check."
  exit 0
fi

API_BASE="${COMPOSIO_API_BASE:-https://backend.composio.dev}"
TIMEOUT_SECS=5

# Tenta listar connected accounts ativos
response=$(curl -sS --max-time "$TIMEOUT_SECS" \
  -H "x-api-key: $COMPOSIO_API_KEY" \
  -H "accept: application/json" \
  "$API_BASE/api/v3/connected_accounts?statuses=ACTIVE" 2>/dev/null || echo "")

if [[ -z "$response" ]]; then
  echo "⚠️  em5 · composio-validator: API Composio inacessível (timeout ${TIMEOUT_SECS}s). Tokens não verificados."
  exit 0
fi

# Extrai toolkits com status != ACTIVE (compatível com formato v3)
# response pode ser { items: [...] } ou { data: [...] } — tenta ambos
active_toolkits=$(echo "$response" | jq -r '
  (.items // .data // [])
  | map(select(.status == "ACTIVE"))
  | map(.toolkit.slug // .toolkit_slug // .appName // "")
  | unique
  | .[]
' 2>/dev/null || true)

WARNINGS=()
for tk in "${CRITICAL[@]}"; do
  if ! echo "$active_toolkits" | grep -qi "^${tk}$"; then
    WARNINGS+=("⚠️  $tk: não encontrado em accounts ACTIVE — reconectar em composio.dev")
  fi
done

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo ""
  echo "🚨 em5 · Composio token check"
  printf '   %s\n' "${WARNINGS[@]}"
  echo "   (em5 segue normalmente — esses toolkits precisarão de OAuth/refresh antes de usar)"
  echo ""
fi

exit 0
