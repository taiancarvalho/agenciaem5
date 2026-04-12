#!/usr/bin/env node

// agency-os-init.js
// Inicializador do AgencyOS — verifica/configura estrutura basica
// Uso: node .agencyos/bin/agency-os-init.js

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const agencyosDir = path.join(rootDir, '.agencyos');
const claudeDir = path.join(rootDir, '.claude');

// Verificar se AgencyOS ja existe
if (fs.existsSync(agencyosDir)) {
  console.log('✅ AgencyOS ja esta instalado neste projeto.');
  console.log('');
  console.log('Verificando integridade...');

  const checks = [
    ['Agents', path.join(agencyosDir, 'agents')],
    ['Core/Constitution', path.join(agencyosDir, 'core', 'constitution.md')],
    ['Core/Tasks', path.join(agencyosDir, 'core', 'tasks')],
    ['Core/Templates', path.join(agencyosDir, 'core', 'templates')],
    ['Core/Data', path.join(agencyosDir, 'core', 'data')],
    ['Core/Workflows', path.join(agencyosDir, 'core', 'workflows')],
    ['Core/Checklists', path.join(agencyosDir, 'core', 'checklists')],
    ['Clientes', path.join(agencyosDir, 'clientes')],
    ['Clients Template', path.join(agencyosDir, 'clientes', '_template')],
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
    console.log('⚠️  Alguns componentes estao faltando. Reinstale AgencyOS.');
  }
} else {
  console.log('⚠️  AgencyOS nao instalado neste projeto.');
  console.log('');
  console.log('Para instalar, use:');
  console.log('  npx agencyos-core@latest install');
  console.log('');
  console.log('Ou clone a pasta .agencyos/ neste diretorio.');
}

// Exibir informacoes dos agentes disponiveis
console.log('');
console.log('Agentes disponiveis:');
console.log('  🗺️  @agency-master (Atlas) — Orquestrador geral');
console.log('  ☀️  @cs (Sol) — Customer Success');
console.log('  🎯  @estrategista (Vera) — Estrategia');
console.log('  📊  @gestor-trafego (Max) — Midia paga');
console.log('  ✍️  @copywriter (Cal) — Copy');
console.log('  🎨  @designer (Lux) — Criativos visuais');
console.log('  🔍  @qa-campanha (Zara) — Validacao');
console.log('');
console.log('Proximo passo:');
console.log('  node .agencyos/bin/agency-os-new-client.js {nome-do-cliente}');
console.log('');
