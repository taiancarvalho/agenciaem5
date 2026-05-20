# /pedir — Entry point conversacional

**Argumento:** `/pedir "{descrição livre}"`

## O que este comando faz

Permite operador falar **português livre** sem decorar comandos. @director (@ceo OR @coo conforme classificação) identifica receita correta + executa.

## Como funciona

```
/pedir "preciso auditar CNA Jundiaí em meta"
→ identifica receita: auditoria-conta
→ identifica cliente: cnajund
→ identifica plataforma: meta
→ classificação: operacional → @coo direto
→ @coo cria ticket + executa receita
```

## Exemplos

| Frase humano | Skill identificada | Roteia |
|--------------|-------------------|--------|
| "preciso auditar CNA Jundiaí" | `/auditar cnajund meta` | @coo |
| "gera relatório do mês pra CNA Vila Mariana" | `/relatorio cnavm` | @coo |
| "lança o curso do João dia 15" | `/lancamento joao-curso` | @ceo → @coo |
| "como tá meu portfólio?" | `/portfolio` | @ceo |
| "aceitar proposta do prospect X?" | `/proposta prospect-x` | @ceo |
| "iterar criativos CNA Interlagos" | `/iterar cnainterlagos` | @coo |
| "tá tudo ok com cliente Y?" | `/status cliente-y` | @cs |

## Roteamento (CLAUDE.md Regra Absoluta 1)

Pipeline interno:

1. **Main thread parse:** identifica skill + parâmetros via NLP
2. **Classifica receita:** operacional / estratégico / híbrido (ler `.em5/system/rules/skills-classificadas.md`)
3. **Roteia:**
   - Operacional → @coo direto
   - Estratégico → @ceo
   - Híbrido → @ceo decide se executa OR delega @coo
4. **Executa:** ciclo padrão receita + ticket vivo

## Quando NÃO usar

- Skill direta é mais rápida (ex: já sabe `/auditar cnajund` — usa direto)
- Operação requer parâmetros estruturados (ex: `/cliente-novo {nome}`)
- Modo debug (use `/ticket` manual)

## Anti-padrões

- ❌ `/pedir` vago ("alguma coisa")
- ❌ `/pedir` esperando que main thread invente skill nova
- ❌ Usar `/pedir` pra evitar pensar (UX vira "magia")

## Fallback

Se parser não identifica skill:
```
❓ Não identifiquei skill específica. Possíveis:
1. /auditar {cliente}
2. /relatorio {cliente}
3. /campanha {cliente}

Reformule OR escolha (1-3).
```

## Princípio

Operador não memoriza 20 skills. `/pedir` cobre 100% (fallback inteligente). Skills diretas aceleram quando já conhecidas.
