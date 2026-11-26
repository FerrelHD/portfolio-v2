import type { PinTone } from '../data/techStack';

export interface EditorialBlockTheme {
  topColor: string;
  faceGradient: string;
  bottomColor: string;
  pinWall: string;
  pinCap: string;
  pinRim: string;
  textClass: string;
  subtextClass: string;
  iconBgClass: string;
  iconClass: string;
}

export const EDITORIAL_BLOCK_THEMES: Record<PinTone, EditorialBlockTheme> = {
  ink: {
    topColor: '#2c2926',
    faceGradient: 'linear-gradient(180deg, #25221f 0%, #1d1a18 55%, #161412 100%)',
    bottomColor: '#110f0e',
    pinWall: 'linear-gradient(90deg, #12100e 0%, #24211e 35%, #34302b 50%, #24211e 65%, #12100e 100%)',
    pinCap: 'linear-gradient(135deg, #423d37 0%, #2b2824 55%, #1d1a18 100%)',
    pinRim: 'rgba(250, 249, 246, 0.22)',
    textClass: 'text-[#faf9f6]',
    subtextClass: 'text-[#faf9f6]/60',
    iconBgClass: 'bg-white/[0.08] border border-white/10',
    iconClass: 'text-[#faf9f6]',
  },
  bronze: {
    topColor: '#6a5b4b',
    faceGradient: 'linear-gradient(180deg, #534639 0%, #44392e 55%, #362d24 100%)',
    bottomColor: '#272019',
    pinWall: 'linear-gradient(90deg, #2b231b 0%, #4c3f32 35%, #695847 50%, #4c3f32 65%, #2b231b 100%)',
    pinCap: 'linear-gradient(135deg, #87735f 0%, #5c4d3e 55%, #44392e 100%)',
    pinRim: 'rgba(250, 249, 246, 0.3)',
    textClass: 'text-[#faf9f6]',
    subtextClass: 'text-[#f3eee8]/70',
    iconBgClass: 'bg-black/20 border border-white/10',
    iconClass: 'text-[#f3eee8]',
  },
  slate: {
    topColor: '#4a4e54',
    faceGradient: 'linear-gradient(180deg, #3c4045 0%, #303338 55%, #25282c 100%)',
    bottomColor: '#1a1c1f',
    pinWall: 'linear-gradient(90deg, #1b1d20 0%, #34383d 35%, #494e55 50%, #34383d 65%, #1b1d20 100%)',
    pinCap: 'linear-gradient(135deg, #626871 0%, #41454c 55%, #303338 100%)',
    pinRim: 'rgba(250, 249, 246, 0.25)',
    textClass: 'text-[#faf9f6]',
    subtextClass: 'text-[#faf9f6]/65',
    iconBgClass: 'bg-white/[0.08] border border-white/10',
    iconClass: 'text-[#faf9f6]',
  },
  sage: {
    topColor: '#465449',
    faceGradient: 'linear-gradient(180deg, #37433a 0%, #2c362e 55%, #222a24 100%)',
    bottomColor: '#181e19',
    pinWall: 'linear-gradient(90deg, #19201a 0%, #2f3b32 35%, #425246 50%, #2f3b32 65%, #19201a 100%)',
    pinCap: 'linear-gradient(135deg, #5c6e60 0%, #3c493f 55%, #2c362e 100%)',
    pinRim: 'rgba(250, 249, 246, 0.26)',
    textClass: 'text-[#faf9f6]',
    subtextClass: 'text-[#faf9f6]/65',
    iconBgClass: 'bg-black/20 border border-white/10',
    iconClass: 'text-[#faf9f6]',
  },
  terracotta: {
    topColor: '#7a4d3b',
    faceGradient: 'linear-gradient(180deg, #633d2e 0%, #503024 55%, #3e251b 100%)',
    bottomColor: '#2d1a13',
    pinWall: 'linear-gradient(90deg, #321d15 0%, #583528 35%, #754837 50%, #583528 65%, #321d15 100%)',
    pinCap: 'linear-gradient(135deg, #945f4a 0%, #6b4333 55%, #503024 100%)',
    pinRim: 'rgba(250, 249, 246, 0.28)',
    textClass: 'text-[#faf9f6]',
    subtextClass: 'text-[#f3eee8]/70',
    iconBgClass: 'bg-black/20 border border-white/10',
    iconClass: 'text-[#f3eee8]',
  },
};

export interface TechIconSpec {
  viewBox: string;
  paths: string[];
}

