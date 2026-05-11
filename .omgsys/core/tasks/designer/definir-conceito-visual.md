---
name: definir-conceito-visual
agent: designer
description: Escolher conceito visual antes de produzir criativos, com base na copy, estrategia e branding do cliente
inputs:
  - .omgsys/clientes/{nome}/copy/CR-{id}.md (copy da campanha)
  - .omgsys/clientes/{nome}/estrategia/ (documento de estrategia)
  - .omgsys/clientes/{nome}/branding/ (cores, fontes, guia de estilo)
outputs:
  - conceito visual definido e documentado em .omgsys/clientes/{nome}/operacao/log-performance-criativa.md
  - direcao visual clara para producao
elicit: true
---

# Definir Conceito Visual

## Objetivo

Escolher o conceito visual que reforça a mensagem da copy e a intenção estratégica da campanha. Esta etapa é um checkpoint obrigatório antes de qualquer produção visual — sem conceito definido, não se cria peça.

O conceito visual é a ponte entre "o que a copy diz" e "o que o design mostra". É ele que garante que a peça visual transmite emoção, reforça a promessa e guia o olhar do público na dirección correta.

## Regra

```
Design sem copy = arte bonita que não vende.
Lux não começa sem ter lido a copy, a estratégia e o branding.
Conceito visual deve ser definido e confirmado antes da produção.
```

---

## Passo a passo

### 1. Ler a copy da peça

Acessar `.omgsys/clientes/{nome}/copy/CR-{id}.md` e extrair:

- **Hook** — o que captura atenção nos primeiros segundos
- **Ângulo** — a abordagem emocional ou racional
- **Promessa** — o que o cliente receberá/transformará
- **CTA** — ação esperada
- **Tom emocional** — urgência, desejo, prova social, conveniência, etc.

### 2. Ler a estratégia da campanha

Acessar `.omgsys/clientes/{nome}/estrategia/` e extrair:

- **Objetivo da campanha** — conversão, engajamento, awareness?
- **Canal** — Meta Ads (atenção rápida), landing page (leitura profunda), WhatsApp (apoio direto)?
- **Posição no funil** — topo, meio, fundo?
- **Público-alvo** — quem vai consumir a peça?

### 3. Ler o branding e conferir assets

Consultar:

- `.omgsys/clientes/{nome}/branding/cores.yaml` — paleta de cores
- `.omgsys/clientes/{nome}/branding/fontes.yaml` — tipografia
- `.omgsys/clientes/{nome}/branding/guia-estilo.md` — tom visual, restrições
- `.omgsys/clientes/{nome}/assets/` — logo, fotos, produtos disponíveis

### 4. Escolher o conceito visual

Com base na copy e estratégia, selecionar um dos conceitos visuais abaixo — ou propor outro que faça mais sentido:

| Conceito Visual | Quando usar | Direção visual |
|-----------------|-------------|----------------|
| **Prova social** | A copy usa testemunhos, números, resultados reais | Depoimentos em destaque, números grandes, selos de validação, faces reais, layout com credibilidade |
| **Urgência** | A copy usa escassez, prazo, limite | Elementos de tempo (relógio, contagem regressiva), cores quentes (vermelho, laranja), composição que pressiona a ação |
| **Desejo** | A copy foca em lifestyle, transformação, status | Imagens aspiracionais, cenários premium, cores sofisticadas, composição que projeta o "depois" da transformação |
| **Conveniência** | A copy foca em simplicidade, facilidade, praticidade | Layout limpo, espaço em branco, ícones de simplicidade, cores calmas, composição que transmite fluidez |

Se nenhum desses se encaixa, propor um conceito próprio e justificar.

### 5. Definir a direção visual

Com o conceito escolhido, detalhar:

```
Conceito: {nome do conceito — ex: prova social}
Justificativa: {por que esse conceito reforça a copy e a estratégia}
Composição: {o que aparece na cena — produto, pessoa, texto, etc.}
Hierarquia visual: {1° o que o olho vê, 2°, 3°}
Tom: {agressivo / suave / sofisticado / direto / aspiracional}
Formato: {1:1 feed / 9:16 stories / 16:9 landing page / etc.}
Elementos-chave: {quais elementos visuais vão carregar a mensagem}
Restrições: {o que NÃO pode aparecer — baseado no branding}
```

### 6. Confirmar com o usuário

Se `elicit: true` (padrão), apresentar ao usuário:

```
Conceito visual definido para CR-{id}:

Conceito: {nome}
Justificativa: {explicação}
Composição: {descrição}
Hierarquia: {1º, 2º, 3º}

Deseja validar este conceito ou ajustar?
```

Aguardar confirmação antes de prosseguir para produção.

### 7. Registrar no log

Encontrar a linha do `CR-{id}` em `.omgsys/clientes/{nome}/operacao/log-performance-criativa.md` e registrar:

```
Conceito visual: {nome do conceito}
Direção: {breve descrição}
```

## Output esperado

- Conceito visual definido e documentado
- Direção visual clara para a produção
- Pronto para: `*gerar-imagem`, `*gerar-video` ou `*gerar-ugc`