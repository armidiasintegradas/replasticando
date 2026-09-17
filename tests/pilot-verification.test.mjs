import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

function getSha256(filePath) {
  const fileBuffer = readFileSync(filePath);
  return createHash('sha256').update(fileBuffer).digest('hex').toLowerCase();
}

test('1. Reference Immutability & SHA-256 Gate', (t) => {
  const homeRefPath = resolve(rootDir, 'references/stitch-originals/home.html');
  const placaRefPath = resolve(rootDir, 'references/stitch-originals/placa.html');

  assert.ok(existsSync(homeRefPath), 'references/stitch-originals/home.html deve existir');
  assert.ok(existsSync(placaRefPath), 'references/stitch-originals/placa.html deve existir');

  const homeHash = getSha256(homeRefPath);
  const placaHash = getSha256(placaRefPath);

  assert.equal(
    homeHash,
    '336643bac399437b8968be90ff04333d857f24992db5e6c4ae295187234a16c4',
    'references/stitch-originals/home.html deve manter hash imutável congelado'
  );

  assert.equal(
    placaHash,
    'e89317ed561c9ad7cbc29fdf49e4173e856dbceaea598e951a898c1afba16fc5',
    'references/stitch-originals/placa.html deve manter hash imutável congelado'
  );
});

test('2. Required Production Files & Artifacts', (t) => {
  const files = [
    'index.html',
    'placa.html',
    'styles/tokens.css',
    'styles/base.css',
    'styles/components.css',
    'styles/main.css',
    'lib/menu.js',
    'docs/CONTENT_TRUTH.md',
    'docs/ENGINEERING_RULES.md',
    'docs/IMPLEMENTATION_MASTER.md',
    'docs/QA.md'
  ];

  for (const f of files) {
    const fullPath = resolve(rootDir, f);
    assert.ok(existsSync(fullPath), `Arquivo obrigatório deve existir: ${f}`);
  }
});

test('3. Semantic Heading Hierarchy & Single H1 Invariant', (t) => {
  const pages = ['index.html', 'placa.html'];

  for (const p of pages) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    assert.equal(h1Matches.length, 1, `A página ${p} deve possuir exatamente um único elemento <h1>`);
  }
});

test('4. Canonical Header and Fullscreen Menu Structure', (t) => {
  const pages = ['index.html', 'placa.html'];

  for (const p of pages) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');

    // Header checks
    assert.ok(html.includes('class="site-header"'), `${p} deve possuir o cabeçalho canônico .site-header`);
    assert.ok(html.includes('data-menu-trigger'), `${p} deve possuir botão acionador com data-menu-trigger`);
    assert.ok(html.includes('[///]'), `${p} deve exibir o elemento de menu [///]`);

    // Fullscreen menu checks
    assert.ok(html.includes('id="fullscreen-menu"'), `${p} deve incluir o container #fullscreen-menu`);
    assert.ok(html.includes('role="dialog"'), `${p} menu deve possuir role="dialog"`);
    assert.ok(html.includes('aria-modal="true"'), `${p} menu deve possuir aria-modal="true"`);
    assert.ok(html.includes('data-menu-close'), `${p} menu deve conter botão fechar data-menu-close`);

    // 3 Thematic Groups
    assert.ok(html.includes('01 // MATÉRIA'), `${p} menu deve conter grupo MATÉRIA`);
    assert.ok(html.includes('02 // SOLUÇÕES'), `${p} menu deve conter grupo SOLUÇÕES`);
    assert.ok(html.includes('03 // REPLASTICANDO'), `${p} menu deve conter grupo REPLASTICANDO`);

    // Required routes in menu
    const requiredRoutes = [
      'href="placa.html"',
      'href="processo.html"',
      'href="possibilidades.html"',
      'href="profissionais.html"',
      'href="design.html"',
      'href="instituicoes.html"',
      'href="circularidade.html"',
      'href="projetos.html"',
      'href="impacto.html"',
      'href="katche.html"',
      'href="sobre.html"',
      'href="branding.html"',
      'href="contato.html"'
    ];

    for (const route of requiredRoutes) {
      assert.ok(html.includes(route), `${p} menu deve conter link ${route}`);
    }
  }
});

test('5. Canonical Footer & Attribution Invariants', (t) => {
  const pages = ['index.html', 'placa.html'];

  for (const p of pages) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');
    assert.ok(html.includes('class="site-footer"'), `${p} deve conter o rodapé canônico .site-footer`);
    assert.ok(
      html.includes('DESENVOLVIDO POR AR MÍDIAS INTEGRADAS'),
      `${p} deve exibir crédito obrigatório "DESENVOLVIDO POR AR MÍDIAS INTEGRADAS"`
    );
    assert.ok(html.includes('REPLASTICANDO. TODOS OS DIREITOS RESERVADOS.'), `${p} deve conter copyright da Replasticando`);
  }
});

test('6. Image Source Safety & Zero Broken Prompts', (t) => {
  const pages = ['index.html', 'placa.html'];

  for (const p of pages) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');
    
    // Ensure no <img src="Studio product photograph..."> prompts exist in production markup
    const promptImgMatch = html.match(/<img[^>]+src=["'](Studio product|Architectural material|Extreme macro|High-end|Editorial|Minimalist)/i);
    assert.equal(
      promptImgMatch,
      null,
      `${p} não deve conter prompts do Stitch como atributos <img src="..."> brutos`
    );

    // Ensure status tags are present for application visualisations
    assert.ok(
      html.includes('[ VISUALIZAÇÃO DE APLICAÇÃO ]') || html.includes('VISUALIZAÇÃO DE APLICAÇÃO'),
      `${p} deve conter a etiqueta de conformidade [ VISUALIZAÇÃO DE APLICAÇÃO ]`
    );
  }
});

test('7. Content Truth & Unvalidated Claims Guardrails', (t) => {
  const placaHtml = readFileSync(resolve(rootDir, 'placa.html'), 'utf-8');
  
  // Placa must contain explicit status badges for unvalidated specs
  assert.ok(
    placaHtml.includes('[ INFORMAÇÃO EM VALIDAÇÃO ]') || placaHtml.includes('[ EM VALIDAÇÃO ]'),
    'placa.html deve proteger especificações técnicas com [ INFORMAÇÃO EM VALIDAÇÃO ] ou [ EM VALIDAÇÃO ]'
  );

  const homeHtml = readFileSync(resolve(rootDir, 'index.html'), 'utf-8');
  assert.ok(
    homeHtml.includes('[ EM VALIDAÇÃO ]'),
    'index.html deve etiquetar especificações com [ EM VALIDAÇÃO ]'
  );
});

test('8. Accessibility & Reduced Motion Guardrails', (t) => {
  const baseCss = readFileSync(resolve(rootDir, 'styles/base.css'), 'utf-8');
  assert.ok(
    baseCss.includes('@media (prefers-reduced-motion: reduce)'),
    'base.css deve conter @media (prefers-reduced-motion: reduce)'
  );
  assert.ok(
    baseCss.includes(':focus-visible'),
    'base.css deve definir regras para :focus-visible'
  );

  const menuJs = readFileSync(resolve(rootDir, 'lib/menu.js'), 'utf-8');
  assert.ok(menuJs.includes('Escape'), 'menu.js deve escutar a tecla Escape');
  assert.ok(menuJs.includes('aria-expanded'), 'menu.js deve sincronizar aria-expanded');
  assert.ok(menuJs.includes('aria-hidden'), 'menu.js deve sincronizar aria-hidden');
  assert.ok(menuJs.includes('menu-open'), 'menu.js deve aplicar classe menu-open ao body');
});
