# Agency OS — Flow 1: Onboarding do Cliente

# Objetivo

Coletar, organizar e padronizar todas as informações do cliente para permitir execução consistente pela equipe.

---

# Posição no sistema

Este fluxo começa depois que:

- a agência já passou pelo próprio setup interno
- o cliente participou da reunião comercial
- o cliente decidiu fechar

## Observação crítica

Onboarding não é estratégia.

Onboarding = coleta + organização + padronização.

Estratégia = análise + interpretação + decisão.

Por isso, ICP real, mecanismo único, posicionamento aprofundado e leitura estratégica ficam para um fluxo posterior.

---

# Entradas

- cliente fechado
- transcrição da reunião comercial, se existir
- dados básicos do cliente
- template de contrato, se existir
- dados de contato da equipe e do cliente

---

# Saídas

- contrato gerado e armazenado
- contrato enviado
- assinatura confirmada
- estrutura de pastas do cliente criada
- grupo de WhatsApp criado
- mensagem de boas-vindas enviada
- briefing completo estruturado
- assets organizados
- documento final de onboarding salvo

---

# Workflow completo

```
1. Gerar contrato
2. Enviar contrato
3. Confirmar assinatura
4. Criar estrutura do cliente
5. Criar grupo WhatsApp
6. Enviar mensagem de boas-vindas
7. Coletar briefing
8. Estruturar briefing
9. Organizar assets
10. Gerar documento final de onboarding
```

---

# Agente responsável

## CS

O onboarding inteiro é responsabilidade de um único agente: CS.

Esse agente não deve ser quebrado em vários subagentes como contract agent, WhatsApp agent ou ops agent. Tudo isso pertence ao mesmo domínio operacional do CS.

## Regra estrutural

```
1 agente = 1 domínio de responsabilidade
AGENTE = PAPEL
TASK = EXECUÇÃO
```

O CS é o operador com um playbook completo de onboarding.

---

# Papel do agente CS

## Função principal

Executar o onboarding do cliente do início ao fim, transformando um cliente recém-fechado em um cliente documentado, organizado e pronto para a equipe operar.

## Anti-papel

O CS não deve:

- definir estratégia de tráfego
- construir ICP aprofundado
- tomar decisões estratégicas de posicionamento
- substituir o estrategista

## O que ele faz

- gera contrato
- envia contrato
- confirma assinatura
- cria pasta do cliente
- cria grupo de WhatsApp
- envia mensagem de boas-vindas
- coleta briefing
- estrutura briefing
- organiza assets
- gera documento final de onboarding

---

# Tasks do CS

```
tasks/
  gerar-contrato.md
  enviar-contrato.md
  confirmar-assinatura.md
  criar-pasta-cliente.md
  criar-grupo-whatsapp.md
  enviar-boas-vindas.md
  coletar-briefing.md
  estruturar-briefing.md
  organizar-assets.md
  gerar-documento-final-onboarding.md
```

## Sequência operacional esperada

```
CS
→ gerar-contrato
→ enviar-contrato
→ confirmar-assinatura
→ criar-pasta-cliente
→ criar-grupo-whatsapp
→ enviar-boas-vindas
→ coletar-briefing
→ estruturar-briefing
→ organizar-assets
→ gerar-documento-final-onboarding
```

---

# Comandos esperados do CS

```
*iniciar-onboarding
*gerar-contrato
*enviar-contrato
*confirmar-assinatura
*criar-pasta-cliente
*criar-grupo-whatsapp
*enviar-boas-vindas
*coletar-briefing
*estruturar-briefing
*organizar-assets
*gerar-onboarding-final
```

---

# Contrato

## Objetivo

Formalizar o início da relação comercial com o cliente.

## Possibilidades

- contrato padrão com variáveis substituíveis
- contrato enviado pelo próprio usuário, com placeholders em chaves duplas
- no futuro, integração com plataforma de assinatura

## Estrutura desejada

O sistema deve preencher variáveis a partir da transcrição da reunião ou dos dados informados.

## Saída esperada

```
/clientes/cliente-x/contrato/
  contrato-assinatura-pendente.md
  contrato-final.pdf
```

---

# Criação da pasta do cliente

## Objetivo

Criar uma estrutura previsível para todos os arquivos futuros do cliente.

## Estrutura inicial sugerida

```
/clientes/cliente-x/
  /contrato/
  /onboarding/
  /briefing/
  /assets/
  /relatorios/
  /campanhas/
```

## Regra

Nada pode ficar solto. Tudo precisa ter lugar previsível.

---

# Grupo de WhatsApp

## Objetivo

Criar o canal oficial de comunicação operacional com o cliente.

## Nome sugerido

```
[Nome da Agência] - [Nome do Cliente]
```

