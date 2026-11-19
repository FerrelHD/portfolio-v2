export type ArchiveCategoryFilter = 'all' | 'web' | 'creative' | 'ml' | 'games';

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

export interface ProjectFeaturedSlide {
  title?: string;
  aboutP1?: string;
  aboutP2?: string;
  previewVideo?: string;
  mediaClass?: string;
}

export interface ProjectCaseStudyInput {
  tagline?: string;
  role?: string;
  system?: string;
  context?: string;
  techStack?: string[];
  metrics?: ProjectMetric[];
  problem?: {
    headline?: string;
    description?: string;
  };
  architecture?: {
    headline?: string;
    description?: string;
    highlights?: ProjectHighlight[];
  };
  features?: ProjectFeature[];
  takeaways?: string[];
}

export interface ProjectEntry {
  id?: string;
  title: string;
  year: string;
  order?: number;
  category: string;
  categoryFilter: Exclude<ArchiveCategoryFilter, 'all'>;
  description?: string;
  techStack: string[];
  previewImg: string;
  liveUrl?: string;
  githubUrl?: string;
  domain?: string;
  aliases?: string[];
  featured?: boolean;
  featuredOrder?: number;
  featuredSlide?: ProjectFeaturedSlide;
  caseStudy?: ProjectCaseStudyInput;
}

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

export interface WorkSlideProject {
  id: string;
  slideNumber: string;
  title: string;
  aboutP1: string;
  aboutP2: string;
  role: string;
  system: string;
  domain: string;
  previewImg: string;
  previewVideo?: string;
  mediaClass?: string;
  liveUrl?: string;
  githubUrl?: string;
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
  problem?: {
    headline: string;
    description: string;
  };
  architecture?: {
    headline: string;
    description: string;
    highlights: ProjectHighlight[];
  };
  features: ProjectFeature[];
  takeaways: string[];
}

export const archiveCategories: { id: ArchiveCategoryFilter; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'web', label: 'WEB & APPS' },
  { id: 'creative', label: 'CREATIVE MOTION' },
  { id: 'ml', label: 'MACHINE LEARNING' },
  { id: 'games', label: '3D & GAMES' },
];

function inferDomain(entry: ProjectEntry): string {
  if (entry.domain) return entry.domain;
  const url = entry.liveUrl || entry.githubUrl;
  if (!url) return 'preview.interactive';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

const rawModules = import.meta.glob<ProjectEntry>('../content/projects/*.json', {
  eager: true,
  import: 'default',
});

interface NormalizedProject extends ProjectEntry {
  id: string;
  order: number;
  techStack: string[];
}

const normalizedProjects: NormalizedProject[] = Object.entries(rawModules)
  .map(([filePath, entry]) => {
    const fileSlug = filePath.split('/').pop()?.replace(/\.json$/, '') || 'project';
    return {
      ...entry,
      id: (entry.id || fileSlug).trim(),
      order: typeof entry.order === 'number' ? entry.order : 999,
      techStack: Array.isArray(entry.techStack) ? entry.techStack : [],
    };
  })
  .sort((a, b) => a.order - b.order || b.year.localeCompare(a.year) || a.title.localeCompare(b.title));

export const projectsById: Record<string, NormalizedProject> = Object.fromEntries(
  normalizedProjects.map((p) => [p.id, p]),
);

export const archiveProjects: ArchiveProject[] = normalizedProjects.map((p) => ({
  id: p.id,
  year: p.year,
  title: p.title,
  category: p.category,
  categoryFilter: p.categoryFilter,
  techStack: p.techStack,
  liveUrl: p.liveUrl || undefined,
  githubUrl: p.githubUrl || undefined,
  previewImg: p.previewImg,
  description: p.description || p.caseStudy?.tagline || undefined,
}));

export const featuredProjects: WorkSlideProject[] = normalizedProjects
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999) || a.order - b.order)
  .map((p, idx) => {
    const slide = p.featuredSlide;
    const cs = p.caseStudy;
    const systemFromStack = p.techStack.join(' · ');
    return {
      id: p.id,
      slideNumber: `#${String(idx + 1).padStart(2, '0')}`,
      title: slide?.title || p.title,
      aboutP1: slide?.aboutP1 || p.description || cs?.tagline || '',
      aboutP2: slide?.aboutP2 || cs?.architecture?.description || '',
      role: cs?.role || 'Software Engineer',
      system: systemFromStack || cs?.system || '',
      domain: inferDomain(p),
      previewImg: p.previewImg,
      previewVideo: slide?.previewVideo || undefined,
      mediaClass: slide?.mediaClass || undefined,
      liveUrl: p.liveUrl || undefined,
      githubUrl: p.githubUrl || undefined,
    };
  });

export const caseStudyOrder: string[] = normalizedProjects.map((p) => p.id);

export const caseStudies: Record<string, ProjectCaseStudy> = {};

const totalCount = normalizedProjects.length;
normalizedProjects.forEach((p, idx) => {
  const cs = p.caseStudy;
  const hasProblem = Boolean(cs?.problem?.headline || cs?.problem?.description);
  const hasArch = Boolean(
    cs?.architecture?.headline ||
      cs?.architecture?.description ||
      (cs?.architecture?.highlights && cs.architecture.highlights.length > 0),
  );
  const resolvedStack =
    cs?.techStack && cs.techStack.length > 0 ? cs.techStack : p.techStack;

  const built: ProjectCaseStudy = {
    id: p.id,
    number: `#${String(totalCount - idx).padStart(2, '0')}`,
    title: p.title,
    tagline: cs?.tagline || p.description || p.category,
    category: p.category,
    year: p.year,
    role: cs?.role || 'Software Engineer',
    system: cs?.system || resolvedStack.join(' · '),
    context: cs?.context || p.category,
    techStack: resolvedStack,
    liveUrl: p.liveUrl || undefined,
    githubUrl: p.githubUrl || undefined,
    heroImg: p.previewImg,
    domain: inferDomain(p),
    metrics: cs?.metrics?.filter((m) => m.label && m.value),
    problem: hasProblem
      ? {
          headline: cs?.problem?.headline || 'Project Context',
          description: cs?.problem?.description || p.description || '',
        }
      : p.description
        ? {
            headline: p.category,
            description: p.description,
          }
        : undefined,
    architecture: hasArch
      ? {
          headline: cs?.architecture?.headline || 'System Architecture',
          description: cs?.architecture?.description || '',
          highlights: cs?.architecture?.highlights?.filter((h) => h.title && h.detail) || [],
        }
      : undefined,
    features: cs?.features?.filter((f) => f.title && f.description) || [],
    takeaways: cs?.takeaways?.filter((t) => Boolean(t && t.trim())) || [],
  };

  caseStudies[p.id] = built;
  if (Array.isArray(p.aliases)) {
    p.aliases.forEach((alias) => {
      if (alias && !caseStudies[alias]) {
        caseStudies[alias] = built;
      }
    });
  }
});
