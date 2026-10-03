<template>
  <Teleport to="body">
    <div
      v-if="project"
      ref="detailOverlay"
      data-lenis-prevent
      class="fixed inset-0 z-[125] flex flex-col bg-[#faf9f6] text-[#22201e] will-change-[clip-path] overflow-hidden select-text"
      style="clip-path: inset(100% 0 0 0);"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-label="`Case Study: ${project.title}`"
    >
      <!-- Top Fixed Sticky Header -->
      <header class="shrink-0 border-b border-black/10 bg-[#faf9f6]/95 backdrop-blur-md px-4 sm:px-8 md:px-12 lg:px-16 py-3.5 md:py-4 flex items-center justify-between z-30">
        <!-- Left: Back Button with ESC hint -->
        <button
          type="button"
          @click="handleClose"
          class="group flex items-center gap-2 px-3 py-1.5 -ml-2 rounded-full text-xs md:text-sm font-medium uppercase tracking-wider text-[#22201e]/75 hover:text-[#22201e] hover:bg-black/[0.05] transition-all cursor-pointer outline-none"
        >
          <span class="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
          <span>Back to Works</span>
        </button>

        <!-- Center: Project Title & Index Badge (Desktop) -->
        <div class="hidden md:flex items-center gap-3">
          <span class="font-mono text-xs text-[#22201e]/40 tracking-wider">{{ project.number }}</span>
          <span class="font-sans font-bold text-xs uppercase tracking-widest text-[#22201e] truncate max-w-[280px]">
            {{ project.title }}
          </span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.05] text-[#22201e]/70">
            {{ project.year }}
          </span>
        </div>

        <!-- Right: Close Button -->
        <div class="flex items-center gap-3">
          <button
            ref="closeBtn"
            type="button"
            @click="handleClose"
            class="group flex items-center justify-center size-8 sm:size-9 rounded-full text-[#22201e]/60 hover:text-[#22201e] hover:bg-black/[0.06] transition-all cursor-pointer outline-none"
            aria-label="Close case study dialog"
          >
            <span class="text-base sm:text-lg transition-transform duration-300 group-hover:rotate-90 inline-block">✕</span>
          </button>
        </div>
      </header>

      <!-- Scrollable Main Container -->
      <main
        ref="scrollContainer"
        data-lenis-prevent
        class="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12"
      >
        <div class="max-w-[1360px] mx-auto">
          
          <!-- Editorial Top Hero Header -->
          <div class="flex flex-col gap-4 pb-8 md:pb-12 border-b border-black/10">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-black/[0.06] text-[#22201e]/80">
                CASE STUDY · {{ project.number }}
              </span>
              <span class="font-sans text-xs uppercase tracking-widest text-[#22201e]/50 font-medium">
                {{ project.category }}
              </span>
            </div>

            <h1 class="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#22201e] uppercase tracking-tight leading-[0.95] max-w-4xl">
              {{ project.title }}
            </h1>

            <p class="font-serif text-lg sm:text-xl md:text-2xl text-[#22201e]/80 leading-snug max-w-3xl italic">
              "{{ project.tagline }}"
            </p>
          </div>

          <!-- Two-Column Editorial Grid (Option A) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-8 md:pt-12 items-start">
            
            <!-- Left Column: Sticky Sidebar on Desktop -->
            <aside class="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-8">
              
              <!-- Metadata Matrix Card -->
              <div class="flex flex-col rounded-xl border border-black/10 bg-black/[0.02] p-5 sm:p-6 divide-y divide-black/10 text-xs sm:text-[13px]">
                <div class="pb-3.5 flex flex-col gap-1">
                  <span class="font-mono text-[10px] uppercase tracking-widest text-[#22201e]/40 font-semibold">ROLE</span>
                  <span class="font-sans font-medium text-[#22201e]">{{ project.role }}</span>
                </div>

                <div class="py-3.5 flex flex-col gap-1">
                  <span class="font-mono text-[10px] uppercase tracking-widest text-[#22201e]/40 font-semibold">SYSTEM / ARCHITECTURE</span>
                  <span class="font-sans font-medium text-[#22201e]">{{ project.system }}</span>
                </div>

                <div class="py-3.5 flex flex-col gap-1">
                  <span class="font-mono text-[10px] uppercase tracking-widest text-[#22201e]/40 font-semibold">CONTEXT & YEAR</span>
                  <div class="flex items-center justify-between">
                    <span class="font-sans font-medium text-[#22201e]">{{ project.context }}</span>
                    <span class="font-mono text-[#22201e]/60">{{ project.year }}</span>
                  </div>
                </div>

                <div class="pt-3.5 flex flex-col gap-2">
                  <span class="font-mono text-[10px] uppercase tracking-widest text-[#22201e]/40 font-semibold">TECH STACK</span>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tech in project.techStack"
                      :key="tech"
                      class="px-2 py-0.5 rounded-md bg-white border border-black/10 text-[11px] font-sans text-[#22201e]/80"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Quick Links Box -->
              <div class="flex flex-col gap-2.5">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="group flex items-center justify-between px-4 py-3 rounded-lg bg-[#22201e] text-[#faf9f6] text-xs font-medium uppercase tracking-wider transition-all duration-200 hover:bg-black"
                >
                  <span>Visit Live Demo</span>
                  <span class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>

                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="group flex items-center justify-between px-4 py-3 rounded-lg border border-black/15 bg-white text-[#22201e] text-xs font-medium uppercase tracking-wider transition-all duration-200 hover:border-black/40 hover:bg-black/[0.02]"
                >
                  <span>Source Repository</span>
                  <span class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>

              <!-- Table of Contents (Desktop Jump Links) -->
              <div class="hidden lg:flex flex-col gap-3 pt-2">
                <span class="font-mono text-[10px] uppercase tracking-widest text-[#22201e]/50 font-semibold">TABLE OF CONTENTS</span>
                <nav class="flex flex-col gap-2 font-sans text-xs">
                  <a
                    href="#section-overview"
                    @click.prevent="scrollToSection('section-overview')"
                    class="text-[#22201e]/60 hover:text-[#22201e] transition-colors py-0.5 flex items-center gap-2"
                  >
                    <span class="font-mono text-xs text-[#22201e]/50 font-medium">01.</span>
                    <span>Problem & Context</span>
                  </a>
                  <a
                    href="#section-architecture"
                    @click.prevent="scrollToSection('section-architecture')"
                    class="text-[#22201e]/60 hover:text-[#22201e] transition-colors py-0.5 flex items-center gap-2"
                  >
                    <span class="font-mono text-xs text-[#22201e]/50 font-medium">02.</span>
                    <span>System Architecture</span>
                  </a>
                  <a
                    href="#section-features"
                    @click.prevent="scrollToSection('section-features')"
                    class="text-[#22201e]/60 hover:text-[#22201e] transition-colors py-0.5 flex items-center gap-2"
                  >
                    <span class="font-mono text-xs text-[#22201e]/50 font-medium">03.</span>
                    <span>Key Features</span>
                  </a>
                  <a
                    href="#section-takeaways"
                    @click.prevent="scrollToSection('section-takeaways')"
                    class="text-[#22201e]/60 hover:text-[#22201e] transition-colors py-0.5 flex items-center gap-2"
                  >
                    <span class="font-mono text-xs text-[#22201e]/50 font-medium">04.</span>
                    <span>Learnings & Outcomes</span>
                  </a>
                </nav>
              </div>
            </aside>

            <!-- Right Column: Rich Scrollable Narrative -->
            <div class="lg:col-span-8 flex flex-col gap-12 sm:gap-16">
              
              <!-- Hero Preview Media (Browser Frame Mockup) -->
              <div class="flex flex-col gap-2">
                <div class="overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                  <!-- Browser Bar -->
                  <div class="flex items-center justify-between px-3.5 py-2 bg-[#f3f2ee] border-b border-black/10">
                    <div class="flex items-center gap-1.5">
                      <span class="size-2.5 rounded-full bg-[#ff5f56]/80"></span>
                      <span class="size-2.5 rounded-full bg-[#ffbd2e]/80"></span>
                      <span class="size-2.5 rounded-full bg-[#27c93f]/80"></span>
                    </div>
                    <div class="px-3 py-0.5 rounded-md bg-white text-[11px] font-mono text-[#22201e]/70 border border-black/5 truncate max-w-[260px]">
                      {{ project.domain || 'preview.interactive' }}
                    </div>
                    <div class="size-2.5"></div>
                  </div>
                  <!-- Image -->
                  <div class="relative aspect-[16/9] w-full bg-black/5 overflow-hidden">
                    <img
                      :src="project.heroImg"
                      :alt="project.title"
                      class="size-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <!-- Key Metrics Highlight Bar -->
              <div
                v-if="project.metrics && project.metrics.length > 0"
                class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border border-black/10 bg-black/[0.02]"
              >
                <div
                  v-for="metric in project.metrics"
                  :key="metric.label"
                  class="flex flex-col gap-1"
                >
                  <span class="font-sans font-black text-lg sm:text-xl lg:text-2xl text-[#22201e]">
                    {{ metric.value }}
                  </span>
                  <span class="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#22201e]/55">
                    {{ metric.label }}
                  </span>
                </div>
              </div>

              <!-- Section 1: The Context & Problem Statement -->
              <section id="section-overview" class="flex flex-col gap-4 scroll-mt-20">
                <div class="flex items-baseline gap-2.5">
                  <span class="font-mono text-base sm:text-lg text-[#22201e]/50 font-bold tracking-tight">01.</span>
                  <h2 class="font-sans font-bold text-xl sm:text-2xl text-[#22201e] uppercase tracking-tight">
                    The Problem & Context
                  </h2>
                </div>
                <h3 class="font-sans text-lg sm:text-xl text-[#22201e] font-semibold leading-snug">
                  {{ project.problem.headline }}
                </h3>
                <p class="font-sans text-sm sm:text-base text-[#22201e]/80 leading-relaxed">
                  {{ project.problem.description }}
                </p>
              </section>

              <!-- Section 2: Architecture & Engineering Highlights -->
              <section id="section-architecture" class="flex flex-col gap-6 scroll-mt-20">
                <div class="flex items-baseline gap-2.5">
                  <span class="font-mono text-base sm:text-lg text-[#22201e]/50 font-bold tracking-tight">02.</span>
                  <h2 class="font-sans font-bold text-xl sm:text-2xl text-[#22201e] uppercase tracking-tight">
                    System Architecture & Engineering
                  </h2>
                </div>
                <h3 class="font-sans text-lg sm:text-xl text-[#22201e] font-semibold leading-snug">
                  {{ project.architecture.headline }}
                </h3>
                <p class="font-sans text-sm sm:text-base text-[#22201e]/80 leading-relaxed">
                  {{ project.architecture.description }}
                </p>

                <!-- Technical Highlight Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  <div
                    v-for="highlight in project.architecture.highlights"
                    :key="highlight.title"
                    class="flex flex-col gap-2 p-4 sm:p-5 rounded-xl border border-black/10 bg-white shadow-sm"
                  >
                    <h4 class="font-sans font-bold text-xs sm:text-sm text-[#22201e] uppercase tracking-tight">
                      {{ highlight.title }}
                    </h4>
                    <p class="font-sans text-xs text-[#22201e]/75 leading-relaxed">
                      {{ highlight.detail }}
                    </p>
                  </div>
                </div>
              </section>

              <!-- Section 3: Key Features & UI Engineering -->
              <section id="section-features" class="flex flex-col gap-6 scroll-mt-20">
                <div class="flex items-baseline gap-2.5">
                  <span class="font-mono text-base sm:text-lg text-[#22201e]/50 font-bold tracking-tight">03.</span>
                  <h2 class="font-sans font-bold text-xl sm:text-2xl text-[#22201e] uppercase tracking-tight">
                    Key Features & Interaction Design
                  </h2>
                </div>

                <!-- Editorial Spec-Sheet Rows -->
                <div class="flex flex-col divide-y divide-black/10 border-y border-black/10">
                  <div
                    v-for="feat in project.features"
                    :key="feat.title"
                    class="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start"
                  >
                    <!-- Left: Number + Title + Tag -->
                    <div class="md:col-span-5 flex items-baseline gap-3">
                      <div class="flex flex-col gap-1">
                        <h4 class="font-sans font-bold text-sm sm:text-base text-[#22201e] leading-snug">
                          {{ feat.title }}
                        </h4>
                        <span
                          v-if="feat.tag"
                          class="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#22201e]/45 font-medium"
                        >
                          {{ feat.tag }}
                        </span>
                      </div>
                    </div>

                    <!-- Right: Technical Description -->
                    <div class="md:col-span-7">
                      <p class="font-sans text-xs sm:text-sm text-[#22201e]/75 leading-relaxed">
                        {{ feat.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Section 4: Key Learnings & Outcomes -->
              <section id="section-takeaways" class="flex flex-col gap-4 scroll-mt-20">
                <div class="flex items-baseline gap-2.5">
                  <span class="font-mono text-base sm:text-lg text-[#22201e]/50 font-bold tracking-tight">04.</span>
                  <h2 class="font-sans font-bold text-xl sm:text-2xl text-[#22201e] uppercase tracking-tight">
                    Key Takeaways & Learnings
                  </h2>
                </div>

                <div class="flex flex-col gap-3 pt-1">
                  <div
                    v-for="(takeaway, tIdx) in project.takeaways"
                    :key="tIdx"
                    class="flex items-start gap-3 p-4 rounded-xl border border-black/10 bg-white"
                  >
                    <p class="font-sans text-xs sm:text-sm text-[#22201e]/85 leading-relaxed">
                      {{ takeaway }}
                    </p>
                  </div>
                </div>
              </section>

              <!-- Next Project & Prev Project Footer Card -->
              <div class="pt-8 border-t border-black/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <!-- Previous Project Button -->
                <button
                  v-if="prevProject"
                  type="button"
                  @click="goToProject(prevProject.id)"
                  class="group flex flex-col items-start gap-1 p-4 rounded-xl border border-black/10 hover:border-black/30 hover:bg-black/[0.02] transition-all text-left cursor-pointer outline-none flex-1"
                >
                  <span class="font-mono text-[10px] uppercase tracking-wider text-[#22201e]/45">
                    ← Previous Case Study
                  </span>
                  <span class="font-sans font-bold text-sm sm:text-base text-[#22201e] group-hover:underline underline-offset-2">
                    {{ prevProject.title }}
                  </span>
                </button>
                <div v-else class="hidden sm:block flex-1"></div>

                <!-- Next Project Button -->
                <button
                  v-if="nextProject"
                  type="button"
                  @click="goToProject(nextProject.id)"
                  class="group flex flex-col items-end gap-1 p-4 rounded-xl border border-black/10 hover:border-black/30 bg-[#22201e] text-[#faf9f6] hover:bg-black transition-all text-right cursor-pointer outline-none flex-1"
                >
                  <span class="font-mono text-[10px] uppercase tracking-wider text-[#faf9f6]/60">
                    Next Case Study →
                  </span>
                  <span class="font-sans font-bold text-sm sm:text-base text-[#faf9f6] group-hover:underline underline-offset-2">
                    {{ nextProject.title }}
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import gsap from 'gsap';
  import {
    caseStudies,
    caseStudyOrder,
    type ProjectCaseStudy,
  } from '@/data/caseStudiesData';

  const props = defineProps<{
    projectId: string | null;
  }>();

  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'navigate', projectId: string): void;
  }>();

  const detailOverlay = ref<HTMLElement | null>(null);
  const scrollContainer = ref<HTMLElement | null>(null);
  const closeBtn = ref<HTMLButtonElement | null>(null);

  const project = computed<ProjectCaseStudy | null>(() => {
    if (!props.projectId) return null;
    return caseStudies[props.projectId] || null;
  });

  const currentIndex = computed(() => {
    if (!props.projectId) return -1;
    return caseStudyOrder.indexOf(props.projectId);
  });

  const nextProject = computed<ProjectCaseStudy | null>(() => {
    if (currentIndex.value === -1) return null;
    const nextIdx = (currentIndex.value + 1) % caseStudyOrder.length;
    const nextId = caseStudyOrder[nextIdx];
    return caseStudies[nextId] || null;
  });

  const prevProject = computed<ProjectCaseStudy | null>(() => {
    if (currentIndex.value === -1) return null;
    const prevIdx = (currentIndex.value - 1 + caseStudyOrder.length) % caseStudyOrder.length;
    const prevId = caseStudyOrder[prevIdx];
    return caseStudies[prevId] || null;
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && scrollContainer.value) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToProject = (targetId: string) => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = 0;
    }
    emit('navigate', targetId);
  };

  let animationTween: gsap.core.Tween | null = null;

  const animateIn = () => {
    if (!detailOverlay.value) return;

    if (animationTween) animationTween.kill();

    gsap.set(detailOverlay.value, {
      clipPath: 'inset(100% 0 0 0)',
    });

    animationTween = gsap.to(detailOverlay.value, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.65,
      ease: 'power3.inOut',
      onComplete: () => {
        closeBtn.value?.focus();
      },
    });
  };

  const handleClose = () => {
    if (!detailOverlay.value) {
      emit('close');
      return;
    }

    if (animationTween) animationTween.kill();

    animationTween = gsap.to(detailOverlay.value, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        emit('close');
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!props.projectId) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    } else if (e.key === 'ArrowRight' && nextProject.value) {
      e.preventDefault();
      goToProject(nextProject.value.id);
    } else if (e.key === 'ArrowLeft' && prevProject.value) {
      e.preventDefault();
      goToProject(prevProject.value.id);
    }
  };

  watch(
    () => props.projectId,
    async (newId, oldId) => {
      if (newId) {
        await nextTick();
        if (!oldId) {
          // Opening from closed state
          animateIn();
        }
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = 0;
        }
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    if (animationTween) animationTween.kill();
  });
</script>
