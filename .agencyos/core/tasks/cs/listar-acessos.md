---
name: listar-acessos
agent: cs
description: Gerar lista de acessos necessários baseada nos canais selecionados pelo cliente
inputs:
  - nome do cliente (workspace já criado)
  - canais selecionados (Meta Ads, Google Ads, Instagram, site, GA4, etc.)
outputs:
  - .agencyos/clientes/{nome}/setup-tecnico/acessos.md
elicit: true
---

# Listar Acessos Necessários

## Objetivo

Gerar a lista completa de acessos que o cliente precisa fornecer, baseada nos canais e ferramentas que serão utilizados no plano. Usar durante a fase de setup técnico (Flow 1.5).

## Regra

Se o briefing final já está disponível, extrair os canais de lá. Se não, perguntar ao usuário quais canais serão utilizados antes de gerar a lista.

---

## Passo a passo

### 1. Identificar canais ativos

Verificar se existe `briefing-final.md` em `.agencyos/clientes/{nome}/onboarding/`. Se existir, extrair os canais que serão utilizados.

Se não existir, perguntar:

```
Quais canais serão utilizados para o {nome}?

Selecione todos que se aplicam:
[1] Meta Ads (Facebook + Instagram Ads)
[2] Google Ads (Search, Display, Shopping, YouTube)
[3] Instagram orgânico (conteúdo orgânico, stories, reels)
[4] Site / Landing Page
[5] GA4 (Google Analytics 4)
[6] Google Tag Manager
[7] WhatsApp Business / Evolution API
[8] CRM (qual?)
[9] Ferramenta de e-mail marketing
[10] Outros: ___________
```

### 2. Gerar lista de acessos por canal

Criar `.agencyos/clientes/{nome}/setup-tecnico/acessos.md` com o formato abaixo. Incluir **apenas** os canais selecionados.

```markdown
# Acessos Necessários — {Nome do Cliente}

**Data:** {data}
**Responsável:** Sol (CS)
**Gerado por:** *listar-acessos

---

## Acessos Solicitados

{incluir apenas seções dos canais selecionados}
```

### 3. Seções de acessos por canal

Para cada canal selecionado, incluir a seção correspondente:

#### Meta Ads (quando selecionado)

```markdown
## Meta Ads
- [ ] Acesso ao Business Manager (função: Administrador ou Editor de Anúncios)
- [ ] Acesso à Conta de Anúncios (ID: ___________)
- [ ] Acesso ao Meta Pixel (ID: ___________)
- [ ] Acesso à Página do Facebook (se necessário para criativo)
- [ ] Acesso ao Instagram Business (perfil vinculado ao BM)

**Como solicitar:**
O cliente deve acessar business.facebook.com > Configurações > Pessoas > Adicionar > inserir o e-mail da agência.
```

#### Google Ads (quando selecionado)

```markdown
## Google Ads
- [ ] Acesso à conta Google Ads (ID: ___________)
- [ ] Permissionamento como Administrador ou Padrão
- [ ] Conta de pagamento vinculada (confirmar se existe)

**Como solicitar:**
O cliente deve acessar ads.google.com > Ferramentas e Configurações > Acesso à conta > inserir o e-mail da agência.
```

#### Instagram (quando selecionado)

```markdown
## Instagram
- [ ] Login e senha do perfil Instagram Business
- [ ] Ou: perfil vinculado ao Business Manager via configuração de página

**Observação:** Se o perfil já estiver vinculado ao BM do Meta Ads, o acesso direto não é necessário.
```

#### Site / Hosting (quando selecionado)

```markdown
## Site / Landing Page / Hosting
- [ ] Acesso ao painel do site (WordPress, Wix, etc.) — se precisar instalar pixel
- [ ] URL da página principal: ___________
- [ ] URL das páginas de conversão (obrigado/confirmação): ___________
- [ ] Acesso ao domínio / DNS (se necessário)
- [ ] Certificado SSL ativo? [ ] Sim [ ] Não [ ] Não sei
```

#### GA4 (quando selecionado)

```markdown
## Google Analytics 4
- [ ] Acesso ao GA4 como editor/administrador
- [ ] ID da propriedade (G-___________)
- [ ] Confirmar se já coleta dados ativamente

**Como solicitar:**
O cliente deve acessar analytics.google.com > Administrador > Acesso à propriedade > Adicionar usuário > inserir e-mail com permissão de Editor.
```

#### Google Tag Manager (quando selecionado)

```markdown
## Google Tag Manager
- [ ] Acesso ao GTM como Administrador
- [ ] ID do container (GTM-___________)
- [ ] Confirmar se já implementado no site
```

#### WhatsApp Business / Evolution API (quando selecionado)

```markdown
## WhatsApp Business / Evolution API
- [ ] Número do WhatsApp Business
- [ ] Se usa Evolution API: URL da instância e API key
- [ ] Se usa outro CRM de WhatsApp: nome da ferramenta e acesso
```

#### CRM (quando selecionado)

```markdown
## CRM
- [ ] Nome da ferramenta: ___________
- [ ] URL de acesso: ___________
- [ ] Criação de usuário para a agência ou compartilhamento de credenciais
```

#### E-mail Marketing (quando selecionado)

```markdown
## E-mail Marketing
- [ ] Nome da ferramenta (Mailchimp, ActiveCampaign, etc.): ___________
- [ ] Acesso como administrador
- [ ] Lista de contatos existente? [ ] Sim [ ] Não
```

### 4. Criar tabela de status

Ao final da lista de acessos, incluir:

```markdown
---

## Status de Coleta

| Item | Solicitado em | Recebido em | Validado | Observações |
|------|--------------|-------------|---------|-------------|
| {item 1} | {data} | | | |
| {item 2} | {data} | | | |
```

### 5. Atualizar log operacional

```markdown
| {data} | ACESSOS | CS | Lista de acessos gerada para {nome}. Total de {N} itens solicitados. | EM ANDAMENTO | Aguardar resposta do cliente |
```

## Output esperado

- Arquivo `acessos.md` contendo apenas os acessos relevantes para os canais selecionados
- Tabela de status de coleta para acompanhamento
- Log operacional atualizado
