'use client';

import { Children, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';

export function CodeTabsClient({
  labels,
  codes,
  children,
}: {
  labels: string[];
  codes: string[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const panels = Children.toArray(children);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (active + dir + labels.length) % labels.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <figure className="not-prose overflow-hidden rounded-xl border border-border bg-code">
      <div className="flex items-center border-b border-border bg-code-header pr-1.5">
        <div
          role="tablist"
          aria-label="Archivos del ejemplo"
          className="thin-scrollbar flex min-w-0 flex-1 overflow-x-auto"
          onKeyDown={onKeyDown}
        >
          {labels.map((label, i) => (
            <button
              key={label + i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'relative flex h-10 shrink-0 items-center gap-1.5 px-3.5 font-mono text-xs whitespace-nowrap transition-colors',
                active === i ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <FileCode2 className="size-3.5" aria-hidden />
              {label}
              {active === i && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand" />}
            </button>
          ))}
        </div>
        <CopyButton value={codes[active] ?? ''} />
      </div>
      {panels.map((panel, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
        >
          {panel}
        </div>
      ))}
    </figure>
  );
}
