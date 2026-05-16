---
name: validar-tracking
agent: cs
description: Gerar checklist manual de validacao de pixel, eventos, GA4 e conversoes para o setup tecnico
inputs:
  - nome do cliente (workspace ja criado)
  - canais selecionados (do briefing-final.md ou da lista de acessos)
outputs:
  - .em5/clientes/{nome}/setup-tecnico/checklist-tracking.md
  - atualiza log-operacional.md
elicit: true
---

# Validar Tracking

## Objetivo

Gerar o checklist completo de validacao de tracking (pixels, eventos, GA4, conversoes) para garantir que toda coleta de dados esta funcionando antes do inicio das campanhas. Usar durante o setup tecnico (Flow 1.5).

## Regra de Honestidade (Artigo VI da Constituicao)

Este sistema NAO valida pixels, tags ou eventos automaticamente sem integracao real configurada. O resultado e sempre um **checklist manual** que o CS (Sol) deve preencher com base na verificacao humana. Nunca afirmar que validou algo sem verificacao real.

Se houver extensao como Meta Pixel Helper ou Tag Assistant disponivel, orientar o usuario a usar e reportar o resultado.

---

## Passo a passo

### 1. Identificar canais ativos

Ler `acessos.md` em `.em5/clientes/{nome}/setup-tecnico/` para saber quais plataformas estao sendo utilizadas e gerar o checklist correspondente.

### 2. Solicitar URLs do cliente

Perguntar ao usuario (ou verificar no briefing):

```
Preciso das seguintes informacoes para montar o checklist:

1. URL do site / landing page principal: ___________
2. URL da pagina de obrigado/conversao (se houver): ___________
3. URL da pagina de vendas: ___________
4. Ha alguma outra pagina importante para rastrear? ___________
```

### 3. Gerar checklist de tracking

Criar `.em5/clientes/{nome}/setup-tecnico/checklist-tracking.md` com o formato abaixo. Incluir apenas as secoes relevantes para os canais do cliente.

```markdown
# Checklist de Tracking — {Nome do Cliente}

**Data da verificacao:** {data}
**Responsavel:** Sol (CS)
**Gerado por:** *validar-tracking

---

## Metodo de Verificacao

> ESTE E UM CHECKLIST MANUAL. Cada item deve ser verificado manualmente e marcado conforme resultado.
> Ferramentas recomendadas:
> - Meta Pixel Helper (extensao Chrome) — para Meta Pixel
> - Tag Assistant / GTM Preview — para Google Tag Manager
> - GA4 DebugView — para eventos do GA4

---

{incluir secoes apenas dos canais selecionados}
```

### 4. Secoes do checklist por plataforma

#### Meta Pixel (quando Meta Ads selecionado)

```markdown
## Meta Pixel

**URLs para testar:**
- Pagina principal: {url_site}
- Pagina de conversao: {url_obrigado}
- Pagina de vendas: {url_vendas}

### Instalacao
- [ ] Meta Pixel instalado no site (verificar com Pixel Helper)
- [ ] Pixel ID encontrado: ___________
- [ ] Pixel vinculado a conta de anuncios correta

### Eventos na pagina principal
- [ ] PageView disparando (Pixel Helper mostra verde)
- [ ] ViewContent configurado (se aplicavel)

### Eventos na pagina de conversao / obrigacao
- [ ] Lead disparando em clique de WhatsApp / formulario
- [ ] SubmitApplication disparando (se formulario)
- [ ] Contact disparando (se ligacao/WhatsApp)

### Eventos na pagina de obrigado (pos-conversao)
- [ ] Purchase/CompleteRegistration disparando
- [ ] Valor de conversao passando corretamente (se aplicavel)
- [ ] Parametros UTM preservados na URL de obrigado

### Conversoes configuradas no Events Manager
- [ ] Evento de Lead configurado como conversao
- [ ] Evento de Purchase configurado como conversao (se e-commerce)
- [ ] Janela de atribuicao definida (7d click / 1d view padrao)

### Observacoes
{anotar qualquer problema encontrado: pixel duplicado, evento nao disparando, erro de valor, etc.}
```

