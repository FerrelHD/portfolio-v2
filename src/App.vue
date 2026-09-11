<template>
  <template v-if="isSamsungBrowser">
    <SamsungError />
  </template>

  <!-- Film Grain / Noise Overlay (Applied across ALL sections - Light & Dark) -->
  <div class="pointer-events-none fixed inset-0 z-[120] overflow-hidden" aria-hidden="true">
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

  <Cursor />

  <!-- Fixed Left Rail Navigation & Frame (Adaptive isDark theme, transparent during intro then solid) -->
  <LeftRail
    :progress="scrollProgress"
    :isDark="isDarkRail"
    :isSolid="isSidebarSolid"
    :activeSection="currentSectionId"
    @navigate="handleNavigate"
  />

  <!-- Main Viewport Container (Desktop Horizontal Pinned Track, Mobile Vertical Stack) -->
  <main class="relative min-h-full bg-[#3A3632]">
    <div
      ref="horizontalPin"
      class="relative w-full md:h-dvh overflow-hidden"
    >
      <div
        ref="horizontalTrack"
        class="flex w-full flex-col md:h-dvh md:flex-row md:flex-nowrap will-change-transform"
      >
        <!-- Slide 0: Hero (Dark #22201e) -->
        <Hero
          ref="heroRef"
          @scrollNext="() => handleNavigate('about')"
          @introComplete="handleIntroComplete"
        />

        <!-- Slide 1: Chapter I - Quick Intro (Light #faf9f6) -->
        <aboutMe ref="aboutMeRef" />

        <!-- Slides 2, 3, 4, 5: Chapter II - 4 Project Slides (Light #faf9f6) -->
        <Works ref="worksRef" />

        <!-- Slide 6: Chapter III - Capabilities & Workflow (Light #faf9f6) -->
        <Capabilities ref="capabilitiesRef" />

        <!-- Slide 7: Closing - Thank You & Contact (Dark #22201e) -->
        <Contact ref="contactRef" @scrollToStart="() => handleNavigate('hero')" />
      </div>
    </div>
  </main>
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
  import { SamsungError, Cursor } from '@/components/design';
  import { LeftRail } from './components/common';
  import { useWindowSize } from '@vueuse/core';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/all';
  import { raf } from './lenis';

  gsap.registerPlugin(ScrollTrigger);

  const { width, height } = useWindowSize();
  const horizontalPin = ref<HTMLElement | null>(null);
  const horizontalTrack = ref<HTMLElement | null>(null);

  const heroRef = ref<any>(null);
  const aboutMeRef = ref<any>(null);
  const worksRef = ref<any>(null);
  const capabilitiesRef = ref<any>(null);
  const contactRef = ref<any>(null);

  const scrollProgress = ref(0);
  const currentSlideIndex = ref(0);
  const isDarkRail = ref(true);
  const isSidebarSolid = ref(false);

  const handleIntroComplete = () => {
    isSidebarSolid.value = true;
  };

  let horizontalScrollTrigger: ScrollTrigger | null = null;
  const isSamsungBrowser = /samsung/i.test(navigator.userAgent);

  const checkRailTheme = () => {
    const heroEl = document.getElementById('hero');
    const capEl = document.getElementById('capabilities');
    const contactEl = document.getElementById('contact');
    if (!heroEl || !contactEl) return;

    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const railWidth = 64;
      const heroRight = heroEl.getBoundingClientRect().right;
      const capLeft = capEl ? capEl.getBoundingClientRect().left : 9999;
      const capRight = capEl ? capEl.getBoundingClientRect().right : -9999;
      const contactLeft = contactEl.getBoundingClientRect().left;

      // Dark if Hero covers rail, or Chapter III (Capabilities) covers rail, or Contact has reached rail
      if (heroRight > railWidth) {
        isDarkRail.value = true;
      } else if (capLeft <= railWidth && capRight > 0) {
        isDarkRail.value = true;
      } else if (contactLeft <= railWidth) {
        isDarkRail.value = true;
      } else {
        isDarkRail.value = false;
      }
    } else {
      const railHeight = 56;
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const capTop = capEl ? capEl.getBoundingClientRect().top : 9999;
      const capBottom = capEl ? capEl.getBoundingClientRect().bottom : -9999;
      const contactTop = contactEl.getBoundingClientRect().top;

      if (heroBottom > railHeight) {
        isDarkRail.value = true;
      } else if (capTop <= railHeight && capBottom > 0) {
        isDarkRail.value = true;
      } else if (contactTop <= railHeight) {
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
        horizontalScrollTrigger.kill();
        horizontalScrollTrigger = null;
        gsap.set(horizontalTrack.value, { clearProps: 'all' });
      }
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

  const onWindowScroll = () => {
    if (window.innerWidth < 768) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      scrollProgress.value = progress;
      if (progress > 0.01) {
        isSidebarSolid.value = true;
      }
      updateSlideIndex(progress);
      checkRailTheme();
    }
  };

  const handleNavigate = (sectionId: string) => {
    isSidebarSolid.value = true;
    const slideTargets: Record<string, number> = {
      hero: 0,
      about: 1,
      works: 2,
      capabilities: 6,
      contact: 7,
    };

    const targetSlide = slideTargets[sectionId] ?? 0;

    if (window.innerWidth >= 768 && horizontalScrollTrigger) {
      const targetRatio = targetSlide / (TOTAL_SLIDES - 1);
      const targetScroll =
        horizontalScrollTrigger.start +
        targetRatio * (horizontalScrollTrigger.end - horizontalScrollTrigger.start);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  watch([width, height], () => {
    initHorizontalScroll();
    ScrollTrigger.refresh();
    checkRailTheme();
  });

  onMounted(() => {
    requestAnimationFrame(raf);
    window.addEventListener('scroll', onWindowScroll, { passive: true });

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
    window.removeEventListener('scroll', onWindowScroll);
    if (horizontalScrollTrigger) {
      horizontalScrollTrigger.kill();
    }
  });
</script>

<style>
  html, body {
    background-color: #3A3632;
  }
</style>
