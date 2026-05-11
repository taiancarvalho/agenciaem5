# OMG.sys — Setup Inicial

Bem-vindo ao OMG.sys. Este e o setup unico da sua agencia.
Execute apenas uma vez. Para reconfigurar: `/setup`

---

## Passo 1 — Sua Agencia

Vou fazer algumas perguntas. Responda uma por vez.

1. Qual e o nome da sua agencia?
2. Qual e o seu nome? (voce, o dono)
3. Quais servicos sua agencia oferece?
   *(responda com os numeros separados por virgula)*
   1. Trafego pago (Meta Ads)
   2. Trafego pago (Google Ads)
   3. Copywriting e conteudo
   4. Design e criativos
   5. Social media organico
   6. SEO
   7. E-mail marketing
   8. WhatsApp / CRM

---

## Passo 2 — Nomes dos Agentes

Cada agente tem um ID funcional (imutavel) e um nome fantasia (personalizavel).
Pode usar os nomes sugeridos ou inventar os seus proprios.

| ID | Papel | Sugestao | Seu nome |
|----|-------|----------|----------|
| @ceo | Estrategia da agencia | Atlas | ? |
| @coo | Orquestrador operacional | Marcos | ? |
| @cs | Customer Success | Sol | ? |
| @strategist | Estrategista de marketing | Vera | ? |
| @traffic | Gestor de Trafego | Max | ? |
| @copywriter | Copywriter | Cal | ? |
| @designer | Designer | Lux | ? |
| @qa | QA de Campanha | Zara | ? |

*Ambos funcionam: `@ceo` e `@{nome-configurado}` sao equivalentes.*

---

## Passo 3 — Composio (Integracoes Externas)

Para que os agentes operem ferramentas externas (Meta Ads, Gmail, Sheets, etc.)
e necessario configurar o Composio MCP.

1. Acesse composio.dev e crie uma conta se nao tiver
2. Copie sua API Key
3. Cole aqui: *(aguardando API Key)*

Apos receber a API Key, confirmarei quais ferramentas estao disponiveis.

**Integracoes disponiveis:**
- Meta Ads — campanhas, criativos, performance
- Google Analytics — metricas de site e conversoes
- Gmail — envio de relatorios ao cliente
- Slack — notificacoes internas
- Google Sheets — relatorios e dashboards

---

## Passo 4 — Geracao dos Arquivos

Com as respostas acima, vou:
1. Criar `omgsys-config.yaml` com toda a configuracao
2. Gerar `.claude/CLAUDE.md` personalizado para sua agencia
3. Atualizar `.claude/settings.json` com sua Composio API Key
4. Confirmar que todos os agentes estao registrados em `.claude/agents/`

---

## Conclusao

Apos o setup, seu primeiro comando:

```
@ceo — inicie o CEO para uma visao geral da sua nova agencia
```

Ou acesse qualquer agente diretamente:
```
@coo    — operacoes e workflows
@cs     — onboarding de cliente
@traffic — gestao de trafego
```

---

*OMG.sys Setup v1.0*
