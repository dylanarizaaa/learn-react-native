import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import type { MDXContent } from 'mdx/types';
import type { TocEntry } from '@/lib/content/types';
import { remarkCodeBlocks } from './remark-code-blocks';
import { remarkHeadings } from './remark-headings';

export interface CompiledDoc {
  Content: MDXContent;
  toc: TocEntry[];
}

/** Compila MDX en el servidor durante la generación estática. */
export async function compileMdx(source: string): Promise<CompiledDoc> {
  const toc: TocEntry[] = [];
  const { default: Content } = await evaluate(source, {
    ...runtime,
    development: false,
    remarkPlugins: [remarkGfm, [remarkHeadings, { toc }], remarkCodeBlocks],
  });
  return { Content, toc };
}
