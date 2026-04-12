# Agency OS — Flow 4: Gestão do Cliente (CS)

# Objetivo

Definir como o CS gerencia o relacionamento operacional com o cliente no dia a dia, garantindo follow-up, cobrança de materiais, alinhamento contínuo, controle de expectativa e rastreabilidade operacional.

---

# Posição no sistema

Este fluxo acontece em paralelo à operação do cliente depois que ele já entrou na agência.

## Papel no ciclo

```
Onboarding → prepara
Setup Técnico → habilita
Estratégia → direciona
Gestão de Tráfego → executa
CS → acompanha, organiza, cobra, registra e mantém o cliente em movimento
```

## Observação crítica

O CS não existe só para dar boas-vindas e enviar mensagem. Ele é o dono da continuidade operacional do cliente.

---

# Problema que este fluxo resolve

Sem gestão contínua do cliente:

- materiais atrasam
- pedidos ficam soltos
- ninguém sabe o que foi combinado
- follow-ups viram memória humana
- o time perde contexto
- a operação fica refém de conversa espalhada

Este fluxo existe para transformar relacionamento com cliente em processo rastreável.

---

# Agente responsável

## CS

Tudo aqui continua sendo responsabilidade do CS.

Não é necessário criar vários subagentes para relacionamento, cobrança, follow-up ou controle de pendências. Tudo isso pertence ao mesmo domínio operacional.

## Regra estrutural

```
1 agente = 1 domínio de responsabilidade
AGENTE = PAPEL
TASK = EXECUÇÃO
```

---

# Papel do CS neste fluxo

## Função principal

Manter o cliente organizado, acompanhado e em movimento, garantindo que tudo que depende dele ou do time fique rastreado e atualizável.

## O que o CS faz

- acompanha o cliente no grupo oficial
- cobra materiais pendentes
- faz follow-up de entregas
- controla expectativa
- organiza pedidos e respostas
- registra interações relevantes
- mantém log operacional atualizado
- informa o time sobre pendências
- registra próximos passos
- envia relatórios e mensagens oficiais quando for o responsável

## Anti-papel

O CS não deve:

- operar mídia no lugar do gestor de tráfego
- definir estratégia no lugar do estrategista
- depender da memória pessoal para tocar o cliente
- deixar acordos importantes fora do sistema

---

# Estrutura central do fluxo

## Conceito principal

Cada cliente precisa ter um log operacional próprio.

Esse log não pode ser um arquivo infinito e desorganizado.

O modelo correto é:

```
log ativo + histórico arquivado
```

---

# Estrutura de arquivos

```
/clientes/cliente-x/
  /operacao/
    log-operacional.md
    proximos-passos.md
    contato.md
    /historico/
      2026-04.md
      2026-05.md
```

---

# Arquivo 1 — [log-operacional.md](http://log-operacional.md)

## Objetivo

Ser o arquivo vivo do dia a dia do cliente.

## O que deve conter

- itens em aberto
- interações recentes relevantes
- solicitações em andamento
- dependências do cliente
- dependências do time
- últimas conclusões importantes

## Regra

Esse arquivo deve ser curto, útil e facilmente legível.

Não deve virar um histórico infinito de anos.

---

# Arquivo 2 — historico/

## Objetivo

Guardar o que já foi concluído e não precisa mais poluir a operação viva.

## Estrutura sugerida

Arquivos por mês ou por ciclo operacional.

Exemplo:

```
/clientes/cliente-x/operacao/historico/
  2026-04.md
  2026-05.md
```

## Regra

Tudo que já foi encerrado pode sair do log ativo e ir para o histórico, sem perder rastreabilidade.

---

# Arquivo 3 — [proximos-passos.md](http://proximos-passos.md)

## Objetivo

Servir como resumo executivo curto do que importa agora.

## O que deve conter

- pendências principais
- quem deve o quê
- próximos movimentos críticos
- travas atuais

## Intenção

Nem sempre alguém quer ler a tabela completa do log. Esse arquivo deve mostrar rapidamente o que importa no momento.

---

# Modelo do log operacional

## Estrutura sugerida

