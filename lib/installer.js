#!/usr/bin/env node

// em5 installer — Copia .em5/ + .claude/ pro projeto atual + roda wizard
// Uso: npx em5@latest install

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

const PKG_ROOT = path.resolve(__dirname, '..');
const CWD = process.cwd();
const VERSION = require(path.join(PKG_ROOT, 'package.json')).version;

const banner = () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  em5 v${VERSION} — Agência em Cinco minutos               ║
║  "Todo processo da agência em ≤ 5 min de input humano."   ║
╚════════════════════════════════════════════════════════════╝
`);
};

const copyRecursive = (src, dst) => {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dst, item));
    }
  } else {
    fs.copyFileSync(src, dst);
  }
};

const exists = (p) => fs.existsSync(path.join(CWD, p));

async function main() {
  banner();

  if (exists('.em5')) {
    const overwrite = (await ask('⚠️  .em5/ já existe. Sobrescrever? [s/N]: ')).toLowerCase();
    if (overwrite !== 's') {
      console.log('Abortado. Use `npx em5@latest upgrade` pra atualizar.');
      process.exit(0);
    }
  }

  console.log('\n📋 Wizard de configuração\n');

  const agencyName = await ask('? Nome da sua agência: ');
  const ownerName = await ask('? Seu nome (owner): ');
  const sizeOpt = (await ask('? Você é? [1] Solo  [2] Time 2-5  [3] Time 6+: ')) || '1';
  const size = sizeOpt === '1' ? 'solo' : sizeOpt === '2' ? 'small_team' : 'medium_team';
  const tierOpt = (await ask('? Tier de modelo padrão? [1] Econômico  [2] Balanced  [3] Premium: ')) || '2';
  const tier = tierOpt === '1' ? 'haiku' : tierOpt === '3' ? 'frontier' : 'balanced';

  console.log('\n? Serviços ativos (1=sim, 0=não):');
  const trafficMeta = (await ask('  - Tráfego Meta Ads? [1]: ')) !== '0';
  const trafficGoogle = (await ask('  - Tráfego Google Ads? [1]: ')) !== '0';
  const copy = (await ask('  - Copywriting? [1]: ')) !== '0';
  const design = (await ask('  - Design? [1]: ')) !== '0';

  console.log('\n📂 Copiando arquivos...');
  copyRecursive(path.join(PKG_ROOT, '.em5'), path.join(CWD, '.em5'));
  copyRecursive(path.join(PKG_ROOT, '.claude'), path.join(CWD, '.claude'));

  console.log('⚙️  Gerando em5-config.yaml...');
  const config = `# em5 — Configuracao da Agencia
# Tagline: "Agência em Cinco minutos." — todo processo em <= 5 min de input humano.
# Gerado por: npx em5@latest install em ${new Date().toISOString().slice(0, 10)}

agency:
  name: "${agencyName}"
  owner: "${ownerName}"
  installed_at: "${new Date().toISOString().slice(0, 10)}"
  version: "${VERSION}"
  tagline: "Agência em Cinco minutos."
  team_size: "${size}"

defaults:
  model_tier: ${tier}

services:
  traffic_paid_meta: ${trafficMeta}
  traffic_paid_google: ${trafficGoogle}
  copywriting: ${copy}
  design: ${design}
  social_media: false
  seo: false
  email_marketing: false
  whatsapp_crm: false

gates:
  severity_matrix:
    enabled: true
    config: .em5/system/data/gate-matrix.yaml

learnings:
  enabled: true
  auto_capture: false  # true após hook PostToolUse configurado
`;
  fs.writeFileSync(path.join(CWD, 'em5-config.yaml'), config);

  console.log('\n✅ Instalação completa!\n');
  console.log('Próximos passos:');
  console.log('  1. Abra Claude Code neste diretório');
  console.log('  2. Execute: /setup');
  console.log('  3. Configure Composio API key em .claude/settings.json');
  console.log('  4. Crie seu primeiro cliente: /cliente-novo {nome}');
  console.log('\n📚 Docs: https://github.com/taiancarvalho/agenciaem5\n');

  rl.close();
}

main().catch((e) => {
  console.error(`❌ Erro: ${e.message}`);
  process.exit(1);
});
