# Agency OS — Flow 1.5: Setup Técnico do Cliente

# Objetivo

Garantir que todos os acessos, integrações, permissões e itens de tracking estejam prontos antes da execução das campanhas.

---

# Posição no sistema

Este fluxo acontece depois do onboarding e antes da estratégia e da execução.

## Sequência correta

```
Flow 1 — Onboarding do Cliente
↓
Flow 1.5 — Setup Técnico do Cliente
↓
Flow 2 — Estratégia
↓
Flow 3 — Execução
```

## Observação crítica

Acessos, integrações e tracking não pertencem ao onboarding estratégico nem à execução direta.

Eles precisam existir como etapa própria para evitar bagunça, retrabalho e campanha subindo sem base técnica.

---

# Princípio do CLI

## Regra central

```
O CLI não faz o mundo externo.
Ele organiza quem faz.
```

## Isso significa que o sistema não deve prometer:

- login automático em plataformas externas
- configuração mágica de Meta Ads
- configuração automática de GA4 sem integração disponível
- acesso autônomo a contas que exigem ação humana

## O que o sistema deve fazer

- listar acessos necessários
- solicitar o que falta
- organizar a coleta
- validar o que já foi entregue
- registrar status
- gerar checklist
- orientar a operação humana
- executar automaticamente apenas quando houver integração real configurada

---

# Entradas

- cliente já onboardado
- briefing já consolidado
- dados de contato do cliente
- contexto operacional do projeto

---

# Saídas

- acessos solicitados
- acessos confirmados
- checklist técnico preenchido
- tracking validado
- status técnico registrado
- cliente apto para seguir para estratégia e execução

---

# Agente responsável

## CS

O responsável principal por este fluxo continua sendo o CS.

Não há necessidade de criar um agente novo só para acessos ou tracking.

Isso continua dentro do mesmo domínio operacional do CS.

## Papel do CS neste fluxo

- listar acessos necessários
- solicitar acessos
- acompanhar pendências
- validar contas
- validar presença de tracking
- registrar o que está pronto e o que está faltando
- organizar o setup técnico do cliente

## Anti-papel

O CS não deve:

- operar mídia como gestor de tráfego
- definir estratégia
- prometer integração inexistente
- fingir validação quando a ferramenta externa não estiver conectada

---

# Workflow completo

```
1. Listar acessos necessários
2. Solicitar acessos ao cliente
3. Confirmar recebimento
4. Validar contas e permissões
5. Validar tracking
6. Registrar status técnico
7. Encerrar checklist técnico
```

---

# O que precisa ser validado

## Meta Ads

- acesso ao Business Manager
- acesso à conta de anúncios
- acesso ao pixel
- acesso à página, se necessário
- confirmação de permissões suficientes

## Google

- acesso ao Google Ads
- acesso ao GA4
- acesso ao Tag Manager, se existir
- conversões configuradas, se aplicável

## Site / Landing Page

- pixel instalado
- eventos principais disparando
- páginas relevantes disponíveis

## Outros ativos possíveis

- CRM
- WhatsApp / Evolution API
- ferramentas de formulário
- landing pages
- ferramentas de e-commerce
- dashboards

---

# Validação de tracking

## Objetivo

Garantir que a futura execução tenha base para medir resultado.

## O sistema deve verificar, quando possível

- se existe pixel
- se eventos principais foram configurados
- se existe GA4
- se conversões estão definidas
- se a infraestrutura mínima de medição existe

## Quando não for possível validar automaticamente

O sistema deve:

- registrar como pendente
- gerar checklist manual
- orientar o humano responsável

---

# Estrutura de arquivos

```
/clientes/cliente-x/setup-tecnico/
  acessos.md
  checklist-tracking.md
  status.md
```

## Finalidade dos arquivos

### [acessos.md](http://acessos.md)

Lista do que foi solicitado, do que foi entregue e do que ainda está faltando.

### [checklist-tracking.md](http://checklist-tracking.md)

Checklist técnico para validação dos pontos mínimos de medição.

### [status.md](http://status.md)

Resumo operacional do estado técnico atual do cliente.

---

# Tasks do CS

```
tasks/
  listar-acessos.md
  solicitar-acessos.md
  validar-acessos.md
  validar-meta-business.md
  validar-google-ads.md
  validar-ga4.md
  validar-pixel.md
  validar-eventos.md
  checklist-tracking.md
  registrar-status-tecnico.md
```

---

# Comandos esperados do CS

```
*listar-acessos
*solicitar-acessos
*confirmar-acessos
*validar-meta-business
*validar-google-ads
*validar-ga4
*validar-pixel
*validar-eventos
*gerar-checklist-tracking
*registrar-status-tecnico
```

---

# Templates necessários

```
templates/
  solicitacao-acessos.md
  checklist-tracking.md
  status-tecnico.md
```

---

# Data necessária

```
data/
  acessos-necessarios.yaml
  checklist-tracking.yaml
  integracoes-disponiveis.yaml
```

---

# Workflow técnico sugerido

```
workflows/
  setup-tecnico-cliente.yaml
```

---

# Regra de automação futura

## Comportamento ideal

```
if integração real configurada:
  executar validação automática
else:
  gerar checklist manual e registrar pendência
```

Isso permite que o sistema seja útil agora, sem depender de automações impossíveis, e também permite evolução futura com MCPs e integrações reais.

---

# O que este fluxo resolve

Se esse fluxo for bem feito:

- a execução não trava por falta de acesso
- o tracking não é descoberto tarde demais
- a estratégia não depende de adivinhação técnica
- a agência sabe o que está pronto e o que está pendente
- o cliente entra na operação com base mínima verificável

---

# Limite deste fluxo

Este fluxo não deve:

- substituir ação humana obrigatória em plataformas externas
- fingir conexão onde ela não existe
- misturar coleta de acessos com decisão estratégica
- virar execução de campanha

Ele existe para preparar a base técnica da operação de forma organizada, realista e executável dentro do princípio do CLI.