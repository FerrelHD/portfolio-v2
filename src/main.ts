import './style.css';
import { createApp } from 'vue';
import { lenis, raf } from './lenis';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');

export { raf, lenis };

