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

const PRODUCTION_PAGES = [
  'index.html',
  'placa.html',
  'processo.html',
  'possibilidades.html',
  'profissionais.html',
  'design.html',
  'instituicoes.html',
  'circularidade.html',
  'projetos.html',
  'impacto.html',
  'katche.html'
];

test('1. Reference Immutability & All 11 Frozen Canonical SHA-256 Hashes', (t) => {
  const references = [
    {
      file: 'references/stitch-originals/home.html',
      expectedHash: '336643bac399437b8968be90ff04333d857f24992db5e6c4ae295187234a16c4'
    },
    {
      file: 'references/stitch-originals/placa.html',
      expectedHash: 'e89317ed561c9ad7cbc29fdf49e4173e856dbceaea598e951a898c1afba16fc5'
    },
    {
      file: 'references/stitch-originals/processo.html',
      expectedHash: 'c9e64b4ba97fe038fe512b7c0a98f48cae0c78548e925a409659d7d0d3a3d8f3'
    },
    {
      file: 'references/stitch-originals/possibilidades.html',
      expectedHash: '817e6e39aa9d62086f8d396c3df23a7d8883813cfe71140cef07847ae883b158'
    },
    {
      file: 'references/stitch-originals/profissionais.html',
      expectedHash: '2eadb91358e0dda892271daa55dfeeef46f0ffada8cdac5c5175e3c8eba1ba01'
    },
    {
      file: 'references/stitch-originals/design.html',
      expectedHash: '8304d6bd6e64dc1832170fd1838d163ffc2f5bfce0ef71e206bc392445ae75a9'
    },
    {
      file: 'references/stitch-originals/instituicoes.html',
      expectedHash: '68b9453727b4010c74a2e97df15d7d5a765c442f42edbd1c4be7c27b0a45ad7e'
    },
    {
      file: 'references/stitch-originals/circularidade.html',
      expectedHash: '4dc837cc8c7a08b598856ec7ecf3a6dff4a4573f96ce0f0ddc01a059c484add5'
    },
    {
      file: 'references/stitch-originals/projetos.html',
      expectedHash: '4cb3c46d6e3af91867e94562f3a2da585e64a677effa7302d4871c54b022cc0e'
    },
    {
      file: 'references/stitch-originals/impacto.html',
      expectedHash: '4ad6f7cd41abbb6d77fc4e7eeb73456ebac075a614a01450857b74dc7c9b3867'
    },
    {
      file: 'references/stitch-originals/katche.html',
      expectedHash: '4737513acf411fe9a088ad2fdd1b5b775d2c040e5374620e8d5fb22917966903'
    }
  ];

  for (const ref of references) {
    const fullPath = resolve(rootDir, ref.file);
    assert.ok(existsSync(fullPath), `Arquivo canônico congelado deve existir: ${ref.file}`);
    const actualHash = getSha256(fullPath);
    assert.equal(
      actualHash,
      ref.expectedHash,
      `O hash SHA-256 da referência ${ref.file} não pode ser alterado! Esperado: ${ref.expectedHash}, Obtido: ${actualHash}`
    );
  }
});

test('2. Required Production Files & Batch 01, 02 & 03 Pages', (t) => {
  const files = [
    'index.html',
    'placa.html',
    'processo.html',
    'possibilidades.html',
    'profissionais.html',
    'design.html',
    'instituicoes.html',
    'circularidade.html',
    'projetos.html',
    'impacto.html',
    'katche.html',
    'src/pages/home.html',
    'src/pages/placa.html',
    'src/pages/processo.html',
    'src/pages/possibilidades.html',
    'src/pages/profissionais.html',
    'src/pages/design.html',
    'src/pages/instituicoes.html',
    'src/pages/circularidade.html',
    'src/pages/projetos.html',
    'src/pages/impacto.html',
    'src/pages/katche.html',
    'src/layout/shell.html',
    'src/layout/header.html',
    'src/layout/menu.html',
    'src/layout/footer.html',
    'src/styles/tokens.css',
    'src/styles/base.css',
    'src/styles/components.css',
    'src/styles/main.css',
    'src/lib/menu.js',
    'scripts/build.mjs',
    'docs/CONTENT_TRUTH.md',
    'docs/QA.md'
  ];

  for (const f of files) {
    const fullPath = resolve(rootDir, f);
    assert.ok(existsSync(fullPath), `Arquivo obrigatório deve existir: ${f}`);
  }
});

test('3. Semantic Heading Hierarchy & Single H1 Invariant (All 11 Pages)', (t) => {
  for (const p of PRODUCTION_PAGES) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    assert.equal(h1Matches.length, 1, `A página ${p} deve possuir exatamente um único elemento <h1>`);
  }
});

