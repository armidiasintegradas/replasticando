# Content Truth Layer — Replasticando

## 1. Princípio Fundamental

Nenhuma informação factual recuperada do Stitch ou inferida por modelos de IA deve ser publicada automaticamente como fato técnico, comercial ou institucional. O website Replasticando opera sob a regra de **Evidência Documentada**.

---

## 2. Taxonomia de Estados de Conteúdo

### 2.1. TechnicalStatus (Status Técnico)
- **`VALIDATED`**: Especificação técnica com laudo, norma ou ficha de engenharia homologada.
- **`PENDING`**: Dado em fase de validação laboratorial ou documental.
- **`UNAVAILABLE`**: Informação ainda não aferida ou inexistente.

> **REGRA ABSOLUTA:** Somente atributos com status `VALIDATED` podem ser renderizados como especificações técnicas factuais para o público. `PENDING` jamais deve ser disfarçado de fato.

### 2.2. ProjectStatus (Status de Projeto / Produto)
- **`PROJETO_REALIZADO`**: Obra, mobiliário ou instalação real entregue e comprovada documentalmente.
- **`PRODUTO_REPLASTICANDO`**: Peça ou placa fabricada e comercializada pela Replasticando.
- **`PILOTO`**: Prototipagem ou lote de teste em ambiente controlado.
- **`ESTUDO_DE_MATERIAL`**: Ensaio de composição, textura ou cor.
- **`VISUALIZACAO_DE_APLICACAO`**: Imagem conceitual ou renderização demonstrando potencial de uso.

### 2.3. ImpactStatus (Status de Impacto e ESG)
- **`VERIFICADO`**: Métrica auditada por terceira parte ou sistema de evidência física.
- **`CALCULADO`**: Estimativa matemática com metodologia e premissas explícitas.
- **`ESTIMADO`**: Projeção de impacto potencial.
- **`EM_VALIDACAO`**: Indicador aguardando certificação ou histórico de pesagem.

> **REGRA ABSOLUTA:** Não utilizar os rótulos `VERIFIED` ou `VERIFICADO` sem trilha comprobatória auditada.

---

## 3. Itens Bloqueados da Camada Pública (Até Validação)

Até que haja validação documental expressa, **NÃO** publicar como fatos definitivos:
- Dimensões nominais, espessuras e tolerâncias milimétricas.
- Densidade aparente, dureza Shore D, taxas de absorção e impermeabilidade.
- Resistência térmica, resistência a intempéries/UV e resistência química.
- Resistência à flexão/tração, módulo de elasticidade e vida útil declarada.
- Frações e composições exatas de polímeros (HDPE / PP / LDPE).
- Parâmetros industriais (temperaturas de fusão, pressões de prensa, tonelagem, avanço CNC, granulometrias).
- Menções a laudos específicos, normas ABNT/NBR ou certificações que não possuam documento correspondente.
- Capacidade produtiva mensal/anual ou dados de bancada laboratorial.
- Portfólio de projetos, clientes corporativos, endereços ou contatos comerciais não homologados.
- Prazos de atendimento ou métricas de compensação de carbono sem memorial de cálculo.

### Tratamento em Interface
Quando um campo for exigido pelo design, utilizar:
- `[DADO TÉCNICO VALIDADO]`
- `[INFORMAÇÃO EM VALIDAÇÃO]`
- `[ESPECIFICAÇÃO OFICIAL A INSERIR]`
- `[LAUDO OFICIAL A INSERIR]`
- **Ou preferencialmente:** omitir/não renderizar o elemento numérico até liberação.

---

## 4. Brand Asset Lock (Proteção da Marca)

A marca oficial Replasticando fornecida pelo cliente é estritamente imutável:
- **Proibido:** Redesenhar, vetorizar por aproximação, recriar traços, aplicar distorções/morph, fragmentar, esticar ou inventar variações cromáticas não homologadas.
- **Permitido:** Escala proporcional, posicionamento estruturado na grade, aplicação sobre fundos de alto contraste e espaçamento de segurança.
- **Tokens do Stitch:** Cores e fontes observadas nos mockups do Stitch representam *tokens de implementação do website aprovado*, e não o manual definitivo da marca corporativa.

---

## 5. Regras para Tratamento de Imagens e Mídia

- Textos descritivos encontrados no atributo `src` das tags `<img>` (prompts de geração) **NÃO** são URLs válidas nem recursos de produção.
- Toda mídia deve passar pela camada de **Asset Mapping**:
  - `OFFICIAL`: Ativo vetorial ou fotográfico fornecido diretamente pelo cliente.
  - `REAL`: Registro fotográfico ou documento real e validado.
  - `CONCEPTUAL`: Visualização gerada/render que deve receber o selo visual explicativo `VISUALIZAÇÃO DE APLICAÇÃO`.
  - `PENDING`: Ativo previsto no design mas ainda não disponível.
