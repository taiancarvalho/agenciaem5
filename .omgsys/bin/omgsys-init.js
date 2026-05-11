#!/usr/bin/env node

// agency-os-init.js
// Inicializador do OMG.sys — verifica/configura estrutura basica
// Uso: node .omgsys/bin/agency-os-init.js

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const omgsysDir = path.join(rootDir, '.omgsys');
const claudeDir = path.join(rootDir, '.claude');

// Verificar se OMG.sys ja existe
if (fs.existsSync(omgsysDir)) {
  console.log('✅ OMG.sys ja esta instalado neste projeto.');
  console.log('');
  console.log('Verificando integridade...');

  const checks = [
    ['Agents', path.join(omgsysDir, 'agents')],
    ['Core/Constitution', path.join(omgsysDir, 'core', 'constitution.md')],
    ['Core/Tasks', path.join(omgsysDir, 'core', 'tasks')],
    ['Core/Templates', path.join(omgsysDir, 'core', 'templates')],
    ['Core/Data', path.join(omgsysDir, 'core', 'data')],
    ['Core/Workflows', path.join(omgsysDir, 'core', 'workflows')],
    ['Core/Checklists', path.join(omgsysDir, 'core', 'checklists')],
    ['Clientes', path.join(omgsysDir, 'clientes')],
    ['Clients Template', path.join(omgsysDir, 'clientes', '_template')],
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
    console.log('⚠️  Alguns componentes estao faltando. Reinstale OMG.sys.');
  }
} else {
  console.log('⚠️  OMG.sys nao instalado neste projeto.');
  console.log('');
  console.log('Para instalar, use:');
  console.log('  npx omgsys-core@latest install');
  console.log('');
  console.log('Ou clone a pasta .omgsys/ neste diretorio.');
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
console.log('  node .omgsys/bin/agency-os-new-client.js {nome-do-cliente}');
console.log('');
