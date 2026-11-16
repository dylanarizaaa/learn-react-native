'use client';

import Link from 'next/link';
import { CircleCheck, History, RotateCcw, Star, Trash2, X } from 'lucide-react';
import type { Difficulty } from '@/lib/content/types';
import { useHydrated, useLearningStore } from '@/lib/store/learning-store';
import { cn, DIFFICULTY_LABEL } from '@/lib/utils';
import { ProgressBar } from './section-progress';

export interface ManifestEntry {
  id: string;
  title: string;
  url: string;
  sectionTitle: string;
  difficulty: Difficulty;
}

export interface ManifestSection {
  slug: string;
  title: string;
  ids: string[];
}

const timeFormatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

function relativeTime(timestamp: number) {
  const minutes = Math.round((timestamp - Date.now()) / 60000);
  if (Math.abs(minutes) < 60) return timeFormatter.format(minutes, 'minute');
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return timeFormatter.format(hours, 'hour');
  return timeFormatter.format(Math.round(hours / 24), 'day');
}

function EmptyState({ icon: Icon, text }: { icon: typeof Star; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border px-4 py-10 text-center">
      <Icon className="size-5 text-muted-foreground" aria-hidden />
      <p className="max-w-xs text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export function MyLearning({ docs, sections }: { docs: ManifestEntry[]; sections: ManifestSection[] }) {
  const hydrated = useHydrated();
  const { favorites, completed, history, toggleFavorite, clearHistory, resetProgress } = useLearningStore();
  const byId = new Map(docs.map((d) => [d.id, d]));

  const fav = hydrated ? favorites.map((id) => byId.get(id)).filter((d): d is ManifestEntry => Boolean(d)) : [];
  const hist = hydrated ? history.filter((h) => byId.has(h.id)) : [];
  const doneIds = hydrated ? completed.filter((id) => byId.has(id)) : [];
  const ratio = docs.length ? doneIds.length / docs.length : 0;
  const nextUp = hydrated ? docs.find((d) => !completed.includes(d.id)) : undefined;

  return (
    <div className="flex flex-col gap-10">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 sm:col-span-2">
          <div className="text-sm text-muted-foreground">Progreso total</div>
          <div className="mt-1 text-3xl font-bold tabular-nums">
            {Math.round(ratio * 100)}
            <span className="text-lg text-muted-foreground">%</span>
          </div>
          <ProgressBar ratio={ratio} className="mt-3" />
          <p className="mt-2 text-xs text-muted-foreground">
            {doneIds.length} de {docs.length} temas completados
          </p>
          {nextUp && (
            <Link
              href={nextUp.url}
              className="mt-4 inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background hover:opacity-90"
            >
              Siguiente pendiente: {nextUp.title}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="size-4" aria-hidden /> Favoritos
            </div>
            <div className="mt-1 text-2xl font-bold tabular-nums">{fav.length}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <History className="size-4" aria-hidden /> Consultados
            </div>
            <div className="mt-1 text-2xl font-bold tabular-nums">{hist.length}</div>
          </div>
        </div>
      </section>

      <section aria-labelledby="por-seccion">
        <h2 id="por-seccion" className="text-lg font-semibold">
          Progreso por sección
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sections.map((s) => {
            const done = s.ids.filter((id) => doneIds.includes(id)).length;
            return (
              <Link key={s.slug} href={`/docs/${s.slug}`} className="rounded-xl border border-border p-4 hover:border-brand/40">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium">{s.title}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {done}/{s.ids.length}
                  </span>
                </div>
                <ProgressBar ratio={s.ids.length ? done / s.ids.length : 0} className="mt-2.5" />
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section aria-labelledby="favoritos">
          <h2 id="favoritos" className="flex items-center gap-2 text-lg font-semibold">
            <Star className="size-4 text-warning" aria-hidden /> Favoritos
          </h2>
          <div className="mt-4">
            {fav.length === 0 ? (
              <EmptyState icon={Star} text="Pulsa «Guardar» en cualquier tema para tenerlo siempre a mano aquí." />
            ) : (
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {fav.map((d) => (
                  <li key={d.id} className="flex items-center gap-2 px-4 py-3">
                    <Link href={d.url} className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium hover:text-brand">{d.title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {d.sectionTitle} · {DIFFICULTY_LABEL[d.difficulty]}
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(d.id)}
                      aria-label={`Quitar ${d.title} de favoritos`}
                      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section aria-labelledby="historial">
          <div className="flex items-center justify-between gap-2">
            <h2 id="historial" className="flex items-center gap-2 text-lg font-semibold">
              <History className="size-4 text-muted-foreground" aria-hidden /> Historial
            </h2>
            {hist.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="size-3.5" /> Borrar historial
              </button>
            )}
          </div>
          <div className="mt-4">
            {hist.length === 0 ? (
              <EmptyState icon={History} text="Los temas que visites aparecerán aquí, del más reciente al más antiguo." />
            ) : (
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {hist.map((h) => {
                  const d = byId.get(h.id)!;
                  const isDone = completed.includes(d.id);
                  return (
                    <li key={h.id}>
                      <Link href={d.url} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40">
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">{d.title}</span>
                          <span className="block text-xs text-muted-foreground">{d.sectionTitle}</span>
                        </span>
                        {isDone && <CircleCheck className="size-4 text-success" aria-label="Completado" />}
                        <span className="text-xs whitespace-nowrap text-muted-foreground">{relativeTime(h.visitedAt)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-border p-5">
        <h2 className="font-semibold">Tus datos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          El progreso, los favoritos y el historial se guardan en el almacenamiento local de este navegador. No se envían a
          ningún servidor y no se sincronizan entre dispositivos.
        </p>
        <button
          type="button"
          disabled={doneIds.length === 0}
          onClick={() => {
            if (window.confirm('¿Reiniciar el progreso? Se desmarcarán todos los temas completados.')) resetProgress();
          }}
          className={cn(
            'mt-4 inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm',
            doneIds.length === 0 ? 'cursor-not-allowed opacity-50' : 'hover:border-danger/40 hover:text-danger',
          )}
        >
          <RotateCcw className="size-4" /> Reiniciar progreso
        </button>
      </section>
    </div>
  );
}
