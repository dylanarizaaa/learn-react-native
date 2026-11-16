import { highlight, LANG_LABELS, normalizeLang } from '@/lib/mdx/highlight';
import { CodeBlockFrame } from './code-block-frame';

export interface CodeBlockProps {
  code: string;
  lang?: string;
  meta?: string;
  title?: string;
  collapse?: string;
  noLineNumbers?: string;
  embedded?: boolean;
}

const TERMINAL_LANGS = ['bash', 'shell', 'sh'];
const AUTO_COLLAPSE_LINES = 32;

/** Bloque de código resaltado en el servidor con Shiki. */
export async function CodeBlock({ code, lang, meta, title, collapse, noLineNumbers, embedded }: CodeBlockProps) {
  const normalized = normalizeLang(lang);
  const source = code.replace(/\n+$/, '');
  const html = await highlight(source, normalized, meta);
  const terminal = TERMINAL_LANGS.includes(normalized);
  const lineCount = source.split('\n').length;

  return (
    <CodeBlockFrame
      html={html}
      code={source}
      language={LANG_LABELS[normalized] ?? lang ?? 'Texto'}
      title={title}
      lineNumbers={!noLineNumbers && !terminal && normalized !== 'text'}
      collapsible={collapse === 'true' || lineCount > AUTO_COLLAPSE_LINES}
      lineCount={lineCount}
      terminal={terminal}
      embedded={embedded}
    />
  );
}
