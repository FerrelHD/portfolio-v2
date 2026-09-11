<template>
  <section
    id="capabilities"
    class="shrink-0 w-full md:w-screen h-svh md:h-dvh flex flex-col md:flex-row items-stretch select-none
           bg-[#282523] text-[#faf9f6] relative overflow-hidden
           pt-14 pb-6 px-6 md:pt-0 md:pb-0 md:pl-16 md:pr-0 font-sans"
  >
    <!-- Left Column: Chapter III Title & "What I do?" Statement -->
    <div
      class="w-full md:w-[280px] lg:w-[340px] xl:w-[400px] shrink-0 flex flex-col justify-between
             p-0 md:p-6 lg:p-8 xl:p-10 md:pt-14 md:pb-12 mb-8 md:mb-0"
    >
      <!-- Top: CHAPTER III Heading -->
      <div class="overflow-hidden">
        <h2
          ref="chapterTitle"
          class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#faf9f6] uppercase leading-none will-change-transform"
        >
          CHAPTER III
        </h2>
      </div>

      <!-- Bottom: WHAT I DO? & Mission Statement -->
      <div class="flex flex-col gap-3 md:gap-4 mt-6 md:mt-auto">
        <span class="font-sans text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] text-[#faf9f6]/60 font-medium">
          WHAT I DO?
        </span>
        <p class="font-sans text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-normal leading-[1.3] text-[#faf9f6] max-w-sm">
          Designing digital experiences with clarity, structure, and intention.
        </p>
      </div>
    </div>

    <!-- Right Side: 3 Capabilities Columns with Bottom-to-Top Image Reveal on Hover -->
    <div class="flex flex-col md:flex-row flex-1 items-stretch overflow-hidden">
      <article
        v-for="(item, index) in capabilityItems"
        :key="item.num"
        ref="columnRefs"
        @pointerenter="onMouseEnter(index)"
        @pointerleave="onMouseLeave(index)"
        class="relative flex-1 flex flex-col justify-between
               px-5 py-6 sm:px-6 sm:py-7 md:px-5 md:py-8 lg:px-7 lg:py-10 xl:px-9 xl:py-12
               border-t md:border-t-0 md:border-l border-white/10
               overflow-hidden cursor-pointer group select-none"
      >
        <!-- Background Reveal Media Layer (Wipe reveal from bottom to top) -->
        <div
          class="service-bg-reveal absolute inset-0 -z-0 overflow-hidden pointer-events-none will-change-[clip-path]"
          style="clip-path: inset(100% 0% 0% 0%);"
        >
          <!-- Darkened Contrast Layer -->
          <div class="absolute inset-0 bg-[#1a1816]/70 z-10"></div>
          <!-- Background Image -->
          <img
            :src="item.image"
            :alt="item.name"
            class="service-bg-media size-full object-cover object-center scale-105 will-change-transform"
            loading="lazy"
          />
        </div>

        <!-- Top: Huge Serif Number -->
        <div class="relative z-10 overflow-hidden">
          <span
            class="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-none text-[#faf9f6] inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
          >
            {{ item.num }}
          </span>
        </div>

        <!-- Middle: Editorial Serif Title (Responsive scaling, never breaks words awkwardly) -->
        <div class="relative z-10 my-auto py-5 sm:py-6 md:py-6 lg:py-8">
          <h3
            class="font-serif text-xl sm:text-2xl md:text-[24px] lg:text-[28px] xl:text-[34px] 2xl:text-[38px] uppercase tracking-[-0.01em] leading-[1.1] text-[#faf9f6] transition-transform duration-500 ease-out group-hover:translate-x-1.5 break-normal"
          >
            {{ item.name }}
          </h3>
        </div>

        <!-- Bottom: Descriptive Paragraph -->
        <div class="relative z-10">
          <p
            class="font-sans text-xs sm:text-sm md:text-sm lg:text-base leading-[145%] text-[#faf9f6]/75 max-w-sm transition-colors duration-300 group-hover:text-[#faf9f6]"
          >
            {{ item.desc }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import gsap from 'gsap';
  import {
    indonesianCrustalObservatoryImg,
    spiderDevImg,
    fersyaShopImg,
  } from '@/assets/images';

  interface CapabilityItem {
    num: string;
    name: string;
    image: string;
    desc: string;
  }

  const capabilityItems: CapabilityItem[] = [
    {
      num: '01',
      name: 'Frontend Engineering',
      image: indonesianCrustalObservatoryImg,
      desc: 'High-speed web platforms with React 19, Next.js 15, Vue, TypeScript, and GSAP. Type-safe APIs, responsive design, and 60 FPS motion.',
    },
    {
      num: '02',
      name: 'Creative Development',
      image: spiderDevImg,
      desc: 'Tailored GSAP choreographies, Canvas 2D telemetry, Three.js visualizations, and Web Audio — designed for cinematic impact.',
    },
    {
      num: '03',
      name: 'Full-Stack Architecture',
      image: fersyaShopImg,
      desc: 'End-to-end systems with Laravel, PostgreSQL, real-time APIs, and zero-downtime deployments. Clean, maintainable codebases.',
    },
  ];

  const chapterTitle = ref<HTMLElement | null>(null);
  const columnRefs = ref<HTMLElement[]>([]);

  // Hover Entrance: Bottom-to-Top Reveal Animation
  const onMouseEnter = (index: number) => {
    const col = columnRefs.value[index];
    if (!col) return;
    const revealLayer = col.querySelector('.service-bg-reveal');
    const mediaImg = col.querySelector('.service-bg-media');
    if (!revealLayer || !mediaImg) return;

    gsap.killTweensOf([revealLayer, mediaImg]);
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .to(revealLayer, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8 }, 0)
      .to(mediaImg, { yPercent: -4, duration: 0.8 }, 0);
  };

  // Hover Exit: Upward Sweep Wipe Out
  const onMouseLeave = (index: number) => {
    const col = columnRefs.value[index];
    if (!col) return;
    const revealLayer = col.querySelector('.service-bg-reveal');
    const mediaImg = col.querySelector('.service-bg-media');
    if (!revealLayer || !mediaImg) return;

    gsap.killTweensOf([revealLayer, mediaImg]);
    gsap
      .timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set(revealLayer, { clipPath: 'inset(100% 0% 0% 0%)' });
          gsap.set(mediaImg, { yPercent: 4 });
        },
      })
      .to(revealLayer, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65 }, 0)
      .to(mediaImg, { yPercent: -8, duration: 0.65 }, 0);
  };

  const revealSlide = () => {
    if (chapterTitle.value) {
      gsap.fromTo(chapterTitle.value, { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: 'power3.out' });
    }
  };

  onMounted(() => {
    if (chapterTitle.value) gsap.set(chapterTitle.value, { yPercent: 105 });
    columnRefs.value.forEach((col) => {
      const revealLayer = col.querySelector('.service-bg-reveal');
      const mediaImg = col.querySelector('.service-bg-media');
      if (revealLayer) gsap.set(revealLayer, { clipPath: 'inset(100% 0% 0% 0%)' });
      if (mediaImg) gsap.set(mediaImg, { yPercent: 4 });
    });
  });

  defineExpose({
    revealSlide,
  });
</script>
