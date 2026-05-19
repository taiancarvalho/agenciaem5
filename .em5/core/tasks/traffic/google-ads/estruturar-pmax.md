---
name: estruturar-pmax
agent: traffic
model_tier: balanced  # auto-set Fase 12.AAA — pre-v1.1 legacy migration
description: "Ver corpo do arquivo (formato legacy pre-v1.1, mantido por compatibilidade)"
elicit: false
---

# Task: estruturar-pmax
# Agente: traffic (Pulse)
# Input: board-cliente.md + plano-estrategico.md + criativos aprovados
# Output: clientes/{nome}/trafego/estrutura-campanhas.md (seção PMax)

## Playbook de Referência
- Ler `.em5/playbooks/traffic-google.md` (seção PMAX) antes de executar
- Ler `clientes/{nome}/memoria/notas-sessao.md` — últimas 3 entradas

## Quando usar PMax — decisão obrigatória antes de criar

PMax SÓ deve ser ativado SE todos estes critérios forem atendidos:

| Critério | Mínimo |
|----------|--------|
| Budget diário | > R$150/dia |
| Histórico de conversões na conta | ≥ 30 no último mês |
| Pixel instalado + eventos ativos | Obrigatório |
| Canal de conversão | E-commerce com feed OU serviço com LP clara |

Se algum critério não for atendido → usar `estruturar-search.md` em vez de PMax.

## Inputs necessários
1. `clientes/{nome}/onboarding/board-cliente.md` — budget, produto, canal de conversão
2. `clientes/{nome}/estrategia/plano-estrategico.md` — ICP, oferta, KPIs
3. Criativos aprovados pelo @qa em `design/criativos/`
4. Copy dos assets em `copy/google/` (gerada por @copywriter)

## Execução

### 1. Pré-requisitos via Composio

Verificar via Composio (google_ads) antes de criar qualquer campanha:
- [ ] Conversões configuradas e recebendo dados (mín. 1 evento de conversão ativo)
- [ ] Lista de remarketing com mín. 100 usuários (visitantes do site)
- [ ] Feed de produtos atualizado (se e-commerce)
- [ ] Budget confirmado com cliente — valor exato por dia

### 2. Estrutura da campanha PMax

```
Campanha: [CLIENTE] | PMax | {Objetivo}
Budget: R$ {X}/dia
Objetivo: Conversões / Valor de conversão
Bidding: Maximizar conversões (início) → Target ROAS após 50+ conv.

Grupo de Assets 1: {Produto/Serviço Principal}
├── Imagens landscape (1200x628): mín. 3
├── Imagens square (1200x1200): mín. 3
├── Logo landscape: 1 | Logo square: 1
├── Vídeos: mín. 1 (YouTube link) — se ausente, Google gera automaticamente
├── Headlines curtas (30 chars): mín. 3
├── Headlines longas (90 chars): mín. 1
├── Descrições (90 chars): mín. 2
└── CTA: {Saiba mais / Compre agora / Fale conosco}

Sinais de audiência (orientam, não restringem):
- Lista de clientes (upload CSV se disponível)
- Visitantes do site (7d + 30d como segmentos separados)
- Segmentos de intenção personalizados (keywords do produto principal)
```

### 3. Configurações críticas

- **URL de expansão:** DESATIVAR se quiser controlar destino dos anúncios
- **Exclusões de brand:** adicionar keywords de marca como exclusões de campanha
- **Grupos por produto:** criar grupo de assets separado por linha de produto (se e-commerce)
- **Extensões:** sitelinks, callouts, snippets iguais às campanhas Search

### 4. Primeiros 14 dias — período de aprendizado

Durante o aprendizado:
- NÃO alterar budget > 20%
- NÃO adicionar ou remover assets
- NÃO mudar objetivo ou estratégia de lance
- Apenas monitorar: impressões crescendo? Conversões aparecendo?

Revisão formal em: `data de ativação + 14 dias`

### 5. Documentar

Atualizar `clientes/{nome}/trafego/estrutura-campanhas.md`:

```markdown
## Google Ads — PMax

### Campanha PMax
- Budget: R$ {X}/dia
- Objetivo: {conversões/ROAS}
- Status: APRENDIZADO / ATIVO
- Data de ativação: {data}
- Revisão: {data + 14 dias}

#### Grupos de Assets
| Grupo | Produto | Imagens | Vídeos | Headlines | Status |
|-------|---------|---------|--------|-----------|--------|
| {nome} | {produto} | {n} | {n} | {n} | {status} |

#### Sinais de audiência configurados
- {lista de segmentos}

#### Checklist pré-publicação
- [ ] Conversões ativas confirmadas via Composio
- [ ] Assets mínimos completos (imagens + headlines + descrições)
- [ ] Exclusões de brand aplicadas
- [ ] URL de expansão configurada (ativar/desativar conforme estratégia)
```

## Em caso de falha

Se CPA > 3x a meta após 14 dias de aprendizado:

```
Problema identificado: PMax com CPA acima do aceitável após período de aprendizado
Causa-raiz provável: assets fracos / sinal de audiência insuficiente / conversões mal configuradas
Agente responsável: @traffic (assets) | @designer (criativos) | @cs (conversões)
Ação corretiva: revisar assets com @designer | verificar conversões com @cs | reduzir budget temporariamente
Prioridade: CRÍTICO
Retestar após: 7 dias com assets revisados e conversões verificadas
```

## Handoff para @qa

**Arquivos que ele DEVE ler:**
- `board-cliente.md` (sempre)
- `trafego/estrutura-campanhas.md` (seção PMax)

**Resumo do que foi feito:** campanha PMax estruturada com {n} grupos de assets — aguardando aprovação para ativar

**O que precisa de atenção:** NÃO alterar configurações por 14 dias após ativação | verificar conversões nos primeiros 3 dias

**Próxima task:** monitorar (após 14 dias) → otimizar resultados

## Atualizar memória

Ao terminar, adicionar entrada em `clientes/{nome}/memoria/notas-sessao.md`:

```
## Sessão {data}
**Agente:** @traffic
**Task executada:** estruturar-pmax
**O que foi feito:** campanha PMax criada — {n} grupos de assets | budget R${x}/dia
**Decisões importantes:** {critérios que justificaram PMax | sinal de audiência escolhido}
**Atenção para próxima sessão:** revisar em {data} após aprendizado | não mexer antes disso
```
