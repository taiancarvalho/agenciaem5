---
name: enviar-draft
agent: whats
description: Envia mensagem custom (não template) — passa por @qa se severity > medio
inputs:
  - cliente_slug
  - mensagem (texto livre)
  - severity_estimada: baixo | medio | alto | critico
outputs:
  - clientes/{slug}/comunicacao/whats-log.md (append)
elicit: true
model_tier: balanced
---

# Task: enviar-draft

## Objetivo

Mensagem fora de template padrão. Mais flexível, mais arriscada — gate @qa mandatório se severity > medio.

## Passo a passo

1. Recebe mensagem + severity_estimada
2. **@qa Crivo valida** se severity ≥ medio:
   - Tom alinhado com persona @cs Sol?
   - Erro ortográfico?
   - Compromisso impossível ("garanto 100% leads")?
   - Promessa fora do escopo do contrato?
3. Se @qa BLOQUEIA → volta pra @cs Sol corrigir
4. Se aprovado → segue fluxo de `*enviar-template`:
   - Stop rules
   - Horário
   - Driver (composio/waha)
5. Envia + loga

## Severity escala (referência)

| Conteúdo | Severity |
|----------|----------|
| Resposta a pergunta simples | baixo |
| Atualização semanal | baixo |
| Negociação de prazo | medio |
| Cobrança | alto |
| Resposta a reclamação | alto |
| Aviso de mudança contratual | critico |

## Critério de saída

- @qa validou (se ≥ medio)
- Mensagem enviada
- Log completo

## Anti-padrão

- NÃO bypassa @qa em severity alto/critico
- NÃO promete o que @strategist/@traffic não confirmou
