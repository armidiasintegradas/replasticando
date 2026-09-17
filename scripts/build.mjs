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
    placaActive: ''
  },
  {
    name: 'PLACA',
    source: 'src/pages/placa.html',
    dest: 'placa.html',
    title: 'A Placa — Especificação & Produto // Replasticando',
    description: 'Superfície sólida, monolítica e usinável concebida a partir de polímeros pós-consumo para a arquitetura contemporânea e marcenaria de precisão.',
    ctaText: 'Solicitar Amostra',
    ctaHref: '#amostras',
    placaActive: 'active'
  }
];

// 5. Render pages
for (const page of pages) {
  const content = readFileSync(resolve(rootDir, page.source), 'utf-8');
  
  // Render header with active states
  const renderedHeader = headerTemplate
    .replace('{{NAV_PLACA_ACTIVE}}', page.placaActive)
    .replace('{{CTA_TEXT}}', page.ctaText)
    .replace('{{CTA_HREF}}', page.ctaHref);

  // Render full page shell
  const renderedHtml = shellTemplate
    .replace('{{PAGE_TITLE}}', page.title)
    .replace('{{PAGE_DESCRIPTION}}', page.description)
    .replace('{{HEADER}}', renderedHeader)
    .replace('{{CONTENT}}', content)
    .replace('{{FOOTER}}', footerTemplate)
    .replace('{{MENU}}', menuTemplate);

  const destPath = resolve(rootDir, page.dest);
  writeFileSync(destPath, renderedHtml, 'utf-8');
  console.log(`[BUILD] Página renderizada com sucesso: ${page.dest}`);
}

console.log('[BUILD] Build concluído com sucesso!');
