<template>
  <template v-if="isSamsungBrowser">
    <SamsungError />
  </template>

  <!-- Film Grain / Noise Overlay (Applied across ALL sections - Light & Dark, desktop only to avoid mobile GPU lag) -->
  <div class="pointer-events-none fixed inset-0 z-[120] overflow-hidden hidden md:block" aria-hidden="true">
    <svg
      class="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      style="opacity: 0.08;"
    >
      <filter id="film-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-grain)" />
    </svg>
  </div>

  <!-- Fixed Left Rail Navigation & Frame (Adaptive isDark theme, transparent during intro then solid) -->
  <LeftRail
    :progress="scrollProgress"
    :isDark="isDarkRail"
    :isSolid="isSidebarSolid"
    :activeSection="currentSectionId"
    @navigate="handleNavigate"
    @openArchive="openArchive"
  />

  <!-- Main Viewport Container (Desktop Horizontal Pinned Track, Mobile Vertical Stack) -->
  <main class="relative min-h-full bg-[#3A3632]">
    <div
      ref="horizontalPin"
      class="relative w-full md:h-dvh overflow-hidden"
    >
      <div
        ref="horizontalTrack"
        class="flex w-full flex-col md:h-dvh md:flex-row md:flex-nowrap md:will-change-transform"
      >
        <!-- Slide 0: Hero (Dark #22201e) -->
        <Hero
          @scrollNext="() => handleNavigate('about')"
          @introComplete="handleIntroComplete"
        />

        <!-- Slide 1: Chapter I - Quick Intro (Light #faf9f6) -->
        <aboutMe ref="aboutMeRef" />

        <!-- Slides 2, 3, 4, 5: Chapter II - 4 Project Slides (Light #faf9f6) -->
        <Works
          ref="worksRef"
          @openArchive="openArchive"
          @goToProject="(idx: number) => navigateToSlideIndex(2 + idx)"
        />

        <!-- Slide 6: Chapter III - Capabilities & Workflow (Light #faf9f6) -->
        <Capabilities ref="capabilitiesRef" />

        <!-- Slide 7: Closing - Thank You & Contact (Dark #22201e) -->
        <Contact ref="contactRef" @scrollToStart="() => handleNavigate('hero')" />
      </div>
    </div>
  </main>

  <!-- Fullscreen Project Archive Modal (Light Paper Edition) -->
  <ProjectArchive :isOpen="isArchiveOpen" @close="closeArchive" />
</template>

<script setup lang="ts">
  import {
    Hero,
    Works,
    aboutMe,
    Capabilities,
    Contact,
  } from '@/components/sections';
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
  import { SamsungError } from '@/components/design';
  import { LeftRail, ProjectArchive } from './components/common';
  import { useWindowSize } from '@vueuse/core';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/all';
  import { lenis } from './lenis';

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const { width } = useWindowSize();
  const horizontalPin = ref<HTMLElement | null>(null);
  const horizontalTrack = ref<HTMLElement | null>(null);

  const aboutMeRef = ref<any>(null);
  const worksRef = ref<any>(null);
  const capabilitiesRef = ref<any>(null);
  const contactRef = ref<any>(null);

  const scrollProgress = ref(0);
  const currentSlideIndex = ref(0);
  const isDarkRail = ref(true);
  const isSidebarSolid = ref(false);
  const isArchiveOpen = ref(false);

  const openArchive = () => {
    isArchiveOpen.value = true;
    lenis.stop();
  };

  const closeArchive = () => {
    isArchiveOpen.value = false;
    lenis.start();
  };

  const handleIntroComplete = () => {
    isSidebarSolid.value = true;
  };

  let horizontalScrollTrigger: ScrollTrigger | null = null;
  const isSamsungBrowser = /samsung/i.test(navigator.userAgent);

  const setRailThemeForSlide = (slideIndex: number) => {
    // Slide 0 (Hero), Slide 6 (Capabilities), Slide 7 (Contact) are Dark
    // Slides 1-5 (About, Works 1-4) are Light (#faf9f6)
    if (slideIndex === 0 || slideIndex >= 6) {
      isDarkRail.value = true;
    } else {
      isDarkRail.value = false;
    }
  };

  const checkRailTheme = () => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const heroEl = document.getElementById('hero');
      const capEl = document.getElementById('capabilities');
      const contactEl = document.getElementById('contact');
      if (!heroEl || !contactEl) return;

      const railWidth = 64;
      const heroRight = heroEl.getBoundingClientRect().right;
      const capLeft = capEl ? capEl.getBoundingClientRect().left : 9999;
      const capRight = capEl ? capEl.getBoundingClientRect().right : -9999;
      const contactLeft = contactEl.getBoundingClientRect().left;

      // Dark if Hero covers rail, or Chapter III (Capabilities) covers rail, or Contact has reached rail
      if (heroRight > railWidth + 5) {
        isDarkRail.value = true;
      } else if (capLeft <= railWidth && capRight > 5) {
        isDarkRail.value = true;
      } else if (contactLeft <= railWidth + 5) {
        isDarkRail.value = true;
      } else {
        isDarkRail.value = false;
      }
    } else {
      const railHeight = 56;
      const heroEl = document.getElementById('hero');
      const capEl = document.getElementById('capabilities');
      const contactEl = document.getElementById('contact');
      if (!heroEl || !contactEl) return;

      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const capTop = capEl ? capEl.getBoundingClientRect().top : 9999;
      const capBottom = capEl ? capEl.getBoundingClientRect().bottom : -9999;
      const contactTop = contactEl.getBoundingClientRect().top;

      if (heroBottom > railHeight + 5) {
        isDarkRail.value = true;
      } else if (capTop <= railHeight && capBottom > 5) {
        isDarkRail.value = true;
      } else if (contactTop <= railHeight + 5) {
        isDarkRail.value = true;
      } else {
        isDarkRail.value = false;
      }
    }
  };

  const currentSectionId = computed(() => {
    if (currentSlideIndex.value === 0) return 'hero';
    if (currentSlideIndex.value === 1) return 'about';
    if (currentSlideIndex.value >= 2 && currentSlideIndex.value <= 5) return 'works';
    if (currentSlideIndex.value === 6) return 'capabilities';
    return 'contact';
  });

  const TOTAL_SLIDES = 8;

  const triggerSlideAnimation = (index: number) => {
    if (index === 1) {
      aboutMeRef.value?.revealSlide();
    } else if (index >= 2 && index <= 5) {
      worksRef.value?.revealSlideIndex(index - 2);
    } else if (index === 6) {
      capabilitiesRef.value?.revealSlide();
    } else if (index === 7) {
      contactRef.value?.revealSlide();
    }
  };

  const updateSlideIndex = (progress: number) => {
    const rawIndex = Math.round(progress * (TOTAL_SLIDES - 1));
    const clampedIndex = Math.min(TOTAL_SLIDES - 1, Math.max(0, rawIndex));
    if (clampedIndex !== currentSlideIndex.value) {
      currentSlideIndex.value = clampedIndex;
      triggerSlideAnimation(clampedIndex);
    }
  };

  const initHorizontalScroll = () => {
    if (!horizontalPin.value || !horizontalTrack.value) return;

    if (window.innerWidth < 768) {
      if (horizontalScrollTrigger) {
        horizontalScrollTrigger.kill(true);
        horizontalScrollTrigger = null;
        gsap.set(horizontalTrack.value, { clearProps: 'all' });
        gsap.set(horizontalPin.value, { clearProps: 'all' });
      }
      return;
    }

    // If horizontal scroll is already initialized on desktop, refresh instead of recreating
    if (horizontalScrollTrigger) {
      ScrollTrigger.refresh();
      return;
    }

    const track = horizontalTrack.value;
    const pin = horizontalPin.value;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgress.value = self.progress;
          if (self.progress > 0.01) {
            isSidebarSolid.value = true;
          }
          updateSlideIndex(self.progress);
          checkRailTheme();
        },
      },
    });

    horizontalScrollTrigger = tween.scrollTrigger as ScrollTrigger;
  };

  let scrollTicking = false;
  const onWindowScroll = () => {
    if (window.innerWidth < 768) {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const progress = max > 0 ? window.scrollY / max : 0;
          scrollProgress.value = progress;
          if (progress > 0.01) {
            isSidebarSolid.value = true;
          }
          updateSlideIndex(progress);
          checkRailTheme();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }
  };

  const navigateToSlideIndex = (targetSlide: number) => {
    isSidebarSolid.value = true;
    const clampedSlide = Math.min(TOTAL_SLIDES - 1, Math.max(0, targetSlide));
    currentSlideIndex.value = clampedSlide;
    setRailThemeForSlide(clampedSlide);
    triggerSlideAnimation(clampedSlide);

    if (window.innerWidth >= 768 && horizontalScrollTrigger) {
      const targetRatio = clampedSlide / (TOTAL_SLIDES - 1);
      const targetScroll =
        horizontalScrollTrigger.start +
        targetRatio * (horizontalScrollTrigger.end - horizontalScrollTrigger.start);

      lenis.scrollTo(targetScroll, {
        duration: 1.0,
        onComplete: () => {
          checkRailTheme();
        },
      });
    } else {
      const slideIds = [
        'hero',
        'about',
        'works',
        'work-ecobite',
        'work-fersya-shop',
        'work-student-life',
        'capabilities',
        'contact',
      ];
      const targetId = slideIds[clampedSlide] ?? 'hero';
      const el = document.getElementById(targetId);
      if (el) {
        lenis.scrollTo(el, {
          duration: 0.9,
          offset: -56,
          onComplete: () => {
            checkRailTheme();
          },
        });
      }
    }
  };

  const handleNavigate = (sectionId: string) => {
    const slideTargets: Record<string, number> = {
      hero: 0,
      about: 1,
      works: 2,
      capabilities: 6,
      contact: 7,
    };

    const targetSlide = slideTargets[sectionId] ?? 0;
    navigateToSlideIndex(targetSlide);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isArchiveOpen.value) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

    if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) {
      if (currentSlideIndex.value < TOTAL_SLIDES - 1) {
        e.preventDefault();
        navigateToSlideIndex(currentSlideIndex.value + 1);
      }
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
      if (currentSlideIndex.value > 0) {
        e.preventDefault();
        navigateToSlideIndex(currentSlideIndex.value - 1);
      }
    }
  };

  let wasDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  let prevWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  watch(width, (newWidth) => {
    if (newWidth === prevWidth) return;
    prevWidth = newWidth;

    const isDesktop = newWidth >= 768;

    if (isDesktop !== wasDesktop) {
      wasDesktop = isDesktop;
      if (!isDesktop && horizontalScrollTrigger) {
        horizontalScrollTrigger.kill(true);
        horizontalScrollTrigger = null;
        if (horizontalTrack.value) gsap.set(horizontalTrack.value, { clearProps: 'all' });
        if (horizontalPin.value) gsap.set(horizontalPin.value, { clearProps: 'all' });
      } else if (isDesktop && !horizontalScrollTrigger) {
        initHorizontalScroll();
      }
    }

    if (isDesktop) {
      ScrollTrigger.refresh();
    }
    checkRailTheme();
  });

  const onTickerUpdate = (time: number) => {
    lenis.raf(time * 1000);
  };

  onMounted(() => {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTickerUpdate);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    setTimeout(() => {
      initHorizontalScroll();
      ScrollTrigger.refresh();
      if (horizontalScrollTrigger) {
        updateSlideIndex(horizontalScrollTrigger.progress);
      }
      checkRailTheme();
    }, 150);
  });

  onUnmounted(() => {
    lenis.off('scroll', ScrollTrigger.update);
    gsap.ticker.remove(onTickerUpdate);
    window.removeEventListener('scroll', onWindowScroll);
    window.removeEventListener('keydown', handleKeyDown);
    if (horizontalScrollTrigger) {
      horizontalScrollTrigger.kill(true);
    }
  });
</script>

<style>
  html, body {
    background-color: #3A3632;
  }
</style>
