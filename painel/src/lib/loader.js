// painel/src/lib/loader.js
// Carrega dados dos clientes em5 lendo .em5/clientes/*/operacao/status.yaml
// 100% filesystem-first (Art. I).

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const EM5_ROOT = path.resolve(process.cwd(), '..');
const CLIENTES_DIR = path.join(EM5_ROOT, '.em5/clientes');
const CONFIG_PATH = path.join(EM5_ROOT, 'em5-config.yaml');
const LEARNINGS_DIR = path.join(EM5_ROOT, '.em5/learnings');

function safeReadYAML(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.warn(`YAML parse fail: ${filePath}`, e.message);
    return null;
  }
}

export function loadAgencyConfig() {
  return safeReadYAML(CONFIG_PATH) || { agency: { name: 'Agência em5' } };
}

export function listClientes() {
  if (!fs.existsSync(CLIENTES_DIR)) return [];
  return fs.readdirSync(CLIENTES_DIR)
    .filter((d) => !d.startsWith('_') && fs.statSync(path.join(CLIENTES_DIR, d)).isDirectory())
    .map((slug) => loadCliente(slug))
    .filter(Boolean);
}

export function loadCliente(slug) {
  const clientDir = path.join(CLIENTES_DIR, slug);
  if (!fs.existsSync(clientDir)) return null;

  const status = safeReadYAML(path.join(clientDir, 'operacao/status.yaml')) || {};
  const financeiro = safeReadYAML(path.join(clientDir, 'financeiro/mensalidade.yaml')) || {};
  const branding = safeReadYAML(path.join(clientDir, 'branding/cores.yaml')) || {};

  return {
    slug,
    nome: status.nome || slug,
    nicho: status.nicho || 'desconhecido',
    estagio: status.estagio || 'ativo', // onboarding | ativo | pausado | churn
    roas_semanal: status.roas_semanal || null,
    cpa_atual: status.cpa_atual || null,
    proxima_acao: status.proxima_acao || '—',
    alerta_severidade: status.alerta_severidade || null, // critico|alto|medio|baixo|null
    alerta_mensagem: status.alerta_mensagem || null,
    mensalidade: financeiro.valor_mensal || null,
    inadimplencia_dias: financeiro.inadimplencia_dias || 0,
    branding_cor: branding.primaria || '#0066cc',
    ultima_atualizacao: status.ultima_atualizacao || null,
  };
}

export function computeAgencyKPIs(clientes) {
  const ativos = clientes.filter((c) => c.estagio === 'ativo');
  const criticos = clientes.filter((c) => c.alerta_severidade === 'critico');
  const inadimplentes = clientes.filter((c) => (c.inadimplencia_dias || 0) > 7);

  const roasValues = ativos.map((c) => c.roas_semanal).filter((r) => typeof r === 'number');
  const roasMedio = roasValues.length > 0
    ? (roasValues.reduce((a, b) => a + b, 0) / roasValues.length).toFixed(2)
    : '—';

  const mrr = ativos.reduce((sum, c) => sum + (c.mensalidade || 0), 0);

  return {
    total_clientes: clientes.length,
    ativos: ativos.length,
    criticos: criticos.length,
    inadimplentes: inadimplentes.length,
    roas_medio_semanal: roasMedio,
    mrr_brl: mrr,
  };
}

export function listLearningsMonths() {
  if (!fs.existsSync(LEARNINGS_DIR)) return [];
  return fs.readdirSync(LEARNINGS_DIR)
    .filter((d) => /^\d{4}-\d{2}$/.test(d))
    .sort()
    .reverse();
}

export function loadLearningsCount(month) {
  const monthDir = path.join(LEARNINGS_DIR, month);
  if (!fs.existsSync(monthDir)) return 0;
  return fs.readdirSync(monthDir).filter((f) => f.endsWith('.md')).length;
}
