#!/usr/bin/env node

// em5 upgrade — Migra projeto entre versões preservando customizações
// Uso: npx em5@latest upgrade

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PKG_ROOT = path.resolve(__dirname, '..');
const CWD = process.cwd();
const NEW_VERSION = require(path.join(PKG_ROOT, 'package.json')).version;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

const readYAMLVersion = (file) => {
  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/version:\s*"?([\d.]+)"?/);
  return m ? m[1] : null;
};

async function main() {
  console.log(`\n🔄 em5 upgrade → v${NEW_VERSION}\n`);

  const configPath = path.join(CWD, 'em5-config.yaml');
  if (!fs.existsSync(configPath)) {
    console.error('❌ em5-config.yaml não encontrado. Use `npx em5@latest install`.');
    process.exit(1);
  }

  const currentVersion = readYAMLVersion(configPath);
  console.log(`Versão atual: v${currentVersion || 'desconhecida'}`);
  console.log(`Versão alvo: v${NEW_VERSION}\n`);

  if (currentVersion === NEW_VERSION) {
    console.log('✅ Já está na versão mais recente.');
    process.exit(0);
  }

  const proceed = (await ask('Prosseguir com upgrade? [s/N]: ')).toLowerCase();
  if (proceed !== 's') {
    console.log('Abortado.');
    process.exit(0);
  }

  // Backup
  const backupDir = path.join(CWD, `.em5.v${currentVersion || 'old'}.backup`);
  console.log(`\n📦 Backup em ${backupDir}...`);
  const copyRec = (src, dst) => {
    const st = fs.statSync(src);
    if (st.isDirectory()) {
      fs.mkdirSync(dst, { recursive: true });
      for (const i of fs.readdirSync(src)) copyRec(path.join(src, i), path.join(dst, i));
    } else fs.copyFileSync(src, dst);
  };
  if (fs.existsSync(path.join(CWD, '.em5'))) copyRec(path.join(CWD, '.em5'), backupDir);

  // Migration steps (versão→versão)
  console.log('\n🔧 Aplicando migrations...');

  const copyFiles = (label, files) => {
    console.log(`  → ${label}`);
    for (const rel of files) {
      const src = path.join(PKG_ROOT, rel);
      const dst = path.join(CWD, rel);
      if (fs.existsSync(src)) {
        fs.mkdirSync(path.dirname(dst), { recursive: true });
        fs.copyFileSync(src, dst);
        console.log(`    ✓ ${rel}`);
      }
    }
  };

  const versionAtLeast = (a, b) => {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      if ((pa[i] || 0) < (pb[i] || 0)) return false;
      if ((pa[i] || 0) > (pb[i] || 0)) return true;
    }
    return true;
  };

  const isPre = (v) => !versionAtLeast(currentVersion, v);

  // v1.0 → v1.1: rename personas + gate-matrix + learnings + novos skills
  if (isPre('1.1.0')) {
    copyFiles('v1.0 → v1.1: rename + gate-matrix + learnings', [
      '.em5/system/constitution.md',
      '.em5/system/data/gate-matrix.yaml',
      '.em5/infra/setup/forge-templates/agent.template.md',
      '.em5/infra/setup/forge-templates/task.template.md',
      '.em5/infra/setup/forge-templates/playbook.template.md',
      '.em5/system/learnings/_template.md',
      '.em5/infra/bin/em5-forge.js',
    ]);
  }

  // v1.1 → v1.2: aiox-core + meta-time + 3 high-value agents + WhatsApp + customGPT + Painel + Electron
  if (isPre('1.2.0')) {
    copyFiles('v1.1 → v1.2: aiox-core + meta-time + agentes high-value + WhatsApp + Painel + Electron', [
      '.em5/infra/hooks/registry.js',
      '.em5/infra/hooks/README.md',
      '.em5/infra/infrastructure/index.js',
      '.em5/infra/bin/em5-validate.js',
      '.em5/infra/bin/em5-import-gpt.js',
      '.em5/agents/arq/persona.md',
      '.em5/agents/builder/persona.md',
      '.em5/agents/reviewer/persona.md',
      '.em5/agents/vendas/persona.md',
      '.em5/agents/fin/persona.md',
      '.em5/agents/scout/persona.md',
      '.em5/agents/whats/persona.md',
      '.em5/system/data/whatsapp-templates.yaml',
      '.em5/system/data/whats-stop-rules.yaml',
      '.em5/workflows/construcao-ciclo-completo.yaml',
      '.em5/infra/forge/_template/spec.template.md',
      'painel/package.json',
      'painel/astro.config.mjs',
      'painel/src/pages/index.astro',
      'painel/src/layouts/Base.astro',
      'painel/src/lib/loader.js',
      'desktop/package.json',
      'desktop/main.js',
      'desktop/preload.js',
    ]);
  }

  // v1.2 → v1.3: Art. IX revisado + Asaas + tasks completas + hooks ativos
  if (isPre('1.3.0')) {
    copyFiles('v1.2 → v1.3: Art. IX v1.3 + Asaas MCP + tasks completas', [
      '.em5/infra/integracoes/excecoes.yaml',
      '.em5/agents/fin/tasks/criar-cobranca-asaas.md',
      '.em5/agents/fin/tasks/monitorar-inadimplencia.md',
      '.em5/system/learnings/2026-05/mcp-excecoes.md',
      '.env.example',
      '.gitignore',
      'CHANGELOG.md',
      'LICENSE',
    ]);
    console.log('    ⚠️  Lembre de adicionar ASAAS_TOKEN no .env');
  }

  // Atualiza versão no config
  let config = fs.readFileSync(configPath, 'utf8');
  config = config.replace(/version:\s*"?[\d.]+"?/, `version: "${NEW_VERSION}"`);
  fs.writeFileSync(configPath, config);

  console.log(`\n✅ Upgrade concluído → v${NEW_VERSION}`);
  console.log(`📦 Backup em: ${backupDir}`);
  console.log('\n⚠️  Revise customizações em .em5/agents/ — não sobrescritas, podem precisar de merge manual.');

  rl.close();
}

main().catch((e) => {
  console.error(`❌ Erro: ${e.message}`);
  process.exit(1);
});
