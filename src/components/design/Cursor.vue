<template>
  <div class="invisible pointer-events-none relative z-99999999 hidden md:visible md:block">
    <div
      id="cursor"
      class="pointer-events-none fixed top-0 left-0 z-100 flex items-center justify-between gap-2.5 h-[2.5rem] px-2.5 origin-center scale-0 rounded-lg bg-flax-smoke-900/90 backdrop-blur-md text-flax-smoke-50 border border-white/20 shadow-2xl opacity-0 select-none will-change-transform"
    >
      <div
        id="inner"
        class="flex items-center gap-2"
      >
        <div
          class="flex-center size-6 rounded bg-flax-smoke-100 text-flax-smoke-950 font-bold shadow-xs"
        >
          <!-- Enter / Return Key Arrow SVG Icon -->
          <svg
            class="size-3.5 text-flax-smoke-950"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
          </svg>
        </div>
        <p class="font-mono text-xs font-bold uppercase tracking-wider text-flax-smoke-100 pr-1">view</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import gsap from 'gsap';
  import { onMounted } from 'vue';

  onMounted(() => {
    const cursor = document.getElementById('cursor') as HTMLDivElement;
    if (!cursor) return;

    const xCursorTo = gsap.quickTo(cursor, 'x', {
      duration: 0.35,
      ease: 'power3.out',
    });
    const yCursorTo = gsap.quickTo(cursor, 'y', {
      duration: 0.35,
      ease: 'power3.out',
    });

    document.addEventListener('mousemove', (e) => {
      xCursorTo(e.clientX + 20);
      yCursorTo(e.clientY + 20);
    });
  });
</script>
