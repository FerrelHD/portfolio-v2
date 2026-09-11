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
                : (activeSection === 'capabilities'
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
    <div class="flex items-center gap-2 md:hidden">
      <span class="font-serif text-lg tracking-wider font-normal">
        FERREL RASHAD
      </span>
    </div>

    <!-- Desktop Middle Vertical Rail Content: Folio — Edition, FERREL RASHAD (Title font), © 2026 -->
    <div class="relative hidden md:flex flex-1 flex-col items-center justify-between py-8 w-full">
      <!-- Top: FOLIO — EDITION -->
      <span
        class="vt-rl vt-reading-up font-sans text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 whitespace-nowrap cursor-default select-none"
        :class="isDark && !isOpen ? 'text-[#f3eee8]/50' : (isOpen ? 'text-[#f3eee8]/50' : 'text-[#22201e]/50')"
      >
        FOLIO — EDITION
      </span>

      <!-- Center: FERREL RASHAD (Title Font - Instrument Serif) - Perfectly Centered at 50% Midpoint & X-Axis -->
      <div class="absolute inset-x-0 w-full top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <span
          class="vt-rl vt-reading-up font-serif text-[15px] lg:text-[16px] uppercase tracking-[0.18em] font-normal transition-colors duration-500 whitespace-nowrap cursor-default select-none pointer-events-auto"
          :class="isDark && !isOpen ? 'text-[#f3eee8]/90 hover:text-[#f3eee8]' : (isOpen ? 'text-[#f3eee8]/90 hover:text-[#f3eee8]' : 'text-[#22201e]/90 hover:text-[#22201e]')"
        >
          FERREL RASHAD
        </span>
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
           p-6 sm:p-10 md:pt-8 md:pb-10 md:pl-20 md:pr-16 overflow-y-auto will-change-[clip-path]"
    style="clip-path: inset(0 100% 0 0);"
  >
    <!-- Top Right: Pure Serif "CLOSE" Button (Identical to Khanh Nguyen) -->
    <div class="flex justify-end w-full overflow-hidden">
      <button
        ref="closeBtn"
        type="button"
        @click="closeMenu()"
        class="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#faf9f6] opacity-75 hover:opacity-100 transition-opacity cursor-pointer outline-none will-change-transform"
        aria-label="Close navigation menu"
      >
        CLOSE
      </button>
    </div>

    <!-- Center: Giant Editorial Navigation Links with Masked Reveals -->
    <nav class="my-auto py-8 flex flex-col gap-3 sm:gap-5 md:gap-7">
      <div
        v-for="item in navItems"
        :key="item.id"
        class="overflow-hidden cursor-pointer select-none"
        @click="navigateTo(item.id)"
      >
        <!-- GSAP Mask Container (purely handles yPercent entrance and exit) -->
        <div
          ref="navItemLines"
          class="will-change-transform"
        >
          <!-- Interactive Hover Layer (separated from GSAP transform) -->
          <div
            class="group/nav flex items-baseline gap-4 sm:gap-6 md:gap-8 transition-all duration-300 ease-out hover:translate-x-3 sm:hover:translate-x-5"
            :class="activeSection === item.id ? 'opacity-100' : 'opacity-30 hover:opacity-100'"
          >
            <!-- Small Serif Slide Number -->
            <span class="font-serif text-lg sm:text-2xl md:text-3xl text-inherit transition-colors duration-300">
              {{ item.num }}
            </span>
            <!-- Giant Editorial Serif Title + Subtle Dynamic Dash Indicator -->
            <div class="flex items-center gap-4 sm:gap-6">
              <span
                class="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] uppercase tracking-[-0.03em] leading-[0.88] text-inherit transition-colors duration-300"
              >
                {{ item.label }}
              </span>
              <!-- Subtle editorial accent line: active has resting indicator, hover expands smoothly -->
              <span
                class="hidden sm:inline-block h-[2px] bg-white/70 transition-all duration-300 ease-out"
                :class="activeSection === item.id ? 'w-8 bg-white/50 group-hover/nav:w-16' : 'w-0 group-hover/nav:w-14'"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Bottom Right: Social Links (GitHub, LinkedIn, Email only) -->
    <div class="overflow-hidden">
      <div
        ref="socialLinks"
        class="flex items-center justify-end gap-6 sm:gap-8 text-xs sm:text-sm font-sans font-medium text-[#faf9f6]/70 will-change-transform"
      >
        <a
          href="https://github.com/FerrelHD"
          target="_blank"
          rel="noreferrer"
          class="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/ferrel-rashad/"
          target="_blank"
          rel="noreferrer"
          class="hover:text-white transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:ferrelrashadakeyla2014@gmail.com"
          class="hover:text-white transition-colors"
        >
          Email
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import gsap from 'gsap';

  withDefaults(
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
  }>();

  const isOpen = ref(false);
  const isAnimating = ref(false);

  const menuPanel = ref<HTMLElement | null>(null);
  const closeBtn = ref<HTMLElement | null>(null);
  const navItemLines = ref<HTMLElement[]>([]);
  const socialLinks = ref<HTMLElement | null>(null);

  const navItems = [
    { num: '01.', label: 'HOME', id: 'hero' },
    { num: '02.', label: 'ABOUT', id: 'about' },
    { num: '03.', label: 'WORKS', id: 'works' },
    { num: '04.', label: 'CONTACT', id: 'contact' },
  ];

  const toggleMenu = () => {
    if (isAnimating.value) return;
    if (isOpen.value) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    if (isAnimating.value || isOpen.value) return;
    isOpen.value = true;
    isAnimating.value = true;
    document.body.style.overflow = 'hidden';

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

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          isAnimating.value = false;
        },
      });

      // 1. Curtain roll-up / wipe from the left (ala loading screen)
      tl.to(menuPanel.value, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.85,
        ease: 'power3.inOut',
      });

      // 2. Reveal Close Button
      if (closeBtn.value) {
        tl.to(
          closeBtn.value,
          {
            yPercent: 0,
            duration: 0.7,
            ease: 'power4.out',
          },
          0.18,
        );
      }

      // 3. Staggered reveal for 01. HOME to 04. CONTACT
      if (navItemLines.value && navItemLines.value.length) {
        tl.to(
          navItemLines.value,
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power4.out',
          },
          0.22,
        );
      }

      // 4. Reveal Social Links
      if (socialLinks.value) {
        tl.to(
          socialLinks.value,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power4.out',
          },
          0.35,
        );
      }
    });
  };

  const closeMenu = (callback?: () => void) => {
    if (isAnimating.value || !isOpen.value) {
      callback?.();
      return;
    }
    isAnimating.value = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen.value = false;
        isAnimating.value = false;
        document.body.style.overflow = '';
        callback?.();
      },
    });

    // 1. Text slides cleanly down behind mask & fades
    if (navItemLines.value && navItemLines.value.length) {
      tl.to(
        navItemLines.value,
        {
          yPercent: 105,
          opacity: 0,
          duration: 0.35,
          stagger: 0.02,
          ease: 'power3.in',
        },
        0,
      );
    }

    if (closeBtn.value) {
      tl.to(closeBtn.value, { yPercent: -105, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
    }

    if (socialLinks.value) {
      tl.to(socialLinks.value, { yPercent: 105, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
    }

    // 2. Curtain rolls back to left (inset(0 100% 0 0))
    if (menuPanel.value) {
      tl.to(
        menuPanel.value,
        {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.5,
          ease: 'power3.inOut',
        },
        0.08,
      );
    }
  };

  const navigateTo = (id: string) => {
    closeMenu(() => {
      emit('navigate', id);
    });
  };
</script>
