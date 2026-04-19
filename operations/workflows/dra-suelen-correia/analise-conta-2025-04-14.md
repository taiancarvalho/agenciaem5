# Análise de Conta — Dra Suelen Correia
**Data:** 14/04/2025  
**Agente:** Max Tráfego  
**BM:** BM_Suelen_Correia_Cofre  
**Conta:** Dra_Suelen_Correia  
**Nicho:** Médico/Estética  

> ⚠️ Sem dados reais de performance nos relatórios — análise baseada em benchmarks do nicho.

---

## 1. Estrutura de Campanha Ideal (Nicho Médico/Estético)

### Arquitetura Recomendada

```
📂 CONTA — CBO desligado inicialmente (teste), ligar ao escalar
│
├── 📢 CAMPANHA 1: CONVERSÃO (Principal — 70% do budget)
│   │  Objetivo: Conversão (Agendamento/WhatsApp)
│   │  Pixel: Evento "Agendar" ou "Lead"
│   │
│   ├── Conjunto 1: Broad + Geolocalizado (raio 5-10km da clínica)
│   │   ├── Idade: 25-55
│   │   ├── Gênero: Feminino (ajustar conforme procedimento)
│   │   └── Aberto (sem interesses, deixar criativo fazer o targeting)
│   │
│   ├── Conjunto 2: Lookalike 1% — Lista de pacientes/clientes
│   │   └── Upload da base de clientes (mínimo 100 contatos)
│   │
│   └── Conjunto 3: Interesses estéticos (backup)
│       ├── Interesses: "Skincare", "Estética", "Cuidado pessoal"
│       └── Empilhado (stack) — não separar
│
├── 📢 CAMPANHA 2: RETARGETING (20% do budget)
│   │  Objetivo: Conversão
│   │
│   ├── Conjunto 1: Visitou landing page (30 dias) — não converteu
│   ├── Conjunto 2: Engajou Instagram (90 dias) — não converteu
│   └── Conjunto 3: Assistiu vídeo 50%+ — não converteu
│
└── 📢 CAMPANHA 3: CONSCIÊNCIA/ENGAJAMENTO (10% do budget)
   │  Objetivo: Engajamento (Reels/Stories)
   │
   └── Conjunto 1: Broad local — conteúdo educativo
       └── Alimentar pixel e criar audiência de engajamento p/ retargeting
```

### Distribuição de Budget

| Campanha | % Budget | Função |
|----------|----------|--------|
| Conversão | 70% | Gerar agendamentos reais |
| Retargeting | 20% | Recuperar quem quase converteu |
| Consciência | 10% | Alimentar funil + autoridade |

### Por que CBO desligado no início?
Com budget pequeno (comum em clínicas médias), o CBO tende a concentrar tudo no conjunto mais fácil (que nem sempre converte melhor). Ligar CBO só quando tiver **50+ conversões por semana** em cada conjunto — o algoritmo precisa de dados para decidir bem.

---

## 2. Públicos-Alvo Que Funcionam

### Tier 1 (Prioridade Máxima)
| Público | Formato | Notas |
|---------|---------|-------|
| **Broad local** (raio 5-10km) | Aberto | Funciona MELHOR em nicho médico. O criativo filtra quem tem interesse. |
| **Lookalike 1%** | Base de clientes | Precisa de lista com pelo menos 100-300 contatos de pacientes reais |

### Tier 2 (Secundário)
| Público | Formato | Notas |
|---------|---------|-------|
| **Engajamento Instagram** (90d) | Custom audience | Quem já interagiu, quente |
| **Visitantes landing page** (30d) | Pixel retargeting | Quente para remarketing |
| **Lookalike 2-3%** | Base de clientes | Escala do LLA 1% |

### Tier 3 (Testar/Backup)
| Público | Formato | Notas |
|---------|---------|-------|
| **Interesses** | Stack empilhado | Skincare, dermocosméticos, clínicas estéticas — testar como backup |
| **Comportamento** | Viajantes frequentes | Correlação com poder aquisitivo para procedimentos premium |
| **Lookalike de compradores** | Base de vendas | Quando tiver pixel com eventos de compra |

### ⚠️ Restrições de Segmentação em Saúde
- **NÃO usar** interesses de condições médicas (o Meta restringe)
- **NÃO usar** dados sensíveis de saúde no targeting
- Broad + criativo é o caminho mais seguro e performático

---

## 3. Criativos e Ângulos Que Convertem

### Formato Vencedores para Clínica Estética

#### A) Before/After (antes/depois) — O MAIS FORTE
- Carousel com 3-5 fotos de transformação real
- Foto 1: Resultado final (impacto)
- Foto 2-4: Processo/evolução
- Foto 5: CTA "Agende sua avaliação"
- **Ângulo:** "Resultado real de paciente real" (prova social > promessa)

#### B) Vídeo da Doutora falando (fala direto)
- 15-30 segundos, Stories format
- **Hook:** "Você sabia que [mito comum] é mentira?"
- **Corpo:** Explicação rápida + posição de autoridade
- **CTA:** "Quer saber se serve pra você? Clica no link"

