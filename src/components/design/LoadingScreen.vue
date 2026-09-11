<template>
  <div
    v-if="isVisible"
    id="loading-screen"
    class="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#161514] text-[#f3eee8] select-none pointer-events-auto p-6 sm:p-10 md:p-14 overflow-hidden"
  >
    <!-- Top Metadata Bar -->
    <div
      id="loader-top"
      class="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-[#f3eee8]/60"
    >
      <div class="flex items-center gap-2.5">
        <span class="size-2 rounded-full bg-flame animate-pulse"></span>
        <span class="uppercase tracking-widest text-[11px] sm:text-xs">
          FERREL RASHAD // FOLIO
        </span>
      </div>
      <span class="uppercase tracking-wider text-[10px] sm:text-xs text-[#f3eee8]/40">
        DEPOK, ID • GMT+7
      </span>
    </div>

    <!-- Center: Rolling Year Strip Counter ala Khanh Nguyen -->
    <div class="my-auto flex flex-col items-center justify-center text-center">
      <div class="flex items-center overflow-hidden font-serif leading-none tracking-tight text-[18vw] sm:text-[14vw] md:text-[12vw] text-[#f3eee8]">
        <!-- Static Century Prefix -->
        <span>20</span>
        <!-- Animated Year Suffix Strip -->
        <div class="h-[1em] overflow-hidden">
          <div
            ref="yearStrip"
            class="flex flex-col will-change-transform"
          >
            <span
              v-for="yr in years"
              :key="yr"
              class="flex h-[1em] items-center justify-center tabular-nums"
            >
              {{ yr }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tagline below year -->
      <p
        id="loader-tagline"
        class="mt-4 font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#f3eee8]/60"
      >
        A journey through engineering & digital craft
      </p>
    </div>

    <!-- Bottom: Fine Progress Bar -->
    <div class="relative flex flex-col gap-3">
      <div class="flex justify-between items-center font-mono text-[10px] sm:text-xs text-[#f3eee8]/40">
        <span>LOADING EXPERIENCE</span>
        <span class="tabular-nums font-semibold text-flame">{{ displayProgress }}%</span>
      </div>
      <div class="relative h-[2px] w-full bg-white/10 overflow-hidden">
        <div
          id="loader-bar"
          class="absolute inset-y-0 left-0 bg-flame will-change-transform"
          :style="{ width: `${displayProgress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import { lenis } from '@/lenis';

  const emit = defineEmits<{
    (e: 'isLoading', value: boolean): void;
  }>();

  const isVisible = ref(true);
  const displayProgress = ref(0);
  const yearStrip = ref<HTMLElement | null>(null);

  const years = ['22', '23', '24', '25', '26'];

  onMounted(() => {
    lenis.stop();
    document.body.classList.add('stop-scrolling');

    const totalSteps = years.length - 1;
    const progressObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Curtain slide up reveal
        gsap.to('#loading-screen', {
          yPercent: -100,
          duration: 1.05,
          ease: 'power4.inOut',
          onStart: () => {
            emit('isLoading', false);
          },
          onComplete: () => {
            isVisible.value = false;
            document.body.classList.remove('stop-scrolling');
            lenis.start();
          },
        });
      },
    });

    // Progress percentage counter
    tl.to(
      progressObj,
      {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          displayProgress.value = Math.floor(progressObj.val);
        },
      },
      0,
    );

    // Roll the year strip up to 26
    if (yearStrip.value) {
      tl.to(
        yearStrip.value,
        {
          yPercent: -(100 / years.length) * totalSteps,
          duration: 1.8,
          ease: 'power3.inOut',
        },
        0,
      );
    }
  });
</script>
