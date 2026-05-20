---
name: setup-tecnico
agent: cs
description: Listar, solicitar e validar todos os acessos técnicos necessários antes da execução das campanhas
inputs:
  - clientes/{nome}/onboarding/briefing-final.md (para saber quais canais serão usados)
outputs:
  - clientes/{nome}/setup-tecnico/acessos.md
  - clientes/{nome}/setup-tecnico/checklist-tracking.md
  - clientes/{nome}/setup-tecnico/status.md
model_tier: balanced  # auto-set Fase 12.AAA legacy audit
elicit: true
---

# Setup Técnico do Cliente

## Objetivo

Garantir que todos os acessos, integrações e itens de tracking estejam prontos antes da execução das campanhas.

## Regra do CLI

```
Se integração real configurada → validar automaticamente
Se não houver integração → gerar checklist manual, NUNCA fingir validação
```

---

## Passo a passo

### 1. Identificar canais do plano

Ler `briefing-final.md` e identificar quais canais serão utilizados para montar a lista correta de acessos necessários.

### 2. Gerar lista de acessos necessários

Criar `clientes/{nome}/setup-tecnico/acessos.md`:

```markdown
# Acessos Necessários — {Nome do Cliente}

**Data:** {data}
**Responsável:** Sol (CS)

---

## Meta Ads
- [ ] Acesso ao Business Manager (função: Administrador ou Editor de Anúncios)
- [ ] Acesso à Conta de Anúncios (ID: ___________)
- [ ] Acesso ao Meta Pixel (ID: ___________)
- [ ] Acesso à Página do Facebook (se necessário para criativo)
- [ ] Acesso ao Instagram (se necessário)

## Google Ads *(se aplicável)*
- [ ] Acesso à conta Google Ads (ID: ___________)
- [ ] Acesso ao GA4 (ID: ___________)
- [ ] Acesso ao Google Tag Manager (se existir)
- [ ] Conversões configuradas

## Site / Landing Page
- [ ] Pixel instalado no site
- [ ] Eventos principais disparando (Lead, Purchase, ViewContent)
- [ ] URL da LP principal: ___________
- [ ] Acesso ao painel do site (se precisar instalar pixel)

## Outros
- [ ] WhatsApp Business API / Evolution API (se aplicável)
- [ ] CRM: ___________ (se aplicável)
- [ ] Ferramenta de formulários: ___________ (se aplicável)

---

## Status de Coleta

| Item | Solicitado | Recebido | Validado |
|------|-----------|---------|---------|
| Business Manager | | | |
| Conta de Anúncios | | | |
| Pixel | | | |
| GA4 | | | |
| Site/LP | | | |
```

### 3. Solicitar acessos ao cliente

Usar template de mensagem:

```
Olá {nome_contato}! Para dar início às campanhas precisamos de alguns acessos técnicos.

Segue a lista do que precisamos:

📱 META ADS:
• Acesso ao Business Manager como administrador
• Confirmar se o pixel está instalado no site

🔍 GOOGLE:
• Acesso ao Google Ads
• Acesso ao GA4

Você pode me enviar os acessos por aqui ou posso te mandar o passo a passo de como compartilhar?

Assim que recebermos tudo, conseguimos começar em {prazo_estimado}. 🚀
```

### 4. Gerar checklist de tracking

Criar `clientes/{nome}/setup-tecnico/checklist-tracking.md`:

```markdown
# Checklist de Tracking — {Nome do Cliente}

**Data da verificação:** {data}

## Meta Pixel
- [ ] Pixel encontrado no site
- [ ] Evento PageView disparando
- [ ] Evento Lead configurado (formulário, WhatsApp click, etc.)
- [ ] Evento Purchase configurado (se e-commerce)
- [ ] Pixel vinculado à conta de anúncios correta

## Google Analytics 4
- [ ] GA4 instalado e coletando dados
- [ ] Evento de conversão configurado
- [ ] Funil básico rastreado

## Observações
{qualquer inconsistência encontrada}
```

### 5. Registrar status técnico

Criar `clientes/{nome}/setup-tecnico/status.md`:

```markdown
# Status Técnico — {Nome do Cliente}

**Última atualização:** {data}

## Resumo

| Item | Status | Observação |
|------|--------|------------|
| Business Manager | ✅ OK / ⏳ Aguardando / ❌ Problema | |
| Conta de Anúncios | | |
| Pixel Meta | | |
| GA4 | | |
| Site/LP | | |

## Pendências Abertas

- {listar o que ainda falta}

## Liberado para execução?

[ ] SIM — todos os itens críticos estão OK
[ ] NÃO — pendências abertas (listar)
```

### 6. Atualizar log operacional

```markdown
| {data} | SETUP | CS | Setup técnico iniciado. Acessos solicitados para {nome_contato}. | EM ANDAMENTO | Aguardar confirmação de acessos |
```

## Output esperado

- `acessos.md` com lista completa e status de cada item
- `checklist-tracking.md` preenchido
- `status.md` com visão geral do estado técnico
- Cliente apto para avançar para estratégia quando status = LIBERADO