#### C) Depoimento de paciente
- Vídeo curto ou carrossel com texto
- Foco na **transformação emocional** ("voltei a me sentir bem")
- Não focar só no visual, focar no SENTIMENTO

#### C) Educativo Visual
- Carrossel ou Reel: "3 sinais de que você precisa de [tratamento]"
- Posiciona como especialista, não como vendedora
- Gera saves e shares → orgânico + pago

### Copy Framework para Nicho Médico

```
HEADLINE:
"Resultado visível em [X] semanas — sem [objeção principal]"

PRIMARY TEXT (<125 chars):
"Tratamento [X] na Dra Suelen: resultado natural, acompanhamento completo.
Agende sua avaliação 👇"

CTA: "Saiba mais" ou "Enviar mensagem WhatsApp"
```

### Ângulos de Copy por Posicionamento

| Ângulo | Quando usar | Exemplo de Hook |
|--------|-------------|-----------------|
| **Autoridade** | Sempre (médica) | "Dermatologista com [X] anos de experiência em [especialidade]" |
| **Prova social** | Quem tem resultado | "+[X] pacientes com resultado comprovado" |
| **Segurança** | Medo de procedimento | "Procedimento minimamente invasivo, volte no mesmo dia" |
| **Exclusividade** | Procedimentos premium | "Vagas limitadas por mês — acompanhamento individual" |
| **Urgência natural** | Promoção sazonal | "Agenda de [mês] aberta" |

### ⛔ O que NÃO usar em criativos médicos
- Promessas de resultado garantido (viola políticas do Meta)
- Antes/depois de peso corporal (restrito)
- Linguagem que cause "body shaming" ("elimine aquela gordurinha")
- Fotos com muito zoom em partes do corpo (pode ser rejeitado)

---

## 4. Métricas-Chave Para Monitorar

### KPIs Primários (olhar TODO DIA)

| Métrica | Benchmark (clínica) | O que indica |
|---------|---------------------|--------------|
| **CPL (Custo por Lead)** | R$ 15-50 | Saúde do funil principal |
| **CTR** | >1.5% | Qualidade do criativo |
| **Link CTR** | >0.8% | Interesse real (não só curiosidade) |
| **CPC** | R$ 1.50-4.00 | Competitividade da audiência |
| **CPM** | R$ 15-35 | Custo de alcance local |

### KPIs de Conversão (olhar 2-3x/semana)

| Métrica | Benchmark | O que indica |
|---------|-----------|--------------|
| **Taxa Landing → Lead** | >15% | Qualidade da LP/WhatsApp |
| **Taxa Lead → Agendamento** | >30% | Qualidade da recepção/atendimento |
| **Taxa Agendamento → Comparecimento** | >70% | No-shows = problema operacional |
| **CAC (Custo por Cliente)** | Definir com a Suelen | Matemática fundamental |
| **ROAS/ROI** | Target > 3x | Lucratividade real |

### KPIs Técnicos (olhar semanalmente)

| Métrica | Alerta se... | Ação |
|---------|-------------|------|
| Frequência | >3 em 7 dias | Trocar criativo ou expandir público |
| Relevância Score | <5 | Criativo não ressoa, testar novo ângulo |
| Taxa de rejeição (LP) | >60% | Landing page com problema (velocidade/clareza) |
| Pixel firing rate | <90% | Problema técnico no pixel |

---

## 5. Erros Comuns em Contas Médicas

### 🚨 Críticos (parar imediatamente se acontecer)

| Erro | consequência | Correção |
|------|-------------|----------|
| **Sem pixel ou pixel mal configurado** | Otimização no escuro, dinheiro queimado | Instalar pixel + API de conversões + validar eventos |
| **Otimizar por tráfego/engajamento** | Lead barato, sem agendamento | Mudar objetivo para CONVERSÃO |
| **Segmentação ultra-restrita** (ex: mulher 30-35, interesses X, Y, Z) | CPM explode, escala zero | Abrir para broad + geolocalizado |
| **Criativos genéricos de banco de imagem** | CTR <0.5%, zero confiança | Fotos/vídeos reais da doutora e clínica |
| **Sem retargeting** | Perde 70%+ dos leads quentes | Ativar campanha de retargeting com sequencia |

### ⚠️ Importantes (corrigir na próxima otimização)

| Erro | consequência | Correção |
|------|-------------|----------|
| **Mudar campanha a cada 2-3 dias** | Algoritmo nunca aprende | Dar 7 dias mínimo antes de avaliar |
| **Criativo sem CTA claro** | Clique sem intenção | Sempre com CTA: "Agende", "Saiba mais" |
| **Landing page lenta ou não mobile** | Perda de 50%+ de cliques | Testar velocidade (PageSpeed >80 mobile) |
| **Não rastrear origem dos leads** | Não sabe o que funciona | UTM em tudo + planilha/CRM de origem |
| **Escalar budget antes de validar** | ROAS despenca | 50+ conversões antes de escalar |

