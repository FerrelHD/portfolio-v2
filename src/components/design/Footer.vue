<template>
  <footer
    class="relative flex flex-col items-center justify-center gap-20 p-[2%]"
  >
    <div class="grid w-full grid-cols-2 text-base sm:gap-x-6 md:grid-cols-12">
      <div
        v-for="section in footerSections"
        :key="section.title"
        class="flex flex-col md:col-span-3"
        :class="{ 'md:col-span-6': section.title === 'Menu' }"
      >
        <p
          class="heading-5 border-flax-smoke-400 w-full border-b pb-2 font-bold"
        >
          {{ section.title }}
        </p>
        <div class="mt-2 space-y-1">
          <p v-for="link in section.links" :key="link.label" class="heading-6">
            <Link
              class="font-medium tracking-wider lowercase"
              :label="link.label"
              :url="link.url"
            />
          </p>
        </div>
      </div>
    </div>

    <div class="grid w-full grid-cols-1 md:grid-cols-12 gap-y-8 gap-x-6 items-end">
      <div class="col-span-1 md:col-span-6 lg:col-span-7 xl:col-span-7">
        <h6 class="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.75rem] leading-tight font-bold tracking-tight text-flax-smoke-950">
          © {{ new Date().getFullYear() }} Ferrel Rashad Akeyla
        </h6>
        <p class="heading-6 text-flax-smoke-500 font-medium mt-1">
          All rights reserved.
        </p>
      </div>

      <div
        class="col-span-1 md:col-span-4 lg:col-span-3 flex flex-col justify-center space-y-1"
      >
        <p class="heading-6 font-bold uppercase text-flax-smoke-700">Ferrel's Local time</p>
        <p class="heading-6 text-flax-smoke-900 font-mono">{{ myLocalTime }}</p>
        <p class="heading-6 font-bold uppercase text-flax-smoke-700 pt-2">Your Local time</p>
        <p class="heading-6 text-flax-smoke-900 font-mono">{{ userLocalTime }}</p>
      </div>

      <div
        class="col-span-1 md:col-span-2 lg:col-span-2 flex justify-start md:justify-end"
      >
        <MagneticEffect divId="scroll-to-top" textId="scroll-to-top-icon">
          <div
            @click="lenis.scrollTo('#app', { duration: 2 })"
            id="scroll-to-top"
            role="button"
            tabindex="0"
            aria-label="Scroll to top of page"
            class="flex-center bg-flax-smoke-400 size-16 sm:size-20 cursor-pointer flex-col rounded-full hover:bg-flax-smoke-500 transition-colors"
          >
            <svg
              class="size-1/2"
              id="scroll-to-top-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
            >
              <path
                d="M12 4L12 20"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.9998 8.99996C16.9998 8.99996 13.3174 4.00001 11.9998 4C10.6822 3.99999 6.99982 9 6.99982 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </MagneticEffect>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { navbarLinks, resourceLinks, socialLinks } from '@/data';
  import { Link } from '..';
  import { onMounted, ref } from 'vue';
  import { lenis } from '@/lenis';
  import MagneticEffect from '../MagneticEffect.vue';
  import moment from 'moment-timezone';

  // Combine footer sections dynamically
  const footerSections = [
    { title: 'Menu', links: navbarLinks },
    { title: 'Socials', links: socialLinks },
    { title: 'Resources', links: resourceLinks },
  ];

  const myLocalTime = ref('');
  const userLocalTime = ref('');

  onMounted(() => {
    myLocalTime.value = moment.tz('Asia/Jakarta').format('h:mm:ss a');
    setInterval(() => {
      myLocalTime.value = moment.tz('Asia/Jakarta').format('h:mm:ss a');
    }, 1000);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    userLocalTime.value = moment.tz(userTimeZone).format('h:mm:ss a');
    setInterval(() => {
      userLocalTime.value = moment.tz(userTimeZone).format('h:mm:ss a');
    }, 1000);
  });
</script>
