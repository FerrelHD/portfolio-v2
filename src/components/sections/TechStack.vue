<template>
  <section
    id="tech-stack"
    @pointermove="handlePointerMove"
    class="shrink-0 w-full md:w-screen min-h-[100svh] md:h-dvh flex flex-col justify-between select-none
           bg-[#faf9f6] text-[#22201e] relative overflow-x-hidden overflow-y-auto
           pt-20 pb-8 px-5 sm:px-6 md:pt-8 md:pb-6 lg:pt-10 lg:pb-8 md:pl-24 md:pr-12 font-sans"
  >
    <!-- Top Editorial Header Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 shrink-0">
      <div class="overflow-hidden">
        <h2
          ref="chapterTitleRef"
          class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#22201e] uppercase leading-none will-change-transform"
        >
          CHAPTER IV
        </h2>
      </div>

      <!-- Category Filter Tabs & Quick Presets -->
      <div
        ref="controlsBarRef"
        class="flex flex-wrap items-center gap-2 will-change-transform"
      >
        <div class="inline-flex flex-wrap items-center gap-1 rounded-full border border-[#22201e]/15 bg-[#ebe9e1]/60 p-1">
          <button
            v-for="cat in TECH_CATEGORIES"
            :key="cat.id"
            type="button"
            @click="activeCategory = cat.id"
            class="px-2.5 sm:px-3 py-1 rounded-full font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer"
            :class="
              activeCategory === cat.id
                ? 'bg-[#22201e] text-[#faf9f6]'
                : 'text-[#22201e]/65 hover:text-[#22201e]'
            "
          >
            {{ cat.label }}
          </button>
        </div>

        <button
          v-if="equippedIds.length > 0"
          type="button"
          @click="clearStack"
          class="px-3 py-1.5 rounded-full border border-[#22201e]/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#22201e]/70 hover:bg-[#22201e] hover:text-[#faf9f6] transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Main Split Stage: Left Pool, Right Interactive Architectural Plinth -->
    <div class="my-auto py-4 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-center w-full max-w-[1200px] mx-auto">
      <!-- Left Column: Module Pool + Presets + Hovered Project Context -->
      <div ref="poolColRef" class="md:col-span-7 flex flex-col gap-3 sm:gap-4 will-change-transform">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#22201e]/10 pb-2.5">
          <span class="font-sans text-xs uppercase tracking-[0.18em] text-[#22201e]/65 font-medium">
            Available Modules ({{ unequippedModules.length }})
          </span>
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="font-mono text-[10px] uppercase tracking-wider text-[#22201e]/45 mr-1">
              Presets:
            </span>
            <button
              v-for="preset in STACK_PRESETS"
              :key="preset.id"
              type="button"
              @click="applyPreset(preset.moduleIds)"
              class="px-2.5 py-1 rounded border border-[#22201e]/15 text-[10px] font-mono uppercase tracking-wider text-[#22201e]/75 hover:border-[#22201e]/50 hover:bg-[#22201e]/5 transition-colors cursor-pointer"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>

        <!-- Unequipped Modules Grid -->
        <div class="flex flex-wrap items-start gap-x-3.5 gap-y-5 min-h-[168px] py-2">
          <TechModuleBlock
            v-for="mod in unequippedModules"
            :key="mod.id"
            :module="mod"
            :isEquipped="false"
            :pointerX="pointerX"
            :pointerY="pointerY"
            :isAnimating="!!animatingBlocks[mod.id]"
            :startRect="animatingBlocks[mod.id] || null"
            @toggle="handleToggleEquip"
            @hover="hoveredModule = $event"
            @animationComplete="clearAnimating(mod.id)"
          />

          <p
            v-if="unequippedModules.length === 0"
            class="font-serif italic text-lg text-[#22201e]/55 py-6"
          >
            All modules in this category are assembled on the plinth.
          </p>
        </div>

        <!-- Contextual Inspector Line -->
        <div class="pt-3 border-t border-[#22201e]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2 text-[#22201e]/75">
            <span class="inline-block size-2 rounded-full bg-[#22201e]/40"></span>
            <template v-if="hoveredModule">
              <span class="font-semibold text-[#22201e]">{{ hoveredModule.name }}</span>
              <span class="text-[#22201e]/50">—</span>
              <span class="font-mono text-[11px] text-[#22201e]/65">
                Used in: {{ hoveredModule.projects.join(' · ') }}
              </span>
            </template>
            <template v-else>
              <span class="text-[#22201e]/60">
                Click any module to stack it onto the architectural plinth.
              </span>
            </template>
          </div>
          <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-[#22201e]/45">
            ● Core Daily Driver
          </span>
        </div>
      </div>

      <!-- Right Column: Editorial Architectural Plinth & Stacked Modules -->
      <div
        ref="plinthColRef"
        class="md:col-span-5 flex flex-col items-center justify-end will-change-transform"
      >
        <div
          class="origin-bottom flex flex-col items-center"
          :style="{
            transform: `scale(${plinthScale})`,
            marginTop: `${plinthLayoutOffset}px`,
          }"
        >
          <div
            ref="plinthContainerRef"
            class="relative w-[372px] rounded-lg shadow-[0_18px_40px_rgba(34,32,30,0.16)]"
            :style="{ marginTop: `${towerHeight}px` }"
          >
            <!-- Stacked Equipped Modules -->
            <div
              class="absolute left-0 w-full h-0 z-20"
              style="bottom: calc(100% - 12px);"
            >
              <div
                v-for="item in packed.positioned"
                :key="item.module.id"
                class="absolute"
                :style="{
                  bottom: `${item.rowIndex * STACK_GRID.ROW_HEIGHT}px`,
                  left: `${item.colIndex * STACK_GRID.STUD_WIDTH}px`,
                  zIndex: item.rowIndex * 10,
                }"
              >
                <TechModuleBlock
                  :module="item.module"
                  :isEquipped="true"
                  :scale="plinthScale"
                  :hiddenStuds="
                    getHiddenModuleStuds(
                      packed.grid,
                      item.rowIndex,
                      item.colIndex,
                      item.module.studs,
                      animatingBlocks
                    )
                  "
                  :pointerX="pointerX"
                  :pointerY="pointerY"
                  :isAnimating="!!animatingBlocks[item.module.id]"
                  :startRect="animatingBlocks[item.module.id] || null"
                  @toggle="handleToggleEquip"
                  @hover="hoveredModule = $event"
                  @animationComplete="clearAnimating(item.module.id)"
                />
              </div>
            </div>

            <!-- Editorial Plinth Base Block (6 Columns) -->
            <div class="relative z-10 w-full">
              <!-- Top Bevel with 6 Base Pins -->
              <div
                class="relative w-full rounded-t-[4px]"
                style="
                  height: 14px;
                  background: linear-gradient(to bottom, #3a3632, #2b2824);
                  box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 2px rgba(0,0,0,0.35);
                "
              >
                <div class="absolute bottom-full left-0 flex w-full">
                  <template v-for="colIdx in STACK_GRID.COLS" :key="colIdx">
                    <div
                      v-if="hiddenBaseStuds.includes(colIdx - 1)"
                      class="flex-1"
                    ></div>
                    <div
                      v-else
                      class="relative flex flex-1 items-end justify-center"
                      style="transform: translateY(9px);"
                    >
                      <div
                        class="absolute -bottom-[2px] left-1/2 z-0 w-[70%] -translate-x-1/2 rounded-[50%]"
                        style="height: 8px; background: radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 72%);"
                      ></div>
                      <div class="relative z-10 w-[68%] max-w-[38px]">
                        <div
                          class="relative w-full overflow-hidden"
                          style="
                            height: 12px;
                            border-radius: 50% / 22%;
                            background: linear-gradient(90deg, #1b1815 0%, #3a3632 35%, #524c46 50%, #3a3632 65%, #1b1815 100%);
                          "
                        ></div>
                        <div
                          class="absolute left-0 flex w-full items-center justify-center rounded-[50%]"
                          style="
                            top: -6px;
                            height: 12px;
                            background: linear-gradient(135deg, #696159 0%, #443f3a 55%, #2b2824 100%);
                            border-top: 1px solid rgba(250, 249, 246, 0.25);
                            box-shadow: inset 0 1px 2px rgba(255,255,255,0.22), 0 1px 1px rgba(0,0,0,0.35);
                          "
                        ></div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Plinth Body -->
              <div
                class="relative w-full overflow-hidden border-x border-black/20 px-5 py-4"
                style="background: linear-gradient(180deg, #282523 0%, #22201e 60%, #1a1816 100%);"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <span class="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#faf9f6]/50">
                      FERREL // STACK_PLINTH
                    </span>
                    <h3 class="mt-1 truncate font-serif text-xl text-[#faf9f6] tracking-tight">
                      {{ stackProfile.title }}
                    </h3>
                  </div>
                  <div class="shrink-0 rounded border border-white/15 bg-white/[0.05] px-2.5 py-1 text-right">
                    <span class="block font-mono text-[10px] uppercase tracking-wider text-[#faf9f6]/85 tabular-nums">
                      {{ equippedModules.length }}/{{ TECH_MODULES.length }}
                    </span>
                    <span class="block font-mono text-[8px] uppercase tracking-[0.16em] text-[#faf9f6]/45">
                      EQUIPPED
                    </span>
                  </div>
                </div>
                <p class="mt-2 font-sans text-[11.5px] leading-relaxed text-[#faf9f6]/65">
                  {{ stackProfile.summary }}
                </p>
              </div>

              <!-- Plinth Bottom Lip -->
              <div
                class="relative w-full rounded-b-[4px]"
                style="
                  height: 9px;
                  background: #141210;
                  box-shadow: inset 0 1px 3px rgba(0,0,0,0.45);
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Editorial Footer Bar -->
    <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#22201e]/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#22201e]/50 shrink-0">
      <span>MODULAR ARCHITECTURE INDEX</span>
      <span>CLICK EQUIPPED BLOCK TO REMOVE</span>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useWindowSize } from '@vueuse/core';
  import gsap from 'gsap';
  import {
    STACK_PRESETS,
    TECH_CATEGORIES,
    TECH_MODULES,
    type TechCategory,
    type TechModule,
  } from '@/data/techStack';
  import {
    STACK_GRID,
    computePlinthScale,
    deriveStackProfile,
    getHiddenBaseStuds,
    getHiddenModuleStuds,
    packStackModules,
  } from '@/utils/techStackGrid';
  import { prefersReducedMotion } from '@/utils/motion';
  import TechModuleBlock from '@/components/ui/TechModuleBlock.vue';

  const activeCategory = ref<'all' | TechCategory>('all');
  const equippedIds = ref<string[]>(['vue', 'typescript', 'tailwind', 'gsap']);
  const animatingBlocks = ref<Record<string, DOMRect>>({});
  const hoveredModule = ref<TechModule | null>(null);

  const pointerX = ref(50);
  const pointerY = ref(50);

  const chapterTitleRef = ref<HTMLElement | null>(null);
  const controlsBarRef = ref<HTMLElement | null>(null);
  const poolColRef = ref<HTMLElement | null>(null);
  const plinthColRef = ref<HTMLElement | null>(null);
  const plinthContainerRef = ref<HTMLElement | null>(null);

  const handlePointerMove = (e: PointerEvent) => {
    if (typeof window === 'undefined') return;
    pointerX.value = Math.round((e.clientX / window.innerWidth) * 100);
    pointerY.value = Math.round((e.clientY / window.innerHeight) * 100);
  };

  const equippedModules = computed(() =>
    equippedIds.value
      .map((id) => TECH_MODULES.find((m) => m.id === id))
      .filter((m): m is TechModule => Boolean(m))
  );

  const unequippedModules = computed(() =>
    TECH_MODULES.filter((m) => {
      if (equippedIds.value.includes(m.id)) return false;
      if (activeCategory.value === 'all') return true;
      return m.category === activeCategory.value;
    })
  );

  const packed = computed(() => packStackModules(equippedModules.value));

  const hiddenBaseStuds = computed(() =>
    getHiddenBaseStuds(packed.value.grid, animatingBlocks.value)
  );

  const { width, height } = useWindowSize();

  const towerHeight = computed(() =>
    packed.value.maxRow >= 0
      ? (packed.value.maxRow + 1) * STACK_GRID.ROW_HEIGHT + STACK_GRID.BEVEL_OVERLAP
      : 0
  );

  const plinthScale = computed(() => {
    const vw = width.value || 1280;
    const vh = height.value || 800;
    if (vw < 768) {
      return Math.min(0.9, Math.max(0.7, (vw - 44) / 372));
    }
    const heightScale = computePlinthScale(vh, packed.value.maxRow);
    const widthScale = vw < 1024 ? 0.76 : vw < 1280 ? 0.88 : 1;
    return Math.min(heightScale, widthScale);
  });

  const plinthLayoutOffset = computed(() => {
    const unscaledTotal = towerHeight.value + STACK_GRID.PLINTH_BASE_HEIGHT;
    return -Math.round(unscaledTotal * (1 - plinthScale.value));
  });

  const stackProfile = computed(() => deriveStackProfile(equippedModules.value));

  const clearAnimating = (id: string) => {
    if (!animatingBlocks.value[id]) return;
    const next = { ...animatingBlocks.value };
    delete next[id];
    animatingBlocks.value = next;
  };

  const triggerPlinthImpact = () => {
    if (!plinthContainerRef.value || prefersReducedMotion()) return;
    gsap.fromTo(
      plinthContainerRef.value,
      { y: 0 },
      { y: 6, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }
    );
  };

  const handleToggleEquip = (mod: TechModule, event: MouseEvent) => {
    hoveredModule.value = mod;
    if (animatingBlocks.value[mod.id]) return;

    const target = event.currentTarget as HTMLElement | null;
    const wrapper = target?.closest('.tech-module-wrapper') as HTMLElement | null;
    if (wrapper) {
      const startRect = wrapper.getBoundingClientRect();
      animatingBlocks.value = { ...animatingBlocks.value, [mod.id]: startRect };
    }

    if (equippedIds.value.includes(mod.id)) {
      equippedIds.value = equippedIds.value.filter((x) => x !== mod.id);
    } else {
      equippedIds.value = [...equippedIds.value, mod.id];
      setTimeout(triggerPlinthImpact, 760);
    }
  };

  const applyPreset = (ids: string[]) => {
    animatingBlocks.value = {};
    equippedIds.value = [...ids];
    triggerPlinthImpact();
  };

  const clearStack = () => {
    animatingBlocks.value = {};
    equippedIds.value = [];
  };

  const revealSlide = () => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (chapterTitleRef.value) {
      tl.to(chapterTitleRef.value, { yPercent: 0, duration: 1.0 }, 0);
    }
    if (controlsBarRef.value) {
      tl.to(controlsBarRef.value, { y: 0, opacity: 1, duration: 0.85 }, 0.1);
    }
    if (poolColRef.value) {
      tl.to(poolColRef.value, { y: 0, opacity: 1, duration: 0.9 }, 0.15);
    }
    if (plinthColRef.value) {
      tl.to(plinthColRef.value, { y: 0, opacity: 1, duration: 0.95 }, 0.22);
    }
  };

  defineExpose({ revealSlide });

  onMounted(() => {
    if (!prefersReducedMotion()) {
      if (chapterTitleRef.value) gsap.set(chapterTitleRef.value, { yPercent: 105 });
      if (controlsBarRef.value) gsap.set(controlsBarRef.value, { y: 12, opacity: 0 });
      if (poolColRef.value) gsap.set(poolColRef.value, { y: 18, opacity: 0 });
      if (plinthColRef.value) gsap.set(plinthColRef.value, { y: 22, opacity: 0 });
    }
  });
</script>
