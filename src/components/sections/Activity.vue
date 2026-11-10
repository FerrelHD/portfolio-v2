<template>
  <section
    id="activity"
    class="activity-slide shrink-0 w-full md:w-screen min-h-[100svh] md:h-dvh flex flex-col justify-between select-none
           bg-[#23201e] text-[#faf9f6] relative overflow-hidden
           pt-16 pb-4 px-6 md:pt-6 md:pb-4 lg:pt-8 lg:pb-5 md:pl-24 md:pr-12 font-sans"
  >
    <!-- Top Editorial Header Bar -->
    <div class="flex items-center justify-between shrink-0">
      <div class="overflow-hidden">
        <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#faf9f6] uppercase leading-none will-change-transform">
          CHAPTER IV
        </h2>
      </div>

      <div class="flex items-center gap-4">
        <button
          type="button"
          @click="openFullscreen"
          class="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#faf9f6]/70 hover:text-white border-b border-transparent hover:border-white/60 transition-colors cursor-pointer outline-none select-none"
          title="Expand 3D Skyline Fullscreen"
        >
          <span>Fullscreen</span>
          <svg
            class="size-3 sm:size-3.5 transition-transform duration-300 ease-out group-hover:scale-110"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M2 6V2h4" />
            <path d="M14 6V2h-4" />
            <path d="M2 10v4h4" />
            <path d="M14 10v4h-4" />
          </svg>
        </button>

        <a
          href="https://github.com/FerrelHD"
          target="_blank"
          rel="noreferrer"
          class="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#faf9f6]/70 hover:text-white border-b border-transparent hover:border-white/60 transition-colors"
          aria-label="View Ferrel's GitHub profile"
        >
          <span>@FerrelHD</span>
          <span class="text-sm inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>
    </div>

    <!-- Center Interactive Content -->
    <div class="my-auto py-2 md:py-3 w-full max-w-[1040px] mx-auto flex flex-col gap-2.5 sm:gap-3">
      <div class="flex flex-col gap-0.5 text-left">
        <h3 class="font-sans font-bold text-xl sm:text-2xl md:text-3xl text-[#faf9f6] tracking-tight">
          One Year of Code as an Isometric City.
        </h3>
        <p class="font-sans text-xs sm:text-sm text-[#faf9f6]/65 max-w-xl leading-relaxed">
          Daily git commits rendered onto an interactive canvas.
          Switch between 2D planar heatmap and 3D kinetic skyline wave.
        </p>
      </div>

      <!-- Skyline Canvas Component with Live GitHub Data -->
      <div class="w-full">
        <ContributionSkyline
          :data="contributions"
          defaultView="3d"
          palette="github"
          :orbit="true"
          :showStats="true"
          :showLegend="true"
          :showToggle="true"
          class="border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
        />
      </div>
    </div>

    <!-- Bottom Contextual Status Bar -->
    <div class="flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.15em] text-[#faf9f6]/40 shrink-0 pt-2 border-t border-white/5">
      <span>Drag to orbit · Click cell for details</span>
      <span class="tabular-nums">Status: Active Development</span>
    </div>

    <!-- Fullscreen 3D Inspection Modal (Option B: Immersive Orbit View) -->
    <Teleport to="body">
      <div
        v-if="isFullscreenOpen"
        data-lenis-prevent
        class="fixed inset-0 z-[125] flex flex-col justify-between bg-[#191715]/95 backdrop-blur-md p-6 sm:p-10 md:p-12 text-[#faf9f6] select-none"
        role="dialog"
        aria-modal="true"
        aria-label="GitHub 3D Skyline Fullscreen View"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div class="flex items-baseline gap-3">
            <h2 class="font-serif text-2xl sm:text-3xl uppercase tracking-tight text-[#faf9f6]">
              3D SKYLINE // FULLSCREEN
            </h2>
            <span class="font-sans text-xs uppercase tracking-widest text-[#faf9f6]/50">
              @FerrelHD
            </span>
          </div>

          <button
            type="button"
            @click="closeFullscreen"
            class="group inline-flex items-center gap-2 text-sm font-sans uppercase tracking-wider text-[#faf9f6]/70 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <span>Close [ESC]</span>
            <span class="text-base inline-block transition-transform duration-300 group-hover:rotate-90">✕</span>
          </button>
        </div>

        <!-- Fullscreen Canvas Body -->
        <div class="my-auto py-4 w-full max-w-[1300px] mx-auto flex-1 flex flex-col justify-center">
          <ContributionSkyline
            :data="contributions"
            defaultView="3d"
            palette="github"
            :orbit="true"
            :heightScale="1.3"
            :showStats="true"
            :showLegend="true"
            :showToggle="true"
            class="border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] bg-[#1e1c1a]"
          />
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-between text-xs font-sans uppercase tracking-widest text-[#faf9f6]/40 pt-3 border-t border-white/10 shrink-0">
          <span>Click & Drag to rotate 360° · Double-click to reset orbit</span>
          <span>Press ESC to return</span>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import ContributionSkyline from '@/components/ui/ContributionSkyline.vue';
  import {
    fetchGitHubContributions,
    ferrelFallbackContributions,
  } from '@/services/githubContributions';
  import type { ContributionDay } from '@/utils/contributionMath';
  import { lenis } from '@/lenis';

  const contributions = ref<ContributionDay[]>(ferrelFallbackContributions);
  const isFullscreenOpen = ref(false);

  const openFullscreen = () => {
    isFullscreenOpen.value = true;
    lenis.stop();
  };

  const closeFullscreen = () => {
    isFullscreenOpen.value = false;
    lenis.start();
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isFullscreenOpen.value) {
      closeFullscreen();
    }
  };

  onMounted(async () => {
    window.addEventListener('keydown', handleKeydown);
    contributions.value = await fetchGitHubContributions('FerrelHD');
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    if (isFullscreenOpen.value) {
      lenis.start();
    }
  });
</script>
