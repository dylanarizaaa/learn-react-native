import type { Metadata } from 'next';
import { learningPaths } from '@/content/learning-paths';
import { LearningPathCard, type PathStep } from '@/components/learning/path-card';
import { resolveMetas } from '@/lib/content/docs';

export const metadata: Metadata = {
  title: 'Rutas de aprendizaje',
  description: 'Secuencias recomendadas de temas y proyectos para aprender React Native y Expo paso a paso.',
};

export default function PathsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-brand">Rutas de aprendizaje</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Aprende en el orden correcto</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        Cada ruta combina temas y proyectos en una secuencia probada. Tu avance se calcula con los temas que marcas como
        completados y se guarda en este navegador.
      </p>
      <nav aria-label="Rutas" className="mt-8 flex flex-wrap gap-2">
        {learningPaths.map((p) => (
          <a key={p.slug} href={`#${p.slug}`} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
            {p.title}
          </a>
        ))}
      </nav>
      <div className="mt-10 flex flex-col gap-6">
        {learningPaths.map((path, index) => {
          const steps: PathStep[] = resolveMetas(path.steps).map((m) => ({
            id: m.id,
            title: m.title,
            url: m.url,
            sectionTitle: m.sectionTitle,
            time: m.time,
            kind: m.kind,
          }));
          return (
            <LearningPathCard
              key={path.slug}
              index={index}
              slug={path.slug}
              title={path.title}
              description={path.description}
              outcome={path.outcome}
              level={path.level}
              steps={steps}
            />
          );
        })}
      </div>
    </main>
  );
}
