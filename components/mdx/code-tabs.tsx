import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { LANG_LABELS, normalizeLang } from '@/lib/mdx/highlight';
import type { CodeBlockProps } from './code-block';
import { CodeTabsClient } from './code-tabs-client';

/**
 * Agrupa varios bloques de código en pestañas (por ejemplo, archivos
 * relacionados). Cada bloque usa su `title` como etiqueta de pestaña.
 */
export function CodeTabs({ children }: { children: ReactNode }) {
  const blocks = Children.toArray(children).filter(
    (child): child is ReactElement<CodeBlockProps> =>
      isValidElement(child) && typeof (child.props as CodeBlockProps).code === 'string',
  );

  const labels = blocks.map((b) => b.props.title ?? LANG_LABELS[normalizeLang(b.props.lang)] ?? 'Código');
  const codes = blocks.map((b) => b.props.code.replace(/\n+$/, ''));
  const panels = blocks.map((b, i) => cloneElement(b, { embedded: true, key: i }));

  return (
    <CodeTabsClient labels={labels} codes={codes}>
      {panels}
    </CodeTabsClient>
  );
}
