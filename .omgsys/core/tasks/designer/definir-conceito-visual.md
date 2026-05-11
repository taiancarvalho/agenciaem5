---
name: definir-conceito-visual
agent: designer
description: Escolher conceito visual antes de produzir criativos, com base na copy, estrategia e branding do cliente
inputs:
  - .omgsys/clientes/{nome}/copy/CR-{id}.md
  - .omgsys/clientes/{nome}/estrategia/
  - .omgsys/clientes/{nome}/branding/
outputs:
  - conceito visual definido e documentado
  - direcao visual clara para producao
elicit: true
---

# Definir Conceito Visual

## Playbook de Referência

**Ler antes de executar:** `.omgsys/playbooks/designer-instagram.md`
**Memória:** ler últimas 3 entradas de `.omgsys/clientes/{nome}/memoria/notas-sessao.md`

---

## Objetivo

Escolher o conceito visual que reforça a mensagem da copy e a intenção estratégica da campanha. Checkpoint obrigatório antes de qualquer produção visual.

## Regra

```
Design sem copy = arte bonita que não vende.
Lux não começa sem ter lido a copy, a estratégia e o branding.
Conceito visual deve ser definido e confirmado antes da produção.
```

---

## Passo a passo

### 1. Ler a copy da peça

Acessar `CR-{id}.md` e extrair:
- **Hook** — o que captura atenção
- **Ângulo** — DOR / PROVA SOCIAL / URGÊNCIA / ASPIRAÇÃO / CONVENIÊNCIA
- **Promessa** — o que o cliente receberá
- **CTA** — ação esperada

### 2. Escolher conceito com base no ângulo

**Árvore de decisão obrigatória:**

| Ângulo da Copy | Conceito Visual | Elementos-chave | UGC Shot Type |
|---------------|-----------------|-----------------|---------------|
| DOR | Agitação, cores quentes | Expressão preocupada, contraste, vermelho/laranja | `talking_selfie_problem` |
| PROVA SOCIAL | Faces reais, números grandes | Depoimentos em destaque, selos, credênciais | `talking_selfie_testimonial` ou `testimonial_hold` |
| URGÊNCIA | Countdown, pressão visual | Relógio/prazo, cores quentes, CTA grande | `mirror_selfie` (tensão) ou `overhead_flatlay` |
| ASPIRAÇÃO | Lifestyle premium, cenário | Imagens aspiracionais, cores sofisticadas, "depois" | `mirror_selfie` (aspirational) ou `lifestyle_still` |
| CONVENIÊNCIA | Minimalista, clean | Espaço em branco, ícones simples, fluidez | `screen_recording_selfie` ou `overhead_flatlay` |

Se nenhum se encaixa, propor conceito próprio e justificar.

### 3. Ler o branding do cliente

Consultar:
- `branding/cores.yaml` — paleta
- `branding/fontes.yaml` — tipografia
- `branding/guia-estilo.md` — tom visual, restrições
- `assets/` — fotos, logo, produtos

### 4. Definir direção visual

```
Conceito: {nome do conceito}
Justificativa: {por que reforça a copy e a estratégia}
Composição: {o que aparece na cena}
Hierarquia visual: {1°, 2°, 3° elemento}
Tom: {agressivo / suave / sofisticado / direto / aspiracional}
Formato: {1:1 / 4:5 / 9:16 / etc.}
Restrições: {o que NÃO pode aparecer}
UGC shot type sugerido: {conforme tabela acima}
```

### 5. Confirmar com o usuário

Apresentar conceito definido e aguardar confirmação antes de prosseguir para produção.

### 6. Registrar e atualizar memória

Registrar no `log-performance-criativa.md` e adicionar entrada em `memoria/notas-sessao.md`.

---

## Em caso de falha

Se o conceito não puder ser definido (branding ausente, copy sem ângulo claro):

```markdown
**Problema:** {o que está faltando}
**Agente responsável:** @{designer ou copywriter}
**Ação corretiva:** {ler-branding.md / revisar copy antes de prosseguir}
**Retestar após:** {condição}
```

---

## Handoff

```markdown
## Handoff para @designer (produção)
**Arquivos que ele DEVE ler:**
- copy/CR-{id}.md
- branding/ (cores, fontes, guia)

**O que foi feito:** {conceito definido e aprovado}
**Atenção:** {restrições de branding, assets disponíveis}

**Próxima task:** gerar-ugc ou gerar-imagem ou gerar-video
```

## Output esperado

- Conceito visual definido e documentado
- Direção visual clara para a produção
- Pronto para: `*gerar-imagem`, `*gerar-video` ou `*gerar-ugc`
