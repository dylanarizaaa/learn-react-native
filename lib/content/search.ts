import GithubSlugger from 'github-slugger';
import { createProcessor } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import { glossary } from '@/content/glossary';
import { getAllDocs } from './docs';

export interface SearchRecord {
  id: string;
  type: 'doc' | 'project' | 'heading' | 'glossary';
  title: string;
  section: string;
  url: string;
  description?: string;
  /** Título del tema al que pertenece un encabezado. */
  parent?: string;
  text?: string;
  /** Palabras clave del frontmatter (curadas, mayor peso). */
  keywords?: string;
  /** Identificadores extraídos de los bloques de código. */
  code?: string;
}

const MAX_TEXT = 1800;
const IDENTIFIER = /\b(?:use[A-Z]\w+|[a-z]+[A-Z]\w+|[A-Z][a-z]+[A-Z]\w+|expo-[\w-]+|@[\w-]+\/[\w-]+)\b/g;

const processor = createProcessor({ remarkPlugins: [remarkGfm] });

interface JsxNode {
  type: string;
  attributes?: { type: string; name?: string; value?: unknown }[];
}

function extract(body: string) {
  const tree = processor.parse(body) as Root;
  const slugger = new GithubSlugger();
  const headings: { id: string; text: string }[] = [];
  const text: string[] = [];
  const identifiers = new Set<string>();

  visit(tree, (node) => {
    if (node.type === 'heading') {
      const value = toString(node).trim();
      const id = slugger.slug(value);
      if ('depth' in node && (node.depth === 2 || node.depth === 3)) headings.push({ id, text: value });
      return 'skip';
    }
    if (node.type === 'code') {
      const value = (node as { value: string }).value;
      for (const match of value.matchAll(IDENTIFIER)) identifiers.add(match[0]);
      return 'skip';
    }
    if (node.type === 'inlineCode') {
      identifiers.add((node as { value: string }).value);
      return 'skip';
    }
    if (node.type === 'paragraph' || node.type === 'tableCell') {
      text.push(toString(node));
      return 'skip';
    }
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      for (const attr of (node as JsxNode).attributes ?? []) {
        if (typeof attr.value === 'string' && attr.value.length > 20) text.push(attr.value);
      }
    }
    return undefined;
  });

  return {
    headings,
    text: text.join(' ').replace(/\s+/g, ' ').slice(0, MAX_TEXT),
    code: [...identifiers].slice(0, 80).join(' '),
  };
}

/** Índice de búsqueda generado en build y servido como JSON estático. */
export function buildSearchRecords(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const { meta, body } of getAllDocs()) {
    const { headings, text, code } = extract(body);
    records.push({
      id: meta.id,
      type: meta.kind === 'project' ? 'project' : 'doc',
      title: meta.title,
      section: meta.sectionTitle,
      url: meta.url,
      description: meta.description,
      text,
      code,
      keywords: [...(meta.keywords ?? []), ...(meta.technologies ?? [])].join(' '),
    });
    for (const h of headings) {
      records.push({
        id: `${meta.id}#${h.id}`,
        type: 'heading',
        title: h.text,
        parent: meta.title,
        section: meta.sectionTitle,
        url: `${meta.url}#${h.id}`,
      });
    }
  }

  for (const g of glossary) {
    records.push({
      id: `glosario/${g.slug}`,
      type: 'glossary',
      title: g.term,
      section: 'Glosario',
      url: `/glosario#${g.slug}`,
      description: g.definition,
    });
  }

  return records;
}
