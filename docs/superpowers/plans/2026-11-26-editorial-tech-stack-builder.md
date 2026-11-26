# Editorial Modular Tech Stack Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive, editorial-styled modular Tech Stack Builder section (`CHAPTER IV`) to the Vue 3 portfolio where visitors can assemble, stack, and inspect Ferrel's engineering stack without breaking the warm minimalist aesthetic or adding React/Framer Motion overhead.

**Architecture:** Port the interactive 2D-grid stacking-block mechanic to native Vue 3 + TypeScript + Tailwind CSS v4 + Web Animations API + GSAP. Restyle the plastic Lego blocks into matte editorial architectural modules (alabaster paper, warm bronze, deep ink, and slate) positioned on a Light `#faf9f6` slide between dark `Capabilities` (`#282523`) and dark `Activity` (`#23201e`) to maintain alternating visual rhythm.

**Tech Stack:** Vue 3 (Composition API `<script setup>`), TypeScript, Tailwind CSS v4, GSAP, Web Animations API (`Element.animate`), Node 20 built-in test runner (`node --test`).

**Spec:** Inline design agreed during brainstorming (2026-11-26): adapt the interactive stacking-block concept into an editorial modular style native to Vue 3, split into granular atomic commits.

## Global Constraints

- Zero new npm runtime dependencies (no `react`, `react-dom`, or `framer-motion`).
- Must respect `prefersReducedMotion()` from `src/utils/motion.ts` (skip parabolic arc animations and GSAP reveals when reduced motion is enabled).
- Must maintain the existing portfolio palette (`#faf9f6`, `#22201e`, `#3A3632`, `#282523`, `#23201e`) and typography (`font-serif` Instrument Serif, `font-sans` Instrument Sans).
- Desktop layout must fit cleanly inside `md:h-dvh` horizontal slide track without clipping; mobile layout must stack cleanly in vertical flow.
- `npm run build` (`vue-tsc && vite build`) must pass cleanly.
- After modifying code files, run `graphify update .` per `.agents/rules/graphify.md`.

## Review Focus

- **Grid overflow when many modules are equipped:** If a visitor equips all 12+ modules, rows must stack upward cleanly within `MAX_ROWS` without clipping off the top of the viewport or overlapping the chapter header.
- **Rapid double-click during arc animation:** Clicking a module while `animatingIds` already contains its `id` must be ignored so `getBoundingClientRect()` start/end coordinates do not corrupt mid-flight.
- **Mobile viewport scaling & overflow:** On screens `< 768px`, the 6-column plinth (`390px` base width) must scale down (`scale-[0.78] sm:scale-90`) so it never causes horizontal page overflow.
- **LeftRail adaptive theme & scroll progress:** Inserting a Light slide (`#faf9f6`) between two Dark slides (`Capabilities` and `Activity`) must keep `isDarkRail` accurate on both desktop horizontal scroll and mobile vertical scroll.
- **Keyboard & screen-reader accessibility:** Every module button must remain a semantic `<button type="button">` with descriptive `aria-label` (e.g., `"Add Vue 3 to stack"` / `"Remove Vue 3 from stack"`) and visible focus ring.

---

### Task 1: Define Tech Stack Types and Curated Dataset

**Files:**
- Create: `src/data/techStack.ts`

**Interfaces:**
- Produces:
  - `export type TechCategory = 'frontend' | 'backend' | 'ml-3d'`
  - `export type TechTier = 'core' | 'explored'`
  - `export type PinTone = 'ink' | 'bronze' | 'slate' | 'sage' | 'terracotta'`
  - `export interface TechModule { id: string; name: string; role: string; category: TechCategory; tier: TechTier; studs: 2 | 4; projects: string[]; tone: PinTone }`
  - `export interface StackPreset { id: string; label: string; moduleIds: string[] }`
  - `export const TECH_MODULES: TechModule[]`
  - `export const STACK_PRESETS: StackPreset[]`

- [ ] **Step 1: Create `src/data/techStack.ts` with typed interfaces and Ferrel's curated stack**

