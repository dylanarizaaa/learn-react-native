import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Clock, ListChecks, SignalHigh, SignalLow, SignalMedium, Target } from 'lucide-react';
import type { DocMeta, Difficulty } from '@/lib/content/types';
import { cn, DIFFICULTY_LABEL, formatMinutes } from '@/lib/utils';
import { CompleteButton, FavoriteButton } from './doc-actions';

const DIFFICULTY_STYLE: Record<Difficulty, { icon: typeof SignalLow; className: string }> = {
  principiante: { icon: SignalLow, className: 'text-success border-success/30 bg-success/[0.07]' },
  intermedio: { icon: SignalMedium, className: 'text-warning border-warning/40 bg-warning/[0.08]' },
  avanzado: { icon: SignalHigh, className: 'text-danger border-danger/30 bg-danger/[0.07]' },
};

export function DifficultyBadge({ difficulty, className }: { difficulty: Difficulty; className?: string }) {
  const { icon: Icon, className: tone } = DIFFICULTY_STYLE[difficulty];
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium', tone, className)}>
      <Icon className="size-3.5" aria-hidden />
      {DIFFICULTY_LABEL[difficulty]}
    </span>
  );
}

export function TimeBadge({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
      <Clock className="size-3.5" aria-hidden />
      {formatMinutes(minutes)}
    </span>
  );
}

export function DocHeader({ meta, prerequisites }: { meta: DocMeta; prerequisites: DocMeta[] }) {
  return (
    <header className="border-b border-border pb-7">
      <nav aria-label="Ruta" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/docs" className="hover:text-foreground">
          Docs
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/docs/${meta.section}`} className="truncate hover:text-foreground">
          {meta.sectionTitle}
        </Link>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-[2.35rem] sm:leading-[1.15]">{meta.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-pretty text-muted-foreground">{meta.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={meta.difficulty} />
        <TimeBadge minutes={meta.time} />
        <div className="ml-auto flex gap-2">
          <FavoriteButton id={meta.id} />
          <CompleteButton id={meta.id} />
        </div>
      </div>
      {prerequisites.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 text-sm">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <BookOpen className="size-4 text-muted-foreground" aria-hidden />
            Requisitos previos:
          </span>
          {prerequisites.map((p, i) => (
            <span key={p.id} className="text-muted-foreground">
              <Link href={p.url} className="text-foreground underline decoration-border underline-offset-4 hover:decoration-brand">
                {p.title}
              </Link>
              {i < prerequisites.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

/** Ficha técnica de un proyecto práctico. */
export function ProjectSummary({ meta }: { meta: DocMeta }) {
  return (
    <section aria-label="Ficha del proyecto" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {meta.goal && (
        <div className="rounded-xl border border-brand/30 bg-brand-soft/60 p-4 sm:col-span-2">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
            <Target className="size-4 text-brand" aria-hidden /> Objetivo de aprendizaje
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">{meta.goal}</p>
        </div>
      )}
      {meta.technologies && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 text-sm font-semibold">Tecnologías utilizadas</div>
          <div className="flex flex-wrap gap-1.5">
            {meta.technologies.map((t) => (
              <span key={t} className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
      {meta.features && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <ListChecks className="size-4 text-muted-foreground" aria-hidden /> Funcionalidades principales
          </div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {meta.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function RelatedResources({ meta, related }: { meta: DocMeta; related: DocMeta[] }) {
  if (!meta.resources?.length && !related.length) return null;
  return (
    <section className="mt-14 border-t border-border pt-8" aria-labelledby="recursos-relacionados">
      <h2 id="recursos-relacionados" className="text-xl font-semibold tracking-tight">
        Recursos relacionados
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
        {meta.resources && meta.resources.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Documentación oficial</h3>
            <ul className="space-y-1.5">
              {meta.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-start gap-1.5 text-sm text-foreground/85 hover:text-brand"
                  >
                    {r.title}
                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground group-hover:text-brand" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {related.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Temas relacionados</h3>
            <ul className="space-y-1.5">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={r.url} className="group inline-flex items-center gap-1.5 text-sm text-foreground/85 hover:text-brand">
                    {r.title}
                    <span className="text-xs text-muted-foreground">· {r.sectionTitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export function Pager({ prev, next }: { prev?: DocMeta; next?: DocMeta }) {
  return (
    <nav aria-label="Navegación entre temas" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.url}
          className="group rounded-xl border border-border p-4 transition-colors hover:border-brand/40 hover:bg-brand-soft/30"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Tema anterior
          </span>
          <span className="mt-1 block font-medium">{prev.title}</span>
          <span className="block text-xs text-muted-foreground">{prev.sectionTitle}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.url}
          className="group rounded-xl border border-border p-4 text-right transition-colors hover:border-brand/40 hover:bg-brand-soft/30"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            Siguiente tema <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1 block font-medium">{next.title}</span>
          <span className="block text-xs text-muted-foreground">{next.sectionTitle}</span>
        </Link>
      )}
    </nav>
  );
}
