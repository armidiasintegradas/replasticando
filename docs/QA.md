# Quality Assurance & Verification Protocol — Replasticando

## 1. Ciclo Obrigatório de Verificação

Nenhuma alteração ou página é considerada pronta sem passar pelo ciclo de validação fechada:

$$\text{BUILD} \longrightarrow \text{RUN} \longrightarrow \text{RENDER} \longrightarrow \text{CAPTURE} \longrightarrow \text{COMPARE} \longrightarrow \text{IDENTIFY DELTAS} \longrightarrow \text{FIX} \longrightarrow \text{RENDER AGAIN}$$

> **REGRA DE INTEGRIDADE:** Nunca reportar que um item foi testado ou validado sem a efetiva execução do teste automatizado ou captura visual correspondente.

---

## 2. Matriz de Viewports e Ambientes

Toda rota deve ser auditada e capturada nas seguintes resoluções canônicas:
- **Mobile Pequeno**: `375 x 667` (iPhone SE)
- **Mobile Moderno**: `390 x 844` (iPhone 13/14)
- **Tablet**: `768 x 1024` e `820 x 1180` (iPad Portrait / Landscape)
- **Desktop Padrão**: `1280 x 800` (MacBook Air / Laptop)
- **Desktop Amplo**: `1440 x 900` e `1920 x 1080` (Full HD)

---

## 3. Checklist de Auditoria por Rota

### 3.1. Navegação & Menu
- [ ] Botão `[///]` abre o Fullscreen Menu com transição suave.
- [ ] Tecla `Escape` fecha o menu e devolve o foco ao botão ativador.
- [ ] Foco do teclado fica contido dentro do menu quando aberto (Focus Trap).
- [ ] Rolagem do corpo (`body`) é bloqueada sem salto horizontal de tela.
- [ ] Links das 14 rotas apontam para destinos válidos.

### 3.2. Responsividade & Layout
- [ ] Zero overflow horizontal em todas as larguras de tela.
- [ ] Imagens respeitam proporções nativas sem distorção ou corte indevido de elementos-chave.
- [ ] Textos mantêm contraste e legibilidade sem quebras órfãs de palavras.
- [ ] Áreas de toque em mobile possuem no mínimo `44 x 44px`.

### 3.3. Conformidade com Content Truth Layer
- [ ] Nenhuma especificação técnica sem status `VALIDATED` é exibida como número definitivo.
- [ ] Imagens conceituais/geradas estão claramente rotuladas como `VISUALIZAÇÃO DE APLICAÇÃO`.
- [ ] Logotipo oficial da Replasticando está íntegro e sem distorções.
- [ ] Rodapé contém o crédito institucional: `Desenvolvido por AR Mídias Integradas`.

### 3.4. Formulários & Estados
- [ ] Formulários preservam campos preenchidos ao avançar/voltar passos.
- [ ] Estados de carregamento e envio informam a condição real (sem simulação de falso sucesso quando não há backend conectado).

---

## 4. Formato de Relatório de Entrega

Todo fechamento de etapa deve reportar:
- **IMPLEMENTED**: Funcionalidades e componentes efetivamente construídos.
- **TESTED**: Testes automatizados executados e taxa de aprovação.
- **VISUALLY VERIFIED**: Comparações visuais e capturas realizadas.
- **REMAINING**: Itens pendentes para as próximas fases.
- **BLOCKED**: Impedimentos técnicos ou dependências não resolvidas.
- **CONTENT REQUIRING VALIDATION**: Dados ou afirmações sob revisão do cliente.
