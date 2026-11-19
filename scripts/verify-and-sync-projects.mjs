import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const projectsDir = path.join(repoRoot, 'src/content/projects');
const publicDir = path.join(repoRoot, 'public');
const sitemapPath = path.join(publicDir, 'sitemap-images.xml');

const SITE_URL = 'https://ferrel-rashad-portfolio.vercel.app';
const VALID_CATEGORIES = new Set(['web', 'creative', 'ml', 'games']);

function escapeXml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function encodeUrlPath(urlPath) {
  return urlPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function assertPublicAssetExists(assetPath, label, fileName) {
  if (/^https?:\/\//.test(assetPath)) return;
  assert.ok(
    assetPath.startsWith('/'),
    `[${fileName}] ${label} must start with "/" or "https://", got: ${assetPath}`,
  );
  const fullPath = path.join(publicDir, assetPath.slice(1));
  assert.ok(
    fs.existsSync(fullPath),
    `[${fileName}] Missing ${label} in public/: ${assetPath} (expected at ${path.relative(repoRoot, fullPath)})`,
  );
}

const files = fs
  .readdirSync(projectsDir)
  .filter((f) => f.endsWith('.json'))
  .sort();

assert.ok(files.length > 0, 'Expected at least 1 project JSON in src/content/projects/');

const seenIds = new Set();
const projects = [];

for (const fileName of files) {
  const fullPath = path.join(projectsDir, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  let entry;
  try {
    entry = JSON.parse(raw);
  } catch (err) {
    throw new Error(`[${fileName}] Invalid JSON: ${err.message}`);
  }

  const id = String(entry.id || fileName.replace(/\.json$/, '')).trim();
  assert.ok(id.length > 0, `[${fileName}] Empty project id`);
  assert.ok(!seenIds.has(id), `[${fileName}] Duplicate project id: ${id}`);
  seenIds.add(id);

  assert.equal(typeof entry.title, 'string', `[${fileName}] Missing title`);
  assert.ok(entry.title.trim().length > 0, `[${fileName}] Empty title`);
  assert.match(String(entry.year || ''), /^\d{4}$/, `[${fileName}] year must be 4 digits`);
  assert.ok(
    VALID_CATEGORIES.has(entry.categoryFilter),
    `[${fileName}] Invalid categoryFilter "${entry.categoryFilter}"`,
  );
  assert.ok(Array.isArray(entry.techStack), `[${fileName}] techStack must be an array`);
  assert.equal(typeof entry.previewImg, 'string', `[${fileName}] Missing previewImg`);

  assertPublicAssetExists(entry.previewImg, 'previewImg', fileName);

  if (entry.featuredSlide?.previewVideo) {
    assertPublicAssetExists(entry.featuredSlide.previewVideo, 'featuredSlide.previewVideo', fileName);
  }

  projects.push({ ...entry, id, order: typeof entry.order === 'number' ? entry.order : 999 });
}

projects.sort(
  (a, b) => a.order - b.order || b.year.localeCompare(a.year) || a.title.localeCompare(b.title),
);

const imageEntries = [
  {
    loc: `${SITE_URL}/og-image-2026.png`,
    title: 'Ferrel Rashad Akeyla — Software Engineer & Creative Developer Portfolio',
    caption: 'Open Graph showcase banner of Ferrel Rashad Akeyla portfolio',
  },
  {
    loc: `${SITE_URL}/projects/ferrel-portrait.jpg`,
    title: 'Ferrel Rashad Akeyla — Portrait Photo',
    caption: 'Full-Stack Developer & Creative Engineer Portrait Photo',
  },
  ...projects.map((p) => ({
    loc: /^https?:\/\//.test(p.previewImg) ? p.previewImg : `${SITE_URL}${encodeUrlPath(p.previewImg)}`,
    title: `${p.title} — ${p.category}`,
    caption: p.description || p.caseStudy?.tagline || `${p.title} portfolio project by Ferrel Rashad`,
  })),
];

const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  '  <url>',
  `    <loc>${SITE_URL}/</loc>`,
  ...imageEntries.flatMap((img) => [
    '    <image:image>',
    `      <image:loc>${escapeXml(img.loc)}</image:loc>`,
    `      <image:title>${escapeXml(img.title)}</image:title>`,
    `      <image:caption>${escapeXml(img.caption)}</image:caption>`,
    '    </image:image>',
  ]),
  '  </url>',
  '</urlset>',
  '',
];

fs.writeFileSync(sitemapPath, xmlLines.join('\n'), 'utf8');
console.log(
  `✓ Verified ${projects.length} projects (${projects.filter((p) => p.featured).length} featured) & synced public/sitemap-images.xml (${imageEntries.length} images).`,
);
