<template>
  <section class="padding-x mb-[-100svh] py-0">
    <div
      id="hero"
      class="sticky top-0 flex min-h-svh w-full flex-col justify-end pb-6 sm:pb-8 md:pb-10 pt-16 sm:pt-20"
    >
      <div class="relative flex w-full flex-col items-center">
        <!-- Big Name Header & Rotating Flame Star -->
        <div class="w-full items-end overflow-clip">
          <div class="flex w-full items-start gap-6 sm:gap-10">
            <MyName />
            <Star id="star" class="hide-on-mobile translate-x-full" />
          </div>
        </div>

        <!-- 3-Column Hero Content Grid -->
        <div class="lg:column-gap mt-4 sm:mt-6 lg:mt-8 grid w-full grid-cols-12 items-end">
          <!-- Column 1: Subtitle & CTA -->
          <div
            class="col-span-full flex flex-col items-start gap-3 sm:gap-4 sm:col-span-4"
          >
            <div class="overflow-hidden">
              <svg
                id="down-arrow"
                stroke="currentColor"
                fill="none"
                stroke-width="1.5"
                viewBox="6 6 12 12"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="hide-on-mobile m-0 size-4 -translate-x-full p-0 md:size-5 text-flame"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="7" y1="7" x2="17" y2="17"></line>
                <polyline points="17 7 17 17 7 17"></polyline>
              </svg>
            </div>

            <p class="sr-only">
              A full-stack developer & digital creator, crafting
              high-performance web systems, 3D interactive experiences, and
              cinematic digital media.
            </p>
            <p
              v-html="whoAmI"
              id="whoAmI"
              class="who-am-i text-sm sm:text-base md:text-[1.05rem] w-full max-w-[30ch] overflow-clip leading-snug font-medium text-balance sm:max-w-[37ch] lg:text-start text-flax-smoke-900"
            ></p>

            <div class="relative origin-left overflow-hidden sm:scale-110 pt-1">
              <div id="contact-btn" class="flex -translate-y-full">
                <Button
                  label="Get in touch"
                  url="mailto:ferrelrashadakeyla2014@gmail.com"
                />
              </div>
            </div>
          </div>

          <!-- Column 2: Developer Frame with Balanced Portrait Crop -->
          <div
            id="profile-container"
            class="relative col-span-4 mt-4 sm:mt-0 flex w-full max-w-[210px] sm:max-w-[240px] md:max-w-[260px] mx-auto flex-col rounded-2xl border border-flax-smoke-300/80 bg-flax-smoke-100/70 p-2 shadow-xl backdrop-blur-xs select-none group will-change-transform"
          >
            <!-- Top Card Header Pill -->
            <div
              class="flex items-center justify-between px-2 py-1 font-mono text-[9px] sm:text-[10px] uppercase text-flax-smoke-600 border-b border-flax-smoke-300/40 mb-1.5 select-none"
            >
              <span class="flex items-center gap-1.5">
                <span class="size-1.5 rounded-full bg-flame"></span>
                <span class="font-bold text-flax-smoke-900">FERREL.DEV</span>
              </span>
              <span class="text-flax-smoke-500 font-semibold">DEV_ID // 01</span>
            </div>

            <!-- Balanced Crop Image Container -->
            <div class="relative w-full aspect-[4/4.2] overflow-hidden rounded-xl bg-flax-smoke-200">
              <div class="overlay bg-flax-smoke-100 absolute inset-0 z-2"></div>
              <img
                id="profile-img"
                :src="profile"
                alt="Ferrel Rashad profile"
                class="size-full scale-90 rounded-xl object-cover object-[center_28%] brightness-105 grayscale contrast-105 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-95"
              />
            </div>
          </div>

          <!-- Column 3: Status & Available Date Lockup -->
          <div
            class="relative col-span-8 size-full overflow-clip text-end sm:col-span-4"
          >
            <div
              id="available-for-work"
              class="absolute right-0 bottom-0 flex translate-y-full flex-col items-end"
            >
              <p
                class="text-xs sm:text-sm block leading-snug font-medium -tracking-tight uppercase text-flax-smoke-600 font-mono"
              >
                Available for freelance work
              </p>

              <h3
                class="3xl:heading-1 heading-1-alt font-title block leading-none font-extrabold text-flame -tracking-tight"
              >
                {{ AvailableForWorkDate }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-svh"></div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { MyName, Star } from '../design';
  import { Button } from '@/components/common';
  import { profile } from '@/assets/images';
  import { getAvailableForWorkDate, textSplitterIntoChar } from '@/functions';

  const whoAmI = ref(
    'A full-stack developer & digital creator, crafting high-performance web systems, 3D worlds, and cinematic digital media.',
  );
  const AvailableForWorkDate = ref('');

  onBeforeMount(() => {
    whoAmI.value = textSplitterIntoChar(whoAmI.value);
    AvailableForWorkDate.value = getAvailableForWorkDate();
  });
</script>
