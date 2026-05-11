---
name: enviar-relatorio
agent: cs
description: Montar e enviar relatório de performance ao cliente — nunca pelo Gestor de Tráfego diretamente
inputs:
  - .omgsys/clientes/{nome}/relatorios/{mes}-relatorio.md (gerado pelo Gestor de Tráfego)
  - contexto de relacionamento com o cliente
outputs:
  - mensagem de WhatsApp formatada para envio
  - registro no log operacional
elicit: true
---

# Enviar Relatório ao Cliente

## Objetivo

Transformar o relatório técnico gerado pelo Gestor de Tráfego em uma comunicação clara, contextualizada e adequada ao tom do relacionamento com o cliente.

## Regra Crítica

```
O relatório ao cliente SEMPRE passa pelo CS.
O Gestor de Tráfego NUNCA envia diretamente ao cliente.
```

---

## Passo a passo

### 1. Ler o relatório técnico

Acessar `.omgsys/clientes/{nome}/relatorios/` e ler o relatório mais recente gerado pelo Max.

### 2. Confirmar tom com o usuário

Perguntar:

```
1. Como está o humor do cliente neste momento? (satisfeito, neutro, ansioso, cobrador)
2. Existe algum resultado negativo que precisa de contexto especial?
3. Tem alguma boa notícia que deve ser destacada?
4. É relatório de qual período? (semana, mês)
```

### 3. Formatar mensagem de WhatsApp

Usar o template abaixo, adaptando o tom conforme o contexto:

```
Olá {nome_contato}! 👋

Aqui está o resumo da sua campanha — período {data_inicio} a {data_fim}:

📊 *RESULTADO GERAL*
• Investimento: R$ {valor}
• {Métrica principal}: {resultado} (meta era {meta})
• {Métrica secundária}: {resultado}

{se atingiu meta:}
✅ *Meta atingida!* {contexto positivo breve}

{se não atingiu meta:}
⚠️ *Abaixo da meta* — {explicação honesta em 1 linha + o que estamos fazendo}

🏆 *DESTAQUE DO PERÍODO*
{melhor campanha ou criativo e por quê}

🔧 *O QUE AJUSTAMOS*
• {ação tomada 1}
• {ação tomada 2}

🎯 *PRÓXIMOS PASSOS*
• {próxima ação 1}
• {próxima ação 2}

Alguma dúvida? Pode falar! 🚀
```

### 4. Confirmar antes de enviar

Apresentar a mensagem formatada e perguntar:

```
Essa é a mensagem para o cliente {nome}. Deseja ajustar alguma coisa antes de enviar?
```

### 5. Registrar no log

```markdown
| {data} | ENTREGA | CS | Relatório {período} enviado ao cliente via WhatsApp. | CONCLUÍDO | Aguardar feedback do cliente |
```

## Output esperado

- Mensagem formatada e aprovada para envio
- Relatório registrado no log operacional
- Cliente informado com contexto adequado ao relacionamento
