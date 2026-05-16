# Workflow Execution — Regras de Execução dos Workflows

## Princípio Task-First

**Workflows são compostos por tasks conectadas, não por agentes conectados.**
Uma task validada é lei: deve ser executada conforme configurada.

---

## 7 Workflows Principais

### 1. Flow 0 — Agency Setup

**Propósito:** Estruturar a própria agência como primeiro produto.

```
Agency Master → Estrategista (*modo-vendas) → CS (estrutura interna)
```

| Fase | Agente | Output |
|------|--------|--------|
| Posicionamento | Estrategista | posicionamento.md |
| Oferta | Estrategista | oferta.md |
| Script comercial | Estrategista | script-vendas.md |
| Branding | Designer | brand-kit-agencia/ |
| Estrutura interna | CS | workspace organizado |

---

### 2. Flow 1 — Onboarding do Cliente

**Propósito:** Transformar cliente recém-fechado em cliente documentado.

**Agente responsável:** CS (do início ao fim)

```
CS: gerar-contrato → enviar-contrato → confirmar-assinatura →
    criar-pasta-cliente → criar-grupo-whatsapp → enviar-boas-vindas →
    coletar-briefing → estruturar-briefing → organizar-assets →
    gerar-onboarding-final
```

**Output principal:** `.em5/clientes/{nome}/onboarding/briefing.md`

---

### 3. Flow 1.5 — Setup Técnico do Cliente

**Propósito:** Garantir acessos, tracking e infraestrutura antes da execução.

**Agente responsável:** CS

**Regra do CLI:**
```
Se integração real configurada → validar automaticamente
Se não houver integração → gerar checklist manual, nunca fingir
```

**Output:** `.em5/clientes/{nome}/setup-tecnico/status.md`

---

### 4. Flow 2 — Estratégia de Campanha

**Propósito:** Transformar briefing em plano estratégico validado.

**Agente responsável:** Estrategista

```
Estrategista: analisar-briefing → validar-objetivo-real → definir-oferta →
              definir-angulo → escolher-canais → definir-tipo-campanha →
              definir-funil-macro → definir-orcamento → criar-hipoteses →
              validar-plano-estrategico → gerar-plano-estrategico
```

**Output principal:** `.em5/clientes/{nome}/estrategia/plano-estrategico.md`

**Handoff:** Estrategista → Gestor de Tráfego + Copywriter + Designer

---

### 5. Flow 3 — Gestão de Tráfego

**Propósito:** Operar mídia paga com documentação e otimização contínua.

**Agente responsável:** Gestor de Tráfego

```
Gestor de Tráfego: ler-cliente → auditar-conta → identificar-padroes →
                   reativar-campanhas-validas → subir-estrutura-inicial →
                   solicitar-criativos → publicar-campanhas →
                   monitorar-campanhas → otimizar-campanhas →
                   gerar-relatorio → notificar-cs
```

**Ciclos:**
- Monitoramento: diário (desvios graves)
- Otimização: semanal (janela de 7 dias)
- Relatório: mensal

**Handoff:** Gestor de Tráfego → CS (via relatorio-whatsapp.md)

---

### 6. Flow Copy + Design (Execução Criativa)

**Propósito:** Produzir materiais criativos alinhados à estratégia.

**Sequência:**
```
Gestor de Tráfego → solicita criativos
Copywriter → cria ângulos → escreve copy → registra no log → entrega para Designer
Designer → lê branding → define conceito visual → produz peça → versiona → registra log
QA de Campanha → valida (APROVADO/REVISÃO/BLOQUEADO)
Gestor de Tráfego → publica
```

---

### 7. Flow 4 — Gestão Contínua do Cliente (CS)

**Propósito:** Manter cliente organizado, acompanhado e em movimento.

**Agente responsável:** CS (paralelo aos outros flows)

```
CS: registrar-interacao → abrir-pendencia → atualizar-status →
    cobrar-responsavel → registrar-retorno → atualizar-proximos-passos →
    arquivar-log (quando necessário)
```

**Output:** `.em5/clientes/{nome}/operacao/log-operacional.md` (sempre atualizado)

---

## Modos Especiais (não são flows separados)

### Modo CRO (via Gestor de Tráfego)
```
*modo-cro {cliente} → analisar-conversao → criar-hipotese →
executar-teste → medir-resultado → registrar-aprendizado
```
Registra em: `log-performance-criativa.md` + `log-operacional.md`

### Modo Growth (via Gestor de Tráfego)
```
*modo-growth {cliente} → identificar-vencedores → validar-consistencia →
escalar-campanha → monitorar-performance
```
Só escala o que já provou funcionar (critério: 7+ dias de resultado consistente)

### Modo Sales Optimizer (via Estrategista)
```
*modo-vendas → definir-posicionamento → criar-oferta →
melhorar-script → analisar-call → iterar-script
```
Loop: reunião → transcrição → análise → melhoria → novo script

---

## Regras de Execução

1. **Sempre ler a task completa antes de executar**
2. **Tasks com `elicit: true` exigem input do usuário — nunca pular**
3. **Veredicto BLOQUEADO do QA interrompe o flow imediatamente**
4. **Handoffs sempre referenciam o artefato gerado, não a conversa**
5. **Relatório ao cliente sempre passa pelo CS — nunca direto do Gestor de Tráfego**
6. **Nada publicado sem Quality Gate do @qa**
