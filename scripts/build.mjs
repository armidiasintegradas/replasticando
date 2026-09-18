/**
 * REPLASTICANDO — Zero-Dependency Static Build Script
 * 
 * Assembles canonical templates into production static HTML pages:
 * - index.html (HOME)
 * - placa.html (PLACA)
 * - copies styles/ and lib/
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('[BUILD] Iniciando compilação do piloto Replasticando...');

// 1. Ensure target dirs exist
mkdirSync(resolve(rootDir, 'styles'), { recursive: true });
mkdirSync(resolve(rootDir, 'lib'), { recursive: true });

// 2. Copy static styles and scripts
cpSync(resolve(rootDir, 'src/styles'), resolve(rootDir, 'styles'), { recursive: true });
cpSync(resolve(rootDir, 'src/lib'), resolve(rootDir, 'lib'), { recursive: true });
console.log('[BUILD] Assets CSS e JS copiados para /styles e /lib.');

// 3. Read layout templates
const shellTemplate = readFileSync(resolve(rootDir, 'src/layout/shell.html'), 'utf-8');
const headerTemplate = readFileSync(resolve(rootDir, 'src/layout/header.html'), 'utf-8');
const menuTemplate = readFileSync(resolve(rootDir, 'src/layout/menu.html'), 'utf-8');
const footerTemplate = readFileSync(resolve(rootDir, 'src/layout/footer.html'), 'utf-8');

// 4. Pages configuration
const pages = [
  {
    name: 'HOME',
    source: 'src/pages/home.html',
    dest: 'index.html',
    title: 'Replasticando — Transformamos Plástico em Matéria',
    description: 'Transformamos plásticos pós-consumo recuperados em uma nova matéria-prima de rigor mineral para arquitetura de ponta e design autoral.',
    ctaText: 'Solicitar Orçamento →',
    ctaHref: '#conversao',
    activeKey: 'HOME'
  },
  {
    name: 'PLACA',
    source: 'src/pages/placa.html',
    dest: 'placa.html',
    title: 'A Placa — Especificação & Produto // Replasticando',
    description: 'Superfície sólida, monolítica e usinável concebida a partir de polímeros pós-consumo para a arquitetura contemporânea e marcenaria de precisão.',
    ctaText: 'Solicitar Amostra',
    ctaHref: '#amostras',
    activeKey: 'PLACA'
  },
  {
    name: 'PROCESSO',
    source: 'src/pages/processo.html',
    dest: 'processo.html',
    title: 'Processo — Replasticando // Da Forma Descartada à Nova Matéria',
    description: 'Transformamos plástico descartado em uma nova superfície de alta densidade para arquitetura, design e novos produtos. Sem verniz ideológico, com rigor industrial.',
    ctaText: 'Falar com a Fábrica →',
    ctaHref: 'contato.html',
    activeKey: 'PROCESSO'
  },
  {
    name: 'POSSIBILIDADES',
    source: 'src/pages/possibilidades.html',
    dest: 'possibilidades.html',
    title: 'Possibilidades — Replasticando // Aplicações da Matéria',
    description: 'Uma placa maciça que entra em arquitetura, interiores, mobiliário autoral, retail, design colecionável e novas tipologias estruturais.',
    ctaText: 'Especificar Matéria →',
    ctaHref: '#especificar',
    activeKey: 'POSSIBILIDADES'
  },
  {
    name: 'PROFISSIONAIS',
    source: 'src/pages/profissionais.html',
    dest: 'profissionais.html',
    title: 'Profissionais — Replasticando // Hub de Especificação e Engenharia',
    description: 'Placas maciças, cotas de amostras calibradas, dados técnicos de densidade e suporte à engenharia de transformadores para arquitetos e designers.',
    ctaText: 'Pedir Amostra Física →',
    ctaHref: '#amostras',
    activeKey: 'PROFISSIONAIS'
  },
  {
    name: 'DESIGN',
    source: 'src/pages/design.html',
    dest: 'design.html',
    title: 'Design — Replasticando // Mobiliário Autoral & Objetos de Coleção',
    description: 'Objetos e mobiliário de escala arquitetônica desenvolvidos diretamente a partir de chapa polimérica de alta densidade Replasticando.',
    ctaText: 'Catálogo Autoral →',
    ctaHref: '#catalogo',
    activeKey: 'DESIGN'
  },
  {
    name: 'INSTITUICOES',
    source: 'src/pages/instituicoes.html',
    dest: 'instituicoes.html',
    title: 'Instituições — Replasticando // Mobiliário Que Também Educa',
    description: 'Espaços educacionais, culturais e públicos transformados por superfícies monolíticas de alta densidade feitas a partir de resíduo pós-consumo.',
    ctaText: 'Atendimento Institucional →',
    ctaHref: '#contato-gestor',
    activeKey: 'INSTITUICOES'
  },
  {
    name: 'CIRCULARIDADE',
    source: 'src/pages/circularidade.html',
    dest: 'circularidade.html',
    title: 'Circularidade — Replasticando // O Resíduo Daqui Volta Para Cá',
    description: 'Conectamos cadeia de resíduos de reciclagem, transformação, produtos e territórios em projetos estruturados de economia circular.',
    ctaText: 'Iniciar um Ciclo →',
    ctaHref: '#diagnostico-form',
    activeKey: 'CIRCULARIDADE'
  }
];

// 5. Render pages
for (const page of pages) {
  const content = readFileSync(resolve(rootDir, page.source), 'utf-8');
  
  // Render header with active states
  const renderedHeader = headerTemplate
    .replace('{{NAV_PLACA_ACTIVE}}', page.activeKey === 'PLACA' ? 'active' : '')
    .replace('{{NAV_PROCESSO_ACTIVE}}', page.activeKey === 'PROCESSO' ? 'active' : '')
    .replace('{{NAV_POSSIBILIDADES_ACTIVE}}', page.activeKey === 'POSSIBILIDADES' ? 'active' : '')
    .replace('{{NAV_PROFISSIONAIS_ACTIVE}}', page.activeKey === 'PROFISSIONAIS' ? 'active' : '')
    .replace('{{NAV_DESIGN_ACTIVE}}', page.activeKey === 'DESIGN' ? 'active' : '')
    .replace('{{NAV_INSTITUICOES_ACTIVE}}', page.activeKey === 'INSTITUICOES' ? 'active' : '')
    .replace('{{NAV_CIRCULARIDADE_ACTIVE}}', page.activeKey === 'CIRCULARIDADE' ? 'active' : '')
    .replace('{{CTA_TEXT}}', page.ctaText)
    .replace('{{CTA_HREF}}', page.ctaHref);

  // Render menu with active states
  const renderedMenu = menuTemplate
    .replace('{{MENU_PLACA_ACTIVE}}', page.activeKey === 'PLACA' ? 'active' : '')
    .replace('{{MENU_PROCESSO_ACTIVE}}', page.activeKey === 'PROCESSO' ? 'active' : '')
    .replace('{{MENU_POSSIBILIDADES_ACTIVE}}', page.activeKey === 'POSSIBILIDADES' ? 'active' : '')
    .replace('{{MENU_PROFISSIONAIS_ACTIVE}}', page.activeKey === 'PROFISSIONAIS' ? 'active' : '')
    .replace('{{MENU_DESIGN_ACTIVE}}', page.activeKey === 'DESIGN' ? 'active' : '')
    .replace('{{MENU_INSTITUICOES_ACTIVE}}', page.activeKey === 'INSTITUICOES' ? 'active' : '')
    .replace('{{MENU_CIRCULARIDADE_ACTIVE}}', page.activeKey === 'CIRCULARIDADE' ? 'active' : '');

  // Render full page shell
  const renderedHtml = shellTemplate
    .replace('{{PAGE_TITLE}}', page.title)
    .replace('{{PAGE_DESCRIPTION}}', page.description)
    .replace('{{HEADER}}', renderedHeader)
    .replace('{{CONTENT}}', content)
    .replace('{{FOOTER}}', footerTemplate)
    .replace('{{MENU}}', renderedMenu);

  const destPath = resolve(rootDir, page.dest);
  writeFileSync(destPath, renderedHtml, 'utf-8');
  console.log(`[BUILD] Página renderizada com sucesso: ${page.dest}`);
}

console.log('[BUILD] Build concluído com sucesso!');

