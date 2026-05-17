#!/usr/bin/env node

// em5-import-gpt — Importa customGPT (OpenAI) ou Claude Project em componentes em5
// Uso: node .em5/bin/em5-import-gpt.js <caminho>
// Formatos suportados:
//   1. ZIP de export OpenAI customGPT
//   2. JSON de Claude Project export
//   3. Folder com prompt.md + knowledge/

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..', '..');
const TEMPLATES = path.join(ROOT, '.em5/setup/forge-templates');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

function detectFormat(inputPath) {
  if (!fs.existsSync(inputPath)) throw new Error(`Path não existe: ${inputPath}`);
  const stat = fs.statSync(inputPath);
  if (stat.isDirectory()) {
    if (fs.existsSync(path.join(inputPath, 'prompt.md')) || fs.existsSync(path.join(inputPath, 'instructions.md'))) {
      return 'folder';
    }
    throw new Error('Folder sem prompt.md/instructions.md — formato não reconhecido');
  }
  if (inputPath.endsWith('.zip')) return 'openai-zip';
  if (inputPath.endsWith('.json')) return 'claude-project-json';
  throw new Error(`Extensão não suportada: ${inputPath}`);
}

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractFromFolder(folderPath) {
  const promptFile = ['prompt.md', 'instructions.md', 'system.md']
    .map((f) => path.join(folderPath, f))
    .find((p) => fs.existsSync(p));
  const systemPrompt = promptFile ? fs.readFileSync(promptFile, 'utf8') : '';

  const knowledgeDir = path.join(folderPath, 'knowledge');
  const knowledgeFiles = fs.existsSync(knowledgeDir)
    ? fs.readdirSync(knowledgeDir).map((f) => ({ name: f, content: fs.readFileSync(path.join(knowledgeDir, f), 'utf8') }))
    : [];

  return {
    systemPrompt,
    knowledgeFiles,
    actions: [], // folder format não tem actions estruturadas
    name: path.basename(folderPath),
  };
}

function extractFromClaudeJSON(jsonPath) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return {
    systemPrompt: data.system_prompt || data.instructions || '',
    knowledgeFiles: (data.files || []).map((f) => ({ name: f.name, content: f.content || '' })),
    actions: data.tools || [],
    name: data.name || path.basename(jsonPath, '.json'),
  };
}

async function proposeMappings(extracted) {
  console.log('\n📋 Análise do customGPT importado:\n');
  console.log(`Nome detectado: ${extracted.name}`);
  console.log(`System prompt: ${extracted.systemPrompt.length} chars`);
  console.log(`Knowledge files: ${extracted.knowledgeFiles.length}`);
  console.log(`Actions/tools: ${extracted.actions.length}`);
  console.log();

  const slug = await ask(`? Slug pro novo agente em5 (default: ${slugify(extracted.name)}): `) || slugify(extracted.name);
  const persona = await ask('? Persona name (curto, 1-2 sílabas): ');
  const icon = await ask('? Emoji icon: ');
  const role = await ask('? Role/título: ');
  const tier = (await ask('? Model tier [frontier|balanced|haiku] (balanced): ')) || 'balanced';
  const layer = (await ask('? Layer [estrategia|definicao|execucao|validacao] (execucao): ')) || 'execucao';
  const reportsTo = (await ask('? Reporta pra (@coo): ')) || '@coo';

  return {
    slug, persona, icon, role, tier, layer, reportsTo,
    sourcePath: 'imported',
  };
}