Include 12 modules across `'frontend'` (Vue 3, React 19, Next.js 15, TypeScript, Tailwind CSS, GSAP, Three.js), `'backend'` (Laravel 11, Node.js, Supabase / SQL), and `'ml-3d'` (Python & ML, Unity 3D / Blender), plus 3 presets (`'fullstack-3d'`, `'quant-ml'`, `'creative-web'`).

- [ ] **Step 2: Typecheck with `vue-tsc`**

Run: `npx vue-tsc --noEmit`
Expected: Exits with code 0 and no TypeScript errors.

- [ ] **Step 3: Atomic Commit**

```bash
git add src/data/techStack.ts
git commit -m "feat(tech-stack): add curated tech stack dataset and types"
```

---

### Task 2: Implement 2D Grid Packing & Architecture Profile Math with Unit Tests

**Files:**
- Create: `src/utils/techStackGrid.ts`
- Create: `tests/techStackGrid.test.mjs` (or `.ts` runnable via Node/tsx — use `.mjs` importing or mirroring pure logic, or `node --experimental-strip-types` check; verify Node 20 compatibility first)

**Interfaces:**
- Consumes: `TechModule` from `@/data/techStack`
- Produces:
  - `export const STACK_GRID = { STUD_WIDTH: 62, ROW_HEIGHT: 74, MAX_ROWS: 12, COLS: 6, APEX_HEIGHT: 130 } as const`
  - `export interface PositionedModule { module: TechModule; rowIndex: number; colIndex: number }`
  - `export function packStackModules(equipped: TechModule[], cols?: number, maxRows?: number): { grid: (string | null)[][]; positioned: PositionedModule[]; maxRow: number }`
  - `export function getHiddenBaseStuds(grid: (string | null)[][], animatingIds: Record<string, unknown>, cols?: number): number[]`
  - `export function getHiddenModuleStuds(grid: (string | null)[][], rowIndex: number, colIndex: number, studs: number, animatingIds: Record<string, unknown>): number[]`
  - `export function deriveStackProfile(equipped: TechModule[]): { title: string; summary: string }`

- [ ] **Step 1: Write failing unit tests in `tests/techStackGrid.test.ts` (or `.mjs`)**

Test cases covering:
1. Empty equipped array returns empty `positioned` and `maxRow: -1`.
2. Two `2-stud` + one `2-stud` modules pack into row 0 (`cols = 6`) without overlapping.
3. A `4-stud` module followed by another `4-stud` module wraps the second to row 1 (`colIndex: 0`).
4. `getHiddenBaseStuds` excludes studs occupied by modules currently in `animatingIds`.
5. `deriveStackProfile` returns distinct architectural titles for empty, frontend-only, fullstack, and ML/3D combinations.

- [ ] **Step 2: Create `src/utils/techStackGrid.ts` implementing `packStackModules`, `getHiddenBaseStuds`, `getHiddenModuleStuds`, and `deriveStackProfile`**

- [ ] **Step 3: Run typecheck and unit tests**

Run: `npx vue-tsc --noEmit` and `node --test tests/techStackGrid.test.mjs`
Expected: Typecheck passes with 0 errors and all grid unit tests PASS.

- [ ] **Step 4: Atomic Commit**

```bash
git add src/utils/techStackGrid.ts tests/techStackGrid.test.mjs
git commit -m "feat(tech-stack): implement 2D grid packing math and architecture profile derivation"
```

---

### Task 3: Create Editorial Material Theme Map & Inline SVG Tech Icons

**Files:**
- Create: `src/utils/techStackTheme.ts`

**Interfaces:**
- Consumes: `PinTone` from `@/data/techStack`
- Produces:
  - `export interface EditorialBlockTheme { topColor: string; faceGradient: string; bottomColor: string; pinWall: string; pinCap: string; pinRim: string; textClass: string; subtextClass: string; badgeClass: string }`
  - `export const EDITORIAL_BLOCK_THEMES: Record<PinTone, EditorialBlockTheme>`
  - `export const TECH_ICON_PATHS: Record<string, { viewBox: string; paths: string[] }>`

- [ ] **Step 1: Create `src/utils/techStackTheme.ts`**

