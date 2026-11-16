import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Heading, Root } from 'mdast';
import type { TocEntry } from '@/lib/content/types';

/**
 * Asigna un `id` estable a cada encabezado y recopila los niveles 2 y 3
 * para construir la tabla de contenidos de la página.
 */
export function remarkHeadings({ toc }: { toc: TocEntry[] }) {
  return (tree: Root) => {
    const slugger = new GithubSlugger();
    visit(tree, 'heading', (node: Heading) => {
      const text = toString(node).trim();
      const id = slugger.slug(text);
      node.data ??= {};
      node.data.hProperties = { ...(node.data.hProperties ?? {}), id };
      if (node.depth === 2 || node.depth === 3) {
        toc.push({ id, text, depth: node.depth });
      }
    });
  };
}
