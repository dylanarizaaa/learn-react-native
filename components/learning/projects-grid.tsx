'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CircleCheck } from 'lucide-react';
import type { Difficulty } from '@/lib/content/types';
import { useHydrated, useLearningStore } from '@/lib/store/learning-store';
import { cn, DIFFICULTY_LABEL, formatMinutes } from '@/lib/utils';

export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  url: string;
  difficulty: Difficulty;
  time: number;
  technologies: string[];
}

const FILTERS: (Difficulty | 'todos')[] = ['todos', 'principiante', 'intermedio', 'avanzado'];
const DOT: Record<Difficulty, string> = {
  principiante: 'bg-success',
  intermedio: 'bg-warning',
  avanzado: 'bg-danger',
};

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const hydrated = useHydrated();
  const done = useLearningStore((s) => s.completed.includes(project.id));
  return (
    <Link
      href={project.url}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className={cn('size-2 rounded-full', DOT[project.difficulty])} aria-hidden />
        {DIFFICULTY_LABEL[project.difficulty]}
        <span aria-hidden>·</span>
        {formatMinutes(project.time)}
        {hydrated && done && <CircleCheck className="ml-auto size-4 text-success" aria-label="Completado" />}
      </div>
      <h3 className="mt-3 font-semibold">{project.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((t) => (
          <span key={t} className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground/75">
            {t}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-1 text-[11px] text-muted-foreground">+{project.technologies.length - 4}</span>
        )}
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
        Ver proyecto <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('todos');
  const visible = filter === 'todos' ? projects : projects.filter((p) => p.difficulty === filter);
  return (
    <div>
      <div role="group" aria-label="Filtrar por nivel" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === 'todos' ? projects.length : projects.filter((p) => p.difficulty === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                filter === f
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {f === 'todos' ? 'Todos' : DIFFICULTY_LABEL[f]} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
