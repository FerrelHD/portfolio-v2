<template>
  <section
    id="testimonials-section"
    class="shrink-0 w-full md:min-w-[110vw] lg:min-w-[100vw] md:h-dvh flex flex-col justify-between select-none
           px-6 py-16 md:py-12 md:pl-28 md:pr-16 bg-[#161413] text-[#f3eee8] border-b md:border-b-0 md:border-r border-white/5"
  >
    <!-- Chapter Header -->
    <div class="flex items-center justify-between border-b border-white/10 pb-4">
      <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-flame">
        <span class="size-1.5 rounded-full bg-flame animate-pulse"></span>
        <span>CHAPTER // 04</span>
      </div>
      <span class="font-mono text-xs text-[#f3eee8]/40 uppercase tracking-widest">
        ARSENAL // STACK
      </span>
    </div>

    <!-- Middle Content -->
    <div class="my-auto py-6 flex flex-col gap-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-tight text-[#f3eee8] leading-[0.95]">
            TECH ARSENAL & STACK
          </h2>
          <p class="font-sans text-xs sm:text-sm text-[#f3eee8]/60 mt-2 max-w-lg">
            A curated ecosystem of modern frameworks, cloud backends, and creative tooling I utilize to build scalable and high-performance digital products.
          </p>
        </div>
      </div>

      <!-- Slider Component -->
      <div class="w-full mt-2">
        <Slider />
      </div>
    </div>

    <!-- Bottom Section Bar -->
    <div class="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-[#f3eee8]/40">
      <span>MODERN DEVELOPMENT ECOSYSTEM</span>
      <span>60 FPS STANDARDS</span>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Slider } from '../design';
</script>
