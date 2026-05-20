# historico/ — Tickets Vivos por Demanda

> Source-of-truth de cada demanda operacional da agência. **1 pasta = 1 ticket = 1 demanda.**

## O que é

Cada demanda (auditar conta, gerar relatório, lançar campanha, cobrar cliente) cria 1 ticket vivo em `historico/{id}/ticket.md`. Todos agentes envolvidos anotam **no mesmo arquivo** com YAML status inline.

Substitui sync manual antigo de 3 arquivos separados (log + status + notas-sessao).

## Convenção ID

```
{YYMMDD}-{clienteslug}-{tipo}
```

Exemplos:
- `260520-cnajund-auditoria-meta`
- `260520-cnasp-relatorio-mensal`
- `260521-petshop-onboarding`
- `260522-clinicasp-lancamento-curso`

- **YYMMDD**: data criação (compacta)
- **clienteslug**: slug curto cliente (definido em `em5-config.yaml.clientes.{nome}.slug`)
- **tipo**: ação curta (kebab-case)

## Estrutura pasta

```
historico/
├── _template/
│   └── ticket.md          (template canônico — copiar daqui)
├── README.md               (este arquivo)
├── 260520-cnajund-auditoria-meta/
│   └── ticket.md
├── 260520-cnasp-relatorio-mensal/
│   ├── ticket.md
│   └── anexos/             (opcional — screenshots, exports brutos)
└── ...
```

## Quem escreve o que

| Agente | Escreve em | Quando |
|--------|------------|--------|
| @coo | Cabeçalho + steps planejados + status_global | Criação ticket |
| @coo | status_global em transições | Cada step done |
| @{operacional} | yaml do seu step + anotações livres | Antes/durante/depois sua execução |
| @qa | yaml veredito do seu step | Após validar |
| @coo | Seção 9 fechamento | Quando todos steps done |

## Estados ticket (campo `status_global`)

| Status | Significado |
|--------|-------------|
| `EM_ANDAMENTO` | Steps em execução normal |
| `BLOQUEADO` | Aguarda input externo (cliente, decisão @ceo, fornecedor) |
| `APROVADO` | Todos steps done + QA aprovou + entregue |
| `REPROVADO` | QA bloqueou definitivo — volta scope @ceo |
| `CANCELADO` | Demanda cancelada (cliente desistiu, mudança escopo, etc) |

## Estados step (yaml `status` inline)

| Status | Significado |
|--------|-------------|
| `pending` | Aguardando despacho |
| `doing` | Em execução agora |
| `done` | Concluído (ver `veredito` pra resultado) |
| `blocked` | Travado (motivo nas observacoes) |
| `skipped` | Pulado (motivo nas observacoes) |

## Vereditos step (yaml `veredito` inline)

| Veredito | Significado |
|----------|-------------|
| `pendente` | Step não terminou (status pending/doing) |
| `aprovado` | Step done OK |
| `reprovado` | Step done com falha — escalation |
| `cancelado` | Step pulado intencional |

## Anti-padrões

- ❌ Editar ticket fora da seção do seu agente
- ❌ Sobrescrever anotações de outro agente
- ❌ Atualizar status_global sem ser @coo
- ❌ Marcar `done` sem preencher `output` + `observacoes`
- ❌ Criar ticket sem ID válido (YYMMDD-slug-tipo)
- ❌ Salvar dados sensíveis cliente inline (PII vai pra `clientes/{nome}/`, ticket só linka)

## Boas práticas

- ✅ Append-only nas anotações livres (não delete histórico)
- ✅ Timestamp em toda atualização YAML
- ✅ Referenciar artefatos por path (não copy/paste conteúdo)
- ✅ Linkar tickets relacionados (parent/child)
- ✅ Sumarizar — ticket não vira dump

## Relação com workflows antigos

- `.em5/workflows/*.yaml` foram **deletados** (substituídos por receitas)
- `.em5/receitas/{nome}.md` é spec da operação (workflow + task fundidos)
- Ticket é INSTÂNCIA executada de uma receita
- Cliente folder (`clientes/{nome}/`) mantém artefatos finais — ticket apenas linka

## UI futura

Pasta `historico/` foi escolhida na raiz pra facilitar:
- Painel histórico web parse `historico/*/ticket.md`
- Search cross-cliente (qual auditoria foi feita no Q1?)
- Métricas (tempo médio por receita, taxa aprovação @qa, etc)

## Operações

### Criar ticket manual

```bash
/ticket {tipo} {cliente}
# OR
/pedir "preciso {ação} pro {cliente}"
```

### Listar tickets em andamento

```bash
ls historico/*/ticket.md | head -20
# OR
grep -l "status_global: EM_ANDAMENTO" historico/*/ticket.md
```

### Auditar ticket fechado

```bash
cat historico/{id}/ticket.md
# OR ferramenta tickets.html futura (parse historico/*)
```
