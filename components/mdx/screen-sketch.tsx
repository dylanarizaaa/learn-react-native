import type { ReactNode } from 'react';
import { Circle, CircleCheck, MapPin, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Boceto (wireframe) de una pantalla móvil para la sección
 * "Diseño de las pantallas" de cada proyecto.
 */
export type SketchBlock =
  | { type: 'header'; label: string; action?: string; back?: boolean }
  | { type: 'search'; label?: string }
  | { type: 'stats'; items: { label: string; value: string }[] }
  | { type: 'list'; items: string[]; check?: boolean; done?: number[]; meta?: string[] }
  | { type: 'card'; label: string; value?: string }
  | { type: 'input'; label: string }
  | { type: 'button'; label: string; variant?: 'primary' | 'secondary' | 'danger' }
  | { type: 'chips'; items: string[]; active?: number }
  | { type: 'image'; label?: string; height?: number }
  | { type: 'text'; label: string; muted?: boolean }
  | { type: 'tabs'; items: string[]; active?: number }
  | { type: 'grid'; items: { label: string; value?: string }[] }
  | { type: 'map'; label?: string }
  | { type: 'camera'; label?: string }
  | { type: 'keypad'; items: string[] }
  | { type: 'display'; value: string; label?: string }
  | { type: 'empty'; label: string }
  | { type: 'segmented'; items: string[]; active?: number }
  | { type: 'total'; label: string; value: string }
  | { type: 'fab' };

function Block({ block }: { block: SketchBlock }) {
  switch (block.type) {
    case 'header':
      return (
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {block.back && <span className="text-[11px] text-brand">‹</span>}
            <span className="text-[13px] font-bold tracking-tight">{block.label}</span>
          </div>
          {block.action && (
            <span className="rounded-md bg-brand-soft px-1.5 py-0.5 text-[9px] font-semibold text-brand">
              {block.action}
            </span>
          )}
        </div>
      );
    case 'search':
      return (
        <div className="flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1.5 text-[10px] text-muted-foreground">
          <Search className="size-3" /> {block.label ?? 'Buscar…'}
        </div>
      );
    case 'stats':
      return (
        <div className="grid grid-cols-2 gap-1.5">
          {block.items.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-background p-1.5">
              <div className="text-[8.5px] text-muted-foreground">{s.label}</div>
              <div className="text-[12px] font-bold">{s.value}</div>
            </div>
          ))}
        </div>
      );
    case 'list':
      return (
        <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-background">
          {block.items.map((item, i) => {
            const done = block.done?.includes(i);
            return (
              <div key={item + i} className="flex items-center gap-1.5 px-2 py-1.5 text-[10px]">
                {block.check &&
                  (done ? (
                    <CircleCheck className="size-3 shrink-0 text-success" />
                  ) : (
                    <Circle className="size-3 shrink-0 text-muted-foreground" />
                  ))}
                <span className={cn('flex-1 truncate', done && 'text-muted-foreground line-through')}>{item}</span>
                {block.meta?.[i] && <span className="text-[9px] font-semibold text-muted-foreground">{block.meta[i]}</span>}
              </div>
            );
          })}
        </div>
      );
    case 'card':
      return (
        <div className="rounded-lg border border-border bg-background p-2">
          <div className="text-[9px] text-muted-foreground">{block.label}</div>
          {block.value && <div className="text-[14px] font-bold">{block.value}</div>}
        </div>
      );
    case 'input':
      return (
        <div>
          <div className="mb-0.5 text-[9px] font-medium">{block.label}</div>
          <div className="h-6 rounded-md border border-border bg-background" />
        </div>
      );
    case 'button':
      return (
        <div
          className={cn(
            'rounded-lg py-1.5 text-center text-[10px] font-semibold',
            block.variant === 'secondary'
              ? 'border border-border bg-background'
              : block.variant === 'danger'
                ? 'bg-danger/15 text-danger'
                : 'bg-foreground text-background',
          )}
        >
          {block.label}
        </div>
      );
    case 'chips':
      return (
        <div className="flex flex-wrap gap-1">
          {block.items.map((c, i) => (
            <span
              key={c}
              className={cn(
                'rounded-full border px-2 py-0.5 text-[9px]',
                i === (block.active ?? 0) ? 'border-foreground bg-foreground text-background' : 'border-border',
              )}
            >
              {c}
            </span>
          ))}
        </div>
      );
    case 'image':
      return (
        <div
          className="flex items-center justify-center rounded-lg bg-[repeating-linear-gradient(45deg,var(--muted),var(--muted)_6px,transparent_6px,transparent_12px)] text-[9px] text-muted-foreground"
          style={{ height: block.height ?? 70 }}
        >
          {block.label ?? 'Imagen'}
        </div>
      );
    case 'text':
      return <p className={cn('text-[10px] leading-snug', block.muted && 'text-muted-foreground')}>{block.label}</p>;
    case 'grid':
      return (
        <div className="grid grid-cols-2 gap-1.5">
          {block.items.map((g) => (
            <div key={g.label} className="rounded-lg border border-border bg-background p-1">
              <div className="mb-1 h-9 rounded bg-muted" />
              <div className="truncate text-[9px] font-medium">{g.label}</div>
              {g.value && <div className="text-[9px] font-bold">{g.value}</div>}
            </div>
          ))}
        </div>
      );
    case 'map':
      return (
        <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-muted/60 [background-size:16px_16px]">
          <MapPin className="size-5 fill-brand/20 text-brand" />
          {block.label && (
            <span className="absolute bottom-1.5 left-1.5 rounded bg-background px-1.5 py-0.5 text-[8.5px]">
              {block.label}
            </span>
          )}
        </div>
      );
    case 'camera':
      return (
        <div className="relative flex h-40 items-center justify-center rounded-lg bg-neutral-900">
          <div className="size-20 rounded-lg border-2 border-white/80" />
          <span className="absolute bottom-2 text-[9px] text-white/80">{block.label ?? 'Apunta al código'}</span>
        </div>
      );
    case 'keypad':
      return (
        <div className="grid grid-cols-4 gap-1">
          {block.items.map((k, i) => (
            <div
              key={k + i}
              className={cn(
                'flex h-7 items-center justify-center rounded-md text-[11px] font-semibold',
                /[÷×−+=]/.test(k) ? 'bg-brand text-brand-foreground' : 'bg-muted',
              )}
            >
              {k}
            </div>
          ))}
        </div>
      );
    case 'display':
      return (
        <div className="py-2 text-center">
          {block.label && <div className="text-[9px] text-muted-foreground">{block.label}</div>}
          <div className="text-[28px] leading-none font-bold tracking-tight">{block.value}</div>
        </div>
      );
    case 'empty':
      return (
        <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-border py-5 text-center">
          <div className="size-6 rounded-full bg-muted" />
          <div className="text-[9.5px] text-muted-foreground">{block.label}</div>
        </div>
      );
    case 'segmented':
      return (
        <div className="flex rounded-lg bg-muted p-0.5">
          {block.items.map((s, i) => (
            <span
              key={s}
              className={cn(
                'flex-1 rounded-md py-1 text-center text-[9px]',
                i === (block.active ?? 0) && 'bg-background font-semibold shadow-sm',
              )}
            >
              {s}
            </span>
          ))}
        </div>
      );
    case 'total':
      return (
        <div className="flex items-center justify-between border-t border-border pt-1.5 text-[10px]">
          <span className="text-muted-foreground">{block.label}</span>
          <span className="font-bold">{block.value}</span>
        </div>
      );
    case 'fab':
      return null;
    case 'tabs':
      return null;
  }
}

