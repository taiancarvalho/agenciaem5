# Projeto DESIGN.md Extractor

## Mandato de Design: O Shell Mestre "Clay"

Este repositório utiliza um **padrão mestre obrigatório** para todos os brandbooks gerados. O design é inspirado na estética da Clay.com, focando em calor, densidade técnica e tipografia arredondada.

### Regras do Shell (A "Casca" da Ferramenta)

1.  **Canvas Creme:** O fundo padrão das páginas deve ser sempre `#fffaf0`.
2.  **Naming:** A ferramenta deve se identificar apenas como `_thebrandbook` na sidebar.
3.  **Tipografia Mestre:**
    *   Fonte: **Inter**.
    *   Headlines: Peso **500** obrigatório.
    *   Tracking: Negativo (`-2.5px` para XL, `-2px` para Large, `-1px` para Medium).
4.  **Layout "Tight":** O espaçamento vertical deve ser otimizado para evitar vazios excessivos. Seções utilizam `4rem` de padding/margin.
5.  **Cor da Marca:** A cor primária da marca extraída deve ser usada **apenas como sotaque** (badges, links ativos, swatches). Os títulos estruturais da ferramenta devem ser sempre neutros (`#0a0a0a`).
6.  **Templates:** Sempre utilize `templates/design-board-preview.html` e `.css` como fonte da verdade.

---
**Nota:** Estas regras aplicam-se à interface da ferramenta de documentação. A identidade da marca extraída deve ser preservada fielmente dentro das áreas de conteúdo e previews de componentes.
