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

        <!-- Hero Content: Subtitle & CTA on Left, Available Status on Right -->
        <div
          class="mt-6 sm:mt-8 lg:mt-10 flex w-full flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <!-- Left Column: Subtitle & CTA -->
          <div
            class="flex flex-col items-start gap-3 sm:gap-4"
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

          <!-- Right Column: Status & Available Date Lockup -->
          <div class="overflow-clip self-end text-end">
            <div
              id="available-for-work"
              class="flex translate-y-full flex-col items-end"
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
