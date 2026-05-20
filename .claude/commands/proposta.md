# /proposta — Aprovar proposta cliente novo (estratégico)

**Argumento:** `/proposta {prospect-slug}`

## Classificação
**Estratégico** → @ceo (decisão de aceitar OR não)

## Roteamento

Acione **@ceo** com prompt:
```
@ceo Atlas — operação: aprovar proposta cliente novo
Prospect: {slug}
Receita: prospec-fechamento
Decisão pedida: APROVADO | AJUSTAR | RECUSAR
Referência: .em5/receitas/prospec-fechamento.md
```

## O que @ceo avalia

- Margem >= 30%
- Fit posicionamento agência
- Capacidade operacional disponível
- Risco compliance OK (LGPD + nicho)

## Após decisão

| Veredito | Próximo |
|----------|---------|
| APROVADA | @vendas envia + @fin cadastra → trigger onboarding |
| AJUSTAR | @vendas refaz max 2 iterações |
| RECUSAR | @vendas registra perdido + nutrir-3M |
