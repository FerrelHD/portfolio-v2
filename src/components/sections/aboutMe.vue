<template>
  <section
    id="about"
    class="shrink-0 w-full md:w-screen h-svh md:h-dvh flex flex-col justify-between select-none
           bg-[#faf9f6] text-[#22201e] relative overflow-hidden
           pt-12 pb-6 px-6 md:pt-10 md:pb-7 md:pl-24 md:pr-12 font-sans"
  >
    <!-- Top Row: CHAPTER I on Left, QUICK INTRO on Right -->
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
      <!-- Chapter Heading in Instrument Serif -->
      <div class="overflow-hidden">
        <h2
          ref="chapterTitle"
          class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#22201e] uppercase leading-none will-change-transform"
        >
          CHAPTER I
        </h2>
      </div>

      <!-- Quick Intro Block (Top Right) -->
      <div class="max-w-[360px] md:max-w-[560px] lg:max-w-[660px] text-justify md:pt-1">
        <span class="block font-sans text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.2em] text-[#22201e]/60 mb-2 font-medium">
          QUICK INTRO
        </span>
        <p class="font-sans text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px] leading-[135%] text-[#22201e]/90 font-normal text-justify">
          <span class="block overflow-hidden">
            <span class="intro-line block will-change-transform">
              Hi, I'm Ferrel — a software engineer and creative
            </span>
          </span>
          <span class="block overflow-hidden">
            <span class="intro-line block will-change-transform">
              technologist focused on crafting fluid web interfaces,
            </span>
          </span>
          <span class="block overflow-hidden">
            <span class="intro-line block will-change-transform">
              real-time data visualisations, and interactive digital
            </span>
          </span>
          <span class="block overflow-hidden">
            <span class="intro-line block will-change-transform">
              experiences.
            </span>
          </span>
        </p>
      </div>
    </div>

    <!-- Middle Section: Quote Left, Portrait Photo Right -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end my-auto py-1">
      <!-- Quote Center/Left — Line Mask Reveal -->
      <div class="md:col-span-6 lg:col-span-6">
        <blockquote class="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] text-[#22201e] font-normal leading-[1.3] tracking-normal uppercase">
          <span class="block overflow-hidden">
            <span class="quote-line block will-change-transform">
              "CODE WITH PRECISION,
            </span>
          </span>
          <span class="block overflow-hidden">
            <span class="quote-line block will-change-transform">
              DESIGN FOR PEOPLE."
            </span>
          </span>
        </blockquote>
      </div>

      <!-- Passport-style B&W Portrait Photo on Right — responsive to viewport height -->
      <div class="md:col-span-6 lg:col-span-6 flex justify-start md:justify-end">
        <div
          ref="photoEl"
          class="group/photo relative w-48 sm:w-60 md:w-72 lg:w-80 xl:w-[420px] max-h-[48vh] lg:max-h-[52vh] aspect-[3/4] bg-[#22201e]/5 overflow-hidden shadow-md hover:shadow-2xl border border-black/5 hover:border-black/15 transition-all duration-700 ease-out will-change-transform rounded-sm cursor-pointer"
        >
          <img
            ref="photoImgEl"
            :src="ferrelPortrait"
            alt="Ferrel Rashad"
            class="size-full object-cover object-top grayscale contrast-[115%] brightness-95 transition-all duration-700 ease-out group-hover/photo:grayscale-0 group-hover/photo:contrast-[105%] group-hover/photo:scale-105 will-change-transform"
            loading="lazy"
          />
          <!-- Subtle editorial corner crosshairs / viewfinder accent on hover -->
          <div class="pointer-events-none absolute inset-2.5 border border-white/25 opacity-0 transition-opacity duration-500 group-hover/photo:opacity-100"></div>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Beyond Engineering Note (Bottom Left) -->
    <div class="flex items-end justify-between">
      <div class="max-w-[340px] md:max-w-[480px] lg:max-w-[560px]">
        <div class="overflow-hidden">
          <p
            ref="bottomNoteEl"
            class="font-sans text-sm sm:text-base md:text-lg leading-[140%] text-[#22201e]/80 font-normal text-justify will-change-transform"
          >
            Beyond engineering: 3D modeling, game environments, and interactive graphics.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import { ferrelPortrait } from '@/assets/images';

  const chapterTitle = ref<HTMLElement | null>(null);
  const photoEl = ref<HTMLElement | null>(null);
  const photoImgEl = ref<HTMLElement | null>(null);
  const bottomNoteEl = ref<HTMLElement | null>(null);

  // Method to trigger masked reveal animation when slide enters view
  const revealSlide = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (chapterTitle.value) {
      tl.to(chapterTitle.value, { yPercent: 0, duration: 1.1 }, 0);
    }

    // 1. Quick Intro Split-Line Stagger Reveal
    const introLines = document.querySelectorAll('#about .intro-line');
    if (introLines.length) {
      tl.to(
        introLines,
        {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.08,
          ease: 'power3.out',
        },
        0.1,
      );
    }

    // 2. Quote Split-Line Stagger Reveal
    const quoteLines = document.querySelectorAll('#about .quote-line');
    if (quoteLines.length) {
      tl.to(
        quoteLines,
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
        },
        0.2,
      );
    }

    if (photoEl.value) {
      tl.fromTo(
        photoEl.value,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0.2,
      );
    }
    if (photoImgEl.value) {
      tl.fromTo(
        photoImgEl.value,
        { scale: 1.25, yPercent: -8 },
        { scale: 1.0, yPercent: 0, duration: 1.25, ease: 'power3.out' },
        0.2,
      );
    }
    if (bottomNoteEl.value) {
      tl.to(bottomNoteEl.value, { yPercent: 0, duration: 1.0 }, 0.25);
    }
  };

  defineExpose({
    revealSlide,
  });

  onMounted(() => {
    // Set initial hidden state
    if (chapterTitle.value) gsap.set(chapterTitle.value, { yPercent: 105 });
    if (bottomNoteEl.value) gsap.set(bottomNoteEl.value, { yPercent: 105 });
    if (photoEl.value) gsap.set(photoEl.value, { y: 35, opacity: 0 });
    if (photoImgEl.value) gsap.set(photoImgEl.value, { scale: 1.25, yPercent: -8 });

    const introLines = document.querySelectorAll('#about .intro-line');
    const quoteLines = document.querySelectorAll('#about .quote-line');
    if (introLines.length) gsap.set(introLines, { yPercent: 105 });
    if (quoteLines.length) gsap.set(quoteLines, { yPercent: 105 });
  });
</script>
