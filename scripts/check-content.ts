/**
 * Verifica la integridad del contenido:
 * - que cada página de la navegación tenga su archivo MDX y frontmatter válido,
 * - que no haya archivos MDX huérfanos,
 * - que prerequisitos, temas relacionados, glosario y rutas apunten a temas existentes,
 * - que los enlaces internos /docs/... y <Term slug="..."> sean válidos.
 *
 * Uso: npm run check:content
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { sections } from '../content/navigation.ts';
import { glossary } from '../content/glossary.ts';
import { learningPaths } from '../content/learning-paths.ts';
import { technologies } from '../content/technologies.ts';

const root = path.join(import.meta.dirname, '..');
const contentDir = path.join(root, 'content', 'docs');
const errors: string[] = [];
const ids = new Set<string>();
const files = new Map<string, { data: Record<string, unknown>; body: string }>();

for (const section of sections) {
  const pages = section.groups ? section.groups.flatMap((g) => g.pages) : (section.pages ?? []);
  for (const slug of pages) {
    const id = `${section.slug}/${slug}`;
    const file = path.join(contentDir, section.slug, `${slug}.mdx`);
    if (!fs.existsSync(file)) {
      errors.push(`Falta el archivo: content/docs/${id}.mdx`);
      continue;
    }
    const { data, content } = matter(fs.readFileSync(file, 'utf8'));
    for (const key of ['title', 'description', 'difficulty', 'time']) {
      if (!data[key]) errors.push(`${id}: falta "${key}" en el frontmatter`);
    }
    if (!['principiante', 'intermedio', 'avanzado'].includes(data.difficulty as string)) {
      errors.push(`${id}: dificultad no válida "${data.difficulty}"`);
    }
    if (section.kind === 'project') {
      for (const key of ['goal', 'technologies', 'features']) {
        if (!data[key]) errors.push(`${id}: los proyectos requieren "${key}"`);
      }
    }
    ids.add(id);
    files.set(id, { data, body: content });
  }
}

// Archivos que existen pero no están en la navegación
for (const dir of fs.readdirSync(contentDir)) {
  for (const file of fs.readdirSync(path.join(contentDir, dir))) {
    const id = `${dir}/${file.replace(/\.mdx$/, '')}`;
    if (!ids.has(id)) errors.push(`Archivo huérfano (no está en navigation.ts): content/docs/${id}.mdx`);
  }
}

const sectionSlugs = new Set(sections.map((s) => s.slug));
const glossarySlugs = new Set(glossary.map((g) => g.slug));
const checkId = (where: string, id: string) => {
  if (!ids.has(id)) errors.push(`${where}: referencia a un tema inexistente "${id}"`);
};
const checkHref = (where: string, href: string) => {
  const clean = href.split('#')[0].replace(/\/$/, '');
  if (clean.startsWith('/docs/')) {
    const rest = clean.slice('/docs/'.length);
    if (!ids.has(rest) && !sectionSlugs.has(rest)) errors.push(`${where}: enlace roto ${href}`);
  } else if (clean.startsWith('/glosario') && href.includes('#')) {
    const slug = href.split('#')[1];
    if (!glossarySlugs.has(slug)) errors.push(`${where}: término de glosario inexistente ${href}`);
  }
};

for (const [id, { data, body }] of files) {
  for (const ref of (data.prerequisites as string[] | undefined) ?? []) checkId(`${id} (prerequisites)`, ref);
  for (const ref of (data.related as string[] | undefined) ?? []) checkId(`${id} (related)`, ref);
  for (const match of body.matchAll(/\]\((\/[^)\s]+)\)/g)) checkHref(id, match[1]);
  for (const match of body.matchAll(/href="(\/[^"]+)"/g)) checkHref(id, match[1]);
  for (const match of body.matchAll(/<Term slug="([^"]+)"/g)) {
    if (!glossarySlugs.has(match[1])) errors.push(`${id}: <Term> con slug inexistente "${match[1]}"`);
  }
  // Los bloques de código deben cerrarse
  const fences = body.match(/^```/gm)?.length ?? 0;
  if (fences % 2 !== 0) errors.push(`${id}: bloque de código sin cerrar`);
}

for (const g of glossary) for (const ref of g.docs ?? []) checkId(`glosario/${g.slug}`, ref);
for (const p of learningPaths) for (const ref of p.steps) checkId(`ruta/${p.slug}`, ref);
for (const t of technologies) checkHref(`tecnología ${t.name}`, t.href);

const total = ids.size;
if (errors.length) {
  console.error(`✗ ${errors.length} problema(s) en el contenido (${total} temas encontrados):\n`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ Contenido válido: ${total} temas, ${glossary.length} términos, ${learningPaths.length} rutas.`);
