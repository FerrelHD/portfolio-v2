import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  STACK_GRID,
  packStackModules,
  getHiddenBaseStuds,
  getHiddenModuleStuds,
  deriveStackProfile,
  computePlinthScale,
} from '../src/utils/techStackGrid.ts';
import type { TechModule } from '../src/data/techStack.ts';

const makeMod = (
  id: string,
  studs: 2 | 4,
  category: TechModule['category'] = 'frontend'
): TechModule => ({
  id,
  name: id,
  role: 'Role',
  category,
  tier: 'core',
  studs,
  projects: [],
  tone: 'ink',
});

describe('techStackGrid', () => {
  it('returns empty positioned array and maxRow -1 when equipped is empty', () => {
    const res = packStackModules([]);
    assert.deepEqual(res.positioned, []);
    assert.equal(res.maxRow, -1);
  });

  it('packs three 2-stud modules into row 0 without overlap', () => {
    const mods = [makeMod('a', 2), makeMod('b', 2), makeMod('c', 2)];
    const res = packStackModules(mods);
    assert.equal(res.maxRow, 0);
    assert.deepEqual(
      res.positioned.map((p) => ({ id: p.module.id, row: p.rowIndex, col: p.colIndex })),
      [
        { id: 'a', row: 0, col: 0 },
        { id: 'b', row: 0, col: 2 },
        { id: 'c', row: 0, col: 4 },
      ]
    );
  });

  it('wraps second 4-stud module to row 1 col 0', () => {
    const mods = [makeMod('a', 4), makeMod('b', 4)];
    const res = packStackModules(mods);
    assert.equal(res.maxRow, 1);
    assert.equal(res.positioned[0].rowIndex, 0);
    assert.equal(res.positioned[0].colIndex, 0);
    assert.equal(res.positioned[1].rowIndex, 1);
    assert.equal(res.positioned[1].colIndex, 0);
  });

  it('excludes animating module studs from hidden base and module studs', () => {
    const mods = [makeMod('a', 4), makeMod('b', 2), makeMod('c', 4)];
    const { grid } = packStackModules(mods);
    const animating = { b: true, c: true };

    assert.deepEqual(getHiddenBaseStuds(grid, animating), [0, 1, 2, 3]);
    assert.deepEqual(getHiddenModuleStuds(grid, 0, 0, 4, animating), []);
    assert.deepEqual(getHiddenModuleStuds(grid, 0, 0, 4, {}), [0, 1, 2, 3]);
  });

  it('derives distinct architecture profiles for empty, frontend, fullstack, and ML+3D stacks', () => {
    assert.equal(deriveStackProfile([]).title, 'Awaiting Modules');
    assert.equal(
      deriveStackProfile([makeMod('vue', 4, 'frontend')]).title,
      'Editorial Frontend System'
    );
    assert.equal(
      deriveStackProfile([makeMod('vue', 4, 'frontend'), makeMod('laravel', 4, 'backend')]).title,
      'Full-Stack Web Platform'
    );
    assert.equal(
      deriveStackProfile([
        makeMod('vue', 4, 'frontend'),
        makeMod('laravel', 4, 'backend'),
        makeMod('threejs', 4, 'ml-3d'),
      ]).title,
      'Multidisciplinary 3D & ML Stack'
    );
  });

  it('seats subsequent rows onto lower bevel without floating gap', () => {
    assert.equal(STACK_GRID.ROW_HEIGHT, STACK_GRID.BLOCK_HEIGHT - STACK_GRID.BEVEL_OVERLAP);
    assert.ok(STACK_GRID.ROW_HEIGHT < STACK_GRID.BLOCK_HEIGHT);
  });

  it('scales plinth down on compact laptop viewports when many rows are stacked', () => {
    const fullScale = computePlinthScale(1080, 7);
    const laptopScale = computePlinthScale(720, 7);
    const compactScale = computePlinthScale(620, 7);
    assert.equal(fullScale, 1);
    assert.ok(laptopScale < 1 && laptopScale >= 0.58);
    assert.ok(compactScale < 0.85 && compactScale >= 0.58);
  });
});
