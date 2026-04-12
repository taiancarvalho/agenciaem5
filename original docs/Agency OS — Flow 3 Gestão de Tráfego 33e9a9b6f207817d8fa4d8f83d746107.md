# Agency OS — Flow 3: Gestão de Tráfego

# Objetivo

Definir de forma completa como o Gestor de Tráfego opera dentro do Agency OS, desde a leitura do cliente e auditoria da conta até a ativação inicial das campanhas, coordenação de criativos, rotina de otimização e geração de relatório para o cliente.

---

# Posição no sistema

Este fluxo começa depois que:

- o cliente já foi onboardado
- o setup técnico mínimo já foi validado
- a estratégia já foi definida

## Sequência lógica

```
Flow 1 — Onboarding do Cliente
↓
Flow 1.5 — Setup Técnico do Cliente
↓
Flow 2 — Estratégia de Campanha
↓
Flow 3 — Gestão de Tráfego
```

---

# Observação estrutural importante

Tudo que está descrito aqui pertence a um único agente:

## Gestor de Tráfego

Não faz sentido quebrar esse papel em vários subagentes pequenos.

O Gestor de Tráfego é um único agente com múltiplas tarefas especializadas.

## Regra estrutural

```
1 agente = 1 domínio de responsabilidade
AGENTE = PAPEL
TASK = EXECUÇÃO
```

---

# Papel do Gestor de Tráfego

## Função principal

Receber o plano estratégico e transformá-lo em operação de mídia real, organizada e otimizada.

## O que ele faz

- lê briefing, onboarding e estratégia
- audita a conta de anúncios
- identifica padrões de performance
- entende públicos, campanhas e criativos que já performaram
- reativa o que faz sentido no curto prazo
- monta e publica estrutura inicial de campanha
- solicita materiais necessários para copy e design
- atualiza a estrutura com novos criativos
- monitora desvios
- otimiza campanhas ao longo do tempo
- gera relatório de valor para o cliente
- notifica o CS quando o relatório estiver pronto para envio

## Anti-papel

O Gestor de Tráfego não deve:

- redefinir a estratégia macro do cliente sem alinhamento
- substituir o estrategista
- ser o responsável principal por criar a copy final
- ser o responsável principal por criar o design final
- enviar diretamente o relatório ao cliente quando esse envio for responsabilidade do CS
- operar no feeling sem documentação

---

# Objetivos deste fluxo

Este fluxo existe para resolver cinco frentes:

## 1. Entendimento da conta

Compreender o que já existia antes da entrada da agência.

## 2. Ativação rápida

Subir ou reativar campanhas com velocidade, sem esperar toda a nova produção ficar pronta.

## 3. Integração com copy e design

Acionar a criação dos novos materiais necessários.

## 4. Otimização contínua

Acompanhar, proteger verba e melhorar performance com base em períodos corretos de leitura.

## 5. Comunicação de valor

Transformar os resultados em narrativa clara para o cliente, reforçando valor percebido e continuidade.

---

# Workflow macro do Gestor de Tráfego

```
1. Ler o cliente
2. Auditar a conta
3. Identificar padrões de performance
4. Reativar o que já funcionou
5. Subir estrutura inicial obrigatória
6. Solicitar novos criativos
7. Receber novos materiais
8. Atualizar as campanhas
9. Monitorar diariamente
10. Otimizar semanalmente
11. Gerar relatório
12. Notificar o CS para envio ao cliente
```

---

# Etapa 1 — Leitura do cliente

## Objetivo

Entender quem é o cliente antes de mexer na conta.

## O que o gestor precisa ler

- onboarding
- briefing final
- estratégia
- plano de campanha
- setup técnico validado

## Regra

O gestor de tráfego não deve operar a conta sem entender:

- o objetivo do cliente
- a oferta principal
- a linha de comunicação
- o tipo de campanha que foi definido

---

# Etapa 2 — Auditoria inicial da conta

## Objetivo

Mapear o que já existe na conta e identificar ativos reaproveitáveis e padrões históricos.

## O que precisa ser verificado

### Públicos

Verificar se já existem públicos criados, como:

- Instagram
- Facebook
- site
- 7 dias
- 14 dias
- 30 dias
- 60 dias
- 90 dias
- 180 dias
- 365 dias

### Tracking

- pixel ativo
- eventos principais configurados
- ativos mínimos funcionando

### Histórico de campanhas

Analisar campanhas dos últimos:

- 30 dias
- 90 dias
- 6 meses
- 1 ano

## O que o gestor analisa nas campanhas

- objetivo de campanha
- investimento diário
- conjuntos de anúncios
- públicos utilizados
- raio, quando houver
- segmentação
- tipo de público
- interesses
- aberto ou fechado
- posicionamentos
- automático ou manual

## O que o gestor analisa nos criativos

- vídeo ou imagem
- texto
- título
- padrão de mensagem
- sinais de sucesso ou falha

