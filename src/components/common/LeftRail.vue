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
      type="button"
      @click="toggleMenu"
      class="group relative flex size-10 md:size-auto md:h-16 md:w-full items-center justify-center transition-all duration-300 cursor-pointer outline-none md:border-b select-none"
      :class="[
        isDark || isOpen
          ? 'text-[#f3eee8] hover:text-white md:border-white/10 hover:bg-white/[0.04]'
          : 'text-[#22201e] hover:text-black md:border-black/10 hover:bg-black/[0.03]'
      ]"
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
      class="flex items-center gap-2 md:hidden cursor-pointer outline-none select-none transition-opacity hover:opacity-80"
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
        :class="isDark && !isOpen ? 'text-[#f3eee8]/50' : (isOpen ? 'text-[#f3eee8]/50' : 'text-[#22201e]/50')"
      >
        FOLIO — EDITION
      </span>

      <!-- Center: FERREL RASHAD - Matches FOLIO — EDITION size (10px) and tracking -->
      <div class="absolute inset-x-0 w-full top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <button
          type="button"
          @click="navigateTo('hero')"
          class="vt-rl vt-reading-up font-sans text-[10px] uppercase tracking-[0.22em] font-medium transition-colors duration-500 whitespace-nowrap cursor-pointer select-none pointer-events-auto outline-none"
          :class="isDark && !isOpen ? 'text-[#f3eee8]/80 hover:text-[#f3eee8]' : (isOpen ? 'text-[#f3eee8]/80 hover:text-[#f3eee8]' : 'text-[#22201e]/80 hover:text-[#22201e]')"
          aria-label="Back to home"
        >
          FERREL RASHAD
        </button>
      </div>

      <!-- Bottom: Copyright Year -->
      <span
        class="vt-rl vt-reading-up font-sans text-[10px] tracking-[0.2em] tabular-nums uppercase transition-colors duration-500 cursor-default select-none"
        :class="isDark && !isOpen ? 'text-[#f3eee8]/50' : (isOpen ? 'text-[#f3eee8]/50' : 'text-[#22201e]/50')"
      >
        © 2026
      </span>
    </div>

    <!-- Mobile Right: Copyright -->
    <div class="flex items-center md:hidden">
      <span
        class="font-sans text-[10px] tracking-widest uppercase transition-colors duration-500 cursor-default"
        :class="isDark ? 'text-[#f3eee8]/50' : 'text-[#22201e]/50'"
      >
        © 2026
      </span>
    </div>
  </header>

  <!-- Fullscreen Editorial Menu (Khanh Nguyen Style: Left Curtain Roll-Up + Staggered Line Reveals) -->
  <div
    v-if="isOpen"
    ref="menuPanel"
    class="fixed inset-y-0 right-0 left-0 md:left-16 z-[95] flex flex-col justify-between
           bg-[#24211e] text-[#faf9f6] select-none
           px-6 pt-20 pb-6 sm:p-10 md:pt-8 md:pb-10 md:pl-20 md:pr-16 overflow-y-auto will-change-[clip-path]"
    style="clip-path: inset(0 100% 0 0);"
  >
    <!-- Top Right: Pure Serif "CLOSE" Button (Identical to Khanh Nguyen) -->
    <div class="flex justify-end w-full overflow-hidden">
      <button
        ref="closeBtn"
        type="button"
        @click="closeMenu()"
        class="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#faf9f6] opacity-75 hover:opacity-100 transition-opacity cursor-pointer outline-none will-change-transform min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
        aria-label="Close navigation menu"
      >
        CLOSE
      </button>
    </div>

    <!-- Center: Split Editorial Layout (Left: Menu Links, Right: Dynamic Context Panel) -->
    <div class="my-auto py-4 sm:py-6 md:py-6 lg:py-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
      <!-- Left Column: Giant Editorial Navigation Links with Masked Reveals -->
      <nav class="md:col-span-7 flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 lg:gap-5 xl:gap-6">
        <div
          v-for="item in navItems"
          :key="item.id"
          class="overflow-hidden cursor-pointer select-none"
          @click="navigateTo(item.id)"
          @mouseenter="hoveredItem = item.id"
          @mouseleave="hoveredItem = null"
        >
          <!-- GSAP Mask Container (purely handles yPercent entrance and exit) -->
          <div
            ref="navItemLines"
            class="will-change-transform"
          >
            <!-- Interactive Hover Layer (separated from GSAP transform) -->
            <div
              class="group/nav flex items-baseline gap-3 sm:gap-5 md:gap-6 lg:gap-8 transition-all duration-300 ease-out hover:translate-x-2 sm:hover:translate-x-4"
              :class="activeSection === item.id || hoveredItem === item.id ? 'opacity-100' : 'opacity-30 hover:opacity-100'"
            >
              <!-- Small Serif Slide Number -->
              <span class="font-serif text-base sm:text-xl md:text-2xl lg:text-[26px] text-inherit transition-colors duration-300">
                {{ item.num }}
              </span>
              <!-- Giant Editorial Serif Title + Chapter Sub-badge + Dynamic Dash Indicator -->
              <div class="flex items-center gap-3 sm:gap-5 lg:gap-6">
                <span
                  class="font-serif text-3xl sm:text-6xl md:text-[50px] lg:text-[62px] xl:text-[72px] 2xl:text-[5vw] uppercase tracking-[-0.03em] leading-[0.9] text-inherit transition-colors duration-300"
                >
                  {{ item.label }}
                </span>
                <!-- Chapter Sub-badge -->
                <span class="hidden sm:inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-[#faf9f6]/40 transition-colors group-hover/nav:text-[#faf9f6]/75">
                  {{ item.chapter }}
                </span>
                <!-- Subtle editorial accent line: active has resting indicator, hover expands smoothly -->
                <span
                  class="hidden sm:inline-block h-[2px] bg-white/70 transition-all duration-300 ease-out"
                  :class="activeSection === item.id ? 'w-6 lg:w-8 bg-white/50 group-hover/nav:w-10 lg:group-hover/nav:w-12' : 'w-0 group-hover/nav:w-8 lg:group-hover/nav:w-10'"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Right Column: Editorial Context & Live Status Panel (Desktop Only) -->
      <aside
        ref="contextPanel"
        class="hidden md:flex md:col-span-5 flex-col justify-between self-stretch py-2 pl-6 lg:pl-10 border-l border-white/10 will-change-transform"
      >
        <!-- Top Metadata: Live Jakarta Time & Availability Badge -->
        <div class="flex flex-col gap-3 pb-6 border-b border-white/10">
          <div class="flex items-center justify-between">
            <span class="font-sans text-[11px] uppercase tracking-[0.2em] text-[#faf9f6]/50">
              LOCAL TIME
            </span>
            <span class="font-sans text-xs uppercase tracking-wider text-[#faf9f6]/80 tabular-nums">
              JAKARTA · {{ currentTime }} WIB
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-sans text-[11px] uppercase tracking-[0.2em] text-[#faf9f6]/50">
              STATUS
            </span>
            <span class="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#faf9f6]/90">
              <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              OPEN FOR WORK
            </span>
          </div>
        </div>

        <!-- Middle Dynamic Context Card -->
        <div class="my-auto py-6 flex flex-col gap-3 transition-opacity duration-300">
          <div class="overflow-hidden">
            <span class="font-sans text-xs uppercase tracking-[0.22em] text-[#faf9f6]/50 block">
              {{ activeContext.chapter }}
            </span>
          </div>
          <h4 class="font-sans font-bold text-xl lg:text-2xl text-[#faf9f6] tracking-tight leading-snug">
            {{ activeContext.title }}
          </h4>
          <p class="font-sans text-xs lg:text-sm text-[#faf9f6]/70 leading-relaxed max-w-sm">
            {{ activeContext.desc }}
          </p>
        </div>

        <!-- Bottom Micro Hint -->
        <div class="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#faf9f6]/35">
          <span>{{ activeContext.meta }}</span>
          <span>FOLIO 2026</span>
        </div>
      </aside>
    </div>

    <!-- Bottom Row: Left Archive Link & Colophon, Right Social Links -->
    <div class="overflow-hidden pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-3 sm:gap-5">
        <button
          type="button"
          @click="openArchiveModal"
          class="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#faf9f6]/75 hover:text-white transition-colors cursor-pointer outline-none min-h-[44px]"
        >
          <span class="border-b border-white/20 group-hover:border-white transition-colors">All Works Archive (10+)</span>
          <span class="font-serif italic text-sm inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>

        <span class="text-white/20 text-xs hidden sm:inline">/</span>

        <button
          type="button"
          @click="openColophonModal"
          class="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#faf9f6]/75 hover:text-white transition-colors cursor-pointer outline-none min-h-[44px]"
        >
          <span class="border-b border-white/20 group-hover:border-white transition-colors">Colophon & Specs</span>
          <span class="font-serif italic text-sm inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>
      </div>

      <div
        ref="socialLinks"
        class="flex items-center justify-end gap-6 sm:gap-8 text-xs sm:text-sm font-sans font-medium text-[#faf9f6]/70 will-change-transform"
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
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
  import gsap from 'gsap';

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

  const menuPanel = ref<HTMLElement | null>(null);
  const closeBtn = ref<HTMLElement | null>(null);
  const navItemLines = ref<HTMLElement[]>([]);
  const socialLinks = ref<HTMLElement | null>(null);
  const contextPanel = ref<HTMLElement | null>(null);

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

  onMounted(() => {
    // Clock is only ticked when navigation menu is actually open
  });

  onUnmounted(() => {
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
      meta: '4 FEATURED · ARCHIVE',
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
    isOpen.value = true;
    isAnimating.value = true;
    document.body.style.overflow = 'hidden';
    startClock();

    nextTick(() => {
      if (!menuPanel.value) return;

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

    activeMenuTl = gsap.timeline({
      onComplete: () => {
        isOpen.value = false;
        isAnimating.value = false;
        document.body.style.overflow = '';
        activeMenuTl = null;
        callback?.();
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
