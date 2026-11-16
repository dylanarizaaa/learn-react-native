'use client';

import { useState } from 'react';
import { ChevronDown, FileCode2, SquareTerminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';

export interface CodeBlockFrameProps {
  html: string;
  code: string;
  language: string;
  title?: string;
  lineNumbers: boolean;
  collapsible: boolean;
  lineCount: number;
  terminal: boolean;
  /** Dentro de <CodeTabs> la cabecera la dibuja el contenedor. */
  embedded?: boolean;
}

const COLLAPSED_LINES = 18;

export function CodeBlockFrame({
  html,
  code,
  language,
  title,
  lineNumbers,
  collapsible,
  lineCount,
  terminal,
  embedded,
}: CodeBlockFrameProps) {
  const [expanded, setExpanded] = useState(false);
  const collapsed = collapsible && !expanded;
  const Icon = terminal ? SquareTerminal : FileCode2;

  const body = (
    <div className="relative">
      <div
        className={cn('code-body thin-scrollbar', collapsed && 'overflow-hidden')}
        data-line-numbers={lineNumbers}
        style={collapsed ? { maxHeight: `calc(${COLLAPSED_LINES} * 1.7 * 0.8125rem + 1rem)` } : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {collapsible && (
        <div
          className={cn(
            'flex justify-center',
            collapsed
              ? 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-code via-code/90 to-transparent pt-16 pb-3'
              : 'border-t border-border py-2',
          )}
        >
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <ChevronDown className={cn('size-3.5 transition-transform', expanded && 'rotate-180')} />
            {expanded ? 'Ocultar código' : `Mostrar las ${lineCount} líneas`}
          </button>
        </div>
      )}
      {embedded && (
        <div className="absolute top-2 right-2">
          <CopyButton value={code} />
        </div>
      )}
    </div>
  );

  if (embedded) return body;

  return (
    <figure className="not-prose group overflow-hidden rounded-xl border border-border bg-code shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <figcaption className="flex h-10 items-center gap-2 border-b border-border bg-code-header pr-1.5 pl-3.5">
        <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground/80">
          {title ?? (terminal ? 'Terminal' : language)}
        </span>
        {title && (
          <span className="hidden rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase sm:inline">
            {language}
          </span>
        )}
        <CopyButton value={code} />
      </figcaption>
      {body}
    </figure>
  );
}
