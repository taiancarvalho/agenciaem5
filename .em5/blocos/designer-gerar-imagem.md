---
nome: designer-gerar-imagem
agente: designer
tempo_medio: 10-30min
composio_mcp: [wavespeed, canva, adobe]
versao: 1.0
usado_em: [ciclo-campanha, iteracao-criativa, carrossel-ig, blog-seo, newsletter, lancamento]
---

# Bloco: Gerar Imagem

## O que faz
Cria criativo imagem (anúncio/post/carrossel/email/blog).

## Inputs
- briefing visual (copy + ângulo + branding)
- formato/resolução (1080×1080 / 1080×1350 / 1080×1920 / 1200×628 / etc)
- tipo (anúncio / post / capa / banner)

## Execução
1. Ler branding cliente (cores.yaml + fontes.yaml + guia-estilo.md)
2. Escolher tool: WaveSpeed (UGC realista) · Canva (template) · Adobe (custom)
3. Gerar versão v1
4. Versionar CR-XXX-v1.{ext}
5. Salvar `clientes/{nome}/design/criativos/`
6. Registrar `log-performance-criativa.md`

## Output
- arquivo imagem + path
- Versionado CR-XXX

## Anti-padrões
- ❌ Sem branding lido antes
- ❌ Texto < 14pt mobile
- ❌ Sem versionamento CR-XXX

## Composio
- `WAVESPEED_GENERATE_IMAGE` OR Canva/Adobe MCPs
