---
name: validar-objetivo-real
agent: estrategista
description: Confirmar com o usuario se o objetivo declarado e o objetivo real do cliente — nem sempre sao a mesma coisa
inputs:
  - .agencyos/clientes/{nome}/onboarding/briefing-final.md
  - .agencyos/clientes/{nome}/estrategia/analise-briefing.md (se existir)
outputs:
  - objetivo-real-confirmado registrado no briefing-final e no log-operacional
elicit: true
---

# Validar Objetivo Real

## Objetivo

Garantir que estamos perseguindo o objetivo real do cliente — nao apenas o que ele disse inicialmente. Clientes frequentemente confundem o sintoma com o problema real.

## Regra

```
Se o objetivo nao estiver claro, nao existe estrategia.
Melhor perder 5 minutos validando do que 30 dias otimizando para a metrica errada.
```

---

## Passo a passo

### 1. Ler contexto do cliente

Ler briefing-final e analise-briefing (se existir) para entender:
- O que o cliente disse que quer (objetivo declarado)
- O que a estrategia identifica como necessidade real (objetivo interpretado)

### 2. Comparar declarado vs real

Montar a comparacao:

| Aspecto | Declarado | Interpretado |
|---------|-----------|--------------|
| Objetivo | {o que o cliente disse} | {o que a estrategia indica} |
| Metrica | {metrica que o cliente mencionou} | {metrica que realmente importa} |
| Urgencia | {como o cliente enxerga} | {nivel real de urgencia} |

### 3. Confirmar com o usuario

Apresentar ao usuario a interpretacao estrategica e perguntar:

```
🎯 Análise de Objetivo — {Nome do Cliente}

O cliente disse que quer: "{objetivo declarado}"

Minha leitura estrategica: o objetivo real é "{objetivo interpretado}"

Justificativa:
{explicar o raciocinio em 2-3 linhas com base no briefing}

Confirma que este é o objetivo a perseguir?
Se não, qual é o objetivo real?
```

### 4. Registrar resultado

Atualizar `.agencyos/clientes/{nome}/onboarding/briefing-final.md` com:

```markdown
**Objetivo real confirmado:** {objetivo final validado}
**Validado em:** {data}
**Validado por:** Vera (Estrategista)
```

### 5. Atualizar log operacional

```markdown
| {data} | VALIDAÇÃO | Estrategista | Objetivo real validado com usuario: {objetivo} | CONCLUÍDO | Definir posicionamento e oferta |
```

### 6. Casos especiais

**Se o briefing nao tem informacao suficiente:**
```
⚠️ Briefing insuficiente para validar objetivo real.
→ Solicitar ao CS: *coletar-briefing {nome} — aprofundar perguntas de objetivo
```

**Se existem objetivos conflitantes:**
```
⚠️ Objetivos conflitantes detectados:
1. {objetivo A}
2. {objetivo B}
→ Necessario priorizar. Um objetivo principal e necessario before executar.
```

---

## Output esperado

- Objetivo real documentado e confirmado
- Log operacional atualizado
- Se confirmado: pronto para `*definir-posicionamento {nome}`
- Se nao confirmado: retornar ao CS para coleta adicional
