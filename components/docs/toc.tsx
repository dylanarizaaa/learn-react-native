'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, TextAlignStart } from 'lucide-react';
import type { TocEntry } from '@/lib/content/types';
import { cn } from '@/lib/utils';

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [active, setActive] = useState<string | null>(toc[0]?.id ?? null);

  useEffect(() => {
    const elements = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-72px 0px -65% 0px', threshold: [0, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <nav aria-label="En esta página" className="text-sm">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        <TextAlignStart className="size-3.5" aria-hidden /> En esta página
      </div>
      <ul className="space-y-1 border-l border-border">
        {toc.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={active === entry.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l py-1 leading-snug transition-colors',
                entry.depth === 3 ? 'pl-6 text-[0.8rem]' : 'pl-3.5',
                active === entry.id
                  ? 'border-brand font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowUp className="size-3.5" /> Volver arriba
      </button>
    </nav>
  );
}
