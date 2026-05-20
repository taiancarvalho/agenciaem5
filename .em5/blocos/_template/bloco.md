---
nome: {nome-bloco}
agente: {agente-padrao}  # quem executa esse bloco
tempo_medio: {Xmin}
composio_mcp: []  # toolkits necessários
versao: 1.0
usado_em: []  # lista receitas que referenciam — atualizar quando bloco for adicionado
---

# Bloco: {Nome Atômico da Operação}

> {1 linha descritiva do step atômico}

## O que faz

{2-3 frases — operação atômica reusável usada em 2+ receitas}

## Inputs

- {parâmetro 1}
- {parâmetro 2}

## Execução

1. {ação 1}
2. {ação 2}
3. {ação 3}

## Output

- {arquivo gerado OR estado mudado}

## Anti-padrões

- ❌ {anti-padrão específico}

## Composio MCP

- {toolkit} (ex: `meta_ads.GET_INSIGHTS`)

## Quando virar bloco?

Step vira bloco quando usado em **2+ receitas**. Senão fica inline na receita.

## Receitas que usam este bloco

_(atualizar manual quando bloco for referenciado)_

- `.em5/receitas/{nome}.md`
