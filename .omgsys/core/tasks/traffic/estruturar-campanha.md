---
name: estruturar-campanha
agent: traffic
description: Criar estrutura inicial de campanhas seguindo a regra de 2 campanhas minimas — audiencia + objetivo
inputs:
  - .omgsys/clientes/{nome}/trafego/auditoria.md
  - .omgsys/clientes/{nome}/trafego/publicos-mapeados.md
  - .omgsys/clientes/{nome}/estrategia/plano-estrategico.md
  - copy e criativos disponiveis (ou em producao)
outputs:
  - .omgsys/clientes/{nome}/trafego/campanhas-ativas.md
elicit: true
---

# Estruturar Campanha

## Objetivo

Subir ou documentar a estrutura minima de campanhas. A regra obrigatoria do sistema e: no minimo 2 campanhas — uma de audiencia (base) e uma de objetivo principal (conversao).

## Regra

```
Sempre 2 campanhas minimas:
Campanha 1 = audiencia/impulsionamento/trafego
Campanha 2 = objetivo principal (leads, vendas, WhatsApp)
Sempre com nomenclatura padrao: [CLIENTE]_[OBJETIVO]_[CANAL]_[TIPO]_[ID]
```

---

## Passo a passo

### 1. Confirmar estrategia

Revisar `.omgsys/clientes/{nome}/estrategia/plano-estrategico.md` para confirmar:
- Objetivo principal do cliente
- Budget disponivel
- Canais escolhidos
- Publicos definidos

### 2. Definir distribuicao de verba

Sugerir distribuicao:
- **Campanha 1 (audiencia):** 20-30% do budget diario
- **Campanha 2 (objetivo):** 70-80% do budget diario

Ajustar conforme contexto do cliente. Explicar logica ao usuario.

### 3. Estruturar Campanha 1 — Base de Audiencia

```
Nome: {CLIENTE}_TRAFFIC_META_ABERTO_001
Objetivo: Engajamento / Tráfego para Instagram
Público: Aberto ou interesses amplos
Posicionamentos: Instagram (Feed + Reels + Stories)
Verba diaria: R$ XX,XX
```

### 4. Estruturar Campanha 2 — Objetivo Principal

```
Nome: {CLIENTE}_{OBJETIVO}_{CANAL}_{TIPO}_002
Objetivo: {Leads / WhatsApp / Vendas}
Público: {definido no mapeamento de publicos}
Posicionamentos: {automatico ou manual}
Verba diaria: R$ XX,XX
```

### 5. Documentar campanhas

Criar `.omgsys/clientes/{nome}/trafego/campanhas-ativas.md`:

```markdown
# Campanhas Ativas — {Nome do Cliente}

**Data de criacao:** {data}
**Gestor:** Max (Gestor de Trafego)

---

## Campanha 001 — Base de Audiencia
- Nome: {nomenclatura}
- Objetivo: {objetivo}
- Público: {descricao}
- Verba diaria: R$ XX
- Status: {Ativa / Pausada}
- Conjunto(s): { IDs e publicos }

## Campanha 002 — Objetivo Principal
- Nome: {nomenclatura}
- Objetivo: {objetivo}
- Público: {descricao}
- Verba diaria: R$ XX
- Status: {Ativa / Pausada}
- Conjunto(s): { IDs e publicos }

---

## Criativos em uso
| ID Campanha | Criativo ID | Copy | Status |
|-------------|------------|------|--------|

## Observacoes
- {notas sobre estrategia, ajustes planejados, etc.}
```

### 6. Solicitar criativos se necessario

Se nao ha criativos disponiveis para todas as campanhas, executar `*solicitar-criativos {nome}`.

### 7. Registrar no log

Adicionar entrada no `log-operacional.md` com a criacao das campanhas.

---

## Output esperado

- `campanhas-ativas.md` documentado com estrutura completa
- Campanhas publicadas na plataforma
- Pronto para: `*monitorar-performance {nome}`
