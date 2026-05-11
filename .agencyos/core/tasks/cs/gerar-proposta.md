---
name: gerar-proposta
agent: cs
description: Gera proposta comercial personalizada para um prospect
inputs:
  - briefing inicial do prospect (coletado previamente)
  - omgsys-config.yaml (servicos que a agencia oferece)
  - core/templates/contratos/proposta-base.md
outputs:
  - prospects/{nome}/proposta-{data}.md
elicit: true
---

# Gerar Proposta Comercial

## Objetivo
Transformar o briefing do prospect em uma proposta comercial clara, objetiva e personalizada.
Foco no problema do prospect e na transformação que a agência entrega — não em uma lista de serviços.

## Passo a passo

1. **Confirmar informações do prospect**
   Se não tiver todas as informações abaixo, coletar antes de continuar:
   - Nome do prospect e segmento de atuação
   - Objetivo principal (leads, vendas, visibilidade)
   - Canais de interesse (Meta, Google, social, etc.)
   - Orçamento aproximado (verba + honorário)
   - Prazo desejado para resultados

2. **Ler `omgsys-config.yaml`**
   - Confirmar quais serviços a agência oferece
   - Usar apenas serviços disponíveis na proposta

3. **Montar a proposta**
   Usar `core/templates/contratos/proposta-base.md` como base.

   Estrutura obrigatória:
   - **Contexto:** o problema identificado no prospect
   - **Proposta de valor:** a transformação que a agência entrega
   - **Escopo:** o que está incluído e o que não está (clareza evita conflito)
   - **Investimento:** honorário + verba recomendada
   - **Prazo e condições:** mínimo de contrato, forma de pagamento
   - **Próximos passos:** o que acontece após a aprovação

4. **Salvar** em `prospects/{nome}/proposta-{data}.md`
   Criar a pasta `prospects/{nome}/` se não existir.

5. **Registrar** no log operacional: "Proposta gerada para prospect {nome} em {data}"

## Regras
- Não prometer resultado específico (ex: "garantimos 100 leads")
- Ser claro sobre o que não está incluído no escopo
- Proposta personalizada — não genérica
