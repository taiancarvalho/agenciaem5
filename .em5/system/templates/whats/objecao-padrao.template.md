# Template — Objeção Padrão (resposta a dúvida cliente)

**Severity:** medio (passa por @qa se objeção crítica — preço, escopo)
**Quando usar:** cliente faz pergunta que match com `vendas/objecoes-comuns.yaml`

---

{nome_cliente}, entendo.

{resposta_da_objecao_yaml}

{contra_pergunta_yaml}

---

**Variáveis:**
- `{resposta_da_objecao_yaml}`: lookup em `vendas/objecoes-comuns.yaml` → `resposta_padrao`
- `{contra_pergunta_yaml}`: lookup → `contra_pergunta`

**Exemplo prático** (objeção `preco_caro`):

```
Maria, entendo.

Antes de comparar valor, vale entender:
Hoje você paga quanto por cliente novo (CAC)?
Nosso preço só faz sentido se cobrir esse custo + sobrar margem.

Quanto cliente novo vale pro seu negócio nos próximos 12 meses?
```

**@qa checa antes:**
- [ ] Objeção corretamente identificada (não confundir preco com tempo)
- [ ] Resposta usa template real do yaml, não improviso
- [ ] Não desconto antecipado (Art. V — sem invenção)

---

*Template em5 v1.3 — @whats Onda*
