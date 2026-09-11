<template>
  <!-- Chapter II - 4 Fullscreen Slides -->
  <div class="contents">
    <section
      v-for="project in workProjects"
      :key="project.id"
      :id="`work-${project.id}`"
      class="work-slide shrink-0 w-full md:w-screen h-svh md:h-dvh flex flex-col justify-between select-none
             bg-[#faf9f6] text-[#22201e] relative overflow-hidden
             pt-10 pb-4 px-6 md:pt-6 md:pb-4 lg:pt-8 lg:pb-5 md:pl-24 md:pr-12 font-sans"
    >
      <!-- Top Row: CHAPTER II on Left, Live Link on Right -->
      <div class="flex items-center justify-between">
        <div class="overflow-hidden">
          <h2 class="slide-chapter-title font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#22201e] uppercase leading-none will-change-transform">
            CHAPTER II
          </h2>
        </div>

        <div class="flex items-center gap-5">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noreferrer"
            class="hidden sm:inline-flex items-center gap-1.5 text-xs md:text-sm font-medium uppercase tracking-wider text-[#22201e]/70 hover:text-[#22201e] border-b border-black/20 hover:border-black transition-colors"
          >
            <span>Live Project</span>
            <span class="text-sm md:text-base">↗</span>
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noreferrer"
            class="hidden sm:inline-flex items-center gap-1.5 text-xs md:text-sm font-medium uppercase tracking-wider text-[#22201e]/70 hover:text-[#22201e] border-b border-black/20 hover:border-black transition-colors"
          >
            <span>GitHub</span>
            <span class="text-sm md:text-base">↗</span>
          </a>
        </div>
      </div>

      <!-- Main Middle Grid: Left Browser Mockup & About, Right Project Title & Meta -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 lg:gap-10 items-start my-auto py-0">
        
        <!-- Left Column: macOS Browser Mockup + About Description -->
        <div class="md:col-span-6 flex flex-col gap-2.5 lg:gap-3 max-w-[420px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[620px]">
          <!-- Entrance Animation Wrapper for Mockup -->
          <div class="slide-mockup will-change-transform">
            <!-- macOS Browser Frame Mockup with Responsive Height Clamping -->
            <a
              :href="project.liveUrl || project.githubUrl"
              target="_blank"
              rel="noreferrer"
              class="group/mockup relative block w-full max-h-[25vh] lg:max-h-[28vh] xl:max-h-[32vh] overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-black/30 hover:shadow-[0_22px_45px_rgba(0,0,0,0.13)] cursor-pointer"
            >
              <!-- Browser Top Bar -->
              <div class="flex items-center justify-between px-3 py-1.5 bg-[#f3f2ee] border-b border-black/10 transition-colors duration-300 group-hover/mockup:bg-[#eae8e3]">
                <!-- Window Dots -->
                <div class="flex items-center gap-1.5">
                  <span class="size-2 rounded-full bg-[#ff5f56]/80 transition-transform duration-300 group-hover/mockup:scale-110"></span>
                  <span class="size-2 rounded-full bg-[#ffbd2e]/80 transition-transform duration-300 group-hover/mockup:scale-110"></span>
                  <span class="size-2 rounded-full bg-[#27c93f]/80 transition-transform duration-300 group-hover/mockup:scale-110"></span>
                </div>
                <!-- URL Pill -->
                <div class="px-2.5 py-0.5 rounded-md bg-white text-[10px] sm:text-[11px] font-mono text-[#22201e]/60 border border-black/5 truncate max-w-[180px] transition-colors duration-300 group-hover/mockup:text-[#22201e]">
                  {{ project.domain }}
                </div>
                <div class="size-2"></div>
              </div>
              <!-- Screenshot Preview with Micro-Zoom & Subtle Sheen -->
              <div class="relative aspect-[16/9] max-h-[21vh] lg:max-h-[24vh] xl:max-h-[28vh] w-full overflow-hidden bg-black/5">
                <img
                  :src="project.previewImg"
                  :alt="project.title"
                  class="size-full object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-[1.05]"
                  loading="lazy"
                />
                <!-- Subtle Glass Sheen on Hover -->
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 opacity-0 transition-opacity duration-500 group-hover/mockup:opacity-100"></div>
              </div>
            </a>
          </div>

          <!-- About Project Section with Text Box Reveal -->
          <div class="slide-about-container flex flex-col">
            <!-- Section Heading (tightly wrapped) -->
            <div class="slide-about-item relative inline-block self-start overflow-hidden mb-1 pr-1">
              <span class="slide-about-text block text-xs sm:text-sm md:text-base font-sans font-semibold text-[#22201e]">
                About
              </span>
              <div class="slide-about-box absolute inset-0 bg-[#22201e] pointer-events-none z-10 will-change-transform"></div>
            </div>

            <!-- Paragraph 1 -->
            <div class="slide-about-item relative overflow-hidden mb-1 max-w-xl">
              <p class="slide-about-text font-sans text-xs sm:text-[13px] md:text-[13px] lg:text-sm xl:text-base leading-[140%] text-[#22201e]/85 text-justify">
                {{ project.aboutP1 }}
              </p>
              <div class="slide-about-box absolute inset-0 bg-[#22201e] pointer-events-none z-10 will-change-transform"></div>
            </div>

            <!-- Paragraph 2 -->
            <div class="slide-about-item relative overflow-hidden max-w-xl">
              <p class="slide-about-text font-sans text-xs sm:text-[13px] md:text-[13px] lg:text-sm xl:text-base leading-[140%] text-[#22201e]/85 text-justify">
                {{ project.aboutP2 }}
              </p>
              <div class="slide-about-box absolute inset-0 bg-[#22201e] pointer-events-none z-10 will-change-transform"></div>
            </div>
          </div>
        </div>

        <!-- Right Column: Project Title, Roles, Systems (Locked as single responsive unit) -->
        <div class="md:col-span-6 flex flex-col pt-1 md:pt-0 md:pl-2 lg:pl-4">
          <!-- Project Title (Masked Reveal) — Responsive, bold, uppercase, never clips -->
          <div class="overflow-hidden">
            <h3 class="slide-project-title font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl uppercase tracking-tight text-[#22201e] leading-[0.92] will-change-transform break-normal">
              {{ project.title }}
            </h3>
          </div>

          <!-- Role & System Metadata — Left-aligned directly beneath title -->
          <div class="flex flex-col gap-1.5 mt-4 sm:mt-5 md:mt-6 lg:mt-7 font-sans text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.1em] text-[#22201e]/75 text-left">
            <div class="overflow-hidden py-0.5">
              <div class="slide-project-meta will-change-transform">
                <span class="font-bold text-[#22201e]">ROLE: </span>
                <span class="font-medium text-[#22201e]/80">{{ project.role }}</span>
              </div>
            </div>
            <div class="overflow-hidden py-0.5">
              <div class="slide-project-meta will-change-transform">
                <span class="font-bold text-[#22201e]">SYSTEM: </span>
                <span class="font-medium text-[#22201e]/80">{{ project.system }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row: THE WORK #01 typography — balanced, right-aligned, fully in view on laptops -->
      <div class="flex items-end justify-end">
        <div class="flex items-end gap-1 leading-none select-none">
          <!-- THE stacked vertically -->
          <div class="flex flex-col uppercase font-sans font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#22201e]/25 leading-[0.85] tracking-tight">
            <span>THE</span>
          </div>
          <!-- WORK massive -->
          <div class="overflow-hidden leading-none">
            <span class="slide-number font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#22201e]/25 leading-[0.85] tracking-tighter will-change-transform inline-block">
              WORK
            </span>
          </div>
          <!-- Slide number -->
          <div class="overflow-hidden leading-none ml-1.5">
            <span class="slide-number-idx font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#22201e]/30 leading-[0.85] will-change-transform inline-block">
              {{ project.slideNumber }}
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom Row Metadata (Mobile Links fallback) -->
      <div class="flex items-center justify-between sm:hidden pt-2 border-t border-black/10 text-xs">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          class="font-medium text-[#22201e] underline"
        >
          Live Preview ↗
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          class="font-medium text-[#22201e] underline"
          :class="{ 'ml-auto': !project.liveUrl }"
        >
          GitHub ↗
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import gsap from 'gsap';
  import {
    indonesianCrustalObservatoryImg,
    spiderDevImg,
    fersyaShopImg,
    studentLifeImg,
  } from '@/assets/images';

  export interface WorkSlideProject {
    id: string;
    slideNumber: string;
    title: string;
    aboutP1: string;
    aboutP2: string;
    role: string;
    system: string;
    domain: string;
    previewImg: string;
    liveUrl?: string;
    githubUrl?: string;
  }

  const workProjects: WorkSlideProject[] = [
    {
      id: 'nusantara-observatory',
      slideNumber: '#01',
      title: 'Nusantara Observatory',
      aboutP1:
        'Hazard information is often scattered across different sources, making it difficult to see what is happening across Indonesia in one place. I wanted to turn fragmented hazard data into a single visual experience that makes complex events easier to explore.',
      aboutP2:
        'I built an interactive geospatial observatory integrating multiple live data sources into a real-time 2D map with event replay and proximity analysis. This project pushed me to think beyond interfaces — combining data, performance, visualization, and usability into one system.',
      role: 'Frontend & Geospatial Engineer',
      system: 'React 19 · TypeScript · Canvas 2D',
      domain: 'nusantara-observatory.vercel.app',
      previewImg: indonesianCrustalObservatoryImg,
      liveUrl: 'https://nusantara-observatory.vercel.app/',
      githubUrl: 'https://github.com/FerrelHD/Global-Seismic-Tracker',
    },
    {
      id: 'spidey-dev',
      slideNumber: '#02',
      title: 'Spidey Dev Portfolio',
      aboutP1:
        'Most developer portfolios feel the same — clean grids, neutral colors, safe layouts. I wanted to build something that felt immersive and cinematic, a portfolio that doubles as a creative playground.',
      aboutP2:
        'I designed and developed an interactive Spider-Man-themed showcase with Web Audio soundscapes, 3D parallax effects, kinetic typography, and fluid GSAP transitions that bring the interface to life.',
      role: 'Creative Developer',
      system: 'React 19 · GSAP · Web Audio API',
      domain: 'spidey-portfolio-ferrel.vercel.app',
      previewImg: spiderDevImg,
      liveUrl: 'https://spidey-portfolio-ferrel.vercel.app/',
      githubUrl: 'https://github.com/FerrelHD/Portofolio',
    },
    {
      id: 'fersya-shop',
      slideNumber: '#03',
      title: 'Fersya Shop',
      aboutP1:
        'Small businesses often struggle with managing products, orders, and user roles without expensive enterprise tools. I wanted to create a storefront that is both beautiful for customers and powerful for administrators.',
      aboutP2:
        'I built a modern organic product storefront with a Filament admin dashboard, granular role-based access control, and dynamic inventory management — giving shop owners full control without touching code.',
      role: 'Full-Stack Developer',
      system: 'Laravel 11 · Filament · Tailwind',
      domain: 'localhost:8000/admin',
      previewImg: fersyaShopImg,
      githubUrl: 'https://github.com/FerrelHD/Fersya-Shop',
    },
    {
      id: 'student-life',
      slideNumber: '#04',
      title: 'Student Life',
      aboutP1:
        'Students juggle tasks, schedules, and focus sessions across multiple apps. I wanted to consolidate everything into one focused, offline-first productivity ecosystem.',
      aboutP2:
        'I designed and developed an all-in-one student tool featuring smart task management, Pomodoro focus cycles, and schedule tracking with PWA offline support — so students can stay productive anywhere.',
      role: 'Lead Developer & Product Designer',
      system: 'React 19 · TypeScript · Supabase · PWA',
      domain: 'student-life.app',
      previewImg: studentLifeImg,
      liveUrl: 'https://ferrelhd.github.io/Student-Life/',
      githubUrl: 'https://github.com/FerrelHD/Student-Life',
    },
  ];

  const revealedSlideIndices = new Set<number>();

  // Function to reveal text animation for a specific slide
  const revealSlideIndex = (index: number) => {
    const slides = document.querySelectorAll('.work-slide');
    if (!slides[index]) return;

    const slide = slides[index];
    const chapter = slide.querySelector('.slide-chapter-title');
    const title = slide.querySelector('.slide-project-title');
    const metaLines = slide.querySelectorAll('.slide-project-meta');
    const num = slide.querySelector('.slide-number');
    const numIdx = slide.querySelector('.slide-number-idx');
    const mockup = slide.querySelector('.slide-mockup');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (chapter) tl.to(chapter, { yPercent: 0, duration: 1.1 }, 0);
    if (title) tl.to(title, { yPercent: 0, duration: 1.1 }, 0.1);
    if (metaLines.length) {
      tl.fromTo(
        metaLines,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' },
        0.22,
      );
    }
    if (mockup) {
      tl.to(mockup, { y: 0, scale: 1, opacity: 1, duration: 1.0 }, 0.15);
    }
    if (num) tl.to(num, { yPercent: 0, duration: 1.2 }, 0.2);
    if (numIdx) tl.to(numIdx, { yPercent: 0, duration: 1.2 }, 0.25);

    // Text box reveal for About section (once per slide entrance)
    if (!revealedSlideIndices.has(index)) {
      revealedSlideIndices.add(index);
      const aboutItems = slide.querySelectorAll('.slide-about-item');
      aboutItems.forEach((item, i) => {
        const box = item.querySelector('.slide-about-box');
        const text = item.querySelector('.slide-about-text');
        if (!box || !text) return;

        const startTime = 0.25 + i * 0.14;
        const boxDuration = 0.42;

        // 1. Box expands left -> right
        tl.to(
          box,
          {
            scaleX: 1,
            duration: boxDuration,
            ease: 'power2.inOut',
          },
          startTime,
        );

        // 2. Unhide text and flip box origin to right edge
        tl.set(text, { opacity: 1 }, startTime + boxDuration);
        tl.set(box, { transformOrigin: 'right center' }, startTime + boxDuration);

        // 3. Box collapses left -> right away from the text
        tl.to(
          box,
          {
            scaleX: 0,
            duration: boxDuration,
            ease: 'power2.inOut',
          },
          startTime + boxDuration,
        );
      });
    }
  };

  onMounted(() => {
    // Set initial hidden state via GSAP (not CSS classes) so reveal animation works
    document.querySelectorAll('.work-slide').forEach((slide) => {
      const chapter = slide.querySelector('.slide-chapter-title');
      const title = slide.querySelector('.slide-project-title');
      const metaLines = slide.querySelectorAll('.slide-project-meta');
      const num = slide.querySelector('.slide-number');
      const numIdx = slide.querySelector('.slide-number-idx');
      const mockup = slide.querySelector('.slide-mockup');
      const aboutBoxes = slide.querySelectorAll('.slide-about-box');
      const aboutTexts = slide.querySelectorAll('.slide-about-text');

      if (chapter) gsap.set(chapter, { yPercent: 105 });
      if (title) gsap.set(title, { yPercent: 105 });
      if (metaLines.length) gsap.set(metaLines, { yPercent: 120, opacity: 0 });
      if (num) gsap.set(num, { yPercent: 105 });
      if (numIdx) gsap.set(numIdx, { yPercent: 105 });
      if (mockup) gsap.set(mockup, { y: 35, scale: 0.96, opacity: 0 });
      if (aboutBoxes.length) gsap.set(aboutBoxes, { scaleX: 0, transformOrigin: 'left center' });
      if (aboutTexts.length) gsap.set(aboutTexts, { opacity: 0 });
    });
  });

  defineExpose({
    revealSlideIndex,
  });
</script>
