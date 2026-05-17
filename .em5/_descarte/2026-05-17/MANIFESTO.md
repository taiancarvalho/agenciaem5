# 🗑️ Descarte — 2026-05-17

> Arquivos movidos pra revisão antes de delete definitivo.
> Revisar e decidir: **manter, devolver ao sistema, ou deletar permanentemente.**

## Item por item

### 1. `BUILD-GUIDE.md` (152 linhas)

**Origem:** `.em5/BUILD-GUIDE.md`
**Razão:** Documento pre-v1.1, descreve arquitetura inicial do sistema.
**Substituído por:**
- `CHANGELOG.md` (raiz) — histórico de versões
- `README.md` (raiz) — overview público
- `.em5/core/constitution.md` — princípios formais

**Recomendação:** 🗑️ deletar (informação coberta em outros docs)

---

### 2. `BUILD-PLAN.md` (814 linhas)

**Origem:** `.em5/BUILD-PLAN.md`
**Razão:** Plano de construção inicial — todas fases já entregues e documentadas no CHANGELOG.
**Substituído por:**
- `CHANGELOG.md` (histórico de fases)
- `~/.claude/plans/todos-os-arquivos-aqui-foamy-harbor.md` (plano completo da sessão)
- Commits git (audit trail)

**Recomendação:** 🗑️ deletar (redundante)

---

### 3. `README-template.md`

**Origem:** `.em5/README-template.md`
**Razão:** Template antigo do README. README.md raiz já é v1.3 atualizado.

**Recomendação:** 🗑️ deletar

---

### 4. `LEIAME.md`

**Origem:** `.em5/LEIAME.md`
**Razão:** "Mapa do sistema" pré-rebrand. Conteúdo duplica README.md atual.

**Recomendação:** 🗑️ deletar

---

### 5. `audit/baseline-2026-05.md`

**Origem:** `.em5/audit/baseline-2026-05.md`
**Razão:** Snapshot da Fase 0 (auditoria inicial antes do refator v1.1).

**Recomendação:** 🟡 **MOVER pra `.em5/_archive/`** (referência histórica útil, não deletar)

OU: 🗑️ deletar se prefere histórico limpo (commits Git preservam o conteúdo).

---

### 6. `clientes/odontovital-sp/` (17 arquivos)

**Origem:** `.em5/clientes/odontovital-sp/`
**Razão:** Cliente demo do projeto original (OMG.sys). Não consta como cliente ativo nem em vendas, financeiro ou status.

**⚠️ CONFIRMAR ANTES DE DELETAR:**
- É cliente real ativo? → **DEVOLVER** pra `.em5/clientes/`
- É exemplo/template? → manter como `.em5/clientes/_examples/odontovital-sp/`
- É lixo? → 🗑️ deletar

**Recomendação:** ❓ user decide

---

### 7. `clientes/teste-piloto/` (criado nesta sessão)

**Origem:** `.em5/clientes/teste-piloto/`
**Razão:** Cliente fake criado na **simulação 1A** desta sessão (validação de `/cliente-novo`).

**Recomendação:** 🗑️ deletar (cumpriu propósito de teste)

---

### 8. `_dia/` (criado nesta sessão)

**Origem:** `.em5/_dia/`
**Razão:** Output da simulação 1D `/dia`. Não estava versionado (gitignore cobre `_dia/`).

**Recomendação:** 🗑️ deletar

---

## Comandos rápidos

### Revisar conteúdo

```bash
ls .em5/_descarte/2026-05-17/
cat .em5/_descarte/2026-05-17/MANIFESTO.md
```

### Devolver item

```bash
mv .em5/_descarte/2026-05-17/{nome} .em5/{local-original}/
```

### Deletar tudo (após revisão)

```bash
rm -rf .em5/_descarte/2026-05-17/
```

### Deletar item específico

```bash
rm -rf .em5/_descarte/2026-05-17/{nome}
```

---

## Resumo

| Status | Item | Ação sugerida |
|--------|------|---------------|
| 🗑️ deletar | BUILD-GUIDE.md | Deletar |
| 🗑️ deletar | BUILD-PLAN.md | Deletar |
| 🗑️ deletar | README-template.md | Deletar |
| 🗑️ deletar | LEIAME.md | Deletar |
| 🟡 archive | audit/baseline-2026-05.md | Mover pra `_archive/` ou deletar |
| ❓ user decide | odontovital-sp | Confirmar se cliente real |
| 🗑️ deletar | teste-piloto | Deletar (teste sessão) |
| 🗑️ deletar | _dia/ | Deletar (não versionado) |

**Espaço liberado ao deletar tudo:** ~30 KB (docs) + arquivos de cliente.

---

*Manifesto gerado por auditoria automática 2026-05-17.*
