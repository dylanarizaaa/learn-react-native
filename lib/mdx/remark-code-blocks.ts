import { visit } from 'unist-util-visit';
import type { Code, Root } from 'mdast';

interface JsxAttribute {
  type: 'mdxJsxAttribute';
  name: string;
  value: string | null;
}

function attr(name: string, value: string | null): JsxAttribute {
  return { type: 'mdxJsxAttribute', name, value };
}

/** Lee `title="..."` y banderas simples del meta de un bloque de código. */
export function parseCodeMeta(meta: string | null | undefined) {
  const raw = meta ?? '';
  const title = /title="([^"]+)"/.exec(raw)?.[1] ?? /title='([^']+)'/.exec(raw)?.[1];
  const withoutTitle = raw.replace(/title=("[^"]*"|'[^']*')/, '');
  return {
    title,
    collapse: /\bcollapse\b/.test(withoutTitle),
    noLineNumbers: /\bnoLineNumbers\b/.test(withoutTitle),
    raw,
  };
}

/**
 * Convierte cada bloque de código Markdown en un componente `<CodeBlock>`
 * (resaltado en el servidor) y los bloques ```tree en `<FileTree>`.
 */
export function remarkCodeBlocks() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (!parent || index === undefined) return;
      const lang = node.lang ?? 'text';

      if (lang === 'tree') {
        const meta = parseCodeMeta(node.meta);
        const attributes = [attr('content', node.value)];
        if (meta.title) attributes.push(attr('title', meta.title));
        parent.children[index] = {
          type: 'mdxJsxFlowElement',
          name: 'FileTree',
          attributes,
          children: [],
        } as never;
        return;
      }

      const meta = parseCodeMeta(node.meta);
      const attributes = [attr('code', node.value), attr('lang', lang), attr('meta', meta.raw)];
      if (meta.title) attributes.push(attr('title', meta.title));
      if (meta.collapse) attributes.push(attr('collapse', 'true'));
      if (meta.noLineNumbers) attributes.push(attr('noLineNumbers', 'true'));

      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'CodeBlock',
        attributes,
        children: [],
      } as never;
    });
  };
}