## Objetivo final da auditoria

Gerar documentação de performance histórica:

- o que funcionou
- o que não funcionou
- o que perdeu força
- o que pode ser reativado

## Saída esperada

```
/clientes/cliente-x/trafego/auditoria-conta.md
```

---

# Etapa 3 — Leitura de padrões de performance

## Objetivo

Encontrar padrões que ajudem a acelerar a execução.

## O que precisa ser identificado

- criativos que já performaram
- estruturas que já deram resultado
- públicos que funcionaram
- campanhas que morreram ao longo do tempo
- formatos que repetidamente falharam

## Regra de interpretação

Se algo performou em um período muito antigo, mas perdeu totalmente nos últimos 90 dias, isso deve ser tratado com cautela.

## Intenção

O gestor não está apenas olhando números. Ele está tentando entender padrões replicáveis.

---

# Etapa 4 — Ativação rápida do que já deu certo

## Objetivo

Colocar a operação para rodar rápido enquanto os novos materiais estão sendo produzidos.

## Princípio

Se já existe estrutura que funcionou no passado e ainda faz sentido, o gestor deve reativar essa base para reduzir tempo parado.

## O que isso resolve

Enquanto a agência prepara novos criativos, novas copies e novos materiais, a conta já começa a rodar com uma base validada.

## Regra

Essa reativação não substitui a nova operação. Ela serve como ponte inicial.

---

# Etapa 5 — Estrutura mínima obrigatória de campanhas

## Regra de mercado adotada no sistema

A operação deve rodar com, no mínimo, dois tipos de campanha.

## Campanha 1 — Base de audiência / impulsionamento / tráfego para Instagram

### Objetivo

- trazer público frio
- fortalecer base de engajamento
- alimentar públicos quentes
- reativar seguidores desengajados

### Distribuição esperada

- maior parte da verba em público frio
- menor parte em público quente

### Intenção

Manter a conta viva, gerar audiência e aumentar a base que futuramente pode converter.

## Campanha 2 — Campanha de objetivo principal

### Pode ser

- WhatsApp
- vendas
- leads
- outro objetivo principal do cliente

### Intenção

Gerar o resultado direto definido pela estratégia.

## Regra de verba mínima

Como referência operacional do sistema:

- pelo menos uma verba mínima diária para a campanha de base de audiência
- o restante concentrado na campanha de objetivo principal

Essa lógica deve ser ajustável, mas o sistema pode partir desse padrão inicial.

---

# Etapa 6 — Solicitação de novos materiais

## Objetivo

Transformar necessidade de mídia em necessidade criativa clara.

## O que o gestor faz

Depois da auditoria e da ativação inicial, o gestor envia demanda para produção:

- quais criativos faltam
- que tipo de mensagem precisa ser feita
- quais campanhas precisam de material novo

## Handoff interno

```
Gestor de Tráfego → Copywriter → Designer → Gestor de Tráfego
```

## Sequência

1. Gestor define necessidade
2. Copywriter cria os textos
3. Designer cria imagem, vídeo ou visual
4. Material volta para o gestor de tráfego
5. Gestor sobe os novos conteúdos na estrutura

---

# Etapa 7 — Publicação e atualização das campanhas

## Objetivo

Atualizar a estrutura com os novos materiais produzidos.

## O que o gestor faz

- sobe novos anúncios
- atualiza estruturas já ativas
- substitui o que precisar ser substituído
- organiza a conta com padrão consistente

## Regra

A campanha não deve depender só do improviso do dia. Tudo que entra precisa estar alinhado com estratégia, copy e design.

---

# Etapa 8 — Monitoramento diário

## Objetivo

Proteger verba e detectar desvios graves rapidamente.

## O que o gestor faz diariamente

Entrar na conta para verificar se existe algo muito fora do padrão.

## Exemplos

- criativo gastando muito acima do CAC aceitável
- conjunto queimando verba rápido demais
- campanha com comportamento claramente anormal

## Regra de decisão diária

O monitoramento diário não é para reestruturar tudo. Ele é para evitar desperdício e pausar desvios graves.

---

# Etapa 9 — Otimização semanal

## Objetivo

Tomar decisões mais sérias com base em janela de leitura mais confiável.

## Regra principal

A leitura principal deve ser semanal.

## Por quê

Analisar períodos curtos demais pode gerar decisões ruins por causa da variação natural entre dias da semana.

## Janela padrão de análise

- 7 dias = padrão principal
- 14 dias = confirmação
- 30 dias = tendência

## O que o gestor decide na otimização

- pausar criativo ruim
- manter ou escalar criativo bom
- revisar público
- revisar campanha
- decidir se o problema é pontual ou estrutural

## Regra

Antes de concluir que algo não funciona, o gestor deve verificar se é:

- uma queda isolada
- um problema de uma semana específica
- uma perda estrutural de desempenho ao longo de 14 ou 30 dias

---

# Etapa 10 — Geração de relatório de valor

