<template>
  <div
    id="slider"
    class="relative mt-6 sm:mt-10 lg:mt-[5%] grid w-full grid-cols-12 gap-6 lg:gap-8 max-md:min-h-fit lg:h-auto min-w-0"
  >
    <!-- For larger devices, show one person at a time with index -->
    <template v-if="!isSmallScreen">
      <div
        class="relative col-span-full flex flex-col max-lg:h-fit lg:col-span-6 lg:h-full min-w-0"
      >
        <div>
          <!-- Word-by-word Kinetic Cascading Quote -->
          <p
            id="quote-text"
            class="heading-3 mb-14 min-h-36 max-w-[32ch] font-semibold leading-snug md:min-h-fit md:max-w-full lg:min-h-36 lg:max-w-[32ch]"
            v-html="computedQuote"
          ></p>
          <div id="quote-author" class="heading-6 mb-6 font-semibold">
            <p>{{ people[index].author }}</p>
            <p class="text-flax-smoke-400">{{ people[index].position }}</p>
          </div>
          <div id="quote-tags" class="flex flex-wrap gap-2">
            <p
              class="border-flax-smoke-400 bg-flax-smoke-300/40 text-flax-smoke-900 font-semibold rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wider transition-all duration-300 hover:bg-flax-smoke-900 hover:text-flax-smoke-50 select-none"
              v-for="i in people[index].tags"
              :key="i"
            >
              {{ i }}
            </p>
          </div>
        </div>

        <div class="relative flex h-full items-end justify-between mt-8 lg:mt-0">
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
        class="relative order-first col-span-full flex w-full items-center justify-center max-sm:order-last lg:order-last lg:col-span-6 lg:h-full min-w-0"
      >
        <!-- Ultra-Realistic IDE Editor Window -->
        <div
          class="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0e0e0d] shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 min-w-0"
        >
          <!-- Window Top Bar (macOS Dots & Multi-Tabs) -->
          <div
            class="flex items-center justify-between border-b border-white/10 bg-[#161615] px-4 py-2.5 select-none"
          >
            <!-- 3 macOS Window Controls -->
            <div class="flex items-center gap-1.5 pr-3 shrink-0">
              <span class="size-2.5 rounded-full bg-[#FF5F56]/90 hover:opacity-100 transition-opacity"></span>
              <span class="size-2.5 rounded-full bg-[#FFBD2E]/90 hover:opacity-100 transition-opacity"></span>
              <span class="size-2.5 rounded-full bg-[#27C93F]/90 hover:opacity-100 transition-opacity"></span>
            </div>

            <!-- Clickable Interactive Multi-Tab Bar (No truncation) -->
            <div class="flex flex-1 items-center gap-1.5 overflow-x-auto min-w-0 scrollbar-none">
              <button
                v-for="(tab, tabIdx) in people"
                :key="tabIdx"
                @click="onSelectTab(tabIdx)"
                :class="[
                  index === tabIdx
                    ? 'border-white/20 bg-black/70 text-flax-smoke-100 shadow-sm'
                    : 'border-transparent text-flax-smoke-500 hover:bg-white/5 hover:text-flax-smoke-300',
                  'group/tab flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1 font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200',
                ]"
              >
                <span
                  :class="[
                    tab.badgeColor,
                    'rounded px-1.5 py-0.5 text-[10px] font-bold',
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
          </div>

          <!-- Code Editor Body with Line Numbers & Stagger Wave -->
          <div
            id="terminal-code-body"
            class="min-h-[300px] overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed"
          >
            <div class="flex items-start min-w-max">
              <!-- Line Numbers Gutter -->
              <div
                class="flex flex-col select-none pr-4 text-right font-mono text-flax-smoke-600 border-r border-white/10 shrink-0"
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

    <!-- For smaller devices, show all cards cleanly formatted -->
    <template v-else>
      <div class="col-span-full flex flex-col space-y-12 sm:space-y-16 min-w-0 w-full">
        <article
          v-for="(p, i) in people"
          :key="i"
          class="flex flex-col gap-5 border-b border-flax-smoke-300/60 pb-10 last:border-b-0 last:pb-0 min-w-0 w-full"
        >
          <!-- Top Row: Index Badge & Role / Position -->
          <div class="flex items-start justify-between gap-3 min-w-0">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-3">
                <span
                  class="font-title text-2xl sm:text-3xl font-bold tracking-tight text-flax-smoke-950"
                >
                  {{ (i + 1).toString().padStart(2, '0') }}
                </span>
                <span class="h-4 w-px bg-flax-smoke-400/50"></span>
                <h4 class="font-title text-base sm:text-xl font-bold text-flax-smoke-900 truncate">
                  {{ p.author }}
                </h4>
              </div>
              <p class="text-xs sm:text-sm font-medium text-flax-smoke-500 mt-0.5">
                {{ p.position }}
              </p>
            </div>

            <!-- Language Badge -->
            <span
              :class="[
                p.badgeColor,
                'rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0',
              ]"
            >
              {{ p.badge }}
            </span>
          </div>

          <!-- Mobile Code Card with Terminal Header & Horizontal Scroll -->
          <div
            class="w-full min-w-0 overflow-hidden rounded-xl border border-white/15 bg-[#0f0f0e] shadow-xl"
          >
            <!-- Terminal Header -->
            <div
              class="flex items-center justify-between border-b border-white/10 bg-[#181817] px-3.5 py-2.5 select-none"
            >
              <div class="flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-[#FF5F56]/90"></span>
                <span class="size-2 rounded-full bg-[#FFBD2E]/90"></span>
                <span class="size-2 rounded-full bg-[#27C93F]/90"></span>
              </div>
              <div class="font-mono text-xs text-amber-400/90 font-medium">
                {{ p.filename }}
              </div>
            </div>

            <!-- Code Lines with Line Numbers & Scrollable Box -->
            <div class="overflow-x-auto p-3 sm:p-4 font-mono text-[11px] leading-relaxed scrollbar-thin">
              <div class="flex items-start min-w-max">
                <!-- Line Numbers Gutter -->
                <div
                  class="flex flex-col select-none pr-3 text-right text-flax-smoke-600 border-r border-white/10 shrink-0"
                >
                  <span
                    v-for="(_, lineIdx) in p.codeLines"
                    :key="lineIdx"
                    class="leading-relaxed"
                  >
                    {{ (lineIdx + 1).toString().padStart(2, '0') }}
                  </span>
                </div>

                <!-- Code Content -->
                <div class="flex-1 pl-3">
                  <div
                    v-for="(line, lineIdx) in p.codeLines"
                    :key="lineIdx"
                    class="leading-relaxed text-flax-smoke-200 whitespace-pre"
                    v-html="line || '&nbsp;'"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quote with Highlighted Keyword Spans -->
          <div
            class="text-sm sm:text-base font-normal text-flax-smoke-900 leading-relaxed break-words"
            v-html="splitWordsIntoSpans(p.quote)"
          ></div>

          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            <span
              v-for="tag in p.tags"
              :key="tag"
              class="border border-flax-smoke-400/70 bg-flax-smoke-300/40 text-flax-smoke-900 font-semibold rounded-full px-3 py-1 text-[11px] uppercase tracking-wider select-none"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { Button } from '../common';
  import { computed, onMounted, ref } from 'vue';
  import { useWindowSize } from '@vueuse/core';
  import gsap from 'gsap';

  const { width } = useWindowSize();
  const isSmallScreen = computed(() => width.value < 640);

  // Helper to split text into wrapped words with keyword accents for kinetic staggering (Saran C)
  const splitWordsIntoSpans = (text: string) => {
    const parts = text.split(/(\{.*?\})/g);
    let html = '';

    parts.forEach((part) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const inner = part.slice(1, -1);
        const words = inner.split(' ');
        words.forEach((word) => {
          if (!word) return;
          html += `<span class="inline-block overflow-hidden mr-[0.22em]"><span class="quote-word inline-block font-bold text-flax-smoke-950 bg-flax-smoke-300/60 border border-flax-smoke-400/50 px-1.5 py-0.5 rounded-md shadow-xs will-change-transform">${word}</span></span>`;
        });
      } else {
        const words = part.split(' ');
        words.forEach((word) => {
          if (!word) return;
          html += `<span class="inline-block overflow-hidden mr-[0.22em]"><span class="quote-word inline-block font-medium text-flax-smoke-800 will-change-transform">${word}</span></span>`;
        });
      }
    });

    return html;
  };

  const computedQuote = computed(() => {
    return splitWordsIntoSpans(`"${people[index.value].quote}"`);
  });

  const canClick = ref(true);

  // Kinetic Word-by-Word Wave transition for Quote
  const animateTextTransition = (direction: 'up' | 'zero') => {
    if (direction === 'up') {
      gsap.to('.quote-word', {
        y: -25,
        opacity: 0,
        duration: 0.25,
        stagger: 0.012,
        ease: 'power2.in',
      });
    } else {
      gsap.fromTo(
        '.quote-word',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.018,
          ease: 'power3.out',
        },
      );
    }
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
      duration: 0.4,
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
      duration: 0.4,
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
              stagger: 0.018,
              ease: 'power3.out',
              onComplete: () => {
                canClick.value = true;
              },
            },
          );
        }, 15);
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
      }, 15);
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
      gsap.fromTo(
        '.quote-word',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.018,
          ease: 'power3.out',
        },
      );
      gsap.set('#current-index', {
        translateY: 0,
      });
    }
  });

  // data
  const index = ref(0);
  const people = [
    {
      quote:
        'Crafting fluid, high-performance interfaces with {60 FPS micro-animations}, type-safe architecture, and {intuitive design systems}.',
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
        '<span class="text-blue-400">export const</span> <span class="text-yellow-300">useKineticScroll</span> = (ref: <span class="text-cyan-300">RefObject</span>) => {',
        '  <span class="text-yellow-300">useGSAP</span>(() => {',
        '    gsap.<span class="text-blue-300">fromTo</span>(',
        '      ref.current,',
        '      { <span class="text-rose-300">y</span>: <span class="text-amber-300">60</span>, <span class="text-rose-300">opacity</span>: <span class="text-amber-300">0</span>, <span class="text-rose-300">filter</span>: <span class="text-emerald-300">\'blur(6px)\'</span> },',
        '      {',
        '        <span class="text-rose-300">y</span>: <span class="text-amber-300">0</span>, <span class="text-rose-300">opacity</span>: <span class="text-amber-300">1</span>, <span class="text-rose-300">filter</span>: <span class="text-emerald-300">\'blur(0px)\'</span>,',
        '        <span class="text-rose-300">duration</span>: <span class="text-amber-300">1.2</span>, <span class="text-rose-300">ease</span>: <span class="text-emerald-300">\'expo.out\'</span>,',
        '        <span class="text-rose-300">scrollTrigger</span>: {',
        '          <span class="text-rose-300">scrub</span>: <span class="text-amber-300">0.5</span>,',
        '          <span class="text-rose-300">start</span>: <span class="text-emerald-300">\'top 80%\'</span>,',
        '        },',
        '      }',
        '    );',
        '  }, [ref]);',
        '};',
      ],
    },
    {
      quote:
        'Architecting {scalable REST APIs}, reliable database schemas, and data-driven {quantitative ML prediction} pipelines.',
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
        '            max_depth=<span class="text-amber-300">6</span>,',
        '            subsample=<span class="text-amber-300">0.85</span>,',
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
        'Engineering {interactive game mechanics}, {real-time physics loops}, cinematic video timing, and stylized {3D asset modeling}.',
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
        '',
        '        <span class="text-blue-400">float</span> speed = rb.linearVelocity.magnitude;',
        '        transform.<span class="text-blue-300">Rotate</span>(<span class="text-cyan-300">Vector3</span>.up, steer * driftCurve.<span class="text-blue-300">Evaluate</span>(speed));',
        '    }',
        '}',
      ],
    },
  ];
</script>
