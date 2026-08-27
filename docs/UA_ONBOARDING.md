# 🧭 Onboarding & Architecture Blueprint: Portfolio v2

> **Repository:** `FerrelHD/portfolio-v2`  
> **Tech Stack:** Vue 3 (Composition API) • TypeScript • GSAP 3 (ScrollTrigger) • Lenis Scroll • Tailwind CSS 3 • Vite  
> **Target Production:** Vercel (`ferrel-rashad-portfolio.vercel.app`)

---

## 🌟 1. Project Overview & Design Philosophy

This project is a high-performance, animation-intensive digital portfolio engineered for **Ferrel Rashad Akeyla** (*Full-Stack Developer & Creative Engineer*). It bridges modern web engineering, fluid 60 FPS motion design, and physics-driven micro-interactions.

### Key Architectural Pillars:
1. **Kinetic Typography & Staggered Motion:** Powered by GSAP `ScrollTrigger` and custom character splitting logic (`textSplitterIntoChar`).
2. **Inertial Smooth Scrolling:** Powered by `@studio-freight/lenis` bound to the Vue lifecycle and GSAP ticker.
3. **Physics-Driven Magnetic Cursor & UI:** Reusable magnetic wrapper (`MagneticEffect.vue`) and dynamic pill badge (`Cursor.vue`).
4. **macOS-Style Component Frames:** Reusable realistic browser and IDE window chrome with traffic light controls and dark glassmorphism.

---

## 🏗️ 2. Architecture Layers & Directory Map

```
ferrelrashadportfolio/
├── public/                     # Static assets (favicons, robots.txt, preview banners)
│   ├── hero-preview.png        # README & docs showcase banner
│   ├── og-image.png            # Social share card (1200x630)
│   └── robots.txt              # Search engine crawler policies
├── src/
│   ├── assets/                 # Fonts (Cabinet Grotesk) & global styles
│   │   └── fonts/
│   ├── components/
│   │   ├── design/             # Reusable UX & Micro-interaction primitives
│   │   │   ├── Cursor.vue          # Dynamic custom cursor + SVG enter glyph
│   │   │   ├── Footer.vue          # Responsive footer, local clock, magnetic scroll-to-top
│   │   │   ├── MagneticEffect.vue  # Reusable physics hover attraction wrapper
│   │   │   ├── Navigation.vue      # Fullscreen GSAP drawer menu
│   │   │   ├── Preloader.vue       # SVG morphing intro screen + percentage counter
│   │   │   └── Slider.vue          # macOS IDE code preview & tech badge marquee
│   │   ├── sections/           # Modular one-page layout sections
│   │   │   ├── Hero.vue            # Hero headline, portrait, availability badge
│   │   │   ├── aboutMe.vue         # Kinetic 3-line typography reveal
│   │   │   ├── Works.vue           # macOS browser project showcase cards
│   │   │   ├── People.vue          # Tech Arsenal container & IDE wrapper
│   │   │   └── Contact.vue         # Looping background video CTA
│   │   ├── BurgerMenuBtn.vue   # Floating magnetic navigation trigger button
│   │   ├── Marquee.vue         # Infinite horizontal text/tech badge ticker
│   │   └── WorkCard.vue        # Project card sub-component
│   ├── functions/
│   │   └── index.ts            # Kinetic text splitting & DOM manipulation helpers
│   ├── data.ts                 # Single Source of Truth (SSOT) data store
│   ├── App.vue                 # Root view orchestrator & Lenis init
│   ├── main.ts                 # Vue bootstrapping & global Tailwind CSS import
│   └── style.css               # Design tokens, custom scrollbars, typography rules
└── index.html                  # HTML5 entry, SEO tags, JSON-LD Schema
```

---

## 🚀 3. Guided Tour: Step-by-Step Learning Path

### Step 1: Entry Point & Initialization (`src/main.ts` & `src/App.vue`)
- `main.ts` imports `./style.css` which registers custom font `@font-face` rules for **Cabinet Grotesk Variable**.
- `App.vue` instantiates **Lenis Smooth Scroll** inside `onMounted`:
  ```typescript
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  ```
- Lenis is wired into the GSAP `ScrollTrigger.update` loop via `requestAnimationFrame` to ensure zero animation jitter.

### Step 2: Kinetic Intro Preloader (`src/components/design/Preloader.vue`)
- Renders an SVG overlay with animated path morphing using GSAP timelines.
- Counter increments smoothly from 0 to 100% before triggering `emit('loaded')` to unlock page scrolling.

### Step 3: Centralized Data Architecture (`src/data.ts`)
- All projects, technologies, and navigation items are declared in type-safe objects:
  - `navbarLinks`: Header navigation references.
  - `works`: Showcase cards with project title, role, primary preview URLs, video/image media paths, and stack tags.
  - `arsenal`: Programming languages, frameworks, and developer tools.

### Step 4: Kinetic Typography Engine (`src/functions/index.ts` & `aboutMe.vue`)
- The `textSplitterIntoChar(targetSelector, isNewLine)` helper splits raw text into individual `<span class="char">` elements while preserving word boundaries.
- Staggered GSAP `ScrollTrigger` animations reveal characters sequentially as the user scrolls into view.

### Step 5: Physics Magnetic Cursor (`src/components/design/MagneticEffect.vue`)
- Computes mouse delta relative to element bounding rect `(clientX - (left + width/2)) * factor`.
- Uses GSAP `quickTo` or `to` with elastic easing to give interactive buttons a magnetic pull toward the mouse cursor.

---

## 💡 4. Reusable Patterns to Steal for Future Projects

### 🎯 Pattern 1: macOS-Style Frame Container
Wrap project previews or code snippets inside realistic window controls:
```html
<div class="rounded-2xl border border-white/15 bg-[#121211] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
  <!-- Title bar with dots -->
  <div class="flex items-center justify-between border-b border-white/10 bg-[#1a1a19] px-4 py-3">
    <div class="flex items-center gap-1.5">
      <span class="size-2.5 rounded-full bg-[#FF5F56]"></span>
      <span class="size-2.5 rounded-full bg-[#FFBD2E]"></span>
      <span class="size-2.5 rounded-full bg-[#27C93F]"></span>
    </div>
    <div class="text-xs text-white/50 font-mono">project-preview.app</div>
  </div>
  <!-- Media Content -->
</div>
```

### 🎯 Pattern 2: Multi-Timezone Dynamic Clock
Format live local time dynamically in real-time without external heavy date libraries:
```typescript
const userLocalTime = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
});
```

---

## ⚠️ 5. Complexity Hotspots & Best Practices

1. **GSAP ScrollTrigger DOM Splitting:**
   - Always run `textSplitterIntoChar` before creating ScrollTriggers.
   - If using responsive window resize, call `ScrollTrigger.refresh()` to recalculate pin and trigger coordinates.
2. **Video & Canvas Preloading:**
   - Add `preload="metadata"` and `playsinline` to video elements to prevent mobile bandwidth bottlenecks.
3. **Vercel Author Check:**
   - Commit using verified author `Ferrel HD <ferrelrashadakeyla2014@gmail.com>` to ensure automated CI/CD deployments pass without permission blocks.
