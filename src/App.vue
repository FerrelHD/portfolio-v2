<template>
  <template v-if="isSamsungBrowser">
    <SamsungError />
  </template>

  <!-- Film Grain / Noise Overlay (Applied across ALL sections - Light & Dark, desktop only to avoid mobile GPU lag) -->
  <div
    class="pointer-events-none fixed inset-0 z-[120] hidden md:block opacity-[0.07]"
    :style="{ backgroundImage: `url(${filmGrainUrl})`, backgroundRepeat: 'repeat', backgroundSize: '88px 88px' }"
    aria-hidden="true"
  ></div>

  <!-- Fixed Left Rail Navigation & Frame (Adaptive isDark theme, transparent during intro then solid) -->
  <LeftRail
    :progress="scrollProgress"
    :isDark="isDarkRail"
    :isSolid="isSidebarSolid"
    :activeSection="currentSectionId"
    @navigate="handleNavigate"
    @openArchive="openArchive"
    @openColophon="openColophon"
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
          :activeProjectIndex="activeWorkIndex"
          @openArchive="openArchive"
          @openCaseStudy="openCaseStudy"
          @goToProject="(idx: number) => navigateToSlideIndex(WORKS_START_INDEX + idx)"
        />

        <!-- Slide 6: Chapter III - Capabilities & Workflow (Dark #282523) -->
        <Capabilities ref="capabilitiesRef" />

        <!-- Slide 7: Chapter IV - Tech Stack Builder (Light #faf9f6) -->
        <TechStack ref="techStackRef" />

        <!-- Slide 8: Chapter V - Engineering Activity & 3D Skyline (Dark #23201e) -->
        <Activity ref="activityRef" />

        <!-- Slide 8: Closing - Thank You & Contact (Dark #3A3632) -->
        <Contact
          ref="contactRef"
          @scrollToStart="() => handleNavigate('hero')"
          @openColophon="openColophon"
        />
      </div>
    </div>
  </main>

  <!-- Fullscreen Project Archive Modal (Light Paper Edition) -->
  <ProjectArchive
    :isOpen="isArchiveOpen"
    @close="closeArchive"
    @openCaseStudy="openCaseStudy"
  />

  <!-- Fullscreen Project Case Study View (Option A: The Editorial Longform) -->
  <ProjectDetail
    :projectId="activeCaseStudyId"
    @close="closeCaseStudy"
    @navigate="openCaseStudy"
  />

  <!-- Fullscreen Colophon & Site Architecture Specification Modal -->
  <ColophonModal
    :isOpen="isColophonOpen"
    @close="closeColophon"
  />
</template>

<script setup lang="ts">
  import {
    Hero,
    Works,
    aboutMe,
    Capabilities,
    TechStack,
    Activity,
    Contact,
  } from '@/components/sections';
  import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, watch } from 'vue';
  import { SamsungError } from '@/components/design';
  import LeftRail from './components/common/LeftRail.vue';

  const ProjectArchive = defineAsyncComponent(
    () => import('./components/common/ProjectArchive.vue')
  );
  const ProjectDetail = defineAsyncComponent(
    () => import('./components/common/ProjectDetail.vue')
  );
  const ColophonModal = defineAsyncComponent(
    () => import('./components/common/ColophonModal.vue')
  );
  import { useWindowSize } from '@vueuse/core';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/all';
  import { lenis } from './lenis';
  import { featuredProjects } from '@/data/projects';
  import filmGrainUrl from '@/assets/images/film-grain.png';

  const WORKS_START_INDEX = 2;
  const WORKS_COUNT = featuredProjects.length;
  const WORKS_END_INDEX = WORKS_START_INDEX + WORKS_COUNT - 1;
  const CAPABILITIES_INDEX = WORKS_START_INDEX + WORKS_COUNT;
  const TECH_STACK_INDEX = CAPABILITIES_INDEX + 1;
  const ACTIVITY_INDEX = TECH_STACK_INDEX + 1;
  const CONTACT_INDEX = ACTIVITY_INDEX + 1;
  const TOTAL_SLIDES = CONTACT_INDEX + 1;

  const SLIDE_IDS: string[] = [
    'hero',
    'about',
    ...featuredProjects.map((project, idx) => (idx === 0 ? 'works' : `work-${project.id}`)),
    'capabilities',
    'tech-stack',
    'activity',
    'contact',
  ];

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const { width } = useWindowSize();
  const horizontalPin = ref<HTMLElement | null>(null);
  const horizontalTrack = ref<HTMLElement | null>(null);

  const aboutMeRef = ref<any>(null);
  const worksRef = ref<any>(null);
  const capabilitiesRef = ref<any>(null);
  const techStackRef = ref<any>(null);
  const activityRef = ref<any>(null);
  const contactRef = ref<any>(null);

  const scrollProgress = ref(0);
  const currentSlideIndex = ref(0);
  const isDarkRail = ref(true);
  const isSidebarSolid = ref(false);
  const isArchiveOpen = ref(false);
  const activeCaseStudyId = ref<string | null>(null);
  const isColophonOpen = ref(false);

  const openArchive = () => {
    isArchiveOpen.value = true;
    lenis.stop();
  };

  const closeArchive = () => {
    isArchiveOpen.value = false;
    if (!activeCaseStudyId.value && !isColophonOpen.value) {
      lenis.start();
    }
  };

  const openColophon = () => {
    isColophonOpen.value = true;
    lenis.stop();
    if (window.location.hash !== '#colophon') {
      window.location.hash = 'colophon';
    }
  };

  const closeColophon = () => {
    isColophonOpen.value = false;
    if (!isArchiveOpen.value && !activeCaseStudyId.value) {
      lenis.start();
    }
    if (window.location.hash === '#colophon') {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  const openCaseStudy = (projectId: string) => {
    activeCaseStudyId.value = projectId;
    lenis.stop();
    if (window.location.hash !== `#project/${projectId}`) {
      window.location.hash = `project/${projectId}`;
    }
  };

  const closeCaseStudy = () => {
    activeCaseStudyId.value = null;
    if (!isArchiveOpen.value && !isColophonOpen.value) {
      lenis.start();
    }
    if (window.location.hash.startsWith('#project/')) {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  const syncCaseStudyFromHash = () => {
    const hash = window.location.hash;
    if (hash === '#colophon') {
      isColophonOpen.value = true;
      lenis.stop();
    } else if (hash.startsWith('#project/')) {
      const id = hash.replace('#project/', '');
      if (id && id !== activeCaseStudyId.value) {
        activeCaseStudyId.value = id;
        lenis.stop();
      }
    } else {
      if (isColophonOpen.value) {
        isColophonOpen.value = false;
      }
      if (activeCaseStudyId.value) {
        activeCaseStudyId.value = null;
      }
      if (!isArchiveOpen.value) {
        lenis.start();
      }
    }
  };

  const handleIntroComplete = () => {
    isSidebarSolid.value = true;
  };

  let horizontalScrollTrigger: ScrollTrigger | null = null;
  let cachedScrollAmount = 0;
  const isSamsungBrowser = /samsung/i.test(navigator.userAgent);

  const isDarkSlide = (slideIndex: number) =>
    slideIndex === 0 || slideIndex === CAPABILITIES_INDEX || slideIndex >= ACTIVITY_INDEX;

  const setRailThemeForSlide = (slideIndex: number) => {
    // Hero, Capabilities, Activity, and Contact are Dark; About, Works, and Tech Stack are Light (#faf9f6)
    isDarkRail.value = isDarkSlide(slideIndex);
  };

  const checkRailTheme = () => {
    const vw = width.value || window.innerWidth;
    if (vw >= 768) {
      const scrollAmount = cachedScrollAmount || (horizontalTrack.value ? horizontalTrack.value.scrollWidth - vw : 0);
      if (!scrollAmount) return;
      const trackX = scrollProgress.value * scrollAmount;
      const slideUnderRail = Math.floor((trackX + 64) / vw);
      isDarkRail.value = isDarkSlide(slideUnderRail);
    } else {
      isDarkRail.value = isDarkSlide(currentSlideIndex.value);
    }
  };

  const currentSectionId = computed(() => {
    if (currentSlideIndex.value === 0) return 'hero';
    if (currentSlideIndex.value === 1) return 'about';
    if (currentSlideIndex.value >= WORKS_START_INDEX && currentSlideIndex.value <= WORKS_END_INDEX) return 'works';
    if (currentSlideIndex.value === CAPABILITIES_INDEX) return 'capabilities';
    if (currentSlideIndex.value === TECH_STACK_INDEX) return 'tech-stack';
    if (currentSlideIndex.value === ACTIVITY_INDEX) return 'activity';
    return 'contact';
  });

  const activeWorkIndex = computed<number | null>(() => {
    if (isArchiveOpen.value || activeCaseStudyId.value) {
      return null;
    }
    if (currentSlideIndex.value >= WORKS_START_INDEX && currentSlideIndex.value <= WORKS_END_INDEX) {
      return currentSlideIndex.value - WORKS_START_INDEX;
    }
    return null;
  });

  const triggerSlideAnimation = (index: number) => {
    if (index === 1) {
      aboutMeRef.value?.revealSlide();
    } else if (index >= WORKS_START_INDEX && index <= WORKS_END_INDEX) {
      worksRef.value?.revealSlideIndex(index - WORKS_START_INDEX);
    } else if (index === CAPABILITIES_INDEX) {
      capabilitiesRef.value?.revealSlide();
    } else if (index === TECH_STACK_INDEX) {
      techStackRef.value?.revealSlide();
    } else if (index === ACTIVITY_INDEX) {
      activityRef.value?.revealSlide();
    } else if (index === CONTACT_INDEX) {
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

    const getScrollAmount = () => {
      cachedScrollAmount = track.scrollWidth - window.innerWidth;
      return cachedScrollAmount;
    };

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
  const revealedMobileSlides = new Set<number>();
  const updateMobileSlideState = () => {
    if (window.innerWidth >= 768) return;

    const viewportMiddle = window.innerHeight * 0.5;
    let mostVisibleSlide = 0;
    let minDistance = Infinity;

    SLIDE_IDS.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // Trigger reveal once when section enters visible area on mobile
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0 && !revealedMobileSlides.has(idx)) {
        revealedMobileSlides.add(idx);
        triggerSlideAnimation(idx);
      }

      // Determine active slide index for rail and navigation highlight
      const centerDistance = Math.abs(rect.top + rect.height / 2 - viewportMiddle);
      if (centerDistance < minDistance) {
        minDistance = centerDistance;
        mostVisibleSlide = idx;
      }
    });

    if (mostVisibleSlide !== currentSlideIndex.value) {
      currentSlideIndex.value = mostVisibleSlide;
    }
  };

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
          updateMobileSlideState();
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
    if (window.innerWidth < 768) {
      revealedMobileSlides.add(clampedSlide);
    }
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
      const targetId = SLIDE_IDS[clampedSlide] ?? 'hero';
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
      works: WORKS_START_INDEX,
      capabilities: CAPABILITIES_INDEX,
      'tech-stack': TECH_STACK_INDEX,
      activity: ACTIVITY_INDEX,
      contact: CONTACT_INDEX,
    };

    const targetSlide = slideTargets[sectionId] ?? 0;
    navigateToSlideIndex(targetSlide);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isArchiveOpen.value || activeCaseStudyId.value || isColophonOpen.value) return;
    if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;

    const target = e.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, canvas')) return;
    if (e.key === ' ' && target?.closest('button, a, summary, [role="button"], [tabindex]')) return;

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
    window.addEventListener('popstate', syncCaseStudyFromHash);
    window.addEventListener('hashchange', syncCaseStudyFromHash);
    syncCaseStudyFromHash();

    setTimeout(() => {
      initHorizontalScroll();
      ScrollTrigger.refresh();
      if (horizontalScrollTrigger) {
        updateSlideIndex(horizontalScrollTrigger.progress);
      } else {
        updateMobileSlideState();
      }
      checkRailTheme();
    }, 150);
  });

  onUnmounted(() => {
    lenis.off('scroll', ScrollTrigger.update);
    gsap.ticker.remove(onTickerUpdate);
    window.removeEventListener('scroll', onWindowScroll);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('popstate', syncCaseStudyFromHash);
    window.removeEventListener('hashchange', syncCaseStudyFromHash);
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
