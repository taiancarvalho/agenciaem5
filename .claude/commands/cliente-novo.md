# /novo-cliente — Criar workspace de novo cliente

**Argumento:** `/novo-cliente $ARGUMENTS` (ex: `/novo-cliente clinica-sao-paulo`)

## O que este comando faz

1. Lê `.em5/core/data/estrutura-pastas.yaml` para conhecer a estrutura padrão
2. Cria a pasta `.em5/clientes/{nome}/` com toda a estrutura
3. Inicializa os logs operacionais com data atual
4. Registra a criação no log operacional

## Instrução

Se `$ARGUMENTS` estiver vazio, pergunte o nome do cliente antes de continuar.

Normalize o nome: letras minúsculas, hífens no lugar de espaços, sem acentos.
Exemplo: "Clínica São Paulo" → `clinica-sao-paulo`

Crie a estrutura completa:
```
.em5/clientes/{nome}/
├── onboarding/
├── estrategia/
├── copy/
├── design/criativos/ + videos/ + landing-pages/ + exports/
├── assets/logo/ + fotos/ + videos/ + produtos/
├── branding/cores.yaml + fontes.yaml
├── setup-tecnico/status.md
├── trafego/
├── relatorios/
└── operacao/
    ├── log-operacional.md
    ├── log-performance-criativa.md
    ├── log-growth.md
    └── proximos-passos.md
```

Após criar, informe o próximo passo: `@cs *iniciar-onboarding {nome}`