test('4. Canonical Header, Desktop Nav & Fullscreen Menu Structure (All 11 Pages)', (t) => {
  for (const p of PRODUCTION_PAGES) {
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

test('5. Canonical Footer & Attribution Invariants (All 11 Pages)', (t) => {
  for (const p of PRODUCTION_PAGES) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');
    assert.ok(html.includes('class="site-footer"'), `${p} deve conter o rodapé canônico .site-footer`);
    assert.ok(
      html.includes('DESENVOLVIDO POR AR MÍDIAS INTEGRADAS'),
      `${p} deve exibir crédito obrigatório "DESENVOLVIDO POR AR MÍDIAS INTEGRADAS"`
    );
    assert.ok(html.includes('REPLASTICANDO. TODOS OS DIREITOS RESERVADOS.'), `${p} deve conter copyright da Replasticando`);
  }
});

test('6. Image Source Safety & Zero Broken Prompts (All 11 Pages)', (t) => {
  for (const p of PRODUCTION_PAGES) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');
    
    // Ensure no <img src="Studio product photograph..."> prompts exist in production markup
    const promptImgMatch = html.match(/<img[^>]+src=["'](Studio product|Architectural material|Extreme macro|High-end|Editorial|Minimalist|Documentary)/i);
    assert.equal(
      promptImgMatch,
      null,
      `${p} não deve conter prompts do Stitch como atributos <img src="..."> brutos`
    );

    // Ensure status tags are present for application visualisations
    assert.ok(
      html.includes('[ VISUALIZAÇÃO DE APLICAÇÃO ]') ||
      html.includes('[ ESTUDO DE MATERIAL ]') ||
      html.includes('[ INSTRUMENTAL DE ATELIÊ ]') ||
      html.includes('[ PROTÓTIPO AUTORAL ]') ||
      html.includes('VISUALIZAÇÃO DE APLICAÇÃO'),
      `${p} deve conter a etiqueta de conformidade de mídia técnica`
    );
  }
});

test('7. Content Truth & Unvalidated Claims Guardrails (All 11 Pages)', (t) => {
  for (const p of PRODUCTION_PAGES) {
    const html = readFileSync(resolve(rootDir, p), 'utf-8');
    
    // Must contain explicit status badges for unvalidated specs
    assert.ok(
      html.includes('[ INFORMAÇÃO EM VALIDAÇÃO ]') ||
      html.includes('[ EM VALIDAÇÃO ]') ||
      html.includes('[ EM VALIDAÇÃO TÉCNICA ]') ||
      html.includes('[ LAUDO OFICIAL A INSERIR ]') ||
      html.includes('[ DADO TÉCNICO VALIDADO ]') ||
      html.includes('[ PROTÓTIPO AUTORAL ]') ||
      html.includes('[ PROTÓTIPOS EM VALIDAÇÃO ]') ||
      html.includes('[EM HOMOLOGAÇÃO]'),
      `${p} deve proteger especificações técnicas com etiquetas Content Truth`
    );
  }
});

test('8. Accessibility & Motion System Guardrails', (t) => {
  const baseCss = readFileSync(resolve(rootDir, 'styles/base.css'), 'utf-8');
  assert.ok(
    baseCss.includes('@media (prefers-reduced-motion: reduce)'),
    'base.css deve conter @media (prefers-reduced-motion: reduce)'
  );
  assert.ok(
    baseCss.includes(':focus-visible'),
    'base.css deve definir regras para :focus-visible'
  );

  const compCss = readFileSync(resolve(rootDir, 'styles/components.css'), 'utf-8');
  assert.ok(compCss.includes('motion-fragmentar'), 'components.css deve conter animação motion-fragmentar');
  assert.ok(compCss.includes('motion-agrupar'), 'components.css deve conter animação motion-agrupar');
  assert.ok(compCss.includes('motion-comprimir'), 'components.css deve conter animação motion-comprimir');
  assert.ok(compCss.includes('motion-transformar'), 'components.css deve conter animação motion-transformar');
  assert.ok(compCss.includes('motion-revelar'), 'components.css deve conter animação motion-revelar');

  const menuJs = readFileSync(resolve(rootDir, 'lib/menu.js'), 'utf-8');
  assert.ok(menuJs.includes('Escape'), 'menu.js deve escutar a tecla Escape');
  assert.ok(menuJs.includes('aria-expanded'), 'menu.js deve sincronizar aria-expanded');
  assert.ok(menuJs.includes('aria-hidden'), 'menu.js deve sincronizar aria-hidden');
  assert.ok(menuJs.includes('menu-open'), 'menu.js deve aplicar classe menu-open ao body');
});

test('9. Active Route Synchronization (Batch 02 Routes)', (t) => {
  const designHtml = readFileSync(resolve(rootDir, 'design.html'), 'utf-8');
  assert.ok(designHtml.includes('class="nav-link active"'), 'design.html deve ter nav-link ativo');
  assert.ok(designHtml.includes('class="menu-nav-link active"'), 'design.html deve ter menu-nav-link ativo');

  const instHtml = readFileSync(resolve(rootDir, 'instituicoes.html'), 'utf-8');
  assert.ok(instHtml.includes('class="nav-link active"'), 'instituicoes.html deve ter nav-link ativo');
  assert.ok(instHtml.includes('class="menu-nav-link active"'), 'instituicoes.html deve ter menu-nav-link ativo');

  const circHtml = readFileSync(resolve(rootDir, 'circularidade.html'), 'utf-8');
  assert.ok(circHtml.includes('class="nav-link active"'), 'circularidade.html deve ter nav-link ativo');
  assert.ok(circHtml.includes('class="menu-nav-link active"'), 'circularidade.html deve ter menu-nav-link ativo');
});

test('10. Conversion Flows & Progressive Disclosure Invariants (Batch 02)', (t) => {
  const designHtml = readFileSync(resolve(rootDir, 'design.html'), 'utf-8');
  assert.ok(designHtml.includes('href="#catalogo"'), 'design.html deve direcionar CTA para catálogo autoral');
  assert.ok(designHtml.includes('contato.html?produto=banco'), 'design.html deve possuir fluxo de projeto por peça');

  const instHtml = readFileSync(resolve(rootDir, 'instituicoes.html'), 'utf-8');
  assert.ok(instHtml.includes('id="contato-gestor"'), 'instituicoes.html deve ter seção de contato gestor');
  assert.ok(instHtml.includes('toggle-perfil-inst'), 'instituicoes.html deve ter seleção de perfil institucional');

  const circHtml = readFileSync(resolve(rootDir, 'circularidade.html'), 'utf-8');
  assert.ok(circHtml.includes('id="diagnostico-form"'), 'circularidade.html deve ter formulário de diagnóstico');
  assert.ok(circHtml.includes('toggle-perfil-circ'), 'circularidade.html deve ter seleção de perfil territorial');
});

test('11. Active Route Synchronization (Batch 03 Routes — Projetos, Impacto, Katchê!)', (t) => {
  const projHtml = readFileSync(resolve(rootDir, 'projetos.html'), 'utf-8');
  assert.ok(projHtml.includes('class="nav-link active"'), 'projetos.html deve ter nav-link ativo no header');
  assert.ok(projHtml.includes('class="menu-nav-link active"'), 'projetos.html deve ter menu-nav-link ativo no menu');

  const impHtml = readFileSync(resolve(rootDir, 'impacto.html'), 'utf-8');
  assert.ok(impHtml.includes('class="nav-link active"'), 'impacto.html deve ter nav-link ativo no header');
  assert.ok(impHtml.includes('class="menu-nav-link active"'), 'impacto.html deve ter menu-nav-link ativo no menu');

  const katHtml = readFileSync(resolve(rootDir, 'katche.html'), 'utf-8');
  assert.ok(katHtml.includes('class="nav-link active"'), 'katche.html deve ter nav-link ativo no header');
  assert.ok(katHtml.includes('class="menu-nav-link active"'), 'katche.html deve ter menu-nav-link ativo no menu');
});

test('12. Batch 03 Content Truth & Editorial Transparency Invariants', (t) => {
  const projHtml = readFileSync(resolve(rootDir, 'projetos.html'), 'utf-8');
  assert.ok(projHtml.includes('A Matéria em Uso.'), 'projetos.html deve apresentar narrativa central "A Matéria em Uso."');
  assert.ok(projHtml.includes('[ VISUALIZAÇÃO DE APLICAÇÃO ]'), 'projetos.html deve rotular visualizações com tag técnica');
  assert.ok(projHtml.includes('[ CÁLCULO ESTIMADO ]'), 'projetos.html deve identificar peso de plástico como estimado');

  const impHtml = readFileSync(resolve(rootDir, 'impacto.html'), 'utf-8');
  assert.ok(impHtml.includes('Impacto Precisa de Evidência') || impHtml.includes('Impacto Precisa<br> de Evidência.'), 'impacto.html deve afirmar princípio de evidência');
  assert.ok(impHtml.includes('PRIMEIRO, FAZER') || impHtml.includes('Primeiro, Fazer'), 'impacto.html deve incluir regra de ouro metodológica');
  assert.ok(impHtml.includes('[ INFORMAÇÃO EM VALIDAÇÃO ]'), 'impacto.html deve classificar status de dados não certificados');

  const katHtml = readFileSync(resolve(rootDir, 'katche.html'), 'utf-8');
  assert.ok(katHtml.includes('Matéria<br> + Cultura<br> + Design.') || katHtml.includes('MATÉRIA + CULTURA + DESIGN'), 'katche.html deve apresentar narrativa Matéria + Cultura + Design');
  assert.ok(katHtml.includes('[ PROTÓTIPO AUTORAL ]'), 'katche.html deve rotular objetos de design como protótipo autoral');
});
