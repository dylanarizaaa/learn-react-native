'use client';

import { useHydrated, useLearningStore } from '@/lib/store/learning-store';
import { cn } from '@/lib/utils';

export function useProgress(ids: string[]) {
  const hydrated = useHydrated();
  const completed = useLearningStore((s) => s.completed);
  const done = hydrated ? ids.filter((id) => completed.includes(id)).length : 0;
  return { done, total: ids.length, ratio: ids.length ? done / ids.length : 0, hydrated };
}

export function ProgressBar({ ratio, className }: { ratio: number; className?: string }) {
  return (
    <div className={cn('h-1.5 overflow-hidden rounded-full bg-muted', className)} aria-hidden>
      <div className="h-full rounded-full bg-success transition-[width] duration-500" style={{ width: `${Math.round(ratio * 100)}%` }} />
    </div>
  );
}

/** Progreso de un conjunto de temas (sección o ruta). */
export function SectionProgress({ ids, className }: { ids: string[]; className?: string }) {
  const { done, total, ratio } = useProgress(ids);
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <ProgressBar ratio={ratio} className="w-24" />
      <span className="text-xs tabular-nums">
        {done}/{total} completados
      </span>
    </span>
  );
}
