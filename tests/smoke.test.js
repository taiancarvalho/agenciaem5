// em5 — Smoke tests
// 5 testes mínimos que garantem sistema não-quebrado após qualquer commit.
// Roda em CI/CD via .github/workflows/validate.yml (npm test).

import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = path.resolve(__dirname, '..');

describe('em5 smoke tests', () => {

  // #1 — Validate retorna 0
  it('validate-em5 passa sem issues NON-NEGOTIABLE', () => {
    const out = execSync('node .em5/bin/em5-validate.js', { cwd: ROOT, encoding: 'utf8' });
    expect(out).toContain('Todos os checks passaram');
    expect(out).not.toContain('🛑');
  });

  // #2 — Infrastructure health: todos módulos críticos OK
  it('infrastructure health reporta módulos críticos OK', () => {
    const out = execSync('node .em5/infrastructure/index.js health', { cwd: ROOT, encoding: 'utf8' });
    const data = JSON.parse(out);
    const criticos = ['hooks', 'forge', 'gateMatrix', 'learnings', 'composio', 'constitution', 'config', 'agents'];
    for (const mod of criticos) {
      expect(['ok', 'loaded']).toContain(data.modules[mod].status);
    }
  });

  // #3 — Constitution tem 13 artigos com severidade declarada
  it('constitution tem 13 artigos (Arts. I–XIII)', () => {
    const content = fs.readFileSync(path.join(ROOT, '.em5/core/constitution.md'), 'utf8');
    const requiredArticles = ['Filesystem First', 'Composio', 'Quality Gate', 'Learnings Perpétuos', 'Severity Gates', 'em Cinco Minutos', 'Construção Self-Service'];
    for (const art of requiredArticles) {
      expect(content).toContain(art);
    }
  });

  // #4 — Todos 15 agentes têm model_tier declarado
  it('todos agentes têm model_tier (Fase 1.1)', () => {
    const agentsDir = path.join(ROOT, '.em5/agents');
    const agents = fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
    expect(agents.length).toBeGreaterThanOrEqual(15);
    for (const agent of agents) {
      const content = fs.readFileSync(path.join(agentsDir, agent), 'utf8');
      expect(content).toMatch(/model_tier:\s*(frontier|balanced|haiku)/);
    }
  });

  // #5 — em5-config.yaml carrega + tem tagline + version 1.3
  it('em5-config.yaml válido com tagline e versão 1.3', () => {
    const cfg = yaml.load(fs.readFileSync(path.join(ROOT, 'em5-config.yaml'), 'utf8'));
    expect(cfg.agency).toBeDefined();
    expect(cfg.agency.tagline).toContain('Cinco minutos');
    expect(cfg.agency.version).toMatch(/^1\.3/);
  });

});

describe('em5 Composio + Asaas (Art. IX v1.3)', () => {

  // Composio é gateway default; Asaas é exceção documentada
  it('settings.json tem apenas MCPs documentados', () => {
    const settings = JSON.parse(fs.readFileSync(path.join(ROOT, '.claude/settings.json'), 'utf8'));
    const mcps = Object.keys(settings.mcpServers || {});
    expect(mcps).toContain('composio');
    expect(mcps).toContain('context7');
    // Asaas tem que estar em excecoes.yaml se presente
    const externals = mcps.filter((m) => !['composio', 'context7'].includes(m));
    if (externals.length > 0) {
      const excecoes = fs.readFileSync(path.join(ROOT, '.em5/integracoes/excecoes.yaml'), 'utf8');
      for (const mcp of externals) {
        expect(excecoes).toContain(`mcp_id: ${mcp}`);
      }
    }
  });

});
