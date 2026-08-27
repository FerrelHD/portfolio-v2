import Lenis from 'lenis';

// smooth scroll
const lenis = new Lenis({
  duration: 0.8,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

export { lenis, raf };
