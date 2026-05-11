# OMG.sys — Setup Inicial do Sistema

> Execute este wizard uma única vez ao instalar o OMG.sys na sua agência.
> Para reconfigurar: `/setup`

---

## Passo 1 — Sua Agência

Vou fazer perguntas sobre sua agência. Responda uma por vez.

**P1:** Qual é o nome da sua agência?

**P2:** Qual é o seu nome? (você, o dono)

**P3:** Quais serviços sua agência oferece?
Responda com os números separados por vírgula:
```
1. Tráfego pago — Meta Ads
2. Tráfego pago — Google Ads
3. Copywriting e conteúdo
4. Design e criativos
5. Social media orgânico
6. SEO
7. E-mail marketing
8. WhatsApp / CRM
```

**P4:** Qual o canal principal de comunicação com clientes?
```
1. WhatsApp
2. E-mail
3. Slack
```

---

## Passo 2 — Nomes dos Agentes

Cada agente tem um ID funcional (imutável) e um nome fantasia (você define).
O sistema reconhece sempre o ID. O nome fantasia é como você prefere chamá-los.

Para cada agente abaixo, confirme o nome sugerido ou informe o seu:

| Agente | ID | Sugestão | Seu nome |
|--------|----|----------|----------|
| CEO Estratégico | @ceo | Atlas | ? |
| COO Operacional | @coo | Marcos | ? |
| Customer Success | @cs | Sol | ? |
| Estrategista | @strategist | Vera | ? |
| Gestor de Tráfego | @traffic | Max | ? |
| Copywriter | @copywriter | Cal | ? |
| Designer | @designer | Lux | ? |
| QA Gate | @qa | Zara | ? |

Se quiser usar os nomes sugeridos para todos: responda "usar defaults".

---

## Passo 3 — Composio (Ferramentas Externas)

O Composio é o gateway de ferramentas externas do OMG.sys.
Através dele os agentes operam Meta Ads, Gmail, Sheets, Slack e Google Analytics.

**P5:** Você já tem uma conta no Composio?
```
1. Sim, já tenho API Key
2. Não, preciso criar
```

Se não tiver: acesse composio.dev, crie a conta e copie sua API Key.
A key vai para o arquivo `.env` como `COMPOSIO_API_KEY=sua-key-aqui`.

**P6:** Quais ferramentas ativar via Composio?
```
1. Meta Ads (campanhas, insights, criativos)
2. Google Analytics (métricas de site)
3. Gmail (envio de relatórios e comunicação com cliente)
4. Google Sheets (registros e dashboards)
5. Slack (comunicação interna)
```

> **Nota:** Context7 já está configurado automaticamente.
> Use-o sempre que um agente não souber os parâmetros de uma ferramenta.

---

## Passo 4 — Geração dos Arquivos

Com as respostas acima, o sistema vai:

1. Criar/atualizar `omgsys-config.yaml` na raiz com toda a configuração
2. Atualizar `.claude/CLAUDE.md` com nome da agência, nomes dos agentes e ferramentas ativas
3. Atualizar `.claude/settings.json` se necessário
4. Confirmar que todos os 8 agentes estão em `.claude/agents/`

---

## Após o Setup

Seu sistema está pronto. Próximos passos:

```
@ceo                                    ← visão geral da agência
/novo-cliente nome-do-cliente           ← adicionar primeiro cliente
/onboarding nome-do-cliente             ← iniciar onboarding
/saude-sistema                          ← verificar tudo está funcionando
```

---

*OMG.sys Setup v1.0 — One Man Gang*
