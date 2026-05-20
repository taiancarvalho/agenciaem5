# Landing Page Brief — {Cliente} | {Campanha}

**Data:** {YYYY-MM-DD}
**Solicitante:** {nome cliente OR @vendas}
**Workflow:** landing-page-build.yaml
**Prazo entrega:** {dias úteis}

## 1. Objetivo (1 só)

- [ ] Captura lead (formulário)
- [ ] Venda direta (checkout)
- [ ] Agendamento (calendar booking)
- [ ] Webinar/evento (inscrição)
- [ ] Download material rico (lead magnet)

**KPI primário:** {conversion rate alvo: ex >= 5%}

## 2. Público alvo (ICP específico LP)

- **Perfil demográfico:** {idade, gênero, região, classe}
- **Situação atual (dor):** {1-2 linhas}
- **O que ele já tentou:** {1-2 linhas}
- **Objeção principal:** {1 frase}
- **Aspiração:** {transformação que busca}

## 3. Oferta

| Item | Detalhe |
|------|---------|
| Produto/serviço | {nome + descrição 1 linha} |
| Preço | R$ {valor} OR "grátis" |
| Bônus | {se aplicável} |
| Urgência real | {prazo, vagas limitadas, etc — NÃO inventar} |
| Garantia | {ex: 7d devolução, sem letras miúdas} |

## 4. Provas sociais disponíveis

| Tipo | Quantidade | Onde |
|------|-----------|------|
| Depoimentos texto | {N} | {path/url} |
| Depoimentos vídeo | {N} | {path/url} |
| Cases com resultado numérico | {N} | {path/url} |
| Logos clientes/parceiros | {N} | {path/url} |
| Mídia (foi citado em) | {sim/não} | {qual} |

## 5. Hero (above the fold)

- **Headline (10-15 palavras max):** {hook + benefício claro}
- **Subheadline (20-30 palavras):** {especificação + diferenciação}
- **CTA principal (3-5 palavras):** {ex "Agendar diagnóstico grátis"}
- **Visual:** {imagem hero / vídeo curto / mockup produto}

## 6. Estrutura por sessão (wireframe)

1. **Hero:** promessa + CTA
2. **Prova social rápida:** logos + 1 depoimento
3. **Dor problema:** espelha cliente
4. **Solução:** como produto resolve
5. **Benefícios:** 3-5 bullets concretos
6. **Como funciona:** 3 steps
7. **Provas detalhadas:** 2-3 cases + 3-5 depoimentos
8. **Oferta:** preço + bônus + garantia
9. **FAQ:** 5-7 perguntas
10. **CTA final + urgência real**

## 7. Compliance (CRÍTICO conforme perfil cliente)

### LGPD (sempre)
- [ ] Política privacidade linkada no rodapé
- [ ] Opt-in formulário (checkbox não-pré-marcado)
- [ ] Banner cookies não-bloqueante
- [ ] Política especifica uso dados captados

### Saúde (PN-07)
- [ ] Sem promessa cura/resultado garantido
- [ ] Disclaimer "resultados variam"
- [ ] Sem antes/depois sem disclaimer
- [ ] CFM/CRO/CRN/CRMV declarado se aplicável

### Jurídico (PN-08)
- [ ] OAB Provimento 205/2021 compliance
- [ ] Sem "melhor advogado" OR comparações
- [ ] Disclaimer "resultados dependem caso"

### Financeiro (CVM se investimentos)
- [ ] CVM Resolução 39 compliance
- [ ] "Rentabilidade passada não garante futura"

## 8. Tracking obrigatório

- [ ] Pixel Meta PageView + Lead/Purchase
- [ ] CAPI ativo
- [ ] GA4 evento custom
- [ ] UTM padronizado
- [ ] Conversão marcada no GA4

## 9. Materiais necessários cliente

| Item | Status |
|------|--------|
| Logos alta-res | {pronto/pendente} |
| Cores hex + fontes | {pronto/pendente} |
| Cases anonimizados | {pronto/pendente} |
| Depoimentos com autorização escrita | {pronto/pendente} |
| Imagens equipe/produto | {pronto/pendente} |
| Vídeo institucional (se aplicável) | {pronto/pendente} |

## 10. Plataforma + tech stack

- **CMS:** {WordPress / Webflow / Shopify / custom}
- **URL final:** {dominio.com/lp/{slug}}
- **Hospedagem:** {Vercel / Netlify / próprio}
- **Form backend:** {Webhook → CRM cliente}

---

**Aprovação cliente:** {assinatura + data}
**Próximo passo:** trigger `landing-page-build.yaml`
