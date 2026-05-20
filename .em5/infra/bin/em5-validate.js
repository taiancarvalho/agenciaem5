#!/usr/bin/env node

// em5 validate — Checa conformidade contra constitution + boas práticas
// Uso: node .em5/infra/bin/em5-validate.js [--fix]
// Inspirado em aiox-core (npm run validate:agents).

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const infra = require(path.join(ROOT, '.em5/infra/infrastructure/index.js'));

const checks = [];
const issues = [];

function check(name, severity, fn) {
  checks.push({ name, severity });
  try {
    const result = fn();
    if (result === true || result === undefined) return;
    issues.push({ name, severity, message: result });
  } catch (e) {
    issues.push({ name, severity, message: `Erro: ${e.message}` });
  }
}

// === CHECKS ===

check('Composio é gateway default + exceções Art. IX documentadas (v1.3)', 'NON-NEGOTIABLE', () => {
  const s = JSON.parse(fs.readFileSync(path.join(ROOT, '.claude/settings.json'), 'utf8'));
  const mcps = Object.keys(s.mcpServers || {});
  const allowedDefault = ['composio', 'context7'];
  const externals = mcps.filter((m) => !allowedDefault.includes(m));

  if (externals.length === 0) return; // só default = OK

  // Tem MCPs adicionais — checar se estão documentados em excecoes.yaml
  const excecoesPath = path.join(ROOT, '.em5/infra/integracoes/excecoes.yaml');
  if (!fs.existsSync(excecoesPath)) {
    return `MCPs adicionais detectados (${externals.join(', ')}) mas .em5/infra/integracoes/excecoes.yaml ausente. Art. IX v1.3 exige documentação formal.`;
  }
  const excecoesContent = fs.readFileSync(excecoesPath, 'utf8');
  const naoDocumentados = externals.filter((mcp) => !excecoesContent.includes(`mcp_id: ${mcp}`));
  if (naoDocumentados.length > 0) {
    return `MCPs sem entrada em excecoes.yaml: ${naoDocumentados.join(', ')}. Adicione + aprove via @ceo.`;
  }
  // OK — todas excecoes documentadas
});

check('Todos agentes têm model_tier (Fase 1.1)', 'MUST', () => {
  const agentsDir = path.join(ROOT, '.em5/agents');
  const agents = fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
  const missing = agents.filter((a) => {
    const content = fs.readFileSync(path.join(agentsDir, a), 'utf8');
    return !/model_tier:\s*(frontier|balanced|haiku)/.test(content);
  });
  if (missing.length > 0) return `Agentes sem model_tier: ${missing.join(', ')}`;
});

check('Constitution v1.1+ com 12 artigos', 'MUST', () => {
  const content = fs.readFileSync(path.join(ROOT, '.em5/system/constitution.md'), 'utf8');
  const required = ['Filesystem First', 'Composio', 'Quality Gate', 'Learnings Perpétuos', 'Severity Gates', 'em Cinco Minutos'];
  const missing = required.filter((r) => !content.includes(r));
  if (missing.length > 0) return `Artigos ausentes: ${missing.join(', ')}`;
});

check('Gate-matrix.yaml existe (Fase 3)', 'NON-NEGOTIABLE', () => {
  if (!infra.gateMatrix.available) return 'gate-matrix.yaml ausente — Severity Gates não funcional';
});

check('Estrutura learnings inicializada', 'MUST', () => {
  if (!infra.learnings.available) return '.em5/system/learnings/_template.md ausente';
  const months = infra.learnings.listMonths();
  if (months.length === 0) return 'Nenhum mês de learnings inicializado';
});

check('em5-config.yaml versão >= 1.1', 'SHOULD', () => {
  const cfg = infra.config.load();
  if (!cfg) return 'em5-config.yaml não carregou';
  const v = cfg.agency?.version || '0.0';
  if (parseFloat(v) < 1.1) return `Versão ${v} desatualizada. Atual: 1.1+`;
});

check('Composio toolsets mínimos', 'MUST', () => {
  const required = ['meta_ads', 'google_analytics', 'gmail'];
  const enabled = infra.composio.loadToolsets();
  const missing = required.filter((t) => !enabled.includes(t));
  if (missing.length > 0) return `Toolsets faltando: ${missing.join(', ')}`;
});

check('Skill canônicas presentes', 'SHOULD', () => {
  // v2.4 (Cenário C): forge/aprender/override removidos. Adicionado pedir + ticket + construir
  const required = ['setup', 'cliente-novo', 'campanha', 'auditar', 'dia', 'pedir', 'ticket', 'construir'];
  const cmdDir = path.join(ROOT, '.claude/commands');
  const present = fs.readdirSync(cmdDir).map((f) => f.replace('.md', ''));
  const missing = required.filter((c) => !present.includes(c));
  if (missing.length > 0) return `Skills canônicas faltando: ${missing.join(', ')}`;
});

check('Tagline "Agência em Cinco minutos" no CLAUDE.md', 'SHOULD', () => {
  const content = fs.readFileSync(path.join(ROOT, '.claude/CLAUDE.md'), 'utf8');
  if (!content.includes('Cinco minutos')) return 'Tagline ausente — identidade verbal não consistente';
});

check('package.json bin/em5.js declarado (Fase 4)', 'MUST', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  if (!pkg.bin?.em5) return 'bin.em5 ausente em package.json';
  const binPath = path.join(ROOT, pkg.bin.em5);
  if (!fs.existsSync(binPath)) return `bin.em5 aponta pra ${pkg.bin.em5} mas arquivo não existe`;
});

check('Workspace cliente _template existe', 'NON-NEGOTIABLE', () => {
  const tpl = path.join(ROOT, 'clientes/_template');
  if (!fs.existsSync(tpl)) return 'clientes/_template/ ausente';
});

// === RELATÓRIO ===

function report() {
  console.log(`\n📋 em5 — Validação de Conformidade\n`);
  console.log(`Checks executados: ${checks.length}`);
  console.log(`Issues encontradas: ${issues.length}\n`);

  if (issues.length === 0) {
    console.log('✅ Todos os checks passaram. Sistema em conformidade.\n');
    return 0;
  }

  const grouped = { 'NON-NEGOTIABLE': [], MUST: [], SHOULD: [] };
  issues.forEach((i) => grouped[i.severity].push(i));

  const emojis = { 'NON-NEGOTIABLE': '🚫', MUST: '⚠️', SHOULD: '💡' };

  for (const sev of ['NON-NEGOTIABLE', 'MUST', 'SHOULD']) {
    if (grouped[sev].length === 0) continue;
    console.log(`${emojis[sev]} ${sev} (${grouped[sev].length}):`);
    grouped[sev].forEach((i) => console.log(`  ✗ ${i.name}\n    → ${i.message}`));
    console.log();
  }

  const blockers = grouped['NON-NEGOTIABLE'].length;
  if (blockers > 0) {
    console.log(`🛑 ${blockers} violação(ões) NON-NEGOTIABLE — sistema NÃO está em conformidade.`);
    return 1;
  }
  console.log(`⚠️  Sistema operacional mas com pendências.`);
  return 0;
}

process.exit(report());
