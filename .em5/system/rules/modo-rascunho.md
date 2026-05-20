# Modo Rascunho — Regra de Aprovação Humana

> Toda automação que toca canal externo (WhatsApp, Email, Anúncios pagos, redes sociais) **NASCE em modo rascunho**. Vai pra produção só após teste + checklist + aprovação humana formal.

## Princípio

**Velocidade de iteração > velocidade de envio.**

WhatsApp é o canal MAIS perigoso pra automatizar errado. Disparo em massa, persona falsa de humano, promessa sem base → queimam reputação + violam compliance + custam multas LGPD reais (R$50M).

em5 nasceu desenhado pra evitar isso: tudo começa em `modo: rascunho-padrao`. Só vai pro real depois de:

1. **Teste em ambiente fake** (números próprios da agência ou WAHA dev)
2. **Checklist preenchido** (compliance + voz + LGPD)
3. **Aprovação humana formal** (@ceo OR @cs aprovam por escrito)

## Modos disponíveis (campo `modo:` em workflow yaml)

| Modo | Quando usar | Bloqueio operacional |
|------|-------------|---------------------|
| `rascunho-padrao` | Toda automação canal externo nova | Bloqueia envio real até aprovação |
| `aprovado-producao` | Após aprovação formal — pode rodar real | Sem bloqueio |
| `execucao-imediata` | Crisis cliente (handoff humano, conta suspensa) | Sem bloqueio — velocidade > validação |
| `audit-mode` | Auditoria histórica — read-only, nunca envia | Bloqueia qualquer envio |

## Workflow modo rascunho — ciclo

```
1. Workflow novo (modo: rascunho-padrao)
   ↓
2. Gera artefatos (templates, mensagens, sequências)
   ↓
3. Teste fake (envio próprios números OR ambiente WAHA dev)
   ↓
4. Checklist preenchido (`modo-rascunho-checklist-{workflow}.md`)
   ↓
5. @qa veredicto APROVADO
   ↓
6. @ceo OR @cs assina aprovação formal (commit no log-operacional)
   ↓
7. modo: rascunho-padrao → modo: aprovado-producao (workflow yaml atualizado)
   ↓
8. Pode rodar com clientes reais
```

## Checklist mínimo (preencher antes aprovação)

`clientes/{nome}/operacao/aprovacoes/{workflow}-{YYYY-MM-DD}.md`:

```markdown
# Aprovação Workflow {nome} — {Cliente}

**Data:** YYYY-MM-DD
**Aprovador:** @ceo OR @cs (assinatura)

## Compliance
- [ ] LGPD: opt-in cliente OR legítimo interesse documentado
- [ ] Compliance perfil cliente (CFM/OAB/CVM se aplicável)
- [ ] Sem promessa não-comprovável
- [ ] Opt-out explícito em toda mensagem

## Voz e qualidade
- [ ] Tom alinhado branding cliente
- [ ] Sem typo / placeholder / lorem ipsum
- [ ] Personalização real (não spray-and-pray)
- [ ] Hook não-clickbait

## Teste técnico
- [ ] Enviado em número fake — render OK
- [ ] Link funcional (não 404)
- [ ] Imagens carregam mobile
- [ ] Cadência respeita rate limits
- [ ] Stop rules testadas (responder STOP funciona)

## Riscos
- [ ] Risco reputação cliente (escala 1-10): X
- [ ] Risco compliance (escala 1-10): X
- [ ] Plano se falhar: {plano-contingencia}

## Aprovação final
**Veredicto:** APROVADO / REVISÃO / BLOQUEADO
**Justificativa:** ...
**Próxima revisão:** YYYY-MM-DD (mínimo trimestral)
```

## Workflows obrigatoriamente em modo-rascunho

Todos os 7 sub-fluxos WhatsApp:
- `whatsapp-prospec-frio.yaml`
- `whatsapp-sdr-qualificacao.yaml`
- `whatsapp-cs-recorrente.yaml`
- `whatsapp-follow-up-venda.yaml`
- `whatsapp-onboarding-cliente.yaml`
- `whatsapp-reativacao.yaml`
- `whatsapp-handoff-humano.yaml` (exceção: `execucao-imediata`)

Email blast:
- `newsletter.yaml`
- `email-nurture-drip.yaml`
- `weekly-digest-whatsapp.yaml` (fallback email)

Campanhas pagas:
- `ciclo-campanha.yaml` (gate budget + QA antes publish)
- `lancamento.yaml`
- `google-ads.yaml`

## Exceções (não-rascunho ok)

| Workflow | Por quê |
|----------|---------|
| `whatsapp-handoff-humano` | Crisis cliente — velocidade > validação |
| `cobranca-falhou` | Crisis financeira — velocidade |
| `conta-suspensa-meta` | Crisis Meta — velocidade |
| `pixel-quebrado` | Crisis tracking — velocidade |
| `daily-run` | Read-only — só pausa em ALERTA |
| `auditoria-conta` | Read-only sempre |

## Anti-padrões

- Pular checklist porque "tem pressa"
- Aprovar próprio workflow (gate @ceo OR @cs separado)
- Aprovação verbal (sem documento = sem rastreio)
- Modo aprovado-producao sem trimestral re-review
- Ignorar STOP rule porque "cliente vai responder eventualmente"

## Métricas

- Workflows em modo-rascunho: tracked
- Tempo médio rascunho → aprovado: < 48h (idealmente)
- Taxa rejeição QA primeira: < 20% (sinal qualidade workflows novos)
- Auditoria trimestral cumprida: 100% workflows aprovados

## Relação Constitution

- Art. II (Autoridade Agente): aprovação formal documentada respeita autoridade
- Art. III (Artefatos > Conversa): checklist é artefato, não conversa
- Art. VI (Honestidade CLI): rascunho declara explicitamente que não é produção
- Regra Absoluta 2 (QA gate): modo-rascunho extende QA pra todo canal externo
