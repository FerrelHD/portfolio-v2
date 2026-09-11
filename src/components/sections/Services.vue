<template>
  <section
    id="services"
    class="shrink-0 w-full md:min-w-max md:h-dvh flex flex-col justify-between
           px-6 py-16 md:py-12 md:pl-28 md:pr-16 bg-[#171514] text-[#f3eee8] border-b md:border-b-0 md:border-r border-white/5 select-none"
  >
    <!-- Top Header Bar -->
    <div class="flex items-center justify-between border-b border-white/10 pb-4">
      <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-flame">
        <span class="size-1.5 rounded-full bg-flame animate-pulse"></span>
        <span>CHAPTER // 01</span>
      </div>
      <span class="font-mono text-xs text-[#f3eee8]/40 uppercase tracking-widest">
        SERVICES // CAPABILITIES
      </span>
    </div>

    <!-- Middle Content: Title + Horizontal Cards Row -->
    <div class="my-auto py-8 flex flex-col gap-10">
      <div class="max-w-2xl">
        <h2 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-tight text-[#f3eee8] leading-[0.95]">
          ENGINEERED WITH INTENTION & ARTISTRY
        </h2>
        <p class="font-sans text-sm sm:text-base text-[#f3eee8]/70 mt-3 max-w-xl">
          Intuitive, high-performance digital solutions crafted with modern architecture, fluid motion physics, and clean code.
        </p>
      </div>

      <!-- Services Cards Row -->
      <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
        <div
          v-for="(card, index) in servicesCardProps"
          :key="index"
          class="w-full md:w-[360px] lg:w-[420px] shrink-0 rounded-2xl border border-white/10 bg-[#1f1d1b] p-6 sm:p-8 flex flex-col justify-between hover:border-white/25 transition-all duration-300"
        >
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-[#f3eee8]/50">
              <span>( 0{{ index + 1 }} )</span>
              <span class="size-2 rounded-full bg-flame"></span>
            </div>
            <h3 class="font-serif text-2xl sm:text-3xl text-[#f3eee8] font-normal uppercase mt-6 mb-3">
              {{ card.title }}
            </h3>
            <p class="font-sans text-xs sm:text-sm text-[#f3eee8]/70 leading-relaxed">
              {{ card.body }}
            </p>
          </div>

          <div class="mt-8 pt-4 border-t border-white/10 flex flex-col gap-2 font-mono text-xs text-[#f3eee8]/80">
            <div v-for="(heading, hIdx) in card.headings" :key="hIdx" class="flex items-center gap-2">
              <span class="text-flame">→</span>
              <span>{{ heading }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer bar in section -->
    <div class="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-[#f3eee8]/40">
      <span>FULL-CYCLE DEVELOPMENT</span>
      <span>NEXT-GEN WEB EXPERIENCES</span>
    </div>
  </section>
</template>

<script setup lang="ts">
  const servicesCardProps = [
    {
      title: 'Full-Stack Web Dev',
      body: 'I engineer fast, scalable, and production-ready web applications using modern stacks like React 19, Next.js, TypeScript, Laravel 11, and robust database architectures.',
      headings: ['React 19 & Next.js', 'Laravel & Node API', 'Scalable Database'],
    },
    {
      title: 'Interactive UI & Motion',
      body: 'I craft immersive, 60 FPS fully-responsive interfaces with physics-based springs, GSAP ScrollTriggers, and captivating micro-interactions that elevate brand presence.',
      headings: [
        'GSAP & Micro-Animations',
        'Intuitive UI/UX Design',
        'Performance & 60 FPS',
      ],
    },
    {
      title: '3D & Game Systems',
      body: 'From Unity C# arcade game loops and Luau simulation mechanics to stylized Blender 3D modeling and cinematic video editing, I build engaging interactive media.',
      headings: [
        'Unity & C# Mechanics',
        'Blender 3D Modeling',
        'Cinematic Video Motion',
      ],
    },
  ];
</script>
