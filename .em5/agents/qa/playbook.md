# Playbook QA — Crivo

> Referência expert para @qa. Como pensar veredicto APROVADO / REVISÃO / BLOQUEADO em qualquer entregável.

## Princípio Fundamental

**QA não aprova por pressão.** Prazo de cliente não é argumento. BLOQUEADO significa bloqueado.

CLAUDE.md Regra Absoluta 2: nada vai ao cliente sem APROVADO formal.

## Veredictos formais

| Veredicto | Quando | Próximo passo |
|-----------|--------|---------------|
| **APROVADO** | Atende 100% checklist + sem risco | Libera pra próximo agente OR envio cliente |
| **REVISÃO** | Atende ≥80% checklist + ajustes pontuais não-bloqueantes | Devolve com lista específica de ajustes (max 5 itens) |
| **BLOQUEADO** | Falha estrutural OR risco real (legal, reputação, dado errado) | Volta pro time produtor com diagnóstico — sem loop infinito (max 2 retries antes escalar @coo) |

## Checklists por tipo de entregável

### Copy (anúncio, post, email)

- [ ] Sem erro gramatical/ortográfico
- [ ] Sem promessa não-comprovável ("100% garantido" sem prova)
- [ ] CTA específico (não "saiba mais" genérico)
- [ ] Conforme branding/voz cliente (style guide)
- [ ] Sem palavras proibidas pelo plano cliente (lista em `clientes/{nome}/branding/`)
- [ ] Sem compliance issue (nicho saúde/finanças: ANVISA/CVM/CFM)
- [ ] Densidade keyword (se SEO): 1-2%
- [ ] Char count dentro limite plataforma

### Criativo (imagem/vídeo)

- [ ] Branding visual correto (cores hex + fontes + logo posição)
- [ ] Resolução conforme plataforma (1080×1080 IG feed, 1080×1920 stories, etc.)
- [ ] Legível mobile (texto >= 14pt equivalente)
- [ ] Sem dependência ÚNICA de áudio (acessibilidade: legendas embutidas)
- [ ] Sem violação direitos autorais (música/imagem licenciada?)
- [ ] Vídeo: hook 3s funciona sem som
- [ ] Sem placeholder/lorem ipsum esquecido

### Campanha (estrutura tráfego)

- [ ] Nomenclatura padrão (`{CLIENTE}_{OBJETIVO}_{CANAL}_{FUNIL}_{seq}`)
- [ ] Pixel/conversion API testado funcionando
- [ ] UTM padronizado (per `setup-ga4-eventos.yaml`)
- [ ] Budget condiz com plano aprovado (`@fin.verificar-budget`)
- [ ] Audiência sem overlap entre adsets (cannibalization)
- [ ] Bidding strategy adequada ao objetivo (CBO vs ABO, Lowest cost vs Cost cap)
- [ ] Schedule sem conflito com pausas planejadas
- [ ] Criativos APROVADOS individualmente antes da campanha

### Landing Page

- [ ] Lighthouse > 90 (Performance + SEO + Best Practices)
- [ ] Mobile-first responsive (testar 320/768/1280)
- [ ] Formulário envia + valida client+server
- [ ] Pixel disparando PageView + Lead
- [ ] LGPD: banner cookies + opt-in checkbox + política linkada
- [ ] Schema markup válido (Google Rich Results Test)
- [ ] OG tags renderizam (Facebook Debugger)
- [ ] Sem placeholder `{{...}}` esquecido
- [ ] Sem broken link

### Relatório cliente

- [ ] Coerência markdown ↔ HTML (sem divergência numérica)
- [ ] Sem residuo `{{...}}` (BLOQUEADO automático)
- [ ] Gráficos SVG têm pontos (polyline não-vazia)
- [ ] Tabelas com >= 1 linha OR marcada "não aplicável"
- [ ] Sem fonte fabricada (Art. VI — Honestidade)
- [ ] Cores branding aplicadas
- [ ] Mobile-readable

### Auditoria conta

- [ ] Top 3 ações acionáveis (não vagas "melhorar copy")
- [ ] Cada anomalia tem evidência numérica
- [ ] Limitações declaradas (Art. VI: token expirado, sem acesso, etc.)
- [ ] Coerência com plano-estratégico (KPIs alvo referenciados)
- [ ] Sem alteração proposta implementada (read-only respeitado)

## Sinais de RED FLAG (bloqueio automático)

| Sinal | Por quê |
|-------|---------|
| Número fabricado | Art. VI — Honestidade. Quebra confiança cliente |
| Comp medical/financial claim sem disclaimer | Risco legal (ANVISA/CVM) |
| Placeholder `{{}}` em peça enviada | Vergonha + perda credibilidade |
| Promessa "100% garantido" | Risco PROCON |
| Sem opt-in formulário (LGPD) | Multa real R$50M |
| Pixel não testado | Mede coisa errada por 30d |
| Override budget sem @fin | Cliente surpresa = churn |

## Como dar feedback (formato)

```markdown
## Veredicto: REVISÃO

### Pontos a ajustar (5 max)
1. **[BLOQUEANTE]** Headline promete "5x mais leads" sem prova de case — remover ou citar fonte
2. **[BLOQUEANTE]** Pixel ID está vazio na LP (testei + verifiquei Console)
3. **[AJUSTE]** CTA "saiba mais" genérico → "agendar diagnóstico grátis"
4. **[AJUSTE]** Imagem hero pixelada — pedir alta-res designer
5. **[OPCIONAL]** Considerar mover prova social pra acima da dobra

### Quem corrige
- 1, 3: @copywriter (recriar copy)
- 2, 4: @designer (refazer asset)
- 5: @strategist (opcional, não-bloqueante)

### Prazo retorno: 24h
```

## Anti-padrões

- "Tá bom" sem checklist → todos itens devem ser checados explícito
- Aprovar por pressão de prazo → escalar @coo se houver pressão
- Feedback vago ("melhora isso") → sempre específico + sugestão de fix
- Loop infinito → max 2 retries, depois escala @coo/@ceo
- QA antes do `/lint-pre-qa` → linter mecânico ANTES (char count, nomenclatura) — não desperdiça frontier Opus em coisa que script pega

## Escala

- 2 BLOQUEADO seguidos no mesmo entregável → escalar @coo (problema sistêmico)
- BLOQUEIO por pressão @ceo/cliente → escalar @ceo formal + documentar (override só com auditoria via `/override`)
- Discordância @qa vs agente produtor → @coo media

## Métricas próprias

- Taxa APROVADO primeira: > 85% (sinal: equipe produz qualidade)
- Tempo médio veredicto: < 30min (não pode virar gargalo)
- Loops por entregável: < 1.5 médio (sinal: feedback é claro)
- Bloqueios falsos: < 5% (revisar checklist se subir)
