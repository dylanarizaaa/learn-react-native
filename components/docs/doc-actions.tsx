'use client';

import { useEffect } from 'react';
import { CircleCheck, Circle, Star } from 'lucide-react';
import { useHydrated, useLearningStore } from '@/lib/store/learning-store';
import { cn } from '@/lib/utils';

/** Registra la visita en el historial local. */
export function VisitRecorder({ id }: { id: string }) {
  const recordVisit = useLearningStore((s) => s.recordVisit);
  useEffect(() => {
    recordVisit(id);
  }, [id, recordVisit]);
  return null;
}

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const hydrated = useHydrated();
  const isFavorite = useLearningStore((s) => s.favorites.includes(id));
  const toggle = useLearningStore((s) => s.toggleFavorite);
  const active = hydrated && isFavorite;
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      className={cn(
        'inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition-colors',
        active
          ? 'border-warning/50 bg-warning/10 text-foreground'
          : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
        className,
      )}
    >
      <Star className={cn('size-3.5', active && 'fill-warning text-warning')} aria-hidden />
      {active ? 'En favoritos' : 'Guardar'}
    </button>
  );
}

export function CompleteButton({ id, size = 'sm' }: { id: string; size?: 'sm' | 'lg' }) {
  const hydrated = useHydrated();
  const isDone = useLearningStore((s) => s.completed.includes(id));
  const toggle = useLearningStore((s) => s.toggleCompleted);
  const active = hydrated && isDone;
  const Icon = active ? CircleCheck : Circle;
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border font-medium transition-colors',
        size === 'lg' ? 'h-10 px-4 text-sm' : 'h-8 px-2.5 text-xs',
        active
          ? 'border-success/40 bg-success/10 text-foreground'
          : size === 'lg'
            ? 'border-foreground bg-foreground text-background hover:opacity-90'
            : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
      )}
    >
      <Icon className={cn(size === 'lg' ? 'size-4' : 'size-3.5', active && 'text-success')} aria-hidden />
      {active ? 'Completado' : 'Marcar como completado'}
    </button>
  );
}