## Participantes esperados

- equipe da agência
- cliente
- contato principal do cliente

## Integração opcional

Se a Evolution API estiver configurada, o CS deve poder:

- criar o grupo automaticamente
- adicionar os participantes
- enviar a mensagem inicial

## Output esperado

- grupo criado
- mensagem de boas-vindas enviada

---

# Briefing / coleta de informações

## Objetivo

Levantar todas as informações fundamentais do cliente para que a equipe nunca opere no escuro.

## Formato possível

- reunião de onboarding
- formulário enviado ao cliente
- combinação dos dois

## Informações a coletar

### Negócio

- nome da empresa
- segmento
- modelo de negócio
- como ganha dinheiro
- principais produtos
- produtos encalhados
- canais de venda
- site
- redes sociais

### Objetivo

- vender
- gerar mensagens
- captar leads
- vender pelo WhatsApp
- vender no site
- outro objetivo operacional relevante

### Mídia e metas

- orçamento mensal
- CAC desejado
- ticket médio, se houver
- histórico de campanhas
- objetivo de volume

### Público

- público que o cliente acredita atender
- público ideal descrito pelo cliente
- dores percebidas
- linguagem de comunicação

### Branding e comunicação

- logo
- slogan
- brand kit
- cores
- tom de voz
- referências de conteúdo
- tipo de conteúdo que gosta de produzir

---

# Assets

## Objetivo

Centralizar os materiais visuais e institucionais do cliente.

## O que organizar

- logo
- brand kit
- cores
- tipografia
- slogan
- referências visuais
- peças existentes

## Saída esperada

```
/clientes/cliente-x/assets/
```

---

# Documento final de onboarding

## Objetivo

Gerar a fonte única de verdade inicial do cliente.

## Saída esperada

```
/clientes/cliente-x/onboarding/briefing.md
```

## Regra

Esse documento será usado pela equipe como material-base para entender o cliente antes da etapa de estratégia.

---

# Templates necessários

```
templates/
  contrato-base.md
  mensagem-boas-vindas.md
  formulario-briefing.md
  briefing-final.md
```

---

# Data necessária

```
data/
  campos-briefing.yaml
  estrutura-pastas.yaml
  configuracao-evolution-api.yaml
```

---

# Workflow técnico sugerido

```
workflows/
  onboarding-cliente.yaml
```

---

# Atualização — Contato e Comunicação do Cliente

## Registro obrigatório

O CS deve garantir que as informações de contato do cliente estejam documentadas e atualizadas.

## Estrutura sugerida

```
/clientes/cliente-x/contato.md
```

## Conteúdo esperado

```
Nome do cliente:
Empresa:
Telefone principal:
Grupo WhatsApp:
ID do grupo (Evolution API):
Responsável principal:
Observações:
```

## Objetivo

Permitir que qualquer agente ou automação saiba exatamente onde e como se comunicar com o cliente.

---

# Nova responsabilidade do CS — Envio de Relatórios

## Papel

O CS é responsável por enviar os relatórios gerados pelo gestor de tráfego para o cliente.

## Workflow

```
1. Receber notificação de relatório pronto
2. Validar rapidamente o conteúdo
3. Enviar no grupo correto do cliente
4. Confirmar envio
5. Registrar histórico
```

## Task

```
tasks/
  enviar-relatorio-whatsapp.md
```

## Regra

O envio deve sempre acontecer no canal oficial documentado do cliente.

---

# Estrutura de comunicação

```
Gestor de Tráfego → gera relatório
CS → envia ao cliente
Cliente → responde no canal oficial
```

---

# Regras do fluxo

## Regra 1

Onboarding não pensa. Onboarding coleta.

## Regra 2

Tudo vira arquivo.

## Regra 3

Tudo precisa ser reutilizável.

## Regra 4

Tudo precisa ser encontrável.

## Regra 5

O briefing final precisa servir de base para todo o restante da operação.

---

# O que este fluxo resolve

Se este onboarding for bem feito:

- tráfego não trava por falta de informação
- copy não inventa coisa errada
- design não erra identidade
- a equipe não perde tempo com perguntas básicas
- o cliente entra na operação de forma organizada

---

# Limite deste fluxo

ICP aprofundado, mecanismo único, posicionamento refinado e leitura estratégica do mercado não pertencem a este fluxo. Isso deve ser tratado em um fluxo posterior de estratégia.

[Agency OS — Flow 1.5: Setup Técnico do Cliente](Agency%20OS%20%E2%80%94%20Flow%201%20Onboarding%20do%20Cliente/Agency%20OS%20%E2%80%94%20Flow%201%205%20Setup%20T%C3%A9cnico%20do%20Cliente%2033e9a9b6f20781269df8fbb531b287ee.md)