export type TechCategory = 'frontend' | 'backend' | 'ml-3d';

export type TechTier = 'core' | 'explored';

export type PinTone = 'ink' | 'bronze' | 'slate' | 'sage' | 'terracotta';

export interface TechModule {
  id: string;
  name: string;
  role: string;
  category: TechCategory;
  tier: TechTier;
  studs: 2 | 4;
  projects: string[];
  tone: PinTone;
}

export interface StackPreset {
  id: string;
  label: string;
  moduleIds: string[];
}

export const TECH_CATEGORIES: { id: 'all' | TechCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend & Motion' },
  { id: 'backend', label: 'Backend & Cloud' },
  { id: 'ml-3d', label: 'ML & 3D' },
];

export const TECH_MODULES: TechModule[] = [
  {
    id: 'vue',
    name: 'Vue 3',
    role: 'UI Framework',
    category: 'frontend',
    tier: 'core',
    studs: 4,
    projects: ['Portfolio v2', 'NotchFlow'],
    tone: 'sage',
  },
  {
    id: 'react',
    name: 'React 19',
    role: 'UI Library',
    category: 'frontend',
    tier: 'core',
    studs: 4,
    projects: ['Nusantara Observatory', 'Student Life', 'Charles Leclerc #16'],
    tone: 'slate',
  },
  {
    id: 'nextjs',
    name: 'Next.js 15',
    role: 'App Router',
    category: 'frontend',
    tier: 'core',
    studs: 4,
    projects: ['Cyberpunk Edgerunners VHS', 'TactIQ'],
    tone: 'ink',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    role: 'Type Safety',
    category: 'frontend',
    tier: 'core',
    studs: 4,
    projects: ['Portfolio v2', 'Nusantara Observatory', 'TactIQ'],
    tone: 'slate',
  },
  {
    id: 'tailwind',
    name: 'Tailwind v4',
    role: 'Design System',
    category: 'frontend',
    tier: 'core',
    studs: 2,
    projects: ['Portfolio v2', 'Student Life'],
    tone: 'bronze',
  },
  {
    id: 'gsap',
    name: 'GSAP',
    role: 'Motion Engine',
    category: 'frontend',
    tier: 'core',
    studs: 2,
    projects: ['Portfolio v2', 'Charles Leclerc #16'],
    tone: 'sage',
  },
  {
    id: 'threejs',
    name: 'Three.js',
    role: 'WebGL 3D',
    category: 'ml-3d',
    tier: 'core',
    studs: 4,
    projects: ['Cyberpunk Edgerunners VHS'],
    tone: 'ink',
  },
  {
    id: 'laravel',
    name: 'Laravel 11',
    role: 'Full-Stack PHP',
    category: 'backend',
    tier: 'core',
    studs: 4,
    projects: ['Fersya Shop'],
    tone: 'terracotta',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    role: 'API Runtime',
    category: 'backend',
    tier: 'core',
    studs: 2,
    projects: ['Eco-Bite', 'Portfolio Tooling'],
    tone: 'sage',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    role: 'Postgres & Auth',
    category: 'backend',
    tier: 'core',
    studs: 4,
    projects: ['Student Life', 'Eco-Bite'],
    tone: 'bronze',
  },
  {
    id: 'python-ml',
    name: 'Python & ML',
    role: 'XGBoost / LightGBM',
    category: 'ml-3d',
    tier: 'explored',
    studs: 4,
    projects: ['Stock Prediction ML'],
    tone: 'bronze',
  },
  {
    id: 'unity-3d',
    name: 'Unity & Blender',
    role: '3D & C# Physics',
    category: 'ml-3d',
    tier: 'explored',
    studs: 2,
    projects: ['Street Rush', 'Gunung Gede Simulation'],
    tone: 'terracotta',
  },
];

export const STACK_PRESETS: StackPreset[] = [
  {
    id: 'editorial-web',
    label: 'Editorial Web',
    moduleIds: ['vue', 'typescript', 'tailwind', 'gsap'],
  },
  {
    id: 'creative-3d',
    label: 'Creative 3D',
    moduleIds: ['nextjs', 'react', 'threejs', 'gsap'],
  },
  {
    id: 'fullstack-ml',
    label: 'Full-Stack & ML',
    moduleIds: ['laravel', 'supabase', 'python-ml', 'nodejs'],
  },
];
