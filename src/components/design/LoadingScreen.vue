<template>
  <div
    v-if="isVisible"
    id="loading-screen"
    class="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
  >
    <!-- Physical Curtain Panel (Matching 'What I Do' dark theme + texture) -->
    <div
      id="preloader-curtain"
      class="absolute inset-0 z-10 bg-[#0B0B0A] will-change-transform overflow-hidden"
    >
      <!-- Film Grain / Noise Overlay matching What I Do section -->
      <div class="pointer-events-none absolute inset-0 opacity-15">
        <svg class="h-full w-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <filter id="loader-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="1"
              stitchTiles="stitch"
            />
            <feBlend mode="screen" />
          </filter>
          <rect class="size-full" filter="url(#loader-noise)" />
        </svg>
      </div>
    </div>

    <!-- Preloader Content Layer -->
    <div
      id="preloader-content"
      class="relative z-20 flex h-svh w-full flex-col justify-between p-5 xs:p-7 sm:p-10 md:p-14 text-flax-smoke-100 select-none pointer-events-auto will-change-transform will-change-opacity"
    >
      <!-- Top Meta Bar -->
      <div
        class="flex items-center justify-between border-b border-white/10 pb-4 select-none"
      >
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-flame animate-pulse"></span>
          <span
            class="font-mono text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-widest text-flax-smoke-300"
          >
            FERREL.DEV // ARCHIVE
          </span>
        </div>
        <span
          class="font-mono text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wider text-flax-smoke-500"
        >
          DEPOK, ID • {{ new Date().getFullYear() }}
        </span>
      </div>

      <!-- Centerpiece: SVG Stroke Drawing of FERREL + Star Beside It (Symmetrically Centered) -->
      <div
        class="my-auto flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-4 select-none"
      >
        <div class="relative flex flex-col items-center justify-center text-center">
          <!-- Name + Absolute Star on right (prevents star from offsetting center) -->
          <div
            class="relative flex items-center justify-center w-[230px] xs:w-[270px] sm:w-[440px] md:w-[540px]"
          >
            <!-- SVG Name with Line Drawing Animation -->
            <svg
              id="loader-svg-name"
              class="w-full"
              viewBox="0 0 560 74"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- F -->
              <path
                class="loader-path"
                d="M0 73V0H70V14.5H21V33.5H66V47.5H21V73H0Z"
              ></path>
              <!-- E -->
              <path
                class="loader-path"
                d="M90 73V0H160V14.5H111V33.5H156V47.5H111V58.5H160V73H90Z"
              ></path>
              <!-- R -->
              <path
                class="loader-path"
                d="M180 73V0H220C232 0 240 3 246 8C252 13 255 20 255 27.5C255 35 252 41 246 45.5C240.5 49.5 232 51.5 220 51.5H201V73H180ZM201 37.5H217C222 37.5 225.5 36.5 228 34.5C230.5 32.5 232 29.5 232 27C232 23.5 230.5 20.5 228 18.5C225.5 16.5 222 15 217 15H201V37.5ZM230 46L256 73H230L206 46H230Z"
              ></path>
              <!-- R -->
              <path
                class="loader-path"
                d="M276 73V0H316C328 0 336 3 342 8C348 13 351 20 351 27.5C351 35 348 41 342 45.5C336.5 49.5 328 51.5 316 51.5H297V73H276ZM297 37.5H313C318 37.5 321.5 36.5 324 34.5C326.5 32.5 328 29.5 328 27C328 23.5 326.5 20.5 324 18.5C321.5 16.5 318 15 313 15H297V37.5ZM326 46L352 73H326L302 46H326Z"
              ></path>
              <!-- E -->
              <path
                class="loader-path"
                d="M372 73V0H442V14.5H393V33.5H438V47.5H393V58.5H442V73H372Z"
              ></path>
              <!-- L -->
              <path
                class="loader-path"
                d="M462 73V0H483V58.5H534V73H462Z"
              ></path>
            </svg>

            <!-- Rotating Flame Star Positioned Relative to FERREL -->
            <div
              class="absolute left-full top-1/2 -translate-y-1/2 ml-2 sm:ml-4 md:ml-5 flex items-center justify-center shrink-0"
            >
              <svg
                class="size-5 xs:size-6 sm:size-9 md:size-11 animate-[spin_5s_linear_infinite] fill-flame"
                viewBox="0 0 75 76"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.668 75.939V64.59l4.073-16.005-12.513 11.64-9.894 5.529L.022 49.167l9.603-5.529L25.921 38.4 9.625 33.453.022 27.924l9.312-16.587 9.894 5.529 12.513 11.64-4.073-16.296V.861h19.206V12.21L42.8 28.506l12.513-11.64 9.894-5.529 9.312 16.587-9.604 5.529L48.62 38.4l16.296 5.238 9.604 5.529-9.313 16.587-9.894-5.529L42.8 48.585l4.074 16.005v11.349H27.666Z"
                ></path>
              </svg>
            </div>
          </div>

          <!-- Subtitle Cleanly & Symmetrically Centered Underneath FERREL -->
          <p
            class="font-mono text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-flax-smoke-400 mt-4 sm:mt-5 text-center"
          >
            ( FULL-STACK DEVELOPER & DIGITAL CREATOR )
          </p>
        </div>
      </div>

      <!-- Bottom Status & Percentage Counter -->
      <div
        class="flex items-end justify-between border-t border-white/10 pt-4 select-none"
      >
        <!-- Loading Status Sub-label -->
        <div
          class="flex items-center gap-2 font-mono text-[9px] xs:text-[10px] sm:text-xs text-flax-smoke-400 uppercase tracking-wider"
        >
          <span class="inline-block size-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="truncate max-w-[160px] xs:max-w-[240px] sm:max-w-none">{{ statusText }}</span>
        </div>

        <!-- Monolith Numeric Counter -->
        <div
          class="font-mono text-3xl sm:text-5xl md:text-6xl font-black text-flame tabular-nums tracking-tight leading-none"
        >
          <span>{{ formattedPercent }}%</span>
        </div>
      </div>

      <!-- GPU-Accelerated Fine Bottom Progress Line -->
      <div
        id="loader-progress-line"
        class="absolute bottom-0 left-0 h-[2px] w-full bg-flame scale-x-0 origin-left will-change-transform shadow-[0_0_10px_#e43d12]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import {
    buildHeroTimeline,
    initHeroScrollTrigger,
    samsungErrorModal,
  } from '@/animations';
  import { lenis } from '@/lenis';

  const emit = defineEmits(['isLoading']);

  const isVisible = ref(true);
  const percent = ref(0);
  const statusText = ref('INITIALIZING CORE...');

  const formattedPercent = computed(() => {
    return percent.value.toString().padStart(2, '0');
  });

  const isSamsungBrowser = /samsung/i.test(navigator.userAgent);

  onMounted(async () => {
    // 1. Immediately lock scroll during intro
    lenis.stop();
    document.body.classList.add('stop-scrolling');

    // 2. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      const heroTl = buildHeroTimeline();
      heroTl.progress(1);
      initHeroScrollTrigger();
      samsungErrorModal(isSamsungBrowser);
      document.body.classList.remove('stop-scrolling');
      lenis.start();
      isVisible.value = false;
      emit('isLoading', false);
      return;
    }

    // 3. Build ONE Master Continuous Timeline (Zero async gaps)
    const master = gsap.timeline({
      paused: true,
      onComplete: () => {
        isVisible.value = false;
        document.body.classList.remove('stop-scrolling');
        lenis.start();
        initHeroScrollTrigger();
        samsungErrorModal(isSamsungBrowser);
        emit('isLoading', false);
      },
    });

    // --- PHASE 1: COUNTING & VECTOR DRAWING ---
    const counterObj = { val: 0 };
    master.to(
      counterObj,
      {
        val: 100,
        duration: 1.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentVal = Math.floor(counterObj.val);
          percent.value = currentVal;

          if (currentVal < 30) {
            statusText.value = 'INITIALIZING SYSTEM...';
          } else if (currentVal < 65) {
            statusText.value = 'DRAWING VECTOR SCHEMATICS...';
          } else if (currentVal < 95) {
            statusText.value = 'COMPILING SHADERS...';
          } else {
            statusText.value = 'SYSTEM READY';
          }
        },
      },
      0,
    );

    // Stroke outline drawing perfectly synchronized
    master.to(
      '.loader-path',
      {
        strokeDashoffset: 0,
        duration: 1.25,
        ease: 'power2.inOut',
        stagger: 0.035,
      },
      0,
    );

    // Smooth color fill sweep near completion (no sudden flash)
    master.to(
      '.loader-path',
      {
        fill: '#ebe9e1',
        stroke: 'transparent',
        duration: 0.35,
        ease: 'power2.out',
      },
      1.15,
    );

    // GPU-accelerated progress line (scaleX instead of width layout reflow)
    master.to(
      '#loader-progress-line',
      {
        scaleX: 1,
        duration: 1.45,
        ease: 'power2.inOut',
      },
      0,
    );

    // --- PHASE 2: SEAMLESS CONTINUOUS CURTAIN REVEAL ---
    // Preloader content glides upward and fades seamlessly (no stop)
    master.to(
      '#preloader-content',
      {
        y: -30,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      1.45,
    );

    // Physical curtain glides upward with heavy architectural momentum
    master.to(
      '#preloader-curtain',
      {
        yPercent: -100,
        duration: 1.25,
        ease: 'power3.inOut',
        onStart: () => {
          window.scrollTo(0, 0);
        },
      },
      1.5,
    );

    // --- PHASE 3: HERO SECTION LANDS IN MID-FLIGHT ---
    const heroTl = buildHeroTimeline();
    master.add(heroTl, 1.85);

    // Await fonts before starting so text layout is 100% stable
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Launch the single unbroken timeline
    master.play();
  });
</script>

<style scoped>
  .loader-path {
    stroke: #ebe9e1;
    stroke-width: 1.5;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-dasharray: 380;
    stroke-dashoffset: 380;
    fill: transparent;
    will-change: stroke-dashoffset, fill;
  }
</style>
