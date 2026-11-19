<template>
  <!-- Global Left Rail Header (Desktop Vertical Rail, Mobile Top Bar) -->
  <header
    class="fixed z-[100] transition-colors duration-700 md:duration-1000 select-none
           inset-x-0 top-0 h-14 flex flex-row items-center justify-between border-b px-4
           md:inset-x-auto md:inset-y-0 md:left-0 md:top-0 md:bottom-0 md:w-16 md:h-dvh md:flex-col md:items-center md:justify-start md:border-b-0 md:border-r md:px-0 md:py-0"
    :class="[
      isDark
        ? (isOpen
            ? 'bg-[#24211e] text-[#f3eee8] border-white/10'
            : (!isSolid && activeSection === 'hero'
                ? 'bg-transparent text-[#f3eee8] border-white/10'
                : (activeSection === 'capabilities' || activeSection === 'activity'
                    ? 'bg-[#282523] text-[#f3eee8] border-white/10'
                    : 'bg-[#3A3632] text-[#f3eee8] border-white/10')))
        : (isOpen
            ? 'bg-[#24211e] text-[#f3eee8] border-white/10'
            : 'bg-[#faf9f6] text-[#22201e] border-black/10')
    ]"
  >


    <!-- Top / Left: Hamburger Menu Button in Fixed Box with Divider -->
    <button
      ref="menuBtn"
      type="button"
      @click="toggleMenu"
      class="group relative flex size-11 md:size-auto md:h-16 md:w-full items-center justify-center transition-all duration-300 cursor-pointer md:border-b select-none"
      :class="[
        isDark || isOpen
          ? 'text-[#f3eee8] hover:text-white md:border-white/10 hover:bg-white/[0.04]'
          : 'text-[#22201e] hover:text-black md:border-black/10 hover:bg-black/[0.03]'
      ]"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'"
    >
      <!-- Clean 3-Line Hamburger Icon with Editorial Stagger Hover Effect -->
      <svg class="size-6 md:size-7 transition-transform duration-300 ease-out group-hover:scale-105" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Top Bar: pulls toward right on hover -->
        <rect
          y="8"
          width="32"
          height="2"
          fill="currentColor"
          class="transition-all duration-300 ease-out origin-right"
          :class="isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100 group-hover:scale-x-75'"
        ></rect>
        <!-- Middle Bar: remains steady anchor bar -->
        <rect
          y="15"
          width="32"
          height="2"
          fill="currentColor"
          class="transition-all duration-300 ease-out origin-center"
          :class="isOpen ? 'scale-x-100' : 'scale-x-100 group-hover:scale-x-[0.92]'"
        ></rect>
        <!-- Bottom Bar: pulls toward left on hover -->
        <rect
          y="22"
          width="32"
          height="2"
          fill="currentColor"
          class="transition-all duration-300 ease-out origin-left"
          :class="isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100 group-hover:scale-x-75'"
        ></rect>
      </svg>
    </button>

    <!-- Mobile Center Branding -->
    <button
      type="button"
      @click="navigateTo('hero')"
      class="flex items-center gap-2 min-h-[44px] px-2 md:hidden cursor-pointer select-none transition-opacity hover:opacity-80"
      aria-label="Go to home"
    >
      <span class="font-serif text-lg tracking-wider font-normal">
        FERREL RASHAD
      </span>
    </button>

    <!-- Desktop Middle Vertical Rail Content: Folio — Edition, FERREL RASHAD (Title font), © 2026 -->
    <div class="relative hidden md:flex flex-1 flex-col items-center justify-between py-8 w-full">
      <!-- Top: FOLIO — EDITION -->
      <span
        class="vt-rl vt-reading-up font-sans text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 whitespace-nowrap cursor-default select-none"
        :class="isDark && !isOpen ? 'text-[#f3eee8]/65' : (isOpen ? 'text-[#f3eee8]/65' : 'text-[#22201e]/65')"
      >
        FOLIO — EDITION
      </span>

      <!-- Center: FERREL RASHAD - Matches FOLIO — EDITION size (10px) and tracking -->
      <div class="absolute inset-x-0 w-full top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <button
          type="button"
          @click="navigateTo('hero')"
          class="vt-rl vt-reading-up font-sans text-[10px] uppercase tracking-[0.22em] font-medium transition-colors duration-500 whitespace-nowrap cursor-pointer select-none pointer-events-auto"
          :class="isDark && !isOpen ? 'text-[#f3eee8]/80 hover:text-[#f3eee8]' : (isOpen ? 'text-[#f3eee8]/80 hover:text-[#f3eee8]' : 'text-[#22201e]/80 hover:text-[#22201e]')"
          aria-label="Back to home"
        >
          FERREL RASHAD
        </button>
      </div>

      <!-- Bottom: Copyright Year -->
      <span
        class="vt-rl vt-reading-up font-sans text-[10px] tracking-[0.2em] tabular-nums uppercase transition-colors duration-500 cursor-default select-none"
        :class="isDark && !isOpen ? 'text-[#f3eee8]/65' : (isOpen ? 'text-[#f3eee8]/65' : 'text-[#22201e]/65')"
      >
        © 2026
      </span>
    </div>

    <!-- Mobile Right: Copyright -->
    <div class="flex items-center md:hidden">
      <span
        class="font-sans text-[10px] tracking-widest uppercase transition-colors duration-500 cursor-default"
        :class="isDark ? 'text-[#f3eee8]/65' : 'text-[#22201e]/65'"
      >
        © 2026
      </span>
    </div>

    <!-- Scroll Progress Hairline (Desktop Vertical Right Edge, Mobile Horizontal Bottom Edge) -->
    <div
      v-show="!isOpen"
      aria-hidden="true"
      class="pointer-events-none hidden md:block absolute top-0 bottom-0 right-0 w-[2px] origin-top will-change-transform transition-colors duration-500"
      :class="isDark ? 'bg-[#f3eee8]/50' : 'bg-[#22201e]/45'"
      :style="{ transform: `scaleY(${clampedProgress})` }"
    ></div>
    <div
      v-show="!isOpen"
      aria-hidden="true"
      class="pointer-events-none block md:hidden absolute left-0 right-0 bottom-0 h-[2px] origin-left will-change-transform transition-colors duration-500"
      :class="isDark ? 'bg-[#f3eee8]/50' : 'bg-[#22201e]/45'"
      :style="{ transform: `scaleX(${clampedProgress})` }"
    ></div>
  </header>

  <!-- Fullscreen Editorial Menu (Khanh Nguyen Style: Left Curtain Roll-Up + Staggered Line Reveals) -->
  <div
    v-if="isOpen"
    ref="menuPanel"
    role="dialog"
    aria-modal="true"
    aria-label="Site navigation"
    tabindex="-1"
    class="fixed inset-y-0 right-0 left-0 md:left-16 z-[95] flex flex-col justify-between
           bg-[#24211e] text-[#faf9f6] select-none
           px-6 pt-20 pb-5 sm:p-8 md:pt-6 md:pb-6 md:pl-20 md:pr-16 overflow-y-auto will-change-[clip-path]"
    style="clip-path: inset(0 100% 0 0);"
  >
    <!-- Top Right: Sleek Editorial Close Button -->
    <div class="shrink-0 flex justify-end w-full overflow-hidden p-1 pb-1.5 sm:pb-2">
      <button
        ref="closeBtn"
        type="button"
        @click="closeMenu()"
        class="group/close relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/60 bg-white/[0.03] hover:bg-white/[0.08] text-[#faf9f6]/75 hover:text-white font-sans text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer will-change-transform outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#24211e]"
        aria-label="Close navigation menu (ESC)"
      >
        <span>CLOSE</span>
        <span class="text-[10px] text-[#faf9f6]/40 group-hover/close:text-[#faf9f6]/70 transition-colors hidden sm:inline">[ESC]</span>
        <span class="text-xs inline-block transition-transform duration-300 group-hover/close:rotate-90">✕</span>
      </button>
    </div>

    <!-- Center: Split Editorial Layout (Left: Menu Links, Right: Dynamic Context Panel) -->
    <div class="flex-1 min-h-0 my-auto py-2 sm:py-3 md:py-3 lg:py-5 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center">
      <!-- Left Column: Giant Editorial Navigation Links with Masked Reveals -->
      <nav
        aria-label="Primary chapters"
        @mouseleave="hoveredItem = null"
        class="md:col-span-7 flex flex-col gap-2 sm:gap-2.5 md:gap-2.5 lg:gap-3 xl:gap-4"
      >
        <div
          v-for="item in navItems"
          :key="item.id"
          class="overflow-hidden select-none p-1 -m-1"
        >
          <!-- GSAP Mask Container (purely handles yPercent entrance and exit) -->
          <div
            ref="navItemLines"
            class="will-change-transform"
          >
            <!-- Interactive Semantic Button Layer (stationary hitbox, zero pointer jitter) -->
            <button
              type="button"
              @click="navigateTo(item.id)"
              @mouseenter="hoveredItem = item.id"
              @focus="hoveredItem = item.id"
              @blur="hoveredItem = null"
              :aria-current="activeSection === item.id ? 'location' : undefined"
              class="group/nav w-full text-left bg-transparent border-0 p-0 cursor-pointer block outline-none focus-visible:ring-1 focus-visible:ring-white/40 transition-colors duration-300 ease-out"
              :class="[
                hoveredItem
                  ? (hoveredItem === item.id ? 'text-[#faf9f6]' : 'text-[#faf9f6]/35')
                  : (activeSection === item.id ? 'text-[#faf9f6]' : 'text-[#faf9f6]/60')
              ]"
            >
              <!-- Moving Visual Container (isolated from hitbox, GPU smooth translate) -->
              <span
                class="inline-flex items-baseline gap-3 sm:gap-5 md:gap-5 lg:gap-7 transition-transform duration-300 ease-out group-hover/nav:translate-x-2 sm:group-hover/nav:translate-x-4 will-change-transform"
              >
                <!-- Small Serif Slide Number -->
                <span class="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl text-inherit transition-colors duration-300">
                  {{ item.num }}
                </span>
                <!-- Giant Editorial Serif Title + Chapter Sub-badge + Dynamic Dash Indicator -->
                <span class="flex items-center gap-3 sm:gap-4 lg:gap-5">
                  <span
                    class="font-serif text-3xl sm:text-5xl md:text-[clamp(2rem,3.8vh,3.2rem)] lg:text-[clamp(2.3rem,4.4vh,3.8rem)] xl:text-[clamp(2.7rem,5vh,4.5rem)] uppercase tracking-[-0.03em] leading-[0.92] text-inherit transition-colors duration-300"
                  >
                    {{ item.label }}
                  </span>
                  <!-- Chapter Sub-badge -->
                  <span class="hidden sm:inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-[#faf9f6]/60 transition-colors group-hover/nav:text-[#faf9f6]/85">
                    {{ item.chapter }}
                  </span>
                  <!-- GPU-Accelerated Editorial Accent Line (ScaleX, Zero Layout Reflow) -->
                  <span
                    aria-hidden="true"
                    class="hidden sm:inline-block h-[2px] w-8 lg:w-10 bg-white/70 origin-left transition-all duration-300 ease-out will-change-transform"
                    :class="[
                      hoveredItem === item.id
                        ? 'scale-x-100 opacity-100'
                        : (activeSection === item.id && !hoveredItem
                            ? 'scale-x-75 opacity-50'
                            : 'scale-x-0 opacity-0')
                    ]"
                  ></span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      <!-- Right Column: Editorial Context & Live Status Panel (Desktop Only) -->
      <aside
        ref="contextPanel"
        class="hidden md:flex md:col-span-5 flex-col justify-between self-stretch py-1.5 pl-6 lg:pl-10 border-l border-white/10 will-change-transform"
      >
        <!-- Top Metadata: Live Jakarta Time & Availability Badge -->
        <div class="flex flex-col gap-2.5 pb-3.5 border-b border-white/10">
          <div class="flex items-center justify-between">
            <span class="font-sans text-[11px] uppercase tracking-[0.2em] text-[#faf9f6]/60">
              LOCAL TIME
            </span>
            <span class="font-sans text-xs uppercase tracking-wider text-[#faf9f6]/80 tabular-nums">
              JAKARTA · {{ currentTime }} WIB
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-sans text-[11px] uppercase tracking-[0.2em] text-[#faf9f6]/60">
              STATUS
            </span>
            <span class="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#faf9f6]/90">
              <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              OPEN FOR WORK
            </span>
          </div>
        </div>

        <!-- Middle Dynamic Context Card -->
        <div class="my-auto py-3 md:py-4 flex flex-col gap-2 md:gap-2.5 transition-opacity duration-300">
          <div class="overflow-hidden">
            <span class="font-sans text-[11px] uppercase tracking-[0.22em] text-[#faf9f6]/60 block">
              {{ activeContext.chapter }}
            </span>
          </div>
          <h4 class="font-sans font-bold text-lg lg:text-xl xl:text-2xl text-[#faf9f6] tracking-tight leading-snug">
            {{ activeContext.title }}
          </h4>
          <p class="font-sans text-xs lg:text-[13px] text-[#faf9f6]/70 leading-relaxed max-w-sm line-clamp-3">
            {{ activeContext.desc }}
          </p>
        </div>

        <!-- Bottom Micro Hint -->
        <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#faf9f6]/55">
          <span>{{ activeContext.meta }}</span>
          <span>FOLIO 2026</span>
        </div>
      </aside>
    </div>

    <!-- Bottom Row: Left Archive Link & Colophon, Right Social Links -->
    <div class="shrink-0 pt-3 md:pt-3.5 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 md:gap-4">
      <div class="flex flex-wrap items-center gap-3 sm:gap-5">
        <button
          type="button"
          @click="openArchiveModal"
          class="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#faf9f6]/75 hover:text-white transition-colors cursor-pointer min-h-[38px] md:min-h-0"
        >
          <span class="border-b border-white/20 group-hover:border-white transition-colors">All Works Archive ({{ totalArchiveCount }})</span>
          <span class="font-serif italic text-sm inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>

        <span class="text-white/20 text-xs hidden sm:inline">/</span>

        <button
          type="button"
          @click="openColophonModal"
          class="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#faf9f6]/75 hover:text-white transition-colors cursor-pointer min-h-[38px] md:min-h-0"
        >
          <span class="border-b border-white/20 group-hover:border-white transition-colors">Colophon & Specs</span>
          <span class="font-serif italic text-sm inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>

        <span class="text-white/20 text-xs hidden sm:inline">/</span>

        <a
          href="/Ferrel_Rashad_Portfolio_Deck.pdf"
          download="Ferrel_Rashad_Portfolio_Deck.pdf"
          class="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#faf9f6]/75 hover:text-white transition-colors cursor-pointer min-h-[38px] md:min-h-0"
          aria-label="Download Portfolio Deck PDF"
        >
          <span class="border-b border-white/20 group-hover:border-white transition-colors">Portfolio Deck (PDF)</span>
          <span class="font-serif italic text-sm inline-block transition-transform duration-300 ease-out group-hover:translate-y-0.5" aria-hidden="true">↓</span>
        </a>
      </div>

      <div class="overflow-hidden p-1 -m-1">
        <div
          ref="socialLinks"
          class="flex flex-wrap items-center justify-start md:justify-end gap-5 sm:gap-7 text-xs sm:text-sm font-sans font-medium text-[#faf9f6]/70 will-change-transform"
        >
          <a
            href="https://github.com/FerrelHD"
            target="_blank"
            rel="noreferrer"
            class="hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ferrel-rashad/"
            target="_blank"
            rel="noreferrer"
            class="hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ferrelrashadakeyla2014@gmail.com"
            class="hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
  import gsap from 'gsap';
  import { captureFocusOrigin, restoreFocusOrigin, trapDialogTab } from '@/utils/modalFocus';
  import { prefersReducedMotion } from '@/utils/motion';
  import { archiveProjects, featuredProjects } from '@/data/projects';

  const totalArchiveCount = archiveProjects.length;
  const totalFeaturedCount = featuredProjects.length;

  const props = withDefaults(
    defineProps<{
      progress?: number;
      isDark?: boolean;
      isSolid?: boolean;
      activeSection?: string;
    }>(),
    {
      progress: 0,
      isDark: true,
      isSolid: false,
      activeSection: 'hero',
    },
  );

  const emit = defineEmits<{
    (e: 'navigate', sectionId: string): void;
    (e: 'openArchive'): void;
    (e: 'openColophon'): void;
  }>();

  const clampedProgress = computed(() => Math.min(1, Math.max(0, props.progress ?? 0)));

  const openArchiveModal = () => {
    closeMenu(() => {
      emit('openArchive');
    });
  };

  const openColophonModal = () => {
    closeMenu(() => {
      emit('openColophon');
    });
  };

  const isOpen = ref(false);
  const isAnimating = ref(false);

  const menuBtn = ref<HTMLButtonElement | null>(null);
  const menuPanel = ref<HTMLElement | null>(null);
  const closeBtn = ref<HTMLElement | null>(null);
  const navItemLines = ref<HTMLElement[]>([]);
  const socialLinks = ref<HTMLElement | null>(null);
  const contextPanel = ref<HTMLElement | null>(null);
  let previousFocus: HTMLElement | null = null;

  const hoveredItem = ref<string | null>(null);
  const currentTime = ref('');

  const updateClock = () => {
    try {
      currentTime.value = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    } catch {
      currentTime.value = new Date().toTimeString().slice(0, 8);
    }
  };

  let clockTimer: ReturnType<typeof setInterval> | null = null;

  const startClock = () => {
    updateClock();
    if (!clockTimer) {
      clockTimer = setInterval(updateClock, 1000);
    }
  };

  const stopClock = () => {
    if (clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  };

  const handleMenuKeyDown = (e: KeyboardEvent) => {
    if (!isOpen.value) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }
    trapDialogTab(menuPanel.value, e);
  };

  onMounted(() => {
    // Clock is only ticked when navigation menu is actually open
    window.addEventListener('keydown', handleMenuKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleMenuKeyDown);
    stopClock();
  });

  interface NavItemContext {
    num: string;
    label: string;
    chapter: string;
    title: string;
    desc: string;
    meta: string;
  }

  const navContexts: Record<string, NavItemContext> = {
    hero: {
      num: '01.',
      label: 'HOME',
      chapter: 'INDEX',
      title: 'Frontend Developer & Creative Engineer',
      desc: 'Building responsive web interfaces, interactive components, and clean design systems with Vue, TypeScript, and GSAP.',
      meta: 'JAKARTA, ID · 2026',
    },
    about: {
      num: '02.',
      label: 'ABOUT',
      chapter: 'CHAPTER I',
      title: 'Background and Principles',
      desc: 'Developer based in Jakarta. Focused on interface quality, fast load times, and maintainable frontend architecture.',
      meta: 'PROFILE · FERREL RASHAD',
    },
    works: {
      num: '03.',
      label: 'WORKS',
      chapter: 'CHAPTER II',
      title: 'Selected Projects',
      desc: 'Production applications and design systems including NotchFlow, Charles Leclerc interactive portfolio, and Eco-Bite.',
      meta: `${totalFeaturedCount} FEATURED · ${totalArchiveCount} ARCHIVE`,
    },
    capabilities: {
      num: '04.',
      label: 'SERVICES',
      chapter: 'CHAPTER III',
      title: 'Capabilities and Stack',
      desc: 'Component architecture, animation and micro-interactions, full-stack prototyping, and responsive layouts.',
      meta: 'VUE · TYPESCRIPT · TAILWIND',
    },
    activity: {
      num: '05.',
      label: 'ACTIVITY',
      chapter: 'CHAPTER IV',
      title: 'GitHub Contributions',
      desc: 'Daily git commits rendered on an interactive canvas in 2D grid and 3D isometric skyline view.',
      meta: 'GITHUB @FERRELHD',
    },
    contact: {
      num: '06.',
      label: 'CONTACT',
      chapter: 'CHAPTER V',
      title: 'Contact and Inquiries',
      desc: 'Open for freelance projects, engineering roles, and technical collaborations.',
      meta: 'EMAIL · LINKEDIN · GITHUB',
    },
  };

  const activeContext = computed<NavItemContext>(() => {
    const targetId = hoveredItem.value || props.activeSection || 'hero';
    return navContexts[targetId] || navContexts.hero;
  });

  const navItems = [
    { num: '01.', label: 'HOME', id: 'hero', chapter: 'INDEX' },
    { num: '02.', label: 'ABOUT', id: 'about', chapter: 'CH. I' },
    { num: '03.', label: 'WORKS', id: 'works', chapter: 'CH. II' },
    { num: '04.', label: 'SERVICES', id: 'capabilities', chapter: 'CH. III' },
    { num: '05.', label: 'ACTIVITY', id: 'activity', chapter: 'CH. IV' },
    { num: '06.', label: 'CONTACT', id: 'contact', chapter: 'CH. V' },
  ];

  let activeMenuTl: gsap.core.Timeline | null = null;

  const toggleMenu = () => {
    if (isOpen.value) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    if (isOpen.value && !isAnimating.value) return;
    if (activeMenuTl) {
      activeMenuTl.kill();
      activeMenuTl = null;
    }
    previousFocus = captureFocusOrigin();
    isOpen.value = true;
    isAnimating.value = true;
    document.body.style.overflow = 'hidden';
    startClock();

    nextTick(() => {
      closeBtn.value?.focus({ preventScroll: true });
      if (!menuPanel.value) return;

      if (prefersReducedMotion()) {
        gsap.set(menuPanel.value, { clipPath: 'inset(0 0% 0 0)' });
        if (navItemLines.value?.length) gsap.set(navItemLines.value, { yPercent: 0, opacity: 1 });
        if (closeBtn.value) gsap.set(closeBtn.value, { yPercent: 0, opacity: 0.75 });
        if (socialLinks.value) gsap.set(socialLinks.value, { yPercent: 0, opacity: 1 });
        if (contextPanel.value) gsap.set(contextPanel.value, { opacity: 1, x: 0 });
        isAnimating.value = false;
        return;
      }

      // Reset initial states
      gsap.set(menuPanel.value, { clipPath: 'inset(0 100% 0 0)' });
      if (navItemLines.value && navItemLines.value.length) {
        gsap.set(navItemLines.value, { yPercent: 105, opacity: 1 });
      }
      if (closeBtn.value) {
        gsap.set(closeBtn.value, { yPercent: -105, opacity: 0.75 });
      }
      if (socialLinks.value) {
        gsap.set(socialLinks.value, { yPercent: 105, opacity: 0 });
      }
      if (contextPanel.value) {
        gsap.set(contextPanel.value, { opacity: 0, x: 25 });
      }

      activeMenuTl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          isAnimating.value = false;
          activeMenuTl = null;
        },
      });

      // 1. Curtain roll-up / wipe from the left (ala loading screen)
      activeMenuTl.to(menuPanel.value, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.85,
        ease: 'power3.inOut',
      });

      // 2. Reveal Close Button
      if (closeBtn.value) {
        activeMenuTl.to(
          closeBtn.value,
          {
            yPercent: 0,
            duration: 0.7,
            ease: 'power4.out',
          },
          0.18,
        );
      }

      // 3. Staggered reveal for 01. HOME to 05. CONTACT
      if (navItemLines.value && navItemLines.value.length) {
        activeMenuTl.to(
          navItemLines.value,
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power4.out',
          },
          0.22,
        );
      }

      // 4. Reveal Social Links
      if (socialLinks.value) {
        activeMenuTl.to(
          socialLinks.value,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power4.out',
          },
          0.32,
        );
      }

      // 5. Reveal Context Panel (Desktop)
      if (contextPanel.value) {
        activeMenuTl.to(
          contextPanel.value,
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power4.out',
          },
          0.26,
        );
      }
    });
  };

  const closeMenu = (callback?: () => void) => {
    hoveredItem.value = null;
    if (!isOpen.value) {
      callback?.();
      return;
    }
    if (activeMenuTl) {
      activeMenuTl.kill();
      activeMenuTl = null;
    }
    isAnimating.value = true;
    stopClock();

    if (prefersReducedMotion()) {
      isOpen.value = false;
      isAnimating.value = false;
      document.body.style.overflow = '';
      if (callback) {
        callback();
      } else {
        restoreFocusOrigin(previousFocus ?? menuBtn.value);
      }
      previousFocus = null;
      return;
    }

    activeMenuTl = gsap.timeline({
      onComplete: () => {
        isOpen.value = false;
        isAnimating.value = false;
        document.body.style.overflow = '';
        activeMenuTl = null;
        if (callback) {
          callback();
        } else {
          restoreFocusOrigin(previousFocus ?? menuBtn.value);
        }
        previousFocus = null;
      },
    });

    // 1. Text slides cleanly down behind mask & fades
    if (navItemLines.value && navItemLines.value.length) {
      activeMenuTl.to(
        navItemLines.value,
        {
          yPercent: 105,
          opacity: 0,
          duration: 0.25,
          stagger: 0.015,
          ease: 'power3.in',
        },
        0,
      );
    }

    if (closeBtn.value) {
      activeMenuTl.to(closeBtn.value, { yPercent: -105, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0);
    }

    if (socialLinks.value) {
      activeMenuTl.to(socialLinks.value, { yPercent: 105, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0);
    }

    if (contextPanel.value) {
      activeMenuTl.to(contextPanel.value, { opacity: 0, x: 20, duration: 0.2, ease: 'power2.in' }, 0);
    }

    // 2. Curtain rolls back to left (inset(0 100% 0 0))
    if (menuPanel.value) {
      activeMenuTl.to(
        menuPanel.value,
        {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.35,
          ease: 'power3.inOut',
        },
        0.05,
      );
    }
  };

  const navigateTo = (id: string) => {
    closeMenu(() => {
      emit('navigate', id);
    });
  };
</script>
