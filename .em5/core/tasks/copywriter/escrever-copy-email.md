# Task: escrever-copy-email
# Agente: copywriter (Eco)
# Input: objetivo do email + segmento da lista + plano-estrategico.md
# Output: clientes/{nome}/copy/email/{data}-{tipo}-email.md

## Objetivo
Escrever copy de e-mail marketing: newsletters, sequências de nutrição,
e-mails de venda ou reativação de leads.

## Inputs necessários
1. Objetivo do e-mail (nutrir / vender / reativar / informar)
2. Segmento da lista (leads frios / leads quentes / clientes)
3. `.em5/clientes/{nome}/estrategia/plano-estrategico.md`
4. Posição na sequência (e-mail 1/5, 3/5, etc.)

## Execução

### 1. Estrutura padrão de e-mail de resposta direta

```
ASSUNTO: (decide se abrem — escrever 3 opções, escolher o melhor)
PREVIEW TEXT: (complementa o assunto, 40-80 chars)

---

Saudação + gancho (1-2 linhas — por que estou escrevendo isso agora?)

Desenvolvimento:
- Problema / situação (identificação com o leitor)
- Agitação (por que isso importa)
- Solução / insight / oferta

Prova (se aplicável): resultado, depoimento, dado

CTA: único, claro, com link

PS: (reforço do CTA ou segundo ângulo — e-mails de venda)
```

### 2. Regras de copy para e-mail

- Assunto: 40-60 caracteres, despertar curiosidade ou prometer benefício claro
- Primeira linha deve continuar o assunto — sem "olá, tudo bem?"
- Parágrafos curtos (2-3 linhas)
- Um único CTA por e-mail (não dispersar atenção)
- Tom conversacional — parece escrito para uma pessoa, não para uma lista
- PS é o segundo elemento mais lido — usar estrategicamente

### 3. Tipos de e-mail por objetivo

**Nutrição (sequência pós-lead):**
Entregar valor → construir confiança → apresentar solução gradualmente

**Venda direta:**
Hook forte → problema → agitação → solução → oferta → urgência → CTA → PS

**Reativação:**
Reconhecer a ausência → oferta de retorno → CTA direto

### 4. Salvar output
Criar em: `.em5/clientes/{nome}/copy/email/`
Nomear: `{YYYY-MM-DD}-{tipo}-{assunto-slug}.md`

Incluir no arquivo:
- Assuntos testados (pelo menos 2 opções)
- Preview text
- Copy completa
- CTA com placeholder de link

## Handoff
- Validar com @qa antes de enviar
- Via Composio MCP (Gmail/plataforma de email) após aprovação
