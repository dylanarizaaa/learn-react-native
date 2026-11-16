import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Route } from 'lucide-react';
import { SectionIconView } from '@/components/docs/section-icon';
import { SectionProgress } from '@/components/learning/section-progress';
import { getNavigation } from '@/lib/content/docs';
import { formatMinutes } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Documentación',
  description: 'Índice completo de la documentación: fundamentos, React, Expo, estilos, arquitectura, datos, calidad y proyectos.',
};

export default function DocsIndexPage() {
  const navigation = getNavigation();
  const total = navigation.reduce((acc, s) => acc + s.groups.flatMap((g) => g.items).length, 0);
  return (
    <div className="mx-auto max-w-4xl py-8 lg:py-10 lg:pl-10 xl:mx-0">
      <p className="text-sm font-medium text-brand">Documentación</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Todo lo que necesitas para crear apps móviles</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {total} temas organizados de lo básico a lo avanzado. Cada página incluye explicación conceptual, diagramas, código
        funcional, buenas prácticas y enlaces a la documentación oficial.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/docs/introduccion/que-es-react-native"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
        >
          Empezar desde cero <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/rutas"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
        >
          <Route className="size-4" /> Ver rutas de aprendizaje
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {navigation.map((section, index) => {
          const items = section.groups.flatMap((g) => g.items);
          const minutes = items.reduce((acc, i) => acc + i.time, 0);
          return (
            <Link
              key={section.slug}
              href={`/docs/${section.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background">
                  <SectionIconView icon={section.icon} className="size-[1.1rem] text-brand" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                {section.badge && (
                  <span className="ml-auto rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">{section.badge}</span>
                )}
              </div>
              <h2 className="mt-4 font-semibold">{section.title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{section.description}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  {items.length} temas · {formatMinutes(minutes)}
                </span>
                <SectionProgress ids={items.map((i) => i.id)} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
