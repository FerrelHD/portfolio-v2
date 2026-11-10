<template>
  <section
    id="activity"
    class="activity-slide shrink-0 w-full md:w-screen min-h-[100svh] md:h-dvh flex flex-col justify-between select-none
           bg-[#23201e] text-[#faf9f6] relative overflow-hidden
           pt-16 pb-6 px-6 md:pt-8 md:pb-6 lg:pt-10 lg:pb-8 md:pl-28 md:pr-14 font-sans"
  >
    <!-- Top Editorial Header Bar -->
    <div class="flex items-center justify-between shrink-0">
      <div class="flex items-baseline gap-3 sm:gap-4">
        <h2 class="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-[#faf9f6] uppercase leading-none">
          CHAPTER IV
        </h2>
        <span class="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#faf9f6]/50 font-medium">
          ENGINEERING PULSE // 3D SKYLINE
        </span>
      </div>

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

    <!-- Center Interactive Content -->
    <div class="my-auto py-3 md:py-4 w-full max-w-[1100px] mx-auto flex flex-col gap-4">
      <div class="flex flex-col gap-1 text-left">
        <h3 class="font-serif text-2xl sm:text-3xl md:text-4xl text-[#faf9f6] tracking-tight">
          One Year of Code as an Isometric City.
        </h3>
        <p class="font-sans text-xs sm:text-sm text-[#faf9f6]/65 max-w-2xl leading-relaxed">
          Daily git commits and creative motion experiments rendered onto an interactive canvas.
          Switch between the 2D planar heatmap and the 3D kinetic skyline wave.
        </p>
      </div>

      <!-- Skyline Canvas Component -->
      <div class="w-full">
        <ContributionSkyline
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
  </section>
</template>

<script setup lang="ts">
  import ContributionSkyline from '@/components/ui/ContributionSkyline.vue';
</script>
