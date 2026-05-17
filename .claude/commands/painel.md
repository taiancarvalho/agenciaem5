# /painel — Dashboard Visual em5

> Abre dashboard local em http://localhost:4321 mostrando todos clientes em 1 tela.
> Stack Astro estático — lê filesystem direto.

## Uso

```
/painel              # Dev: instala se preciso + roda dev server
/painel --build      # Build estático em painel/dist/
/painel --deploy     # Build + abre instruções de deploy
```

## Setup primeira vez

```bash
cd painel
npm install
npm run dev
```

Abre http://localhost:4321 com:
- 6 KPIs no topo (clientes ativos, críticos, inadimplentes, ROAS médio, MRR, learnings)
- Cards de todos clientes ordenados por severidade
- Alertas visíveis nos críticos
- Próxima ação por cliente

## Quanto tempo pra olhar tudo?

≤ 30 segundos pra varrer 10+ clientes. Bem abaixo dos 5 min do princípio em5.

## Princípios respeitados

- **Art. I (Filesystem First):** lê `.em5/clientes/*/operacao/status.yaml` direto. Sem DB.
- **Art. III (Artefatos):** mudança em status.yaml → reflete no painel ao rebuild
- **Art. XII (em 5 min):** dashboard mostra tudo essencial pra decidir prox passo

## Deploy

```bash
cd painel
npm run build
# painel/dist/ é estático puro
```

Hospede em Cloudflare Pages, Vercel, Netlify, GitHub Pages. Tudo grátis.

## Stack

- Astro 4.x (static output)
- js-yaml pra parse de status files
- CSS vanilla com variáveis (dark theme)
- Zero JS no client (exceto se adicionar ilhas reativas no futuro)

## Limitações atuais

- Read-only (não edita status pelo painel — usa skills em5 pra atualizar)
- Sem auth (local-first)
- Sem realtime (rebuild manual)

Pra distribuir B2B: Fase 11 (Electron).

---

*em5 v1.2 — Fase 10 (Dashboard Astro)*
