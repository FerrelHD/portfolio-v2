import type { TechModule } from '../data/techStack';

export const STACK_GRID = {
  STUD_WIDTH: 62,
  ROW_HEIGHT: 74,
  MAX_ROWS: 12,
  COLS: 6,
  APEX_HEIGHT: 130,
} as const;

export interface PositionedModule {
  module: TechModule;
  rowIndex: number;
  colIndex: number;
}

export function packStackModules(
  equipped: TechModule[],
  cols: number = STACK_GRID.COLS,
  maxRows: number = STACK_GRID.MAX_ROWS
): {
  grid: (string | null)[][];
  positioned: PositionedModule[];
  maxRow: number;
} {
  const grid: (string | null)[][] = [];
  const positioned: PositionedModule[] = [];
  let maxRow = -1;

  for (const mod of equipped) {
    let placedRow = -1;
    let placedCol = -1;

    for (let r = 0; r < maxRows; r++) {
      if (!grid[r]) {
        grid[r] = Array(cols).fill(null);
      }

      let contiguous = 0;
      for (let c = 0; c < cols; c++) {
        if (!grid[r][c]) {
          contiguous++;
          if (contiguous === mod.studs) {
            placedRow = r;
            placedCol = c - mod.studs + 1;
            break;
          }
        } else {
          contiguous = 0;
        }
      }

      if (placedRow !== -1) break;
    }

    if (placedRow !== -1) {
      for (let i = 0; i < mod.studs; i++) {
        grid[placedRow][placedCol + i] = mod.id;
      }
      if (placedRow > maxRow) maxRow = placedRow;
      positioned.push({ module: mod, rowIndex: placedRow, colIndex: placedCol });
    }
  }

  return { grid, positioned, maxRow };
}

export function getHiddenBaseStuds(
  grid: (string | null)[][],
  animatingIds: Record<string, unknown>,
  cols: number = STACK_GRID.COLS
): number[] {
  const hidden: number[] = [];
  const row0 = grid[0];
  if (!row0) return hidden;

  for (let c = 0; c < cols; c++) {
    const occupantId = row0[c];
    if (occupantId && !animatingIds[occupantId]) {
      hidden.push(c);
    }
  }
  return hidden;
}

export function getHiddenModuleStuds(
  grid: (string | null)[][],
  rowIndex: number,
  colIndex: number,
  studs: number,
  animatingIds: Record<string, unknown>
): number[] {
  const hidden: number[] = [];
  const upperRow = grid[rowIndex + 1];
  if (!upperRow) return hidden;

  for (let i = 0; i < studs; i++) {
    const occupantId = upperRow[colIndex + i];
    if (occupantId && !animatingIds[occupantId]) {
      hidden.push(i);
    }
  }
  return hidden;
}

export function deriveStackProfile(equipped: TechModule[]): {
  title: string;
  summary: string;
} {
  if (equipped.length === 0) {
    return {
      title: 'Awaiting Modules',
      summary: 'Select technologies from the index to compose a stack.',
    };
  }

  const hasFrontend = equipped.some((m) => m.category === 'frontend');
  const hasBackend = equipped.some((m) => m.category === 'backend');
  const hasMl3d = equipped.some((m) => m.category === 'ml-3d');

  if (hasFrontend && hasBackend && hasMl3d) {
    return {
      title: 'Multidisciplinary 3D & ML Stack',
      summary: `${equipped.length} modules spanning interface, server architecture, and spatial/ML pipelines.`,
    };
  }

  if (hasFrontend && hasMl3d) {
    return {
      title: 'Interactive WebGL & Creative Stack',
      summary: `${equipped.length} modules tuned for 60 FPS motion, shaders, and real-time visuals.`,
    };
  }

  if (hasFrontend && hasBackend) {
    return {
      title: 'Full-Stack Web Platform',
      summary: `${equipped.length} modules covering end-to-end UI engineering and persistent APIs.`,
    };
  }

  if (hasBackend && hasMl3d) {
    return {
      title: 'Quantitative Data & API Engine',
      summary: `${equipped.length} modules built for predictive modeling and scalable services.`,
    };
  }

  if (hasFrontend) {
    return {
      title: 'Editorial Frontend System',
      summary: `${equipped.length} modules focused on typography, layout craft, and fluid motion.`,
    };
  }

  if (hasBackend) {
    return {
      title: 'Backend & Data Architecture',
      summary: `${equipped.length} modules structured for relational data and reliable endpoints.`,
    };
  }

  return {
    title: 'Spatial & Quantitative Lab',
    summary: `${equipped.length} modules spanning 3D simulation and machine learning.`,
  };
}