## Objetivo

Transformar dados de performance em comunicação clara, enxuta e orientada a valor para o cliente.

## O que o gestor faz

- coleta os dados principais de performance
- interpreta os ganhos mais relevantes do período
- aplica a estrutura de relatório padrão da agência
- gera a mensagem pronta para envio via WhatsApp
- salva o relatório no sistema
- notifica o CS quando estiver pronto

## Estrutura da mensagem

A mensagem precisa seguir lógica de valor:

1. relembrar objetivo do cliente
2. destacar ganhos concretos
3. apresentar leitura simples dos dados
4. mostrar evolução, se fizer sentido
5. dizer o que vem no próximo ciclo
6. abrir espaço para continuidade ou avanço, se fizer sentido

## Regras operacionais do relatório

- até 1300 caracteres
- linguagem simples e natural
- sem emojis
- usar asterisco para destaque
- sem jargão de marketing desnecessário
- sempre começar pelo objetivo do cliente
- precisa parecer personalizado, nunca genérico

## Handoff

```
Gestor de Tráfego → CS → Cliente
```

## Saída esperada

```
/clientes/cliente-x/relatorios/
  2026-04-relatorio-whatsapp.md
```

---

# Comandos esperados do Gestor de Tráfego

```
*ler-cliente
*auditar-conta
*mapear-publicos
*analisar-campanhas
*analisar-conjuntos
*analisar-criativos
*identificar-padroes
*reativar-campanhas-validas
*subir-estrutura-inicial
*solicitar-criativos
*publicar-campanhas
*monitorar-campanhas
*otimizar-campanhas
*pausar-desvios-graves
*gerar-relatorio-whatsapp
*notificar-cs-relatorio
```

---

# Tasks do Gestor de Tráfego

```
tasks/
  ler-cliente.md
  auditar-conta.md
  mapear-publicos.md
  analisar-campanhas.md
  analisar-conjuntos.md
  analisar-criativos.md
  identificar-padroes.md
  reativar-campanhas-validas.md
  subir-estrutura-inicial.md
  solicitar-criativos.md
  publicar-campanhas.md
  monitorar-campanhas.md
  pausar-desvios-graves.md
  otimizar-campanhas.md
  gerar-relatorio-whatsapp.md
  notificar-cs-relatorio.md
```

---

# Templates necessários

```
templates/
  auditoria-conta.md
  campanhas-ativas.md
  relatorio-performance.md
  solicitacao-criativos.md
  padroes-de-performance.md
  relatorio-whatsapp.md
```

## Template de relatório WhatsApp

O template de relatório WhatsApp deve usar como base o prompt estratégico já validado pela agência para geração de mensagens de valor.

---

# Data necessária

```
data/
  estrutura-base-campanhas.yaml
  janelas-analise.yaml
  criterios-cac.yaml
  tipos-publicos.yaml
  estrutura-relatorio.yaml
  regras-tonalidade.yaml
```

---

# Workflow técnico sugerido

```
workflows/
  gestao-trafego.yaml
```

---

# Estrutura de arquivos sugerida

```
/clientes/cliente-x/trafego/
  auditoria-conta.md
  campanhas-ativas.md
  padroes-performance.md

/clientes/cliente-x/relatorios/
  2026-04-relatorio-whatsapp.md
```

---

# O que este fluxo resolve

Se esse fluxo for bem feito:

- a conta não é operada no escuro
- a agência aproveita o que já funcionou
- a mídia começa a rodar mais rápido
- a produção criativa não trava a operação inicial
- as decisões deixam de ser aleatórias
- a otimização passa a seguir janelas corretas de análise
- o cliente recebe comunicação clara sobre resultado e próximos passos

---

---

# Atualização — Nomenclatura e rastreabilidade de campanhas

## Objetivo

Garantir que campanhas, conjuntos e anúncios estejam conectados com copy e performance.

## Regra de nomenclatura

```
[CLIENTE]_[OBJETIVO]_[CANAL]_[TIPO]_[ID]
```

## Exemplos

```
CNA_LEAD_META_VIDEO_CR-001
CNA_WHATSAPP_META_IMAGE_CR-002
```

## Estrutura de IDs

```
CR-001 → criativo / copy
CP-001 → campanha
CJ-001 → conjunto
```

## Regra

Todo anúncio deve conter o ID da peça (CR-XXX) para permitir conexão com o log de performance criativa.

## Integração com log criativo

```
Copy cria → Tráfego mede → Sistema aprende
```

---

# Limite deste fluxo

Este fluxo não deve:

- substituir a estratégia
- fingir que a mídia é independente da copy e do design
- decidir no impulso com base em um ou dois dias isolados
- operar sem documentação
- pular o CS quando o processo interno da agência exigir intermediação no envio ao cliente

Ele existe para fazer a gestão de tráfego funcionar como operação séria, documentada, reaproveitável e consistente dentro do Agency OS.