#### Google Analytics 4 (quando GA4 selecionado)

```markdown
## Google Analytics 4

**Propriedade ID:** G-___________

### Instalacao
- [ ] Tag GA4 instalada no site (verificar com Tag Assistant)
- [ ] Dados aparecendo no relatorio em tempo real
- [ ] Filtros de spam configurados (se aplicavel)

### Eventos
- [ ] Evento de page_view disparando
- [ ] Evento de scroll configurado (25%, 50%, 75%, 100%)
- [ ] Evento de clique em link externo (se aplicavel)
- [ ] Evento de clique em WhatsApp configurado
- [ ] Evento de envio de formulario configurado
- [ ] Evento de file_download configurado (se aplicavel)

### Conversoes
- [ ] Evento de Lead marcado como conversao principal
- [ ] Evento de Purchase marcado como conversao principal (se e-commerce)

### Funil
- [ ] Funil basico configurado (sessao > engajamento > lead)
- [ ] Audiencia de remarketing criada (visitou LP + nao converteu)

### Observacoes
{anotar qualquer problema encontrado}
```

#### Google Tag Manager (quando GTM selecionado)

```markdown
## Google Tag Manager

**Container ID:** GTM-___________

### Implementacao
- [ ] Container implementado no site (verificar no codigo-fonte)
- [ ] Tag do GA4 configurada no GTM
- [ ] Tag do Meta Pixel configurada no GTM (se usado via GTM)
- [ ] Tags de conversao configuradas

### Triggers
- [ ] Trigger de clique em WhatsApp
- [ ] Trigger de envio de formulario
- [ ] Trigger de visualizacao de pagina de obrigado
- [ ] Trigger de scroll (se configurado)
- [ ] Trigger de clique em link externo (se configurado)

### Modo Preview
- [ ] GTM Preview mode testado — todas as tags disparando corretamente
- [ ] Sem erros no console do navegador durante Preview

### Observacoes
{anotar qualquer problema encontrado}
```

#### Google Ads (quando Google Ads selecionado)

```markdown
## Google Ads — Tag de Conversao

### Implementacao
- [ ] Tag global do site (gtag) instalada
- [ ] Snippet de conversao na pagina de obrigado
- [ ] Conversao de importacao do GA4 configurada (se aplicavel)

### Conversoes configuradas
- [ ] Conversao de lead configurada
- [ ] Conversao de venda configurada (se aplicavel)
- [ ] Valor da conversao definido corretamente
- [ ] Janela de conversao definida (padrao: 30 dias)

### Remarketing
- [ ] Lista de remarketing criada (visitantes do site)
- [ ] Lista de remarketing de conversoes configurada (se aplicavel)

### Observacoes
{anotar qualquer problema encontrado}
```

### 5. Gerar resumo de status

Adicionar ao final do checklist:

```markdown
---

## Resumo da Verificacao

| Plataforma | Instalado? | Eventos OK? | Conversoes OK? | Observacao |
|-----------|-----------|-------------|----------------|-------------|
| Meta Pixel | [ ] | [ ] | [ ] | |
| GA4 | [ ] | [ ] | [ ] | |
| Google Tag Manager | [ ] | [ ] | [ ] | |
| Google Ads | [ ] | [ ] | [ ] | |

## Status Final

[ ] TODOS OS TRACKINGS VALIDADOS — pronto para campanhas
[ ] PARCIAL — itens abaixo pendentes
[ ] NAO VALIDADO — aguardando acesso ou implementacao

### Pendencias
{listar itens que ainda precisam ser resolvidos}
```

### 6. Atualizar log operacional

```markdown
| {data} | TRACKING | CS | Checklist de tracking gerado para {nome}. Verificacao: {completa/parcial/pendente}. | {CONCLUÍDO/EM ANDAMENTO} | {proximo passo} |
```

## Output esperado

- Arquivo `checklist-tracking.md` com todos os itens de verificacao gerados
- Resumo de status com situacao de cada plataforma
- Log operacional atualizado
- Se todos os trackings validados: cliente pode avancar para execucao
- Se pendencias: listar o que falta e quem e responsavel por resolver
