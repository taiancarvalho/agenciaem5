// em5 — Modular Infrastructure
// Inspirado em aiox-core (.aiox-core/infrastructure/index.js)
// Carrega features em5 lazy com safe-require — falha graciosa.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');

function safeRequire(modulePath, name) {
  try {
    return require(modulePath);
  } catch (e) {
    return {
      __unavailable: true,
      __name: name,
      __error: e.message,
    };
  }
}

function fileExists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function loadYAML(rel) {
  if (!fileExists(rel)) return null;
  try {
    const yaml = require('js-yaml');
    return yaml.load(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
  } catch (e) {
    return null;
  }
}

const infrastructure = {
  // Hook Registry — Fase 5.1
  hooks: safeRequire('../hooks/registry.js', 'hooks-registry'),

  // Forge — Fase 2
  forge: {
    available: fileExists('.em5/infra/bin/em5-forge.js'),
    bin: path.join(ROOT, '.em5/infra/bin/em5-forge.js'),
    templates: path.join(ROOT, '.em5/infra/setup/forge-templates'),
  },

  // Gate-Matrix — Fase 3
  gateMatrix: {
    available: fileExists('.em5/system/data/gate-matrix.yaml'),
    config: path.join(ROOT, '.em5/system/data/gate-matrix.yaml'),
    load() {
      return loadYAML('.em5/system/data/gate-matrix.yaml');
    },
  },

  // Learnings — Fase 1.2
  learnings: {
    available: fileExists('.em5/system/learnings/_template.md'),
    root: path.join(ROOT, '.em5/system/learnings'),
    listMonths() {
      if (!this.available) return [];
      return fs.readdirSync(this.root)
        .filter((d) => /^\d{4}-\d{2}$/.test(d))
        .sort()
        .reverse();
    },
    currentMonth() {
      return new Date().toISOString().slice(0, 7);
    },
  },

  // Composio MCP — Art. IX
  composio: {
    available: fileExists('.claude/settings.json'),
    settingsPath: path.join(ROOT, '.claude/settings.json'),
    loadToolsets() {
      if (!this.available) return [];
      try {
        const s = JSON.parse(fs.readFileSync(this.settingsPath, 'utf8'));
        const args = s.mcpServers?.composio?.args || [];
        const idx = args.indexOf('--toolset');
        if (idx === -1) return [];
        return args[idx + 1].split(',').map((t) => t.trim());
      } catch (e) {
        return [];
      }
    },
  },

  // Constitution — fonte de verdade dos artigos
  constitution: {
    available: fileExists('.em5/system/constitution.md'),
    path: path.join(ROOT, '.em5/system/constitution.md'),
    extractArticles() {
      if (!this.available) return [];
      const content = fs.readFileSync(this.path, 'utf8');
      const matches = content.matchAll(/\| (I{1,3}V?X?I?I?) \| ([^|]+) \| (NON-NEGOTIABLE|MUST|SHOULD) \|/g);
      return [...matches].map((m) => ({
        roman: m[1],
        principle: m[2].trim(),
        severity: m[3],
      }));
    },
  },

  // Config da agência
  config: {
    available: fileExists('em5-config.yaml'),
    path: path.join(ROOT, 'em5-config.yaml'),
    load() {
      return loadYAML('em5-config.yaml');
    },
  },

  // Agents — lista declarada
  agents: {
    available: fileExists('.em5/agents'),
    root: path.join(ROOT, '.em5/agents'),
    list() {
      if (!this.available) return [];
      return fs.readdirSync(this.root)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace('.md', ''));
    },
  },

  // PM adapters — futuro (ClickUp/Notion/Linear via Composio)
  pmAdapters: {
    __unavailable: true,
    __reason: 'Fase futura — quando Composio toolsets estiverem ativos',
  },
};

// Health check: relatório do estado
function healthCheck() {
  const out = {
    timestamp: new Date().toISOString(),
    version: require(path.join(ROOT, 'package.json')).version,
    modules: {},
  };

  for (const [name, mod] of Object.entries(infrastructure)) {
    if (mod.__unavailable) {
      out.modules[name] = { status: 'unavailable', reason: mod.__reason || mod.__error };
    } else if (typeof mod.available === 'boolean') {
      out.modules[name] = { status: mod.available ? 'ok' : 'missing' };
    } else {
      out.modules[name] = { status: 'loaded' };
    }
  }

  return out;
}

module.exports = { ...infrastructure, healthCheck, safeRequire, fileExists, loadYAML };

// CLI: node .em5/infra/infrastructure/index.js [health|toolsets|agents|articles]
if (require.main === module) {
  const cmd = process.argv[2] || 'health';
  if (cmd === 'health') {
    console.log(JSON.stringify(healthCheck(), null, 2));
  } else if (cmd === 'toolsets') {
    console.log('Composio toolsets:', infrastructure.composio.loadToolsets());
  } else if (cmd === 'agents') {
    console.log('Agentes:', infrastructure.agents.list());
  } else if (cmd === 'articles') {
    console.log('Constitution articles:');
    infrastructure.constitution.extractArticles().forEach((a) =>
      console.log(`  ${a.roman}. ${a.principle} [${a.severity}]`)
    );
  } else if (cmd === 'learnings') {
    console.log('Learnings months:', infrastructure.learnings.listMonths());
    console.log('Current:', infrastructure.learnings.currentMonth());
  } else {
    console.error('Use: health | toolsets | agents | articles | learnings');
    process.exit(1);
  }
}