### 🏥 Específicos de Nicho Médico

| Erro | consequência |
|------|-------------|
| **Violar políticas do Meta** (promessas irreais, antes/depois de peso) | Conta bloqueada, perda de BM |
| **Não ter CRM integrado** | Lead não é seguido → dinheiro jogado fora |
| **Focar só em preço na copy** | Atrai curiosos, não pacientes reais |
| **Não usar WhatsApp como canal principal** | No Brasil, 80%+ dos agendamentos médicos vêm do WhatsApp |

---

## 6. Checklist de Otimização Semanal

### 📅 Segunda-feira — Análise de Performance
- [ ] Verificar CPL dos últimos 7 dias vs semana anterior
- [ ] Identificar ads com CTR <1% (marcar para substituir)
- [ ] Checar frequência por conjunto (<3 = ok)
- [ ] Verificar se pixel está firing corretamente (ajudar eventos)
- [ ] Conferir se houve bloqueios/alertas na conta

### 📅 Terça-feira — Criativos
- [ ] Pausar ads com CPA >150% do target (ou CTR <1% após 1000 impressões)
- [ ] Ativar 2-3 novos criativos (sempre ter 2 em teste)
- [ ] Fazer screenshots dos criativos atuais para controle
- [ ] Registrar hipótese de cada novo criativo

### 📅 Quarta-feira — Públicos e Audiências
- [ ] Verificar performance por público (qual está melhor/pior)
- [ ] Atualizar lookalikes se base cresceu 20%+
- [ ] Checar se audiências de retargeting estão populando
- [ ] Avaliar necessidade de novo público de teste

### 📅 Quinta-feira — Landing Page / WhatsApp
- [ ] Testar velocidade da LP (PageSpeed Insights)
- [ ] Verificar taxa de conversão LP (leads/sessões)
- [ ] Conferir tempo de resposta do WhatsApp (<5 min ideal)
- [ ] Verificar se recepção está seguindo script de agendamento

### 📅 Sexta-feira — Planejamento e Relatório
- [ ] Gerar relatório semanal (gasto, leads, agendamentos, clientes, CAC)
- [ ] Enviar relatório para Suelen com 3 insights + próximos passos
- [ ] Planejar criativos da próxima semana
- [ ] Ajustar budget: +20% nos vencedores, -20% nos perdedores
- [ ] Programar pausas/ativações do fim de semana se necessário

---

## 📊 Relatório Semanal Template

```
═══════════════════════════════════════
📊 SEMANA XX — Dra Suelen Correia
Período: DD/MM a DD/MM
═══════════════════════════════════════

💰 INVESTIMENTO
• Gasto total: R$ XXX
• CPL médio: R$ XX
• CPC médio: R$ X,XX
• CPM médio: R$ XX

📈 RESULTADOS
• Leads gerados: XXX
• Agendamentos: XX (XX%)
• Comparecimentos: XX (XX%)
• Novos pacientes: XX
• CAC: R$ XX

🏆 TOP CRIATIVOS
1. [Nome] — CTR X%, CPL R$XX
2. [Nome] — CTR X%, CPL R$XX

📋 AÇÕES PRÓXIMA SEMANA
- [ ] Ação 1
- [ ] Ação 2
- [ ] Ação 3
```

---

## ✅ Próximos Passos Imediatos (Semana 1)

### Prioridade 1: Fundações (Dias 1-2)
1. **Validar pixel + API de conversões** — sem isso, não há otimização
2. **Configurar evento de "Lead" ou "Agendamento"** — definir qual é o evento primário de conversão
3. **Coletar lista de clientes existente** — mínimo 100 contatos para criar Lookalike
4. **Definir CAC target com a Suelen** — qual o valor máximo que ela paga por paciente novo?

### Prioridade 2: Criativos (Dias 2-4)
5. **Produzir 6 criativos iniciais** (2 antes/depois, 2 vídeos da doutora, 2 educativos)
6. **Criar/varrer landing page** — garantir que seja mobile-first, rápida, com CTA claro
7. **Configurar WhatsApp Business** — auto-reply + script de agendamento

### Prioridade 3: Lançamento (Dias 5-7)
8. **Subir campanha de conversão** (3 conjuntos, CBO desligado)
9. **Subir campanha de retargeting** (mínimo: visitantes LP + engajamento IG)
10. **Documentar baseline** — métricas da semana 1 como referência

---

### 💡 Princípios Guia
- **Broad > segmentado** em nicho médico local
- **Criativo real > criativo bonito** (autenticidade converte mais que design)
- **WhatsApp é rei** no Brasil para agendamento médico
- **Dados > achismo** — toda decisão baseada em métrica, não em "meu feeling"
- **7 dias mínimo** antes de julgar qualquer criativo ou audiência
- **Nunca otimizar tráfego** — sempre otimizar para CONVERSÃO
