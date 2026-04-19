---
name: validar-landing-page
agent: qa-campanha
description: Executar checklist de validacao de landing page antes do trafego
inputs:
- URL da landing page
- .agencyos/clientes/{nome}/copy/ (copies de anuncio associadas)
- .agencyos/clientes/{nome}/setup-tecnico/status.md
outputs:
- resultado da validacao de landing page
- itens a corrigir (se houver)
elicit: false
metadata:
  openclaw:
    emoji: "\U0001F9E0"
---

# Validar Landing Page

## Objetivo

Garantir que a landing page receba o trafego pago corretamente — com message match, formulario funcionando, pixel ativo e experiencia mobile adequada.

## Regra

```
Landing page sem validacao = dinheiro jogado fora.
Cada ponto de friccao na LP custa conversoes reais.
```

---

## Passo a passo

### 1. Acessar a landing page

Abrir a URL da landing page e inspecionar tanto na versao desktop quanto mobile.

### 2. Executar checklist

#### OBRIGATORIOS

```
[ ] Message match — headline da LP alinha com o hook do anuncio
    (usuario nao pode sentir que "caiu no lugar errado")
[ ] CTA visivel acima da dobra — primeira acao clara sem scroll
[ ] Formulario ou botao de WhatsApp funcionando
    — Testar envio real de formulario (ou click-to-WhatsApp)
[ ] Pixel disparando evento correto na pagina de obrigado/convertida
    — Verificar no status-tecnico.md que o pixel esta ativo
[ ] Sem links quebrados — clicar em todos os links da pagina
[ ] Carregamento aceitavel — pagina nao demora mais de 3-4s
[ ] Sem erros de JavaScript no console (se acessivel via browser)
```

#### DESEJAVEIS

```
[ ] Visualizacao mobile correta — responsiva, sem elementos sobrepostos
[ ] Prova social visivel — depoimentos, logos, numeros
[ ] FAQ com principais objecoes do ICP respondidas
    (ver analise-icp.md para objecoes)
[ ] Hero section clara em 3 segundos — o que e, para quem, por que importar
[ ] Sem distracoes de navegacao excessiva — LP deve ser focal, nao site completo
[ ] SSL ativo (https://) — obrigatorio para Meta e Google
```

### 3. Testar fluxo de conversao

Simular o percurso de um lead:

1. Clicar no link (como se viesse de um anuncio)
2. Preencher formulario ou clicar no WhatsApp
3. Verificar redirecionamento para pagina de obrigado
4. Confirmar que o pixel registrou o evento

### 4. Documentar resultado

```markdown
## Validacao de Landing Page — {Nome do Cliente} — {Data}

**URL:** {url da landing page}
**Auditado por:** Zara (QA de Campanha)

### Checklist
- Obrigatorios atendidos: X/Y
- Desejaveis atendidos: X/Y

### Resultado: APROVADO / REVISAO / BLOQUEADO

{Se revisao/bloqueado: listar items especificos com URL/elemento afetado}

### Teste de Conversao
- Formulario: Funcionou / Nao funcionou — {detalhe}
- WhatsApp: Funcionou / Nao funcionou — {detalhe}
- Pixel evento: Disparou / Nao disparou — {detalhe}
```

### 5. Registrar no log operacional

```markdown
| {data} | VALIDACAO | Zara | Validacao de LP {url resumida}. Resultado: {APROVADO/REVISAO/BLOQUEADO}. | CONCLUÍDO | {proximo passo} |
```

## Output esperado

- Landing page validada com todos os itens do checklist
- Teste de conversao executado e documentado
- Log operacional atualizado
