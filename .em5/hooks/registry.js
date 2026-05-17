// em5 — Unified Hook Registry
// Inspirado em aiox-core (.aiox-core/hooks/unified/hook-registry.js)
// Abstrai hooks de lifecycle pra múltiplos IDEs (Claude Code, Gemini CLI, futuros)
// Gera config IDE-específica de fonte única.

const fs = require('fs');
const path = require('path');

const HOOK_EVENTS = [
  'SessionStart',
  'UserPromptSubmit',
  'PreToolUse',
  'PostToolUse',
  'Stop',
  'SubagentStop',
];

class HookRegistry {
  constructor() {
    this.hooks = new Map();
    HOOK_EVENTS.forEach((e) => this.hooks.set(e, []));
  }

  /**
   * Registra hook abstrato.
   * @param {string} event — um de HOOK_EVENTS
   * @param {object} hook — { matcher?, command, description? }
   */
  register(event, hook) {
    if (!HOOK_EVENTS.includes(event)) {
      throw new Error(`Evento desconhecido: ${event}. Válidos: ${HOOK_EVENTS.join(', ')}`);
    }
    if (!hook.command) throw new Error('Hook precisa de campo `command`');
    this.hooks.get(event).push(hook);
    return this;
  }

  /**
   * Gera config no formato Claude Code (.claude/settings.json `hooks` field).
   */
  toClaudeConfig() {
    const out = {};
    for (const [event, hooks] of this.hooks.entries()) {
      if (hooks.length === 0) continue;
      out[event] = hooks.map((h) => ({
        matcher: h.matcher || '*',
        hooks: [{ type: 'command', command: h.command }],
      }));
    }
    return out;
  }

  /**
   * Gera config no formato Gemini CLI (.gemini/settings.json `hooks` field).
   * Convenção placeholder — ajustar conforme spec Gemini real.
   */
  toGeminiConfig() {
    const out = {};
    for (const [event, hooks] of this.hooks.entries()) {
      if (hooks.length === 0) continue;
      out[event] = hooks.map((h) => ({
        pattern: h.matcher || '*',
        run: h.command,
        description: h.description || '',
      }));
    }
    return out;
  }

  /**
   * Merge no `.claude/settings.json` existente sem sobrescrever outras chaves.
   */
  writeClaudeSettings(settingsPath) {
    const existing = fs.existsSync(settingsPath)
      ? JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
      : {};
    existing.hooks = this.toClaudeConfig();
    fs.writeFileSync(settingsPath, JSON.stringify(existing, null, 2) + '\n');
  }

  /**
   * Lista todos hooks registrados (audit).
   */
  list() {
    const out = [];
    for (const [event, hooks] of this.hooks.entries()) {
      hooks.forEach((h) => out.push({ event, ...h }));
    }
    return out;
  }
}

// Hooks padrão do em5 (definidos centralmente, aplicados em qualquer IDE)
function defaultHooks() {
  const reg = new HookRegistry();

  // Captura learnings após Write (qa veredicto, copy aprovada, relatório, etc.)
  reg.register('PostToolUse', {
    matcher: 'Write',
    command: 'bash .claude/hooks/learnings-capture.sh',
    description: 'Captura padrões em .em5/learnings/{mes}/ (Art. X)',
  });

  // Model tier routing reminder no início da sessão
  reg.register('SessionStart', {
    command: 'bash .claude/hooks/model-router.sh',
    description: 'Mostra model_tier dos agentes (lembrete pra /model switch)',
  });

  return reg;
}

module.exports = { HookRegistry, HOOK_EVENTS, defaultHooks };

// CLI: node .em5/hooks/registry.js [list|apply-claude]
if (require.main === module) {
  const cmd = process.argv[2] || 'list';
  const reg = defaultHooks();

  if (cmd === 'list') {
    console.log('em5 — Hooks registrados:\n');
    reg.list().forEach((h) => {
      console.log(`  [${h.event}] ${h.matcher || '*'} → ${h.command}`);
      if (h.description) console.log(`              ${h.description}`);
    });
  } else if (cmd === 'apply-claude') {
    const settingsPath = path.join(process.cwd(), '.claude/settings.json');
    reg.writeClaudeSettings(settingsPath);
    console.log(`✓ Hooks aplicados em ${settingsPath}`);
  } else {
    console.error(`Comando desconhecido: ${cmd}. Use: list | apply-claude`);
    process.exit(1);
  }
}
