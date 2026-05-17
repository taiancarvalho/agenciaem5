#!/usr/bin/env node

// em5 CLI — Entry point
// Uso: npx em5@latest [install|upgrade|forge|dia|version]

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const VERSION = require('../package.json').version;
const cmd = process.argv[2];
const args = process.argv.slice(3);

const help = () => {
  console.log(`
em5 v${VERSION} — Agência em Cinco minutos

Comandos:
  install        Instala em5 no projeto atual (wizard)
  upgrade        Atualiza em5 da versão antiga
  forge [tipo]   Cria agente/task/playbook (tipo: agent|task|playbook)
  dia            Executa daily run (placeholder — abrir via /dia no Claude Code)
  version        Mostra versão
  help           Esta mensagem

Quick start:
  $ npx em5@latest install
  $ cd seu-projeto
  $ # abra Claude Code
  $ /setup
  $ /cliente-novo nome-do-cliente

Site: https://github.com/taiancarvalho/agenciaem5
Slogan: "Se passou de 5, refatora."
`);
};

const runScript = (scriptPath, scriptArgs) => {
  const child = spawn('node', [scriptPath, ...scriptArgs], { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code || 0));
};

const findPackageRoot = () => {
  let dir = __dirname;
  while (dir !== '/') {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
      if (pkg.name === 'em5-core') return dir;
    }
    dir = path.dirname(dir);
  }
  return path.resolve(__dirname, '..');
};

switch (cmd) {
  case 'install':
    runScript(path.join(findPackageRoot(), 'lib/installer.js'), args);
    break;
  case 'upgrade':
    runScript(path.join(findPackageRoot(), 'bin/em5-upgrade.js'), args);
    break;
  case 'forge':
    runScript(path.join(findPackageRoot(), '.em5/bin/em5-forge.js'), args);
    break;
  case 'dia':
    console.log('ℹ️  /dia é uma skill do Claude Code. Abra o Claude Code e execute: /dia');
    process.exit(0);
    break;
  case 'version':
  case '-v':
  case '--version':
    console.log(`em5 v${VERSION}`);
    break;
  case 'help':
  case '-h':
  case '--help':
  case undefined:
    help();
    break;
  default:
    console.error(`❌ Comando desconhecido: ${cmd}\n`);
    help();
    process.exit(1);
}
