#!/usr/bin/env node

// agency-os-new-client.js
// Cria workspace de novo cliente no OMG.sys
// Uso: node .omgsys/bin/agency-os-new-client.js {nome-do-cliente}

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Uso: node .omgsys/bin/agency-os-new-client.js {nome-do-cliente}');
  console.error('Exemplo: node .omgsys/bin/agency-os-new-client.js clinica-sao-paulo');
  process.exit(1);
}

// Validar slug
const slug = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
if (slug !== projectName.toLowerCase()) {
  console.warn(`⚠️  Nome normalizado para: ${slug}`);
}

const rootDir = process.cwd();
const clientesDir = path.join(rootDir, '.omgsys', 'clientes');

// Verificar se pasta OMG.sys existe
if (!fs.existsSync(path.join(rootDir, '.omgsys'))) {
  console.error('❌ OMG.sys nao encontrado neste projeto.');
  console.error('Execute primeiro: node .omgsys/bin/agency-os-init.js');
  process.exit(1);
}

// Verificar se cliente ja existe
const clienteDir = path.join(clientesDir, slug);
if (fs.existsSync(clienteDir)) {
  console.error(`❌ Cliente '${slug}' ja existe em .omgsys/clientes/`);
  process.exit(1);
}

// Criar estrutura de diretorios
const dirs = [
  'onboarding',
  'estrategia',
  'copy',
  'design/criativos',
  'design/videos',
  'design/landing-pages',
  'design/exports',
  'assets/logo',
  'assets/fotos',
  'assets/videos',
  'assets/produtos',
  'branding',
  'setup-tecnico',
  'trafego',
  'relatorios',
  'operacao/historico',
];

dirs.forEach((dir) => {
  fs.mkdirSync(path.join(clienteDir, dir), { recursive: true });
});

// Data atual
const hoje = new Date().toISOString().split('T')[0];

// Criar arquivos iniciais
const files = {
  'operacao/log-operacional.md': `# Log Operacional — ${slug}\n\n**Criado em:** ${hoje}\n**Dono:** Sol (CS)\n**Colaboradores:** Todos os agentes\n\n---\n\n| Data | Tipo | Responsavel | Descricao | Status | Proxima Acao |\n|------|------|-------------|-----------|--------|---------------|\n| ${hoje} | ENTRADA | Atlas | Workspace do cliente criado no OMG.sys. | CONCLUIDO | CS iniciar onboarding |\n`,
  'operacao/log-performance-criativa.md': `# Log de Performance Criativa — ${slug}\n\n**Criado em:** ${hoje}\n**Dono:** Cal (Copywriter)\n**Colaboradores:** Lux (visual + versao), Max (status + resultado)\n\n---\n\n| ID | Data | Canal | Tipo | Angulo | Copy (resumo) | Criativo | Versao | Status | Resultado | Observacao |\n|----|------|-------|------|--------|---------------|---------|--------|--------|-----------|------------|\n`,
  'operacao/log-growth.md': `# Log de Growth — ${slug}\n\n**Criado em:** ${hoje}\n**Usado em:** Modo Growth (via @traffic *modo-growth)\n\n---\n\n| ID | Data | Acao | Tipo | Resultado | Decisao |\n|----|------|------|------|-----------|----------|\n`,
  'operacao/proximos-passos.md': `# Proximos Passos — ${slug}\n\n**Atualizado em:** ${hoje}\n\n## Agencia\n\n- [ ] CS iniciar onboarding → *iniciar-onboarding ${slug}\n\n## Cliente\n\n- [ ] Aguardando contato inicial\n`,
  'setup-tecnico/status.md': `# Status Tecnico — ${slug}\n\n**Ultima atualizacao:** ${hoje}\n\n| Item | Status | Observacao |\n|------|--------|------------|\n| Business Manager | ⏳ Aguardando | |\n| Conta de Anuncios | ⏳ Aguardando | |\n| Pixel Meta | ⏳ Aguardando | |\n| GA4 | ⏳ Aguardando | |\n| Site/LP | ⏳ Aguardando | |\n\n**Liberado para execucao:** NAO — setup tecnico pendente\n`,
  'branding/cores.yaml': `# Cores — ${slug}\n# Preencher apos receber branding kit\nprimaria: ""\nsecundaria: ""\nfundo: ""\ntexto: ""\ndestaque: ""\n`,
  'branding/fontes.yaml': `# Fontes — ${slug}\n# Preencher apos receber branding kit\nprincipal: ""\nsecundaria: ""\npeso_titulos: ""\npeso_corpo: ""\n`,
};

Object.entries(files).forEach(([filePath, content]) => {
  fs.writeFileSync(path.join(clienteDir, filePath), content, 'utf8');
});

// Confirmar criacao
console.log(`
✅ Workspace criado: .omgsys/clientes/${slug}/

Estrutura:
├── onboarding/
├── estrategia/
├── copy/
├── design/ (criativos, videos, landing-pages, exports)
├── assets/ (logo, fotos, videos)
├── branding/ (cores.yaml, fontes.yaml)
├── setup-tecnico/ (status.md)
├── trafego/
├── relatorios/
└── operacao/
    ├── log-operacional.md ✅
    ├── log-performance-criativa.md ✅
    ├── log-growth.md ✅
    └── proximos-passos.md ✅

Proximo passo: @cs *iniciar-onboarding ${slug}
`);
