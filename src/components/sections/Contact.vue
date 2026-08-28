<template>
  <section
    id="contact-section"
    class="relative min-h-svh w-full overflow-y-clip p-[4vh] select-none"
  >
    <div
      class="flex-center relative h-[92vh] w-full flex-col rounded-lg bg-black uppercase"
    >
      <video
        class="absolute bottom-0 left-0 size-full rounded-lg object-cover object-center brightness-40 contrast-125"
        :src="contact"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      ></video>
      <div
        class="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 via-black/30 to-black/80"
      ></div>
      <div class="flex-center z-10 flex-col gap-y-10">
        <p
          class="heading-4 text-flax-smoke-300 max-w-[30ch] text-center font-mono"
        >
          Your design is a masterpiece waiting to become alive.
        </p>
        <h3
          id="make-it-happen"
          class="heading-1 text-flax-smoke-200 max-w-[10ch] text-center leading-none"
          v-html="makeItHappen"
        ></h3>
        <div
          class="mt-6 sm:mt-10 flex scale-110 sm:scale-125 md:scale-135 lg:scale-150 items-center"
        >
          <!-- <Button
            :data-cal-namespace="dataCalNamespace"
            :data-cal-link="dataCalLink"
            :data-cal-config="dataCalConfig"
            label="Get in touch"
          /> -->
          <Button label="Get in touch" url="mailto:ferrelrashadakeyla2014@gmail.com" />
        </div>
      </div>
      <div
        class="absolute bottom-5 flex w-full items-center justify-center px-5 md:justify-between"
      >
        <div class="hidden md:flex">
          <div class="border-flax-smoke-300 relative border">
            <Vue3Lottie
              ref="customControl"
              :animationData="earthLottie"
              :loop="true"
              :autoPlay="true"
            />
          </div>
          <div
            class="flex-center py border-flax-smoke-300 text-flax-smoke-300 w-fit flex-col border border-l-0 font-mono"
          >
            <p
              class="border-flax-smoke-300 flex size-full items-center justify-start border-b pr-2 pl-1 font-bold"
            >
              Working Globally
            </p>
            <p class="flex size-full items-center justify-start pr-2 pl-1">
              Depok, Indonesia
            </p>
          </div>
        </div>

        <div class="heading-6 text-flax-smoke-500 relative w-fit flex flex-col items-end">
          <p class="w-full font-bold uppercase text-right">For further inquiries</p>
          
          <!-- Floating Copied Popover Badge (Brand Flame Style) -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 -translate-y-1 scale-95"
          >
            <div
              v-if="emailCopied"
              class="absolute -top-7 right-0 z-30 flex items-center gap-1.5 rounded-full border border-flame bg-flame px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-flame/30 pointer-events-none select-none"
            >
              <span class="size-1.5 rounded-full bg-white animate-pulse"></span>
              <span>Copied // Clipboard</span>
            </div>
          </Transition>

          <button
            type="button"
            @click="copyEmail"
            class="text-flax-smoke-300 hover:text-white mt-1 h-6 text-right font-medium tracking-wider lowercase flex items-center gap-1 cursor-pointer transition-colors"
            title="Click to copy email address"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              class="-scale-x-75 scale-y-75 fill-current"
            >
              <path
                d="M7.82834 17.2929L10.1213 19.586L8.70709 21.0001L4 16.2929L8.7071 11.5858L10.1213 13L7.82844 15.2929L18 15.2928L17.9999 3H19.9999L20 16.2928C20 16.8451 19.5523 17.2928 19 17.2928L7.82834 17.2929Z"
              ></path>
            </svg>
            <span>ferrelrashadakeyla2014@gmail.com</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { earthLottie } from '@/assets/videos';
  import { Button } from '../common';
  import { Vue3Lottie } from 'vue3-lottie';
  import { contact } from '@/assets/videos';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { textSplitterIntoChar } from '@/functions';
  import { animateSplitText } from '@/animations';
  // import { dataCalConfig, dataCalLink, dataCalNamespace } from '@/data';

  const makeItHappen = ref("Let's Make it happen");
  const emailCopied = ref(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('ferrelrashadakeyla2014@gmail.com').then(() => {
      emailCopied.value = true;
      setTimeout(() => {
        emailCopied.value = false;
      }, 2000);
    });
  };

  onBeforeMount(() => {
    makeItHappen.value = textSplitterIntoChar(makeItHappen.value);
  });
  onMounted(() => {
    animateSplitText(
      '#make-it-happen .letters',
      '#make-it-happen',
      1.5,
      0.01,
      0,
    );
  });
</script>

<style>
  .lottie-animation-container {
    height: 100% !important;
  }
  .lottie-animation-container svg {
    height: 100px !important;
    width: fit-content !important;
    margin: -10px -30px !important;
    padding: 0 !important;
  }

  .lottie-animation-container {
    --lottie-animation-container-width: fit-content !important;
    --lottie-animation-container-height: 0% !important;
  }
</style>
