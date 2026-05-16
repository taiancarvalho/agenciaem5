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

  // v1.0 → v1.1: adicionar Arts. X, XI, XII; gate-matrix; learnings; novos skills
  if (currentVersion === '1.0' || currentVersion === '1.0.0') {
    console.log('  → v1.0 → v1.1: rename personas + gate-matrix + learnings + novos skills');
    // Copia arquivos novos sem sobrescrever customizações user
    const filesToOverwrite = [
      '.em5/core/constitution.md',
      '.em5/core/data/gate-matrix.yaml',
      '.em5/setup/forge-templates/agent.template.md',
      '.em5/setup/forge-templates/task.template.md',
      '.em5/setup/forge-templates/playbook.template.md',
      '.em5/learnings/_template.md',
      '.em5/bin/em5-forge.js',
    ];
    for (const rel of filesToOverwrite) {
      const src = path.join(PKG_ROOT, rel);
      const dst = path.join(CWD, rel);
      if (fs.existsSync(src)) {
        fs.mkdirSync(path.dirname(dst), { recursive: true });
        fs.copyFileSync(src, dst);
        console.log(`    ✓ ${rel}`);
      }
    }
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
