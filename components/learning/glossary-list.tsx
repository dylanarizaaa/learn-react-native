'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export interface GlossaryItem {
  slug: string;
  term: string;
  definition: string;
  docs: { title: string; url: string }[];
}

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function letterOf(term: string) {
  const first = normalize(term).charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
}

export function GlossaryList({ items }: { items: GlossaryItem[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter((i) => normalize(`${i.term} ${i.definition}`).includes(q));
  }, [items, query]);

  const groups = useMemo(() => {
    const map = new Map<string, GlossaryItem[]>();
    for (const item of filtered) {
      const letter = letterOf(item.term);
      map.set(letter, [...(map.get(letter) ?? []), item]);
    }
    return [...map.entries()];
  }, [filtered]);

  const allLetters = useMemo(() => [...new Set(items.map((i) => letterOf(i.term)))], [items]);

  return (
    <div>
      <div className="sticky top-[var(--header-height)] z-10 -mx-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-xl sm:px-0">
        <label className="flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-3.5">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar términos…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Filtrar el glosario"
          />
          <span className="text-xs text-muted-foreground tabular-nums">{filtered.length}</span>
        </label>
        <nav aria-label="Índice alfabético" className="mt-3 flex flex-wrap gap-1">
          {allLetters.map((l) => (
            <a
              key={l}
              href={`#letra-${l}`}
              className="flex size-7 items-center justify-center rounded-md text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>

      {groups.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">No hay términos que coincidan con «{query}».</p>
      )}

      <div className="mt-6 flex flex-col gap-8">
        {groups.map(([letter, entries]) => (
          <section key={letter} id={`letra-${letter}`} className="scroll-mt-40">
            <h2 className="mb-3 font-mono text-sm font-semibold text-brand">{letter}</h2>
            <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
              {entries.map((entry) => (
                <div key={entry.slug} id={entry.slug} className="scroll-mt-40 p-4 target:bg-brand-soft/60 sm:p-5">
                  <dt className="font-semibold">{entry.term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.definition}</dd>
                  {entry.docs.length > 0 && (
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {entry.docs.map((d) => (
                        <Link
                          key={d.url}
                          href={d.url}
                          className="rounded-md border border-border px-2 py-0.5 text-xs text-foreground/80 hover:border-brand/40 hover:text-brand"
                        >
                          {d.title}
                        </Link>
                      ))}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
