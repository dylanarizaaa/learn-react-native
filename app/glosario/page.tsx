import type { Metadata } from 'next';
import { glossary } from '@/content/glossary';
import { GlossaryList, type GlossaryItem } from '@/components/learning/glossary-list';
import { resolveMetas } from '@/lib/content/docs';

export const metadata: Metadata = {
  title: 'Glosario técnico',
  description: 'Definiciones claras de los términos de React Native, Expo y el desarrollo móvil, con enlaces a cada tema.',
};

export default function GlossaryPage() {
  const items: GlossaryItem[] = [...glossary]
    .sort((a, b) => a.term.localeCompare(b.term, 'es', { sensitivity: 'base' }))
    .map((g) => ({
      slug: g.slug,
      term: g.term,
      definition: g.definition,
      docs: resolveMetas(g.docs).map((m) => ({ title: m.title, url: m.url })),
    }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-brand">Glosario</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Glosario técnico</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {items.length} términos que aparecen a lo largo de la documentación, explicados en una frase y enlazados con los temas
        donde se profundizan.
      </p>
      <div className="mt-6">
        <GlossaryList items={items} />
      </div>
    </main>
  );
}