function generateAgentFile(extracted, mapping) {
  const template = fs.readFileSync(path.join(TEMPLATES, 'agent.template.md'), 'utf8');
  const sigTag = `traduzido de customGPT "${extracted.name}"`;
  const filled = template
    .replaceAll('{{AGENT_ID}}', mapping.slug)
    .replaceAll('{{PERSONA_NAME}}', mapping.persona)
    .replaceAll('{{ROLE}}', mapping.role)
    .replaceAll('{{ICON}}', mapping.icon)
    .replaceAll('{{WHEN_TO_USE}}', `Use pra ${mapping.role.toLowerCase()} — traduzido de customGPT "${extracted.name}".`)
    .replaceAll('{{ARCHETYPE}}', 'Especialista Importado')
    .replaceAll('{{LAYER}}', mapping.layer)
    .replaceAll('{{REPORTS_TO}}', mapping.reportsTo)
    .replaceAll('{{TONE}}', 'profissional, direto')
    .replaceAll('{{MODEL_TIER}}', mapping.tier)
    .replaceAll('{{SIGNATURE_TAG}}', sigTag)
    .replaceAll('{{RECEBE_DE}}', mapping.reportsTo)
    .replaceAll('{{ENVIA_PARA}}', '@qa Crivo')
    .replaceAll('{{ANTI_PAPEL_1}}', 'NÃO substitui agentes em5 existentes — opera só no seu domínio importado')
    .replaceAll('{{ANTI_PAPEL_2}}', 'NÃO bypassa @qa Crivo pra outputs cliente-facing')
    .replaceAll('{{ANTI_PAPEL_3}}', 'NÃO acessa toolsets fora do Composio')
    .replaceAll('{{COMMANDS_LIST}}', '  - name: executar\n    description: TODO — adaptar prompt original em tasks')
    .replaceAll('{{DATA}}', new Date().toISOString().slice(0, 10));

  // Adiciona seção com system prompt original como referência
  const promptSection = `

---

## Prompt Original (customGPT importado)

> Referência do customGPT original. Não executar literalmente — adapte pra tasks individuais.

\`\`\`
${extracted.systemPrompt.slice(0, 5000)}
\`\`\`

${extracted.systemPrompt.length > 5000 ? `\n*(prompt truncado em 5000 chars — original tem ${extracted.systemPrompt.length})*` : ''}
`;

  return filled + promptSection;
}

function generateDataFiles(extracted, mapping) {
  const dataDir = path.join(ROOT, '.em5/core/data', mapping.slug);
  fs.mkdirSync(dataDir, { recursive: true });

  const written = [];
  for (const file of extracted.knowledgeFiles) {
    const outPath = path.join(dataDir, file.name);
    fs.writeFileSync(outPath, file.content);
    written.push(outPath);
  }

  // Manifest
  const manifest = `# Knowledge — ${mapping.persona}

Importado de customGPT em ${new Date().toISOString().slice(0, 10)}.

## Arquivos

${extracted.knowledgeFiles.map((f) => `- ${f.name} (${f.content.length} chars)`).join('\n')}

## Uso

Carregado por @${mapping.slug} (${mapping.persona}) quando relevante pro contexto da task.
`;
  const manifestPath = path.join(dataDir, '_MANIFEST.md');
  fs.writeFileSync(manifestPath, manifest);
  written.push(manifestPath);

  return written;
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Uso: em5-import-gpt <caminho-do-zip-ou-json-ou-folder>');
    process.exit(1);
  }

  console.log(`\n🤖 em5 customGPT Importer\n`);
  console.log(`Source: ${inputPath}`);

  const format = detectFormat(inputPath);
  console.log(`Format: ${format}`);

  let extracted;
  if (format === 'folder') extracted = extractFromFolder(inputPath);
  else if (format === 'claude-project-json') extracted = extractFromClaudeJSON(inputPath);
  else if (format === 'openai-zip') {
    console.error('❌ ZIP OpenAI requer unzip prévio. Extraia primeiro: unzip seu-gpt.zip -d folder/');
    process.exit(1);
  }

  const mapping = await proposeMappings(extracted);

  console.log('\n📝 Mapping proposto:');
  console.log(JSON.stringify(mapping, null, 2));
  const confirm = (await ask('\nConfirma? [S/n]: ')).toLowerCase();
  if (confirm === 'n') {
    console.log('Abortado.');
    rl.close();
    return;
  }

  const agentPath = path.join(ROOT, '.em5/agents', `${mapping.slug}.md`);
  if (fs.existsSync(agentPath)) {
    console.error(`❌ Agente já existe: ${agentPath}`);
    rl.close();
    process.exit(1);
  }

  fs.writeFileSync(agentPath, generateAgentFile(extracted, mapping));
  console.log(`✓ Criado: ${agentPath}`);

  const dataFiles = generateDataFiles(extracted, mapping);
  console.log(`✓ ${dataFiles.length} data files em .em5/core/data/${mapping.slug}/`);

  console.log('\n📋 Próximos passos manuais:');
  console.log('  1. Revise .em5/agents/' + mapping.slug + '.md');
  console.log('  2. Crie tasks específicas em .em5/core/tasks/' + mapping.slug + '/');
  console.log('  3. Adicione @' + mapping.slug + ' em CLAUDE.md, AGENTS.md, em5-config.yaml');
  console.log('  4. Rode /validate-em5 pra checar conformidade');
  console.log('  5. Considere submeter pro @reviewer Lima via /construir CT-{X}');

  rl.close();
}

main().catch((e) => {
  console.error(`❌ Erro: ${e.message}`);
  rl.close();
  process.exit(1);
});
