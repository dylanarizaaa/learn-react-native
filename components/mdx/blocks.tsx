import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CircleCheck,
  CircleHelp,
  CircleX,
  Info,
  Lightbulb,
  OctagonAlert,
  Puzzle,
  Target,
  TriangleAlert,
  Wrench,
} from 'lucide-react';
import { glossary } from '@/content/glossary';
import { cn } from '@/lib/utils';

/* ---------------- Callout ---------------- */

const CALLOUTS = {
  info: { icon: Info, label: 'Nota', className: 'border-brand/30 bg-brand-soft/60 [&_svg]:text-brand' },
  tip: { icon: Lightbulb, label: 'Consejo', className: 'border-success/30 bg-success/[0.06] [&_svg]:text-success' },
  warning: {
    icon: TriangleAlert,
    label: 'Atención',
    className: 'border-warning/40 bg-warning/[0.08] [&_svg]:text-warning',
  },
  danger: {
    icon: OctagonAlert,
    label: 'Evita esto',
    className: 'border-danger/30 bg-danger/[0.06] [&_svg]:text-danger',
  },
} as const;

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: keyof typeof CALLOUTS;
  title?: string;
  children: ReactNode;
}) {
  const config = CALLOUTS[type] ?? CALLOUTS.info;
  const Icon = config.icon;
  return (
    <aside className={cn('flex gap-3 rounded-xl border px-4 py-3.5 text-[0.925rem]', config.className)}>
      <Icon className="mt-1 size-4 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1 [&>*+*]:mt-2 [&_p]:text-foreground/85">
        <p className="font-semibold text-foreground">{title ?? config.label}</p>
        {children}
      </div>
    </aside>
  );
}

/* ---------------- Overview (introducción conceptual) ---------------- */

