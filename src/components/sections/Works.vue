<template>
  <section id="works" class="common-padding mb-20">
    <div class="flex flex-col">
      <h3
        id="selectedWorks"
        v-html="selectedWorks"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>
      <p
        class="heading-1 text-flax-smoke-400 text-opacity-50 hidden w-4/5 text-end font-extrabold sm:block"
      >
        ( {{ selectedWorksProps.length }} )
      </p>

      <div
        id="selected-works-text"
        class="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2"
        >
          (
          <span class="inline sm:hidden">{{ selectedWorksProps.length }} </span>
          PROJECTS )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7"
        >
          Featured client projects that have been meticulously crafted with
          passion and purpose over the years.
        </p>
      </div>
    </div>

    <div
      class="sm:column-gap relative mt-12 grid size-full grid-cols-12 lg:mt-[10%]"
    >
      <div
        class="text-flax-smoke-100 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex"
      >
        <span class="font-title! relative -tracking-wider">0</span>
        <span
          id="index"
          class="font-title! relative -tracking-wider will-change-transform"
          >{{ index + 1 }}.</span
        >
      </div>
      <aside
        @mouseenter="showCursor"
        @mouseleave="hideCursor"
        class="relative col-span-full flex flex-col space-y-16 md:col-span-7"
      >
        <div
          v-for="(work, i) in selectedWorksProps"
          :key="i"
          class="work-card group @container"
        >
          <!-- macOS-Style Browser Frame Direct Container -->
          <a
            :href="work.primaryUrl !== '#' ? work.primaryUrl : undefined"
            :target="work.primaryUrl !== '#' ? '_blank' : undefined"
            :aria-label="`Open ${work.name} project live preview or repository`"
            class="group/frame relative block w-full select-none active:scale-[0.99] transition-transform duration-200"
          >
            <div
              class="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-[#121211] shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/35 hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
            >
              <!-- Browser Header / Title Bar -->
              <div
                class="flex items-center justify-between border-b border-white/10 bg-[#1a1a19] px-4 py-3"
              >
                <!-- 3 Window Dots -->
                <div class="flex items-center gap-1.5">
                  <span class="size-2.5 rounded-full bg-[#FF5F56]"></span>
                  <span class="size-2.5 rounded-full bg-[#FFBD2E]"></span>
                  <span class="size-2.5 rounded-full bg-[#27C93F]"></span>
                </div>

                <!-- URL Bar Pill -->
                <div
                  class="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-3.5 py-0.5 text-[11px] font-mono text-flax-smoke-300"
                >
                  <svg
                    class="size-3 text-flax-smoke-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>{{ work.domain }}</span>
                </div>

                <!-- Status Badge -->
                <div class="flex items-center text-[10px] font-medium tracking-wide">
                  <span
                    v-if="work.status === 'live'"
                    class="inline-flex items-center gap-1 text-emerald-400"
                  >
                    <span class="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live</span>
                  </span>
                  <span
                    v-else-if="work.status === 'roblox'"
                    class="inline-flex items-center gap-1 text-amber-400"
                  >
                    <span class="size-1.5 rounded-full bg-amber-400"></span>
                    <span>Roblox</span>
                  </span>
                  <span
                    v-else-if="work.status === 'repo'"
                    class="inline-flex items-center gap-1 text-sky-400"
                  >
                    <span class="size-1.5 rounded-full bg-sky-400"></span>
                    <span>GitHub</span>
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 text-flax-smoke-500"
                  >
                    <span class="size-1.5 rounded-full bg-flax-smoke-500"></span>
                    <span>Archived</span>
                  </span>
                </div>
              </div>

              <!-- Viewport Screenshot Container -->
              <div class="relative aspect-16/10 w-full overflow-hidden bg-[#0c0c0c]">
                <img
                  :src="work.previewImg"
                  :alt="work.name"
                  class="size-full object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-[1.02]"
                />
              </div>
            </div>
          </a>

          <!-- Project Information & Action Links -->
          <div class="mt-5">
            <div class="flex items-center justify-between">
              <p class="heading-6 font-title! leading-none text-flax-smoke-400">
                {{ work.category }}
              </p>
              <p class="text-xs font-mono text-flax-smoke-500">
                {{ work.year }}
              </p>
            </div>

            <div class="mt-2 items-center justify-between gap-4 sm:flex">
              <h3
                class="heading-3 font-title! font-bold uppercase transition-colors group-hover:text-flax-smoke-100"
              >
                {{ work.name }}
              </h3>

              <!-- Action Link Buttons -->
              <div class="mt-3 flex flex-wrap items-center gap-2 select-none sm:mt-0">
                <!-- Primary Action Link -->
                <a
                  v-if="work.primaryUrl && work.primaryUrl !== '#'"
                  :href="work.primaryUrl"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 rounded-full border border-flax-smoke-300 bg-flax-smoke-300 px-4 py-1.5 text-xs font-semibold text-flax-smoke-900 transition-all duration-300 hover:bg-transparent hover:text-flax-smoke-100 hover:border-flax-smoke-100"
                >
                  <span v-if="work.status === 'live'">Live Demo</span>
                  <span v-else-if="work.status === 'roblox'">Play Game</span>
                  <span v-else>Source Code</span>
                  <svg
                    class="size-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>

                <!-- GitHub Secondary Link if available -->
                <a
                  v-if="work.githubUrl && work.status === 'live'"
                  :href="work.githubUrl"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 rounded-full border border-flax-smoke-500/60 px-3.5 py-1.5 text-xs font-medium text-flax-smoke-300 transition-all duration-300 hover:border-flax-smoke-300 hover:text-flax-smoke-100"
                >
                  <span>GitHub</span>
                  <svg
                    class="size-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>

                <!-- Offline / Archived badge -->
                <span
                  v-if="work.status === 'offline'"
                  class="inline-flex items-center rounded-full border border-flax-smoke-500/40 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-flax-smoke-400"
                >
                  Archived Project
                </span>
              </div>
            </div>

            <!-- Tech Tags -->
            <div class="mt-3 flex flex-wrap gap-1.5 select-none">
              <span
                v-for="tag in work.tags"
                :key="tag"
                class="rounded-full border border-flax-smoke-500/40 bg-black/40 px-3.5 py-1 text-xs text-flax-smoke-400 transition-colors hover:border-flax-smoke-300 hover:text-flax-smoke-200"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import { computed, onBeforeMount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import { useWindowSize } from '@vueuse/core';
  import {
    charlesLeclercImg,
    stockPredictionImg,
    spiderDevImg,
    fersyaShopImg,
    finesserShopImg,
    studentLifeImg,
    streetRushImg,
    gunungGedeImg,
  } from '@/assets/images';

  const isSmallScreen = computed(() => {
    return useWindowSize().width.value < 768;
  });
  const index = ref(0);
  const selectedWorks = ref('Selected Projects /');

  const tl = gsap
    .timeline({ defaults: { duration: 0.25 } })
    .to(['#cursor', '#inner'], {
      scale: 1,
      opacity: 1,
    })
    .paused(true);

  const showCursor = () => {
    tl.play();
  };
  const hideCursor = () => {
    tl.reverse();
  };

  const selectedWorksProps = [
    {
      name: 'Charles Leclerc #16 Showcase',
      category: 'Creative Frontend & Motion Physics',
      tags: ['React 18', 'GSAP', 'Canvas 2D', 'Framer Motion', 'Tailwind CSS'],
      status: 'live',
      domain: 'leclerc-redline.vercel.app',
      previewImg: charlesLeclercImg,
      primaryUrl: 'https://leclerc-redline.vercel.app/',
      githubUrl: 'https://github.com/FerrelHD/leclerc-redline',
      year: '2026',
    },
    {
      name: 'Stock Prediction ML',
      category: 'Quantitative ML & Web Analytics',
      tags: ['Python', 'Streamlit', 'XGBoost', 'LightGBM', 'Scikit-Learn'],
      status: 'repo',
      domain: 'stock-ml.system',
      previewImg: stockPredictionImg,
      primaryUrl: 'https://github.com/FerrelHD/Stock-Prediction-System',
      githubUrl: 'https://github.com/FerrelHD/Stock-Prediction-System',
      year: '2026',
    },
    {
      name: 'Spider-Dev Portfolio',
      category: 'Creative Frontend & Web Audio',
      tags: ['React 19', 'GSAP', 'Tailwind CSS', 'Web Audio API'],
      status: 'live',
      domain: 'spider-dev.portfolio',
      previewImg: spiderDevImg,
      primaryUrl: 'https://github.com/FerrelHD/Portofolio',
      githubUrl: 'https://github.com/FerrelHD/Portofolio',
      year: '2026',
    },
    {
      name: 'Student Life',
      category: 'Productivity Web App',
      tags: ['React 19', 'TypeScript', 'Supabase', 'Tailwind'],
      status: 'live',
      domain: 'student-life.app',
      previewImg: studentLifeImg,
      primaryUrl: 'https://ferrelhd.github.io/Student-Life/',
      githubUrl: 'https://github.com/FerrelHD/Student-Life',
      year: '2025',
    },
    {
      name: 'Fersya Shop',
      category: 'Full-Stack Organic E-Commerce',
      tags: ['Laravel 11', 'Filament Admin', 'Tailwind CSS'],
      status: 'repo',
      domain: 'fersyashop.store',
      previewImg: fersyaShopImg,
      primaryUrl: 'https://github.com/FerrelHD/Fersya-Shop',
      githubUrl: 'https://github.com/FerrelHD/Fersya-Shop',
      year: '2025',
    },
    {
      name: 'Finesser Shop',
      category: 'Digital Assets Storefront',
      tags: ['Laravel', 'Bootstrap', 'MySQL'],
      status: 'offline',
      domain: 'finesser.shop',
      previewImg: finesserShopImg,
      primaryUrl: '#',
      year: '2024',
    },
    {
      name: 'Street Rush',
      category: '3D Arcade Runner Game',
      tags: ['Unity', 'C#', 'Mobile 3D', 'Physics Engine'],
      status: 'repo',
      domain: 'streetrush.game',
      previewImg: streetRushImg,
      primaryUrl: 'https://github.com/FerrelHD/Street-Rush-Unity',
      githubUrl: 'https://github.com/FerrelHD/Street-Rush-Unity',
      year: '2024',
    },
    {
      name: 'Gunung Gede Simulation',
      category: '3D Hiking Simulation',
      tags: ['Luau', 'Roblox Studio', 'Terrain 3D'],
      status: 'roblox',
      domain: 'roblox.com/gunung-gede',
      previewImg: gunungGedeImg,
      primaryUrl:
        'https://www.roblox.com/games/125712163693709/Mount-Gede-Via-Gunung-Putri',
      year: '2024',
    },
  ];

  // Reusable function to handle forward scroll animation
  const createForwardTimeline = (
    index: any,
    i: any,
    selectedWorksProps: any[],
  ) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3 },
    });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: 100,
      onComplete: () => {
        index.value = Math.min(i, selectedWorksProps.length - 1);
      },
    }).to('#index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });

    return tl;
  };

  // Reusable function to handle backward scroll animation
  const createBackwardTimeline = (index: any, i: any) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: -100,
      onComplete: () => {
        index.value = Math.max(i, 0);
      },
    }).to('#index', {
      yPercent: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    });

    return tl;
  };

  onBeforeMount(() => {
    selectedWorks.value = textSplitterIntoChar('Selected Works / ', true);
  });

  onMounted(() => {
    animateSplitText(
      '#selectedWorks .letters',
      '#selected-works-text',
      0.7,
      0.01,
      0,
    );

    // Apply GSAP animations to each div
    if (!isSmallScreen.value)
      gsap.utils.toArray('.work-card').forEach((div: any, i: any) => {
        gsap.timeline({ defaults: { duration: 0.7 } }).to(div, {
          scrollTrigger: {
            trigger: div,
            start: 'top 25%',
            end: 'bottom 25%',
            scrub: 0.01,
            onLeaveBack: () => {
              // Backward scroll animation
              if (index.value !== 0) {
                gsap.to('#index', {
                  yPercent: 100,
                  duration: 0.3,
                  ease: 'power4.inOut',
                  onComplete: () => {
                    createBackwardTimeline(index, i - 1);
                  },
                });
              }
            },
          },
          ease: 'power1.inOut',
          onComplete: () => {
            // Forward scroll animation
            if (index.value !== selectedWorksProps.length - 1) {
              gsap.to('#index', {
                yPercent: -100,
                duration: 0.3,
                ease: 'power4.inOut',
                onComplete: () => {
                  createForwardTimeline(index, i + 1, selectedWorksProps);
                },
              });
            }
          },
        });
      });
  });
</script>
