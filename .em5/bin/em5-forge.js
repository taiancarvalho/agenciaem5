#!/usr/bin/env node

// em5-forge.js
// Wizard para criar agentes, tasks, playbooks no em5
// Uso: node .em5/bin/em5-forge.js [tipo]
// Tipos: agent | task | playbook

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rootDir = process.cwd();
const em5Dir = path.join(rootDir, '.em5');
const templatesDir = path.join(em5Dir, 'setup', 'forge-templates');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

const today = () => new Date().toISOString().slice(0, 10);

const slugify = (s) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const loadTemplate = (name) =>
  fs.readFileSync(path.join(templatesDir, `${name}.template.md`), 'utf8');

const fillTemplate = (tpl, vars) =>
  Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{{${k}}}`, v ?? ''),
    tpl
  );

async function forgeAgent() {
  console.log('\n🔥 em5 /forge agent — wizard\n');

  const id = slugify(await ask('? Slug do agente (ex: analytics, vendor-relations): '));
  const personaName = await ask('? Nome da persona (ex: Pulse, Nexus): ');
  const role = await ask('? Role/cargo (ex: Analista de Dados): ');
  const icon = await ask('? Emoji icon (ex: 📊): ');
  const archetype = await ask('? Arquetipo (ex: Investigador, Guardião, Construtor): ');
  const layer = (await ask('? Layer [estrategia|definicao|execucao|validacao]: ')).toLowerCase();
  const reportsTo = await ask('? Reporta pra (ex: @coo): ');
  const tone = await ask('? Tone de comunicação (ex: criterioso, objetivo): ');
  const tier = (await ask('? Model tier [frontier|balanced|haiku] (default: balanced): ')) || 'balanced';
  const whenToUse = await ask('? Quando usar (1 linha): ');
  const signatureTag = await ask('? Signature tag curta (ex: "dados no centro de tudo"): ');
  const recebeDe = await ask('? Recebe de (ex: @coo, @cs): ');
  const enviaPara = await ask('? Envia para (ex: @qa, @cs): ');
  const antiPapel = [
    await ask('? Anti-papel 1 (o que NÃO faz): '),
    await ask('? Anti-papel 2: '),
    await ask('? Anti-papel 3: '),
  ];
  const cmdsRaw = await ask('? Comandos (separe por vírgula, ex: ler-cliente,analisar): ');
  const commandsList = cmdsRaw.split(',').map((c) => `  - name: ${c.trim()}\n    description: TODO`).join('\n');

  const vars = {
    AGENT_ID: id,
    PERSONA_NAME: personaName,
    ROLE: role,
    ICON: icon,
    ARCHETYPE: archetype,
    LAYER: layer,
    REPORTS_TO: reportsTo,
    TONE: tone,
    MODEL_TIER: tier,
    WHEN_TO_USE: whenToUse,
    SIGNATURE_TAG: signatureTag,
    RECEBE_DE: recebeDe,
    ENVIA_PARA: enviaPara,
    ANTI_PAPEL_1: antiPapel[0],
    ANTI_PAPEL_2: antiPapel[1],
    ANTI_PAPEL_3: antiPapel[2],
    COMMANDS_LIST: commandsList,
    DATA: today(),
  };

  const tpl = loadTemplate('agent');
  const out = fillTemplate(tpl, vars);
  const outPath = path.join(em5Dir, 'agents', `${id}.md`);

  if (fs.existsSync(outPath)) {
    console.error(`❌ Agente já existe: ${outPath}`);
    process.exit(1);
  }

  fs.writeFileSync(outPath, out);
  console.log(`\n✓ Criado: ${outPath}`);
  console.log(`\n📋 Próximos passos manuais:`);
  console.log(`   1. Adicione @${id} (${personaName} ${icon}) em .claude/CLAUDE.md`);
  console.log(`   2. Adicione em .em5/AGENTS.md`);
  console.log(`   3. Adicione em em5-config.yaml:`);
  console.log(`        agents.${id}:\n          id: ${id}\n          fantasy_name: "${personaName}"\n          gender: "n"`);
  console.log(`   4. Crie tasks pro novo agente via: /forge task`);
}

async function forgeTask() {
  console.log('\n🔥 em5 /forge task — wizard\n');

  const agentId = (await ask('? Para qual agente (slug, ex: traffic): ')).trim();
  const taskName = slugify(await ask('? Nome da task (ex: auditar-conta-tiktok): '));
  const description = await ask('? Descrição curta: ');
  const whenToUse = await ask('? Quando usar: ');
  const inputs = await ask('? Inputs (separe por vírgula): ');
  const outputs = await ask('? Outputs (separe por vírgula): ');
  const elicit = ((await ask('? Pede confirmação (elicit)? [s/N]: ')).toLowerCase() === 's') ? 'true' : 'false';
  const tier = (await ask('? Model tier [frontier|balanced|haiku] (default: balanced): ')) || 'balanced';
  const prereqs = await ask('? Pré-requisitos: ');
  const step1 = await ask('? Step 1: ');
  const step2 = await ask('? Step 2: ');
  const step3 = await ask('? Step 3: ');
  const outputFormat = await ask('? Formato do output: ');

  const inputsList = inputs.split(',').map((i) => `  - ${i.trim()}`).join('\n');
  const outputsList = outputs.split(',').map((o) => `  - ${o.trim()}`).join('\n');

  const vars = {
    TASK_NAME: taskName,
    AGENT_ID: agentId,
    DESCRIPTION: description,
    INPUTS_LIST: inputsList,
    OUTPUTS_LIST: outputsList,
    ELICIT: elicit,
    MODEL_TIER: tier,
    WHEN_TO_USE: whenToUse,
    PREREQS: prereqs,
    STEP_1: step1,
    STEP_2: step2,
    STEP_3: step3,
    OUTPUT_FORMAT: outputFormat,
    DATA: today(),
  };

  const tpl = loadTemplate('task');
  const out = fillTemplate(tpl, vars);
  const dir = path.join(em5Dir, 'core', 'tasks', agentId);
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, `${taskName}.md`);

  if (fs.existsSync(outPath)) {
    console.error(`❌ Task já existe: ${outPath}`);
    process.exit(1);
  }

  fs.writeFileSync(outPath, out);
  console.log(`\n✓ Criado: ${outPath}`);
  console.log(`📋 Lembre de adicionar a task em .em5/agents/${agentId}.md → commands list`);
}

async function forgePlaybook() {
  console.log('\n🔥 em5 /forge playbook — wizard\n');

  const tipo = (await ask('? Tipo [nicho|canal]: ')).toLowerCase();
  const nichoOuCanal = slugify(await ask(`? Nome do ${tipo} (ex: clinica-odonto, tiktok-ads): `));
  const contexto = await ask('? Contexto (1-2 linhas): ');
  const cpl = await ask('? CPL target (ex: R$30): ');
  const txAgenda = await ask('? Taxa agendamento target (ex: 40%): ');
  const roas = await ask('? ROAS target (ex: 3x): ');
  const publicos = await ask('? Públicos vencedores (1-3 linhas): ');
  const antiPadroes = await ask('? Anti-padrões (o que NÃO fazer): ');

  const angulos = [];
  for (let i = 1; i <= 3; i++) {
    const a = await ask(`? Ângulo ${i} (ou enter pra pular): `);
    if (!a) { angulos.push({ a: '-', q: '-', ctr: '-', cpl: '-' }); continue; }
    const q = await ask(`?   Quando funciona ${i}: `);
    const ctr = await ask(`?   CTR baseline ${i}: `);
    const cplA = await ask(`?   CPL baseline ${i}: `);
    angulos.push({ a, q, ctr, cpl: cplA });
  }

  const vars = {
    NICHO_OU_CANAL: nichoOuCanal,
    TIPO: tipo,
    CONTEXTO: contexto,
    CPL_TARGET: cpl,
    TX_AGENDA_TARGET: txAgenda,
    ROAS_TARGET: roas,
    PUBLICOS: publicos,
    ANTI_PADROES: antiPadroes,
    ANGULO_1: angulos[0].a, QUANDO_1: angulos[0].q, CTR_1: angulos[0].ctr, CPL_1: angulos[0].cpl,
    ANGULO_2: angulos[1].a, QUANDO_2: angulos[1].q, CTR_2: angulos[1].ctr, CPL_2: angulos[1].cpl,
    ANGULO_3: angulos[2].a, QUANDO_3: angulos[2].q, CTR_3: angulos[2].ctr, CPL_3: angulos[2].cpl,
    CANAL_1: 'TODO',
    CANAL_2: 'TODO',
    DATA: today(),
  };

  const tpl = loadTemplate('playbook');
  const out = fillTemplate(tpl, vars);
  const prefix = tipo === 'nicho' ? 'nicho' : 'canal';
  const outPath = path.join(em5Dir, 'playbooks', `${prefix}-${nichoOuCanal}.md`);

  if (fs.existsSync(outPath)) {
    console.error(`❌ Playbook já existe: ${outPath}`);
    process.exit(1);
  }

  fs.writeFileSync(outPath, out);
  console.log(`\n✓ Criado: ${outPath}`);
  console.log(`📋 @strategist carregará automaticamente quando cliente.${tipo} = "${nichoOuCanal}"`);
}

async function main() {
  const arg = process.argv[2];
  const tipo = arg || (await ask('? O que criar [agent|task|playbook]: ')).toLowerCase();

  try {
    if (tipo === 'agent') await forgeAgent();
    else if (tipo === 'task') await forgeTask();
    else if (tipo === 'playbook') await forgePlaybook();
    else {
      console.error(`❌ Tipo inválido: ${tipo}. Use agent|task|playbook.`);
      process.exit(1);
    }
  } catch (e) {
    console.error(`❌ Erro: ${e.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
