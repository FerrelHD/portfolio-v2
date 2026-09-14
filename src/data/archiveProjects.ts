import {
  indonesianCrustalObservatoryImg,
  spiderDevImg,
  fersyaShopImg,
  studentLifeImg,
  charlesLeclercImg,
  gunungGedeImg,
  stockPredictionImg,
  streetRushImg,
} from '@/assets/images';

export type ArchiveCategoryFilter = 'all' | 'web' | 'creative' | 'ml' | 'games';

export interface ArchiveProject {
  id: string;
  year: string;
  title: string;
  category: string;
  categoryFilter: ArchiveCategoryFilter;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  previewImg: string;
  description?: string;
}

export const archiveCategories: { id: ArchiveCategoryFilter; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'web', label: 'WEB & APPS' },
  { id: 'creative', label: 'CREATIVE MOTION' },
  { id: 'ml', label: 'MACHINE LEARNING' },
  { id: 'games', label: '3D & GAMES' },
];

export const archiveProjects: ArchiveProject[] = [
  {
    id: 'nusantara-observatory',
    year: '2026',
    title: 'Nusantara Observatory',
    category: 'Geospatial Hazard & Event Replay',
    categoryFilter: 'web',
    techStack: ['React 19', 'TypeScript', 'Canvas 2D'],
    liveUrl: 'https://nusantara-observatory.vercel.app/',
    githubUrl: 'https://github.com/FerrelHD/Global-Seismic-Tracker',
    previewImg: indonesianCrustalObservatoryImg,
    description: 'Interactive geospatial hazard tracker integrating real-time disaster feeds into visual 2D mapping.',
  },
  {
    id: 'spidey-dev',
    year: '2025',
    title: 'Spidey Dev Portfolio',
    category: 'Creative Frontend & Web Audio',
    categoryFilter: 'creative',
    techStack: ['React 19', 'GSAP', 'Web Audio API'],
    liveUrl: 'https://spidey-portfolio-ferrel.vercel.app/',
    githubUrl: 'https://github.com/FerrelHD/Portofolio',
    previewImg: spiderDevImg,
    description: 'Cinematic Spider-Man-themed portfolio with interactive Web Audio soundscapes and kinetic typography.',
  },
  {
    id: 'fersya-shop',
    year: '2025',
    title: 'Fersya Shop',
    category: 'Organic E-Commerce Storefront',
    categoryFilter: 'web',
    techStack: ['Laravel 11', 'Filament Admin', 'MySQL'],
    githubUrl: 'https://github.com/FerrelHD/Fersya-Shop',
    previewImg: fersyaShopImg,
    description: 'Modern storefront with Filament admin dashboard, granular RBAC, and inventory management.',
  },
  {
    id: 'student-life',
    year: '2025',
    title: 'Student Life',
    category: 'All-in-One Productivity PWA',
    categoryFilter: 'web',
    techStack: ['React 19', 'TypeScript', 'Supabase', 'PWA'],
    liveUrl: 'https://ferrelhd.github.io/Student-Life/',
    githubUrl: 'https://github.com/FerrelHD/Student-Life',
    previewImg: studentLifeImg,
    description: 'Progressive Web App organizing academic schedules, coursework tracking, and productivity tools.',
  },
  {
    id: 'charles-leclerc',
    year: '2025',
    title: 'Charles Leclerc #16',
    category: 'Creative Motion & F1 Physics',
    categoryFilter: 'creative',
    techStack: ['React 18', 'GSAP', 'Canvas 2D'],
    liveUrl: 'https://leclerc-redline.vercel.app/',
    previewImg: charlesLeclercImg,
    description: 'High-octane Formula 1 showcase with canvas telemetry visualizers and fluid kinetic transitions.',
  },
  {
    id: 'stock-prediction',
    year: '2024',
    title: 'Stock Prediction ML',
    category: 'Quant ML & Analytics',
    categoryFilter: 'ml',
    techStack: ['Python', 'Streamlit', 'XGBoost', 'LightGBM'],
    githubUrl: 'https://github.com/FerrelHD/Stock-Prediction-System',
    previewImg: stockPredictionImg,
    description: 'Time-series machine learning model analyzing equities with predictive volatility curves and Streamlit dashboard.',
  },
  {
    id: 'street-rush',
    year: '2024',
    title: 'Street Rush',
    category: '3D Arcade Runner Mobile Game',
    categoryFilter: 'games',
    techStack: ['Unity 3D', 'C#', 'Mobile Physics'],
    githubUrl: 'https://github.com/FerrelHD/Street-Rush-Unity',
    previewImg: streetRushImg,
    description: 'Fast-paced mobile 3D endless runner featuring dynamic procedural obstacle spawning and custom physics.',
  },
  {
    id: 'gunung-gede',
    year: '2024',
    title: 'Gunung Gede Simulation',
    category: '3D Trail & Environment Design',
    categoryFilter: 'games',
    techStack: ['Luau', 'Roblox Studio', 'Terrain Modeling'],
    liveUrl: 'https://www.roblox.com/games/125712163693709/Mount-Gede-Via-Gunung-Putri',
    previewImg: gunungGedeImg,
    description: 'Realistic environmental simulation replicating the Mount Gede hiking trail via Gunung Putri route.',
  },
];
