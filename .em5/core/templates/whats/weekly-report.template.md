# Template — Weekly Report

**Severity:** medio (passa por @qa se contém número-promessa)
**Quando usar:** domingo às 20h (cron) — resumo da semana pro cliente

---

📊 Resumo semanal — {nome_cliente}

**{kpi_principal_label}:** {valor_atual} ({delta_pct} vs semana passada)

🏆 Top criativo da semana: **{top_criativo_id}**
   → {metrica_principal}: {valor}

📅 Próxima semana:
{proxima_acao}

---

Quer detalhar algo? Tô aqui. 🙏

— {persona_cs} ({nome_pessoa})

---

**Variáveis:**
- `{kpi_principal_label}`: ex "ROAS", "Leads", "Custo por agendamento"
- `{valor_atual}`: número formatado
- `{delta_pct}`: ex "+15%", "-8%"
- `{top_criativo_id}`: ex "CR-042"
- `{proxima_acao}`: 1 linha do que vem por aí

**Antes de enviar — @qa checa:**
- [ ] Números corretos (cross-check com relatorios/diario-*.md)
- [ ] Delta calculado certo
- [ ] "Próxima ação" alinhada com plano estratégico

---

*Template em5 v1.3 — @whats Onda*
