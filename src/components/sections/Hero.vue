<template>
  <section
    id="hero"
    class="shrink-0 w-full md:w-screen h-svh md:h-dvh flex flex-col justify-between select-none
           bg-[#262220] text-[#f3eee8] relative overflow-hidden
           pt-16 pb-10 px-6 md:pt-16 md:pb-14 md:pl-28 md:pr-16 font-sans"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <!-- Base Curtain Roll-Up Overlay ala Khanh Nguyen (#262220 -> #3A3632 across entire screen including sidebar) -->
    <div
      ref="baseCurtain"
      class="pointer-events-none absolute inset-x-0 bottom-0 z-0 bg-[#3A3632] will-change-transform origin-bottom"
      style="height: 0%;"
      aria-hidden="true"
    ></div>

    <!-- Top Content Row: Giant Title on Left, Left-Aligned Bio on Right -->
    <div class="relative z-[2] flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 mt-2 md:mt-4 max-w-[1700px] w-full">
      <!-- Big Editorial Title with Intro Counter Slot -->
      <div class="relative flex flex-col font-serif uppercase leading-[0.82] tracking-[-0.05em]">
        
        <!-- Year Intro Roll (2022 -> 2026) - Absolute Overlay masked ala Khanh Nguyen -->
        <div
          v-if="showIntro"
          class="absolute top-0 left-0 z-10 overflow-hidden pointer-events-none select-none pr-8 sm:pr-12 pb-2"
        >
          <div
            ref="introContent"
            class="flex items-center h-[1em] text-[17vw] sm:text-[14vw] md:text-[clamp(4.5rem,min(11vw,20vh),14rem)] lg:text-[clamp(5rem,min(10.5vw,22vh),15rem)] xl:text-[clamp(5.5rem,min(10.2vw,23vh),16rem)] text-[#f3eee8] font-normal will-change-transform leading-none tracking-[-0.045em] pr-4 sm:pr-6"
          >
            <span class="flex h-[1em] items-center leading-none">20</span>
            <!-- Rolling 2-digit strip -->
            <div class="h-[1em] overflow-hidden flex flex-col justify-start pr-4 sm:pr-6">
              <div ref="yearStrip" class="flex flex-col will-change-transform">
                <span
                  v-for="yr in years"
                  :key="yr"
                  class="h-[1em] flex items-center leading-none tabular-nums pr-2"
                >
                  {{ yr }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Name Title (Always in flow, masked with overflow-hidden) -->
        <h1
          ref="heroTitle"
          class="font-serif font-normal text-[#f3eee8] will-change-transform leading-[0.88] tracking-[-0.045em] opacity-0"
        >
          <span class="block overflow-hidden pr-4 sm:pr-6 pt-1 pb-1">
            <span
              ref="firstNameEl"
              class="block will-change-transform text-[17vw] sm:text-[14vw] md:text-[clamp(4.5rem,min(11vw,20vh),14rem)] lg:text-[clamp(5rem,min(10.5vw,22vh),15rem)] xl:text-[clamp(5.5rem,min(10.2vw,23vh),16rem)] tracking-[-0.045em] pr-2"
            >
              FERREL
            </span>
          </span>
          <span class="block overflow-hidden pr-6 sm:pr-8 mt-1 sm:mt-1.5 md:mt-2 pt-1 pb-1">
            <span
              ref="lastNameEl"
              class="block will-change-transform text-[18.5vw] sm:text-[15.2vw] md:text-[clamp(5rem,min(12vw,22vh),15.5rem)] lg:text-[clamp(5.5rem,min(11.5vw,24vh),16.5rem)] xl:text-[clamp(6rem,min(11.2vw,25vh),18rem)] tracking-[-0.045em] origin-left pr-4"
            >
              RASHAD
            </span>
          </span>
        </h1>
      </div>

      <!-- Bio Paragraph (Top Right, Left-Aligned ~460px) -->
      <div class="max-w-[340px] md:max-w-[420px] lg:max-w-[480px] md:pt-4 text-left">
        <div class="overflow-hidden">
          <p
            ref="bioEl"
            class="font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-[135%] text-[#f3eee8]/85 font-normal tracking-normal will-change-transform opacity-0"
          >
            A fullstack developer & digital creator, crafting highperformance web systems, 3D worlds, and cinematic digital media.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Depok Live Time, Status, and Italic Scroll Cue -->
    <div class="relative z-[2] grid grid-cols-2 md:grid-cols-3 items-end gap-4 font-sans text-[#f3eee8]/80 max-w-[1700px] w-full">
      <!-- Bottom Left: Location & Live Local Clock -->
      <div class="overflow-hidden">
        <div ref="footerLeftEl" class="flex flex-col text-sm sm:text-base md:text-lg leading-[140%] will-change-transform">
          <span class="text-[#f3eee8]">Depok, Indonesia</span>
          <span class="text-[#f3eee8]/60 tabular-nums">
            (GMT+7) {{ currentTime }}
          </span>
        </div>
      </div>

      <!-- Bottom Center: Availability Status -->
      <div class="hidden md:flex flex-col items-center text-sm sm:text-base md:text-lg text-center leading-[140%] overflow-hidden">
        <span ref="footerCenterEl" class="text-[#f3eee8]/80 will-change-transform">
          Open for collaborations
        </span>
      </div>

      <!-- Bottom Right: Intro Quote -> Transforms to Khanh Nguyen Uppercase Serif SCROLL -->
      <div class="flex items-end justify-end col-span-1">
        <div class="relative flex items-end justify-end">
          <!-- Intro Quote: tightly masked container, entrance from below, exit to below -->
          <div
            ref="quoteWrapperEl"
            class="absolute right-0 bottom-0 overflow-hidden pointer-events-none select-none max-w-[280px] sm:max-w-none w-max z-10"
          >
            <div
              ref="quoteEl"
              class="font-sans text-xs sm:text-sm md:text-base text-[#f3eee8]/75 text-right will-change-transform leading-snug tracking-normal whitespace-nowrap"
            >
              <span>Where logic meets imagination.</span>
            </div>
          </div>

          <!-- Hero Scroll Cue: tightly masked container with animated arrow -->
          <div class="overflow-hidden select-none pr-4">
            <div
              ref="scrollCueEl"
              class="group flex items-center gap-2.5 cursor-pointer will-change-transform pr-1"
              @click="scrollToNext"
            >
              <span class="font-serif italic tracking-[0.02em] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-[#faf9f6]/90 transition-all duration-300 group-hover:text-white group-hover:tracking-[0.05em] leading-none">
                Scroll
              </span>
              <span class="inline-block font-sans text-xl sm:text-2xl md:text-3xl text-[#faf9f6]/60 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white leading-none">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Base Progress Line ala Khanh Nguyen -->
    <div
      v-if="showIntro"
      ref="introProgressLine"
      class="pointer-events-none absolute bottom-0 left-0 z-30 h-[2px] w-full origin-left bg-flame will-change-transform"
      aria-hidden="true"
    ></div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import moment from 'moment-timezone';
  import gsap from 'gsap';

  const emit = defineEmits<{
    (e: 'scrollNext'): void;
    (e: 'introComplete'): void;
  }>();

  const currentTime = ref('');
  let clockTimer: any = null;

  const showIntro = ref(true);

  const years = ['22', '23', '24', '25', '26'];

  const introContent = ref<HTMLElement | null>(null);
  const introProgressLine = ref<HTMLElement | null>(null);
  const baseCurtain = ref<HTMLElement | null>(null);
  const yearStrip = ref<HTMLElement | null>(null);
  const heroTitle = ref<HTMLElement | null>(null);
  const firstNameEl = ref<HTMLElement | null>(null);
  const lastNameEl = ref<HTMLElement | null>(null);
  const bioEl = ref<HTMLElement | null>(null);
  const footerLeftEl = ref<HTMLElement | null>(null);
  const footerCenterEl = ref<HTMLElement | null>(null);
  const quoteWrapperEl = ref<HTMLElement | null>(null);
  const quoteEl = ref<HTMLElement | null>(null);
  const scrollCueEl = ref<HTMLElement | null>(null);

  const updateClock = () => {
    currentTime.value = moment.tz('Asia/Jakarta').format('HH:mm');
  };

  const scrollToNext = () => {
    emit('scrollNext');
  };

  const onMouseMove = (e: MouseEvent) => {
    if (window.innerWidth < 768 || !heroTitle.value || showIntro.value) return;
    const { clientX, clientY } = e;
    const normX = (clientX / window.innerWidth - 0.5) * 2;
    const normY = (clientY / window.innerHeight - 0.5) * 2;
    gsap.to(heroTitle.value, {
      x: normX * 12,
      y: normY * 7,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const onMouseLeave = () => {
    if (!heroTitle.value) return;
    gsap.to(heroTitle.value, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  onMounted(() => {
    updateClock();
    clockTimer = setInterval(updateClock, 1000);

    // Initial state: masked down for titles/bio, progress line at scaleX 0, baseCurtain at height 0%
    gsap.set([firstNameEl.value, lastNameEl.value, bioEl.value], {
      yPercent: 105,
    });
    if (heroTitle.value) gsap.set(heroTitle.value, { autoAlpha: 0 });
    if (bioEl.value) gsap.set(bioEl.value, { autoAlpha: 0 });

    if (introContent.value) {
      gsap.set(introContent.value, { yPercent: 105 });
    }

    if (introProgressLine.value) {
      gsap.set(introProgressLine.value, { scaleX: 0 });
    }

    if (baseCurtain.value) {
      gsap.set(baseCurtain.value, { height: '0%' });
    }

    // Hide footer elements during intro, quote prepared for entrance
    if (footerLeftEl.value) gsap.set(footerLeftEl.value, { yPercent: 105, autoAlpha: 0 });
    if (footerCenterEl.value) gsap.set(footerCenterEl.value, { yPercent: 105, autoAlpha: 0 });
    if (scrollCueEl.value) gsap.set(scrollCueEl.value, { yPercent: 120, autoAlpha: 0 });
    if (quoteEl.value) gsap.set(quoteEl.value, { yPercent: 105 });

    // 5-Stage Intro Animation Timeline:
    // 1. Stage 1: Mask reveal dari bawah untuk 2022 dan quote kanan bawah
    // 2. Stage 2: Settle sejenak, lalu animasi rolling count (22 -> 26) & progress bar oranye
    // 3. Stage 3: SEMUA teks animasi loading screen (2026, progress line, quote) KELAR & KELUAR DULUAN
    // 4. Stage 4: Setelah layar bersih dari teks loading, BARU transisi warna (curtain rise #262220 -> #3A3632)
    // 5. Stage 5: Hero text reveal (FERREL RASHAD, bio, SCROLL, footer info)
    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
    });

    // 1. Stage 1: Mask reveal dari bawah untuk angka tahun awal (2022)
    if (introContent.value) {
      tl.to(
        introContent.value,
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.08,
      );
    }

    // Quote pojok kanan bawah meluncur naik dengan mask reveal yang sama persis
    if (quoteEl.value) {
      tl.to(
        quoteEl.value,
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.1,
      );
    }

    const totalSteps = years.length - 1; // 4 steps (22 -> 26)
    const scrollTargetY = -(totalSteps / years.length) * 100; // Lands cleanly on 26

    // 2. Stage 2: Setelah mask reveal selesai dan angka settle, barulah animasi count rolling
    const countStartTime = 0.9;
    const countDuration = 1.45;

    if (yearStrip.value) {
      tl.to(
        yearStrip.value,
        {
          yPercent: scrollTargetY,
          duration: countDuration,
          ease: 'power4.inOut',
        },
        countStartTime,
      );
    }

    // Base Progress Line scales simultan dengan rolling count
    if (introProgressLine.value) {
      tl.to(
        introProgressLine.value,
        {
          scaleX: 1,
          duration: countDuration,
          ease: 'power4.inOut',
        },
        countStartTime,
      );
    }

    // 3. Stage 3: SEMUA teks loading screen KELAR & EXIT DULUAN (sinkron dan snappy)
    const exitStartTime = countStartTime + countDuration + 0.1;
    const exitDuration = 0.55;

    // 2026 wipes up and disappears
    if (introContent.value) {
      tl.to(
        introContent.value,
        {
          yPercent: -105,
          duration: exitDuration,
          ease: 'power3.inOut',
          onComplete: () => {
            showIntro.value = false;
          },
        },
        exitStartTime,
      );
    }

    // Progress line fades out sinkron
    if (introProgressLine.value) {
      tl.to(
        introProgressLine.value,
        {
          opacity: 0,
          duration: exitDuration,
          ease: 'power3.inOut',
        },
        exitStartTime,
      );
    }

    // Quote pojok kanan bawah: mask reveal kebawah (yPercent: 105) sinkron bersamaan dengan tahun keluar
    if (quoteEl.value) {
      tl.to(
        quoteEl.value,
        {
          yPercent: 105,
          duration: exitDuration,
          ease: 'power3.inOut',
          onComplete: () => {
            if (quoteWrapperEl.value) quoteWrapperEl.value.style.display = 'none';
          },
        },
        exitStartTime,
      );
    }

    // 4. Stage 4: Transisi warna (curtain rise) disesuaikan lebih gesit & tanpa jeda kosong
    const curtainStartTime = exitStartTime + exitDuration - 0.1; // Mengalir langsung saat teks mendekati ujung exit
    const curtainDuration = 0.75; // Durasi lebih cepat & responsif (0.75s vs 1.1s sebelumnya)

    if (baseCurtain.value) {
      tl.to(
        baseCurtain.value,
        {
          height: '100%',
          duration: curtainDuration,
          ease: 'power3.inOut',
          onComplete: () => {
            // Signal that curtain has fully risen so sidebar locks in solid #3A3632 for horizontal scroll protection
            emit('introComplete');
          },
        },
        curtainStartTime,
      );
    }

    // 5. Stage 5: Hero Section Content Reveal
    const heroRevealTime = curtainStartTime + 0.25; // Muncul lebih responsif saat tirai melewati separuh layar

    // Reveal containers from autoAlpha: 0
    if (heroTitle.value) {
      tl.set(heroTitle.value, { autoAlpha: 1 }, heroRevealTime);
    }
    if (bioEl.value) {
      tl.set(bioEl.value, { autoAlpha: 1 }, heroRevealTime);
    }

    // Masked Line Reveal for FERREL & RASHAD
    tl.to(
      [firstNameEl.value, lastNameEl.value],
      {
        yPercent: 0,
        duration: 0.95,
        stagger: 0.06,
        ease: 'power4.out',
      },
      heroRevealTime,
    );

    // Masked Reveal for Bio
    tl.to(
      bioEl.value,
      {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.out',
      },
      heroRevealTime + 0.08,
    );

    // Masked Reveal for SCROLL Cue
    if (scrollCueEl.value) {
      tl.to(
        scrollCueEl.value,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.95,
          ease: 'power4.out',
          onComplete: () => {
            if (scrollCueEl.value?.parentElement) {
              scrollCueEl.value.parentElement.style.overflow = 'visible';
            }
          },
        },
        heroRevealTime + 0.08,
      );
    }

    // Masked Reveal for Footer Left & Center (Depok Time & Availability)
    const footerEls = [footerLeftEl.value, footerCenterEl.value].filter(Boolean);
    if (footerEls.length) {
      tl.to(
        footerEls,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power4.out',
        },
        heroRevealTime + 0.12,
      );
    }
  });

  onUnmounted(() => {
    if (clockTimer) clearInterval(clockTimer);
  });
</script>
