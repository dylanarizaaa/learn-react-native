import { createHighlighter, type Highlighter } from 'shiki';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from '@shikijs/transformers';

export const SUPPORTED_LANGS = [
  'tsx',
  'ts',
  'typescript',
  'jsx',
  'js',
  'javascript',
  'json',
  'jsonc',
  'bash',
  'shell',
  'sh',
  'diff',
  'yaml',
  'css',
  'sql',
  'kotlin',
  'swift',
  'dart',
  'xml',
  'dotenv',
  'md',
  'text',
] as const;

export const LANG_LABELS: Record<string, string> = {
  tsx: 'TSX',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  js: 'JavaScript',
  javascript: 'JavaScript',
  json: 'JSON',
  jsonc: 'JSON',
  bash: 'Terminal',
  shell: 'Terminal',
  sh: 'Terminal',
  diff: 'Diff',
  yaml: 'YAML',
  css: 'CSS',
  sql: 'SQL',
  kotlin: 'Kotlin',
  swift: 'Swift',
  dart: 'Dart',
  xml: 'XML',
  dotenv: '.env',
  md: 'Markdown',
  text: 'Texto',
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: ['github-light', 'github-dark-default'],
    langs: SUPPORTED_LANGS.filter((l) => l !== 'text'),
  });
  return highlighterPromise;
}

export function normalizeLang(lang: string | undefined): string {
  if (!lang) return 'text';
  const lower = lang.toLowerCase();
  if (lower === 'env') return 'dotenv';
  if (lower === 'console' || lower === 'terminal') return 'bash';
  return (SUPPORTED_LANGS as readonly string[]).includes(lower) ? lower : 'text';
}

/**
 * Resalta código en el servidor (en tiempo de build) con temas claro y oscuro.
 * Los colores se exponen como variables CSS (`--shiki-light` / `--shiki-dark`).
 */
export async function highlight(code: string, lang: string, meta = ''): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: normalizeLang(lang),
    themes: { light: 'github-light', dark: 'github-dark-default' },
    defaultColor: false,
    meta: { __raw: meta },
    transformers: [
      transformerMetaHighlight(),
      transformerNotationDiff({ matchAlgorithm: 'v3' }),
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
      transformerNotationFocus({ matchAlgorithm: 'v3' }),
    ],
  });
}
