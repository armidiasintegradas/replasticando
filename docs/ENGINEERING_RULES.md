# Engineering & Architecture Rules — Replasticando

## 1. Diretriz Soberana de Design

> **DESIGN IS APPROVED. BUILD IT. DO NOT REDESIGN IT.**

As telas recuperadas do Stitch representam o **Visual Source of Truth**.
A engenharia de frontend deve preservar rigorosamente:
- Hierarquia editorial e composição espacial.
- Escala e proporções de blocos e elementos.
- Ritmo de leitura e densidade de espaços negativos.
- Densidade visual industrial e editorial (sem estética corporativa genérica).
- Contraste e relação intrínseca entre fotografia de textura/material e tipografia.

### Vedações Estéticas
- **Não** converter em template SaaS convencional.
- **Não** criar estética de landing page genérica ou "eco-friendly" caricata (verde clichê, folhas, glassmorphism suave).
- **Não** transformar a interface em uma coleção de cards arredondados flutuantes com sombras suaves.
- **Não** inserir microinterações puramente decorativas que comprometam a sobriedade industrial.

---

## 2. Estrutura Canônica de Componentes

Componentes centrais devem ser reutilizáveis e únicos, eliminando divergências entre páginas:
1. **Layout & Shell**:
   - `Header`: Cabeçalho unificado com marca imutável, navegação desktop e acionamento real do menu mobile.
   - `FullscreenMenu`: Menu completo em overlay tela cheia com navegação capitular organizada por eixos (Matéria, Soluções, Replasticando).
   - `Footer`: Rodapé institucional canônico com créditos obrigatórios `Desenvolvido por AR Mídias Integradas` e copyright dinâmico.
   - `Container`, `Section`, `SectionLabel`, `EditorialHeadline`.
2. **Ações & Status**:
   - `PrimaryCTA`, `SecondaryCTA`.
   - `StatusBadge` (VALIDATED, PENDING, VISUALIZAÇÃO DE APLICAÇÃO).
   - `TechnicalStatus`, `ApplicationStatus`.
3. **Mídia & Texturas**:
   - `MediaBlock`, `ResponsiveImage` (com srcset, lazy loading e aspect-ratio sem CLS).
   - `DarkManifesto`.
4. **Catálogo & Impacto**:
   - `MaterialCard`, `MaterialLibrary`.
   - `ProjectCard`, `EvidenceBlock`, `ImpactIndicator`.
   - `TechnicalData` (respeitando Content Truth Layer).
5. **Formulários & Roteamento**:
   - `ContactRouter`: Roteador contextual de intenções:
     - `COMPRAR_PLACAS`
     - `SOLICITAR_AMOSTRA`
     - `PROFISSIONAL_ESPECIFICADOR`
     - `INSTITUICAO`
     - `CIRCULARIDADE`
     - `DESENVOLVER_PROJETO`
   - `FormField`, `FormStep`, `FormStatus` com preservação de dados e camada de transporte desacoplada.

---

## 3. Especificação do Fullscreen Menu

- **Estrutura de Navegação:**
  - **MATÉRIA**: Placa (`/placa`), Processo (`/processo`), Possibilidades (`/possibilidades`), Profissionais (`/profissionais`)
  - **SOLUÇÕES**: Design (`/design`), Instituições (`/instituicoes`), Circularidade (`/circularidade`)
  - **REPLASTICANDO**: Projetos (`/projetos`), Impacto (`/impacto`), Katchê! (`/katche`), Sobre (`/sobre`), Branding (`/branding`), Contato (`/contato`)
- **Acessibilidade & Comportamento:**
  - O botão de abertura `[///]` **não** pode ser decorativo; deve possuir handler real.
  - Tecla `Escape` fecha o menu imediatamente.
  - *Focus Trap* ativo durante exibição e restauração de foco ao fechar.
  - *Body Scroll Lock* sem pulo de layout (compensação de scrollbar).
  - Atributos ARIA: `aria-expanded`, `aria-controls`, `aria-modal="true"`.
  - Respeito integral a `prefers-reduced-motion`.

---

## 4. Motion System

O movimento reflete o ciclo físico de transformação do polímero:
$$\text{FRAGMENTAR} \longrightarrow \text{AGRUPAR} \longrightarrow \text{COMPRIMIR} \longrightarrow \text{TRANSFORMAR} \longrightarrow \text{REVELAR}$$

- **Prioridade 0 (P0)**: Navegação, fullscreen menu, seleção de materiais, expansão de formulários, acessibilidade.
- **Scroll Nativo**: Jamais utilizar *scroll hijacking* ou bibliotecas de inércia artificial que degradem a precisão da rolagem nativa.
- **Integridade de Marca**: Sob hipótese alguma animar o logotipo deformando, esticando ou distorcendo seus vetores.

---

## 5. Engenharia de Performance e Código

- **Zero Tailwind CDN em Produção**: Estilos pré-compilados ou Vanilla CSS otimizado para evitar requisições síncronas de runtime.
- **Fontes**: Pré-carregamento controlado e fontes hospedadas com display `swap`.
- **Prevenção de CLS**: Toda imagem e bloco de mídia deve declarar dimensões explícitas ou classes de proporção (`aspect-ratio`).
- **Acessibilidade (a11y)**:
  - Hierarquia estrita de títulos (`h1` único por rota, seguido de `h2`, `h3`).
  - Contraste WCAG AA mínimo em todos os pares tipográficos.
  - Estados de foco visíveis e navegabilidade 100% via teclado.
