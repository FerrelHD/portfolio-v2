import {
  indonesianCrustalObservatoryImg,
  spiderDevImg,
  fersyaShopImg,
  studentLifeImg,
  charlesLeclercImg,
  gunungGedeImg,
  stockPredictionImg,
  streetRushImg,
  ecoBiteImg,
  personaImg,
  tactiqImg,
} from '@/assets/images';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectHighlight {
  title: string;
  detail: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  tag?: string;
}

export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  system: string;
  context: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  heroImg: string;
  domain?: string;
  metrics?: ProjectMetric[];
  problem: {
    headline: string;
    description: string;
  };
  architecture: {
    headline: string;
    description: string;
    highlights: ProjectHighlight[];
  };
  features: ProjectFeature[];
  takeaways: string[];
}

export const caseStudies: Record<string, ProjectCaseStudy> = {
  'tactiq': {
    id: 'tactiq',
    number: '#02',
    title: 'TactIQ',
    tagline: 'Real-time football telemetry, tactical tracking overlays, and multivariate player intelligence.',
    category: 'Football Analytics & Telemetry Platform',
    year: '2026',
    role: 'Front-End Lead & UI Engineer',
    system: 'Next.js 14 · TypeScript · HTML5 Canvas · Socket.io · Tailwind · Chart.js',
    context: 'Telemetry Engineering Platform',
    domain: 'tactiq.analytics',
    techStack: ['Next.js 14', 'TypeScript', 'HTML5 Canvas', 'Socket.io', 'Chart.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/LuthfiMirza/TactIQ',
    heroImg: tactiqImg,
    metrics: [
      { label: 'Render Frame Rate', value: '60 FPS' },
      { label: 'Socket Latency', value: '< 45ms' },
      { label: 'Radar Dimensions', value: '7 Axes' },
      { label: 'Match Data Points', value: '10K+ / match' },
    ],
    problem: {
      headline: 'Bridging the gap between raw computer vision tracking and tactical decision-making.',
      description:
        'Modern football coaching staff and analysts face an information overload: telemetry data streams, raw tracking coordinates, and delayed video recordings exist in fragmented silos. Analysts spent hours manually reconciling coordinate feeds with video timestamps, lacking an intuitive platform capable of overlaying spatial vectors and predicting match trajectories in real time.',
    },
    architecture: {
      headline: 'High-frequency Canvas 2D telemetry synchronized over WebSockets.',
      description:
        'As Front-End Lead, I architected the core visualization pipeline. We isolated high-frequency coordinate broadcasts from React DOM reconciliations by utilizing a double-buffered HTML5 Canvas 2D engine driven by requestAnimationFrame. Incoming player and ball coordinates are interpolated smoothly to prevent packet jitter, ensuring fluid 60 FPS motion even on low-spec client hardware.',
      highlights: [
        {
          title: 'Sub-50ms Socket.io Transport',
          detail: 'Real-time coordinate broadcasts from computer-vision tracking feeds parsed into spatial vectors with linear interpolation to eliminate visual stutter.',
        },
        {
          title: 'Canvas 2D Pitch Heatmaps',
          detail: 'Custom particle density accumulation algorithm producing live spatial dominance heatmaps and passing corridors directly over the pitch layout.',
        },
        {
          title: 'Multivariate Similarity Engine',
          detail: 'Euclidean distance algorithms matching players across 25+ statistical attributes to identify stylistic alternatives for tactical scouting.',
        },
      ],
    },
    features: [
      {
        title: 'Interactive 2D Pitch Telemetry',
        description: 'Smooth 60 FPS canvas visualization showing real-time player vectors, passing lanes, and team defensive compactness.',
        tag: 'Core Visualization',
      },
      {
        title: '7-Axis Multivariate Radar',
        description: 'Bespoke Chart.js radar charts comparing player metrics against league percentiles with instant side-by-side scouting comparison.',
        tag: 'Analytics Engine',
      },
      {
        title: 'Live Match Forecast Simulator',
        description: 'Predictive win and draw probability curves updating dynamically based on tactical momentum shifts and territory dominance.',
        tag: 'Machine Learning',
      },
    ],
    takeaways: [
      'Decoupling high-frequency data ingestion from the DOM render loop is essential for maintaining a silky 60 FPS on data-heavy dashboards.',
      'Data visualization is only as good as its cognitive legibility: complex multidimensional matrices require clear hierarchical design and intuitive color semantics.',
      'Building for tactical analysts requires responsive controls that remain comfortable during high-pressure live match analysis.',
    ],
  },

  'nusantara-observatory': {
    id: 'nusantara-observatory',
    number: '#01',
    title: 'Nusantara Observatory',
    tagline: 'Interactive geospatial hazard observatory consolidating archipelago seismic, volcanic, and tsunami data into unified visual telemetry.',
    category: 'Geospatial Hazard & Event Replay',
    year: '2026',
    role: 'Frontend & Geospatial Engineer',
    system: 'React 19 · TypeScript · Canvas 2D · GeoJSON · Tailwind',
    context: 'Independent Geospatial Initiative',
    domain: 'nusantara-observatory.vercel.app',
    techStack: ['React 19', 'TypeScript', 'HTML5 Canvas 2D', 'GeoJSON', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://nusantara-observatory.vercel.app/',
    githubUrl: 'https://github.com/FerrelHD/Global-Seismic-Tracker',
    heroImg: indonesianCrustalObservatoryImg,
    metrics: [
      { label: 'Render Engine', value: 'Canvas 2D' },
      { label: 'Feed Sources', value: 'Real-time APIs' },
      { label: 'Bundle Footprint', value: '< 90 KB' },
      { label: 'Replay Speed', value: '1x - 100x' },
    ],
    problem: {
      headline: 'Consolidating fragmented archipelago hazard feeds into unified situational awareness.',
      description:
        'Indonesia sits along the Pacific Ring of Fire, experiencing frequent tectonic shifts, volcanic eruptions, and tsunami warnings. Historically, public information has been scattered across separate agency portals and raw tabular reports. Researchers, disaster response teams, and the general public struggled to visualize spatial clusters, event depth correlations, and historical patterns in a single coherent interface.',
    },
    architecture: {
      headline: 'Lightweight coordinate projection engine and in-memory temporal event scrubber.',
      description:
        'Rather than bundling heavy multi-megabyte GIS libraries, I engineered a bespoke Canvas 2D rendering pipeline using custom equirectangular coordinate transforms. This kept the initial payload under 90 KB while sustaining 60 FPS rendering of thousands of historical earthquake epicenters, plate boundary polygons, and active volcano alerts without thermal throttling.',
      highlights: [
        {
          title: 'Zero-Dependency Map Projection',
          detail: 'Mathematical projection routines translating spherical latitude/longitude into viewport coordinates with smooth mouse and touch zoom/pan matrix transformations.',
        },
        {
          title: 'Temporal Event Replay Engine',
          detail: 'Time-scrubber allowing historical replay of seismic swarms with adjustable playback speeds and depth coloring.',
        },
        {
          title: 'Proximity Exposure Analysis',
          detail: 'Sub-millisecond Haversine distance calculations determining earthquake proximity to densely populated urban centers and coastal infrastructures.',
        },
      ],
    },
    features: [
      {
        title: 'Real-Time Seismic Swarm Visualizer',
        description: 'Epicenters scaled dynamically by Richter magnitude and colored according to focal depth to highlight subduction zone mechanics.',
        tag: 'Geospatial',
      },
      {
        title: 'Volcanic Alert Matrix',
        description: 'Active volcano monitoring tracking real-time status levels (Normal to Awas) with elevation profiles and regional alert zones.',
        tag: 'Monitoring',
      },
      {
        title: 'Historical Timeline Scrubber',
        description: 'Intuitive playback controls enabling researchers to scrub through months of seismic activity to identify swarm precursors.',
        tag: 'Analytics',
      },
    ],
    takeaways: [
      'Custom lightweight canvas rendering often outperforms heavy general-purpose map libraries when rendering thousands of custom dynamic particles and heat trails.',
      'Accessibility and clarity during crisis information visualization requires strict color contrast and unambiguous typography.',
    ],
  },

  'persona-5': {
    id: 'persona-5',
    number: '#03',
    title: 'Persona 5 Royal Portfolio',
    tagline: 'Authentic 60 FPS console experience featuring procedural Web Audio synthesis, ransom-note kinetic typography, and zero-scroll canvas navigation.',
    category: 'Game Console UI & Web Audio Engine',
    year: '2026',
    role: 'Creative Developer & UI Engineer',
    system: 'React 18 · TypeScript · Web Audio API · Tailwind · CSS 3D',
    context: 'Creative Technologist Showcase',
    domain: 'persona.ferrelrashadakeyla2014.workers.dev',
    techStack: ['React 18', 'TypeScript', 'Web Audio API', 'CSS 3D Transforms', 'Tailwind CSS'],
    liveUrl: 'https://persona.ferrelrashadakeyla2014.workers.dev/',
    githubUrl: 'https://github.com/FerrelHD/Persona',
    heroImg: personaImg,
    metrics: [
      { label: 'Target Framerate', value: '60 FPS Locked' },
      { label: 'Audio Latency', value: '0ms Procedural' },
      { label: 'Viewport Mode', value: '1080p Zero-Scroll' },
      { label: 'Asset Audio Size', value: '0 KB (Synthesized)' },
    ],
    problem: {
      headline: 'Pushing web interactivity beyond sterile modern UI conventions.',
      description:
        'Most developer portfolios follow identical grid patterns and neutral aesthetics. I wanted to break the mold entirely by building an authentic, 60 FPS console experience inspired by Persona 5 Royal that pushes web browser audio and animation to its absolute limit.',
    },
    architecture: {
      headline: 'Procedural Web Audio synthesis and zero-scroll state machines.',
      description:
        'Built an acoustic feedback engine using native Web Audio API oscillators and gain nodes (avoiding bulky sound MP3 assets) while providing zero-latency acoustic clicks, thuds, and menu swooshes. Navigation is driven by a finite state machine mimicking console controller inputs.',
      highlights: [
        {
          title: 'Procedural Audio Synthesizer',
          detail: 'Native Web Audio API oscillators synthesizing UI mechanical sounds, eliminating audio load latency entirely.',
        },
        {
          title: 'Dynamic Ransom-Note Typography',
          detail: 'Procedural angle, padding, and font-weight jitter algorithms creating the signature Persona 5 visual rebel style.',
        },
        {
          title: 'CSS 3D Diagonal Perspective',
          detail: 'Hardware-accelerated CSS transforms giving menus sharp diagonal angularity without dropping frames.',
        },
      ],
    },
    features: [
      {
        title: 'Console Menu State Machine',
        description: 'Full keyboard and mouse navigation modeled after game controller menus with sound feedback.',
        tag: 'State Machine',
      },
      {
        title: '1080p Character Loop Integration',
        description: 'Hardware-accelerated video loop integration with alpha blending and dynamic UI color shifting.',
        tag: 'Creative Tech',
      },
      {
        title: 'Calling Card Contact System',
        description: 'Themed contact form styled as the iconic Phantom Thieves Calling Card.',
        tag: 'Interactive UI',
      },
    ],
    takeaways: [
      'The Web Audio API is immensely powerful for UI feedback: synthesizing micro-sounds on the fly delivers zero network lag and a tiny bundle footprint.',
      'Crafting bold, rule-breaking aesthetics requires disciplined performance profiling to ensure heavy visual styling doesn\'t compromise smoothness.',
    ],
  },

  'student-life': {
    id: 'student-life',
    number: '#08',
    title: 'Student Life',
    tagline: 'All-in-one offline-first academic productivity ecosystem consolidating schedules, tasks, and focus sessions.',
    category: 'Productivity PWA & Cloud Persistence',
    year: '2025',
    role: 'Lead Developer & Product Designer',
    system: 'React 19 · TypeScript · Supabase · PWA · Tailwind',
    context: 'Academic Productivity Product',
    domain: 'student-life.app',
    techStack: ['React 19', 'TypeScript', 'Supabase', 'Progressive Web App', 'IndexedDB', 'Tailwind CSS'],
    liveUrl: 'https://ferrelhd.github.io/Student-Life/',
    githubUrl: 'https://github.com/FerrelHD/Student-Life',
    heroImg: studentLifeImg,
    metrics: [
      { label: 'Offline Support', value: '100% PWA Cache' },
      { label: 'Sync Engine', value: 'Local-First' },
      { label: 'Focus Modules', value: 'Timer & Kanban' },
      { label: 'PWA Lighthouse', value: '100 / 100' },
    ],
    problem: {
      headline: 'Consolidating fragmented student productivity tools into a single offline-ready hub.',
      description:
        'Students frequently juggle assignments, course schedules, and Pomodoro timers across three or four separate disconnected applications. Unreliable campus Wi-Fi often leads to lost edits or out-of-sync schedules.',
    },
    architecture: {
      headline: 'Progressive Web App with optimistic local-first state synchronization.',
      description:
        'Designed an offline-first architecture utilizing IndexedDB for instantaneous local reads and writes, paired with Supabase for cloud persistence. When connection drops, state changes queue locally in IndexedDB and reconcile with Supabase on reconnect.',
      highlights: [
        {
          title: 'Optimistic State Architecture',
          detail: 'Immediate UI updates for task completions and schedule shifts with background Supabase mutation queues.',
        },
        {
          title: 'Dedicated Worker Focus Timer',
          detail: 'Web Worker-backed Pomodoro cycle preventing background tab throttling and maintaining precision timing.',
        },
        {
          title: 'Academic Schedule Matrix',
          detail: 'Conflict-detecting schedule calendar with automated reminders and priority weighting.',
        },
      ],
    },
    features: [
      {
        title: 'Smart Coursework Manager',
        description: 'Kanban and list views with due-date countdowns and priority tags.',
        tag: 'Productivity',
      },
      {
        title: 'Precision Pomodoro Timer',
        description: 'Customizable work/break cycles running on dedicated Web Workers.',
        tag: 'Focus Tool',
      },
      {
        title: 'Offline PWA Support',
        description: 'Installable on desktop and mobile with full offline functionality and automatic sync.',
        tag: 'PWA',
      },
    ],
    takeaways: [
      'Building for students means designing for imperfect network conditions: optimistic local-first storage transforms the UX from fragile to dependable.',
      'Web Workers are critical for web timers to avoid browser background tab sleep throttling.',
    ],
  },

  'ecobite': {
    id: 'ecobite',
    number: '#05',
    title: 'EcoBite',
    tagline: 'Campus food rescue and SDG 12 platform with real-time GPS radar, dynamic rescue passes, and carbon reduction metrics.',
    category: 'Campus Food Rescue & SDG 12 Platform',
    year: '2026',
    role: 'Fullstack Engineer & UI Lead',
    system: 'Next.js 14 · TypeScript · Prisma · Tailwind · Supabase',
    context: 'SDG 12 Social Impact Platform',
    techStack: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'Tailwind CSS', 'PostgreSQL'],
    githubUrl: 'https://github.com/FerrelHD/Eco-Bite',
    heroImg: ecoBiteImg,
    metrics: [
      { label: 'Impact Focus', value: 'SDG 12' },
      { label: 'Pass Generation', value: 'Dynamic QR' },
      { label: 'Tracking', value: 'ESG Carbon Reductions' },
      { label: 'Stack', value: 'Next.js 14' },
    ],
    problem: {
      headline: 'Preventing campus cafeteria food waste through rapid-response redistributions.',
      description:
        'Excess food from campus cafeterias and vendors frequently ended up discarded despite high student demand for affordable meals. EcoBite bridges supply and demand with a real-time rescue marketplace.',
    },
    architecture: {
      headline: 'Transactional reservation flow with cryptographic QR claim verification.',
      description:
        'Engineered an inventory locking mechanism using PostgreSQL transactions and Prisma to prevent race conditions during end-of-day surplus meal claims, paired with verifiable dynamic QR codes.',
      highlights: [
        {
          title: 'Inventory Concurrency Guard',
          detail: 'Row-level locking ensuring zero double-claiming when meal batches hit clearance discounts.',
        },
        {
          title: 'Carbon Footprint Calculator',
          detail: 'Real-time metric calculation translating saved meals into CO2 reduction statistics.',
        },
        {
          title: 'Geo-Radius Discovery',
          detail: 'Proximity sorting highlighting immediate food pickup opportunities within walking distance.',
        },
      ],
    },
    features: [
      {
        title: 'Live Rescue Radar',
        description: 'Map and list feeds showing remaining food servings with countdown timers.',
        tag: 'Surplus Radar',
      },
      {
        title: 'Dynamic QR Pass',
        description: 'Time-expiring QR passes scanned by vendors for instant contactless verification.',
        tag: 'Verification',
      },
    ],
    takeaways: [
      'Food rescue platforms require ultra-low friction checkout flows because vendor surplus windows are typically under 30 minutes.',
    ],
  },

  'spidey-dev': {
    id: 'spidey-dev',
    number: '#06',
    title: 'Spidey Dev Portfolio',
    tagline: 'Cinematic Spider-Man-themed portfolio with interactive Web Audio soundscapes and kinetic typography.',
    category: 'Creative Frontend & Web Audio',
    year: '2025',
    role: 'Creative Technologist',
    system: 'React 19 · GSAP · Web Audio API · Tailwind',
    context: 'Interactive Creative Experiment',
    domain: 'spidey-portfolio-ferrel.vercel.app',
    techStack: ['React 19', 'GSAP', 'Web Audio API', 'Tailwind CSS'],
    liveUrl: 'https://spidey-portfolio-ferrel.vercel.app/',
    githubUrl: 'https://github.com/FerrelHD/Portofolio',
    heroImg: spiderDevImg,
    metrics: [
      { label: 'Kinetic Motion', value: 'GSAP Timeline' },
      { label: 'Audio Engine', value: 'Procedural Web Audio' },
      { label: 'Theme', value: 'Spider-Verse' },
      { label: 'Interactive Cursor', value: 'Canvas Web' },
    ],
    problem: {
      headline: 'Recreating comic-book dynamism through kinetic motion and tactile audio.',
      description:
        'Exploring how comic art principles (halftone textures, action lines, and kinetic impact typography) can be translated into modern web interfaces without sacrificing scroll responsiveness.',
    },
    architecture: {
      headline: 'Choreographed GSAP scroll timelines and interactive canvas webs.',
      description:
        'Implemented custom cursor physics simulating web slinging alongside synchronized multi-layer parallax scenes.',
      highlights: [
        {
          title: 'Canvas String Simulation',
          detail: 'Verlet integration physics simulating elastic spider webbing following mouse cursor momentum.',
        },
        {
          title: 'Halftone Shading Shaders',
          detail: 'Lightweight SVG filters and CSS masks producing dynamic comic dot patterns.',
        },
      ],
    },
    features: [
      {
        title: 'Interactive Web Physics',
        description: 'Elastic spider-web cursor trails reacting to cursor velocity.',
        tag: 'Physics',
      },
      {
        title: 'Comic Sound FX Synthesizer',
        description: 'Web Audio API synthesizing retro cartoon sound effects on click events.',
        tag: 'Web Audio',
      },
    ],
    takeaways: [
      'Complex animations must respect user preferences such as prefers-reduced-motion without losing character.',
    ],
  },

  'fersya-shop': {
    id: 'fersya-shop',
    number: '#07',
    title: 'Fersya Shop',
    tagline: 'Modern storefront with Filament admin dashboard, granular RBAC, and inventory management.',
    category: 'Organic E-Commerce Storefront',
    year: '2025',
    role: 'Fullstack Laravel Developer',
    system: 'Laravel 11 · Filament Admin · MySQL · Tailwind',
    context: 'Retail Commerce Platform',
    techStack: ['Laravel 11', 'Filament Admin', 'MySQL', 'Tailwind CSS', 'Blade'],
    githubUrl: 'https://github.com/FerrelHD/Fersya-Shop',
    heroImg: fersyaShopImg,
    metrics: [
      { label: 'Backend', value: 'Laravel 11' },
      { label: 'Admin Panel', value: 'Filament 3' },
      { label: 'Architecture', value: 'MVC + RBAC' },
      { label: 'Database', value: 'MySQL' },
    ],
    problem: {
      headline: 'Streamlining organic retail commerce with automated stock management and staff permissions.',
      description:
        'Small businesses often struggle with managing offline and online stock counts. Fersya Shop provides a unified back-office with role-based staff access.',
    },
    architecture: {
      headline: 'Modular Laravel architecture with reactive Filament tables and automated audit trails.',
      description:
        'Designed database schemas with foreign key constraints and transactional order placement to guarantee inventory integrity.',
      highlights: [
        {
          title: 'Granular Role-Based Access',
          detail: 'Multi-guard authentication separating store managers, fulfillment staff, and customers.',
        },
        {
          title: 'Stock Ledger Logging',
          detail: 'Immutable inventory change logs tracking stock additions, sales, and expirations.',
        },
      ],
    },
    features: [
      {
        title: 'Filament 3 Back-Office',
        description: 'High-speed administrative panel for product curation and order fulfillment.',
        tag: 'Back-Office',
      },
      {
        title: 'Responsive Customer Storefront',
        description: 'Clean organic-themed shopping experience with fast category filtering.',
        tag: 'Storefront',
      },
    ],
    takeaways: [
      'Using mature ecosystem tools like Filament drastically accelerates back-office delivery while preserving enterprise security.',
    ],
  },

  'charles-leclerc': {
    id: 'charles-leclerc',
    number: '#04',
    title: 'Charles Leclerc #16',
    tagline: 'High-octane Formula 1 showcase with canvas telemetry visualizers and fluid kinetic transitions.',
    category: 'Creative Motion & F1 Physics',
    year: '2025',
    role: 'Creative Frontend Developer',
    system: 'React 18 · GSAP · Canvas 2D · Tailwind',
    context: 'Sports Creative Showcase',
    domain: 'leclerc-redline.vercel.app',
    techStack: ['React 18', 'GSAP', 'HTML5 Canvas', 'Tailwind CSS'],
    liveUrl: 'https://leclerc-redline.vercel.app/',
    heroImg: charlesLeclercImg,
    metrics: [
      { label: 'Animation Engine', value: 'GSAP 3' },
      { label: 'Telemetry Visuals', value: 'RPM & G-Force' },
      { label: 'Theme', value: 'Scuderia Ferrari' },
      { label: 'Frame Pacing', value: 'Smooth 60 FPS' },
    ],
    problem: {
      headline: 'Translating the sensory velocity and telemetry of Formula 1 into interactive web form.',
      description:
        'Motorsport enthusiasts love granular telemetry: throttle traces, braking curves, and sector deltas. This project explores high-impact sports storytelling using typography, audio cues, and telemetry charts.',
    },
    architecture: {
      headline: 'Canvas-driven RPM tachometer and kinetic scrub animations.',
      description:
        'Engineered an interactive tachometer dial that revs based on user scroll velocity, paired with smooth video scrub triggers.',
      highlights: [
        {
          title: 'Velocity-Driven UI Feedback',
          detail: 'Scroll velocity feeds directly into tachometer needle position with spring physics.',
        },
        {
          title: 'Dynamic Redline Shader',
          detail: 'Glow filters simulating race steering wheel shift indicator LEDs.',
        },
      ],
    },
    features: [
      {
        title: 'Interactive F1 Tachometer',
        description: 'Dynamic RPM gauge reacting to scroll speed with redline sound triggers.',
        tag: 'Interactive',
      },
      {
        title: 'Sector Delta Timeline',
        description: 'Qualifying lap breakdown comparing telemetry across Monaco and Monza.',
        tag: 'Telemetry',
      },
    ],
    takeaways: [
      'Tying scroll velocity to mechanical feedback creates an immediate physical connection between user input and visual response.',
    ],
  },

  'stock-prediction': {
    id: 'stock-prediction',
    number: '#09',
    title: 'Stock Prediction ML',
    tagline: 'Time-series machine learning model analyzing equities with predictive volatility curves and Streamlit dashboard.',
    category: 'Quant ML & Analytics',
    year: '2024',
    role: 'Machine Learning Engineer',
    system: 'Python · Streamlit · XGBoost · LightGBM · Pandas',
    context: 'Financial Quantitative Research',
    techStack: ['Python', 'Streamlit', 'XGBoost', 'LightGBM', 'Scikit-Learn', 'Pandas'],
    githubUrl: 'https://github.com/FerrelHD/Stock-Prediction-System',
    heroImg: stockPredictionImg,
    metrics: [
      { label: 'ML Models', value: 'XGBoost & LightGBM' },
      { label: 'Feature Engineering', value: 'RSI, MACD, Bollinger' },
      { label: 'Framework', value: 'Python / Streamlit' },
      { label: 'Validation', value: 'Rolling Walk-Forward' },
    ],
    problem: {
      headline: 'Building robust feature pipelines for non-stationary financial time series.',
      description:
        'Financial market data suffers from low signal-to-noise ratios and regime shifts. Standard regressions often overfit historical data without providing actionable confidence bands.',
    },
    architecture: {
      headline: 'Walk-forward rolling validation with technical indicator feature pipelines.',
      description:
        'Implemented rolling time-series splits to prevent future data leakage, extracting momentum, volatility, and mean-reversion indicators before training gradient-boosted ensembles.',
      highlights: [
        {
          title: 'Leakage-Free Feature Engineering',
          detail: 'Strict lag transforms ensuring zero lookahead bias during feature computation.',
        },
        {
          title: 'Interactive Volatility Bands',
          detail: 'Streamlit dashboard rendering confidence envelopes alongside historical moving averages.',
        },
      ],
    },
    features: [
      {
        title: 'Predictive Price Curve',
        description: 'Ensemble model projection with adjustable forecast horizons and risk boundaries.',
        tag: 'Forecasting',
      },
      {
        title: 'Technical Indicator Matrix',
        description: 'Automated calculation of MACD, RSI, and exponential moving averages.',
        tag: 'Feature Store',
      },
    ],
    takeaways: [
      'In financial machine learning, leak-free validation architecture is vastly more important than tuning complex model hyperparameters.',
    ],
  },

  'street-rush': {
    id: 'street-rush',
    number: '#10',
    title: 'Street Rush',
    tagline: 'Fast-paced mobile 3D endless runner featuring dynamic procedural obstacle spawning and custom physics.',
    category: '3D Arcade Runner Mobile Game',
    year: '2024',
    role: 'Game Developer & 3D Designer',
    system: 'Unity 3D · C# · Mobile Physics',
    context: 'Mobile Game Project',
    techStack: ['Unity 3D', 'C#', 'Blender', 'Mobile Optimization'],
    githubUrl: 'https://github.com/FerrelHD/Street-Rush-Unity',
    heroImg: streetRushImg,
    metrics: [
      { label: 'Engine', value: 'Unity 3D' },
      { label: 'Target Platform', value: 'Android / iOS' },
      { label: 'Framerate', value: 'Stable 60 FPS' },
      { label: 'Generation', value: 'Procedural' },
    ],
    problem: {
      headline: 'Maintaining consistent mobile frame pacing with procedural 3D world streaming.',
      description:
        'Continuous object instantiation and garbage collection spikes cause noticeable stutters on mobile devices. Street Rush required zero-allocation pooling to guarantee smooth 60 FPS gameplay.',
    },
    architecture: {
      headline: 'Object pooling architecture and procedural obstacle chunk recycling.',
      description:
        'Architected a ring-buffer object pool that recycles track chunks and obstacles ahead of the camera, eliminating runtime memory allocations during active gameplay.',
      highlights: [
        {
          title: 'Zero-Allocation Pooler',
          detail: 'Recycling 3D road meshes, coins, and barriers to prevent garbage collector hitches.',
        },
        {
          title: 'Responsive Swipe Controller',
          detail: 'Custom touch gesture recognizer with sub-pixel lane snapping physics.',
        },
      ],
    },
    features: [
      {
        title: 'Endless Track Generator',
        description: 'Dynamic procedural generation with curve difficulty ramping as player speed increases.',
        tag: 'Game Loop',
      },
      {
        title: 'Mobile Touch Controls',
        description: 'Ultra-low latency swipe detection for lane changes, slide rolls, and jump physics.',
        tag: 'Input',
      },
    ],
    takeaways: [
      'Object pooling is non-negotiable for mobile 3D games: garbage collection spikes ruin player immersion faster than anything else.',
    ],
  },

  'gunung-gede': {
    id: 'gunung-gede',
    number: '#11',
    title: 'Gunung Gede Simulation',
    tagline: 'Realistic environmental simulation replicating the Mount Gede hiking trail via Gunung Putri route.',
    category: '3D Trail & Environment Design',
    year: '2024',
    role: 'Environment Artist & Scripter',
    system: 'Luau · Roblox Studio · Terrain Modeling',
    context: 'Virtual Trail Simulation',
    techStack: ['Luau', 'Roblox Studio', 'Terrain Sculpting', 'Atmospheric Lighting'],
    liveUrl: 'https://www.roblox.com/games/125712163693709/Mount-Gede-Via-Gunung-Putri',
    heroImg: gunungGedeImg,
    metrics: [
      { label: 'Trail Length', value: 'Full Virtual Route' },
      { label: 'Lighting', value: 'Dynamic Volumetric' },
      { label: 'Terrain', value: 'Custom Heightmaps' },
      { label: 'Platform', value: 'Roblox Engine' },
    ],
    problem: {
      headline: 'Recreating authentic mountaineering topography and atmospheric conditions virtually.',
      description:
        'Simulating the physical feel of ascending the Gunung Putri route on Mount Gede, spanning dense lower tropical rainforest to the rocky summit plateau and Surya Kencana meadow.',
    },
    architecture: {
      headline: 'Heightmap terrain sculpting and altitude-triggered volumetric weather zones.',
      description:
        'Scripted altitude-based weather zones that dynamically adjust ambient temperature, fog density, and wind audio cues as players hike up the mountain slope.',
      highlights: [
        {
          title: 'Altitude Atmosphere Controller',
          detail: 'Dynamic Luau scripts transitioning sunlight scattering, wind particles, and fog as elevation increases.',
        },
        {
          title: 'Topographic Accuracy',
          detail: 'Modeled after real GPS trail waypoints from Pos 1 to Surya Kencana savanna.',
        },
      ],
    },
    features: [
      {
        title: 'Realistic Rainforest Foliage',
        description: 'Carefully staged Indonesian mossy forest vegetation and root-strewn trail obstacles.',
        tag: 'Environment',
      },
      {
        title: 'Surya Kencana Edelweiss Meadow',
        description: 'Vast volcanic savanna with iconic edelweiss fields and morning mist effects.',
        tag: 'Atmosphere',
      },
    ],
    takeaways: [
      'Atmospheric cues (ambient soundscapes, subtle fog depth, and directional lighting) do the heaviest lifting in creating environmental immersion.',
    ],
  },
};

export const caseStudyOrder: string[] = [
  'nusantara-observatory',
  'tactiq',
  'persona-5',
  'charles-leclerc',
  'ecobite',
  'spidey-dev',
  'fersya-shop',
  'student-life',
  'stock-prediction',
  'street-rush',
  'gunung-gede',
];
