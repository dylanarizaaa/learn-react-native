'use client';

import Link from 'next/link';
import { CircleCheck, Circle, Flag } from 'lucide-react';
import type { Difficulty } from '@/lib/content/types';
import { useHydrated, useLearningStore } from '@/lib/store/learning-store';
import { cn, DIFFICULTY_LABEL, formatMinutes } from '@/lib/utils';
import { ProgressBar } from './section-progress';

export interface PathStep {
  id: string;
  title: string;
  url: string;
  sectionTitle: string;
  time: number;
  kind: 'doc' | 'project';
}

export function LearningPathCard({
  slug,
  title,
  description,
  outcome,
  level,
  steps,
  index,
}: {
  slug: string;
  title: string;
  description: string;
  outcome: string;
  level: Difficulty;
  steps: PathStep[];
  index: number;
}) {
  const hydrated = useHydrated();
  const completed = useLearningStore((s) => s.completed);
  const done = hydrated ? steps.filter((s) => completed.includes(s.id)).length : 0;
  const nextStep = steps.find((s) => !(hydrated && completed.includes(s.id))) ?? steps[0];
  const minutes = steps.reduce((acc, s) => acc + s.time, 0);

  return (
    <section id={slug} className="scroll-mt-24 rounded-2xl border border-border bg-card">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">Ruta {String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden>·</span>
          <span>{DIFFICULTY_LABEL[level]}</span>
          <span aria-hidden>·</span>
          <span>
            {steps.length} pasos · {formatMinutes(minutes)}
          </span>
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        <p className="mt-3 flex items-start gap-2 text-sm">
          <Flag className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          <span>
            <span className="font-medium">Al terminar: </span>
            {outcome}
          </span>
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ProgressBar ratio={steps.length ? done / steps.length : 0} className="w-40" />
          <span className="text-xs text-muted-foreground tabular-nums">
            {done}/{steps.length} completados
          </span>
          {nextStep && (
          <Link
            href={nextStep.url}
            className="ml-auto inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background hover:opacity-90"
          >
            {done === 0 ? 'Empezar ruta' : done === steps.length ? 'Repasar' : 'Continuar'}
          </Link>
          )}
        </div>
      </div>
      <ol className="border-t border-border px-3 py-3 sm:px-4">
        {steps.map((step, i) => {
          const isDone = hydrated && completed.includes(step.id);
          return (
            <li key={step.id}>
              <Link
                href={step.url}
                className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted/60"
              >
                {isDone ? (
                  <CircleCheck className="size-4 shrink-0 text-success" aria-label="Completado" />
                ) : (
                  <Circle className="size-4 shrink-0 text-muted-foreground/60" aria-hidden />
                )}
                <span className="w-5 font-mono text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                <span className={cn('flex-1', isDone && 'text-muted-foreground')}>{step.title}</span>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {step.kind === 'project' ? 'Proyecto' : step.sectionTitle}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
