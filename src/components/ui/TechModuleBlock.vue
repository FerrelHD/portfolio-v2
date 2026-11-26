<template>
  <div
    ref="wrapperRef"
    class="tech-module-wrapper relative z-40"
    :style="{ width: `${widthPx}px` }"
  >
    <button
      type="button"
      @click="emit('toggle', module, $event)"
      @mouseenter="emit('hover', module)"
      @focus="emit('hover', module)"
      :aria-label="`${isEquipped ? 'Remove' : 'Add'} ${module.name} (${module.role}) ${isEquipped ? 'from' : 'to'} stack`"
      class="group relative w-full shrink-0 cursor-pointer touch-none select-none rounded-md text-left transition-transform duration-200 ease-out hover:-translate-y-1 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22201e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f6]"
    >
      <div class="relative w-full">
        <!-- Top Bevel & Architectural Pins -->
        <div
          class="relative w-full rounded-t-[4px]"
          :style="{
            height: `${topBevelHeight}px`,
            background: `linear-gradient(to bottom, ${theme.topColor}, color-mix(in srgb, ${theme.topColor} 82%, black))`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 2px rgba(0,0,0,0.28)',
          }"
        >
          <div class="absolute bottom-full left-0 flex w-full">
            <template v-for="(_, idx) in module.studs" :key="idx">
              <div v-if="hiddenStuds.includes(idx)" class="flex-1"></div>
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
                    :style="{
                      height: '12px',
                      borderRadius: '50% / 22%',
                      background: theme.pinWall,
                    }"
                  ></div>
                  <div
                    class="absolute left-0 flex w-full items-center justify-center rounded-[50%]"
                    :style="{
                      top: '-6px',
                      height: '12px',
                      background: theme.pinCap,
                      borderTop: `1px solid ${theme.pinRim}`,
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25), 0 1px 1px rgba(0,0,0,0.35)',
                    }"
                  ></div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Matte Editorial Face -->
        <div
          class="relative w-full overflow-hidden border-x border-black/15"
          :style="{
            background: theme.faceGradient,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
          }"
        >
          <!-- Subtle Pointer Sheen -->
          <div
            class="pointer-events-none absolute inset-0 z-20 opacity-50 transition-opacity duration-300 group-hover:opacity-80"
            :style="{
              background: `radial-gradient(circle 110px at ${pointerX}% ${pointerY}%, rgba(250,249,246,0.14), transparent)`,
            }"
          ></div>

          <div
            class="relative z-30 flex w-full items-center"
            :class="isCompact ? 'gap-2 px-2.5' : 'gap-3 px-3.5'"
            :style="{ height: `${faceHeight}px` }"
          >
            <div
              class="flex shrink-0 items-center justify-center rounded-[4px]"
              :class="[theme.iconBgClass, isCompact ? 'size-7' : 'size-8']"
            >
              <svg
                v-if="iconSpec"
                :viewBox="iconSpec.viewBox"
                fill="currentColor"
                class="shrink-0"
                :class="[theme.iconClass, isCompact ? 'size-3.5' : 'size-4']"
                aria-hidden="true"
              >
                <path v-for="(d, i) in iconSpec.paths" :key="i" :d="d" />
              </svg>
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <h4
                  class="truncate font-sans font-semibold tracking-tight leading-none"
                  :class="[theme.textClass, isCompact ? 'text-[12px]' : 'text-[13.5px]']"
                >
                  {{ module.name }}
                </h4>
                <span
                  v-if="module.tier === 'core' && !isCompact"
                  class="inline-block size-1.5 shrink-0 rounded-full bg-amber-300/85"
                  title="Core Daily Driver"
                ></span>
              </div>
              <p
                v-if="!isCompact"
                class="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.14em]"
                :class="theme.subtextClass"
              >
                {{ module.role }}
              </p>
            </div>
          </div>
        </div>

        <!-- Crisp Bottom Shadow Lip -->
        <div
          class="relative w-full rounded-b-[4px]"
          :style="{
            height: `${bottomLipHeight}px`,
            background: theme.bottomColor,
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.35)',
          }"
        ></div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref, watch } from 'vue';
  import type { TechModule } from '@/data/techStack';
  import { STACK_GRID, type GridMetrics } from '@/utils/techStackGrid';
  import { EDITORIAL_BLOCK_THEMES, TECH_ICON_PATHS } from '@/utils/techStackTheme';
  import { prefersReducedMotion } from '@/utils/motion';

  const props = withDefaults(
    defineProps<{
      module: TechModule;
      hiddenStuds?: number[];
      isAnimating?: boolean;
      startRect?: DOMRect | null;
      pointerX?: number;
      pointerY?: number;
      isEquipped?: boolean;
      metrics?: GridMetrics;
    }>(),
    {
      hiddenStuds: () => [],
      isAnimating: false,
      startRect: null,
      pointerX: 50,
      pointerY: 50,
      isEquipped: false,
    }
  );

  const emit = defineEmits<{
    (e: 'toggle', module: TechModule, event: MouseEvent): void;
    (e: 'hover', module: TechModule): void;
    (e: 'animationComplete', id: string): void;
  }>();

  const wrapperRef = ref<HTMLElement | null>(null);
  let activeAnimation: Animation | null = null;

  const studWidth = computed(() => props.metrics?.studWidth ?? STACK_GRID.STUD_WIDTH);
  const topBevelHeight = computed(() => props.metrics?.topBevelHeight ?? 14);
  const faceHeight = computed(() => props.metrics?.faceHeight ?? 46);
  const bottomLipHeight = computed(() => props.metrics?.bottomLipHeight ?? 8);

  const widthPx = computed(() => props.module.studs * studWidth.value);
  const isCompact = computed(() => props.module.studs <= 2);
  const theme = computed(() => EDITORIAL_BLOCK_THEMES[props.module.tone]);
  const iconSpec = computed(() => TECH_ICON_PATHS[props.module.id]);

  watch(
    () => [props.isAnimating, props.startRect] as const,
    ([animating, startRect]) => {
      if (!animating || !startRect || !wrapperRef.value) return;

      if (prefersReducedMotion()) {
        emit('animationComplete', props.module.id);
        return;
      }

      if (activeAnimation) {
        activeAnimation.cancel();
        activeAnimation = null;
      }

      const endRect = wrapperRef.value.getBoundingClientRect();
      const dx = startRect.left - endRect.left;
      const dy = startRect.top - endRect.top;
      const apexY = Math.min(dy, 0) - STACK_GRID.APEX_HEIGHT;

      activeAnimation = wrapperRef.value.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(1, 1)`, offset: 0 },
          { transform: `translate(${dx}px, ${dy}px) scale(1.06, 0.9)`, offset: 0.14 },
          { transform: `translate(${dx * 0.72}px, ${dy + (apexY - dy) * 0.55}px) scale(0.95, 1.08)`, offset: 0.38 },
          { transform: `translate(${dx * 0.48}px, ${apexY}px) scale(1, 1)`, offset: 0.56 },
          { transform: `translate(${dx * 0.2}px, ${apexY * 0.45}px) scale(0.96, 1.06)`, offset: 0.76 },
          { transform: 'translate(0px, 0px) scale(1.08, 0.9)', offset: 0.91 },
          { transform: 'translate(0px, 0px) scale(1, 1)', offset: 1 },
        ],
        {
          duration: 820,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'none',
        }
      );

      activeAnimation.onfinish = () => {
        activeAnimation?.cancel();
        activeAnimation = null;
        emit('animationComplete', props.module.id);
      };
    },
    { flush: 'post' }
  );

  onUnmounted(() => {
    activeAnimation?.cancel();
  });
</script>