export const TECH_ICON_PATHS: Record<string, TechIconSpec> = {
  vue: {
    viewBox: '0 0 24 24',
    paths: ['M2 3h4l6 10.5L18 3h4L12 20.5 2 3zm4.5 0L12 12.5 17.5 3h-3.4L12 6.8 9.9 3H6.5z'],
  },
  react: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 10.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z',
      'M12 6.5c5.2 0 9.5 2.4 9.5 5.5s-4.3 5.5-9.5 5.5S2.5 15.1 2.5 12 6.8 6.5 12 6.5z',
      'M7.2 3.8c2.6-1.5 6.8 1.2 9.4 5.7 2.6 4.5 2.6 9.4 0 10.9-2.6 1.5-6.8-1.2-9.4-5.7-2.6-4.5-2.6-9.4 0-10.9z',
      'M16.8 3.8c2.6 1.5 2.6 6.4 0 10.9-2.6 4.5-6.8 7.2-9.4 5.7-2.6-1.5-2.6-6.4 0-10.9 2.6-4.5 6.8-7.2 9.4-5.7z',
    ],
  },
  nextjs: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 2a10 10 0 1 0 7.6 16.5L9.2 6.2H7.5v11.6h1.6V9l8.7 10.5A10 10 0 0 0 12 2zm3.2 4.2h-1.6v6.2l1.6 2V6.2z',
    ],
  },
  typescript: {
    viewBox: '0 0 24 24',
    paths: [
      'M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15zm5.2 6.5v1.5h2.2V19h1.8v-6.5h2.2V11H8.2zm7.6 2.2c0-1.4 1.1-2.3 2.8-2.3 1 0 1.8.3 2.3.7l-.7 1.3c-.4-.3-.9-.5-1.5-.5-.7 0-1.1.3-1.1.7 0 .5.4.7 1.4 1 1.4.4 2.2 1 2.2 2.4 0 1.5-1.1 2.4-2.9 2.4-1.2 0-2.2-.4-2.8-.9l.7-1.3c.6.4 1.3.7 2 .7.8 0 1.2-.3 1.2-.8 0-.5-.4-.7-1.4-1-1.4-.4-2.2-1-2.2-2.4z',
    ],
  },
  tailwind: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4.9 1 2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4C15.7 7.1 14.6 6 12 6zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4.9 1 2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4C10.7 13.1 9.6 12 7 12z',
    ],
  },
  gsap: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 3a9 9 0 1 0 8.5 12h-2.1A7 7 0 1 1 12 5c2.2 0 4.2 1 5.5 2.6L15 10h6V4l-2.1 2.1A9 9 0 0 0 12 3z',
    ],
  },
  threejs: {
    viewBox: '0 0 24 24',
    paths: [
      'M4 3l16 4.5-11.5 11.5L4 3zm3.2 3.2l2.6 8.6 6.4-6.4-9-2.2z',
    ],
  },
  laravel: {
    viewBox: '0 0 24 24',
    paths: [
      'M4 5.5l4-2 4 2v5l4-2 4 2v4.5l-4 2-4 2-4-2-4-2V5.5zm4 4.5l4-2 4 2v4l-4 2-4-2v-4z',
    ],
  },
  nodejs: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 2.5L20 7v10l-8 4.5L4 17V7l8-4.5zm0 2.3L6 8.2v7.6l6 3.4 6-3.4V8.2l-6-3.4z',
    ],
  },
  supabase: {
    viewBox: '0 0 24 24',
    paths: [
      'M13.5 3L5 14h6.5L10.5 21 19 10h-6.5L13.5 3z',
    ],
  },
  'python-ml': {
    viewBox: '0 0 24 24',
    paths: [
      'M12 3c-3.3 0-3 1.4-3 1.4V6h3v1H7.5S5 6.7 5 10s2.2 3.2 2.2 3.2H9v-1.8S8.9 9 11.4 9h3.2s2.4 0 2.4-2.3V4.5S17.4 3 12 3zm-1.5 1.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zM12 21c3.3 0 3-1.4 3-1.4V18h-3v-1h4.5s2.5.3 2.5-3-2.2-3.2-2.2-3.2H15v1.8s.1 2.4-2.4 2.4H9.4S7 15 7 17.3v2.2S6.6 21 12 21zm1.5-1.3a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z',
    ],
  },
  'unity-3d': {
    viewBox: '0 0 24 24',
    paths: [
      'M12 2l8.5 4.9v9.8L12 21.6l-8.5-4.9V6.9L12 2zm0 2.3L5.6 8v8l6.4 3.7 6.4-3.7V8L12 4.3z',
    ],
  },
};
