<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="colophonOverlay"
      data-lenis-prevent
      class="fixed inset-0 z-[130] flex flex-col bg-[#faf9f6] text-[#22201e] will-change-[clip-path] overflow-hidden select-text"
      style="clip-path: inset(100% 0 0 0);"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-label="Colophon and Site Architecture Specification"
    >
      <!-- Top Fixed Sticky Header -->
      <header class="shrink-0 border-b border-black/10 bg-[#faf9f6]/95 backdrop-blur-md px-4 sm:px-8 md:px-12 lg:px-16 py-3.5 md:py-4 flex items-center justify-between z-30">
        <!-- Left: Title & Chapter Code -->
        <div class="flex items-baseline gap-3 sm:gap-5">
          <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#22201e] leading-none">
            COLOPHON
          </h2>
          <span class="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#22201e]/60 font-medium">
            SPECIFICATION // 2026
          </span>
        </div>

        <!-- Right: Close Button & Keyboard Esc Hint -->
        <div class="flex items-center gap-3">
          <span class="hidden md:inline-block font-mono text-[11px] text-[#22201e]/40 uppercase tracking-widest">
            ESC TO CLOSE
          </span>
          <button
            ref="closeBtn"
            type="button"
            @click="handleClose"
            class="group flex items-center justify-center size-10 rounded-full text-[#22201e]/60 hover:text-[#22201e] hover:bg-black/[0.05] transition-colors cursor-pointer outline-none select-none"
            aria-label="Close colophon modal"
          >
            <span class="text-xl transition-transform duration-300 group-hover:rotate-90 inline-block leading-none">✕</span>
          </button>
        </div>
      </header>

      <!-- Scrollable Main Content -->
      <main
        data-lenis-prevent
        class="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10"
      >
        <div class="max-w-[1360px] mx-auto flex flex-col gap-8 md:gap-10">
          
          <!-- Editorial Statement Header (Max 2 lines on laptop & desktop) -->
          <div class="flex flex-col gap-3 pb-6 md:pb-8 border-b border-black/10">
            <span class="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#22201e]/55 font-semibold">
              ARCHITECTURE & CRAFT
            </span>
            <h1 class="font-sans font-black text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] text-[#22201e] uppercase tracking-tight leading-[1.08] max-w-5xl">
              Engineered with typographic discipline, reactive rigor, and locked 60 FPS motion dynamics.
            </h1>
            <p class="font-serif text-sm sm:text-base md:text-lg text-[#22201e]/75 leading-relaxed max-w-3xl italic">
              "This digital colophon serves as an open technical specification of the design system, typeface foundries, frontend architecture, and performance decisions that power this portfolio."
            </p>
          </div>

          <!-- 4-Pillar Editorial Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6 xl:gap-8 items-start">
            
            <!-- Pillar 1: Typography & Type Design -->
            <div class="flex flex-col gap-5">
              <div class="flex items-baseline gap-2 pb-2.5 border-b border-black/10">
                <span class="font-mono text-xs text-[#22201e]/40 font-bold">01.</span>
                <h3 class="font-sans font-bold text-xs sm:text-sm uppercase tracking-widest text-[#22201e]">
                  TYPOGRAPHY & FOUNDRY
                </h3>
              </div>

              <!-- Specimen Item: PP Editorial Old -->
              <div class="flex flex-col gap-2 p-3 sm:p-3.5 rounded-lg bg-black/[0.02] border border-black/5">
                <div class="flex items-baseline justify-between gap-1 flex-wrap">
                  <span class="font-sans font-semibold text-xs text-[#22201e]">PP Editorial Old</span>
                  <span class="font-mono text-[9px] sm:text-[10px] text-[#22201e]/50 uppercase">Pangram Pangram</span>
                </div>
                <p class="font-serif italic text-base sm:text-lg text-[#22201e]/90 leading-tight">
                  "Sensory velocity & kinetic motion"
                </p>
                <span class="font-sans text-[11px] text-[#22201e]/60 leading-normal">
                  Primary editorial serif for chapter titles, pull quotes, and longform accents.
                </span>
              </div>

              <!-- Specimen Item: Cabinet Grotesk -->
              <div class="flex flex-col gap-2 p-3 sm:p-3.5 rounded-lg bg-black/[0.02] border border-black/5">
                <div class="flex items-baseline justify-between gap-1 flex-wrap">
                  <span class="font-sans font-semibold text-xs text-[#22201e]">Cabinet Grotesk</span>
                  <span class="font-mono text-[9px] sm:text-[10px] text-[#22201e]/50 uppercase">Indian Type Foundry</span>
                </div>
                <p class="font-sans font-black text-xs sm:text-sm uppercase tracking-tight text-[#22201e]">
                  ARCHITECTURAL HEADINGS
                </p>
                <span class="font-sans text-[11px] text-[#22201e]/60 leading-normal">
                  Display grotesque driving high-impact headings and typographic watermarks.
                </span>
              </div>

              <!-- Specimen Item: Instrument Sans & Mono -->
              <div class="flex flex-col gap-2 p-3 sm:p-3.5 rounded-lg bg-black/[0.02] border border-black/5">
                <div class="flex items-baseline justify-between gap-1 flex-wrap">
                  <span class="font-sans font-semibold text-xs text-[#22201e]">Instrument Sans & Mono</span>
                  <span class="font-mono text-[9px] sm:text-[10px] text-[#22201e]/50 uppercase">Google / Open Source</span>
                </div>
                <div class="font-mono text-[11px] text-[#22201e]/75">
                  SPEC // 60.0 FPS · LATENCY: 0MS
                </div>
                <span class="font-sans text-[11px] text-[#22201e]/60 leading-normal">
                  Precision technical monospace and Swiss neo-grotesque for dense UI spec grids.
                </span>
              </div>
            </div>

            <!-- Pillar 2: Core Stack & Runtime -->
            <div class="flex flex-col gap-5">
              <div class="flex items-baseline gap-2 pb-2.5 border-b border-black/10">
                <span class="font-mono text-xs text-[#22201e]/40 font-bold">02.</span>
                <h3 class="font-sans font-bold text-xs sm:text-sm uppercase tracking-widest text-[#22201e]">
                  CORE RUNTIME STACK
                </h3>
              </div>

              <div class="flex flex-col divide-y divide-black/10">
                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Vue 3 (Composition API)</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Decoupled reactive component architecture with sub-millisecond virtual DOM patching.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">TypeScript 5.x</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Strict static type safety across project metrics, schema definitions, and interactive events.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">GSAP & ScrollTrigger</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Custom horizontal pinned timeline, synchronized slide indices, and physics-based easing curves.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Tailwind CSS v4</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Zero-runtime utility engine configured with custom editorial design tokens.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Vite 6</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Lightning-fast Rollup bundler with tree-shaking, code splitting, and sub-second asset delivery.
                  </span>
                </div>
              </div>
            </div>

            <!-- Pillar 3: Performance Architecture -->
            <div class="flex flex-col gap-5">
              <div class="flex items-baseline gap-2 pb-2.5 border-b border-black/10">
                <span class="font-mono text-xs text-[#22201e]/40 font-bold">03.</span>
                <h3 class="font-sans font-bold text-xs sm:text-sm uppercase tracking-widest text-[#22201e]">
                  PERFORMANCE ARCHITECTURE
                </h3>
              </div>

              <div class="flex flex-col divide-y divide-black/10">
                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Zero Third-Party UI Bloat</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    100% custom-crafted modals, custom audio visualizers, and navigation rails without external UI kit overhead.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">GPU Compositing Pipelines</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Strict utilization of <code class="font-mono text-[11px] bg-black/5 px-1 rounded">transform</code> and <code class="font-mono text-[11px] bg-black/5 px-1 rounded">clip-path</code> with <code class="font-mono text-[11px] bg-black/5 px-1 rounded">will-change</code> to eliminate layout reflows.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Contextual Theme Engine</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Dynamic viewport luminance detection automatically flipping navigation contrast between ink and paper.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Responsive Dual-Mode Viewport</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Horizontal pinned camera track on desktop devices seamlessly folding into a natural vertical tactile stack on mobile.
                  </span>
                </div>
              </div>
            </div>

            <!-- Pillar 4: Production & Deployment -->
            <div class="flex flex-col gap-5">
              <div class="flex items-baseline gap-2 pb-2.5 border-b border-black/10">
                <span class="font-mono text-xs text-[#22201e]/40 font-bold">04.</span>
                <h3 class="font-sans font-bold text-xs sm:text-sm uppercase tracking-widest text-[#22201e]">
                  PRODUCTION & DEPLOYMENT
                </h3>
              </div>

              <div class="flex flex-col divide-y divide-black/10">
                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Vercel Global Edge CDN</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Distributed edge routing, HTTP/2 multiplexing, Brotli compression, and zero cold-start latency.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Media Optimization Pipeline</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    Next-gen WebP image encoding, GPU-accelerated H.264 video previews, and optimized SVG glyph filters.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Accessibility & Focus Trapping</span>
                  <span class="font-sans text-xs text-[#22201e]/70 leading-relaxed">
                    WAI-ARIA compliant modal semantics, tab focus trapping, and hardware Esc-key dismissal.
                  </span>
                </div>

                <div class="py-3 flex flex-col gap-1">
                  <span class="font-sans font-bold text-xs text-[#22201e]">Version Release</span>
                  <span class="font-mono text-xs text-[#22201e]/80">
                    v2.4.0 — Folio Edition (2026)
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom Credits & Philosophy Signoff -->
          <div class="pt-6 md:pt-8 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8">
            <div class="flex flex-col gap-0.5">
              <span class="font-mono text-[10px] uppercase tracking-widest text-[#22201e]/40 font-semibold">
                DESIGN & CODE
              </span>
              <span class="font-sans text-xs sm:text-sm font-medium text-[#22201e]">
                Ferrel Rashad Akeyla — Creative Technologist & Software Engineer
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/FerrelHD/portfolio-v2"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-black/15 text-xs font-sans font-medium uppercase tracking-wider text-[#22201e] hover:border-black/40 hover:bg-black/[0.02] transition-colors"
              >
                <span>GitHub Repository</span>
                <span class="text-xs">↗</span>
              </a>

              <button
                type="button"
                @click="handleClose"
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#22201e] text-[#faf9f6] text-xs font-sans font-medium uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                <span>Return to Folio</span>
                <span class="text-xs">✕</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import gsap from 'gsap';

  const props = withDefaults(
    defineProps<{
      isOpen?: boolean;
    }>(),
    {
      isOpen: false,
    }
  );

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const colophonOverlay = ref<HTMLElement | null>(null);
  const closeBtn = ref<HTMLButtonElement | null>(null);
  let activeAnimation: gsap.core.Timeline | null = null;

  const openColophonAnimation = () => {
    nextTick(() => {
      if (!colophonOverlay.value) return;
      if (activeAnimation) activeAnimation.kill();

      gsap.set(colophonOverlay.value, {
        clipPath: 'inset(100% 0 0 0)',
        display: 'flex',
      });

      activeAnimation = gsap.timeline();
      activeAnimation.to(colophonOverlay.value, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.65,
        ease: 'power3.inOut',
      });
    });
  };

  const closeColophonAnimation = (callback?: () => void) => {
    if (!colophonOverlay.value) {
      callback?.();
      return;
    }

    if (activeAnimation) activeAnimation.kill();

    activeAnimation = gsap.timeline({
      onComplete: () => {
        callback?.();
      },
    });

    activeAnimation.to(colophonOverlay.value, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.45,
      ease: 'power3.inOut',
    });
  };

  const handleClose = () => {
    closeColophonAnimation(() => {
      emit('close');
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!props.isOpen) return;

    if (e.key === 'Escape') {
      handleClose();
      return;
    }

    // Accessible Tab focus trapping
    if (e.key === 'Tab' && colophonOverlay.value) {
      const focusableEls = colophonOverlay.value.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableEls.length) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  watch(
    () => props.isOpen,
    (val) => {
      if (val) {
        document.body.style.overflow = 'hidden';
        openColophonAnimation();
        nextTick(() => {
          closeBtn.value?.focus();
        });
      } else {
        document.body.style.overflow = '';
      }
    }
  );

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (props.isOpen) {
      openColophonAnimation();
    }
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
  });
</script>

