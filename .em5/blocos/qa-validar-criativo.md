---
nome: qa-validar-criativo
agente: qa
tempo_medio: 5min
composio_mcp: []
versao: 1.0
usado_em: [ciclo-campanha, iteracao-criativa, carrossel-ig, reels-ig, lancamento]
---

# Bloco: QA Validar Criativo (imagem/vídeo)

## O que faz
Veredito formal criativo visual. APROVADO | REVISÃO | BLOQUEADO.

## Inputs
- arquivo criativo (PNG/JPG/MP4)
- branding cliente
- especificação plataforma (resolução, duração)

## Execução
Checklist:
- [ ] Branding correto (cores hex + fontes + logo posição)
- [ ] Resolução plataforma (1080×1080 IG / 1080×1920 stories / etc)
- [ ] Legível mobile (texto >= 14pt equiv)
- [ ] Sem dependência ÚNICA áudio (legendas embutidas)
- [ ] Sem violação direitos autorais
- [ ] Vídeo: hook 3s funciona sem som
- [ ] Sem placeholder/lorem ipsum

## Output
- Veredito + ajustes
- Anotação ticket

## Anti-padrões
- ❌ Aprovar sem testar mobile
- ❌ Pular validação direitos autorais