Define 5 muted, editorial material palettes (`ink`, `bronze`, `slate`, `sage`, `terracotta`) matching `#22201e`, `#3A3632`, `#4a443e`, `#333a35`, `#5c3d31` — avoiding bright neon plastic gradients. Include crisp monochrome SVG path data for each technology ID.

- [ ] **Step 2: Typecheck with `vue-tsc`**

Run: `npx vue-tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 3: Atomic Commit**

```bash
git add src/utils/techStackTheme.ts
git commit -m "feat(tech-stack): add editorial matte palettes and monochrome tech icon paths"
```

---

### Task 4: Build `TechModuleBlock.vue` Reusable Editorial Block Component

**Files:**
- Create: `src/components/ui/TechModuleBlock.vue`

**Interfaces:**
- Consumes: `TechModule` (`@/data/techStack`), `EDITORIAL_BLOCK_THEMES` & `TECH_ICON_PATHS` (`@/utils/techStackTheme`), `STACK_GRID` (`@/utils/techStackGrid`), `prefersReducedMotion` (`@/utils/motion`)
- Produces:
  - Props: `module: TechModule`, `hiddenStuds?: number[]`, `isAnimating?: boolean`, `startRect?: DOMRect | null`, `pointerX?: number`, `pointerY?: number`, `isEquipped?: boolean`
  - Emits: `(e: 'toggle', module: TechModule, event: MouseEvent): void`, `(e: 'animationComplete', id: string): void`

- [ ] **Step 1: Create `src/components/ui/TechModuleBlock.vue`**

Implement:
- Architectural top pins (`v-for` over `module.studs`, hiding indices present in `hiddenStuds`).
- Matte face with CSS pointer-sheen gradient driven by `pointerX` / `pointerY` props.
- Compact (`2-stud`) vs Standard (`4-stud`) layout showing monochrome icon, `module.name`, and subtle `module.role` / tier dot.
- `watch(() => [props.isAnimating, props.startRect])` triggering Web Animations API parabolic arc (`Element.animate`) with squash-and-stretch, or immediately emitting `animationComplete` if `prefersReducedMotion()` is true.

- [ ] **Step 2: Typecheck with `vue-tsc`**

Run: `npx vue-tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 3: Atomic Commit**

```bash
git add src/components/ui/TechModuleBlock.vue
git commit -m "feat(tech-stack): create TechModuleBlock component with arc animation"
```

---

### Task 5: Build `TechStack.vue` Section Layout & Interactive Plinth

**Files:**
- Create: `src/components/sections/TechStack.vue`

**Interfaces:**
- Consumes: `TECH_MODULES`, `STACK_PRESETS` (`@/data/techStack`), `packStackModules`, `getHiddenBaseStuds`, `getHiddenModuleStuds`, `deriveStackProfile`, `STACK_GRID` (`@/utils/techStackGrid`), `TechModuleBlock` (`@/components/ui/TechModuleBlock.vue`)
- Produces:
  - `id="tech-stack"` `<section>` styled with `bg-[#faf9f6] text-[#22201e]`
  - Exposed method: `defineExpose({ revealSlide })` matching `Capabilities.vue` and `Activity.vue`

- [ ] **Step 1: Create `src/components/sections/TechStack.vue` with editorial header, category filter, and two-column interactive stage**

Include:
- Top bar: `CHAPTER IV` heading (`font-serif uppercase`) + category filter tabs (`All`, `Frontend`, `Backend`, `ML & 3D`) + preset quick-load buttons + `Reset` action.
- Left column: Available unequipped modules pool (`flex-wrap`) with hover tooltip/detail line showing linked projects (`Used in: ...`).
- Right column: Scaled editorial plinth (`w-[372px]`, 6 architectural base pins, dark `#22201e` matte base block) displaying `FERREL // ARCHITECTURE` and live `deriveStackProfile(equippedModules)` readout, plus stacked `TechModuleBlock` instances positioned via `rowIndex` and `colIndex`.
- GSAP entrance timeline in `revealSlide()` (respecting `prefersReducedMotion()`), and subtle plinth impact bounce when a module lands.

- [ ] **Step 2: Typecheck with `vue-tsc`**

