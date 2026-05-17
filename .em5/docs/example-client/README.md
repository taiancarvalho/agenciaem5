# Example Client — Odontovital SP

> 📖 **Apenas referência educacional.** NÃO é cliente ativo.

## Por que está aqui

Cliente do projeto original (OMG.sys) mantido como **exemplo de estrutura completa** de workspace cliente em5. Mostra:

- `branding/` (cores.yaml + fontes.yaml)
- `copy/` (CR-001 ângulo vergonha, CR-002 roteiro vídeo, análise ICP)
- `design/` (conceito visual)
- `estrategia/` (análise briefing, plano estratégico)
- `onboarding/` (briefing final + respostas)
- `operacao/` (logs operacional, growth, performance criativa, validação QA)
- `setup-tecnico/`
- `trafego/`

## Por que NÃO está em `.em5/clientes/`

Se ficasse lá:
- Agentes operariam nele (`@fin *sync-asaas` puxaria fake data)
- Painel mostraria como cliente ativo
- `validate-em5` contaria como cliente
- Hooks de learnings capturariam dados falsos

Movido pra `.em5/docs/` pra ser **invisível ao sistema** mas visível pra docs.

## Como usar

### Estudar estrutura

```bash
tree .em5/docs/example-client/
# ou
find .em5/docs/example-client -type f -name '*.md' | head -20
```

### Ler workflow completo

Ordem cronológica:
1. `onboarding/briefing-respostas.md` → coleta do cliente
2. `onboarding/briefing-final.md` → consolidação @cs
3. `estrategia/analise-briefing.md` → análise @strategist
4. `estrategia/plano-estrategico.md` → plano @strategist
5. `copy/analise-icp.md` → ICP @copywriter
6. `copy/CR-001-angulo-vergonha.md` → ângulo + copy @copywriter
7. `design/conceito-visual.md` → conceito @designer
8. `copy/CR-002-roteiro-video.md` → roteiro @copywriter
9. `operacao/validacao-qa.md` → veredicto @qa
10. `operacao/log-*.md` → logs operacionais

### Replicar pro seu cliente

Use o exemplo como referência ao rodar `/cliente-novo {seu-slug}` e operar com os agentes.

## NÃO faça

- ❌ Mover de volta pra `.em5/clientes/` (vai poluir sistema)
- ❌ Operar agentes nele (`@traffic *sync-asaas docs/example-client/...`)
- ❌ Deletar (perde referência educacional valiosa)

## Para criar novo example-client

Após operar com 1 cliente real bem-sucedido, anonimize e mova pra `.em5/docs/example-client-{slug}/`.

---

*em5 v1.3.x — referência educacional, não-operacional.*
