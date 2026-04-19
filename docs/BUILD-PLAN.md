# AgencyOS — Plano de Construção e Continuidade

> Este documento existe para garantir que qualquer agente possa retomar a construção do AgencyOS de onde parou, com contexto completo sobre o que foi feito, o que falta e como fazer.

---

## O que é o AgencyOS

Framework operacional para agências de marketing digital construído **nativamente no OpenClaw Gateway**. 

**Princípio central:** `AGENTE = PAPEL, SKILL = EXECUÇÃO`

O sistema opera usando o roteamento de múltiplos agentes do OpenClaw (`agents.json`), onde a orquestradora (ISIS) delega ações precisas (Skills) para agentes especialistas (Sol, Max, Vera, etc).

---

## Estrutura do Projeto Atualizada

```
AgencyOS/
├── AGENTS.md                        ✅ FEITO — Mapa geral de operação
├── SOUL.md                          ✅ FEITO — Identidade e regras da ISIS (Main Agent)
├── USER.md                          ✅ FEITO — Contexto do dono da agência (Tai)
├── agents.json                      ✅ FEITO — Roteamento dos sub-agentes no OpenClaw
├── agents/                          ✅ TODOS OS AGENTES FEITOS E CONVERGIDOS
│   ├── cs.md                        ✅ (Sol ☀️)
│   ├── estrategista.md              ✅ (Vera 🎯)
│   ├── gestor-trafego.md            ✅ (Max 📊)
│   ├── copywriter.md                ✅ (Cal ✍️)
│   ├── designer.md                  ✅ (Lux 🎨)
│   └── qa-campanha.md               ✅ (Zara 🔍)
├── skills/                          ⚠️ CONVERTENDO TASKS EM SKILLS OPENCLAW
│   ├── coletar-briefing/SKILL.md    ❌ PENDENTE (Migrar conceito antigo para Skill)
│   └── ...                          ❌ PENDENTE (Criar 49 skills)
├── operations/                      ⚠️ MIGRANDO DE .agencyos/core/
│   ├── constitution.md              ✅ FEITO (Princípios)
│   ├── templates/                   ❌ PENDENTE (Templates de negócio)
│   ├── data/                        ❌ PENDENTE (YAML de referência)
│   ├── workflows/                   ❌ PENDENTE (YAML de rotinas)
│   └── checklists/                  ❌ PENDENTE (Validações)
├── clients/                         
│   └── _template/                   ✅ ESTRUTURA DE PASTAS BASE CRIADA
```

---

## TAREFAS PENDENTES (Fase 1: Conversão de Conteúdo)

### Tarefa 1 — Transformar Tasks em Skills do OpenClaw

As antigas "tasks" executáveis agora devem ser criadas como **Skills**. 
Onde criar: `skills/{nome-da-skill}/SKILL.md` com Frontmatter YAML obrigatório.

#### Skills do CS (Sol)
- [ ] `iniciar-onboarding`
- [ ] `coletar-briefing`
- [ ] `gerar-briefing-final`
- [ ] `listar-acessos`
- [ ] `validar-tracking`
- [ ] `registrar-status-tecnico`
- [ ] `registrar-interacao`
- [ ] `gerar-proximos-passos`
- [ ] `enviar-relatorio`

#### Skills do Estrategista (Vera)
- [ ] `analisar-briefing`
- [ ] `validar-objetivo-real`
- [ ] `definir-posicionamento`
- [ ] `criar-plano-estrategico`
- [ ] `definir-funil-macro`
- [ ] `criar-hipoteses`
- [ ] `analisar-call`

#### Skills do Gestor de Tráfego (Max)
- [ ] `auditar-conta`
- [ ] `mapear-publicos`
- [ ] `estruturar-campanha`
- [ ] `solicitar-criativos`
- [ ] `monitorar-performance`
- [ ] `otimizar-campanha`
- [ ] `gerar-relatorio`
- [ ] `modo-cro`
- [ ] `modo-growth`

#### Skills do Copywriter (Cal)
- [ ] `analisar-icp`
- [ ] `criar-angulos`
- [ ] `criar-conceitos`
- [ ] `escrever-copy`
- [ ] `adaptar-canal`
- [ ] `registrar-peca-log`
- [ ] `iterar-com-base-em-performance`

#### Skills do Designer (Lux)
- [ ] `ler-branding`
- [ ] `definir-conceito-visual`
- [ ] `gerar-imagem`
- [ ] `gerar-video`
- [ ] `gerar-ugc`
- [ ] `versionar-criativo`
- [ ] `registrar-log-criativo`
- [ ] `iterar-criativo`

#### Skills do QA (Zara)
- [ ] `validar-copy`
- [ ] `validar-criativo`
- [ ] `validar-campanha`
- [ ] `validar-landing-page`
- [ ] `emitir-veredicto`
- [ ] `registrar-qa`

#### Skills da Orquestradora (ISIS / Atlas)
- [ ] `criar-pasta-cliente`
- [ ] `listar-clientes`
- [ ] `status-cliente`
- [ ] `health-sistema`

---

### Tarefa 2 — Migrar Templates para `operations/templates/`

Criar/Migrar os seguintes templates baseados em markdown:
- `briefing/briefing-final.md`
- `briefing/briefing-perguntas.md`
- `estrategia/plano-estrategico.md`
- `logs/log-operacional.md`, `log-performance-criativa.md`, `log-growth.md`
- `relatorios/relatorio-whatsapp.md`, `relatorio-completo.md`
- `contratos/contrato-base.md`
- `copy/copy-anuncio.md`, `roteiro-video.md`, `copy-landing-page.md`, `copy-whatsapp.md`, `headline-banco.md`
- `setup-tecnico/checklist-tracking.md`, `status-tecnico.md`

---

### Tarefa 3 — Migrar Data, Workflows e Checklists para `operations/`

**Data (`operations/data/`):**
- `estrutura-pastas.yaml`
- `canais-suportados.yaml`
- `kpis-por-objetivo.yaml`
- `gatilhos-mentais.yaml`
- `nomenclatura-campanhas.yaml`

**Workflows (`operations/workflows/`):**
- `onboarding-cliente.yaml`
- `ciclo-campanha.yaml`
- `iteracao-criativa.yaml`

**Checklists (`operations/checklists/`):**
- `checklist-pre-lancamento.md`
- `checklist-onboarding-completo.md`
- `checklist-relatorio-mensal.md`

---

## Como Retomar

1. Leia este arquivo.
2. Identifique qual das tarefas pendentes acima (Skills, Templates, ou Data/Workflows) ainda precisa ser feita.
3. Se for criar Skills, assegure-se de usar a estrutura de pastas e o Frontmatter YAML correto (`skills/<nome>/SKILL.md`).
4. Ao concluir, marque o `[ ]` como `[x]`.