Run: `npx vue-tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 3: Atomic Commit**

```bash
git add src/components/sections/TechStack.vue
git commit -m "feat(tech-stack): build TechStack editorial section with interactive plinth"
```

---

### Task 6: Register `TechStack` in Horizontal Track & `App.vue` Navigation

**Files:**
- Modify: `src/components/sections/index.ts:1-9`
- Modify: `src/App.vue:65-78,103-145,154-160,256-310,461-473`

**Interfaces:**
- Consumes: `TechStack` from `@/components/sections`
- Produces: Updated slide indices (`TECH_STACK_INDEX`, `ACTIVITY_INDEX`, `CONTACT_INDEX`, `TOTAL_SLIDES`), `SLIDE_IDS` including `'tech-stack'`, `setRailThemeForSlide` & `checkRailTheme` treating `TechStack` as Light (`isDarkRail = false`), and `handleNavigate('tech-stack')`.

- [ ] **Step 1: Export `TechStack` in `src/components/sections/index.ts`**

- [ ] **Step 2: Integrate `<TechStack ref="techStackRef" />` in `src/App.vue` between `<Capabilities />` and `<Activity />`**

Update:
- `TECH_STACK_INDEX = CAPABILITIES_INDEX + 1`
- `ACTIVITY_INDEX = TECH_STACK_INDEX + 1`
- `CONTACT_INDEX = ACTIVITY_INDEX + 1`
- `SLIDE_IDS` to include `'tech-stack'` between `'capabilities'` and `'activity'`
- `currentSectionId`, `triggerSlideAnimation`, `handleNavigate`
- `setRailThemeForSlide` and `checkRailTheme` so `Hero` (`0`), `Capabilities` (`CAPABILITIES_INDEX`), `Activity` (`ACTIVITY_INDEX`), and `Contact` (`CONTACT_INDEX`) are dark, while `About`, `Works`, and `TechStack` are light.

- [ ] **Step 3: Verify full TypeScript + Vite build**

Run: `npm run build`
Expected: `vue-tsc && vite build` succeeds cleanly.

- [ ] **Step 4: Atomic Commit**

```bash
git add src/components/sections/index.ts src/App.vue
git commit -m "feat(app): integrate TechStack section into horizontal scroll track"
```

---

### Task 7: Update `LeftRail.vue` Navigation & Renumber Subsequent Chapters

**Files:**
- Modify: `src/components/common/LeftRail.vue:475-539`
- Modify: `src/components/sections/Activity.vue:11-16`

**Interfaces:**
- Consumes: `activeSection === 'tech-stack'` from `App.vue`
- Produces: Updated `navItems` and `navContexts` (`05. TECH STACK / CH. IV`, `06. ACTIVITY / CH. V`, `07. CONTACT / CH. VI`) and updated `Activity.vue` header (`CHAPTER V`).

- [ ] **Step 1: Add `tech-stack` to `navContexts` and `navItems` in `src/components/common/LeftRail.vue`, and renumber `activity` (CH. V) and `contact` (CH. VI)**

- [ ] **Step 2: Update `Activity.vue` heading from `CHAPTER IV` to `CHAPTER V`**

- [ ] **Step 3: Verify build and check layout**

Run: `npm run build`
Expected: `vue-tsc && vite build` succeeds cleanly.

- [ ] **Step 4: Atomic Commit**

```bash
git add src/components/common/LeftRail.vue src/components/sections/Activity.vue
git commit -m "feat(nav): register Tech Stack in LeftRail and update chapter numbering"
```

---

### Task 8: Final Verification, Project Sync & Knowledge Graph Update

**Files:**
- Verify all modified/created files and `graphify-out/`

- [ ] **Step 1: Run project verification, unit tests, and production build**

Run: `npm run verify:projects && node --test tests/techStackGrid.test.mjs && npm run build`
Expected: All three commands pass with exit code 0.

- [ ] **Step 2: Update Graphify knowledge graph**

Run: `graphify update .`
Expected: Graph updated cleanly with new `TechStack.vue`, `TechModuleBlock.vue`, `techStack.ts`, `techStackGrid.ts`, and `techStackTheme.ts` nodes.

- [ ] **Step 3: Atomic Commit (if graphify-out is tracked or any final lint/format fixes)**

```bash
git status
```
Commit any tracked updates cleanly.
