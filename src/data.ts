// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Nav
const navLinks = [
  {
    label: 'Services',
    url: '#services',
  },
  {
    label: 'Projects',
    url: '#works',
  },
  {
    label: 'About',
    url: '#about-me-section',
  },
  {
    label: 'Arsenal',
    url: '#testimonials-section',
  },
  {
    label: 'Contact',
    url: '#contact-section',
  },
];
const navbarLinks = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/FerrelHD',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ferrel-rashad-8a165514b/',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/ferrelrshd',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/@ferrelrashad3399',
  },
];

const resourceLinks = [
  {
    label: 'Charles Leclerc #16',
    url: 'https://leclerc-redline.vercel.app/',
  },
  {
    label: 'Indonesian Crustal Observatory',
    url: 'https://github.com/FerrelHD/Global-Seismic-Tracker',
  },
  {
    label: 'Spider-Dev Portfolio',
    url: 'https://github.com/FerrelHD/Portofolio',
  },
  {
    label: 'Stock Prediction ML',
    url: 'https://github.com/FerrelHD/Stock-Prediction-System',
  },
  {
    label: 'Student Life App',
    url: 'https://ferrelhd.github.io/Student-Life/',
  },
];

const heroText =
  'A multidisciplinary full-stack developer & digital creator, building high-performance web systems, 3D interactive experiences, and cinematic media.';

const locationPlace = `6°24'00.0"S 106°49'00.0"E`;
const locationCountry = 'Indonesia, Depok';

// cal.com / contact
const dataCalNamespace = '30min';
const dataCalLink = 'ferrel/30min';
const dataCalConfig =
  '{"layout":"month_view", "theme": "dark", "brand": "#8C8C73"}';

export {
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
  dataCalNamespace,
  dataCalLink,
  dataCalConfig,
};