```markdown
| Data | Origem | Destino | Tipo | Ação | Status | Próximo passo | Observação |
|------|--------|---------|------|------|--------|---------------|------------|
| 2026-04-13 | Gestor de Tráfego | Copywriter | Solicitação | Criativo para campanha de WhatsApp | Em aberto | Aguardar copy | Foco em prova social |
| 2026-04-13 | CS | Cliente | Cobrança | Vídeos curtos | Aguardando | Follow-up na sexta | Cliente pediu prazo |
| 2026-04-14 | Copywriter | Gestor de Tráfego | Entrega | Copy principal | Concluído | Enviar para design | Texto aprovado |
```

---

# Campos recomendados

```
Data
Origem
Destino
Tipo
Ação
Status
Próximo passo
Observação
```

## Status recomendados

- Em aberto
- Aguardando
- Em andamento
- Concluído
- Cancelado
- Bloqueado

---

# Regra de uso do log

## Como registrar

Quando nasce uma ação importante, o CS registra uma linha.

Essa linha pode ser atualizada enquanto estiver ativa.

Quando a ação for concluída, ela continua no log até a próxima rotação.

## Regra de rastreabilidade

Não apagar o passado sem registro.

O sistema precisa manter histórico.

---

# Regra de rotação do log

## Objetivo

Evitar que o log ativo fique gigante e inviável.

## Regra adotada

Quando o log passar de 100 linhas:

- arquivar concluídos antigos
- manter no log ativo todos os itens em aberto
- manter no log ativo os últimos 20 concluídos

## Resultado

O arquivo continua utilizável no dia a dia sem perder contexto operacional recente.

---

# Workflow do CS

```
1. Registrar interação relevante
2. Abrir pendência quando necessário
3. Atualizar status das ações
4. Cobrar o responsável certo
5. Registrar retorno recebido
6. Atualizar próximos passos
7. Arquivar concluídos quando necessário
```

---

# Tipos de ação que o CS precisa gerenciar

## Cliente

- envio de material
- aprovação
- resposta pendente
- agendamento
- alinhamento
- dúvida

## Time interno

- solicitação para copy
- solicitação para design
- alinhamento com tráfego
- envio de relatório
- retorno ao cliente

---

# Comandos esperados do CS

```
*registrar-interacao
*abrir-pendencia
*atualizar-status
*listar-pendencias
*gerar-proximos-passos
*arquivar-log
*enviar-relatorio-whatsapp
*registrar-envio
```

---

# Tasks do CS

```
tasks/
  registrar-interacao.md
  abrir-pendencia.md
  atualizar-status-log.md
  listar-pendencias.md
  gerar-proximos-passos.md
  arquivar-log.md
  enviar-relatorio-whatsapp.md
  registrar-envio.md
```

---

# Templates necessários

```
templates/
  log-operacional.md
  proximos-passos.md
  contato-cliente.md
```

---

# Data necessária

```
data/
  status-log.yaml
  tipos-acao.yaml
  politica-rotacao-log.yaml
```

---

# Workflow técnico sugerido

```
workflows/
  gestao-cliente-cs.yaml
```

---

# O que uma CLI pode fazer aqui

## Pode fazer

- criar linha no log
- atualizar status
- listar pendências abertas
- gerar resumo de próximos passos
- mover concluídos para histórico
- organizar o arquivo
- registrar envio de relatório

## Não deve prometer sem integração

- ler automaticamente todas as conversas externas sem conexão real
- adivinhar resposta do cliente
- monitorar plataformas externas por conta própria

## Regra prática

```
Se houver integração real, captar evento automaticamente.
Se não houver, registrar manualmente via comando.
```

---

# Dono do log

## Regra

O dono operacional do log do cliente é o CS.

Outros agentes podem gerar ações e interações, mas o CS é quem centraliza o registro e mantém o estado do cliente consistente.

---

# O que este fluxo resolve

Se esse fluxo for bem feito:

- o cliente deixa de depender da memória do time
- pendências não ficam soltas
- follow-up vira processo
- o histórico não se perde
- a operação consegue continuar mesmo com troca de contexto
- a CLI consegue operar em cima de um estado real do cliente

---

# Limite deste fluxo

Este fluxo não existe para substituir conversa humana.

Ele existe para registrar, organizar, resumir e manter a operação do cliente rastreável e utilizável dentro do Agency OS.