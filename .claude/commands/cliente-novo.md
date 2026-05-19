# /cliente-novo — Criar workspace de novo cliente

**Argumento:** `/cliente-novo $ARGUMENTS` (ex: `/cliente-novo clinica-sao-paulo`)

## O que este comando faz

1. Lê `.em5/core/data/estrutura-pastas.yaml` para conhecer estrutura padrão
2. Cria pasta `clientes/{slug}/` completa
3. Inicializa logs operacionais com data atual
4. **(Fase 13)** Pergunta se quer extrair DESIGN.md agora — dispara `/extrair-design` se sim
5. Registra criação em log operacional + learnings

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente antes de continuar.

Normalize o nome: letras minúsculas, hífens no lugar de espaços, sem acentos.
Exemplo: "Clínica São Paulo" → `clinica-sao-paulo`

## Estrutura criada

```
clientes/{slug}/
├── onboarding/
├── estrategia/
├── copy/
├── design/criativos/ + videos/ + landing-pages/ + exports/
├── assets/logo/ + fotos/ + videos/ + produtos/
├── branding/
│   ├── cores.yaml
│   ├── fontes.yaml
│   ├── DESIGN.md          ← gerado por /extrair-design (Fase 13)
│   ├── preview.html       ← preview Clay-style
│   ├── tokens.json        ← design tokens
│   ├── theme.css          ← CSS variables
│   └── source/            ← inputs originais do extractor
├── setup-tecnico/status.md
├── trafego/
├── financeiro/
│   ├── mensalidade.yaml
│   ├── cobrancas.yaml
│   ├── cliente-asaas.yaml
│   └── pagamentos.md
├── inteligencia/          ← @scout Espia (concorrência)
├── comunicacao/           ← @whats Onda + @cs Sol
├── relatorios/
└── operacao/
    ├── status.yaml        ← consumido pelo painel
    ├── log.md
    ├── log-performance-criativa.md
    └── proximos-passos.md
```

## Fluxo Fase 13 (NOVO)

Após criar workspace, **pergunta:**

```
✓ Workspace criado em clientes/{slug}/

🎨 Quer extrair DESIGN.md agora? (Recomendado — @designer Lux + @copywriter Eco
   precisam disso pra operar - Art. XIII hard dependency)

[1] Sim, tenho URL do site/Instagram do cliente
[2] Sim, tenho briefing/arquivo local
[3] Pular por enquanto (agentes Lux/Eco vão pedir depois)
```

Se [1] ou [2]: pede a fonte → dispara `/extrair-design {slug} {fonte}` automaticamente.
Se [3]: avisa que `/extrair-design` precisa rodar antes de criar criativo/copy.

## Próximos passos auto

Após `/cliente-novo`:
1. `@cs Sol *iniciar-onboarding {slug}` — coleta info
2. **(se DESIGN.md ausente)** `/extrair-design {slug} {fonte}`
3. `@fin Caixa *cadastrar-cliente-asaas {slug}` — financeiro
4. `@strategist Vera *analisar-briefing {slug}` — estratégia

## Critério em5

Setup ≤ 5 min input humano:
- Nome cliente: 1 input
- URL ou briefing pra DESIGN: 1 input
- Confirmação extração: 1 click
= ≤ 3 inputs, cliente pronto pra operar
