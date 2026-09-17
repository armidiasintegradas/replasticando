# REPLASTICANDO — PILOT VISUAL DELTA REPORT
**Audit Stage:** PILOT ACCEPTANCE GATE — PHASE 1  
**Routes Audited:** HOME (`index.html`) & PLACA (`placa.html`)  
**Visual Source of Truth:** `references/stitch-originals/home.html` & `references/stitch-originals/placa.html`  
**Content Truth Authority:** `docs/CONTENT_TRUTH.md`  
**Status:** COMPLETED & VERIFIED

---

## 1. Reference Immutability & Hash Verification

| Reference File | Expected SHA-256 | Actual SHA-256 | Integrity Status |
| :--- | :--- | :--- | :--- |
| `references/stitch-originals/home.html` | `336643bac399437b8968be90ff04333d857f24992db5e6c4ae295187234a16c4` | `336643bac399437b8968be90ff04333d857f24992db5e6c4ae295187234a16c4` | **PASSED (FROZEN)** |
| `references/stitch-originals/placa.html` | `e89317ed561c9ad7cbc29fdf49e4173e856dbceaea598e951a898c1afba16fc5` | `e89317ed561c9ad7cbc29fdf49e4173e856dbceaea598e951a898c1afba16fc5` | **PASSED (FROZEN)** |

---

## 2. Visual & Structural Deltas Audit Matrix

| Viewport | Route | Section | Delta Description | Severity | Correction Applied | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `390×844` | `index.html`<br>`placa.html` | Header (00) & Hero (01) | Brand placeholder width and long kicker pill caused horizontal squeeze and right edge cutoff on 390px mobile viewports. | **P0** | Added mobile-specific compact sizing for brand placeholder (`height: 36px`, `font-size: 0.9375rem`), added `flex-wrap: wrap` and calibrated font size (`0.6875rem`) for `.kicker-pill`. Fixed clipping. | **FIXED** |
| `1440×900`<br>`1024×768` | `index.html`<br>`placa.html` | Hero (01), Manifesto (03), Sec (04) | Clamp-based heading typography diverged from Stitch Tailwind scale: Hero H1 reached 92px instead of 96px (`text-8xl`), Manifesto H2 capped at 56px instead of 72px (`text-7xl`), and Placa Section 2 was oversized. | **P1** | Calibrated `.heading-hero` (60px/72px/96px), `.heading-manifesto` (36px/60px/72px), `.heading-section` (36px/48px), and `.heading-subsection` (30px/36px). | **FIXED** |
| All Viewports | `index.html`<br>`placa.html` | Hero (01) Card & Sec 05 Samples | Standard technical taxonomy chips (`100% POLÍMERO`, `ARQUIVO POLIMÉRICO 001`) used amber warning badges (`badge-pending`), distorting visual intent. | **P1** | Created `.tag-neutral` (`font-mono text-[10px] bg-surface-low border border-surface-container text-graphite`) matching Stitch `px-2 py-0.5 border`. Technical specs remain guarded with amber `[ EM VALIDAÇÃO ]`. | **FIXED** |
| `1024×768` | `index.html`<br>`placa.html` | Header (00) | `.max-w-canvas` increased padding to `2rem` (32px) at 1024px, squeezing desktop nav against brand placeholder and pushing menu trigger into scrollbar boundary. | **P1** | Removed `2rem` override so container padding remains strictly 24px (`px-6` in Stitch), calibrated `.nav-desktop` gap to `1.25rem` at 1024px, added `flex-shrink: 0` to actions. | **FIXED** |
| All Viewports | `index.html`<br>`placa.html` | Header (00) | Header CTA button linked to `contato.html` rather than on-page conversion sections (`#conversao` on Home, `#amostras` on Placa) as designed in Stitch. | **P2** | Parameterized `{{CTA_HREF}}` in `src/layout/header.html` and configured `scripts/build.mjs` with `#conversao` for Home and `#amostras` for Placa. | **FIXED** |
| All Viewports | `index.html`<br>`placa.html` | Header (00) & Footer | Official corporate brand vector/logo absent in `assets/official/`. | **P1** | Maintained austere technical placeholder `REPLASTICANDO [BRAND PENDING]` (height 40px, matching `h-10`). No unapproved logo generation or approximation. | **BLOCKED_BY_ASSET** |
| All Viewports | `index.html`<br>`placa.html` | Sec 04 (Home) & Caderno Técnico (Placa) | Unvalidated engineering parameters present in Stitch reference (dimensions, density, thermal expansion, flame response). | **P0** | Enforced Content Truth: unverified specs marked as `[ EM VALIDAÇÃO ]` / `[ INFORMAÇÃO EM VALIDAÇÃO ]`. Only verified facts published. | **BLOCKED_BY_CONTENT** |
| All Viewports | `index.html`<br>`placa.html` | All Image Cards | Prompt strings in Stitch `<img src>` must never be loaded as URLs or simulated with generic stock photos. | **P1** | Replaced prompts with asset-safe mineral textured media containers marked with `[ VISUALIZAÇÃO DE APLICAÇÃO ]`, preserving exact aspect ratios (`4/5`, `4/3`, `16/9`, `21/9`, `1/1`). | **BLOCKED_BY_ASSET** |

---

## 3. Summary of Open Deltas

- **P0 Open:** 0
- **P1 Open (Solvable):** 0
- **P1 Open (Blocked by Asset/Content):** 3 (`BLOCKED_BY_ASSET`: Official Logo, Real Photos; `BLOCKED_BY_CONTENT`: Laboratory Test Data)
- **P2 Open:** 0

---

## 4. Visual QA Captures Regenerated

All 8 canonical viewports have been re-rendered and verified:
- `reports/qa/home-1440x900.png` (Desktop 1440px)
- `reports/qa/home-1024x768.png` (Tablet Landscape 1024px)
- `reports/qa/home-768x1024.png` (Tablet Portrait 768px)
- `reports/qa/home-390x844.png` (Mobile 390px — verified zero clipping)
- `reports/qa/placa-1440x900.png` (Desktop 1440px)
- `reports/qa/placa-1024x768.png` (Tablet Landscape 1024px)
- `reports/qa/placa-768x1024.png` (Tablet Portrait 768px)
- `reports/qa/placa-390x844.png` (Mobile 390px — verified zero clipping)
