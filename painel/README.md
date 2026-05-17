# em5 Painel

> Dashboard visual estático da Agência em5.
> Lê de `../em5/clientes/*/operacao/status.yaml` (filesystem-first, Art. I).
> Build Astro estático — zero servidor, deploy grátis.

## Dev

```bash
cd painel
npm install
npm run dev
# abre http://localhost:4321
```

## Build estático

```bash
npm run build
# output em painel/dist/
```

Pra hospedar: Cloudflare Pages, Vercel, Netlify, GitHub Pages. Deploy do diretório `dist/`.

## Estrutura

```
painel/
├── astro.config.mjs
├── package.json
├── src/
│   ├── pages/index.astro       # Tela principal — cards + KPIs
│   ├── layouts/Base.astro       # Layout com tema dark
│   └── lib/loader.js            # Lê .em5/clientes/*/operacao/status.yaml
└── README.md
```

## Como o painel sabe dos clientes?

Cada cliente em `.em5/clientes/{slug}/operacao/status.yaml` declara:

```yaml
nome: "Clínica X"
nicho: clinica-odonto
estagio: ativo  # onboarding | ativo | pausado | churn
roas_semanal: 3.5
cpa_atual: 28.50
proxima_acao: "Iterar criativo CR-042"
alerta_severidade: alto  # critico | alto | medio | baixo | null
alerta_mensagem: "ROAS caiu 25% — investigar audiência"
ultima_atualizacao: 2026-05-16
```

E `.em5/clientes/{slug}/financeiro/mensalidade.yaml`:

```yaml
valor_mensal: 4500
inadimplencia_dias: 0
```

## KPIs agregados

Calculados automaticamente em `lib/loader.js`:
- Total/Ativos/Críticos/Inadimplentes
- ROAS médio semanal
- MRR (sum mensalidades ativas)
- Learnings do mês atual (count)

## Próximas evoluções

- Página individual `/cliente/{slug}` (drill-down)
- Página `/financeiro` (MRR, churn, ROI)
- Página `/learnings` (busca por categoria)
- Theme switcher (light/dark)
- Export PDF via Composio toolset

---

*em5 v1.2 — Fase 10 (Dashboard Astro)*
