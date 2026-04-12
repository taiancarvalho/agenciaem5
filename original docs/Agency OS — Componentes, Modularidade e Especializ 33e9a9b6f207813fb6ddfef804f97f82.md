# Agency OS — Componentes, Modularidade e Especialização

# Objetivo

Registrar o princípio de modularidade do Agency OS e como o conhecimento especializado deve ser distribuído no sistema.

---

# Princípio central

Instruções muito específicas por canal, ferramenta, integração ou rotina não devem ficar todas dentro do agente-base.

O agente-base deve ser mais enxuto.

A especialização deve viver em componentes auxiliares.

---

# O erro a evitar

## Errado

Um agente gigante com tudo dentro:

- Meta Ads
- Google Ads
- TikTok Ads
- Pinterest Ads
- naming
- colunas
- relatórios
- validações
- integrações
- regras operacionais

Esse modelo aumenta ruído, dificulta manutenção e piora a execução.

---

# O modelo certo

## O que vai no agente-base

- identidade do papel
- quando usar
- quando não usar
- princípios de decisão
- comandos gerais
- regras de handoff

## O que vai fora do agente-base

- tasks específicas por canal
- templates de relatório
- colunas e métricas por plataforma
- workflows operacionais
- checklists
- validadores e utilitários
- regras de naming

---

# Estrutura recomendada

```
agents/
  gestor-trafego.md

tasks/
  auditar-meta-ads.md
  auditar-google-ads.md
  criar-campanha-meta.md
  criar-campanha-google.md
  validar-pixel-meta.md
  validar-conversoes-google.md

templates/
  relatorio-meta.md
  relatorio-google.md
  naming-campaigns.yaml
  checklist-onboarding-trafego.md

data/
  colunas-meta-ads.yaml
  colunas-google-ads.yaml
  canais-suportados.yaml
  kpis-por-objetivo.yaml

utils/
  parser-metrics.js
  validator-utm.js
  campaign-naming-validator.js

workflows/
  onboarding-trafego.yaml
  auditoria-conta-meta.yaml
  lancamento-campanha-google.yaml
```

---

# Exemplo prático: Gestor de Tráfego

## O que ele precisa saber

O gestor de tráfego não pode ser um prompt genérico. Ele precisa saber:

- o que puxar
- onde puxar
- quais colunas usar
- quais templates usar
- quais integrações existem
- quais canais a agência usa ou não usa

## Mas isso não deve ficar tudo no prompt-base

A solução é desacoplar o conhecimento operacional em tasks, templates, data, utils e workflows.

---

# Regra de configuração ativa

O sistema deve suportar apenas o que a agência realmente usa.

Exemplo:

- se a agência não opera Pinterest, isso não precisa existir na configuração ativa
- se a agência opera apenas Meta e Google, o sistema deve refletir isso

---

# Implicação prática

Quando o Agency OS for evoluindo, cada nova especialização relevante pode virar:

- uma nova task
- um novo template
- um novo dataset
- um novo workflow
- um novo utilitário

Sem inflar o agente-base.

---

# Conclusão

O Agency OS precisa ser modular para ser:

- escalável
- configurável
- fácil de manter
- adaptável ao stack real da agência
- útil de verdade no operacional