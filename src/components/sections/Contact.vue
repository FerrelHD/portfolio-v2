<template>
  <section
    id="contact-section"
    class="relative w-full min-h-svh p-3 sm:p-6 md:p-8 flex flex-col justify-between select-none"
  >
    <div
      class="relative w-full overflow-hidden rounded-3xl border border-white/15 bg-[#0a0a09] p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col justify-between min-h-[92vh]"
    >
      <!-- Top Monogram & Meta Bar -->
      <div
        class="flex items-center justify-between border-b border-white/10 pb-5 mb-4 select-none"
      >
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-flame animate-pulse"></span>
          <span
            class="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-flax-smoke-300"
          >
            FERREL.DEV // FINAL_LAP
          </span>
        </div>
        <span
          class="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-flax-smoke-500"
        >
          DEPOK, ID • GMT+7
        </span>
      </div>

      <!-- Giant Bold Headline Banner -->
      <div class="text-center my-4 sm:my-6">
        <p
          class="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-flame mb-2"
        >
          ( READY TO COLLABORATE )
        </p>
        <h2
          id="make-it-happen"
          class="font-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-flax-smoke-100 leading-none text-balance"
          v-html="makeItHappen"
        ></h2>
      </div>

      <!-- 3-Column Symmetrical Grid ala Lando Norris -->
      <div
        class="grid grid-cols-12 gap-6 sm:gap-8 items-center my-6 sm:my-8 relative z-10"
      >
        <!-- Left Column: PAGES -->
        <div
          class="col-span-6 sm:col-span-3 flex flex-col items-start gap-4 select-none"
        >
          <p
            class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-flax-smoke-500"
          >
            [ PAGES ]
          </p>
          <ul
            class="flex flex-col gap-2.5 font-fancy text-base sm:text-xl md:text-2xl font-bold uppercase text-flax-smoke-300"
          >
            <li v-for="page in pagesNav" :key="page.label">
              <button
                type="button"
                @click="navigateTo(page.url)"
                class="group flex items-center gap-2 transition-all hover:text-white hover:translate-x-1.5 cursor-pointer text-left"
              >
                <span
                  class="size-1.5 rounded-full bg-flame opacity-0 transition-opacity group-hover:opacity-100"
                ></span>
                <span>{{ page.label }}</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Center Column: Cinematic Video Centerpiece & CTA Button -->
        <div
          class="col-span-full order-first sm:order-none sm:col-span-6 flex flex-col items-center justify-center relative"
        >
          <!-- macOS Window Video Frame -->
          <div
            class="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#141413] shadow-2xl shadow-black/80 group"
          >
            <!-- macOS Window Header Bar -->
            <div
              class="flex items-center justify-between px-3.5 py-2.5 bg-[#1a1a18]/90 border-b border-white/10 select-none"
            >
              <!-- 3 Traffic Light Dots -->
              <div class="flex items-center gap-1.5">
                <span
                  class="size-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 transition-opacity hover:opacity-80"
                ></span>
                <span
                  class="size-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 transition-opacity hover:opacity-80"
                ></span>
                <span
                  class="size-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]/50 transition-opacity hover:opacity-80"
                ></span>
              </div>

              <!-- Window Title -->
              <span
                class="font-mono text-[10px] sm:text-[11px] font-medium text-flax-smoke-400 tracking-tight truncate max-w-[170px] sm:max-w-none"
              >
                spiderman-2-cinematic.mp4
              </span>

              <!-- Live Badge -->
              <span
                class="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-bold uppercase"
              >
                <span
                  class="size-1.5 rounded-full bg-emerald-400 animate-pulse"
                ></span>
                <span class="hidden sm:inline">60 FPS</span>
              </span>
            </div>

            <!-- Video Viewport -->
            <div class="relative w-full aspect-[16/10] overflow-hidden bg-black">
              <video
                class="size-full object-cover object-center brightness-60 contrast-125 transition-transform duration-700 group-hover:scale-105"
                :src="contact"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
              ></video>
              <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
              ></div>
            </div>
          </div>

          <!-- Business Enquiries CTA Button (Floating overlapping the centerpiece) -->
          <div class="relative -mt-6 z-20 flex flex-col items-center">
            <!-- Floating Copied Badge -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-1 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 -translate-y-1 scale-95"
            >
              <div
                v-if="emailCopied"
                class="absolute -top-7 z-30 flex items-center gap-1.5 rounded-full border border-flame bg-flame px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-flame/40 pointer-events-none select-none"
              >
                <span
                  class="size-1.5 rounded-full bg-white animate-pulse"
                ></span>
                <span>Copied // Clipboard</span>
              </div>
            </Transition>

            <a
              href="mailto:ferrelrashadakeyla2014@gmail.com"
              @click="copyEmail"
              class="group relative inline-flex items-center gap-3 rounded-full border border-flame bg-flame px-7 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-flame/25 transition-all duration-300 hover:bg-white hover:text-black hover:border-white active:scale-95 cursor-pointer select-none"
            >
              <span>Business Enquiries</span>
              <svg
                class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>

            <p
              class="mt-2 font-mono text-[10px] text-flax-smoke-500 uppercase tracking-wider"
            >
              CLICK TO SEND OR COPY EMAIL
            </p>
          </div>
        </div>

        <!-- Right Column: FOLLOW ON -->
        <div
          class="col-span-6 sm:col-span-3 flex flex-col items-end sm:items-end gap-4 text-right select-none"
        >
          <p
            class="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-flax-smoke-500"
          >
            [ FOLLOW ON ]
          </p>
          <ul
            class="flex flex-col gap-2.5 font-fancy text-base sm:text-xl md:text-2xl font-bold uppercase text-flax-smoke-300"
          >
            <li v-for="social in socialLinks" :key="social.label">
              <a
                :href="social.url"
                target="_blank"
                class="group flex items-center justify-end gap-2 transition-all hover:text-white hover:-translate-x-1.5 cursor-pointer"
              >
                <span>{{ social.label }}</span>
                <svg
                  class="size-3.5 opacity-40 transition-all group-hover:opacity-100 group-hover:text-flame"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Running Tech Ticker Marquee Ribbon -->
      <div
        class="relative w-full overflow-hidden border-y border-white/10 py-2.5 my-3 bg-white/[0.02] select-none"
      >
        <div
          class="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-widest text-flax-smoke-400 animate-marquee"
        >
          <span v-for="n in 2" :key="n" class="flex items-center gap-8">
            <span>REACT 19</span>
            <span class="size-1 rounded-full bg-flame"></span>
            <span>TYPESCRIPT</span>
            <span class="size-1 rounded-full bg-flame"></span>
            <span>LARAVEL 11</span>
            <span class="size-1 rounded-full bg-flame"></span>
            <span>PYTHON ML</span>
            <span class="size-1 rounded-full bg-flame"></span>
            <span>UNITY 3D</span>
            <span class="size-1 rounded-full bg-flame"></span>
            <span>GSAP MOTION</span>
            <span class="size-1 rounded-full bg-flame"></span>
            <span>SUPABASE</span>
            <span class="size-1 rounded-full bg-flame"></span>
            <span>TAILWIND CSS</span>
            <span class="size-1 rounded-full bg-flame"></span>
          </span>
        </div>
      </div>

      <!-- Bottom Edge Bar -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 font-mono text-[11px] text-flax-smoke-500 select-none"
      >
        <p>© 2026 Ferrel Rashad Akeyla. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <span class="flex items-center gap-1.5 text-flax-smoke-400">
            <span class="size-1.5 rounded-full bg-emerald-400"></span>
            <span>Depok, Indonesia • GMT+7</span>
          </span>
          <button
            type="button"
            @click="scrollToTop"
            class="group flex items-center gap-1 text-flax-smoke-300 hover:text-white cursor-pointer uppercase transition-colors"
          >
            <span>Back to top</span>
            <span class="transition-transform group-hover:-translate-y-0.5"
              >↑</span
            >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { contact } from '@/assets/videos';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { textSplitterIntoChar } from '@/functions';
  import { animateSplitText } from '@/animations';
  import { lenis } from '@/lenis';

  const makeItHappen = ref("Let's Make it happen");
  const emailCopied = ref(false);

  const pagesNav = [
    { label: 'Home', url: '#app' },
    { label: 'Services', url: '#services' },
    { label: 'Projects', url: '#works' },
    { label: 'About', url: '#about-me-section' },
    { label: 'Arsenal', url: '#slider' },
  ];

  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/FerrelHD' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ferrel-rashad-8a165514b/',
    },
    { label: 'Instagram', url: 'https://www.instagram.com/ferrelrshd' },
    { label: 'YouTube', url: 'https://www.youtube.com/@ferrelrashad3399' },
  ];

  const navigateTo = (url: string) => {
    lenis.start();
    lenis.scrollTo(url, { duration: 2 });
  };

  const scrollToTop = () => {
    lenis.start();
    lenis.scrollTo(0, { duration: 2 });
  };

  const copyEmail = () => {
    navigator.clipboard
      .writeText('ferrelrashadakeyla2014@gmail.com')
      .then(() => {
        emailCopied.value = true;
        setTimeout(() => {
          emailCopied.value = false;
        }, 2000);
      });
  };

  onBeforeMount(() => {
    makeItHappen.value = textSplitterIntoChar(makeItHappen.value);
  });

  onMounted(() => {
    animateSplitText(
      '#make-it-happen .letters',
      '#make-it-happen',
      1.5,
      0.01,
      0,
    );
  });
</script>