export function ScreenSketch({
  title,
  description,
  blocks,
}: {
  title: string;
  description?: string;
  blocks: SketchBlock[];
}) {
  const tabs = blocks.find((b): b is Extract<SketchBlock, { type: 'tabs' }> => b.type === 'tabs');
  const fab = blocks.some((b) => b.type === 'fab');
  return (
    <figure className="flex w-[13.5rem] shrink-0 flex-col items-center gap-2">
      <div
        className="relative h-[27rem] w-full overflow-hidden rounded-[1.9rem] border-[5px] border-foreground/85 bg-card shadow-sm"
        role="img"
        aria-label={`Boceto de la pantalla ${title}`}
      >
        <div className="flex h-5 items-center justify-between px-4 text-[8px] font-semibold text-muted-foreground">
          <span>9:41</span>
          <span className="h-3 w-12 rounded-full bg-foreground/85" />
          <span>100%</span>
        </div>
        <div className="flex flex-col gap-2 px-2.5 pt-1.5 pb-14">
          {blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
        {fab && (
          <div className="absolute right-3 bottom-12 flex size-8 items-center justify-center rounded-full bg-brand text-brand-foreground shadow">
            <Plus className="size-4" />
          </div>
        )}
        {tabs && (
          <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-around border-t border-border bg-card px-2">
            {tabs.items.map((t, i) => (
              <span
                key={t}
                className={cn(
                  'flex flex-col items-center gap-0.5 text-[8.5px]',
                  i === (tabs.active ?? 0) ? 'font-semibold text-brand' : 'text-muted-foreground',
                )}
              >
                <span className={cn('size-2.5 rounded-sm', i === (tabs.active ?? 0) ? 'bg-brand' : 'bg-muted-foreground/40')} />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <figcaption className="text-center">
        <div className="text-sm font-semibold">{title}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </figcaption>
    </figure>
  );
}

export function Screens({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose thin-scrollbar -mx-1 flex gap-5 overflow-x-auto px-1 pb-3 sm:flex-wrap sm:justify-center">
      {children}
    </div>
  );
}
