<template>
  <section
    id="contact"
    class="shrink-0 w-full md:w-screen h-svh md:h-dvh flex flex-col justify-between select-none
           bg-[#3A3632] text-[#f3eee8] relative overflow-hidden
           pt-16 pb-12 px-6 md:pt-16 md:pb-14 md:pl-28 md:pr-16 font-sans"
  >
    <!-- Top Area: Clean Open Editorial Space -->
    <div class="flex items-center justify-between">
      <span class="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#f3eee8]/40 font-medium">
        CLOSING // 2026
      </span>
      <button
        type="button"
        @click="scrollToTop"
        class="group flex items-center gap-2 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#f3eee8]/60 hover:text-white transition-colors cursor-pointer"
      >
        <span>Back to start</span>
        <span class="font-serif italic text-sm md:text-base transition-transform group-hover:-translate-y-0.5">↑</span>
      </button>
    </div>

    <!-- Massive Center Headline: NEXT CHAPTER in Editorial Serif -->
    <div class="my-auto py-4">
      <div class="overflow-hidden pr-4 sm:pr-6">
        <h2
          ref="nextEl"
          class="font-serif text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[11.5vw] font-normal tracking-[-0.03em] text-[#f3eee8] uppercase leading-[0.84] will-change-transform pr-2"
        >
          NEXT
        </h2>
      </div>
      <div class="overflow-hidden pr-6 sm:pr-8">
        <h2
          ref="chapterEl"
          class="font-serif text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[11.5vw] font-normal tracking-[-0.03em] text-[#f3eee8] uppercase leading-[0.84] will-change-transform pr-4"
        >
          CHAPTER
        </h2>
      </div>
    </div>

    <!-- Bottom Row: Contact To, Email with hover underline, and GitHub -->
    <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
      
      <!-- Contact Information (Bottom-Left) -->
      <div class="flex flex-col gap-2.5">
        <span class="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#f3eee8]/50 font-medium">
          Contact To
        </span>
        <div class="flex flex-col gap-1.5">
          <a
            href="mailto:ferrelrashadakeyla2014@gmail.com"
            class="group inline-flex items-center gap-2.5 text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-[#f3eee8] hover:text-white transition-colors cursor-pointer w-fit"
          >
            <span class="border-b border-white/20 group-hover:border-white transition-colors pb-0.5">
              ferrelrashadakeyla2014@gmail.com
            </span>
            <span class="text-sm md:text-base opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
          </a>

          <!-- GitHub Link with SVG -->
          <a
            href="https://github.com/FerrelHD"
            target="_blank"
            rel="noreferrer"
            class="group inline-flex items-center gap-2.5 text-base sm:text-lg md:text-xl text-[#f3eee8]/75 hover:text-white transition-colors cursor-pointer mt-1.5 w-fit"
          >
            <svg class="size-5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span class="border-b border-transparent group-hover:border-white/40 transition-colors">
              FerrelHD
            </span>
          </a>
        </div>
      </div>

      <!-- Copyright Note (Bottom-Right) -->
      <div class="text-xs sm:text-sm text-[#f3eee8]/50 font-sans sm:text-right">
        <span>© 2026 Ferrel Rashad Akeyla</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';

  const emit = defineEmits<{
    (e: 'scrollToStart'): void;
  }>();

  const nextEl = ref<HTMLElement | null>(null);
  const chapterEl = ref<HTMLElement | null>(null);

  const scrollToTop = () => {
    emit('scrollToStart');
  };

  const revealSlide = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (nextEl.value) tl.to(nextEl.value, { yPercent: 0, duration: 1.2 }, 0);
    if (chapterEl.value) tl.to(chapterEl.value, { yPercent: 0, duration: 1.2 }, 0.1);
  };

  defineExpose({
    revealSlide,
  });

  onMounted(() => {
    if (nextEl.value) gsap.set(nextEl.value, { yPercent: 105 });
    if (chapterEl.value) gsap.set(chapterEl.value, { yPercent: 105 });
  });
</script>
