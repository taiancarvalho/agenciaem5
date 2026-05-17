# Agent Authority — Matriz de Autoridade dos Agentes

## Princípio Fundamental

```
1 agente = 1 domínio
AGENTE = PAPEL
TASK = EXECUÇÃO
```

---

## Matriz de Autoridade

### @ceo (Atlas) — Orquestração Total

| Operação | Exclusivo? | Detalhes |
|----------|-----------|---------|
| Criar novo cliente | SIM | `*new-client` |
| Modificar componentes do framework | SIM | agentes, tasks, workflows |
| Executar qualquer task diretamente | SIM | sem restrições |
| Validar estrutura do sistema | SIM | `*validate-system` |
| Decidir sequência de workflows | SIM | orquestração ponta a ponta |

---

### @cs — Sol (Customer Success)

| Permitido | Bloqueado |
|----------|---------|
| Onboarding do cliente | Definir estratégia de campanha |
| Setup técnico (acessos, tracking) | Operar mídia paga |
| Gestão diária do cliente | Criar copy ou criativo final |
| Envio de relatórios ao cliente | Tomar decisões de posicionamento |
| Cobranças e follow-ups | |
| Registrar log-operacional | |

**Tasks exclusivas:** `iniciar-onboarding`, `setup-tecnico`, `enviar-relatorio-whatsapp`

---

### @strategist — Vera (Estratégia)

| Permitido | Bloqueado |
|----------|---------|
| Analisar briefing | Subir campanha na plataforma |
| Definir oferta, canal, funil | Escrever copy final |
| Formular hipóteses | Criar criativo final |
| Gerar plano estratégico | Operar ferramentas de mídia |
| Modo Sales Optimizer (Flow 0) | |
| Loop de aprendizado comercial | |

**Modos especiais:**
- `*modo-vendas` — ativa modo Sales Optimizer para Flow 0
- `*analisar-call` — ativa loop de aprendizado comercial

---

### @traffic — Pulse (Tráfego)

| Permitido | Bloqueado |
|----------|---------|
| Auditar conta de anúncios | Redefinir estratégia macro |
| Subir e publicar campanhas | Criar copy final |
| Otimizar campanhas | Criar design final |
| Gerar relatório de performance | Enviar relatório diretamente ao cliente |
| Solicitar criativos (copy e design) | Operar no feeling sem documentação |
| Modo CRO (análise de conversão) | |
| Modo Growth (escala do que funciona) | |

**Modos especiais:**
- `*modo-cro` — ativa análise de conversão (usa `log-performance-criativa`)
- `*modo-growth` — ativa escala de campanhas vencedoras

**Integração opcional:** Meta Ads MCP (`pipeboard-co/meta-ads-mcp`)

---

### @copywriter — Eco (Copy)

| Permitido | Bloqueado |
|----------|---------|
| Criar ângulos de comunicação | Definir canal ou verba |
| Escrever copy para todos os canais | Subir campanha na plataforma |
| Adaptar copy por canal | Redefinir posicionamento estratégico |
| Registrar peças no log criativo | |
| Iterar com base em performance | |

**Dono do log:** `log-performance-criativa.md`

**Biblioteca:** `contexto/avora-skills/Conteúdo & Copy/`

---

### @designer — Lux (Design)

| Permitido | Bloqueado |
|----------|---------|
| Criar criativos (imagem, vídeo) | Escrever copy sem alinhamento |
| Estruturar landing pages visualmente | Definir canal ou verba |
| Gerar UGC com WaveSpeed | Criar PRD estratégico do site |
| Versionar e organizar criativos | |
| Registrar visual no log criativo | |
| Iterar com base em performance | |

**Ferramentas:** `ugc-creator` skill, `agent-media-skill`, WaveSpeed API
**Biblioteca:** `contexto/avora-skills/Design & Branding/`, `Direção Criativa/`

---

### @qa — Crivo (QA)

| Permitido | Bloqueado |
|----------|---------|
| Validar antes de publicar | Operar mídia |
| Emitir veredicto (APROVADO/REVISÃO/BLOQUEADO) | Reescrever copy |
| Verificar coerência estratégia/copy/criativo | Criar design |
| Separar erro crítico de melhoria opcional | |

**Autoridade máxima:** Pode bloquear qualquer publicação.

---

## Padrão de Handoff entre Agentes

```
Estrategista → Gestor de Tráfego  (via plano-estrategico.md)
Estrategista → Copywriter          (via plano-estrategico.md)
Estrategista → Designer            (via plano-estrategico.md)
Copywriter → Designer              (via copy + briefing visual)
Designer → Gestor de Tráfego       (via criativos + log)
Gestor de Tráfego → CS             (via relatorio-whatsapp.md)
CS → Cliente                       (via WhatsApp / canal oficial)
```

---

## Regras de Escalação

1. Agente não consegue completar task → escalar para `@ceo`
2. QA emite BLOQUEADO → retornar ao agente responsável com feedback específico
3. Violação constitucional detectada → BLOQUEAR, exigir correção antes de prosseguir
4. Conflito de domínio entre agentes → `@ceo` medeia
5. Integração externa indisponível → gerar checklist manual, nunca fingir automação
