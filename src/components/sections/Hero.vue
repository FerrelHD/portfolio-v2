<template>
  <section
    id="hero"
    class="shrink-0 w-full md:w-screen h-svh md:h-dvh flex flex-col justify-between select-none
           bg-[#262220] text-[#f3eee8] relative overflow-hidden
           pt-16 pb-10 px-6 md:pt-16 md:pb-14 md:pl-28 md:pr-16 font-sans"
  >
    <!-- Base Curtain Roll-Up Overlay ala Khanh Nguyen (#262220 -> #3A3632 across entire screen including sidebar) -->
    <div
      ref="baseCurtain"
      class="pointer-events-none absolute inset-x-0 bottom-0 z-0 bg-[#3A3632] will-change-transform origin-bottom"
      style="height: 0%;"
      aria-hidden="true"
    ></div>

    <!-- Top Content Row: Giant Title on Left, Left-Aligned Bio on Right -->
    <div class="relative z-[2] flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 mt-2 md:mt-4">
      <!-- Big Editorial Title with Intro Counter Slot -->
      <div class="relative flex flex-col font-serif uppercase leading-[0.84] tracking-[-0.04em]">
        
        <!-- Year Intro Roll (2019 -> 2026) - Absolute Overlay masked ala Khanh Nguyen -->
        <div
          v-if="showIntro"
          ref="introContainer"
          class="absolute top-0 left-0 z-10 overflow-hidden pointer-events-none select-none"
        >
          <div
            ref="introContent"
            class="flex items-baseline text-[19vw] sm:text-[16vw] md:text-[14vw] lg:text-[14.2vw] text-[#f3eee8] font-normal will-change-transform leading-none tracking-[-0.04em]"
          >
            <span>20</span>
            <!-- Rolling 2-digit strip -->
            <div class="inline-block h-[0.84em] overflow-hidden align-baseline">
              <div ref="yearStrip" class="flex flex-col will-change-transform">
                <span
                  v-for="yr in years"
                  :key="yr"
                  class="h-[0.84em] flex items-center tabular-nums"
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
          class="font-normal text-[#f3eee8] will-change-transform leading-[0.84] tracking-[-0.04em]"
        >
          <span class="block overflow-hidden">
            <span
              ref="firstNameEl"
              class="block will-change-transform text-[19vw] sm:text-[16vw] md:text-[14vw] lg:text-[14.2vw]"
            >
              FERREL
            </span>
          </span>
          <span class="block overflow-hidden">
            <span
              ref="lastNameEl"
              class="block will-change-transform text-[21vw] sm:text-[18vw] md:text-[15.8vw] lg:text-[16vw] tracking-[-0.03em] origin-left"
            >
              RASHAD
            </span>
          </span>
        </h1>
      </div>

      <!-- Bio Paragraph (Top Right, Left-Aligned ~360px) -->
      <div class="max-w-[340px] md:max-w-[380px] md:pt-4 text-left">
        <div class="overflow-hidden">
          <p
            ref="bioEl"
            class="font-sans text-base sm:text-lg leading-[140%] text-[#f3eee8]/85 font-normal tracking-normal will-change-transform"
          >
            A fullstack developer & digital creator, crafting highperformance web systems, 3D worlds, and cinematic digital media.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Depok Live Time, Status, and Italic Scroll Cue -->
    <div class="relative z-[2] grid grid-cols-2 md:grid-cols-3 items-end gap-4 font-sans text-[#f3eee8]/80">
      <!-- Bottom Left: Location & Live Local Clock -->
      <div class="overflow-hidden">
        <div ref="footerLeftEl" class="flex flex-col text-sm sm:text-base leading-[140%] will-change-transform">
          <span class="text-[#f3eee8]">Depok, Indonesia</span>
          <span class="text-[#f3eee8]/60 tabular-nums">
            (GMT+7) {{ currentTime }}
          </span>
        </div>
      </div>

      <!-- Bottom Center: Availability Status -->
      <div class="hidden md:flex flex-col items-center text-sm sm:text-base text-center leading-[140%] overflow-hidden">
        <span ref="footerCenterEl" class="text-[#f3eee8]/90 will-change-transform">
          Open for collaborations
        </span>
      </div>

      <!-- Bottom Right: Intro Quote -> Transforms to Khanh Nguyen Uppercase Serif SCROLL -->
      <div class="flex items-end justify-end col-span-1">
        <div class="relative flex items-end justify-end">
          <!-- Intro Quote: tightly masked container, entrance from below, exit to below -->
          <div
            ref="quoteWrapperEl"
            class="absolute right-0 bottom-0 overflow-hidden py-0.5 pointer-events-none select-none max-w-[280px] sm:max-w-none w-max"
          >
            <div
              ref="quoteEl"
              class="font-sans text-xs sm:text-sm md:text-base text-[#f3eee8]/75 text-right will-change-transform leading-snug tracking-normal whitespace-nowrap"
            >
              <span>Where logic meets imagination.</span>
            </div>
          </div>

          <!-- Hero Scroll Cue ala Khanh Nguyen: tightly masked container -->
          <div class="overflow-hidden py-1 select-none">
            <div
              ref="scrollCueEl"
              class="group flex items-center cursor-pointer will-change-transform"
              @click="scrollToNext"
            >
              <span class="font-serif uppercase tracking-[0.15em] text-base sm:text-lg md:text-xl font-normal text-[#faf9f6]/90 transition-all duration-300 group-hover:text-white group-hover:tracking-[0.22em]">
                SCROLL
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

  const introContainer = ref<HTMLElement | null>(null);
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

  onMounted(() => {
    updateClock();
    clockTimer = setInterval(updateClock, 1000);

    // Initial state: masked down for titles/bio, progress line at scaleX 0, baseCurtain at height 0%
    gsap.set([firstNameEl.value, lastNameEl.value, bioEl.value], {
      yPercent: 105,
    });

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
    if (footerLeftEl.value) gsap.set(footerLeftEl.value, { yPercent: 105 });
    if (footerCenterEl.value) gsap.set(footerCenterEl.value, { yPercent: 105 });
    if (scrollCueEl.value) gsap.set(scrollCueEl.value, { yPercent: 105 });
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
          duration: 0.95,
          ease: 'power4.out',
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
