'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import MiniSearch, { type SearchResult } from 'minisearch';
import { BookA, CornerDownLeft, FileText, Hammer, Hash, History, Loader2, Search } from 'lucide-react';
import type { SearchRecord } from '@/lib/content/search';
import { useHydrated, useLearningStore } from '@/lib/store/learning-store';
import { useUiStore } from '@/lib/store/ui-store';
import { cn } from '@/lib/utils';

const STOP_WORDS = new Set([
  'de', 'la', 'el', 'los', 'las', 'y', 'en', 'que', 'un', 'una', 'con', 'por', 'para', 'del', 'al', 'es', 'se', 'lo', 'como', 'o',
]);

function normalize(term: string) {
  const t = term.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return STOP_WORDS.has(t) ? null : t;
}

function normalizeTitle(title: string) {
  return title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

let indexPromise: Promise<{ engine: MiniSearch<SearchRecord>; byId: Map<string, SearchRecord> }> | null = null;

function loadIndex() {
  indexPromise ??= fetch('/search-index.json')
    .then((r) => r.json() as Promise<SearchRecord[]>)
    .then((records) => {
      const engine = new MiniSearch<SearchRecord>({
        fields: ['title', 'keywords', 'description', 'parent', 'code', 'text'],
        storeFields: ['title', 'type', 'section', 'url', 'description', 'parent'],
        processTerm: normalize,
        searchOptions: {
          boost: { title: 5, keywords: 3, description: 1.5, parent: 1, code: 0.8 },
          prefix: true,
          fuzzy: (term: string) => (term.length > 4 ? 0.18 : 0),
          combineWith: 'AND',
          processTerm: normalize,
          // Coincidencia exacta con el título de un tema: va primero
          boostDocument: (_id, term, stored) =>
            stored?.title && normalizeTitle(String(stored.title)) === term ? 2 : 1,
        },
      });
      engine.addAll(records);
      return { engine, byId: new Map(records.map((r) => [r.id, r])) };
    })
    .catch((error) => {
      indexPromise = null;
      throw error;
    });
  return indexPromise;
}

type Hit = Pick<SearchRecord, 'id' | 'type' | 'title' | 'section' | 'url' | 'description' | 'parent'>;

const GROUPS: { type: SearchRecord['type']; label: string; icon: typeof FileText; limit: number }[] = [
  { type: 'doc', label: 'Temas', icon: FileText, limit: 8 },
  { type: 'project', label: 'Proyectos', icon: Hammer, limit: 5 },
  { type: 'heading', label: 'Secciones', icon: Hash, limit: 6 },
  { type: 'glossary', label: 'Glosario', icon: BookA, limit: 4 },
];

export function SearchDialog() {
  const open = useUiStore((s) => s.searchOpen);
  const setOpen = useUiStore((s) => s.setSearchOpen);
  const router = useRouter();
  const hydrated = useHydrated();
  const history = useLearningStore((s) => s.history);

  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<Awaited<ReturnType<typeof loadIndex>> | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Atajos: ⌘K / Ctrl+K y "/"
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen(!useUiStore.getState().searchOpen);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setOpen]);

  useEffect(() => {
    if (!open || index) return;
    loadIndex()
      .then(setIndex)
      .catch(() => setError(true));
  }, [open, index]);

  const groups = useMemo(() => {
    const q = query.trim();
    if (!index) return [];
    if (!q) {
      const recent = (hydrated ? history : [])
        .map((h) => index.byId.get(h.id))
        .filter((r): r is SearchRecord => Boolean(r))
        .slice(0, 6);
      return recent.length ? [{ label: 'Visitados recientemente', icon: History, hits: recent as Hit[] }] : [];
    }
    let results: SearchResult[] = index.engine.search(q);
    if (results.length === 0) results = index.engine.search(q, { combineWith: 'OR' });
    return GROUPS.map((g) => ({
      label: g.label,
      icon: g.icon,
      hits: results.filter((r) => r.type === g.type).slice(0, g.limit) as unknown as Hit[],
    })).filter((g) => g.hits.length > 0);
  }, [query, index, history, hydrated]);

  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = useCallback(
    (hit: Hit | undefined) => {
      if (!hit) return;
      setOpen(false);
      setQuery('');
      router.push(hit.url);
    },
    [router, setOpen],
  );

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(flat[active]);
    }
  }

  let running = -1;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-overlay-in fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
        <Dialog.Content
          className="animate-dialog-in fixed top-[42%] left-1/2 z-50 flex max-h-[min(36rem,85vh)] w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:top-1/2"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Buscar en la documentación</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Busca temas, APIs, hooks, proyectos…"
              className="h-14 w-full bg-transparent text-[0.95rem] outline-none placeholder:text-muted-foreground"
              aria-label="Buscar"
              role="combobox"
              aria-expanded={flat.length > 0}
              aria-controls="search-results"
              aria-activedescendant={flat[active] ? `search-hit-${active}` : undefined}
            />
            <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
              ESC
            </kbd>
          </div>

          <div ref={listRef} id="search-results" role="listbox" className="thin-scrollbar flex-1 overflow-y-auto p-2">
            {!index && !error && (
              <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Cargando índice…
              </div>
            )}
            {error && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No se pudo cargar el índice de búsqueda. Revisa tu conexión e inténtalo de nuevo.
              </p>
            )}
            {index && query.trim() && flat.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Sin resultados para «{query}». Prueba con otro término, por ejemplo «FlatList» o «autenticación».
              </p>
            )}
            {index && !query.trim() && flat.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Escribe para buscar en {index.byId.size.toLocaleString('es')} entradas: temas, secciones, proyectos y glosario.
              </p>
            )}
            {groups.map((group) => (
              <div key={group.label} className="mb-2">
                <div className="px-2.5 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {group.label}
                </div>
                {group.hits.map((hit) => {
                  running += 1;
                  const i = running;
                  const Icon = GROUPS.find((g) => g.type === hit.type)?.icon ?? FileText;
                  return (
                    <button
                      key={hit.id}
                      id={`search-hit-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={active === i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(hit)}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left transition-colors',
                        active === i ? 'bg-muted' : 'hover:bg-muted/60',
                      )}
                    >
                      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{hit.title}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {hit.parent ? `${hit.section} › ${hit.parent}` : hit.description ?? hit.section}
                        </span>
                      </span>
                      {active === i && <CornerDownLeft className="mt-1 size-3.5 shrink-0 text-muted-foreground" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground sm:flex">
            <span>
              <kbd className="font-mono">↑↓</kbd> navegar
            </span>
            <span>
              <kbd className="font-mono">↵</kbd> abrir
            </span>
            <span>
              <kbd className="font-mono">esc</kbd> cerrar
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SearchTrigger({ className, variant = 'bar' }: { className?: string; variant?: 'bar' | 'icon' }) {
  const setOpen = useUiStore((s) => s.setSearchOpen);
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar"
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          className,
        )}
      >
        <Search className="size-[1.1rem]" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        'flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/40 pr-1.5 pl-3 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground',
        className,
      )}
    >
      <Search className="size-4" aria-hidden />
      <span className="flex-1 text-left">Buscar documentación…</span>
      <kbd className="hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] [@media(hover:hover)]:inline">⌘K</kbd>
    </button>
  );
}
