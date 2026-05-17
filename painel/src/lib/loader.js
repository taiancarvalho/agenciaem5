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

// ============================================
// FINANCEIRO — leitura para /financeiro page
// ============================================

// ============================================
// CLIENTE INDIVIDUAL — /cliente/[slug] page (Fase 13.4)
// ============================================

export function loadClienteCompleto(slug) {
  const dir = path.join(CLIENTES_DIR, slug);
  if (!fs.existsSync(dir)) return null;

  const status = safeReadYAML(path.join(dir, 'operacao/status.yaml')) || {};
  const mensalidade = safeReadYAML(path.join(dir, 'financeiro/mensalidade.yaml')) || {};
  const branding = safeReadYAML(path.join(dir, 'branding/cores.yaml')) || {};
  const cobrancas = safeReadYAML(path.join(dir, 'financeiro/cobrancas.yaml')) || [];

  const designPath = path.join(dir, 'branding/DESIGN.md');
  const previewPath = path.join(dir, 'branding/preview.html');
  const tokensPath = path.join(dir, 'branding/tokens.json');

  let designContent = null;
  if (fs.existsSync(designPath)) {
    designContent = fs.readFileSync(designPath, 'utf8');
  }

  let tokens = null;
  if (fs.existsSync(tokensPath)) {
    try { tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8')); } catch (e) {}
  }

  return {
    slug,
    nome: status.nome || slug,
    nicho: status.nicho || '—',
    estagio: status.estagio || 'desconhecido',
    roas_semanal: status.roas_semanal,
    cpa_atual: status.cpa_atual,
    proxima_acao: status.proxima_acao || '—',
    alerta_severidade: status.alerta_severidade,
    alerta_mensagem: status.alerta_mensagem,
    ultima_atualizacao: status.ultima_atualizacao,
    mensalidade: mensalidade.valor_mensal || 0,
    billing_type: mensalidade.billing_type,
    asaas_customer_id: mensalidade.asaas_customer_id,
    inadimplencia_dias: mensalidade.inadimplencia_dias || 0,
    cobrancas: Array.isArray(cobrancas) ? cobrancas : [],
    branding_cor: branding.primaria || '#5b8dee',
    design: {
      has_design_md: !!designContent,
      has_preview: fs.existsSync(previewPath),
      has_tokens: !!tokens,
      content_preview: designContent ? designContent.slice(0, 800) : null,
      tokens: tokens,
    },
  };
}

export function listClienteSlugs() {
  if (!fs.existsSync(CLIENTES_DIR)) return [];
  return fs.readdirSync(CLIENTES_DIR)
    .filter((d) => !d.startsWith('_') && fs.statSync(path.join(CLIENTES_DIR, d)).isDirectory());
}

export function loadClienteFinanceiro(slug) {
  const finDir = path.join(CLIENTES_DIR, slug, 'financeiro');
  if (!fs.existsSync(finDir)) return null;

  const mensalidade = safeReadYAML(path.join(finDir, 'mensalidade.yaml')) || {};
  const cobrancasPath = path.join(finDir, 'cobrancas.yaml');
  const cobrancas = safeReadYAML(cobrancasPath) || [];

  // Calcula totais
  const pagas = Array.isArray(cobrancas) ? cobrancas.filter((c) => c.status === 'PAID') : [];
  const pendentes = Array.isArray(cobrancas) ? cobrancas.filter((c) => c.status === 'PENDING') : [];
  const vencidas = Array.isArray(cobrancas) ? cobrancas.filter((c) => c.status === 'OVERDUE') : [];

  const totalRecebido = pagas.reduce((sum, c) => sum + (c.valor || 0), 0);
  const totalPendente = pendentes.reduce((sum, c) => sum + (c.valor || 0), 0);
  const totalVencido = vencidas.reduce((sum, c) => sum + (c.valor || 0), 0);

  return {
    slug,
    nome: mensalidade.nome || slug,
    valor_mensal: mensalidade.valor_mensal || 0,
    billing_type: mensalidade.billing_type || '—',
    asaas_customer_id: mensalidade.asaas_customer_id || null,
    inadimplencia_dias: mensalidade.inadimplencia_dias || 0,
    cobrancas_total: cobrancas.length || 0,
    pagas: pagas.length,
    pendentes: pendentes.length,
    vencidas: vencidas.length,
    total_recebido: totalRecebido,
    total_pendente: totalPendente,
    total_vencido: totalVencido,
  };
}

export function loadFinanceiroGlobal() {
  const clientes = listClientes();
  const financeiros = clientes
    .map((c) => loadClienteFinanceiro(c.slug))
    .filter(Boolean);

  const mrr = financeiros.reduce((sum, f) => sum + (f.valor_mensal || 0), 0);
  const recebidoMes = financeiros.reduce((sum, f) => sum + (f.total_recebido || 0), 0);
  const pendenteTotal = financeiros.reduce((sum, f) => sum + (f.total_pendente || 0), 0);
  const vencidoTotal = financeiros.reduce((sum, f) => sum + (f.total_vencido || 0), 0);
  const inadimplentes = financeiros.filter((f) => f.inadimplencia_dias > 7);

  return {
    clientes: financeiros,
    kpis: {
      mrr,
      arr_projetado: mrr * 12,
      recebido_mes: recebidoMes,
      pendente: pendenteTotal,
      vencido: vencidoTotal,
      inadimplentes_count: inadimplentes.length,
      total_clientes: financeiros.length,
    },
  };
}
