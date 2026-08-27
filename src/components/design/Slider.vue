<template>
  <div
    id="slider"
    class="column-gap relative mt-[10%] grid w-full grid-cols-12 gap-2 max-md:min-h-svh lg:h-[85svh]"
  >
    <!-- For larger devices, show one person at a time with index -->
    <template v-if="!isSmallScreen">
      <div
        class="columns-gap relative col-span-full flex flex-col max-lg:h-fit lg:col-span-6 lg:h-full"
      >
        <div>
          <p
            id="quote-text"
            class="heading-3 mb-14 min-h-36 max-w-[30ch] font-semibold md:min-h-fit md:max-w-full md:leading-none lg:min-h-36 lg:max-w-[30ch] lg:leading-normal"
            v-html="computedQuote"
          ></p>
          <div id="quote-author" class="heading-6 mb-6 font-semibold">
            <p>{{ people[index].author }}</p>
            <p class="text-flax-smoke-400">{{ people[index].position }}</p>
          </div>
          <div id="quote-tags" class="flex flex-wrap gap-2">
            <p
              class="border-flax-smoke-500/60 bg-black/50 text-flax-smoke-400 rounded-full border px-3 py-1 text-xs uppercase"
              v-for="i in people[index].tags"
              :key="i"
            >
              {{ i }}
            </p>
          </div>
        </div>

        <div class="relative flex h-full items-end justify-between">
          <div class="heading-5 flex w-2/12 items-center gap-3 overflow-clip">
            <p
              id="current-index"
              class="-translate-y-full will-change-transform"
            >
              {{ index + 1 }}
            </p>
            <p class="h-0.5 w-full bg-black"></p>
            <p>{{ people.length }}</p>
          </div>
          <div
            class="lg:absolute lg:inset-0 lg:-bottom-10 lg:w-full lg:will-change-scroll"
          >
            <div
              class="sticky top-[90%] flex place-content-end gap-3 lg:will-change-scroll"
            >
              <Button label="Prev" @click="clickPrev" />
              <Button label="Next" @click="clickNext" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="columns-gap relative order-first col-span-full flex w-full items-center justify-center overflow-clip max-sm:order-last lg:order-last lg:col-span-6 lg:h-full"
      >
        <!-- Ultra-Realistic IDE Editor Window -->
        <div
          class="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0e0e0d] shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300"
        >
          <!-- Window Top Bar (macOS Dots & Multi-Tabs) -->
          <div
            class="flex items-center justify-between border-b border-white/10 bg-[#161615] px-4 py-2.5 select-none"
          >
            <!-- 3 macOS Window Controls -->
            <div class="flex items-center gap-1.5 pr-2">
              <span class="size-2.5 rounded-full bg-[#FF5F56]/90 hover:opacity-100 transition-opacity"></span>
              <span class="size-2.5 rounded-full bg-[#FFBD2E]/90 hover:opacity-100 transition-opacity"></span>
              <span class="size-2.5 rounded-full bg-[#27C93F]/90 hover:opacity-100 transition-opacity"></span>
            </div>

            <!-- Clickable Interactive Multi-Tab Bar -->
            <div class="flex flex-1 items-center gap-1 overflow-x-auto px-2">
              <button
                v-for="(tab, tabIdx) in people"
                :key="tabIdx"
                @click="onSelectTab(tabIdx)"
                :class="[
                  index === tabIdx
                    ? 'border-white/20 bg-black/70 text-flax-smoke-100 shadow-sm'
                    : 'border-transparent text-flax-smoke-500 hover:bg-white/5 hover:text-flax-smoke-300',
                  'group/tab flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-all duration-200',
                ]"
              >
                <span
                  :class="[
                    tab.badgeColor,
                    'rounded px-1 py-0.2 text-[10px] font-bold',
                  ]"
                >
                  {{ tab.badge }}
                </span>
                <span>{{ tab.filename }}</span>
                <span
                  v-if="index === tabIdx"
                  class="ml-1 size-1.5 rounded-full bg-emerald-400 animate-pulse"
                ></span>
              </button>
            </div>

            <!-- Active Language Badge -->
            <div
              id="terminal-lang"
              class="hidden font-mono text-[10px] text-flax-smoke-400 sm:block"
            >
              {{ people[index].language }}
            </div>
          </div>

          <!-- Code Editor Body with Line Numbers & Stagger Wave -->
          <div
            id="terminal-code-body"
            class="min-h-[290px] overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed"
          >
            <div class="flex items-start">
              <!-- Line Numbers Gutter -->
              <div
                class="flex flex-col select-none pr-4 text-right font-mono text-flax-smoke-600 border-r border-white/10"
              >
                <span
                  v-for="(_, lineIdx) in people[index].codeLines"
                  :key="lineIdx"
                  class="leading-relaxed"
                >
                  {{ (lineIdx + 1).toString().padStart(2, '0') }}
                </span>
              </div>

              <!-- Code Content with Stagger Wave -->
              <div class="flex-1 pl-4">
                <div
                  v-for="(line, lineIdx) in people[index].codeLines"
                  :key="lineIdx"
                  class="code-line leading-relaxed text-flax-smoke-200 whitespace-pre"
                  v-html="line || '&nbsp;'"
                ></div>
                <!-- Active Blinking Coding Cursor -->
                <div class="mt-1 flex items-center">
                  <span
                    class="inline-block h-4 w-2 bg-amber-400 animate-pulse"
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Terminal Status Bar Footer -->
          <div
            class="flex items-center justify-between border-t border-white/10 bg-[#121211] px-4 py-2 font-mono text-[11px] text-flax-smoke-400 select-none"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1.5">
                <span class="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>UTF-8</span>
              </span>
              <span>Spaces: 2</span>
              <span class="hidden sm:inline">Ln {{ people[index].codeLines.length }}, Col 1</span>
            </div>
            <div class="text-flax-smoke-500 flex items-center gap-1.5">
              <svg class="size-3 text-flax-smoke-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M6 9v12"></path>
                <path d="M18 9a9 9 0 0 1-9 9"></path>
              </svg>
              <span>main*</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- For smaller devices, show all cards -->
    <template v-else>
      <div class="col-span-full">
        <template v-for="(p, i) in people" :key="i">
          <div class="mt-10 grid w-full grid-cols-5 items-start sm:grid-cols-4">
            <div
              class="columns-gap heading-2 relative col-span-1 flex h-full flex-col leading-none font-bold"
            >
              {{ (i + 1).toString().padStart(2, '0') }}
            </div>
            <div class="col-span-4">
              <div class="columns-gap flex w-full flex-col gap-y-4">
                <!-- Mobile Code Card -->
                <div
                  class="w-full overflow-hidden rounded-xl border border-white/15 bg-[#0f0f0e] shadow-xl"
                >
                  <div
                    class="flex items-center justify-between border-b border-white/10 bg-[#181817] px-3 py-2"
                  >
                    <div class="flex items-center gap-1">
                      <span class="size-2 rounded-full bg-[#FF5F56]"></span>
                      <span class="size-2 rounded-full bg-[#FFBD2E]"></span>
                      <span class="size-2 rounded-full bg-[#27C93F]"></span>
                    </div>
                    <div class="font-mono text-xs text-amber-400">
                      {{ p.filename }}
                    </div>
                  </div>
                  <div class="p-3">
                    <div
                      v-for="(line, lineIdx) in p.codeLines"
                      :key="lineIdx"
                      class="font-mono text-[11px] leading-relaxed text-flax-smoke-200 whitespace-pre"
                      v-html="line || '&nbsp;'"
                    ></div>
                  </div>
                </div>

                <p
                  class="heading-4 mt-2 max-w-[25ch] leading-none font-semibold"
                >
                  " {{ p.quote }} "
                </p>

                <div class="heading-6 font-semibold">
                  <p>{{ p.author }}</p>
                  <p class="text-flax-smoke-400">{{ p.position }}</p>
                </div>

                <div
                  class="flex max-w-60 flex-wrap gap-2 text-xs uppercase"
                >
                  <p
                    class="border-flax-smoke-500/60 bg-black/50 text-flax-smoke-400 rounded-full border px-3 py-1"
                    v-for="tag in p.tags"
                    :key="tag"
                  >
                    {{ tag }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { Button } from '../common';
  import { computed, onMounted, ref } from 'vue';
  import { useWindowSize } from '@vueuse/core';
  import { textSplitterIntoChar } from '@/functions';
  import gsap from 'gsap';

  const { width } = useWindowSize();
  const isSmallScreen = computed(() => width.value < 640);
  const computedQuote = computed(() => {
    return textSplitterIntoChar(`" ${people[index.value].quote} "`);
  });

  const canClick = ref(true);

  const animateTextTransition = (direction: 'up' | 'zero') => {
    const translateY = direction === 'up' ? '-100%' : '0%';
    gsap.to('#quote-text .letters', {
      translateY,
      duration: 0.45,
      stagger: 0.001,
      ease: 'power1.inOut',
    });
  };

  const animateQuoteAuthorTransition = (
    direction: 'left' | 'right',
    onCompleteFunc?: () => void,
  ) => {
    const translateX = direction === 'left' ? '-40%' : '0%';
    const opacity = direction === 'left' ? 0 : 1;
    gsap.to(['#quote-author', '#quote-tags'], {
      translateX,
      opacity,
      duration: 0.45,
      ease: 'power1.inOut',
      onComplete: () => {
        if (onCompleteFunc) onCompleteFunc();
      },
    });
  };

  const animateCurrentQuoteIndex = (
    direction: 'up' | 'zero',
    onCompleteFunc?: () => void,
  ) => {
    const translateY = direction === 'up' ? '-100%' : '0%';
    gsap.to(['#current-index'], {
      translateY,
      duration: 0.45,
      ease: 'power1.inOut',
      onComplete: () => {
        if (onCompleteFunc) onCompleteFunc();
      },
    });
  };

  // Enhanced IDE Tab Switching with Cascading Line-by-Line Stagger Wave
  const animateTerminalTransition = (
    newIndex: number,
    onCompleteFunc?: () => void,
  ) => {
    // 1. Rapid fade out of current code lines
    gsap.to('.code-line', {
      y: -8,
      opacity: 0,
      filter: 'blur(2px)',
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        index.value = newIndex;
        if (onCompleteFunc) onCompleteFunc();

        // 2. Cascading Stagger Wave in for new code lines
        setTimeout(() => {
          gsap.fromTo(
            '.code-line',
            { y: 10, opacity: 0, filter: 'blur(3px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.32,
              stagger: 0.02,
              ease: 'power3.out',
              onComplete: () => {
                canClick.value = true;
              },
            },
          );
        }, 20);
      },
    });
  };

  // Function to trigger the slide change
  const changeQuote = (newIndex: number) => {
    animateTextTransition('up');
    animateQuoteAuthorTransition('left');
    animateTerminalTransition(newIndex, () => {
      setTimeout(() => {
        animateTextTransition('zero');
      }, 20);
      animateCurrentQuoteIndex('zero');
      animateQuoteAuthorTransition('right');
    });
    animateCurrentQuoteIndex('up', () => {
      gsap.set(['#current-index'], {
        y: '100%',
      });
    });
  };

  // Direct Tab Selection Handler
  const onSelectTab = (tabIdx: number) => {
    if (!canClick.value || index.value === tabIdx) return;
    canClick.value = false;
    changeQuote(tabIdx);
  };

  // Next / Prev click handlers
  const clickNext = () => {
    if (!canClick.value) return;
    canClick.value = false;
    let newIndex = (index.value + 1) % people.length;
    changeQuote(newIndex);
  };

  const clickPrev = () => {
    if (!canClick.value) return;
    canClick.value = false;
    const newIndex = (index.value - 1 + people.length) % people.length;
    changeQuote(newIndex);
  };

  onMounted(() => {
    if (!isSmallScreen.value) {
      gsap.set(['#quote-text .letters', '#current-index'], {
        translateY: 0,
      });
    }
  });

  // data
  const index = ref(0);
  const people = [
    {
      quote:
        'Crafting fluid, high-performance interfaces with 60 FPS micro-animations, type-safe architecture, and intuitive design systems.',
      author: 'Frontend & Motion',
      position: 'Core Mastery • Daily Driver',
      tags: ['React 19', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
      badge: 'TS',
      badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
      filename: 'MotionEngine.tsx',
      language: 'TypeScript / React',
      codeLines: [
        '<span class="text-purple-400">import</span> { useGSAP } <span class="text-purple-400">from</span> <span class="text-emerald-300">\'@gsap/react\'</span>;',
        '<span class="text-purple-400">import</span> gsap <span class="text-purple-400">from</span> <span class="text-emerald-300">\'gsap\'</span>;',
        '',
        '<span class="text-blue-400">export const</span> <span class="text-yellow-300">useKineticScroll</span> = (target: <span class="text-cyan-300">RefObject</span>) => {',
        '  <span class="text-yellow-300">useGSAP</span>(() => {',
        '    gsap.<span class="text-blue-300">fromTo</span>(',
        '      target.current,',
        '      { <span class="text-rose-300">y</span>: <span class="text-amber-300">80</span>, <span class="text-rose-300">opacity</span>: <span class="text-amber-300">0</span>, <span class="text-rose-300">filter</span>: <span class="text-emerald-300">\'blur(8px)\'</span> },',
        '      {',
        '        <span class="text-rose-300">y</span>: <span class="text-amber-300">0</span>, <span class="text-rose-300">opacity</span>: <span class="text-amber-300">1</span>, <span class="text-rose-300">filter</span>: <span class="text-emerald-300">\'blur(0px)\'</span>,',
        '        <span class="text-rose-300">duration</span>: <span class="text-amber-300">1.2</span>, <span class="text-rose-300">ease</span>: <span class="text-emerald-300">\'expo.out\'</span>,',
        '        <span class="text-rose-300">scrollTrigger</span>: { <span class="text-rose-300">scrub</span>: <span class="text-amber-300">0.5</span>, <span class="text-rose-300">start</span>: <span class="text-emerald-300">\'top 80%\'</span> }',
        '      }',
        '    );',
        '  }, [target]);',
        '};',
      ],
    },
    {
      quote:
        'Architecting scalable REST APIs, reliable database schemas, and data-driven quantitative ML prediction pipelines.',
      author: 'Backend & Machine Learning',
      position: 'Production Ready • Battle Tested',
      tags: ['Python', 'Laravel 11', 'Node.js', 'Streamlit', 'XGBoost', 'Supabase', 'MySQL'],
      badge: 'PY',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      filename: 'quant_pipeline.py',
      language: 'Python 3.12 / ML',
      codeLines: [
        '<span class="text-purple-400">import</span> xgboost <span class="text-purple-400">as</span> xgb',
        '<span class="text-purple-400">import</span> numpy <span class="text-purple-400">as</span> np',
        '',
        '<span class="text-blue-400">class</span> <span class="text-yellow-300">QuantMLPipeline</span>:',
        '    <span class="text-blue-400">def</span> <span class="text-yellow-300">__init__</span>(self, n_estimators=<span class="text-amber-300">1200</span>, lr=<span class="text-amber-300">0.03</span>):',
        '        self.regressor = xgb.<span class="text-blue-300">XGBRegressor</span>(',
        '            n_estimators=n_estimators,',
        '            learning_rate=lr,',
        '            max_depth=<span class="text-amber-300">6</span>, subsample=<span class="text-amber-300">0.85</span>,',
        '            tree_method=<span class="text-emerald-300">"hist"</span>,',
        '            objective=<span class="text-emerald-300">"reg:squarederror"</span>',
        '        )',
        '',
        '    <span class="text-blue-400">def</span> <span class="text-yellow-300">fit_predict_alpha</span>(self, X_train, y_train, X_val):',
        '        self.regressor.<span class="text-blue-300">fit</span>(X_train, y_train, eval_metric=<span class="text-emerald-300">"rmse"</span>)',
        '        <span class="text-purple-400">return</span> self.regressor.<span class="text-blue-300">predict</span>(X_val)',
      ],
    },
    {
      quote:
        'Engineering interactive game mechanics, real-time physics loops, cinematic video timing, and stylized 3D asset modeling.',
      author: '3D Modeling & Game Systems',
      position: 'Interactive Crafts • Next-Gen',
      tags: ['Unity C#', 'Blender 3D', 'Roblox Studio', 'Luau', 'Vegas Pro', 'Game Loops'],
      badge: 'CS',
      badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
      filename: 'PhysicsController.cs',
      language: 'Unity C# / Physics',
      codeLines: [
        '<span class="text-purple-400">using</span> UnityEngine;',
        '',
        '<span class="text-blue-400">public class</span> <span class="text-yellow-300">ArcadePhysicsController</span> : <span class="text-cyan-300">MonoBehaviour</span>',
        '{',
        '    [<span class="text-cyan-300">SerializeField</span>] <span class="text-blue-400">private</span> <span class="text-cyan-300">Rigidbody</span> rb;',
        '    [<span class="text-cyan-300">SerializeField</span>] <span class="text-blue-400">private float</span> thrustForce = <span class="text-amber-300">45f</span>;',
        '    [<span class="text-cyan-300">SerializeField</span>] <span class="text-blue-400">private</span> <span class="text-cyan-300">AnimationCurve</span> driftCurve;',
        '',
        '    <span class="text-blue-400">void</span> <span class="text-yellow-300">FixedUpdate</span>()',
        '    {',
        '        <span class="text-blue-400">float</span> steer = <span class="text-cyan-300">Input</span>.<span class="text-blue-300">GetAxis</span>(<span class="text-emerald-300">"Horizontal"</span>);',
        '        <span class="text-cyan-300">Vector3</span> thrust = transform.forward * thrustForce;',
        '        rb.<span class="text-blue-300">AddForce</span>(thrust, <span class="text-cyan-300">ForceMode</span>.Acceleration);',
        '        transform.<span class="text-blue-300">Rotate</span>(<span class="text-cyan-300">Vector3</span>.up, steer * driftCurve.<span class="text-blue-300">Evaluate</span>(rb.linearVelocity.magnitude));',
        '    }',
        '}',
      ],
    },
  ];
</script>
