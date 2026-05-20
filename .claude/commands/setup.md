# /setup — Wizard único de configuração em5

**Argumento:** `/setup` (sem args — modo wizard interativo)

## O que este comando faz

Configuração completa da agência em 7 etapas guiadas. Roda 1x na instalação inicial OU pra reconfigurar.

Antes era multi-step manual. Agora é **wizard único** — você responde 1 pergunta por vez, ele preenche tudo.

## 7 etapas do wizard

### 1. Identidade agência (2min)
- Nome agência
- Nome do dono/operador
- Email principal
- URL site (se houver)
- Fuso horário

### 2. Serviços oferecidos (1min)
Multi-select:
- [ ] Tráfego pago Meta Ads
- [ ] Tráfego pago Google Ads
- [ ] Social media orgânico
- [ ] Design gráfico
- [ ] Vídeo / UGC
- [ ] Landing pages
- [ ] Email marketing
- [ ] WhatsApp Business
- [ ] Consultoria estratégica
- [ ] Lançamentos
- [ ] Outro: ___

### 3. Composio MCP (3min)
- API Key Composio
- Toolsets mínimos: meta_ads + google_analytics + gmail + slack + google_sheets
- Toolsets opcionais conforme serviços (whatsapp_business, asaas, semrush, etc.)

### 4. Fantasy names agentes (opcional, 1min)
Aceitar defaults OU customizar:
- @ceo Atlas · @coo Nexus · @cs Sol · @strategist Vera · @traffic Pulse
- @copywriter Eco · @designer Lux · @qa Crivo · @arq Arq · @builder Cunha
- @reviewer Lima · @vendas Caça · @fin Caixa · @scout Espia · @whats Onda

### 5. Financeiro Asaas (3min)
- Conta Asaas existente? [s/n]
- Se sim: `ASAAS_ACCESS_TOKEN` no `.env`
- Se não: pular (configurar quando habilitar @fin)

### 6. WhatsApp (opcional, 2min)
- Composio whatsapp_business OR WAHA selfhosted OR pular
- Skill complementar: `/whats-setup`

### 7. Validação final (2min)
Auto-gera:
- `em5-config.yaml` atualizado
- `.claude/CLAUDE.md` com dados agência
- `.env` (gitignored)

Health check automático:
- Composio conecta? ✅/❌
- 15 agentes registrados? ✅
- 84 workflows válidos? ✅
- Constitution 13 artigos OK? ✅

## Output esperado fim wizard

```
✅ em5 configurado!

📊 Resumo:
- Agência: {nome}
- Serviços ativos: {N}
- Composio: {N} toolsets
- Asaas: {ativo/pendente}
- WhatsApp: {ativo/pendente}

🎯 Próximo passo:
- Criar 1º cliente: /cliente-novo {nome}
- Classificar perfil: /perfil-cliente {nome}
- Validar acessos: /check-cliente {nome}

📚 Refs:
- .em5/README.md (arquitetura)
- .em5/system/constitution-index.md (13 artigos)
- .em5/workflows/_roadmap.md (84 workflows)
- .em5/workflows/_rotinas.md (cadências)
```

## Filosofia

> **Setup = uma vez.** Não tente entender tudo agora. Entender vem quando precisar usar (1ª `/campanha`, 1ª `/relatorio`, etc).

Princípio "Entrega antes de estrutura" — `/setup` te dá base mínima pra rodar `/cliente-novo` em <= 10min.

## Reconfiguração

Roda `/setup` de novo — detecta config existente, pergunta só o que mudar:
- "Mudar nome agência? [s/N]"
- "Adicionar serviço novo? [s/N]"
- "Adicionar toolset Composio? [s/N]"

NÃO sobrescreve cliente existente — só config agência.

## Referência técnica

Spec detalhada: `.em5/infra/setup/system-onboarding.md`

## Anti-padrões

- Pular etapa 3 (Composio) — sistema não opera sem
- Customizar 15 fantasy names sem necessidade — defaults são bons
- Configurar @fin sem Asaas — workflows financeiros falham silencioso
- Configurar WhatsApp antes de validar com 1º cliente — overhead prematuro

## Histórico

Toda execução `/setup` append em `.em5/system/learnings/setup-history.md` (datas + mudanças).
