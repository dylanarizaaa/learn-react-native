import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { sections } from '@/content/navigation';
import type { Doc, DocFrontmatter, DocMeta, NavItem, NavSection } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs');

interface LoadedContent {
  docs: Doc[];
  byId: Map<string, Doc>;
  navigation: NavSection[];
}

let cache: LoadedContent | null = null;

function readDoc(
  sectionSlug: string,
  sectionTitle: string,
  slug: string,
  kind: 'doc' | 'project',
  group?: string,
): Doc | null {
  const file = path.join(CONTENT_DIR, sectionSlug, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    console.warn(`[content] Falta el archivo ${path.relative(process.cwd(), file)}`);
    return null;
  }
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as DocFrontmatter;
  if (!fm.title || !fm.description || !fm.difficulty || !fm.time) {
    throw new Error(`[content] Frontmatter incompleto en ${sectionSlug}/${slug}.mdx`);
  }
  const meta: DocMeta = {
    ...fm,
    id: `${sectionSlug}/${slug}`,
    section: sectionSlug,
    slug,
    url: `/docs/${sectionSlug}/${slug}`,
    sectionTitle,
    kind,
    group,
  };
  return { meta, body: content };
}

function load(): LoadedContent {
  if (cache) return cache;
  const docs: Doc[] = [];
  const navigation: NavSection[] = [];

  for (const section of sections) {
    const kind = section.kind ?? 'doc';
    const groups = section.groups ?? [{ title: undefined as unknown as string, pages: section.pages ?? [] }];
    const navGroups: NavSection['groups'] = [];

    for (const group of groups) {
      const items: NavItem[] = [];
      for (const slug of group.pages) {
        const doc = readDoc(section.slug, section.title, slug, kind, group.title);
        if (!doc) continue;
        docs.push(doc);
        items.push(toNavItem(doc.meta));
      }
      navGroups.push({ title: group.title, items });
    }

    navigation.push({
      slug: section.slug,
      title: section.title,
      description: section.description,
      icon: section.icon,
      badge: section.badge,
      kind,
      groups: navGroups,
    });
  }

  cache = { docs, byId: new Map(docs.map((d) => [d.meta.id, d])), navigation };
  return cache;
}

export function toNavItem(meta: DocMeta): NavItem {
  return {
    id: meta.id,
    title: meta.sidebarTitle ?? meta.title,
    url: meta.url,
    difficulty: meta.difficulty,
    time: meta.time,
  };
}

export function getAllDocs(): Doc[] {
  return load().docs;
}

export function getAllMeta(): DocMeta[] {
  return load().docs.map((d) => d.meta);
}

export function getDoc(id: string): Doc | undefined {
  return load().byId.get(id);
}

export function getMeta(id: string): DocMeta | undefined {
  return load().byId.get(id)?.meta;
}

export function getNavigation(): NavSection[] {
  return load().navigation;
}

export function getSectionDocs(sectionSlug: string): DocMeta[] {
  return getAllMeta().filter((m) => m.section === sectionSlug);
}

export function getPrevNext(id: string): { prev?: DocMeta; next?: DocMeta } {
  const all = getAllMeta();
  const index = all.findIndex((m) => m.id === id);
  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : undefined,
  };
}

/** Resuelve una lista de IDs ignorando los que no existan. */
export function resolveMetas(ids: string[] | undefined): DocMeta[] {
  if (!ids) return [];
  return ids.map((id) => getMeta(id)).filter((m): m is DocMeta => Boolean(m));
}
