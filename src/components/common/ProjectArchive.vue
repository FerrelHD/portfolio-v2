<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="archiveOverlay"
      class="fixed inset-0 z-[115] flex flex-col bg-[#faf9f6] text-[#22201e] select-none will-change-[clip-path] overflow-hidden"
      style="clip-path: inset(100% 0 0 0);"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-label="All Projects Archive"
    >
      <!-- Top Fixed Header -->
      <header class="shrink-0 border-b border-black/10 bg-[#faf9f6]/95 backdrop-blur-md px-6 sm:px-10 md:px-16 lg:px-24 py-5 md:py-6 flex items-center justify-between z-20">
        <!-- Left: Editorial Title & Count Badge -->
        <div class="flex items-baseline gap-4 sm:gap-6">
          <h2 class="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#22201e] leading-none">
            ARCHIVE
          </h2>
          <span class="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#22201e]/60 font-medium">
            INDEX // {{ filteredProjects.length.toString().padStart(2, '0') }} WORKS
          </span>
        </div>

        <!-- Right: Close Button -->
        <button
          ref="closeBtn"
          type="button"
          @click="handleClose"
          class="group flex items-center justify-center w-9 h-9 rounded-full text-[#22201e]/60 hover:text-[#22201e] hover:bg-black/[0.06] transition-all duration-200 cursor-pointer outline-none"
          aria-label="Close archive dialog"
        >
          <span class="text-lg transition-transform duration-300 group-hover:rotate-90 inline-block">✕</span>
        </button>
      </header>

      <!-- Scrollable Main Content -->
      <main class="flex-1 min-h-0 overflow-y-auto px-6 sm:px-10 md:px-16 lg:px-24 py-8 md:py-12">
        <div class="max-w-[1500px] mx-auto flex flex-col gap-8 md:gap-10">
          <!-- Introduction Paragraph & Filter Controls -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-black/10">
            <div class="max-w-2xl">
              <p class="font-sans text-sm sm:text-base md:text-lg text-[#22201e]/75 leading-relaxed font-normal">
                A complete catalog of fullstack web architectures, creative motion experiments, machine learning systems, and 3D simulations built between 2024 and 2026.
              </p>
            </div>

            <!-- Filter Pills -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <button
                v-for="cat in archiveCategories"
                :key="cat.id"
                type="button"
                @click="activeCategory = cat.id"
                class="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-sans font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer outline-none select-none"
                :class="[
                  activeCategory === cat.id
                    ? 'bg-[#22201e] text-[#faf9f6] shadow-sm'
                    : 'bg-black/[0.04] text-[#22201e]/70 hover:bg-black/[0.08] hover:text-[#22201e] border border-black/5'
                ]"
              >
                {{ cat.label }}
                <span class="ml-1 opacity-60 tabular-nums text-[11px]">
                  ({{ getCategoryCount(cat.id) }})
                </span>
              </button>
            </div>
          </div>

          <!-- Desktop Table (>= 768px) -->
          <div class="hidden md:block w-full">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-black/15 text-[11px] font-sans uppercase tracking-[0.2em] text-[#22201e]/50">
                  <th class="py-4 pr-4 w-16 shrink-0 font-medium">Year</th>
                  <th class="py-4 pr-6 font-medium">Project</th>
                  <th class="py-4 pr-6 hidden lg:table-cell font-medium">Category</th>
                  <th class="py-4 pr-4 hidden xl:table-cell font-medium">Built With</th>
                  <th class="py-4 text-right w-28 shrink-0 font-medium">Link</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-black/10">
                <tr
                  v-for="project in filteredProjects"
                  :key="project.id"
                  @pointerenter="onRowMouseEnter(project, $event)"
                  @pointerleave="onRowMouseLeave"
                  class="group transition-colors duration-200 hover:bg-black/[0.03] cursor-pointer"
                >
                  <!-- Year -->
                  <td class="py-5 pr-4 font-sans text-sm tabular-nums text-[#22201e]/60 group-hover:text-[#22201e] transition-colors whitespace-nowrap">
                    {{ project.year }}
                  </td>

                  <!-- Project Title -->
                  <td class="py-5 pr-6">
                    <a
                      :href="project.liveUrl || project.githubUrl"
                      target="_blank"
                      rel="noreferrer"
                      class="font-serif text-lg lg:text-xl xl:text-2xl tracking-tight text-[#22201e] group-hover:underline underline-offset-4 decoration-1 decoration-black/30 transition-colors inline-flex items-baseline gap-2"
                    >
                      <span>{{ project.title }}</span>
                      <span class="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-sans text-black/50">↗</span>
                    </a>
                    <!-- Category shown inline on md, hidden on lg where it has its own column -->
                    <p class="lg:hidden mt-0.5 text-xs font-sans text-[#22201e]/55">{{ project.category }}</p>
                  </td>

                  <!-- Category (lg+) -->
                  <td class="py-5 pr-6 font-sans text-sm text-[#22201e]/75 hidden lg:table-cell">
                    {{ project.category }}
                  </td>

                  <!-- Built With (xl+) -->
                  <td class="py-5 pr-4 hidden xl:table-cell">
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="tech in project.techStack"
                        :key="tech"
                        class="px-2.5 py-0.5 rounded text-xs font-sans bg-black/[0.05] text-[#22201e]/80 border border-black/5 whitespace-nowrap"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </td>

                  <!-- Links -->
                  <td class="py-5 text-right whitespace-nowrap">
                    <div class="inline-flex items-center justify-end gap-3 text-xs font-sans font-medium uppercase tracking-wider">
                      <a
                        v-if="project.liveUrl"
                        :href="project.liveUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex items-center gap-1 text-[#22201e]/80 hover:text-black border-b border-black/20 hover:border-black transition-colors"
                        :aria-label="`View live demo for ${project.title}`"
                      >
                        <span>Live</span>
                        <span class="text-xs">↗</span>
                      </a>
                      <a
                        v-if="project.githubUrl"
                        :href="project.githubUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex items-center gap-1 text-[#22201e]/80 hover:text-black border-b border-black/20 hover:border-black transition-colors"
                        :aria-label="`View source code on GitHub for ${project.title}`"
                      >
                        <span>GitHub</span>
                        <span class="text-xs">↗</span>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards (< 768px) -->
          <div class="flex flex-col gap-4 md:hidden">
            <article
              v-for="project in filteredProjects"
              :key="project.id"
              class="p-5 rounded-xl border border-black/10 bg-white/70 shadow-xs flex flex-col gap-3.5"
            >
              <!-- Top Info: Year & Category -->
              <div class="flex items-center justify-between text-xs font-sans text-[#22201e]/60">
                <span class="tabular-nums font-medium">{{ project.year }}</span>
                <span class="uppercase tracking-wider text-[11px]">{{ project.category }}</span>
              </div>

              <!-- Project Title & Description -->
              <div>
                <h3 class="font-serif text-2xl tracking-tight text-[#22201e]">
                  {{ project.title }}
                </h3>
                <p v-if="project.description" class="mt-1 text-xs font-sans text-[#22201e]/70 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <!-- Tech Stack Badges -->
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="px-2 py-0.5 rounded text-[11px] font-sans bg-black/[0.05] text-[#22201e]/80"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Mobile Action Links -->
              <div class="flex items-center gap-4 pt-2 border-t border-black/5 text-xs font-sans font-medium uppercase tracking-wider">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-1 text-[#22201e] border-b border-black/30 py-0.5"
                >
                  <span>Live Demo</span>
                  <span>↗</span>
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center gap-1 text-[#22201e]/70 border-b border-black/20 py-0.5"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>

      <!-- Floating Cursor Preview (Desktop Only) -->
      <div
        ref="floatingPreview"
        class="hidden lg:block pointer-events-none fixed z-[130] w-[320px] rounded-xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.18)] border border-black/15 bg-white will-change-transform"
        :style="{
          opacity: isPreviewVisible ? 1 : 0,
          transform: `scale(${isPreviewVisible ? 1 : 0.92})`,
          transition: 'opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }"
      >
        <!-- macOS Browser Frame Top Header -->
        <div class="flex items-center justify-between px-3 py-1.5 bg-[#f3f2ee] border-b border-black/10">
          <div class="flex items-center gap-1.5">
            <span class="size-2.5 rounded-full bg-[#ff5f57]/80"></span>
            <span class="size-2.5 rounded-full bg-[#febc2e]/80"></span>
            <span class="size-2.5 rounded-full bg-[#28c840]/80"></span>
          </div>
          <span class="text-[10px] font-sans uppercase tracking-wider text-black/50 truncate max-w-[180px]">
            {{ hoveredProject?.title || 'Preview' }}
          </span>
          <div class="w-8"></div>
        </div>

        <!-- Thumbnail Image -->
        <div class="relative aspect-video w-full overflow-hidden bg-[#e8e6df]">
          <img
            v-if="hoveredProject"
            :src="hoveredProject.previewImg"
            :alt="hoveredProject.title"
            class="size-full object-cover object-top transition-transform duration-500 ease-out scale-105"
            loading="lazy"
          />
        </div>

        <!-- Bottom Project Label -->
        <div class="px-3.5 py-2.5 bg-white flex items-center justify-between border-t border-black/5">
          <span class="font-serif text-sm text-[#22201e] truncate max-w-[200px]">
            {{ hoveredProject?.title }}
          </span>
          <span class="font-sans text-[10px] uppercase tracking-wider text-[#22201e]/60 font-medium">
            {{ hoveredProject?.year }}
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import gsap from 'gsap';
  import {
    archiveCategories,
    archiveProjects,
    type ArchiveCategoryFilter,
    type ArchiveProject,
  } from '@/data/archiveProjects';

  const props = defineProps<{
    isOpen: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const activeCategory = ref<ArchiveCategoryFilter>('all');
  const archiveOverlay = ref<HTMLElement | null>(null);
  const closeBtn = ref<HTMLElement | null>(null);
  const floatingPreview = ref<HTMLElement | null>(null);

  const hoveredProject = ref<ArchiveProject | null>(null);
  const isPreviewVisible = ref(false);

  let setPreviewX: ((val: number) => void) | null = null;
  let setPreviewY: ((val: number) => void) | null = null;
  let activeAnimation: gsap.core.Timeline | null = null;

  const filteredProjects = computed(() => {
    if (activeCategory.value === 'all') {
      return archiveProjects;
    }
    return archiveProjects.filter((p) => p.categoryFilter === activeCategory.value);
  });

  const getCategoryCount = (catId: ArchiveCategoryFilter) => {
    if (catId === 'all') return archiveProjects.length;
    return archiveProjects.filter((p) => p.categoryFilter === catId).length;
  };

  const onRowMouseEnter = (project: ArchiveProject, e: PointerEvent) => {
    if (window.innerWidth < 1024) return;
    hoveredProject.value = project;
    isPreviewVisible.value = true;
    updatePreviewPosition(e.clientX, e.clientY);
  };

  const onRowMouseLeave = () => {
    isPreviewVisible.value = false;
  };

  const updatePreviewPosition = (clientX: number, clientY: number) => {
    const previewWidth = 320;
    const previewHeight = 220;
    const padding = 20;

    // Offset slightly right and down from cursor, clamp within viewport
    let targetX = clientX + 24;
    let targetY = clientY - 100;

    if (targetX + previewWidth > window.innerWidth - padding) {
      targetX = clientX - previewWidth - 24;
    }
    if (targetY + previewHeight > window.innerHeight - padding) {
      targetY = window.innerHeight - previewHeight - padding;
    }
    if (targetY < padding) {
      targetY = padding;
    }

    if (setPreviewX && setPreviewY) {
      setPreviewX(targetX);
      setPreviewY(targetY);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isPreviewVisible.value) {
      updatePreviewPosition(e.clientX, e.clientY);
    }
  };

  const openArchiveAnimation = () => {
    nextTick(() => {
      if (!archiveOverlay.value) return;

      if (activeAnimation) activeAnimation.kill();

      gsap.set(archiveOverlay.value, { clipPath: 'inset(100% 0 0 0)' });

      activeAnimation = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
      });

      // Curtain wipe reveal from bottom to top
      activeAnimation.to(archiveOverlay.value, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.75,
        ease: 'power3.inOut',
      });
    });
  };

  const closeArchiveAnimation = (callback?: () => void) => {
    if (!archiveOverlay.value) {
      callback?.();
      return;
    }

    if (activeAnimation) activeAnimation.kill();

    activeAnimation = gsap.timeline({
      onComplete: () => {
        callback?.();
      },
    });

    activeAnimation.to(archiveOverlay.value, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.5,
      ease: 'power3.inOut',
    });
  };

  const handleClose = () => {
    isPreviewVisible.value = false;
    closeArchiveAnimation(() => {
      emit('close');
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!props.isOpen) return;

    if (e.key === 'Escape') {
      handleClose();
      return;
    }

    // Focus trapping within modal
    if (e.key === 'Tab' && archiveOverlay.value) {
      const focusableEls = archiveOverlay.value.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableEls.length) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  watch(
    () => props.isOpen,
    (val) => {
      if (val) {
        document.body.style.overflow = 'hidden';
        openArchiveAnimation();
        nextTick(() => {
          closeBtn.value?.focus();
          if (floatingPreview.value) {
            setPreviewX = gsap.quickTo(floatingPreview.value, 'x', {
              duration: 0.35,
              ease: 'power3.out',
            });
            setPreviewY = gsap.quickTo(floatingPreview.value, 'y', {
              duration: 0.35,
              ease: 'power3.out',
            });
          }
        });
      } else {
        document.body.style.overflow = '';
        isPreviewVisible.value = false;
        hoveredProject.value = null;
      }
    },
  );

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('mousemove', onMouseMove);
    document.body.style.overflow = '';
  });
</script>
