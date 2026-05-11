---
name: modo-cro
agent: traffic
description: Analisar conversao pos-clique — diagnosticar onde o usuario abandona, criar hipoteses e definir testes de otimizacao
inputs:
  - .omgsys/clientes/{nome}/trafego/campanhas-ativas.md
  - .omgsys/clientes/{nome}/estrategia/plano-estrategico.md
  - log-performance-criativa.md
  - dados de conversao (Google Analytics, pixel, formularios)
outputs:
  - diagnostico de conversao no log-performance-criativa.md
  - hipoteses e testes definidos
elicit: true
---

# Modo CRO — Otimizacao de Conversao

## Objetivo

Melhorar a taxa de conversao das paginas e fluxos para que o trafego pago gere mais leads e vendas. CRO nao substitui copy ou design — ele diagnostica e propoe testes que copy e design executam.

## Regra

```
So otimiza com dados e hipotese clara.
CRO nao cria documento separado.
Tudo vai nos logs existentes: log-operacional.md e log-performance-criativa.md
```

---

## Passo a passo

### 1. Coletar dados de conversao

Verificar:
- **Taxa de conversao da LP:** quantos visitantes viram leads? (benchmark: 10-30%)
- **Taxa de clique no CTA:** quantos clicaram para falar no WhatsApp?
- **Taxa de abandono:** em qual etapa o usuario sai?
- **CPL vs CAC:** o custo por lead esta saudavel para o ticket medio?
- **CTR do anúncio → conversao da LP:** se CTR alto e conversao baixa, o problema e a pagina, nao o anuncio

### 2. Diagnosticar problema

Responder:
- Onde o usuario abandonou?
- O problema e **oferta** (ninguem quer), **copy** (ninguem entende), **layout** (ninguem acha) ou **experiencia** (ninguem consegue)?
- Ha incoerencia entre anuncio e landing page? (message match)
- O formulario tem friccao demais?
- O CTA e claro e visivel?

### 3. Formular hipoteses

Para cada problema encontrado, criar 1-2 hipoteses testaveis:

```markdown
**Problema:** Taxa de conversao da LP baixa (2%)
**Hipotese:** Trocar a headline para focar na dor principal pode aumentar conversao para 5%+
**Teste:** Criar variacao B da LP com nova headline
**Metrica:** Taxa de conversao (visitantes → leads)
```

### 4. Definir testes

| Teste | Tipo | Esforço | Impacto esperado |
|-------|------|---------|-----------------|
| Trocar headline da LP | Copy | Baixo | +30% conversao |
| Adicionar prova social | Copy + Design | Medio | +20% conversao |
| Simplificar formulario | Design | Baixo | +15% conversao |
| Mover CTA para acima da dobra | Design | Baixo | +10% conversao |

### 5. Priorizar e executar

Usar criterio **ICE** (Impact, Confidence, Ease):
- **Impacto:** quanto pode melhorar? (1-10)
- **Confianca:** quao certo estou? (1-10)
- **Facilidade:** quao facil e implementar? (1-10)

ICE = I × C × E. Ordenar pelo maior.

### 6. Solicitar apoio

Se teste precisar de copy → `*solicitar-copy` ao Copywriter
Se teste precisar de design → Briefing ao Designer

### 7. Medir e documentar

Apos periodo de teste (minimo 7 dias):
- Comparar resultados
- Validar ou invalidar hipotese
- Registrar aprendizado no `log-performance-criativa.md`

---

## Output esperado

- Diagnostic de conversao documentado
- Hipoteses e testes priorizados
- Aprendizado registrado nos logs existentes
- Pronto para: `*iterar-campanha {nome}` ou `*otimizar-campanha {nome}`
