#!/usr/bin/env node

// em5-init.js
// Inicializador do em5 — verifica/configura estrutura basica
// Uso: node .em5/bin/em5-init.js

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const em5Dir = path.join(rootDir, '.em5');
const claudeDir = path.join(rootDir, '.claude');

// Verificar se em5 ja existe
if (fs.existsSync(em5Dir)) {
  console.log('✅ em5 ja esta instalado neste projeto.');
  console.log('');
  console.log('Verificando integridade...');

  const checks = [
    ['Agents', path.join(em5Dir, 'agents')],
    ['Core/Constitution', path.join(em5Dir, 'core', 'constitution.md')],
    ['Core/Tasks', path.join(em5Dir, 'core', 'tasks')],
    ['Core/Templates', path.join(em5Dir, 'core', 'templates')],
    ['Core/Data', path.join(em5Dir, 'core', 'data')],
    ['Core/Workflows', path.join(em5Dir, 'core', 'workflows')],
    ['Core/Checklists', path.join(em5Dir, 'core', 'checklists')],
    ['Clientes', path.join(em5Dir, 'clientes')],
    ['Clients Template', path.join(em5Dir, 'clientes', '_template')],
    ['CLAUDE.md', path.join(claudeDir, 'CLAUDE.md')],
  ];

  let allOk = true;
  checks.forEach(([name, dir]) => {
    if (fs.existsSync(dir)) {
      console.log(`  ✅ ${name}`);
    } else {
      console.log(`  ❌ ${name} — nao encontrado`);
      allOk = false;
    }
  });

  if (allOk) {
    console.log('');
    console.log('✅ Todos os componentes verificados.');
  } else {
    console.log('');
    console.log('⚠️  Alguns componentes estao faltando. Reinstale em5.');
  }
} else {
  console.log('⚠️  em5 nao instalado neste projeto.');
  console.log('');
  console.log('Para instalar, use:');
  console.log('  npx em5-core@latest install');
  console.log('');
  console.log('Ou clone a pasta .em5/ neste diretorio.');
}

// Exibir informacoes dos agentes disponiveis
console.log('');
console.log('Agentes disponiveis:');
console.log('  🗺️  @ceo (Atlas) — Orquestrador geral');
console.log('  ☀️  @cs (Sol) — Customer Success');
console.log('  🎯  @strategist (Vera) — Estrategia');
console.log('  📊  @traffic (Max) — Midia paga');
console.log('  ✍️  @copywriter (Cal) — Copy');
console.log('  🎨  @designer (Lux) — Criativos visuais');
console.log('  🔍  @qa (Zara) — Validacao');
console.log('');
console.log('Proximo passo:');
console.log('  node .em5/bin/em5-new-client.js {nome-do-cliente}');
console.log('');
