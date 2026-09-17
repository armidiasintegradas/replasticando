# Implementation Master Plan — Replasticando

## 1. Visão Geral do Programa

O projeto Replasticando consiste na consolidação e transposição de 14 interfaces aprovadas no Stitch para uma base de código unificada de produção, orientada por evidências e de alta fidelidade visual.

---

## 2. Fases de Execução

### Fase 0 — Workspace & Ingestão (ATUAL)
- [x] Criação do workspace isolado em `~/Desktop/replasticando`.
- [x] Estruturação dos repositórios de referência (`/references/stitch-originals/`).
- [x] Documentação das regras de engenharia, verdade de conteúdo e QA.
- [x] Preparação dos diretórios tipados de assets (`official`, `real`, `conceptual`, `pending`).
- [ ] Ingestão dos 14 arquivos-fonte originais do Stitch.

### Fase 1 — Fundação & Shell Canônico (Próxima etapa após ingestão)
- [ ] **Design Tokens**: Extração e normalização dos tokens de implementação (cores, tipografia, grid, espaçamentos).
- [ ] **Global Shell**: Layout base com containers responsivos.
- [ ] **Header Canônico**: Logotipo imutável, menu desktop e acionador mobile `[///]`.
- [ ] **Fullscreen Menu**: Menu tela cheia acessível com as 3 colunas temáticas e atalhos completos.
- [ ] **Footer Canônico**: Rodapé institucional unificado com crédito AR Mídias Integradas e copyright dinâmico.
- [ ] **Content Truth & Asset Mapping**: Mapeamento estruturado de conteúdo e mídias.

### Fase 2 — Pilotos de Rota: HOME & PLACA
- [ ] Implementação de **HOME** com fidelidade visual ao Stitch original.
- [ ] Implementação de **PLACA** com componentes de catálogo, especificações filtradas e status de conteúdo.
- [ ] Validação responsiva (Mobile 375px, Tablet 768px, Desktop 1280px/1440px).
- [ ] Portão de QA: Comparação visual, auditoria de código e testes automatizados.

### Fase 3 — Propagação para as 12 Rotas Restantes
> **Portão Obrigatório:** Somente iniciada após aprovação formal da Fase 2.
1. `/possibilidades`
2. `/profissionais`
3. `/design`
4. `/instituicoes`
5. `/circularidade`
6. `/processo`
7. `/projetos`
8. `/impacto`
9. `/katche`
10. `/sobre`
11. `/branding`
12. `/contato`

### Fase 4 — Validação Final & Entrega
- Bateria de testes automatizados de paridade e acessibilidade.
- Auditoria de performance (LCP, CLS, FID/INP).
- Relatório final de conformidade para publicação.