export function Overview({
  purpose,
  importance,
  when,
  problem,
}: {
  purpose: string;
  importance: string;
  when: string;
  problem: string;
}) {
  const items = [
    { icon: Target, label: '¿Para qué sirve?', text: purpose },
    { icon: Lightbulb, label: '¿Por qué es importante?', text: importance },
    { icon: CircleHelp, label: '¿Cuándo utilizarlo?', text: when },
    { icon: Puzzle, label: '¿Qué problema resuelve?', text: problem },
  ];
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, label, text }) => (
        <div key={label} className="rounded-xl border border-border bg-card p-4">
          <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
            <span className="flex size-6 items-center justify-center rounded-md bg-brand-soft text-brand">
              <Icon className="size-3.5" aria-hidden />
            </span>
            {label}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Flow (diagrama de flujo lineal) ---------------- */

type FlowStep = string | { title: string; desc?: string; tone?: 'brand' | 'muted' };

export function Flow({
  steps,
  caption,
  direction = 'horizontal',
}: {
  steps: FlowStep[];
  caption?: string;
  direction?: 'horizontal' | 'vertical';
}) {
  const vertical = direction === 'vertical';
  return (
    <figure className="not-prose rounded-xl border border-border bg-card p-4 sm:p-5">
      <ol
        className={cn(
          'flex flex-col items-stretch gap-2',
          !vertical && 'md:flex-row md:items-center',
        )}
      >
        {steps.map((step, i) => {
          const s = typeof step === 'string' ? { title: step } : step;
          return (
            <li key={i} className={cn('flex flex-col items-center gap-2', !vertical && 'md:flex-1 md:flex-row')}>
              <div
                className={cn(
                  'w-full rounded-lg border px-3 py-2.5 text-center',
                  s.tone === 'brand'
                    ? 'border-brand/40 bg-brand-soft'
                    : s.tone === 'muted'
                      ? 'border-dashed border-border bg-muted/50'
                      : 'border-border bg-background',
                )}
              >
                <div className="text-sm font-semibold">{s.title}</div>
                {s.desc && <div className="mt-0.5 text-xs leading-snug text-muted-foreground">{s.desc}</div>}
              </div>
              {i < steps.length - 1 && (
                <>
                  <ArrowDown
                    className={cn('size-4 shrink-0 text-muted-foreground', !vertical && 'md:hidden')}
                    aria-hidden
                  />
                  {!vertical && (
                    <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground md:block" aria-hidden />
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
      {caption && <figcaption className="mt-3 text-center text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

/* ---------------- Layers (diagrama de capas / arquitectura) ---------------- */

export function Layers({
  layers,
  caption,
}: {
  layers: { title: string; desc?: string; items?: string[]; tone?: 'brand' | 'muted' }[];
  caption?: string;
}) {
  return (
    <figure className="not-prose rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-2">
        {layers.map((layer, i) => (
          <div
            key={layer.title + i}
            className={cn(
              'flex flex-col gap-2 rounded-lg border px-3.5 py-3 sm:flex-row sm:items-center sm:gap-4',
              layer.tone === 'brand'
                ? 'border-brand/40 bg-brand-soft'
                : layer.tone === 'muted'
                  ? 'border-dashed bg-muted/50'
                  : 'border-border bg-background',
            )}
          >
            <div className="sm:w-44 sm:shrink-0">
              <div className="text-sm font-semibold">{layer.title}</div>
              {layer.desc && <div className="text-xs leading-snug text-muted-foreground">{layer.desc}</div>}
            </div>
            {layer.items && (
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[0.72rem] text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

/* ---------------- Columns / Column (comparaciones) ---------------- */

export function Columns({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return (
    <div className={cn('not-prose grid gap-3', cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>{children}</div>
  );
}

const COLUMN_TONES = {
  neutral: { icon: null, className: 'border-border' },
  good: { icon: CircleCheck, className: 'border-success/30 [&_.col-icon]:text-success' },
  bad: { icon: CircleX, className: 'border-danger/30 [&_.col-icon]:text-danger' },
  brand: { icon: null, className: 'border-brand/40 bg-brand-soft/50' },
} as const;

export function Column({
  title,
  tone = 'neutral',
  children,
}: {
  title: string;
  tone?: keyof typeof COLUMN_TONES;
  children: ReactNode;
}) {
  const config = COLUMN_TONES[tone];
  const Icon = config.icon;
  return (
    <div className={cn('rounded-xl border bg-card p-4', config.className)}>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {Icon && <Icon className="col-icon size-4" aria-hidden />}
        {title}
      </div>
      <div className="doc-content text-sm leading-relaxed [&_li]:mt-1 [&>*+*]:mt-2 [&_p]:text-sm [&_ul]:pl-4">{children}</div>
    </div>
  );
}

/* ---------------- SplitView (explicación + implementación) ---------------- */

export function SplitView({ children }: { children: ReactNode }) {
  return <div className="not-prose grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">{children}</div>;
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-2">
      <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{title}</div>
      <div className="doc-content min-w-0 text-sm [&>*+*]:mt-3 [&_p]:text-sm">{children}</div>
    </section>
  );
}

/* ---------------- Steps (paso a paso) ---------------- */

export function Steps({ children }: { children: ReactNode }) {
  return <div className="steps not-prose ml-3.5 border-l border-border pl-7 [counter-reset:step]">{children}</div>;
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="relative pb-8 last:pb-1 [counter-increment:step]">
      <span
        aria-hidden
        className="absolute top-0 -left-[2.65rem] flex size-7 items-center justify-center rounded-full border border-border bg-background font-mono text-xs font-semibold text-foreground before:content-[counter(step)]"
      />
      <h4 className="mb-3 pt-0.5 text-base font-semibold">{title}</h4>
      <div className="doc-content [&>*+*]:mt-4">{children}</div>
    </section>
  );
}

/* ---------------- Term (enlace al glosario) ---------------- */

export function Term({ slug, children }: { slug: string; children: ReactNode }) {
  const entry = glossary.find((g) => g.slug === slug);
  if (!entry) return <>{children}</>;
  return (
    <Link
      href={`/glosario#${entry.slug}`}
      title={`${entry.term}: ${entry.definition}`}
      data-card
      className="cursor-help underline decoration-muted-foreground/50 decoration-dotted underline-offset-4 hover:decoration-brand"
    >
      {children}
    </Link>
  );
}

/* ---------------- Cards (enlaces destacados) ---------------- */

export function Cards({ children }: { children: ReactNode }) {
  return <div className="not-prose grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function Card({ href, title, description }: { href: string; title: string; description?: string }) {
  const external = href.startsWith('http');
  const className =
    'group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40 hover:bg-brand-soft/40';
  const content = (
    <>
      <div className="flex items-center justify-between gap-2 text-sm font-semibold">
        {title}
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" data-card className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} data-card className={className}>
      {content}
    </Link>
  );
}

/* ---------------- Checklist (mejoras / tareas) ---------------- */

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="not-prose grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
          <Wrench className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
