---
nome: qa-validar-copy
agente: qa
tempo_medio: 5-10min
composio_mcp: []
versao: 1.0
usado_em: [ciclo-campanha, iteracao-criativa, carrossel-ig, reels-ig, blog-seo, newsletter, lancamento]
---

# Bloco: QA Validar Copy

## O que faz
Veredito formal copy (anúncio/post/email/blog). APROVADO | REVISÃO | BLOQUEADO.

## Inputs
- copy.md OR snippet
- branding cliente (cores/voz/guia-estilo)
- compliance perfil (LGPD + CFM/OAB/CVM se aplicável)

## Execução
Checklist:
- [ ] Sem erro gramatical/ortográfico
- [ ] Sem promessa não-comprovável
- [ ] CTA específico (não genérico)
- [ ] Conforme branding/voz cliente
- [ ] Sem palavras proibidas
- [ ] Sem compliance issue
- [ ] Char count dentro limite plataforma
- [ ] Densidade keyword 1-2% (se SEO)

## Output
- Veredito + lista ajustes específicos
- Anotação ticket yaml step 2

## Anti-padrões
- ❌ Aprovar por pressão
- ❌ Feedback vago ("melhora isso")
- ❌ Pular checklist
